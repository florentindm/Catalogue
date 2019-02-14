module.exports = function(db){
	var self = this;

	var ObjectId = require('mongodb').ObjectID;
	var parse = require('csv-parse/lib/sync');
	var queries = require('./queries')(db);

	self.importCSV = function(data, next){
		var csv = data.file.data;
		data.records = parse(csv, {delimiter:','});
		data.headers = data.records.shift();
		queries.insertObjectsFromCSV(data, next);
	}

	return self;
}