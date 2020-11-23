function delModule (fileName) {
    var fs = require('fs')

    fs.unlink(fileName, function (err) {
        if (err) throw err;
        console.log('file deleted')
    });
}
module.exports.delModule = delModule