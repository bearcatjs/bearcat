var func = function(a, b) {
	console.log(a);
	console.log(arguments);
	var args = Array.prototype.slice.apply(arguments);
	args.shift();
	console.log(args);
}

func(1, 2);