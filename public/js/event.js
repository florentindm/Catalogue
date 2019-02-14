(function (Event) {
    var self = Event;

    var events = [
        'onclick',
        'ondblclick',
        'onkeydown',
        'onsubmit',
        'onchange'
    ]

    var init = function(){
        for(var i = 0; i < events.length; i++){
            document.body[events[i]] = self.doEvent;
        }
    }

    self.doEvent = function(e){
        var trigger = getHigherElementByAttribute(e.target, e.type);
        if(!trigger) return;
        var event = trigger.getAttribute(e.type);
        console.log('Event – ' + event);
        self.events[event](trigger, e);
    }

    //Global Event
    self.events = {
        roll:function(trigger){
            var roll = getHigherElementByClassName(trigger, 'roll');
            console.log('roll');
            console.log(roll);
            Interact.roll(roll, 'next');
        },
        rollSelf:function(trigger){
            Interact.rollSelf(trigger);
        },
        prevent:function(form, e){
            console.log('prevent');
            e.preventDefault();
            self.events.submitForm(form);
        },
        updateChecklistButton:function(trigger){
            var value = '';
            for(var i = 0; i < trigger.children.length; i++){
                var item = trigger.children[i];
                var checked = item.children[0].checked;
                var text = item.children[1].innerText;
                if(checked) value += text + ', ';
            }
            var button = trigger.parentNode.children[0];
            // value = value.slice(-1, 2);
            button.innerHTML = value || 'Aucun';
        },
        checkForDelete:function(){
            View.checkForDelete();
        },
        removeCheckedElements:function(){
            View.removeCheckedElements();
        },
        submitContentForm:function(){
            var form = document.querySelector('.content form');
            Server.sendForm(form);
        },
        submitForm:function(trigger){
            var form = getHigherElementByTagName(trigger, 'FORM');
            Server.sendForm(form);
        },
        goBack:function(){
            history.back();
        },
        addElement:function(trigger){
            var parent = $('[childtype]')[0];
            var childtype = parent.getAttribute('childtype');
            View.addElementToParent(parent, childtype);
        },
        onFilterPropertyChange:function(select){
            var selected = getSelectedOption(select);
            var type = selected.getAttribute('type');
            type = 'filter-condition-' + type;
            var parent = select.parentNode.children[1];
            console.log('onFilterPropertyChange');
            console.log(parent);
            console.log(type);
            View.setElementInParent({
                parent:parent,
                element:type
            });
        },
        restrictInteger:function(input){
            console.log('restrictInteger');
            console.log(input);
        },
        toggleControl:function(name){
            var controls = document.getElementsByClassName('controls')[0];
            var control = controls.getElementsByClassName(name)[0];
            isolate(control);
        },
        toggleSortControl:function(){
            self.events.toggleControl('sort');
        },
        toggleSearchControl:function(){
            self.events.toggleControl('search');
        },
        toggleFiltersControl:function(){
            self.events.toggleControl('filters');
        },
        toggleNextFilter:function(){
            var filters = document.getElementsByClassName('filters-content')[0];
            console.log('toggleNextFilter');
        },
        addFilter:function(){
            var filters = document.getElementsByClassName('filters-content')[0];
            View.addElementInParent({
                parent:filters,
                element:'filter',
                content:{
                    properties:Server.content.properties
                }
            });
        },
        removeFilter:function(){
            var filters = document.getElementsByClassName('filters-content')[0];
            var roll = document.getElementsByClassName('roll')[0];
            var index = filters.getAttribute('index') || 0;
            var next = index-1;
            if(next < 0) next = filters.children.length-1;
            else if(next > filters.children.length-1) next = 0;
            console.log(next);
            Interact.roll(roll, 'previous');
            filters.children[index].remove();
        },
        popTemplate:function(trigger){
            var template = trigger.getAttribute('template');
            var parent = getHigherElementByClassName(trigger, 'container');
            console.log('popTemplate');
            console.log(parent);
            View.popTemplate({template:template, content:Server.content}, parent, trigger);
            console.log('popTemplate: ', template);
        },
        popTemplateWithData:function(trigger){
            console.log('popTemplateWithData');
            var url = trigger.getAttribute('href');
            var template = trigger.getAttribute('template');
            var parent = getHigherElementByClassName(trigger, 'container');
            console.log('popTemplate');
            console.log(parent);
            Server.sendUrl(url, function(response){
                console.log(response);
                View.popTemplate({template:template, content:response.content}, parent, trigger);
            })
        },
        closePop:function(trigger){
            var pop = getHigherElementByClassName(trigger, 'view');
            console.log('Pop:',pop);
            View.closePop(pop);
        },
        closePopContainer:function(trigger){
            var pop = getHigherElementByClassName(trigger, 'container');
            console.log('Pop:',pop);
            View.closePop(pop);
        },
        submitFormAndClosePop:function(){
            var form = $('.content form')[0];
            View.closePop();
            Server.sendForm(form);
        },
        updateImportMapping:function(trigger){
            console.log('updateImportMapping');
            var container = document.getElementsByClassName('import-mapping')[0];
            Papa.parse(trigger.files[0], {
                complete: function(results) {
                    console.log(results);
                    View.setElementInParent({
                        parent:container,
                        element:'objectimport-mapping',
                        content:{
                            properties: Server.content.properties,
                            row:results.data[0]
                        }
                    })
                }
            });
        },
        addObject:function(trigger){
            var template = 'objectcard-new';
            var firstmodel = Object.keys(Server.content.models)[0];
            var model = Server.content.models[firstmodel];
            var properties = model.properties.map(function(property){
                return Server.content.properties[property];
            });
            console.log('model');
            console.log(model);
            console.log(properties);
            var parent = getHigherElementByClassName(trigger, 'container');
            console.log('popTemplate');
            console.log(parent);
            View.popTemplate({template:template, content:{
                model:model,
                properties:properties,
                parent:Server.content.parent
            }}, parent);
        },
        addElement:function(trigger){
            View.addElement({
                element:trigger.getAttribute('element'),
                content:Server.content
            });
        },
        editInput:function(trigger){
            console.log('editInput', trigger);
            $(trigger).removeAttr('readonly');
            trigger.focus();
            trigger.onblur = function(){
                console.log('blur');
                trigger.setAttribute('readonly','readonly');
            }
        },
        removeParentElement:function(trigger){
            getHigherElementByClassName(trigger, 'element').remove();
        }
    }

    // window.onclick = function(e){
    //     if(e.target.nodeName == 'A') e.preventDefault();
    //     console.log(e.target);
    // }

    init();
    return self;
})(window.Event = window.Event || {});