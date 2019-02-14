module.exports = function(db) {
	var self = this;
	var bcrypt = require('bcryptjs');
	var view = require('./view')(db);
	var browser = require('./browser');

	self.login = function(data, next, req){
		db.collection('users').findOne({mail:data.mail}, function(err, user){
			if(user){
				bcrypt.compare(data.password, user.password, function(err, res) {
					if(res) {
						req.session.user = user;
						console.log('––––––> User connected');
						console.log(user);
						view.getRoot({user:{_id:user._id, name:user.name}}, next);
					} else {
						req.session.user = undefined;
						browser.notify('fail', 'Incorrect password', next);
					} 
				});
			}else{
				browser.notify('fail', 'This email is not registered', next);
			}
		});
	}

	self.logout = function(data, next, req){
		req.session.destroy();
		browser.setTemplate('login', {}, next);
	}

	self.register = function(data, next, req){

		bcrypt.genSalt(10, function(error, salt){
			bcrypt.hash(data.password, salt, function(error, hash){
				if(error){
					console.log('Error while hash password');
				}else{
					data.password = hash;
					insertDocument('users', 'user', data, function(id){
						req.session.user = {};
						req.session.user.name = data.name;
						req.session.user._id = id;
						view.getRoot({user:req.session.user}, next);
					});
				}
			})
		});
	}

	function isValidEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	return self;
}