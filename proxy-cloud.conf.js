const CONF = [
  {
    context: '/v1',
    target: 'https://api.hrh.michaelilyin.ru',
    changeOrigin: true,
    secure: true,
  },
  {
    context: '/environment',
    target: 'https://hrh.michaelilyin.ru',
    changeOrigin: true,
    secure: true,
  }
];

module.exports = CONF;
