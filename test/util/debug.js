var MockAnnotationFunction = require('../mock-base/mock-annotation-function');
var MetaUtil = require('../../lib/util/metaUtil');

var func = MockAnnotationFunction.t14;
var meta = MetaUtil.resolveFuncAnnotation(func);

console.log(meta);