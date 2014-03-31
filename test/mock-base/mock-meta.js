var meta = {};

module.exports = meta;

meta.t1 = {

};

meta.t2 = {
	id: "car"
};

meta.t3 = {
	id: "car",
	order: "aaa"
};

meta.t4 = {
	id: "car",
	asyncInit: 1
};

meta.t5 = {
	id: "car",
	initMethod: 12
};

meta.t6 = {
	id: "car",
	destroyMethod: 123
};

meta.t7 = {
	id: "car",
	scope: "aaa"
};

meta.t8 = {
	id: "car",
	factoryBean: 123
};

meta.t9 = {
	id: "car",
	factoryMethod: 123
};

var Engine = function() {};

meta.t10 = {
	id: "engine",
	order: 2,
	func: Engine,
	asyncInit: true,
	initMethod: "init",
	destroyMethod: "destroy",
	props: [{
		name: "car",
		ref: "car"
	}]
};
