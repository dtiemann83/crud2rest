format = require('util').format

module.exports = exports = {

	makeConnectionString : function(dbtype,cfg) {
	    return "#dbtype://#creds#host#port/#schema".replace("#dbtype", dbtype)
				.replace("#creds", cfg.user ? [cfg.user, cfg.password].join(":") + "@" : "")
				.replace("#host", cfg.host).replace("#schema", cfg.schema)
				.replace("#port", cfg.port ? ":" + cfg.port : "")
	    //return cstr
	},
	db_return : function(resp, db) {
	    return function(err, results){
	        if (err)
	            throw err;
	        if(typeof results == "number")
	            results = { success : results }
	        resp.json(results)
					if(db)
	        	db.close()
	    }
	}

}
