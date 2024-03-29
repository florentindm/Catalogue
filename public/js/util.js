function mergeArrays(first, second) {
	for(var x in second){
		first[x] = second[x];
	}
	return first;
}

function isolate(target){
	if(!target) return false;
	children = target.parentNode.children;
	for(var i = 0; i < children.length; i++){
		children[i].setAttribute('active', 'false');
	}
	target.setAttribute('active', 'true');
}

function isolateMultiple(elements, attribute = 'active'){
	for(var i = 0; i < elements[0].parentNode.children.length; i++){
		elements[0].parentNode.children[i].setAttribute(attribute, 'false');
	}
	for(var i = 0; i < elements.length; i++){
		elements[i].setAttribute(attribute, 'true');
	}
}

function getHTMLFileElements(url, callback, result = false){
	if(result === false){
		methods.Request({}, url, function(result){
			methods.getHTMLFileElements(url, callback, result);
		});
	}else{
		var object = {};
		var parser = new DOMParser()
		var content = parser.parseFromString(result, "text/xml");
		var elements = content.getElementsByTagName('*');
		for(var i = 0; i < elements.length; i++){
			var attribute = elements[i].getAttribute('element');
			if(attribute){
				object[attribute] = elements[i];
			}
		}
		callback(object);
	}
}

function forEach(array, callback, i = 0){
	if(i < array.length){
		callback(array[i], i);
		forEach(array, callback, ++i);
	}
}

function isArray(a){
	return Object.prototype.toString.call(a) === '[object Array]';
}



function getObjectUrlEncoded(object){
	var url = '';
	for(var x in object){
		url += '&' + x + '=' + object[x];
	}
	return url;

}

function sendForm(url, form, next = false, progress = false){
	var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function(e) {
    	var response = request.responseText;
		try{ response = JSON.parse(response); }
		catch(err){ response = response; }
		next(response);
    }
    request.upload.onprogress = function(e){
    	// console.log('Progress:', e.loaded/e.total);
    	if(progress) progress(e.loaded/e.total);
    }
    request.send(form);
}

function getObjectById(object, id){
	for(var i = 0; i < object.length; i++){
		if(id == object[i].id){
			console.log('getObjectById');
			console.log(object);
			console.log(id);
			return object[i];
		}else if(object[i].content){
			getObjectById(object[i].content, id);
		}
	}
}

function getObjectByValue(array, property, value){
	array.filter(function(object) {
	  return object[property] == value;
	});
}

function removeObjectByValue(array, property, value){
	return array.filter(function( object ) {
	  return object[property] != value;
	});
}

function getClickedElement(e, attribute, value, i = 0){
	if (e.target !== e.currentTarget) {
		e.stopPropagation();
		var target = e.path[i];
		while(e.path[i][attribute] != value){
			target = e.path[++i];
		}
		return target;
	}else{
		return false;
	}
}

function getHigherElementByAttribute(element, attribute){
	while(!element.getAttribute(attribute) && element.nodeName != 'BODY') element = element.parentNode;
	return (element.nodeName == 'BODY') ? false:element;
}

function getHigherElementByClassName(element, className){
	while(!hasClass(element, className) && element.nodeName != 'BODY') element = element.parentNode;
	return (element.nodeName == 'BODY') ? false:element;
}

function getHigherElementByTagName(element, tagname){
	while(element.nodeName != tagname && element.nodeName != 'BODY') element = element.parentNode;
	return (element.nodeName == 'BODY') ? false:element;
}

function getAllElementsWithAttribute(attribute){
  var result = {};
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++){
 		if (allElements[i].getAttribute(attribute) !== null){
			result[allElements[i].getAttribute(attribute)] = allElements[i];
		}
  }
  return result;
}

function toggleElement(element, options = {}){
	options.attribute = (options.attribute) ? options.attribute:'value';
	var attribute = element.getAttribute(options.attribute);
	if(attribute != 'true' || !attribute){
		element.setAttribute(options.attribute, 'true');
		if(options.onActive) options.onActive(element);
		return true;
	}else{
		element.setAttribute(options.attribute, 'false');
		if(options.onInactive) options.onInactive(element);
		return false;
	}
}

function isMobile(){
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}

function ArrayToObjects(name){
	var result = {}
	for(var i = 0; i < array.length; i++){
		var object = array[i];
		result[object[name]] = object;
	}
	return result;
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function isInArrayOfObject(array, property, value){
	for(var i = 0; i < array.length; i++) {
	    if (array[i][property] == value) {
	        return true;
	    }
	}
	return false;
}

function getChildrenPosition(container, list = {}){
	for(var i = 0; i < container.children.length; i++) list[container.children[i].getAttribute('key')] = i;
	return list;
}

function getAssignedObject(model, source){
	for(var x in source){
		model[x] = source[x];
	}
	return model;
}

function getScrollPosition(){
	return window.scrollY || window.scrollTop || document.documentElement.scrollTop;
}

function getDocumentHeight() {
    var height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
    height = height - window.innerHeight;
    return height;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//Deepmerge
function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object'

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function on(element){
	element.setAttribute('active','true');
}
function off(element){
	element.setAttribute('active','false');
}

function getSelectedOption(select){
	return select.options[select.selectedIndex];
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice()
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument)
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument)
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument))
        }
    })
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {}
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument)
        })
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument)
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument)
        }
    })
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge }
    var arrayMerge = options.arrayMerge || defaultArrayMerge

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
}

function printFormData(formdata){
	for (var pair of formdata.entries()) {
	    console.log(pair[0]+ ', ' + pair[1]); 
	}
}

function getElementIndex(element){
	var i = 0;
	while( (element = element.previousSibling) != null ) 
	  i++;
	return i;
}

function getActiveChildIndex(parent){
	var children = parent.children;
	for(var i = 0; i < children.length; i++){
		if(children[i].getAttribute('active') == 'true'){
			return i;
		}
	}
}
