const { createProxyMiddleware } = require('http-proxy-middleware')

// target: 'http://127.0.0.1:5000',
const proxy = {
  target: 'https://pubshopapp.herokuapp.com',
  changeOrigin: true,
}

module.exports = function (app) {
  app.use('/api', createProxyMiddleware(proxy))
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
// $ npm install http-proxy-middleware --save
// $ # or
// $ yarn add http-proxy-middleware
