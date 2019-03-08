const app = require('express')();
const axios = require('axios');
const x = require('x-ray-scraper');
const bodyParser = require('body-parser')
const normalizeUrl = require('normalize-url');
const {
  URL
} = require('url');
const {
  check,
  validationResult
} = require('express-validator/check');

const blogPostURL = 'https://api.hubapi.com/blogs/v3/blog-posts';
const fileAPIURL = 'http://api.hubapi.com/filemanager/api/v2/files/download-from-url';
const ACCESS_TOKEN = ''
const hubspotBlogName = 'james-wordpress';

app.use(bodyParser.json());

const errorMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(err => {
        err.httpStatus = 500,
          next(err)
      });
  };

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

const getPostsArray = (postData) => {
  return postData.map((data) => {
    let slug = data.slug;
    let featuredImage = data.featuredImage;
    slug = normalizeUrl(slug, {
      removeTrailingSlash: true
    });
    slug = new URL(slug);
    slug = slug.pathname;
    return axios.get(blogPostURL, {
      params: {
        access_token: ACCESS_TOKEN,
        slug: `${hubspotBlogName}${slug}`,
      }
    }).then((response) => {
      const contents = response.data.objects;
      return contents.map((content) => {
        if (content.id) {
          return {
            slug: content.slug,
            id: content.id,
            featuredImage,
          }
        }
      })
    })
  })
}


app.post('/api/v1/posts', (req, res) => {
  const postData = req.body.postData;
  return axios.all(getPostsArray(postData))
    .then(results => {
      res.send([].concat(...results));
    }).catch(error => {
      console.log(error);
    })
})


// app.post('/api/v1/posts', (req, res) => {
//   const postData = req.body.postData;
//   return axios.all(postData.map((data) => {
//     let slug = data.slug;
//     let featuredImage = data.featuredImage;
//     slug = normalizeUrl(slug, {
//       removeTrailingSlash: true
//     });
//     slug = new URL(slug);
//     slug = slug.pathname;
//     return axios.get(blogPostURL, {
//       params: {
//         access_token: ACCESS_TOKEN,
//         slug: `${hubspotBlogName}${slug}`,
//       }
//     }).then((response) => {
//       const contents = response.data.objects;
//       return contents.map((content) => {
//         if (content.id) {
//           return {
//             slug: content.slug,
//             id: content.id,
//             featuredImage,
//           }
//         }
//       })
//     })
//   })).then(results => {
//     res.send([].concat(...results));
//   }).catch(error => {
//     console.log(error);
//   })
// })

app.post('/api/v1/images', (req, res) => {
  const postData = req.body.postData;
  return axios.all(postData.map((data) => {
    const slug = data.slug;
    const id = data.id;
    const featuredImage = data.featuredImage;
    return axios({
      method: 'post',
      url: `${fileAPIURL}?access_token=${ACCESS_TOKEN}`,
      data: {
        folder_path: "Blog_Media",
        "url": featuredImage
      }
    }).then((response) => {
      const content = response.data;
      return {
        slug,
        id,
        featuredImage: content.url
      }
    })
  })).then(results => {
    res.send([].concat(...results));
  }).catch(error => {
    console.log(error);
  })
})


app.post('/api/v1/updateData', (req, res) => {
  const postData = req.body.postData;
  return axios.all(postData.map(data => {
    let id = data.id;
    let featuredImage = data.featuredImage;
    const putUrl = `https://api.hubapi.com/content/api/v2/blog-posts/${id}?access_token=${ACCESS_TOKEN}`;
    return axios({
      method: 'put',
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

app.listen('8080', () => {
  console.log('server running on port 8080');
});