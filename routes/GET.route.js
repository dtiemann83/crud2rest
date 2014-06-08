/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function routes(router) {    
    router.get("/", showHelloPage)    
    router.get("/:collection/", selectAllFromCollection)  
}

var showHelloPage = function(req,resp){
    resp.json({
        message : "NERDIA"
    })
}


var selectAllFromCollection = function(req,resp){    
    req.db_adapter.selectAll(req.params.collection, resp)
}
