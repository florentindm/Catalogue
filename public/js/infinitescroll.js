(function (InfiniteScroll) {
    var self = InfiniteScroll;

    self.enable = function(){
        console.log('InfiniteScroll.init()');
        var form = $('form.controls')[0];
        window.onscroll = function(){
            var scroll = getScrollPosition();
            var docHeight = getDocumentHeight();
            var delta = docHeight - scroll;
            console.log('Scroll');
            // console.log(delta, View.infiniteScroll);
            if(delta < 200 && View.infiniteScroll && Server.content.nextable){
                View.infiniteScroll = false;
                form.page.value = Server.content.page + 1;
                var action = form.getAttribute('action');
                action = action.split('/');
                action = action[1];
                action = 'getNextParentContent/' + action;
                Server.sendForm(form, function(){
                    form.page.value = 1;
                    View.infiniteScroll = true;
                    console.log('Server.content.parent');
                    console.log(Server.content.parent);
                }, action);
            }
        }
    }

    self.disable = function(){
        window.onscroll = false;
    }

    return self;
})(window.InfiniteScroll = window.InfiniteScroll || {});