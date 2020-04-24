const CONF = [
  {
    context: '/v1/items',
    target: 'http://localhost:8080',
    pathRewrite: {
      '/v1/items': '/api'
    },
    changeOrigin: true,
    secure: false,
  },
  {
    context: '/v1/houses',
    target: 'http://localhost:28081',
    pathRewrite: {
      '/v1/houses': '/api'
    },
    changeOrigin: true,
    secure: false,
  },
  {
    context: '/environment',
    target: 'https://hrh.michaelilyin.ru',
    changeOrigin: true,
    secure: true,
  }
];

module.exports = CONF;
