const app = require('express')();
const x = require('x-ray-scraper');

app.get('/api/google', (req, res) => {
  const stream = x('http://google.com', 'title').stream();
  stream.pipe(res);
});

app.post('/api/website', (req, res) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    const JSONData = JSON.parse(body);
    const url = JSONData.url;
    const stream = x(`http://${url}`, '.post', [{
      slug: 'a@href',
      featuredImage: 'img@src',
    }]).stream();
    stream.pipe(res);
  })
});


app.listen('8080', () => {
  console.log('server running on port 8080');
});
