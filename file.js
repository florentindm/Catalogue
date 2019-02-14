module.exports = function(){
	var self = this;
	var async = require('async');
	var util = require('util');
	var destination = 'public/uploads/';

	self.moveEach = function(files, next){
		var errs = null;
		var paths = [];
		files = util.isArray(files) ? files:[files];
		console.log(files);
		console.log('moveEachFiles');
		async.eachSeries(files, function(file, done){
			// file.name = encodeURI(file.name);
			var destination = 'public/uploads/' + file.name;
			file.mv(destination, function(err){
				if(err){
					errs = errs||[];
					errs.push({type:'fail', content:err});
				}
				else paths.push(file.name);
				done();
			});
		}, function allDone(err) {
			next(errs, paths);
		});
	}

	return self;
}