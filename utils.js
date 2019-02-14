module.exports = {
	getValuesFromProperty:function(array, property){
		var result = [];
		for(var i = 0; i < array.length;i++) result.push(array[i][property]);
		return result;
	},
	getObjectRestricted:function(object, fields){
		var result = {};
		for(var i = 0; i < fields.length; i++){
			var property = fields[i];
			if(object[property] != null) result[property] = object[property];
		}
		return result;
	},
	getKeyValue:function(path, value){
		var keyvalue = {};
		keyvalue[path] = value;
		return keyvalue;
	},
	getArrayFromObject:function(object){
		var array = [];
		for(var x in object) array.push(object[x]);
		return array;
	},
	getObjectInArray:function(array, id , lookAt = '_id'){
		for(var i = 0; i < array.length; i++){
			if(array[i][lookAt].toString() == id.toString()) return array[i];
		}
		return null;
	},
	getArrayToObject:function(array, name){
		var result = {}
		for(var i = 0; i < array.length; i++){
			var object = array[i];
			result[object[name]] = object;
		}
		return result;
	},
	getSortedArrayOfObject:function(array, property){
		objs.sort(function(a, b){
			if (a[property] < b[property]) return -1;
			if (a[property] > b[property]) return 1;
			return 0;
		})
	},
	getArrayOfObjectsFromArrays:function(form, properties, objectname){
		var result = [];
		for(var i = 0; i < properties.length; i++){
			// if(!form[properties[i]]) return form;
			if(!Array.isArray(form[properties[i]])) form[properties[i]] = [form[properties[i]]];
		}
		var count = form[properties[0]].length;
		for(var i = 0; i < count; i++){
			var object = {};
			for(var j = 0; j < properties.length; j++){
				var name = properties[j].split('-');
				name = name[name.length-1];
				object[name] = form[properties[j]][i] || '';
			}
			result.push(object);
		}
		for(var i = 0; i < properties.length; i++){
			delete form[properties[i]];
		}
		form[objectname] = result;
		return form;
	}
}