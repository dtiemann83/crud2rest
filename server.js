var express = require('express'), bodyparser = require('body-parser'), path = require('path')
global.config = require("./config.json")
global.appRoot = path.resolve(__dirname);

if(process.env.DB_HOST)
  global.config.database.host = process.env.DB_HOST

console.log(global.config.database)

var app = express()
app.use(bodyparser())

var auth = require('./auth')
auth(app)

var routes = require("./routes")
routes.attachRoutes(app)

console.log("Configuring Database...(" + global.config.database.type + ")")
var db_adapter = require("./db_adapters/" + global.config.database.type +".adapter.js");
db_adapter.configure(global.config.database)
express.request.db_adapter = db_adapter

app.listen(global.config.http.port,function(){
    console.log('Accepting incoming requests: ' + global.config.http.port)
})
