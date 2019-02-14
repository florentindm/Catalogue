module.exports = function(db){
	var self = this;
	var queries = require('./queries')(db);
	var mongo = require('./mongo')(db);
	var browser = require('./browser');
	var utils = require('./utils');
	var elements = {
		objectcontent:{
			string:'text',
			icon:'svg'
		}
	}

	// 1.Root
	self.getRoot = function(data, next){
		console.log('getRoot');
		console.log(data);
	}

	// 2.Object - Content
	self.getObjectContent = function(data, next){
		queries.getParentContent({collection:'users', id:data.user.id}, function(result){
			console.log('-------');
			console.log(result);
			var models = utils.getArrayToObject(result.models, '_id');
			var values = result.values.map(function(value){
				var values = value.values;
				var mergedvalues = Object.assign(values, models[value.model].default);
				var item = mergedvalues;
				item.id = value.id;
				item.model = value.model;
				return item;
			});
			var properties = result.properties.map(function(property){
				property.element = elements.objectcontent[property.type];
				return property;
			});
			properties = utils.getArrayToObject(properties, '_id');
			browser.setTemplate('objectcontent', {
				icon:'home',
				title:data.user.name,
				displaymode:'table',
				models:models,
				properties:properties,
				values:values
			}, next);
		});
		queries.getObjectChildren(data, function(children, parent){
			mongo.getCollectionIndexes('models', function(models){

				var childmodels = parent.model.childmodels;
				if(childmodels && childmodels.length == 1){
					var insertui = {$:'action', value:'insert', click:'addObject'};
				}else{
					var insertui = {$:'dropdown', onchoose:'addObjectWithModel', button:'insert', items:models};
				}

				getUsedPropertiesInParent(data.id, function(properties){
					console.log('-> getUsedPropertiesInParent <-');
					console.log(properties);
					browser.setTemplate('main', {
						title:parent.title,
						icon:parent.model.icon,
						models:models,
						properties:properties,
						objects:children
					}, next);
				})
			});
		})
	}

	// 3.Object - Card
	self.getObjectCard = function(data, next){
		queries.getObjectCard(data, function(object, properties){
			browser.setTemplate('main', {
				title:object.model.name,
				icon:object.model.icon,
				modelid:object.model.id,
				objectid:object._id,
				models:models,
				properties:properties
			}, next);
			// next({
			// 	action:'fillTemplate',
			// 	template:'pool',
			// 	params:{object:object._id},
			// 	content:{
			// 		icon:{value:object.model.icon},
			// 		title:{value:object.model.name},
			// 		actions:{$:'actionbox', items:[
			// 			{$:'action', value:'done', click:'submitForm'},
			// 			{$:'option_link', name:'Modèle', href:'/models/'+object.model.id},
			// 			{$:'option_click', click:'removeAllChildrenFromObject', name:'Vider', class:'btn-danger'},
			// 			{$:'option_click', click:'removeObject', name:'Supprimer', class:'btn-danger'}
			// 		]},
			// 		leftaction:{$:'action', value:'close', click:'goBack'},
			// 		content:{$:'form', name:'updateObjectValues', id:object._id, items:[{$:'object', items:properties}]}
			// 	}
			// });
		});
	}

	// 4.Object - Property
	self.getObjectProperty = function(data, next){
		queries.getObjectProperty(data, function(property){
			browser.setTemplate('main', {
				title:object.title + '  →  ' + property.name,
				icon:object.model.icon,
				value:property.value,
				type:property.type
			}, next);
			// next({
			// 	action:'fillTemplate',
			// 	model:property.type + '_editor',
			// 	params:{
			// 		object:data.object,
			// 		property:property._id
			// 	},
			// 	content:{
			//     	title:{value:object.title + '  →  ' + property.name},
			//     	icon:{value:object.model.icon},
			//     	content:{value:property.value}
			// 	}
			// });
		})
	}

	// 5.Models
	self.getModels = function(data, next){
		queries.getModels(data, function(models){
			var models = models.map(function(model){
				return {
					_link:'/models/'+model._id,
					icon:model.icon || 'book',
					name:model.name
				}
			});
			browser.setTemplate('main', {
				models:models
			}, next);
			// next({
			// 	action:'fillTemplate',
			// 	url:'/models',
			// 	name:'model',
			// 	template:'pool',
			// 	content:{
			// 		title:{value:'Modèles'},
			// 		icon:{value:'extension'},
			// 		actions:{$:'actionbox', items:[
			// 			{$:'action', click:'addModel', value:'insert'}
			// 		]},
			// 		content:{
			// 			$:'tbl',
			// 			structure:[
			// 				{$:'icon', name:'icon'},
			// 				{$:'string', name:'name'},
			// 				{$:'menulnk', name:'link'}
			// 			],
			// 			content:models.map(function(model){
			// 				return {
			// 					_link:'/models/'+model._id,
			// 					icon:model.icon || 'book',
			// 					name:model.name
			// 				}
			// 			})
			// 		}
			// 	}
			// })
		});
	}

	// 6.Model - Properties
	self.getModelProperties = function(data, next){
		self.getModel(data, function(model){
			mongo.getCollectionIndexes('properties', function(properties){
				var modelproperties = model.properties.map(function(property){
					return{
						_id:property._id,
						active:'false',
						icon:property.icon || 'book',
						name:property.name,
						link:'/properties/' + property._id
					}
				});
				browser.setTemplate('main', {
					icon:model.icon,
					title:model.name,
					properties:properties,
					modelproperties:modelproperties
				}, next);
				// next({
				// 	action:'fillTemplate',
				// 	template:'pool',
				// 	params:{model:data.id},
				// 	content:{
				// 		icon:{value:model.icon ||'book'},
				// 		title:{value:model.name},
				// 		actions:{$:'actionbox', items:[
				// 			{$:'dropdown', button:'insert', onchoose:'addPropertyToModel', items:properties},
				// 			{$:'option_link', href:'/models/' + data.id + '/index', name:'Modifier l\'index'},
				// 			{$:'option_link', href:'/models/' + data.id + '/settings', name:'Réglages'},
				// 			{$:'option_click', click:'removeModel', name:'Supprimer', class:'btn-danger'}
				// 		]},
				// 		itemactions:{$:'actionbox', items:[
				// 			{$:'action', value:'trash', click:'removePropertiesFromModel'},
				// 		]},
				// 		leftaction:{$:'action', value:'close', click:'goBack'},
				// 		content:{
				// 			$:'tbl',
				// 			structure:[
				// 				{$:'checkbox', name:'active', click:'check'},
				// 				{$:'icon', name:'icon'},
				// 				{$:'string', name:'name'},
				// 				{$:'menulnk', name:'link'}
				// 			],
				// 			content:
				// 		}
				// 	}
				// });
			});
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
			// next({
			// 	action:'fillTemplate',
			// 	name:'model',
			// 	template:'pool',
			// 	content:{
			// 		title:{value:'Champs'},
			// 		icon:{value:'list'},
			// 		actions:{$:'actionbox', items:[
			// 			{$:'action', click:'addProperty', value:'insert'},
			// 			{click:'removeModel', name:'Supprimer', class:'btn-danger'}
			// 		]},
			// 		content:{
			// 			$:'tbl',
			// 			structure:[
			// 				{$:'icon', name:'icon'},
			// 				{$:'string', name:'name'},
			// 				{$:'menulnk', name:'link'}
			// 			],
			// 			content:
			// 		}
			// 	}
			// })
		})
	}

	// 10.Property - Card
	self.getPropertyCard = function(data, next){
		queries.getProperty(data, function(property){
			var items = [
				{name:'name', label:'Nom', $:'input', value:property.name},
				{name:'icon', label:'Icône', $:'iconpicker', value:property.icon},
				{name:'type', label:'Type', $:'dropdown', type:'pick', value:property.type, items:[
					{$:'option_click', name:'Texte', value:'string'},
					{$:'option_click', name:'Nombre', value:'integer'},
					{$:'option_click', name:'Image', value:'image'},
					{$:'option_click', name:'Carousel', value:'carousel'},
					{$:'option_click', name:'Référence', value:'reference'}
				]}
			];
			switch(property.type){
				case'string':
					items.push({name:'length', label:'Longueur', $:'input', value:property.length})
				break;
				case'reference':
					items.push({name:'reference', label:'Section', $:'input', value:property.reference, text:'Testok'});
				break;
				case'composition':
					items.push({name:'composition', label:'Composition', $:'input', value:property.composition});
				break;
			}
			browser.setTemplate('main', {
				icon:property.icon,
				title:property.name,
				items:items
			}, next);
			// next({
			// 	action:'fillTemplate',
			// 	template:'pool',
			// 	params:{property:data.id},
			// 	content:{
			// 		icon:{value:property.icon ||'book'},
			// 		title:{value:property.name},
			// 		actions:{$:'actionbox', items:[
			// 			{$:'action', click:'updateProperty', value:'done'},
			// 			{$:'option_click', click:'removeProperty', name:'Supprimer', class:'btn-danger'}
			// 		]},
			// 		leftaction:{$:'action', value:'close', click:'goBack'},
			// 		content:{
			// 			$:'object',
			// 			items:items
			// 		}
			// 	}
			// });
		})
	}

	// 11.Import
	self.getImport = function(data, next){
		var defaultmodel = '5a78776ae4071cf62191dab0';
		queries.getModelProperties({id:defaultmodel}, function(properties){
			mongo.getCollectionIndexes('models', function(models){
				browser.setTemplate('main', {
					models:models,
					properties:properties,
					defaultmodel:defaultmodel,
					parent:data.parent
				}, next);
				// next({
				// 	action:'fillTemplate',
				// 	template:'import',
				// 	content:{
				//         actions:{$:'actionbox', items:[
				//             {$:'action', value:'done', click:'submitForm'}
				//         ]},
				// 		content:{
				// 			$:'form',
				// 			action:'importCSV/' + data.parent,
				// 			items:[
				// 				{$:'object', items:[
				// 					{label:'Fichier', $:'inputfile', onchange:'importCSV', name:'file'},
				// 					{label:'Modèle', $:'select', name:'model', value:defaultmodel, onchange:'setFieldMapper', options:models}
				// 				]},
				// 				{$:'separator'},
				// 				{$:'div', class:'fieldmapper', content:{$:'fieldmapper', properties:properties, headers:[]}}
				// 			]
				// 		}
				// 	}
				// });
			})
		});
	}


	return self;
}