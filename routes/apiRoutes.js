'use strict';

const axios = require('axios');
const Bottleneck = require('bottleneck/es5');
const x = require('x-ray-scraper');
const {
  check,
  validationResult
} = require('express-validator/check');
const {
  createSlug,
  cleanBackgroundImageURL
} = require('../utils');

let ACCESS_TOKEN = {};
const blogPostURL = 'https://api.hubapi.com/blogs/v3/blog-posts';
const fileAPIURL = 'http://api.hubapi.com/filemanager/api/v2/files/download-from-url';

const {
  getAccessToken
} = require('./authRoutes');

const limiter = new Bottleneck({
  minTime: 100
});


const errorMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(err => {
        err.httpStatus = 500,
          next(err)
      });
  };

module.exports = app => {

  // handle initial auth to get access token for API Calls
  app.get('/app', async (req, res) => {
    try {
      const access_token = await getAccessToken(req.sessionID);
      if (process.env.NODE_ENV === 'production') {
        ACCESS_TOKEN = access_token;
        res.redirect('/home');
      }
      res.redirect('http://localhost:3000/home');
      ACCESS_TOKEN = access_token;
    } catch (error) {
      console.log(error)
    }
  })

  /* ========================= 
  Makes a request to the provided URL and scrapes
  the slug and featured images from the website. 
  This data is returned in an array objects
  ============================ */
  app.post('/api/v1/website', [
    check('url').isURL().withMessage('must enter a URL to start'),
  ], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      url,
      selector,
      pagination,
      backgroundImageSelector,
      backgroundImage
    } = req.body;
    const imageSelector = `${backgroundImage === "true" ? `${backgroundImageSelector}@style` : 'img@src'}`;
    const stream = await x(`${url}`, `${selector}`, [{
        slug: 'a@href',
        featuredImage: imageSelector,
      }])
      .paginate(`${pagination}@href`)
      .limit(10)
      .stream();
    stream.pipe(res);
  })

  /* ========================= 
  Function takes in an array of objects
  and returns the return content id from the slug
  ============================ */
  const getPostsArray = (postData, blogName) => {
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };
    return postData.map((data) => {
      let slug = data.slug;
      let featuredImage = data.featuredImage;
      if (slug && featuredImage) {
        slug = createSlug(slug, blogName);
        return limiter.schedule(() => axios.get(blogPostURL, {
          headers: headers,
          params: {
            slug: slug,
          }
        })).then((response) => {
          const contents = response.data.objects;
          return contents.map(content => ({
            slug: content.slug,
            id: content.id,
            featuredImage,
          }))
        })
      }
    })
  }

  /* ========================= 
  Using the above function, make a request
  for each item in the array. This also makes
  sure to flatten any 2D arrays that are returned
  ============================ */
  app.post('/api/v1/posts', async (req, res) => {
    try {
      const postData = req.body.postData;
      const blogName = req.body.blogName;
      const results = await axios.all(getPostsArray(postData, blogName))
      if ([].concat(...results).length === 0) {
        res.sendStatus(400);
      }
      res.send([].concat(...results))
    } catch (error) {
      if (error.response.status === 401) {
        res.sendStatus(401);
      }
      res.sendStatus(500)
    }
  })


  /* ========================= 
  Function takes in an array of objects
  and returns uploaded file path to HubSpot File Manager.
  Images are uploaded to folder Blog_Media
  ============================ */
  const getPostImagesArray = (postData, backgroundImage) => {
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };
    return postData.map((data) => {
      const slug = data.slug;
      const id = data.id;
      if (backgroundImage === "true") {
        const featuredImage = cleanBackgroundImageURL(data.featuredImage);
      }
      const featuredImage = data.featuredImage;
      return axios({
        method: 'post',
        headers: headers,
        url: `${fileAPIURL}`,
        data: {
          folder_path: "Blog_Media",
          "url": featuredImage
        }
      }).then(response => ({
        slug,
        id,
        featuredImage: response.data.url,
      }))
    })
  }

  /* ========================= 
  Using the above function, make a request
  for each item in the array. This also makes
  sure to flatten any 2D arrays that are returned
  ============================ */
  app.post('/api/v1/images', async (req, res) => {
    try {
      const postData = req.body.postData;
      const results = await axios.all(getPostImagesArray(postData))
      res.send([].concat(...results))
    } catch (error) {
      console.log(error);
    }
  })


  app.post('/api/v1/updateData', (req, res) => {
    const postData = req.body.postData;
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };
    return axios.all(postData.map(data => {
      let id = data.id;
      let featuredImage = data.featuredImage;
      const putUrl = `https://api.hubapi.com/content/api/v2/blog-posts/${id}`;
      return axios({
        method: 'put',
        headers: headers,
        url: putUrl,
        data: {
          use_featured_image: true,
          featured_image: featuredImage
        }
      }).then(response => {
        if (response.status === 200) {
          return;
        } else {
          throw new Error('Woah there!!');
        }
      })
    })).then(response => {
      res.send(true);
      res.sendStatus(200);
    })
  })

}