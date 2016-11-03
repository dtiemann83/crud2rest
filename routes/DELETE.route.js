var url = require('url'), _ = require('underscore')

module.exports = function routes(router) {
    router.delete("/:collection/:id?", deleteFromCollection);
}

var deleteFromCollection = function(req,resp){		
		var prms = _.extend({ _id: req.params.id }, req.body || req.query)
    req.db_adapter.delete(req.params.collection, prms, resp)
}
