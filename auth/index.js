var _ = require('underscore'), uid = require('rand-token').uid, fs = require('fs')

var tokenFile = global.appRoot + "/tokens.json"

var cfgTokenAuth = function(req,res, next){
	if(!req.headers.authorization)
		return res.status(401).json({ error : "No Auth Token Provided" })
	if(!_.contains(global.config.auth.tokens, req.headers.authorization))
		return res.status(401).json({ error : "Invalid Auth Token Provided" })
	next()
}

var generateTokenAuthKeys = function(len){
	var tokens  = []
	for(var i =0; i < len; i++)
		tokens.push(uid(global.config.auth.token_length || 32))
	return tokens
}

var configAuth = {
	token : function(app){
		if(global.config.auth.mode == "token"){
				fs.exists(tokenFile, function(xst){
					if(!xst){
						console.log("No Auth Tokens Found. Generating.")
						var tokens = generateTokenAuthKeys(3)
						global.config.auth.tokens = tokens
						fs.writeFile(tokenFile, JSON.stringify(tokens))
					}
					else
						global.config.auth.tokens = require(tokenFile)
					console.log("Tokens: ", global.config.auth.tokens.join(", "))
				})
				app.all('*', cfgTokenAuth)
		}
	}

}

exports  = module.exports = function(app){
		if(global.config.auth.mode && global.config.auth.mode != 'none'){
			console.log('Authmode : ' + global.config.auth.mode)
			configAuth[global.config.auth.mode](app)
		}else{
			console.log('WARNING! Authentication is disabled! No Credentials are required to use this API')
		}
}
