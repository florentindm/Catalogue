(function (Server) {
    var self = Server;

    self.params = {};
    self.data = null;
    self.content = (self.data) ? self.data.content:null;

    var init = function(){
        // console.log(self.content);
    }

    success = function(data, next = false){
        console.log('Server - success');
        console.log(data);
        if(next) next();
        if(data.content) self.content = data.content;
        View[data.action](data);
    }

    self.sendRequest = function(object, next) {
        $.ajax({
            url: url,
            data: object,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                success(data, next);
            }
        });
    }

    self.sendUrl = function(url, next) {
        console.log('sendUrl', url);
        $.ajax({
            url: url,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
                success(data, next);
            }
        });
    }

    self.sendForm = function(element, next, action = false){
        console.log('Sending form');
        console.log(element);
        console.log('Next: ', next);
        var form = new FormData(element);
        console.log('FormData content:');
        // This bitch does not work in safari:
        // printFormData(form);
        $.ajax({
            url: action || element.getAttribute('action'),
            data: form,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                xhr.onprogress = function e() {
                    // For downloads
                    if (e.lengthComputable) {
                        console.log(e.loaded / e.total);
                    }
                };
                xhr.upload.onprogress = function (e) {
                    // For uploads
                    if (e.lengthComputable) {
                        console.log(e.loaded / e.total);
                    }
                };
                return xhr;
            },
            type: 'POST',
            success: function(data){
                success(data, next);
            }
        });
    }

    init();
    return self;
})(window.Server = window.Server || {});