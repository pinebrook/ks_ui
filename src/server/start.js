require('ignore-styles');

require('@babel/register')({
    presets: [
      '@babel/preset-env', 
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties', 
      '@babel/plugin-syntax-dynamic-import',
      'dynamic-import-node', 
      '@loadable/babel-plugin'
    ]
});
  
  // Import the rest of our application.
module.exports = require('./server.js');