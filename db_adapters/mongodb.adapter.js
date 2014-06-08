var MongoClient = require('mongodb').MongoClient
        , format = require('util').format;

var connectionString
module.exports = {
    configure: function(cfg) {
        connectionString = makeConnectionString(cfg)
    },
    selectAll: function(coll, resp) {
        console.dir(coll)
        MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;         
            var collection = db.collection(coll)
            collection.find().toArray(function (err, results){                
                resp.json(results)
                db.close()
            })
        })
    }
}

var makeConnectionString = function(cfg) {
    var cstrTemp = "mongodb://#host:#port/#schema"
    console.log(cstrTemp.replace("#host", cfg.host).replace("#port", cfg.port).replace("#schema", cfg.schema))
    return cstrTemp.replace("#host", cfg.host).replace("#port", cfg.port).replace("#schema", cfg.schema)
}