var BlogModel = function() {
	this.$mid = "blog";
	this.$table = "ba_blog";
	this.$prefix = "blog_";
	this.id = "$primary;type:Number";
	this.aid = "$type:Number";
	this.title = "$type:String";
	this.content = "$type:String";
	this.create_at = "$type:Number";
	this.update_at = "$type:Number";
}

module.exports = BlogModel;