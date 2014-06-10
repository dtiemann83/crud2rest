var MongoClient = require('mongodb').MongoClient
        , format = require('util').format;

var connectionString
module.exports = {
    configure: function(cfg) {
        connectionString = makeConnectionString(cfg)
    },
    select: function(coll, query, lim, resp) {
        MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;
            var collection = db.collection(coll)
            collection.find(query, {limit: lim}).toArray(db_return(resp,db))
        })
    },
    insert: function(coll, data, resp) {
        MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;
            var collection = db.collection(coll)
            collection.insert(data, db_return(resp,db));
        })
    }
}

var db_return = function(resp, db) {
    return function(err, results){
        if (err)
            throw err;
        resp.json(results)
        db.close()
    }
}

var makeConnectionString = function(cfg) {
    var cstrTemp = "mongodb://#host:#port/#schema"
    console.log(cstrTemp.replace("#host", cfg.host).replace("#port", cfg.port).replace("#schema", cfg.schema))
    return cstrTemp.replace("#host", cfg.host).replace("#port", cfg.port).replace("#schema", cfg.schema)
}