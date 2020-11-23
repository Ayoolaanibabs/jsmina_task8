function readFile (fileName) {
    var http = require('http');
    var fs = require('fs');
    http.createServer(function(req,res){
        fs.readFile(fileName, function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end()
        });
    }).listen(8000);
}

module.exports.readFile = readFile;