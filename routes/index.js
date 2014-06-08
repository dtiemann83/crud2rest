exports.attachRoutes = function attachRoutes (server) {
    var fs = require('fs');
    fs.readdir( __dirname, function(err, files){
        for(file in files){
            if(files[file].match(/\.route\.js$/)){
                require("./" + files[file])(server);
                console.log("Route File: "+ files[file]);
            }
        }
    });
};