(function (View) {
    var self = View;
    self.infiniteScroll = true;

    self.initialize = function(){
        if(Server.data) self[Server.data.action](Server.data);
        Server.content = Server.data.content;
    }

    init = function(){
        Handlebars.partials = Handlebars.templates;
        registerHelpers();
        onTemplateChange();
    }

    //Actions launched by the server
    self.setTemplate = function(data){
        console.log('setTemplate "' + data.template + '"');
        console.log(data.content);
        window.wrap.innerHTML = Handlebars.templates[data.template](data.content);
        onTemplateChange();
    }
    self.notify = function(data){
        document.body.setAttribute('notify','notify');
        window.topbar.setAttribute('class', data.type);
        window.topbar.innerHTML = '<span class="message">'+data.message+'</span>';
        window.setTimeout(function(){
            document.body.removeAttribute('notify');
            window.topbar.setAttribute('class', '');
            window.topbar.innerHTML = '';
        }, 5000);
    }
    self.goBack = function(){
        history.back();
    }
    self.addElement = function(data){
        self.addElementInParent({
            element:data.element,
            content:data.content,
            parent:$('.content form')[0]
        });
    }
    self.addElementInContent = function(data){
        return self.addElementInParent({
            element:data.element,
            content:data.content,
            parent:$('.content')[0]
        });
    }
    self.setContent = function(data){
        var content = document.getElementsByClassName('content')[0];
        self.setElementInParent({parent:content, element:data.element, content:data.content});
    }
    self.appendContent = function(data){
        var content = document.getElementsByClassName('content')[0];
        self.addElementInParent({parent:content, element:data.element, content:data.content});
    }
    self.addElementInParent = function(data){
        var element = Handlebars.templates[data.element](data.content);
        element = $(element);
        console.log('addElementInParent')
        console.log(element)
        $(element).appendTo(data.parent);
        return element;
    }
    self.setElementInParent = function(data){
        var parent = data.parent;
        var element = Handlebars.templates[data.element] ? Handlebars.templates[data.element](data.content):'';
        parent.innerHTML = element;
    }
    self.removeElements = function(data){
        forEachCheckbox(function(checkbox){
            var id = checkbox.getAttribute('name');
            if(data.ids.indexOf(id) > -1) checkbox.parentNode.parentNode.remove();
        });
    }
    self.removeCheckedElements = function(){
        var container = getActiveTemplate();
        console.log('removeCheckedElements')
        var checkboxes = $(container).find('input[type=checkbox]:checked').each(function(index, element){
            element.parentNode.remove();
        })
        self.checkForDelete();
    }
    self.checkForDelete = function(){
        var checked = false;
        var container = getActiveTemplate();
        var count = $(container).find('input[type=checkbox]:checked').length;
        if(count > 0){
            var specific = $(container).find('.actions .specific')[0];
            isolate(specific);
        }else{
            var glob = $(container).find('.actions .global')[0];
            isolate(glob);
        }
    }
    self.replaceElement = function(data){
        var old = $('.content')[0];
        console.log('replaceElement');
        console.log(old);
        old = old.children[data.index];
        var next = Handlebars.templates[data.element](data.content)
        $(old).replaceWith(next);
    }
    self.popTemplate = function(data, parent, trigger){
        console.log('popTemplate!!')
        var template = Handlebars.templates[data.template](data.content);
        console.log(template);
        var element = $(parent).prepend(template);
        var parent = parent || window.wrap;
        self.activeTemplate = {
            parent:parent,
            element:element,
            trigger:trigger
        }
        onTemplateChange();
    }
    self.closePop = function(pop){
        console.log('Closing pop');
        if(self.activeTemplate.trigger && self.activeTemplate.trigger.nodeName == 'INPUT'){
            var inputs = $(pop).find('.content input').map(function(){
                return this.name;
            }).get().join();
            self.activeTemplate.trigger.value = inputs;
        }
        pop.remove();
        onTemplateChange();
    }

    onTemplateChange = function(){
        $("form").submit(function(e){
            e.preventDefault();
            Server.sendForm(this);
        });
        var template = getActiveTemplate();
        var templatename = template.getAttribute('view');
        console.log('---> onTemplateChange');
        console.log(template);
        console.log(templatename);
        console.log('---');
        if(initilizers[templatename]){
            initilizers[templatename](template);
        }else{
            initilizers['*'](template);
        }
        Url.disableLinks();
    }
    function getActiveTemplate(){
        return window.wrap.children[0];
    }
    function forEachCheckbox(next){
        var checkboxes = document.querySelectorAll('input[type=checkbox]');
        for(var i = 0; i < checkboxes.length; i++){
            next(checkboxes[i]);
        }
    }
    function getElement(element, value){
        element = element || 'text';
        return toHTML(Handlebars.templates[element](value));
    }
    function registerHelpers(){
        for(var x in helpers){
            Handlebars.registerHelper(x, helpers[x]);
        }
    }
    function toHTML(string){
        return new Handlebars.SafeString(string);
    }
    var initilizers = {
        'objectproperty-album':function(container){
            console.log('objectproperty-album!!!')
            var button = container.getElementsByClassName('addfiles')[0];
            var content = container.getElementsByClassName('content')[0];
            var sortable = Sortable.create(content, {
                animation:50
            });
            var bar;
            var uploader = new qq.FineUploaderBasic({
                autoUpload:true,
                button:button,
                debug:true,
                request:{
                    endpoint:'/uploadFiles',
                    inputName:'files',
                    params:{
                        index:function(a){
                            return $('.content')[0].children.length;
                        }
                    }
                },
                callbacks:{
                    onSubmitted:function(id){
                        console.log('onSubmitted');
                        console.log(id);
                        var item = self.addElementInContent({
                            element:'objectproperty-album-item',
                            content:{id:id}
                        })
                        var vignette = item.getElementsByClassName('vignette')[0];
                        bar = new ProgressBar.Line(vignette, {
                            easing: 'easeInOut',
                            strokeWidth: 3,
                            color: '#FCB03C',
                            width:70
                        });
                    },
                    onProgress:function(id, name, uploaded, total){
                        console.log('Loaded ' + uploaded + ' on ' + total)
                        bar.animate(uploaded/total);
                    },
                    onComplete:function(id, name, response){
                        self[response.action](response);
                    }
                }
            });
        },
        'objectcontent':function(){
            InfiniteScroll.enable();
        },
        '*':function(){
            InfiniteScroll.disable();
        }
    }
    var helpers = {
        svg:function(name){
            return new Handlebars.SafeString('<img src="assets/'+name+'.svg"/>');
        },
        isChecked:function(a, b){
            console.log('isChecked');
            console.log(a,b);
            if(a == b) return 'checked';
            else return '';
        },
        setObjectContent:function(a){
            var element = a.values.map(function(value){
                return '<a href="objects/'+ value.id +'"><div class="element">'
                    + a.models[value.model].index.map(function(property){
                        var element = a.properties[property].element;
                        return '<div class="field" property="'+property+'" element="'+element+'">' + getElement(element, value[property]) + '</div>';
                }).join('') + '</div></a>';
            }).join('');
            return toHTML(element);
        },
        setAddAction:function(models){
            var modelKeys = Object.keys(models);
            var nbModels = modelKeys.length;
            var addIcon = 'add-circle-blue';
            console.log('setAddAction - models');
            console.log(models);
            if(nbModels == 1){
                var input = '<input type="hidden" name="model" value="'+modelKeys[0]+'"/>';
                return toHTML(input + getElement('button', {icon:addIcon, click:'addObject'}));
            }else{
                return getElement('dropdown-select', {
                    icon:addIcon,
                    name:'model',
                    onchange:'addObject',
                    options:models
                });
            }
        },
        getObjectCardElement:function(a, objectid){
            return getElement('objectcard-' + a.element, {
                property:a._id,
                object:objectid,
                value:a.value
            });
        },
        isDropdownContentEmpty:function(a){
            console.log('isDropdownContentEmpty');
            console.log(a);
        },
        isSelected:function(a, b){
            if(a == b) return 'selected';
            else return '';
        },
        isActive:function(a, b){
            if(a == b) return 'true';
            else return '';
        },
        isChecked:function(a, b){
            console.log('isChecked');
            console.log(a,b);
            if(a == b) return 'checked';
            else return '';
        },
        log:function(variable, name){
            console.log('log');
            console.log(name);
            console.log(variable);
        },
        firstItem:function(array){
            return (isArray(array)) ? array[0]:'';
        },
        getFirstKey:function(object){
            return Object.keys(object)[0];
        },
        concat:function(){
            var outStr = '';
            for(var arg in arguments){
                if(typeof arguments[arg]!='object'){
                    outStr += arguments[arg];
                }
            }
            return outStr;
        },
        ifEqual:function(a, b, c, d){
            if(a === b) return c;
            else return d;
        },
        getElement:getElement
    }

    init();
    return self;
})(window.View = window.View || {});