format = require('util').format

var errReturn = function(resp, stat, msg){
    resp.status(stat).json({
      "success" : false,
      "message" : msg || "An error occurred"
    })
}

module.exports = exports = {
  makeConnectionString : function(dbtype,cfg) {
      return "#dbtype://#creds#host#port/#schema".replace("#dbtype", dbtype)
        .replace("#creds", cfg.user ? [cfg.user, cfg.password].join(":") + "@" : "")
        .replace("#host",  cfg.host).replace("#schema", cfg.schema)
        .replace("#port", cfg.port ? ":" + cfg.port : "")	    
  },
  db_return : function(resp) {
      return function(err, results){
          if (err){
            console.dir(err)
            return errReturn(resp, 500, err)
          }

          if(typeof results == "number")
              results = { success : results }
          resp.json( { success : true, result : results })
      }
  },
  error_return : errReturn


}
