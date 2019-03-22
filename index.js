require('dotenv').config();
const express = require ('express');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.use(bodyParser.json());
app.use(session({ secret: CLIENT_SECRET, resave: false, saveUninitialized: true }));


require('./routes/authRoutes')(app);
require('./routes/apiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  
  app.use(express.static('client/build'));

  //Express serve up index.html
  // If it doesn't recognize the route
  app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});