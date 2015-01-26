var fs = require('fs');

var hotCarFile = require.resolve('./hot/car');

fs.appendFileSync(hotCarFile, '\n');