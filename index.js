var config = require('./config.js');
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var async = require('async');
var upload = require('express-fileupload');
var util = require('util');
var utils = require('./utils');
var browser = require('./browser');
var file = require('./file')();

//Require db init
var db;
var queries;
var script;
var view;
var user;

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({extended:true}));
//Populates req.files
app.use(upload());

app.use(express.static(__dirname + '/public'));


//Express Session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

// Start connection to database
MongoClient.connect(config.db.url, function(err, client){
	db = client.db(config.db.dbname);
	queries = require('./queries')(db);
	script = require('./script')(db);
	view = require('./view')(db);
	user = require('./user')(db);
	init();
	// client.close();
});

app.post('/logUser', function(req, res){
	console.log('logUser');
	console.log(req.body);
	user.login(req.body, function(response){
		res.send(response);
	}, req)
});

app.post('/register', function(req, res){
	console.log('register');
	console.log(req.body);
	user.register(req.body, function(response){
		res.send(response);
	}, req)
});

app.post('/logout', function(req, res){
	console.log('logUser');
	console.log(req.body);
	user.logout(req.body, function(response){
		res.send(response);
	}, req)
});

app.post('/addUploadToField/:object/:property', function(req, res){
	console.log('addUploadToField');
	console.log(req.body);
	console.log(req.files);
	console.log(req.files.files);
	var files = req.files.files;

	file.moveEach(files, function(err, paths){
		console.log('addUploadToField - Added paths');
		console.log(paths);
		queries.addElementsToObjectValue({
			object:req.params.object,
			property:req.params.property,
			elements:paths
		}, function(){
			view.getObjectProperty({
				object:req.params.object,
				property:req.params.property
			}, function(view){
				res.send(view);
			})
		})
	});
});

app.post('/getParentContent/', function(req, res){
	getContent('users', req.session.user._id, req, res, function(result){
		browser.setContent('objectcontent-items', result, function(answer){
			res.send(answer);
		})
	});
});

app.post('/getParentContent/:parent', function(req, res){
	getContent('objects', req.params.parent, req, res, function(result){
		browser.setContent('objectcontent-items', result, function(answer){
			res.send(answer);
		})
	});
});

app.post('/getNextParentContent/:parent', function(req, res){
	console.log('getNextParentContent');
	getContent('objects', req.params.parent, req, res, function(result){
		browser.appendContent('objectcontent-items', result, function(answer){
			res.send(answer);
		})
	});
});

function getContent(collection, id, req, res, next){
	console.log('@@@@@@@@@@@@ getParentContent @@@@@@@@@@@@');
	console.log('collection:',collection,'id: %j',id);
	console.log(req.body);
	var data = req.body;
	if(req.body.property) data = utils.getArrayOfObjectsFromArrays(req.body, ['property','operator','value'], 'filters');
	data = utils.getArrayOfObjectsFromArrays(req.body, ['sort-property','sort-order'], 'sort');
	data.id = id;
	data.collection = collection;
	data.page = parseInt(data.page);
	queries.getParentContent(data, function(result){
		result.page = data.page;
		next(result);
	})
}

app.post('/updateObjectValues/:object', function(req, res){
	console.log('------------updateObjectValues');
	console.log(req.body);
	queries.updateObjectValues({
		id:req.params.object,
		form:req.body
	}, function(){
		res.send({action:'goBack'});
	})
});

app.post('/addObjectToParent', function(req, res){
	console.log('addObjectToParent - User');
	queries.addObjectToParent({
		collection:'users',
		id:req.session.user._id,
		model:req.body.model
	}, function(result){
		res.send(result);
	});
});

app.post('/addObjectToParent/:parent', function(req, res){
	console.log('addObjectToParent - Object');
	queries.addObjectToParent({
		collection:'objects',
		id:req.params.parent,
		model:req.body.model
	}, function(result){
		res.send(result);
	});
});

app.post('/addNewObject/:model/:parent', function(req, res){
	console.log('addNewObject');
	queries.addObjectToParent({
		collection:'objects',
		id:req.params.parent,
		model:req.params.model,
		values:req.body
	}, function(result){
		res.send(result);
	});
});

