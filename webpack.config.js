const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    rectAreaLight: './src/rectAreaLight.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  }
};