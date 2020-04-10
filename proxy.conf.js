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
    context: '/environment',
    target: 'https://hrh.michaelilyin.ru',
    changeOrigin: true,
    secure: true,
  }
];

module.exports = CONF;