app.post('/emptyObject/:object', function(req, res){
	console.log('emptyObject', req.params.object);
	var object = req.params.object;
	queries.removeAllChildrenFromObject({id:object}, function(){
		view.getObject({id:object}, function(result){
			res.send(result);
		});
	})
	
});

app.post('/removeObject/:object', function(req, res){
	console.log('removeObject - ' + req.params.object);
	queries.removeObject({
		object:req.params.object
	}, function(result){
		res.send(result);
	});
});

app.post('/updateProperty/:property', function(req, res){
	console.log('updateProperty - ' + req.params.property);
	console.log(req.body);
	queries.updateProperty({
		id:req.params.property,
		form:req.body
	}, function(result){
		res.send(result);
	});
});

app.post('/updateObjectProperty/:object/:property', function(req, res){
	console.log('updateObjectProperty');
	var indexes = [];
	for(var x in req.body){
		if(req.body[x] == 'on') indexes.push(parseInt(x));
	}
	if(indexes != []) queries.removeElementsFromObjectValue({
		object:req.params.object,
		property:req.params.property,
		indexes:indexes
	}, function(){
		view.getObjectProperty({
			object:req.params.object,
			property:req.params.property
		}, function(view){
			res.send(view);
		})
	})
	console.log('indexes');
	console.log(indexes);
});

app.post('/updateObjectArrayValue', function(req, res){
	console.log('addUploadToField');
	console.log(req.body);
});

app.post('/getFilteredContent', function(req, res){
	console.log('getFilteredContent');
	console.log(req.body);
	var data = req.body;
	data.action = 'getFilteredContent';
	doQuery(res, req, data);
});

app.post('/addPropertyToModel/:model', function(req, res){
	queries.addPropertyToModel({model:req.params.model}, function(answer){
		res.send(answer);
	})
});

app.post('/removePropertiesFromModel/:model', function(req, res){
	console.log('removePropertiesFromModel');
	var indexes = Object.keys(req.body);
	console.log(indexes);
	queries.removePropertiesFromModel({model:req.params.model, ids:indexes}, function(answer){
		res.send(answer);
	})
});

app.post('/shareObject/:object', function(req, res){
	console.log('shareObject', req.params.object);
	console.log(req.body);
	
});

app.post('/importCSV/:parent', function(req, res){
	console.log('----->importCSV');
	console.log(req.body);
	console.log(req.files);
	var model = req.body.model;
	delete req.body.model;
	var properties = req.body;
	doScript(res, req, {
		script:'importCSV',
		parent:req.params.parent,
		model:model,
		properties:properties,
		file:req.files.file
	});
});

app.post('/addRoleToObject/:object', function(req, res){
	console.log('addRoleToObject');
	queries.addRoleToObject({
		object:req.params.object,
		role:req.body.role,
	}, function(){
		browser.addElement('objectroles-element', {
			objectid:req.params.object,
			roleid:req.body.role
		}, function(answer){
			res.send(answer);
		});
	})
});

app.post('/updateObjectRole/:object/:role', function(req, res){
	console.log('updateObjectRole');
	console.log(req.params);
	console.log(req.body);
	queries.updateObjectRole({
		object:req.params.object,
		role:req.params.role,
		form:req.body
	}, function(){
		res.send({action:'goBack'});
	})
});

app.post('/updateRolePropertiesInObject/:object/:role', function(req, res){
	console.log('updateRolePropertiesInObject');
	console.log(req.params);
	console.log(req.body);
	var properties = Object.keys(req.body);
	queries.updateRolePropertiesInObject({
		object:req.params.object,
		role:req.params.role,
		properties:properties
	}, function(){
		res.send({action:'closePop'});
	})
});

app.post('/updateObjectRoleFilters/:object/:role', function(req, res){
	console.log('updateObjectRoleFilters');
	console.log(req.body);
	var form = utils.getArrayOfObjectsFromArrays(req.body, ['property','operator','value'], 'filters');
	console.log(form);
	queries.updateObjectRoleFilters({
		object:req.params.object,
		role:req.params.role,
		filters:form.filters
	}, function(){
		res.send({action:'closePop'});
	});
});

