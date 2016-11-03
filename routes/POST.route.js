var url = require('url');

module.exports = function routes(router) {
    router.post("/:collection/:id?", updateFromCollection)
}

var updateFromCollection = function(req,resp){
    //var query = url.parse(req.url, true).query;
		var query = req.body
    var limit
    if(query.limit){
        limit = parseInt(query.limit)
        delete query.limit
    }
		var recid = req.params.id || query._id
    // if(req.params.id)
    //    query._id = req.params.id
    req.db_adapter.update(req.params.collection, recid ,query, resp)
}
