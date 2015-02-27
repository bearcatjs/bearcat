var CarErrorModel = function() {
	this.$mid = "carError";
	this.len1 = "$type:String;carSize(";
	this.len2 = "$type:String;carSize(a";
	this.len3 = "$type:String;(a";
	this.len4 = "$type:String;carSize(a)";
	this.len5 = "$type:String;carSize(a=)";
	this.len6 = "$type:String;carSize(a=1)";
	this.len7 = "$type:String;carxxSize(a=1)";
	this.len8 = "$xxxtype:String;carxxSize(a=1)";
}

CarErrorModel.prototype._modelInit = function() {

}

module.exports = CarErrorModel;