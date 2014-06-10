var url = require('url');

module.exports = function routes(router) {    
    router.get("/", showHelloPage)    
    router.get("/:collection/:limit?", selectFromCollection)    
}

var showHelloPage = function(req,resp){
    resp.json({
        message : "NERDIA"
    })
}

var selectFromCollection = function(req,resp){           
    var query = url.parse(req.url, true).query;
    req.db_adapter.select(req.params.collection, query,req.params.limit, resp)
}


