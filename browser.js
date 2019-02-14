module.exports = {
	setTemplate:function(name, data, next) {
		next({
			action:'setTemplate',
			template:name,
			content:data
		});
	},
	popTemplate:function(name, data, next) {
		next({
			action:'popTemplate',
			template:name,
			content:data
		});
	},
	addElement:function(element, data, next) {
		next({
			action:'addElement',
			element:element,
			content:data
		});
	},
	setContent:function(element, data, next) {
		next({
			action:'setContent',
			element:element,
			content:data
		});
	},
	appendContent:function(element, data, next) {
		next({
			action:'appendContent',
			element:element,
			content:data
		});
	},
	replaceElement:function(index, element, data, next) {
		next({
			action:'replaceElement',
			index:index,
			element:element,
			content:data
		});
	},
	removeElements:function(ids, next) {
		next({
			action:'removeElements',
			ids:ids
		});
	},
	notify:function(type, message, next){
		next({
			action:'notify',
			type:type,
			message:message
		});
	}
}