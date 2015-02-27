var AuthorModel = function() {
	this.$mid = "author";
	this.$table = "ba_author";
	this.$prefix = "author_";
	this.id = "$primary;type:Number";
	this.name = "$type:String";
	this.create_at = "$type:Number";
	this.update_at = "$type:Number";
}

module.exports = AuthorModel;