(function (Interact) {
    var self = Interact;

    var selection = [];

    self.toggle = function(element){
        toggleElement(element);
    }

    self.check = function(element){
        toggleElement(element, {
            onActive:function(){

            },
            onInactive:function(){

            }
        });
    }

    self.choose = function(element){
        View.setSelection(element);
    }
    
    self.rollSelf = function(element){
        var index = getActiveChildIndex(element) || 0;
        console.log('rollSelf');
        console.log(index);
        index = (index < element.children.length-1) ? ++index:0;
        isolate(element.children[index]);
    }

    self.roll = function(roll, direction = 'next'){
        var scene = roll.getElementsByClassName('roll-scene')[0];
        var current = roll.getElementsByClassName('roll-current')[0];
        // var max = roll.getElementsByClassName('roll-max')[0];
        var index = scene.getAttribute('index') || 0;
        var count = scene.children.length;
        index = parseInt(index);
        if(direction == 'next') index++;
        else index--;
        if(index < 0) index = scene.children.length;
        else if(index > scene.children.length-1) index = 0;
        current.innerHTML = index + 1;
        // max.innerHTML = scene.children.length;
        index.innerHTML = count;
        isolate(scene.children[index]);
        scene.setAttribute('index', index);
    }

    return self;
})(window.Interact = window.Interact || {});