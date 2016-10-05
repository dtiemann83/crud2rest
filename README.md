crud2rest
======
Crud2rest is designed to be a simple, turnkey NodeJS/express based RESTful API, that plugs in to multiple different database engines, giving you simple CRUD access to tables and collections.

####Currently Supported Database Engines:
- MongoDB
- MS-SQL

#### Planned Support
- MySQL
- SQLite
- PostgreSQL

### Getting Started

#### Download
Clone Repository:
```shell
git clone git@github.com:dtiemann83/crud2rest.git
```

Edit config.json with proper database settings



#### config.json Options

| Section	| Option | Description | Values | Default |
|---------|--------|-------------|--------|---------|
| http		| port	| TCP Port to listen to HTTP requests| 1 - 65535 | 9080 |
| database| type	| DB Engine to use | mongodb<br>mssql | mongodb |
|					| host |	Hostname or IP Address for DB server | (any) | localhost |
|					|	user | Username to access DB server | (any) | (blank) |
|					|	password | Password to access DB server | (any) | (blank) |
|					|	port		| TCP Port to access DB Server |	1 - 65535 | *server specific* |
|					| schema | Schema/Catalog to access |	(any) | (none) |
| auth 		| mode | API Authentication mode. | none<br>token | none |
|					| token_length | Length of generated token string (required if auto generating tokens) | 1 - 1024 | 32 |

Example config.json
```javascript
{
    "http":{
        "port":9080
    },
    "database":{
        "type": "mongodb",
        "host":"localhost",
        "user":"username",
				"password" : "password",
        "port": "",
        "schema": "test"
    },
		"auth" : {
			"mode" : "none",
			"token_length" : 32
		}
}
```
