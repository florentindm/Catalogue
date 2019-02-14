module.exports = function(db, req){
	var self = this;
	var mongo = require('./mongo.js')(db);
	var models = require('./models.js');
	var browser = require('./browser.js');
	var utils = require('./utils.js');
	var util = require('util');
	var async = require('async');
	var elements = {
		objectcontent:{
			string:'text',
			icon:'svg',
			album:'album'
		},
		objectcard:{
			string:'objectcard-text',
			reference:'link',
			album:'objectcard-album'
		}
	}

	//Object
	self.addObjectToParent = function(data, next, req){
		console.log('addObjectToParent');
		console.log(data);
		data.model = mongo.getObjectId(data.model);
		var roles = ['test'];
		console.log('::addObjectToParent');
		console.log(data);
		getCastedObjectValues(data.values, data.model, function(values){
			mongo.insertDocument('objects', 'object', {model:data.model, roles:roles, values:values}, function(id){
				mongo.insertElement(data.collection, data.id, 'children', mongo.getObjectId(id), function(){
					self.getObject({id:data.id}, next);
				});
			});
		});
	}

	getTargetCollection = function(data, req){
		if(data.object || data.parent){
			return{
				name:'objects',
				document:data.object || data.parent
			}
		}else{
			return{
				name:'users',
				document:req.session.user._id
			}
		}
	}

	addObjectAndModel = function(data, next){
		mongo.insertDocument('models', 'model', {name:data.model}, function(id){
			data.model = id;
			console.log('addObject with newly created model');
			console.log(data);
			self.addObjectToParent(data, next, req);
		});
	}
	self.getUserChildren = function(data, next, req) {
		console.log('getUserChildren');
		mongo.getDocumentById('users', data.user, function(user){
			getObjectInstances({objects:user.children}, function(objects){
				next(objects);
			})
		})
	}
	self.getObject = function(data, next){
		mongo.getDocumentById('objects', data.id, function(object){
			mongo.getDocumentById('models', object.model, function(model){
				if(model.box === 'true' || model.box == true){
					self.getObjectChildren({id:data.id}, next);
				}else{
					self.getObjectCarte({id:data.id}, next);
				}
			})
		})
	}

	var editables = {
		carousel:'mediaeditor'
	}

	self.getObjectCarte = function(data, next){
		self.getObjectData({id:data.id}, function(object){
			var items = object.properties.map(function(property){
				return {
					id:property._id,
					name:property.name,
					label:property.name,
					element:property.element,
					reference:property.reference,
					propertypath:'objects/' + data.id + '/' + property._id,
					type:property.type,
					editable:true,
					value:property.value
				}
			});
			next(object, items)
		})
	}

	self.getObjectChildrenRange = function(data, next){
		mongo.getAggregated('objects', [
			{$match:{_id:mongo.getObjectId(data.id)}},
			{$project:{_id:false,children:{$slice:['$children', data.from, data.to]}}}
		], function(children){
			children = children[0].children;
			getObjectInstances({objects:children, parent:data.id}, function(children){
				next({
					action:'appendItems',
					params:{object:data.id},
					container:'content',
					element:'pool',
					items:children
				})
			});
		});
	}

	getObjectChildrenData = function(data, next){
		self.getObjectData({id:data.id, childrenrange:{from:0, to:12}}, function(object){
			getObjectInstances({objects:object.children, parent:data.id, filters:data.filters}, function(children){
				next(children, object);
			})
		})
	}

	self.getParentContent = function(data, next){
		console.log('Query - getParentContent', data);
		data.page = data.page || 1;
		data.sort = data.sort || [{property:'id',order:'desc'}];
		self.getObjectData({id:data.id}, function(parent){
			getChildModels({id:data.id, collection:data.collection, objectchilmodels:parent.childmodels}, function(models){
				getPropertiesFromChildModels(data, function(properties){
					getValuesInParent(data, function(values){
						models = utils.getArrayToObject(models, 'id');
						console.log('----->values');
						console.log(values);
						var items = values.results.map(function(item){
							var o = Object.assign(item.values, models[item.model].default);
							o.id = item.id;
							o.model = item.model;
							return o;
						});
						properties = properties.map(function(property){
							property.type = element_type[property.element];
							return property;
						});
						properties = utils.getArrayToObject(properties, '_id');
						var page = data.page;
						var lastpage = Math.ceil(values.count/values.ipp);
						next({
							from:values.from,
							to:values.to,
							count:values.count,
							page:page,
							lastpage:lastpage,
							nextable:(page < lastpage),
							sort:data.sort[0],
							parent:parent,
							models:models,
							properties:properties,
							values:items
						})
					})
				})
			})
		})
	}

	getParentInfo = function(id, next){

		mongo.getDocumentById('objects', id, function(object){
			mongo.getDocumentById('models', id, function(){
				
			})
		})
	}

	getValuesInParent = function(data, next){
		console.log('getValuesInParent');
		data.itemsperpage = data.itemsperpage || 24;
		var to = data.page*data.itemsperpage;
		var from = to - data.itemsperpage;
		console.log('Page:', data.page, 'Items/page:', data.itemsperpage, 'From:', from, 'To:', to);
		var query = getChildrenQuery(data.id, from, data.itemsperpage);
		if(data.search && data.search != ''){
			mongo.getDocumentsByTextIndex('objects', data.search, function(found){
				query.splice(1, 0, getScopeQuery(found));
				getSortedAndFilteredChildren(data, query, function(results){
					next(results);
				})
			})
		}else{
			getSortedAndFilteredChildren(data, query, function(results){
				next(results);
			})
		}
	}

	getChildrenQuery = function(parent, from, ipp){
		return [
		    {$match:{_id:mongo.getObjectId(parent)}},
		    //(Pos.1)Filter children with text search results
		    {$unwind:'$children'},
		    {$lookup:{from:'objects', localField:'children', foreignField:'_id', as:'children'}},
		    {$project:{child:{$arrayElemAt:['$children',0]}}},
		    {$project:{_id:false, id:'$child._id', model:'$child.model', values:'$child.values'}},
		    //(Pos.-3)Filters and sort
    		{$match: {"model": { "$exists": true, "$ne": null }}},
			{$group: { _id: null, count: { $sum: 1 },results: { $push: '$$ROOT' }}},
			{$project:{_id:false, from:""+from, ipp:""+ipp, count:'$count', results:{$slice:['$results', from, ipp]}}}
		]
	}

	getScopeQuery = function(ids){
		return {
			$project:{
				children:{
					$filter:{
						input:'$children',
						as:'child',
						cond:{
							'$in':['$$child', ids]
						}
					}
				}
			}
		}
	}

	getSortedAndFilteredChildren = function(data, query, next){
		if(data.filters) query.splice(-3, 0, getFilterQuery(data.filters));
		query.splice(-3, 0, getSortQuery(data.sort));
		console.log("Query: %j", query);
		mongo.getAggregated(data.collection, query, function(result){
			result = result[0] ? result[0]:[];
			next(result);
		});
	}

	getSortQuery = function(rules){
		console.log('>>getSortQuery');
		console.log(rules);
		var sort = {$sort:{}};
		for(var i = 0; i < rules.length; i++){
			var rule = rules[i];
			var order = (rule.order == 'asc') ? 1:-1;
			var property = rule.property;
			var path = (property != 'id') ? 'values.'+property:'id';
			sort['$sort'][path] = order;
		}
		return sort;
	}

	getFilterQuery = function(conditions){
		var match = {};
		for(var i = 0; i < conditions.length; i++){
			var condition = conditions[i];
			var property = condition.property;
			var path = 'values.' + property;
			var operator = '$' + condition.operator;
			var value = condition.value;
			if(condition.operator == 'ctn'){
				operator = '$regex';
				value = '.*' + value + '.*';
			}
			match[path] = mongo.getKeyValue(operator, value);
		}
		return {'$match':match};
	}

	getChildModelsQuery = function(data){
		var query = [
			{$match:{_id:mongo.getObjectId(data.id)}},
		    {$lookup:{from:'models', localField:'model.childmodels', foreignField:'_id', as:'model.childmodels'}},
		    {$unwind:'$model.childmodels'},
		    {$project:{id:'$model.childmodels._id', name:'$model.childmodels.name', properties:'$model.childmodels.properties', index:'$model.childmodels.index', default:'$model.childmodels.default', icon:'$model.childmodels.icon'}}
		];
		if(data.collection == 'objects' || !data.collection){
			query.splice(1, 0, {$lookup:{from:'models', localField:'model', foreignField:'_id', as:'model'}});
			query.splice(2, 0, {$project:{model:{$arrayElemAt:['$model',0]}}});
		}
		console.log('getChildModelsQuery');
		console.log(util.inspect(query, {showHidden: false, depth: null}))
		return query;
	}

	getChildModels = function(data, next){
		console.log('getChildModels');
		console.log(data);
		getChildModelsFromParentModel(data, next);
	}

	getChildModelsFromParentModel = function(data, next){
		console.log('______getChildModelsFromParentModel');
		console.log(data);
		mongo.getAggregated(data.collection, getChildModelsQuery(data), next);
	}

	getPropertiesFromChildModels = function(data, next){
		data.collection = data.collection || 'objects';
		var queryChildModels = getChildModelsQuery(data)
		var queryProperties = [
			{$project:{properties:{ $concatArrays: [ "$properties", "$index" ] }}},
			{$unwind:'$properties'},
			{$group: { _id: null, properties: { $addToSet: '$properties'}}},
			{$unwind:'$properties'},
			{$lookup:{from:'properties', localField:'properties', foreignField:'_id', as:'properties'}},
			{$project:{properties:{$arrayElemAt:['$properties',0]}}},
			{$project:{_id:'$properties._id', name:'$properties.name', element:'$properties.element', icon:'$properties.icon'}}
		]
		var query = queryChildModels.concat(queryProperties);
		mongo.getAggregated(data.collection, query, next)
	}

	// getModelsUsedInParent = function(data, next){
	// 	mongo.getAggregated(data.collection, [
	// 	    {$match:{_id:mongo.getObjectId(data.id)}},
	// 	    {$unwind:'$children'},
	// 	    {$group: { _id: null, children: { $addToSet: '$children'}}},
	// 	    {$unwind:'$children'},
	// 	    {$lookup:{from:'objects', localField:'children', foreignField:'_id', as:'children'}},
	// 	    {$project:{child:{$arrayElemAt:['$children',0]}}},
	// 	    {$project:{model:'$child.model'}},
	// 	    {$match:{model:{$ne:null}}},
	// 	    {$group: { _id: null, models: { $addToSet: '$model'}}},
	// 	    {$unwind:'$models'},
	// 	    {$lookup:{from:'models', localField:'models', foreignField:'_id', as:'models'}},
	// 	    {$project:{model:{$arrayElemAt:['$models',0]}}},
	// 	    {$project:{id:'$model._id', name:'$model.name', properties:'$model.properties', index:'$model.index', default:'$model.default'}}
	// 	], next);
	// }

	// getPropertiesUsedInParent = function(data, next){
	// 	mongo.getAggregated(data.collection, [
	//     	//Groupement des modèles utilisé par des children 
	// 	    {$match:{_id:mongo.getObjectId(data.id)}},
	// 	    {$unwind:'$children'},
	// 	    {$group: { _id: null, children: { $addToSet: '$children'}}},
	// 	    {$unwind:'$children'},
	// 	    {$lookup:{from:'objects', localField:'children', foreignField:'_id', as:'children'}},
	// 	    {$project:{child:{$arrayElemAt:['$children',0]}}},
	// 	    {$project:{model:'$child.model'}},
	// 	    {$match:{model:{$ne:null}}},
	// 	    {$group: { _id: null, models: { $addToSet: '$model'}}},
	// 	    {$unwind:'$models'},
	// 	    {$lookup:{from:'models', localField:'models', foreignField:'_id', as:'models'}},
	// 	    {$project:{model:{$arrayElemAt:['$models',0]}}},
		    
	// 	    //Groupement des propriété utilisées par les modèles 
	// 	    {$project:{properties:{ $concatArrays: [ "$model.properties", "$model.index" ] }}},
	// 	    {$unwind:'$properties'},
	// 	    {$group: { _id: null, properties: { $addToSet: '$properties'}}},
	// 	    {$unwind:'$properties'},
	// 	    {$lookup:{from:'properties', localField:'properties', foreignField:'_id', as:'properties'}},
	// 	    {$project:{properties:{$arrayElemAt:['$properties',0]}}},
	// 	    {$project:{_id:'$properties._id', name:'$properties.name', type:'$properties.type'}}
	// 	], next);
	// }

	getObjectChildren = function(data, next){
		getObjectChildrenData({id:data.id}, function(children, parent){
			next(children, parent);
		})
	}

	getFilteredItems = function(items, filters){
		return items;
	}

	self.getFilteredContent = function(data, next){
		console.log('getFilteredContent');
		console.log(data);
		getObjectChildrenData({id:data.object, sort:data.sort}, function(children){
			next({
				action:'fillContainer',
				container:'content',
				params:{object:data.object},
				element:'pool',
				items:children
			})
		});
	}

	self.getChildrenMatchingSearch = function(data, next){
		mongo.getElement('objects', data.id, 'children', function(children){
			mongo.getDocumentsByTextIndex('objects', data.search, children, function(found){
				getObjectInstances({objects:found}, function(objects){
					next({
						action:'fillContainer',
						container:'content',
						params:{object:data.id},
						element:'pool',
						items:objects
					})
				});
			});
		});
	}

	self.removeAllChildrenFromObject = function(data, next){
		var object = data.id;
		mongo.getElement('objects', object, 'children', function(children){
			mongo.removeEachDocuments('objects', children, function(){
				mongo.updateElement('objects', object, 'children', [], next);
			});
		});
	}

	getObjectInstance = function(data, next){
		self.getObjectData({id:data.id}, function(object){
			console.log('--object--');
			console.log(object);
			var values = {};
			var properties = [];
			properties = object.properties.map(function(property){
				values[property._id] = property.value;
				return {
					name:property.name,
					value:property.value || object.title,
					$:property.type || 'string'
				}
			});
			var instance = {
				_id:object._id,
				href:'/objects/' + object._id,
				content:properties,
				values:values
			}
			next(instance);
		}, 'index');
	}

	self.updateObjectValues = function(data, next, req){
		mongo.updateObject('objects', data.id, 'values', data.form, next);
	}

	self.getModelProperties = function(data, next){
		self.getModel({id:data.id}, function(model){
			console.log('--->getModelProperties');
			console.log(data);
			console.log(model);
			next(model.properties.map(function(property){
				return{
					value:property._id,
					name:property.name
				}
			}))
		})
	}

	self.getObjectPropertyValue = function(data, next){
		self.getObjectData({id:data.object}, function(object){
			var property = object.properties.filter(function(property){
				return (property._id.toString() == data.property);
			})[0];
			next(property, {title:object.title, id:object._id});
		});
	}

	self.addElementsToObjectValue = function(data, next){
		mongo.insertEachElement('objects', data.object, 'values.'+data.property, data.elements, next);
	}

	self.removeElementsFromObjectValue = function(data, next){
		console.log('removeElementsFromObjectValue');
		console.log(data);
		mongo.removeEachElementByIndex('objects', data.object, 'values.'+data.property, data.indexes, next);
	}

	//Model
	self.addModel = function(data, next){
		mongo.insertDocument('models', 'model', data, function(id){
			self.getModelSettings({id:id}, function(action){
				action.content.settings = {value:'close', click:'removeModel'};
				next(action);
			});
		});
	}
	self.removeModel = function(data, next){
		mongo.removeDocument('models', data.params.model, function(){
			self.getAllModels({}, next);
		});
	}
	self.addPropertyToModel = function(data, next){
		mongo.insertDocument('properties', 'property', data, function(id){
			mongo.insertElement('models', data.model, 'properties', getObjectId(id), function(){
				browser.addElement('checkedit', {
					id:id
				}, next);
			});
		});
	}
	self.addPropertiesToModel = function(data, next){
		mongo.insertEachElement('models', data.params.model, 'properties', getMultipleObjectIds(data.properties), function(){
			console.log('inserted');
			self.getModel({id:data.model}, next);
		});
	}
	self.removePropertyFromModel = function(data, next){
		mongo.removeElement('models', data.id, 'properties', getObjectId(data.property), function(){
			mongo.removeElement('models', data.id, 'index', getObjectId(data.property), function(){
				
			});
		});
	}
	self.removePropertiesFromModel = function(data, next){
		console.log('Queries - removePropertiesFromModel', data.model, data.ids);
		mongo.removeEachElement('models', data.model, 'properties', getMultipleObjectIds(data.ids), function(){
			browser.removeElements(data.ids, next);
		});
	}
	self.movePropertyInModel = function(data, next){
		mongo.moveElement('models', data.id, 'properties', data.from, data.to);
	}
	self.getModelInfos = function(data, next){
		mongo.getAggregated('models', [
		    {$match:{_id:mongo.getObjectId(data.id)}},
		    {$lookup:{from:'properties', localField:'properties', foreignField:'_id', as:'properties'}}
		], function(model){
			if(model) next(model[0]);
		});
	}
	self.getModelIndex = function(data, next){
		self.getModel({id:data.id}, function(model){
			var properties = {};
			model.index = model.index||[];
			model.index = mongo.getObjectIdsToString(model.index);
			next(model);
		});
	}
	self.addPropertyToModelIndex = function(data, next){
		mongo.insertElement('models', data.model, 'index', mongo.getObjectId(data.property), function(){
			self.getModelIndex({id:data.params.model}, next);
		})
	}
	self.removePropertiesFromModelIndex = function(data, next){
		mongo.removeEachElement('models', data.params.model, 'index', getMultipleObjectIds(data.properties), function(){
			self.getModelIndex({id:data.params.model}, next);
		});
	}
	self.getModelSettings = function(data, next){
		self.getModel({id:data.id}, function(model){
			next(model);
		});
	}
	self.updateModelSettings = function(data, next){
		mongo.updateMultipleFields('models', data.id, data.form, function(){
			self.getModel({id:data.id}, next);
		})
	}

	self.getAllModels = function(data, next){
		getAggregated('models', [
		    {$sort:{name:1}},
		    {$project:{name:true, icon:true}}
		], function(models){
			next(models);
		});
	}

	//Property
	self.addProperty = function(data, next){
		mongo.insertDocument('properties', 'property', data, function(id){
			self.getProperty({id:id}, next);
		});
	}
	// self.addProperty = function(data, next){
	// 	mongo.insertDocumentOnName('properties', 'property', data, next);
	// }
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
		mongo.updateMultipleFields('properties', data.id, data.form, function(){
			next({action:'goBack'});
		})
	}
	getAllPropertiesData = function(next){
		db.collection('properties').find({}).sort({name:1}).toArray(function(err, properties){
			next(properties);
		});
	}
	self.getProperties = function(data, next){
		db.collection('properties').find({}).sort({name:1}).toArray(function(err, properties){
			next(properties);
		});
	}

	var element_type = {
		album:'arrayofpath',
		number:'integer',
		text:'string',
		checkbox:'boolean'
	}

	self.getProperty = function(data, next){
		mongo.getDocumentById('properties', data.id, function(property){
			property.type = element_type[property.element];
			property.name = property.name.replace(/\\'/g, "'");
			next(property);
		});
	}

	var valuetransform = {
		array:function(value){
			return value.split(',');
		},
		arrayofpath:function(value){
			return valuetransform.array(value).map(function(path){
				return path.replace(/(\s+)/g, '\\$1');
			})
		}
	}

	self.insertObjectsFromCSV = function(data, next){
		var insertedids = [];
		console.log('insertObjectsFromCSV');
		self.getModelInfos({id:data.model}, function(model){
			var modelproperties = utils.getArrayToObject(model.properties, '_id');
			async.eachSeries(data.records, function(row, done){
				var object = {
					model:mongo.getObjectId(data.model),
					values:{}
				};
				for(var x in data.properties){
					if(data.properties[x] == '') continue;
					object.values[x] = getCastedValue(row[data.properties[x]], element_type[modelproperties[x].element]);
				}
				mongo.insertDocument('objects', 'object', object, function(id){
					insertedids.push(id);
					done();
				});
			}, function allDone(err) {
				mongo.insertEachElement('objects', data.parent, 'children', insertedids, function(){
					self.getObject({id:data.parent}, next);
				});
			});
		})
	}

	getCastedObjectValues = function(object, model, next){
		self.getModelInfos({id:model}, function(model){
			var modelproperties = utils.getArrayToObject(model.properties, '_id');
			var casted = {};
			for(var x in object){
				casted[x] = getCastedValue(object[x], element_type[modelproperties[x].element]);
			}
			next(casted);
		})
	}

	getCastedValue = function(value, type){
		console.log('>> getCastedValue', value, type);
		if(valuetransform[type]) return valuetransform[type](value);
		else return value;
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
	self.getObjectRoles = function(data, next){
		mongo.getAggregated('objects', [
		    {$match:{_id:mongo.getObjectId(data.id)}},
		    {$group: { _id: null, roles: { $push: '$roles.role'}}},
		    {$project:{roles:{$arrayElemAt:['$roles',0]}}},
		    {$lookup:{from:'roles', localField:'roles', foreignField:'_id', as:'roles'}},
		    {$unwind:'$roles'},
		    {$project:{
		        _id:'$roles._id',
		        name:'$roles.name',
		        }
		    }
		], function(result){
			next(result);
		});
	}
	self.getObjectRole = function(data, next){
		mongo.getAggregated('objects', [
			{$match:{_id:mongo.getObjectId(data.object)}},
			{$unwind:'$roles'},
			{$project:{
			    _id:'$roles.role',
			    role:'$roles.role',
			    filters:'$roles.filters',
			    properties:'$roles.properties',
			    right:'$roles.right'
			}},
			{$match:{_id:mongo.getObjectId(data.role)}},
			{$lookup:{from:'roles', localField:'role', foreignField:'_id', as:'role'}},
			{$project:{
			    role:{$arrayElemAt:['$role',0]},
			    filters:true,
			    properties:true,
			    right:true
			 }}
		], function(result){
			next(result[0]);
		})
	}
	self.getRights = function(data, next){
		mongo.getAggregated('rights', [
			{$project:{_id:false, value:'$_id', text:'$name'}}
		], next);
	}
	self.getRolesList = function(data, next){
		mongo.getAggregated('roles', [{$project:{_id:false, id:'$_id', name:'$name'}}], next);
	}
	self.addRoleToObject = function(data, next){
		console.log('Query - addRoleToObject');
		console.log(next);
		mongo.insertElement('objects', data.object, 'roles', getFilledModel('objectrole', {role:mongo.getObjectId(data.role)}), next);
	}
	self.updateObjectRole = function(data, next){
		db.collection('objects').update({
			_id:mongo.getObjectId(data.object),
			"roles.role":mongo.getObjectId(data.role)
		}, {
			$set: {
				"roles.$.right": data.form.right
			}
		}, next)
	}
	self.updateRolePropertiesInObject = function(data, next){
		db.collection('objects').update({
			_id:mongo.getObjectId(data.object),
			"roles.role":mongo.getObjectId(data.role)
		}, {
			$set: {
				"roles.$.properties": mongo.getMultipleObjectIds(data.properties)
			}
		}, next)
	}
	self.updateObjectRoleFilters = function(data, next){
		db.collection('objects').update({
			_id:mongo.getObjectId(data.object),
			"roles.role":mongo.getObjectId(data.role)
		}, {
			$set: {
				"roles.$.filters": data.filters
			}
		}, next)
	}

	// –––– Private ––––

	self.getObjectData = function(data, next, scope = 'properties'){
		console.log('getObjectData of ', data);

		var filters = {
			content:false
		}

		mongo.getAggregated('objects', [
		    {$match:{_id:mongo.getObjectId(data.id)}},
		    {$lookup:{from:'models', localField:'model', foreignField:'_id', as:'model'}},
		    {$project:{model:{$arrayElemAt:['$model',0]}, values:true, children:true, childmodels:true}},
		    {$lookup:{from:'properties', localField:'model.properties', foreignField:'_id', as:'model.properties'}},
		    {$lookup:{from:'properties', localField:'model.index', foreignField:'_id', as:'model.index'}},
		    {$project:{model:{id:'$model._id', name:'$model.name', icon:'$model.icon', index:true, properties:true, display:'$model.display', childmodels:true}, values:true, children:true, childmodels:true}}
		], function(object){
			console.log('!!!getObjectData!!!');
			console.log(object);
			if(object.length == 0){
				next({title:null});
				return false;
			}
			object = object[0];
			var hasindex = (object.model.index.length > 0);
			var properties = (scope == 'index' && !hasindex) ? object.model.properties:object.model[scope];
			var result = [];
			if(hasindex){
				var title = object.values[object.model.index[0]._id] || object.model.name;
			}else{
				var title = object.model.name;
			}
			async.eachSeries(properties, function(property, done){
				var value = object.values[property._id] || property.default;
				if(property.type == 'reference'){
					var ref = value;
					self.getObjectData({id:ref}, function(refobject){
						value = refobject.title;
						result.push({
							_id:property._id,
							name:property.name,
							icon:property.icon,
							reference:ref,
							value:value || '',
							type:property.type,
							element:value ? 'reference':'brokenref'
						});
						done();
					});
				}else{
					result.push({
						_id:property._id,
						name:property.name,
						icon:property.icon,
						value:value || '',
						type:property.type,
						element:property.element || 'text'
					});
					done();
				}

			}, function allDone(err) {
				next({
					_id:object._id,
					title:title,
					model:{
						id:object.model.id,
						name:object.model.name,
						icon:object.model.icon || 'book',
						display:object.model.display || 'table',
						childmodels:object.model.childmodels
					},
					childmodels:object.childmodels,
					children:object.children,
					properties:result
				});
			});
		})
	}

	self.removeObject = function(data, next, req){
		var collection = getTargetCollection(data);
		console.log('removeObject');
		//Supprime l'objet partout
		mongo.removeElementInCollection('objects', 'children', mongo.getObjectId(data.object), function(){
			mongo.removeElementInCollection('users', 'children', mongo.getObjectId(data.object), function(){
				mongo.removeDocument('objects', data.object, function(){
					next({action:'goBack'});
				});
			});
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

	getObjectInstances = function(data, next){
		var result = [];
		console.log('getObjectInstances');
		console.log(data.objects);
		async.eachSeries(data.objects, function(object, done){
			self.getObjectInstance({id:object, parent:data.parent}, function(instance){
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

	getFilledModel = function(model, source){
		var result = {};
		model = models[model];
		for(var x in model){
			result[x] = source[x] ? source[x]:model[x];
		}
		return result;
	}

	handleNotFound = function(result, next){
		if(!result || result.length == 0){
			next({action:'fillView', model:'notfound'});
			process.exit();
		}
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