var mongodb = require('mongodb'), aShared = require('adapterShared.js'), format = require('util').format;

var connectionString
module.exports = {
    configure: function(cfg) {
        connectionString = aShared.makeConnectionString('mongodb',cfg)
    },
    select: function(coll, query, lim, resp) {
        mongodb.MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;
            var collection = db.collection(coll)
            if (query._id)
                query._id = new mongodb.ObjectID(query._id)
            collection.find(query, {limit: lim}).toArray(aShared.db_return(resp,db))
        })
    },
    insert: function(coll, data, resp) {
        mongodb.MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;
            var collection = db.collection(coll)
            collection.insert(data,  aShared.db_return(resp,db));
        })
    },
    delete : function(coll, data, resp){
        mongodb.MongoClient.connect(connectionString, function(err, db) {
            if (err)
                throw err;
            var collection = db.collection(coll)
            if (data._id)
                data._id = new mongodb.ObjectID(data._id)
            collection.remove(data, aShared.db_return(resp,db));
        })
    }
}
