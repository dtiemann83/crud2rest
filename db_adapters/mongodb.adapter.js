var mongodb = require('mongodb'), aShared = require('./adapterShared.js'), format = require('util').format, _ = require('underscore')

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
    },
		update : function(coll, objid, data, resp){
			mongodb.MongoClient.connect(connectionString, function(err, db) {
					if (err)
							throw err;
					var collection = db.collection(coll)
					if(!objid)
						return aShared.error_return(resp, 400, "_id field is currently required.")
					query = { _id : new mongodb.ObjectID(objid) }
					var uns = {}
					_.each(data,function(v,k){
						if(v === null){
							uns[k] = 1
							delete data[k]
						}
					})
					var upd = {}
					if(_.keys(data).length)
						upd['$set'] = data
					if(_.keys(uns).length)
						upd['$unset'] = uns
					if(!_.keys(upd).length)
						return aShared.error_return(resp, 400, "Nothing to update")
					collection.update(query, upd , aShared.db_return(resp, db))
			})
		}
}
