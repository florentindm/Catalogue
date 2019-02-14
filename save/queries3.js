module.exports = function(db, req){
	var self = this;
	var mongo = require('./mongo.js')(db);
	var models = require('./models.js');
	var utils = require('./utils.js');
	var async = require('async');
	var bcrypt = require('bcryptjs');
	var answers = {
		success:{
			action:'notify',
			content:{
				type:'success'
			}
		}
	}
	
	// –––– Public ––––

	//User
	self.login = function(data, next, req){
		var form = data.form;
		db.collection('users').findOne({mail:form.mail}, function(err, user){
			if(user){
				bcrypt.compare(form.password, user.password, function(err, res) {
					if(res) {
						req.session.user = user;
						self.getUserObjects({user:user._id}, next);
					} else {
						req.session.user = undefined;
						next('notify',{
							type:'fail',
							message:'Incorrect password'
						});
					} 
				});
			}else{
				next('notify',{
					type:'fail',
					message:'This email is not registered.'
				});
			}
		});
	}

	self.register = function(data, next, req){
		bcrypt.genSalt(10, function(error, salt){
			bcrypt.hash(data.form.password, salt, function(error, hash){
				if(error){
					console.log('Error while hash password');
				}else{
					data.form.password = hash;
					insertDocument('users', 'user', data.form, function(id){
						req.session.user = {};
						req.session.user._id = id;
						self.getUserObjects({user:req.session.user}, next);
					});
				}
			})
		});
	}


	//Objects
	self.addObject = function(data, next, req){
		mongo.getElement('models', data.model, 'name', function(modelname){
			data.model = mongo.getObjectId(data.model);
			data.name = 'Nouveau ' + modelname.toLowerCase();
			mongo.insertDocument('objects', 'object', data, function(id){
				if(data.params.object){
					var collection = 'objects';
					var parent = data.params.object;
					var child = id;
				}else{
					var collection = 'users';
					var parent = req.session.user._id;
					var child = id;
				}
				mongo.insertElement(collection, parent, 'children', getObjectId(child), function(){
					self.getObjectCard({id:id}, next);
				});
			});
		})
	}
	self.getUserObjects = function(data, next, req) {
		mongo.getDocumentById('users', data.user, function(user){
			getObjectInstances(user.children, function(objects){
				mongo.getCollectionIndexes('models', function(models){
					next('render', {
						view:'userobjects',
						title:user.name,
						models:models,
						content:objects
					})
				});
			})
		})
	}
	self.getObjectCard = function(data, next){
		getObjectData(data.id, function(object){
			next('render', {
				view:'objectcard',
				icon:object.model.icon,
				title:object.index,
				content:object.properties.map(function(property){
					return {
						name:property._id,
						label:property.name,
						element:property.type,
						editable:true,
						value:object.values[property._id] || null
					}
				}),
				params:{object:object._id}
			});
		})
	}
	getObjectChildren = function(data, next){
		getObjectData(data.id, function(object){
			getObjectInstances(object.children, function(children){
				mongo.getCollectionIndexes('models', function(models){
					next('render', {
						view:'object',
						icon:object.model.icon,
						title:object.values[object.model.index],
						content:children,
						models:models
					});
				});
			});
		});
	}

	//Models
	self.getModels = function(data, next){
		getAllModelsData(data.id, function(models){
			next('render', {
				content:models.map(function(model){
					return {
						_link:'/models/'+model._id,
						icon:model.icon || 'book',
						name:model.name
					}
				})
			})
		});
	}
	self.getModel = function(data, next){
		getModelData(data.id, function(model){
			model = model[0];
			mongo.getCollectionIndexes('properties', function(properties){
				next('render', {
					view:'model',
					icon:model.icon ||'book',
					title:model.name,
					properties:properties,
					content:model.properties.map(function(property){
						return{
							_id:property._id,
							active:'false',
							icon:property.icon || 'book',
							name:property.name,
							link:'/properties/' + property._id
						}
					})
				});
			});
		});
	}
	self.getModelSettings = function(data, next){
		getModelData(data.id, function(model){
			model = model[0];
			next('render', {
				view:'modelsettings',
				icon:model.icon ||'book',
				title:model.name,
				content:[
					{name:'name', label:'Nom', element:'input', value:model.name},
					{name:'action', label:'Icône', element:'icon', value:model.icon || 'book', click:'filechooser'}
				]
			});
		});
	}
	self.getProperties = function(data, next){
		getAllPropertiesData(function(properties){
			next('render', {
				content:properties.map(function(property){
					return {
						_link:'/properties/'+property._id,
						icon:property.icon || 'book',
						name:property.name
					}
				})
			})
		});
	}
	self.getProperty = function(data, next){
		mongo.getDocumentById('properties', data.id, function(property){
			var items = [
				{name:'name', label:'Nom', element:'input', value:property.name},
				{name:'action', label:'Icône', element:'icon', value:property.type, click:'filechooser'},
				{name:'type', label:'Type', element:'input', value:property.type, select:'types'},
			];
			var local
			switch(property.type){
				case'string':
					items.push({name:'length', label:'Longueur', element:'input', value:property.length})
				break;
				case'reference':
					items.push({name:'reference', label:'Référence', element:'input', value:property.reference});
				break;
				case'composition':
					items.push({name:'composition', label:'Composition', element:'input', value:property.composition});
				break;
			}
			next('render', {
				icon:property.icon ||'book',
				title:property.name,
				content:items
			})
		});
	}

	self.getObject = function(data, next){
		mongo.getDocumentById('objects', data.id, function(object){
			mongo.getDocumentById('models', object.model, function(model){
				if(model.container){
					self.getObjectChildren({id:data.id}, next);
				}else{
					self.getObjectCard({id:data.id}, next);
				}
			})
		})
	}

	getObjectInstance = function(data, next){
		getObjectData(data.id, function(object){
			if(object){
				next({
					_id:object._id,
					href:'/objects/' + object._id,
					content:object.properties.map(function(property){
						return {
							name:property.name,
							value:object.values[property._id],
							element:property.type
						}
					})
				});
			}else{
				next(null);
			}
		}, 'instance');
	}

	getObjectAsIndex = function(data, next){
		getObjectData(data.id, function(object){
			next({
				_id:object._id,
				href:'/' + object._id,
				content:{
					icon:getObjectIcon(object),
					index:getObjectIndex(object)
				}
			});
		});
	}

	getObjectIndex = function(object){
		return object.values[object.model.index||object.model.properties[0]];
	}
	getObjectIcon = function(object){
		return object.model.icon;
	}

	self.updateObjectValues = function(data, next, req){
		mongo.updateElement('objects', data.params.object, 'values', data.values, function(){
			next({action:'goBack'});
		});
	}

	//Model
	self.addModel = function(data, next){
		mongo.insertDocument('models', 'model', data, function(id){
			self.getModel({id:id}, next);
		});
	}
	self.removeModel = function(data, next){
		mongo.removeDocument('models', data.params.model, function(){
			self.getModels({}, next);
		});
	}
	self.addPropertyToModel = function(data, next){
		mongo.insertElement('models', data.params.model, 'properties', getObjectId(data.property), function(){
			self.getModel({id:data.params.model}, next);
		});
	}
	self.addPropertiesToModel = function(data, next){
		mongo.insertEachElement('models', data.params.model, 'properties', getMultipleObjectIds(data.properties), function(){
			console.log('inserted');
			self.getModel({id:data.model}, next);
		});
	}
	self.removePropertyFromModel = function(data, next){
		mongo.removeElement('models', data.id, 'properties', getObjectId(data.property));
	}
	self.removePropertiesFromModel = function(data, next){
		mongo.removeEachElement('models', data.params.model, 'properties', getMultipleObjectIds(data.properties), function(){
			// self.getModel({id:data.params.model}, next);
		});
	}
	self.movePropertyInModel = function(data, next){
		mongo.moveElement('models', data.id, 'properties', data.from, data.to);
	}
	getModelData = function(id, next){
		mongo.getAggregated('models', [
		    {$match:{_id:mongo.getObjectId(id)}},
		    {$lookup:{from:'properties', localProperty:'properties', foreignProperty:'_id', as:'properties'}}
		], next);
	}


	self.updateModelSettings = function(data, next){
		mongo.updateMultipleProperties('models', data.params.model, data.form, function(){
			next('goBack');
		})
	}

	//Property
	self.addProperty = function(data, next){
		mongo.insertDocumentOnName('properties', 'property', data, next);
	}
	self.addNewProperty = function(data, next){
		mongo.insertDocument('properties', 'property', data, function(id){
			self.getProperty({id:id}, next);
		});
	}
	self.removeProperty = function(data, next){
		mongo.removeDocument('properties', data.params.property, function(){
			next({action:'goBack'});
		});
	}
	self.editPropertyName = function(data, next){
		mongo.updateElement('properties', data.id, 'name', data.name);
	}
	self.editPropertyType = function(data, next){
		mongo.updateElement('properties', data.id, 'type', data.type);
	}
	self.addReference = function(data, next){
		mongo.updateElement('properties', data.id, 'reference', getFilledModel('reference', data));
	}
	self.removeReference = function(data, next){
		mongo.updateElement('properties', data.id, 'reference', null);
	}
	self.updateReferencePath = function(data, next){
		mongo.updateElement('properties', data.id, 'reference.path', data.path.split(','));
	}
	self.updateProperty = function(data, next){
		var properties = Object.keys(data.properties);
		async.eachSeries(properties, function(property, done){
			mongo.updateElement('properties', data.id, property, data.properties[property], function(){
				done();
			});
		}, function allDone(err) {
			
		});
	}
	getAllPropertiesData = function(next){
		db.collection('properties').find({}).sort({name:1}).toArray(function(err, properties){
			next(properties);
		});
	}

	//Filters
	self.updateMatch = function(data, next){
		mongo.updateElement('properties', data.id, 'reference.filter.match', getFilledModel('match', data));
	}
	self.updateSort = function(data, next){
		mongo.updateElement('properties', data.id, 'reference.filter.sort', getFilledModel('sort', data));
	}
	self.updatePropertySelection = function(data, next){
		mongo.updateElement('properties', data.id, 'reference.filter.properties', data.selection.split(','));
	}
	self.updateObjectSelection = function(data, next){
		mongo.updateElement('properties', data.id, 'reference.filter.objects', data.selection.split(','));
	}

	//User
	self.addUser = function(data, next){
		mongo.insertDocument('users', 'user', data);
	}
	self.deactivateUser = function(data, next){
		mongo.updateElement('users', 'user', 'active', false);
	}
	self.activateUser = function(data, next){
		mongo.updateElement('users', 'user', 'active', true);
	}
	self.removeUser = function(data, next){
		mongo.removeDocument('users', data.id);
	}
	self.assignObjectToUser = function(data, next){
		mongo.insertElement('users', data.user, 'objects', getFilledModel('userobject', data), next);
	}
	self.unassignObjectFromUser = function(data, next){
		db.collection('users').update({_id:getObjectId(data.user)}, {$pull:{objects:{object:getObjectId(data.object)}}});
	}

	//Profile
	self.addProfile = function(data, next){
		mongo.insertDocumentOnName('profiles', 'profile', data, next);
	}
	self.removeProfile = function(data, next){
		mongo.removeDocument('profiles', data.id);
	}

	// –––– Private ––––

	getObjectData = function(id, next, properties = 'all'){
		// var withchildren = (data.withchildren === 'true') ? true:'false';
		var withchildren = 'false';
		mongo.getAggregated('objects', [
		   	{$match:{_id:getObjectId(id)}},
		   	{$lookup:{from:'models', localProperty:'model', foreignProperty:'_id', as:'model'}},
		   	{$project:{model:{$arrayElemAt:['$model',0]}, values:true, children:true}},
		   	{$project:{model:{id:'$model._id', name:'$model.name', icon:'$model.icon', index:'$model.index'}, properties:"$model.properties." + properties, values:true, children:true}},
   			{$lookup:{from:'properties', localProperty:'properties', foreignProperty:'_id', as:'properties'}}
		], function(object){
			object = object[0];
			object.index = object.values[object.model.index];
			next(object[0]);
		})
	}

	self.removeObject = function(data, next){
		mongo.removeDocument('objects', data.params.object, function(){
			next({action:'goBack'});
		});
	}

	appendChild = function(data, next){
		mongo.insertElement('objects', data.parent, 'children', getObjectId(data.child), next);
	}

	moveChild = function(data, next){
		mongo.moveElement('objects', data.object, 'children', data.from, data.to);
	}

	removeChild = function(data, next){
		mongo.removeElement('objects', data.object, 'children', getObjectId(data.child));
	}

	getObjectInstances = function(objects, next){
		var result = [];
		async.eachSeries(objects, function(object, done){
			self.getObjectInstance({id:object}, function(instance){
				if(instance) result.push(instance);
				done();
			});
		}, function allDone(err) {
			next(result);
		});
	}

	setObjectValue = function(data, next){
		updateElement('objects', data.id, 'values.'+data.property, data.value);
	}

	getObjectWithChildren = function(data, next){
		var object = {};
		data.withchildren = 'true';
		self.getObject(data, function(object){
			self.getObjectsByIds({ids:object.children}, function(objects){
				object.children = objects;
				next(object);
			})
		});
	}
	getObjectsByIds = function(data, next){
		var objects = [];
		async.eachSeries(data.ids, function(id, done){
			self.getObject({id:id}, function(object){
				objects.push(object);
				done();
			});
		}, function allDone(err) {
		    next(objects);
		});
	}

	getAllModelsData = function(id, next){
		getAggregated('models', [
		    {$sort:{name:1}},
		    {$project:{name:true}}
		], next);
	}

	getFilledModel = function(model, source){
		var result = {};
		model = models[model];
		for(var x in model){
			result[x] = source[x] ? source[x]:model[x];
		}
		return result;
	}

	Array.prototype.move = function (old_index, new_index) {
	    if (new_index >= this.length) {
	        var k = new_index - this.length;
	        while ((k--) + 1) {
	            this.push(undefined);
	        }
	    }
	    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	    return this; // for testing purposes
	};

	return self;
}