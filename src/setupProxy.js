/**
 * Copyright (c) 2023
 *
 * @summary Implementation of proxy to communicate with backend server
 * @author Zilin Li
 * @date 2023-05-15
 *  
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};