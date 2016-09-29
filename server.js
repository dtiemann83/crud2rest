var express = require('express')
var bodyparser = require('body-parser')
global.config = require("./config.json")

var app = express()
app.use(bodyparser())

var routes = require("./routes")
routes.attachRoutes(app)

console.log("Configuring Database.(" + global.config.database.type + ")")
var db_adapter = require("./db_adapters/" + global.config.database.type +".adapter.js");
db_adapter.configure(global.config.database)
express.request.db_adapter = db_adapter

app.listen(global.config.http.port,function(){
    console.log('Accepting incoming requests: ' + global.config.http.port)
})
