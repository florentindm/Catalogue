module.exports = function(db, req){
	var self = this;
	var ObjectId = require('mongodb').ObjectID;
	var async = require('async');
	var models = require('./models.js');
	var bcrypt = require('bcryptjs');

	
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
						next({
							action:'showMessage',
							type:'fail',
							message:'Incorrect password'
						});
					} 
				});
			}else{
				next({
					action:'showMessage',
					type:'fail',
					message:'This email is not registered.'
				});
			}
		});
	}

	self.register = function(data, next, req){
		console.log('register');
		console.log(data);
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


	//Object
	self.addObject = function(data, next, req){
		var schema = data.params.schema;
		data.schema = schema ? getObjectId(schema):null;
		if(!data.schema){
			self.getAllSchemas({}, next);
			return;
		}
		insertDocument('objects', 'object', data, function(id){
			self.appendChild({parent:data.params.object, child:id}, function(){
				self.getObjectCard({id:id}, next);
			});
		});
	}
	self.getNewObjectForm = function(schema, send){
		getSchemaData(schema, function(schema){
			send({
				action:'fillView',
				model:'pool',
				content:{
			    	title:{value:'Titre'},
			    	icon:{value:schema.icon},
			    	content:{schema:'', items:schema.fields}
				}
			});
		})
	}
	self.createObject = function(data, next){
		var fieldids = [];
		var values = {};
		async.eachSeries(data.fields, function(field, done){
			self.addField(field, function(fieldid){
				//Add id to schema
				fieldids.push(getObjectId(fieldid));
				//Make the id::values for "values" object
				values[fieldid] = field.value || null;

				done();
			});
		}, function allDone(err){
			self.addSchema({
				name:data.name,
				fields:fieldids
			}, function(schemaid){
				self.addObject({
					schema:schemaid,
					values:values
				}, next);
			});
		});
	}
	self.removeObject = function(data, next){
		removeDocument('objects', data.id);
	}
	self.setObjectValue = function(data, next){
		updateElement('objects', data.id, 'values.'+data.property, data.value);
	}
	self.appendChild = function(data, next){
		insertElement('objects', data.parent, 'children', getObjectId(data.child), next);
	}
	self.moveChild = function(data, next){
		moveElement('objects', data.object, 'children', data.from, data.to);
	}
	self.removeChild = function(data, next){
		removeElement('objects', data.object, 'children', getObjectId(data.child));
	}
	self.getUserObjects = function(data, send) {
		db.collection('users').aggregate([
		   {$match:{_id:getObjectId(data.user)}},
		   {$unwind:'$objects'},
		   {$project:{_id:'$objects.object'}}
		]).toArray(function(err, objects){
			getObjectInstances(getValuesFromProperty(objects, '_id'), function(objects){
			    send({
			    	action:'fillView',
			    	model:'pool',
			    	name:'object',
			    	content:{
				    	title:{value:'Append'},
				    	icon:{value:'star'},
				    	content:{items:objects}
			    	}
			    });
			})
		})
	}

	function getObjectInstances(objects, next){
		var result = [];
		async.eachSeries(objects, function(object, done){
			self.getObjectInstance({id:object}, function(instance){
				console.log(instance);
				if(instance) result.push(instance);
				done();
			});
		}, function allDone(err) {
			next(result);
		});
	}

	self.getObjectContainer = function(data, next){
		getDocumentById('objects', data.id, function(object){
			getDocumentById('schemas', object.schema, function(schema){
				getObjectInstances(object.children, function(children){
				    next({
				    	action:'fillView',
				    	model:'pool',
				    	name:'object',
				    	content:{
					    	title:{value:object.values[schema.index]},
					    	icon:{value:schema.icon},
					    	content:{items:children}
				    	}
				    });
				});
			})
		})
	}

	self.getObjectInstance = function(data, next){
		console.log(data);
		db.collection('objects').aggregate([
			{$match:{_id:getObjectId(data.id)}},
			{$lookup:{from:'schemas', localField:'schema', foreignField:'_id', as:'schema'}},
			{$project:{schema:{$arrayElemAt:['$schema',0]}, values:'$values'}},
			{$project:{id:'$id', 'fields':'$schema.fields.instance', 'schema':'$schema.name', values:'$values'}},
			{$lookup:{from:'fields', localField:'fields', foreignField:'_id', as:'fields'}}
		]).toArray(function(err, result){
			result = result[0];
			if(result){
				next({
					_id:result._id,
					href:'/' + result._id,
					content:result.fields.map(function(field){
						return {
							name:field.name,
							value:result.values[field._id],
							element:field.type
						}
					})
				});
			}else{
				next(null);
			}
		});
	}
	getObjectData = function(id, next){
		// var withchildren = (data.withchildren === 'true') ? true:'false';
		var withchildren = 'false';
		getAggregated('objects', [
		   	{$match:{_id:getObjectId(id)}},
		   	{$lookup:{from:'schemas', localField:'schema', foreignField:'_id', as:'schema'}},
		   	{$project:{schema:{$arrayElemAt:['$schema',0]}, values:true}},
		   	{$project:{schema:{id:'$schema._id', name:'$schema.name', icon:'$schema.icon', index:'$schema.index'}, fields:"$schema.fields.all", values:true}},
   			{$lookup:{from:'fields', localField:'fields', foreignField:'_id', as:'fields'}}
		], function(object){
			next(object[0])
		})
	}
	getObjectView = function(object, send){
		console.log('objecttt');
		console.log(object);
		send({
			action:'fillView',
			model:'pool',
			params:{object:object._id},
			content:{
				icon:{value:object.schema.icon},
				title:{value:object.values[object.schema.index] || object.schema.name},
				actions:{value:'done', click:'updateObjectValues'},
				content:{
					element:'object',
					items:object.fields.map(function(field){
						return {
							name:field._id,
							label:field.name,
							element:field.type,
							editable:true,
							value:object.values[field._id] || null
						}
					})
				}
			}
		});
	}
	self.getObjectCard = function(data, next){
		getObjectData(data.id, function(object){
			console.log('getObjectData');
			console.log(object);
			getObjectView(object, next);
		})
	}
	self.getObject = function(data, next){
		getDocumentById('objects', data.id, function(object){
			getDocumentById('schemas', object.schema, function(schema){
				if(schema.container){
					self.getObjectContainer({id:data.id}, next);
				}else{
					self.getObjectCard({id:data.id}, next);
				}
			})
		})
	}
	self.getObjectWithChildren = function(data, next){
		var object = {};
		data.withchildren = 'true';
		self.getObject(data, function(object){
			self.getObjectsByIds({ids:object.children}, function(objects){
				object.children = objects;
				next(object);
			})
		});
	}
	self.getObjectsByIds = function(data, next){
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
	self.updateObjectValues = function(data, send, req){
		updateElement('objects', data.params.object, 'values', data.values, function(){
			self.getUserObjects({user:req.session.user._id}, send);
		});
	}

	//Schema
	self.addSchema = function(data, next){
		insertDocumentOnName('schemas', 'schema', data, next);
	}
	self.removeSchema = function(data, next){
		removeDocument('schemas', data.id);
	}
	self.addFieldToSchema = function(data, next){
		insertElement('schemas', data.id, 'fields', getObjectId(data.field), next);
	}
	self.addFieldsToSchema = function(data, next){
		insertEachElement('schemas', data.schema, 'fields', getMultipleObjectIds(data.fields), function(){
			self.getSchema({id:data.schema}, next);
		});
	}
	self.removeFieldFromSchema = function(data, next){
		removeElement('schemas', data.id, 'fields', getObjectId(data.field));
	}
	self.removeFieldsFromSchema = function(data, send){
		removeEachElement('schemas', data.schema, 'fields', getMultipleObjectIds(data.fields), function(){
			send({action:'showMessage', content:'Fields removed from schema'});
		});
	}
	self.moveFieldInSchema = function(data, next){
		moveElement('schemas', data.id, 'fields', data.from, data.to);
	}
	getSchemaData = function(id, next){
		getAggregated('schemas', [
		    {$match:{_id:getObjectId(id)}},
		    {$lookup:{from:'fields', localField:'fields.all', foreignField:'_id', as:'fields'}}
		], next);
	}
	self.getSchema = function(data, send){
		getSchemaData(data.id, function(schema){
			schema = schema[0];
			send({
				action:'fillView',
				model:'schema',
				params:{schema:data.id},
				content:{
					title:{value:schema.name},
					content:{
						items:schema.fields
					}
				}
			});
		});
	}
	getAllSchemasData = function(id, next){
		getAggregated('schemas', [
		    {$sort:{name:1}},
		    {$project:{name:true}}
		], next);
	}
	self.getAllSchemas = function(data, send){
		getAllSchemasData(data.id, function(schemas){
			send({
				action:'fillView',
				name:'schema',
				model:'list',
				content:{
					title:{value:'Schemas'},
					icon:{value:'extension'},
					actions:{value:'insert', click:'addSchema'},
					content:{
						element:'pool',
						items:schemas.map(function(schema){
							return {
								_id:schema._id,
								click:'addObject',
								content:[{element:'string', value:schema.name}]
							}
						})
					}
				}
			})
		});
	}

	//Field
	self.addField = function(data, next){
		insertDocumentOnName('fields', 'field', data, next);
	}
	self.removeField = function(data, next){
		removeDocument('fields', data.id);
	}
	self.editFieldName = function(data, next){
		updateElement('fields', data.id, 'name', data.name);
	}
	self.editFieldType = function(data, next){
		updateElement('fields', data.id, 'type', data.type);
	}
	self.addReference = function(data, next){
		updateElement('fields', data.id, 'reference', getFilledModel('reference', data));
	}
	self.removeReference = function(data, next){
		updateElement('fields', data.id, 'reference', null);
	}
	self.updateReferencePath = function(data, next){
		updateElement('fields', data.id, 'reference.path', data.path.split(','));
	}
	self.getAllFields = function(data, send){
		db.collection('fields').find({}).sort({name:1}).toArray(function(err, res){
			send({
				action:'fillView',
				model:'list',
				content:{
					title:{value:'Fields'},
					content:{
						schema:'field',
						items:res
					}
				}
			})
		});
	}
	self.getField = function(data, send){
		db.collection('fields').findOne({_id:data.id}).then(function(result){
			send({
				action:'fillView',
				model:'propval',
				content:{
					title:{value:result.name},
					content:{
						items:[
							{property:'Name', value:result.name},
							{property:'Size', value:result.size},
							{property:'Référence', value:result.size}
						]
					}
				}
			})
		})
	}

	//Filters
	self.updateMatch = function(data, next){
		updateElement('fields', data.id, 'reference.filter.match', getFilledModel('match', data));
	}
	self.updateSort = function(data, next){
		updateElement('fields', data.id, 'reference.filter.sort', getFilledModel('sort', data));
	}
	self.updateFieldSelection = function(data, next){
		updateElement('fields', data.id, 'reference.filter.fields', data.selection.split(','));
	}
	self.updateObjectSelection = function(data, next){
		updateElement('fields', data.id, 'reference.filter.objects', data.selection.split(','));
	}

	//User
	self.addUser = function(data, next){
		insertDocument('users', 'user', data);
	}
	self.deactivateUser = function(data, next){
		updateElement('users', 'user', 'active', false);
	}
	self.activateUser = function(data, next){
		updateElement('users', 'user', 'active', true);
	}
	self.removeUser = function(data, next){
		removeDocument('users', data.id);
	}
	self.assignObjectToUser = function(data, next){
		insertElement('users', data.user, 'objects', getFilledModel('userobject', data), next);
	}
	self.unassignObjectFromUser = function(data, next){
		db.collection('users').update({_id:getObjectId(data.user)}, {$pull:{objects:{object:getObjectId(data.object)}}});
	}

	//Profile
	self.addProfile = function(data, next){
		insertDocumentOnName('profiles', 'profile', data, next);
	}
	self.removeProfile = function(data, next){
		removeDocument('profiles', data.id);
	}

	// –––– Private ––––

	//Utils
	function getValuesFromProperty(array, property){
		var result = [];
		for(var i = 0; i < array.length;i++) result.push(array[i][property]);
		return result;
	}

	function getObjectId(id){
		return (typeof id === 'string') ? ObjectId(id):id;
	}

	function getMultipleObjectIds(ids){
		return ids.map(function(id){
			return getObjectId(id);
		});
	}

	function getStringId(id){
		return (typeof id !== 'string') ? id.toString():id;
	}

	function getKeyValue(path, value){
		var keyvalue = {};
		keyvalue[path] = value;
		// console.log(keyvalue);
		return keyvalue;
	}

	function getFilledModel(model, source){
		var result = {};
		model = models[model];
		for(var x in model){
			result[x] = source[x] ? source[x]:model[x];
		}
		return result;
	}

	function getObjectRestricted(object, fields){
		var result = {};
		for(var i = 0; i < fields.length; i++){
			var property = fields[i];
			if(object[property] != null) result[property] = object[property];
		}
		return result;
	}

	function getDocumentById(collection, id, next){
		db.collection(collection).find({_id:getObjectId(id)}).toArray(function(err, result){next(result[0] || null)});
	}

	function getDocumentByName(collection, name, next){
		var regex = new RegExp(['^', name, '$'].join(''), 'i');
		db.collection(collection).find({name:regex}).toArray(function(err, result){next(result[0] || null)});
	}

	//Database
	function insertDocument(collection, model, data, next){
		db.collection(collection).insert(getFilledModel(model, data)).then(function(res){
			next(res.insertedIds[0]);
		});
	}
	function insertDocumentOnName(collection, model, data, next){
		getDocumentByName(collection, data.name, function(result){
			if(result){
				next(result._id);
			}else{
				insertDocument(collection, model, data, function(response){
					next(response);
				});
			}
		})
	}
	function removeDocument(collection, id){
		db.collection(collection).remove({_id:getObjectId(id)});
	}
	function insertElement(collection, id, path, element, next){
		db.collection(collection).update({_id:getObjectId(id)}, {$push:getKeyValue(path, element)}).then(next);
	}
	function insertEachElement(collection, id, path, elements, next){
		db.collection(collection).update({_id:getObjectId(id)}, {$push:getKeyValue(path, getKeyValue('$each', elements))}).then(next);
	}
	function removeElement(collection, id, path, element){
		db.collection(collection).update({_id:getObjectId(id)}, {$pull:getKeyValue(path, element)});
	}
	function removeEachElement(collection, id, path, elements){
		db.collection(collection).update({_id:getObjectId(id)}, {$pullAll:getKeyValue(path, elements)});
	}
	function updateElement(collection, id, path, element, next){
		db.collection(collection).update({_id:getObjectId(id)}, {$set:getKeyValue(path, element)}).then(next);
	}
	function getElement(collection, id, path, next){
		var projection = getKeyValue(path, true);
		projection._id = false;
		db.collection(collection).aggregate([
			{$match:{_id:getObjectId(id)}},
			{$project:projection}
		]).toArray(function(err, res){next(res[0][Object.keys(res[0])[0]])});
	}
	function moveElement(collection, id, path, from, to){
		getElement(collection, id, path, function(result){
			updateElement(collection, id, path, result.move(from, to))
		});
	}
	function getAggregated(collection, aggregate, next){
		db.collection(collection).aggregate(aggregate).toArray(function(err, result){next(result)});
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