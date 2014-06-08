var express = require('express')
var bodyparser = require('body-parser')
GLOBAL.config = require("./config.json")

var app = express()
app.use(bodyparser())

var routes = require("./routes")
routes.attachRoutes(app)

console.log("Configuring Database.(" + GLOBAL.config.database.type + ")")
var db_adapter = require("./db_adapters/" + GLOBAL.config.database.type +".adapter.js");
db_adapter.configure(GLOBAL.config.database)
express.request.db_adapter = db_adapter

app.listen(GLOBAL.config.http.port,function(){
    console.log('Accepting incoming requests: ' + GLOBAL.config.http.port)
})