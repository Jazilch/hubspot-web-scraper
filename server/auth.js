'use strict';
require('dotenv').config()
const app = require('express')();
const NodeCache = require('node-cache');
const request = require('request-promise-native');
const session = require('express-session');
const fs = require('fs');

const PORT = 8081;
const REDIRECT_URI = `http://localhost:${PORT}/auth/hubspot/callback`;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SCOPES = (process.env.SCOPE.split(/ |, ?|%20/) || ['contacts']).join(' ');

const refreshTokenStore = {};
const accessTokenCache = new NodeCache({ deleteOnExpire: true });

app.use(session({ secret: CLIENT_SECRET, resave: false, saveUninitialized: true }));

const authUrl =
  'https://app.hubspot.com/oauth/authorize' +
  `?client_id=${encodeURIComponent(CLIENT_ID)}` + // app's client ID
  `&scope=${encodeURIComponent(SCOPES)}` + // scopes being requested by the app
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`; // where to send the user after the consent page

app.get('/auth/hubspot', (req, res) => {
  console.log('Initiating OAuth 2.0 flow with HubSpot');
  console.log("Step 1: Redirecting user to HubSpot's OAuth 2.0 server");
  res.redirect(authUrl);
  console.log('Step 2: User is being prompted for consent by HubSpot');
});

app.get( '/auth/hubspot/callback', async (req, res) => {
  const authCodeProof = {
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code: req.query.code
  };
  console.log('Step 4: Exchanging authorization code for an access token and refresh token');
  const token = await exchangeForTokens(req.sessionID, authCodeProof);
  if (token.message) {
    return res.redirect(`/error?msg=${token.message}`);
  }

  // Once the tokens have been retrieved, use them to make a query
  // to the HubSpot API
  res.redirect(`http://localhost:3000/app`);
});

//==========================================//
//   Exchanging Proof for an Access Token   //
//==========================================//

const exchangeForTokens = async (userId, exchangeProof) => {
  try {
    const responseBody = await request.post('https://api.hubapi.com/oauth/v1/token', {
      form: exchangeProof
    });
    // Usually, this token data should be persisted in a database and associated with
    // a user identity.
    const tokens = JSON.parse(responseBody);
    refreshTokenStore[userId] = tokens.refresh_token;
    accessTokenCache.set(userId, tokens.access_token, Math.round(tokens.expires_in * 0.75));

    return tokens.access_token;
  } catch (e) {
    console.error(`  > Error exchanging ${exchangeProof.grant_type} for access token`);
    return JSON.parse(e.response.body);
  }
};

const refreshAccessToken = async (userId) => {
  const refreshTokenProof = {
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    refresh_token: refreshTokenStore[userId]
  };
  return await exchangeForTokens(userId, refreshTokenProof);
};

const getAccessToken = async (userId) => {
  // If the access token has expired, retrieve
  // a new one using the refresh token
  if (!accessTokenCache.get(userId)) {
    console.log('Refreshing expired access token');
    await refreshAccessToken(userId);
  }
  return accessTokenCache.get(userId);
};

app.get('/app', async (req, res) => {
  try {
    const access_token = await getAccessToken(req.sessionID);
    res.redirect('http://localhost:3000/home');

  console.log(access_token, 'im the access token');  
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})