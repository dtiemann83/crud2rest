var mongodb = require('mongodb'), aShared = require('./adapterShared.js'), util = require('util'),format = util.format, _ = require('underscore')
var connectionString, db

var scrubQuery = function(query, sel){
	_.each(query, function(val, key){
		if(util.isArray(val) && sel){
			query[key] = { $in : val }
		}
		if(!isNaN(val)){
			query[key] = parseFloat(val)
		}
	})
}

module.exports = {
    configure: function(cfg) {
        connectionString = aShared.makeConnectionString('mongodb',cfg)
				mongodb.MongoClient.connect(connectionString, function(err, dbconn) {
					if(err)
						throw err;
					db = dbconn
				})
    },
    select: function(coll, query, lim, resp) {
        var collection = db.collection(coll)
        if(query._id){
					if(util.isArray(query._id)){
							query._id = { $in : _.map(query._id,function(idval){
								return new mongodb.ObjectID(idval)
							}) }
					}
					else
						query._id = new mongodb.ObjectID(query._id)
				}
				scrubQuery(query, true)
        collection.find(query || {}, {limit: lim}).toArray(aShared.db_return(resp))
    },
    insert: function(coll, data, resp) {
        var collection = db.collection(coll)
				delete data._id
				scrubQuery(data)
        collection.insert(data,  aShared.db_return(resp));
    },
    delete : function(coll, data, resp){
        var collection = db.collection(coll)
        if (data._id)
            data._id = new mongodb.ObjectID(data._id)
        collection.remove(data, aShared.db_return(resp));
    },
		update : function(coll, objid, data, resp){
				var collection = db.collection(coll)
				if(!objid)
					return aShared.error_return(resp, 400, "_id field is currently required.")
				query = { _id : new mongodb.ObjectID(objid) }
				var uns = {}
				delete data._id
				_.each(data,function(v,k){
					if(v === null){
						uns[k] = 1
						delete data[k]
					}
				})
				scrubQuery(data)
				var upd = {}
				if(_.keys(data).length)
					upd['$set'] = data
				if(_.keys(uns).length)
					upd['$unset'] = uns
				if(!_.keys(upd).length)
					return aShared.error_return(resp, 400, "Nothing to update")
				collection.update(query, upd , aShared.db_return(resp))
		}
}
