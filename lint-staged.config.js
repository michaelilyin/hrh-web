module.exports = {
  '*.ts': (files) => {
    const cwd = process.cwd();
    const names = files.map((file) => file.substring(cwd.length));
    console.info(names.join(','))
    return `ng lint --typeCheck=true --files ${names.join(',')}`;
  },
  '*.{ts,html,scss}': 'prettier --check'
};
