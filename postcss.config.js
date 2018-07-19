/* eslint-disable prefer-import/prefer-import-over-require */
const path = require('path');

module.exports = require('postcss-preset-moxy')({
    // Any non-relative imports are resolved to this path
    importPath: path.join(__dirname, 'src/styles/imports'),
    // Process relative url statements
    url: true,
});
