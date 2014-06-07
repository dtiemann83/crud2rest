var express = require('express')
var bodyparser = require('body-parser')

GLOBAL.config = require("./config.json")
console.dir(GLOBAL.config.name)

var app = express()
app.use(bodyparser())

var routes = require("./routes")
routes.attachRoutes(app)

app.listen(GLOBAL.config.http.port,function(){
    console.log('Accepting incoming requests: ' + GLOBAL.config.http.port)
})