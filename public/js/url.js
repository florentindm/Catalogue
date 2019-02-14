(function(Url){
    var self = Url;

    function init(){
        self.disableLinks();
    }

    window.onpopstate = function(){
        Server.sendUrl(window.location.pathname);
    }

    self.goTo = function(url){
        Server.sendUrl(url);
        self.setUrl(url);
    }

    self.setUrl = function(url){
        console.log('setUrl');
        console.log(url);
        history.pushState({}, document.title, url);
    }

    self.disableLinks = function(){
        var links = document.getElementsByTagName('a');
        for(var i = 0; i < links.length; i++){
            links[i].onclick = function(e){
                e.preventDefault();
                if(!this.getAttribute('click')){
                    self.goTo(this.href);
                }
            }
        }
    }

})(window.Url = window.Url || {});