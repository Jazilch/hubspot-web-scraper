require('dotenv').config()
const app = require('express')();
const axios = require('axios');
const x = require('x-ray-scraper');
const bodyParser = require('body-parser')
const session = require('express-session');
const {
  check,
  validationResult
} = require('express-validator/check');
const {
  cleanSlug
} = require('./utils');

const CLIENT_SECRET = process.env.CLIENT_SECRET;

const blogPostURL = 'https://api.hubapi.com/blogs/v3/blog-posts';
const fileAPIURL = 'http://api.hubapi.com/filemanager/api/v2/files/download-from-url';
let ACCESS_TOKEN = {};
const hubspotBlogName = 'james-wordpress';

app.use(bodyParser.json());
app.use(session({ secret: CLIENT_SECRET, resave: false, saveUninitialized: true }));

const errorMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(err => {
        err.httpStatus = 500,
          next(err)
      });
  };

require('./routes/authRoutes')(app);
const { getAccessToken } = require('./routes/authRoutes');

app.get('/app', async (req, res) => {
  try {
    const access_token = await getAccessToken(req.sessionID);
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
  const url = req.body.url;
  const stream = await x(`${url}`, '.post', [{
    slug: 'a@href',
    featuredImage: 'img@src',
  }]).stream();
  stream.pipe(res);
})

/* ========================= 
Function takes in an array of objects
and returns the return content id from the slug
============================ */
const getPostsArray = (postData) => {
  return postData.map((data) => {
    let slug = data.slug;
    let featuredImage = data.featuredImage;
    if (slug && featuredImage) {
      slug = cleanSlug(slug);
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      };
      return axios.get(blogPostURL, {
        headers: headers,
        params: {
          slug: `${hubspotBlogName}${slug}`,
        }
      }).then((response) => {
        const contents = response.data.objects;
        return contents.map(content => ({
          slug: content.slug,
          id: content.id,
          featuredImage,
        }))
      })
    }
    return 'no data for post';
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
    const results = await axios.all(getPostsArray(postData))
    res.send([].concat(...results))
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error('You are not authorized for this portal! Check your access token!');
    } else {
      throw new Error('Cannot upload image to the file manager, try checking your URL');
    }
  }
})

/* ========================= 
Function takes in an array of objects
and returns uploaded file path to HubSpot File Manager.
Images are uploaded to folder Blog_Media
============================ */
const getPostImagesArray = (postData) => {
  return postData.map((data) => {
    const slug = data.slug;
    const id = data.id;
    const featuredImage = data.featuredImage;
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };
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
  return axios.all(postData.map(data => {
    let id = data.id;
    let featuredImage = data.featuredImage;
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    };
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
    res.send('all good');
  })
})

app.use(express.static('client/build'));

//Express serve up index.html
// If it doesn't recognize the route
const path = require('path');
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen('8080', () => {
  console.log('server running on port 8080');
});