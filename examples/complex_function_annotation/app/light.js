var Light = function() {
	this.$id = "light";
}

Light.prototype.shine = function() {
	console.log('light shine...');
	return 'light';
}

module.exports = Light;