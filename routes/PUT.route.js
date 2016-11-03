var url = require('url');

module.exports = function routes(router) {
    router.put("/:collection/", insertIntoCollection);
}

var insertIntoCollection = function(req,resp){
    req.db_adapter.insert(req.params.collection, req.body, resp)
}
