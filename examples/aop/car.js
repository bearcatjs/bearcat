var Car = function() {

}

Car.prototype.runBeforeSync = function() {
	console.log('runBeforeSync car...');
	return 'runBeforeSync';
}

Car.prototype.runBefore = function(cb) {
	console.log('runBefore car...');
	cb(null, 'car');
}

Car.prototype.runBeforeError = function(cb) {
	console.log('runBeforeError car...');
	cb(null, 'car');
}

Car.prototype.runTimeBefore = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.runAfter = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.runAround = function(cb) {
	cb(null, 'car');
}

Car.prototype.runTimeAround = function(num, cb) {
	cb(null, 'car' + num);
}

Car.prototype.doRun = function(num) {
	console.log('doRun ' + num);
}

Car.prototype.doRunObj = function(obj) {
	obj['a'] = 1;
}

Car.prototype.doRunAfterSync = function() {
	console.log('runAfterSync car...');
	return 'runAfterSync';
}

module.exports = Car;