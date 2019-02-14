module.exports = function(db){
	var self = this;
	var queries = require('./queries')(db);
	var mongo = require('./mongo')(db);
	var browser = require('./browser');
	var utils = require('./utils');
	var util = require('util');
	var elements = {
		objectcontent:{
			string:'text',
			icon:'svg',
			album:'album'
		},
		objectcard:{
			string:'objectcard-text',
			album:'objectcard-album',
			reference:'link'
		}
	}

	// 1.Root
	self.getRoot = function(data, next){
		self.getChildren({
			title:data.user.name,
			icon:'home',
			collection:'users',
			displaymode:'table',
			id:data.user._id
		}, next);
	}

	// 2.Object - Content
	self.getObjectContent = function(data, next){
		queries.getObjectData({id:data.id}, function(parent){
			self.getChildren({
				title:parent.title,
				icon:parent.model.icon,
				collection:'objects',
				displaymode:parent.model.display,
				id:data.id,
				range:data.range
			}, next);
		})
	}

	self.getObject = function(data, next){
		console.log("View - getObject: %j", data);
		mongo.getDocumentById('objects', data.id, function(object){
			mongo.getDocumentById('models', object.model, function(model){
				if(model.box === 'true' || model.box == true){
					self.getObjectContent({id:data.id, range:{from:0, to:12}}, next);
				}else{
					self.getObjectCard({id:data.id}, next);
				}
			});
		})
	}

	getChildren = function(data, next){
		console.log('Getchildren');
		console.log(data);
		queries.getParentContent({
			collection:data.collection,
			id:data.id,
			page:data.page
		}, function(result){
			var model = (result.parent.model) ? result.parent.model.id:'';
			browser.setTemplate('objectcontent', {
				nextable:result.nextable,
				page:result.page,
				lastpage:result.lastpage,
				from:result.from,
				to:result.to,
				count:result.count,
				parent:result.parent._id,
				model:model,
				icon:data.icon,
				title:data.title,
				displaymode:data.displaymode,
				models:result.models,
				properties:result.properties,
				values:result.values,
				sort:result.sort
			}, next);
		});
	}

	// 3.Object - Card
	self.getObjectCard = function(data, next){
		queries.getObjectData({id:data.id}, function(object){
			var properties = object.properties.map(function(property){
				return {
					_id:property._id,
					name:property.name.replace(/\\'/g, "'"),
					icon:property.icon,
					element:property.element,
					value:property.value
				}
			});
			browser.setTemplate('objectcard', {
				title:object.model.name,
				icon:object.model.icon,
				object:object._id,
				properties:properties
			}, next);
		});
	}

	// 4.Object - Property
	self.getObjectProperty = function(data, next){
		queries.getObjectPropertyValue(data, function(property, object){
			var template = 'objectproperty-' + property.element;
			browser.setTemplate(template, {
				object:object,
				property:{id:property._id, name:property.name},
				icon:property.icon,
				value:property.value,
				type:property.type
			}, next);
		})
	}

	// 5.Models
	self.getModelList = function(data, next){
		queries.getAllModels(data, function(models){
			var models = models.map(function(model){
				return {
					id:model._id,
					icon:model.icon || 'file',
					name:model.name
				}
			});
			browser.setTemplate('models', {
				models:models
			}, next);
		});
	}

	// 6.Model - Properties
	self.getModel = function(data, next){
		queries.getModelInfos(data, function(model){
			var properties = model.properties.map(function(property){
				return{
					id:property._id,
					active:'false',
					icon:property.icon,
					name:property.name.replace(/\\'/g, "'")
				}
			});
			browser.setTemplate('model', {
				id:data.id,
				icon:model.icon,
				name:model.name,
				properties:properties
			}, next);
		});
	}

	// 7.Model - Index
	self.getModelIndex = function(data, next){
		queries.getModelIndex(data, function(){
			var modelproperties = model.properties.filter(function(property){
				properties[property._id] = property;
				return (model.index.indexOf(property._id.toString()) < 0);
			}).map(function(property){
				return{
					name:property.name,
					value:property._id
				}
			});
			var indexes = model.index.filter(function(index){
				return (properties[index]);
			}).map(function(index){
				index = properties[index];
				return{
					_id:index._id,
					active:'false',
					icon:index.icon || 'book',
					name:index.name
				};
			});
			browser.setTemplate('main', {
				icon:model.icon,
				title:model.name,
				properties:properties,
				modelproperties:modelproperties,
				indexes:indexes
			}, next);
			// next({
			// 	action:'fillTemplate',
			// 	template:'pool',
			// 	params:{model:data.id},
			// 	name:'modelindex',
			// 	content:{
			// 		icon:{value:model.icon ||'book'},
			// 		title:{value:model.name},
			// 		actions:{$:'actionbox', items:[
			// 			{$:'dropdown', button:'insert', onchoose:'addPropertyToModelIndex', items:modelproperties},
			// 		]},
			// 		itemactions:{$:'actionbox', items:[
			// 			{$:'action', value:'trash', click:'removePropertiesFromModelIndex'},
			// 		]},
			// 		leftaction:{value:'close', click:'goBack'},
			// 		content:{
			// 			$:'tbl',
			// 			sortable:true,
			// 			structure:[
			// 				{$:'checkbox', name:'active', click:'check'},
			// 				{$:'string', name:'name'}
			// 			],
			// 			content:indexes
			// 		}
			// 	}
			// });
		});
	}

	// 8.Model - Card
	self.getModelCard = function(data, next){
		queries.getModelSettings(data, function(model){
			browser.setTemplate('main', {
				icon:model.icon,
				title:model.name,
				modelid:data.id,
				type:model.box,
				display:model.display,
			}, next);
			// next({
			// 	action:'fillTemplate',
			// 	template:'pool',
			// 	params:{model:data.id},
			// 	content:{
			// 		icon:{value:model.icon ||'book'},
			// 		title:{value:model.name},
			// 		actions:{$:'actionbox', items:[
			// 			{$:'action', click:'submitForm', value:'done'},
			// 			{click:'removeModel', name:'Supprimer', class:'btn-danger'}
			// 		]},
			// 		leftaction:{$:'action', click:'goBack', value:'close'},
			// 		content:{
			// 			$:'form',
			// 			action:'form/updateModelSettings/'+data.id,
			// 			items:[
			// 				{
			// 					$:'object',
			// 					items:[
			// 						{name:'name', label:'Nom', $:'input', value:model.name},
			// 						{name:'icon', label:'Icône', $:'iconpicker', value:model.icon || 'book'},
			// 						{name:'box', label:'Boîte', $:'checkbox', value:model.box},
			// 						{name:'display', label:'Affichage', $:'grouptoggle', value:model.display, items:[
			// 							{value:'grid', text:'Grille'},
			// 							{value:'table', text:'Tableau'}
			// 						]}
			// 					]
			// 				}
			// 			]
			// 		}
			// 	}
			// });
		})
	}

	// 9.Properties
	self.getProperties = function(data, next){
		queries.getProperties(data, function(properties){
			properties = properties.map(function(property){
				return {
					_link:'/properties/'+property._id,
					icon:property.icon || 'book',
					name:property.name
				}
			})
			browser.setTemplate('main', {
				modelid:data.id,
				type:model.box,
				display:model.display,
			}, next);
		})
	}

	var elements_types = {
		carousel:'album',
		text:'string',
		number:'integer',
		checkbox:'boolean'
	}

	// 10.Property - Card
	self.getPropertyCard = function(data, next){
		var elements = [
			{
				value:'text',
				text:'Texte'
			},
			{
				value:'number',
				text:'Nombre'
			},
			{
				value:'album',
				text:'Album'
			},
			{
				value:'checkbox',
				text:'Checkbox'
			},
			{
				value:'svg',
				text:'Icône'
			},
			{
				value:'reference',
				text:'Référence'
			}
		]
		queries.getProperty(data, function(property){
			elements = elements.map(function(element){
				if(element.value == property.element) element.active = true;
				return element;
			});
			browser.setTemplate('property', {
				id:property._id,
				icon:property.icon,
				name:property.name,
				element:property.element,
				elements:elements
			}, next);
		})
	}

	// 11.Import
	self.getImport = function(data, next){
		var defaultmodel = '5a78776ae4071cf62191dab0';
		// queries.getModelProperties({id:defaultmodel}, function(properties){
			// mongo.getCollectionIndexes('models', function(models){
				browser.setTemplate('objectimport', {
					models:'models',
					properties:'properties',
					defaultmodel:defaultmodel,
					parent:'data.parent'
				}, next);
			// })
		// });
	}

	self.getRoles = function(data, next){
		queries.getObjectRoles({id:data.object}, function(objectroles){
			queries.getObjectData({id:data.object}, function(object){
				queries.getRolesList({}, function(roles){
					browser.setTemplate('objectroles', {
						roles:roles,
						objectroles:objectroles,
						object:{
							id:object._id,
							icon:object.model.icon,
							title:object.title
						}
					}, next)
				});
			});
		});
	}

	self.getRole = function(data, next){
		queries.getRights({}, function(rights){
			queries.getObjectData({id:data.object}, function(object){
				queries.getObjectRole({object:data.object, role:data.role}, function(objectrole){
					queries.getPropertiesFromChildModels({id:data.object}, function(properties){
						rights = rights.map(function(right){
							right.active = (right.value == objectrole.right);
							return right;
						})
						properties = properties.map(function(property){
							property.type = elements_types[property.element];
							property.active = mongo.isObjectIdInArray(property._id, objectrole.properties);
							return property;
						})
						browser.setTemplate('objectrole', {
							rights:rights,
							objectrole:objectrole,
							properties:properties,
							object:{
								id:object._id,
								icon:object.model.icon,
								title:object.title
							}
						}, next)
					})
				});
			});
		});
	}

	return self;
}