'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"http://desktop-cj8e755:8080/TPA"'
  //http://218.16.212.43:16452
  //http://desktop-cj8e755:8080
})
