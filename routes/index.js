exports.attachRoutes = function attachRoutes (server) {
    var fs = require('fs');
    fs.readdir( __dirname, function(err, files){
				process.stdout.write("Route Files: ")
        for(file in files){
            if(files[file].match(/\.route\.js$/)){
                require("./" + files[file])(server);
                process.stdout.write(files[file]+ ", ");
            }
        }
    });
};
