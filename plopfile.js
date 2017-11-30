var path = require('path')

module.exports = (plop) => {
  require('plop-generator-redux')(plop, {
    basePath: path.resolve(__dirname, 'app', 'store'),
    prefix: 'redux'
  })
}
