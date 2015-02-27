var CommentResultModel = function() {
	this.$mid = "commentResult";
	this.author = "$type:Object;ref:author;prefix:comment_author_";
	this.comment = "$type:Object;ref:comment";
}

module.exports = CommentResultModel;