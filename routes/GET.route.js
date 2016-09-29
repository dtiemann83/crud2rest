var url = require('url');

module.exports = function routes(router) {
    router.get("/", showHelloPage)
    router.get("/:collection/:id?", selectFromCollection)
    //router.get("/:collection/:limit?", selectFromCollection)
}

var showHelloPage = function(req,resp){
    resp.json({
        message : "NERDIA"
    })
}

var selectFromCollection = function(req,resp){
    var query = url.parse(req.url, true).query;
    var limit
    if(query.limit){
        limit = parseInt(query.limit)
        delete query.limit
    }
    if(req.params.id)
        query._id = req.params.id
    req.db_adapter.select(req.params.collection, query,limit, resp)
}