app.post('/uploadFiles', function(req, res){
	console.log('uploadFiles');
	console.log(req.body);
	var file = req.files.files;
	var destination = 'public/uploads/' + file.name;
	var index = parseInt(req.body.index)-1;
	file.mv(destination, function(err){
		if(err){
			browser.notify('fail', file.name + ' was not uploaded', function(answer){
				res.send(answer);
			});
		}
		else{
			browser.replaceElement(index, 'objectproperty-album-item', {
				id:req.body.qquuid,
				src:file.name
			}, function(answer){
				res.send(answer);
			});
		}
	});
});



var routes = {
	'/':function(req, res, next){
		view.getRoot({user:req.session.user}, function(result){
			next(result);
		})
	},
	'/notfound':function(req, res, next){
		next({action:'fillView', model:'notfound'});
	},
	'/compte':function(req, res, next){
		console.log('Regisdfsfsfdter form');
	},
	'/objects':function(req, res, next){
		view.getRoot({user:req.session.user}, function(result){
			next(result);
		})
	},
	'/objects/:id':function(req, res, next){
		view.getObject({id:req.params.id}, function(result){
			next(result);
		});
	},
	'/objects/:id/card':function(req, res, next){
		view.getObjectCard({id:req.params.id}, function(result){
			next(result);
		});
	},
	'/objects/:id/import':function(req, res, next){
		view.getImport({parent:req.params.id}, function(result){
			next(result);
		});
	},
	'/objects/:id/roles':function(req, res, next){
		view.getRoles({object:req.params.id}, function(result){
			next(result);
		});
	},
	'/objects/:object/roles/:role':function(req, res, next){
		view.getRole({
			object:req.params.object,
			role:req.params.role},
		function(result){
			next(result);
		});
	},
	'/objects/:object/:property':function(req, res, next){
		view.getObjectProperty({object:req.params.object, property:req.params.property}, function(result){
			next(result);
		});
	},
	'/models':function(req, res, next){
		view.getModelList({}, function(result){
			next(result);
		})
	},
	'/models/:id':function(req, res, next){
		view.getModel({id:req.params.id}, function(result){
			next(result);
		})
	},
	'/models/:id/settings':function(req, res, next){
		view.getModelCard({id:req.params.id}, function(result){
			next(result);
		})
	},
	'/models/:id/index':function(req, res, next){
		view.getModelIndex({id:req.params.id}, function(result){
			next(result);
		})
	},
	'/properties':function(req, res, next){
		view.getProperties({}, function(result){
			next(result);
		})
	},
	'/property/:id':function(req, res, next){
		view.getPropertyCard({id:req.params.id}, function(result){
			next(result);
		})
	},
	'/account':function(req, res, next){
		browser.setTemplate('account', {
			id:req.session.user._id,
			name:req.session.user.name
		}, function(answer){
			next(answer);
		});
	},
	'*':function(req, res, next){
		next({action:'fillView', model:'notfound'});
	}
}

function init(){
	setRoutes(routes);
}

function setRoutes(routes){
	var urls = Object.keys(routes);
	async.eachSeries(urls, function(x, done){
		app.get(x, function(req, res){
			console.log('Route - GET - ' + x);
			if(!req.session.user){
				sendIndex({action:'setTemplate', template:'login'}, res);
			}else{
				routes[x](req, res, function(result){
					sendIndex(result, res);
				});
			}
		});
		app.post(x, function(req, res){
			console.log('Route - POST - ' + x);
			if(!req.session.user){
				res.send({action:'setTemplate', name:'login'});
			}else{
				routes[x](req, res, function(result){
					res.send(result);
				});
			}
		});
		done();
	}, function allDone(err) {
		server.listen(config.app.port);
		console.log('Server is running on port ' + config.app.port);
	});
}

function sendIndex(content, res){
	var data = fs.readFile('index.html', 'utf8', function(err, html){
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(html.replace('Server.data = null;', 'Server.data = '+JSON.stringify(content)+';'));
        res.end();
	});
}

function doQuery(res, req, data){
	console.log('doQuery');
	console.log(data);
	queries[data.action](data, function(result){
		res.send(result);
	}, req);
}

function doScript(res, req, data){
	script[data.script](data, function(result){
		res.send(result);
	}, req);
}

function clientReady(req, res){
	doQuery(res, req, {});
}

