
require('fs').readdirSync(__Routes).forEach(file => {
    module.exports[file.split('.')[0]] = require(__Routes + file)
})