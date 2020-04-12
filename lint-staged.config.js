module.exports = {
  '*.ts': (files) => `ng lint --typeCheck=true --files ${files.join(',')}`,
  '*.{ts,html,scss}': 'prettier --check'
};
