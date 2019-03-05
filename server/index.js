const app = require('express')();
const axios = require('axios');
const x = require('x-ray-scraper');
const normalizeUrl = require('normalize-url');
const { URL } = require('url');

const ACCESS_TOKEN = '34521b68-d79e-4700-b213-e6b3366a5eb9'
const hubspotBlogName = 'james-wordpress';

app.post('/api/website', (req, res) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body);
    const JSONData = JSON.parse(body);
    const url = JSONData.url;
    const stream = x(`http://${url}`, '.post', [{
      slug: 'a@href',
      featuredImage: 'img@src',
    }]).stream();
    stream.pipe(res);
  })
});

app.post('/api/v1/posts', (req, res) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    const { postData } = JSON.parse(body);
    return axios.all(postData.map((data) => {
      let slug = data.slug;
      let featuredImage = data.featuredImage;
      slug = normalizeUrl(slug, {
        removeTrailingSlash: true
      });
      slug = new URL(slug);
      slug = slug.pathname;
      const slugURL = `https://api.hubapi.com/blogs/v3/blog-posts?access_token=${ACCESS_TOKEN}&slug=${hubspotBlogName}${slug}`;
      return axios.get(slugURL).then((response) => {
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
    })).then(results => {
      res.send([].concat(...results));
    }).catch(error => {
      console.log(error);
    })
  })
})


app.listen('8080', () => {
  console.log('server running on port 8080');
});
