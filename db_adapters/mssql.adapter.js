var mssql = require('mssql'), aShared = require('./adapterShared.js'), _=require('underscore'), squel = require('squel').useFlavour('mssql')
var connectionString
module.exports = {
    configure: function(cfg) {
        connectionString = aShared.makeConnectionString('mssql',cfg)
				mssql.connect(connectionString).then(function(){
					console.log('\nSQL DB Connect Success')
				}).catch(function(err){
					console.log(connectionString)
					console.log(err)
				})
    },
    select: function(coll, query, lim, resp) {
				var sq = squel.select().from(coll)
				_.each(query, function(v,k){
						sq.where(k + ' = ?',v)
				})
				if(lim)
					sq.top(lim)
			new mssql.Request().query(sq.toString(),function(err, rec) {
				 aShared.db_return(resp)(err,rec)
	    })
    },
    insert: function(coll, data, resp) {
				var qry = squel.insert().into(coll).setFields(data).toString()
				resp.send(qry)
    },
    delete : function(coll, data, resp){
				var sq = squel.delete().from(coll)
				_.each(data, function(v,k){
						if(v == undefined)
							return
						if(k == '_id')
							sq.where('id = ?',v)
						else
							sq.where(k + ' = ?',v)
				})
				resp.send(sq.toString())
    }
}
