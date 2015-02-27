var BlogResultModel = function() {
	this.$mid = "blogResult";
	// this.$prefix = "blog_";
	this.blog = "$type:Object;ref:blog";
	this.author = "$type:Object;ref:author";
	// this.comments = "$type:Array;ref:comment";
	this.commentResults = "$type:Array;ref:commentResult";
}

BlogResultModel.prototype.run = function() {
	console.log("%j", this.blog);
	console.log("%j", this.author);
	// console.log("%j", this.comments);
	console.log("%j", this.commentResults);
	// console.log(this.comments)
}

module.exports = BlogResultModel;