try {
  require('dotenv').config();
} catch (_) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Failed to import "dotenv"');
  }
}
const express = require('express')
const path = require("path");
const router = require('./services/router.js');
const fetchUser = require('./middleware/fetch-user.js');
const addEJSLocals = require('./middleware/add-ejs-locals.js');
const session = require("express-session");
const { CyclicSessionStore } = require("@cyclic.sh/session-store");
const flash = require('express-flash');
const app = express()

app.set('trust proxy', true);
app.set('view engine', 'ejs');

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

//#############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['css','js','ico','jpg','jpeg','png','svg'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new CyclicSessionStore({
    table: {
      name: process.env.CYCLIC_DB
    },
    touchInterval: 3600000,
    ttl: 86400000
  })
}))
app.use(flash());
app.use(fetchUser);
app.use(addEJSLocals);
app.use('/', router);

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
    .end()
})

module.exports = app
