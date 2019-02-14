module.exports = function(db){

	var self = this;
	var ObjectId = require('mongodb').ObjectID;
	var utils = require('./utils.js');
	var async = require('async');
	var merge = require('merge');

	self.insertDocument = function(collection, model, data, next){
		db.collection(collection).insert(getFilledModel(model, data)).then(function(res){
			next(res.insertedIds[0]);
		});
	}
	self.insertDocumentOnName = function(collection, model, data, next){
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
	self.removeDocument = function(collection, id, next){
		db.collection(collection).remove({_id:getObjectId(id)}).then(next);
	}
	self.removeEachDocuments = function(collection, ids, next){
		db.collection(collection).remove({_id:{$in:ids}}).then(next);
	}
	self.insertElement = function(collection, id, path, element, next){
		console.log('insertElement', collection, id, path, element);
		db.collection(collection).update({_id:getObjectId(id)}, {$push:getKeyValue(path, element)}).then(next);
	}
	self.insertEachElement = function(collection, id, path, elements, next){
		self.getElement(collection, id, path, function(element){
			db.collection(collection).update({_id:getObjectId(id)}, {$push:getKeyValue(path, getKeyValue('$each', elements))}).then(next);
		});
	}
	self.removeElement = function(collection, id, path, element, next){
		console.log('removeElement');
		console.log(collection, id, path, element);
		db.collection(collection).update({_id:getObjectId(id)}, {$pull:getKeyValue(path, element)}).then(next);
	}
	self.removeEachElement = function(collection, id, path, elements, next){
		db.collection(collection).update({_id:getObjectId(id)}, {$pullAll:getKeyValue(path, elements)}).then(next);
	}
	self.removeEachElementByIndex = function(collection, id, path, indexes, next){
		self.getElement(collection, id, path, function(element){
			var array = element[Object.keys(element)[0]];
			console.log('removeEachElementByIndex');
			console.log(array);
			console.log('After remove ->');

			for (var i = indexes.length -1; i >= 0; i--){
			   array.splice(indexes[i],1);
			}
			console.log(array);
			self.updateElement(collection, id, path, array, next);
		})
	}
	self.removeElementInCollection = function(collection, path, value, next){
		db.collection(collection).update({}, {$pull:getKeyValue(path, value)},{multi: true}).then(next);
	}
	self.updateElement = function(collection, id, path, element, next){
		db.collection(collection).update({_id:getObjectId(id)}, {$set:getKeyValue(path, element)}).then(next);
	}
	self.updateObject = function(collection, id, path, object, next){
		self.getElement(collection, id, path, function(existing){
			var updated = merge(existing, object);
			self.updateElement(collection, id, path, updated, next);
		})
	}
	self.updateMultipleFields = function(collection, id, object, next){
		var properties = Object.keys(object);
		async.eachSeries(properties, function(property, done){
			self.updateElement(collection, id, property, getEscapedString(object[property]), function(){
				done();
			});
		}, function allDone(err) {
			next();
		});
	}
	self.getElement = function(collection, id, path, next){
		var projection = getKeyValue(path, true);
		projection._id = false;
		db.collection(collection).aggregate([
			{$match:{_id:getObjectId(id)}},
			{$project:projection}
		]).toArray(function(err, res){next(res[0][Object.keys(res[0])[0]])});
	}
	self.moveElement = function(collection, id, path, from, to){
		getElement(collection, id, path, function(result){
			updateElement(collection, id, path, result.move(from, to))
		});
	}
	self.getAggregated = function(collection, aggregate, next){
		db.collection(collection).aggregate(aggregate).toArray(function(err, result){next(result)});
	}
	getObjectId = function(id){
		id = (!self.isValidId(id)) ? false:id;
		return (typeof id === 'string') ? ObjectId(id):id;
	}
	self.getMultipleObjectIds = function(ids){
		return ids.map(function(id){
			return getObjectId(id);
		});
	}
	self.getStringId = function(id){
		return (typeof id !== 'string') ? id.toString():id;
	}
	self.getKeyValue = function(path, value){
		var keyvalue = {};
		keyvalue[path] = value;
		return keyvalue;
	}
	self.getDocumentsByTextIndex = function(collection, search, next){
		self.getAggregated(collection, [
		    {$match:{$text:{$search:search, $caseSensitive: false, $diacriticSensitive: false}}},
		    {$group: { _id: null, found: { $addToSet: '$_id'}}}
		], function(result){
			if(result && result.length > 0) next(result[0].found);
			else next([]);
		});
	}
	self.getDocumentById = function(collection, id, next){
		db.collection(collection).find({_id:getObjectId(id)}).toArray(function(err, result){next(result[0] || null)});
	}
	self.getDocumentByName = function(collection, name, next){
		var regex = new RegExp(['^', name, '$'].join(''), 'i');
		db.collection(collection).find({name:regex}).toArray(function(err, result){next(result[0] || null)});
	}
	self.getCollectionIndexes = function(collection, next){
		self.getAggregated(collection, [
		   	{$project:{_id:false, name:true, value:'$_id'}}
		], function(result){
			next(result);
		})
	}
	self.getCollection = function(collection, next){
		db.collection(collection).find({}).toArray(function(err, result){next(result[0] || null)});
	}
	self.isValidId = function(id){
		return ObjectId.isValid(id);
	}
	getEscapedString = function(str){
		return str.replace(/[\\$'"]/g, "\\$&");
	}
	self.getObjectIdsToString = function(ids){
		return ids.map(function(id){
			return id.toString();
		});
	}
	self.isObjectIdInArray = function(objectid, array){
		return (self.getObjectIdsToString(array).indexOf(objectid.toString()) > -1);
	}
	return self;
}