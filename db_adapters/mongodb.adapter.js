var mongodb = require('mongodb')
        , format = require('util').format;

var connectionString
module.exports = {
    configure: function(cfg) {
        connectionString = makeConnectionString(cfg)
    },
    select: function(coll, query, lim, resp) {
        mongodb.MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;
            var collection = db.collection(coll)
            if (query._id)
                query._id = new mongodb.ObjectID(query._id)                   
            collection.find(query, {limit: lim}).toArray(db_return(resp,db))
        })
    },
    insert: function(coll, data, resp) {
        mongodb.MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;
            var collection = db.collection(coll)
            collection.insert(data, db_return(resp,db));
        })
    },
    delete : function(coll, data, resp){
        mongodb.MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;
            var collection = db.collection(coll)
            if (data._id)
                data._id = new mongodb.ObjectID(data._id)            
            collection.remove(data, db_return(resp,db));
        })
    }
}

var db_return = function(resp, db) {
    return function(err, results){
        if (err)
            throw err;
        if(typeof results == "number")
            results = { success : results }
        resp.json(results)
        db.close()
    }
}

var makeConnectionString = function(cfg) {
    var cstrTemp = "mongodb://#host:#port/#schema"
    console.log(cstrTemp.replace("#host", cfg.host).replace("#port", cfg.port).replace("#schema", cfg.schema))
    return cstrTemp.replace("#host", cfg.host).replace("#port", cfg.port).replace("#schema", cfg.schema)
}