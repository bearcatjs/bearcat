var meta = {};

module.exports = meta;

var Engine = function() {};

meta.t1 = {

};

meta.t2 = {
	id: "car"
};

meta.t3 = {
	id: "car",
	func: Engine,
	order: "aaa"
};

meta.t4 = {
	id: "car",
	func: Engine,
	async: 1
};

meta.t5 = {
	id: "car",
	func: Engine,
	init: 12
};

meta.t6 = {
	id: "car",
	func: Engine,
	destroy: 123
};

meta.t7 = {
	id: "car",
	func: Engine,
	scope: "aaa"
};

meta.t8 = {
	id: "car",
	func: Engine,
	factoryBean: 123
};

meta.t9 = {
	id: "car",
	func: Engine,
	factoryMethod: 123
};

meta.t10 = {
	id: "engine",
	order: 2,
	func: Engine,
	async: true,
	init: "init",
	destroy: "destroy",
	props: [{
		name: "car",
		ref: "car"
	}]
};

meta.t11 = {
	id: "car",
	func: Engine,
	parent: 12
}

meta.t12 = {
	id: "car",
	func: Engine,
	lazy: "aaa"
}