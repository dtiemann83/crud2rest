var url = require('url');

module.exports = function routes(router) {   
    router.delete("/:collection/:id", deleteFromCollection);
}

var deleteFromCollection = function(req,resp){   
    req.db_adapter.delete(req.params.collection, {_id:req.params.id}, resp)
}