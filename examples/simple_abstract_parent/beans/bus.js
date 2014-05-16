var Bus = function() {

}

Bus.prototype.fly = function() {
	console.log('Bus fly');
}

module.exports = {
	func: Bus,
	id: "bus",
	parent: "car"
};