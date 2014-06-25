var MockAnnotationFunction = require('../mock-base/mock-annotation-function');
var MetaUtil = require('../../lib/util/metaUtil');

var func = MockAnnotationFunction.t13;
var meta = MetaUtil.resolveFuncAnnotation(func);

console.log(meta);