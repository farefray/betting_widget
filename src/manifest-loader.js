const manifest = require('./manifest')
// A loader to transform a partial manifest.json file into a complete
// manifest.json file by adding entries from an NPM package.json.
module.exports = function (source) {
  // Return the processed JSON to be used by the next item in the loader chain.
  return Object.assign({}, source, manifest)
}
