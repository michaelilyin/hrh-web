const CONF = [
  {
    context: '/v1/items',
    target: 'http://localhost:8080',
    pathRewrite: {
      '/v1/items': '/api'
    },
    changeOrigin: true,
    secure: false,
  }
];

module.exports = CONF;
