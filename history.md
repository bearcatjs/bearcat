0.4.26 / 2015-7-3
==================
* fix FUNC_PROPS_REGEXP_ATTR match bug [issue@205](https://github.com/bearcatjs/bearcat/issues/205)

0.4.25 / 2015-6-30
==================
* fix bearcat destroy hook when in spawn child mode

0.4.24 / 2015-6-8
==================
* add bearcat.extend feature to make it easy for bearcat function to use inherits

0.4.23 / 2015-6-5
* fix resolve function string inject $ attribute value bug

0.4.22 / 2015-6-5
==================
* add bearcat.getClass alias to bearcat.getFunction

0.4.21 / 2015-5-21
==================
* update shim logger.js

0.4.20 / 2015-5-20
==================
* improve hot reload random interval time to avoid require file failed

0.4.19 / 2015-5-19
==================
* update bearcat hot reload logs

0.4.18 / 2015-5-13
==================
* upgrade dynamicMetaProxy methods

0.4.17 / 2015-4-28
==================
* add bearcat.require, bearcat.exports support for cocos2d-js environment

0.4.16 / 2015-4-26
==================
* add SIGTERM SIGHUP destroy signal hook

0.4.15 / 2015-4-14
==================
* consistent configuration properties loader first directory does not load subdirectory

0.4.14 / 2015-4-13
==================
* bearcat placeHolder consistent configuration add subdirectory configuration support

0.4.13 / 2015-4-12
==================
* update chokidar to latest stable version

0.4.12 / 2015-4-3
==================
* modelAttribute do not filter null value

0.4.11 / 2015-4-1
==================
* improve bearcat hot reload with adding file and adding auto attribute dependency support

0.4.10 / 2015-3-30
==================
* fix bearcat generate fpath does not generate right bug

0.4.9 / 2015-3-30
==================
* add metaUtil resolveFuncAnnotation force refresh metaCache when in hot reload case

0.4.8 / 2015-3-30
==================
* add metaUtil resolveFuncAnnotation metaCache to improve performance

0.4.7 / 2015-3-28
==================
* review getBean process, make it faster about 3 times then before

0.4.6 / 2015-3-24
==================
* getBeanByFunc should make the bean lazy by default

0.4.5 / 2015-3-20
==================
* fix getBean by function no id failed error

0.4.4 / 2015-3-17
==================
* warn bean id value must not use bearcat special bean attributes

0.4.3 / 2015-3-5
==================
* update bearcat command

0.4.2 / 2015-3-4
==================
* add bearcat cocos2d-js jsb env support

0.4.1 / 2015-3-2
==================
* fix model default number attribute should do parseInt

0.4.0 / 2015-2-27
==================
* add bearcat model abstraction ,see [bearcat model](http://bearcatjs.org/guide/model.html)

0.3.19 / 2015-2-26
==================
* review codes and make some improvements

0.3.18 / 2015-2-14
===================
* add BEARCAT_FUNCTION_STRING flag to force use funcString to resolve $ props, see [example](https://github.com/bearcatjs/bearcat/tree/master/examples/state_file_scope_var)

0.3.17 / 2015-2-13
===================
* fix make the usage of Object.defineProperty change the default object get/set method work, see [issue](https://github.com/bearcatjs/bearcat/issues/131)

0.3.16 / 2015-2-13
===================
* bearcat.createApp will auto stop when it has beed started

0.3.15 / 2015-2-12
===================
* fix bearcat startup log env output error bug

0.3.14 / 2015-2-5
===================
* improve consistent configuration, just use placeholder, no need to use $ prefixed attributes

0.3.13 / 2015-1-31
===================
* update readme travis-ci and upgrade aop implements 

0.3.12 / 2015-1-30
===================
* review typeof check type to Util.checkXXX

0.3.11 / 2015-1-28
===================
* review Utils.isType to make it more robust

0.3.10 / 2015-1-26
===================
* review bearcat.createApp && make some improvements

0.3.9 / 2015-1-24
===================
* review bearcat.getBeanFunction && improve proxy invoke with error when target bean has not such method

0.3.8 / 2015-1-20
===================
* update license year to 2015, make some improvements

0.3.7 / 2015-1-19
===================
* fix codes, make some improvements

0.3.6 / 2015-1-14
===================
* improve bearcat hot reload, using chokidar to watch source files

0.3.5 / 2015-1-6
===================
* improve function annotation when have arguments or new with error case, cases exmaple see [simple_meta_error](https://github.com/bearcatjs/bearcat/tree/master/examples/simple_meta_error)

0.3.4 / 2014-12-31
===================
* make $ based configuration more powerful, not just this.$id like, details see [complex_function_annotation](https://github.com/bearcatjs/bearcat/tree/master/examples/complex_function_annotation)

0.3.3 / 2014-12-27
===================
* improve asyncScriptLoader resolve warn msg

0.3.2 / 2014-12-24
===================
* update bower.json

0.3.1 / 2014-12-24
===================
* fix bower.json

0.3.0 / 2014-12-24
===================
* release 0.3.x version, add browser support, more details please visit [http://bearcatjs.org](http://bearcatjs.org)

0.2.37 / 2014-12-24
===================
* getBeanByMeta donnot post process [merge pull request 106](https://github.com/bearcatnode/bearcat/pull/106)

0.2.36 / 2014-12-10
===================
* fix placehold boolean bug [merge pull request 105](https://github.com/bearcatnode/bearcat/pull/105)

0.2.35 / 2014-12-2
===================
* add createApp opts [createApp](http://bearcatnode.github.io/bearcat/bearcat-api.html#createApp)

0.2.34 / 2014-11-30
===================
* review codes && fix some problems

0.2.33 / 2014-11-27
===================
* fix scan load relative path bug && fix context.json load dependency merge meta bug

0.2.32 / 2014-11-24
===================
* add modify config path by NODE_CPATH env

0.2.31 / 2014-11-10
===================
* improve log4js configuration files with specific env

0.2.30 / 2014-10-8
==================
* fix getBeanByFunc value inject bug

0.2.29 / 2014-10-8
==================
* fix function annotation aop bug

0.2.28 / 2014-9-13
==================
* fix placeHolder single to support object

0.2.27 / 2014-8-22
==================
* fix function anntotation args resolve bug

0.2.26 / 2014-8-21
==================
* fix DynamicAopProxy null like argument aop problems

0.2.25 / 2014-8-20
==================
* fix aop method conflit by rename dynamicAopProxy internal function name

0.2.24 / 2014-8-11
==================
* fix bearcat.js logger msg bug

0.2.23 / 2014-8-1
==================
* update function annotation comment test case

0.2.22 / 2014-7-23
==================
* add BEARCAT_ANNOTAION env flag to disable $ function annotation

0.2.21 / 2014-6-26
==================
* fix getBean func annotation arguments support

0.2.20 / 2014-6-25
==================
* add examples run app.js

0.2.19 / 2014-6-25
==================
* fix function annotation comments bug

0.2.18 / 2014-6-17
==================
* fix bearcat getBean state check bug

0.2.17 / 2014-6-16
==================
* add aop, hot reload $ annotation support

0.2.16 / 2014-6-13
==================
* fix fs.watch windows emit filename null bug check

0.2.15 / 2014-6-11
==================
* fix placeholder only load json files

0.2.14 / 2014-6-10
==================
* bearcat fix require uncached bug

0.2.13 / 2014-6-10
==================
* fix hot reload only reload js files bug

0.2.12 / 2014-6-10
=================
* add $ function annotation namespace bean support

0.2.11 / 2014-6-9
=================
* fix bearcat load require rm cache bug

0.2.10 / 2014-6-9
=================
* add $ based function annotation support for DI [Function annotation di ](https://github.com/bearcatnode/bearcat/wiki/Function-annotation-di)

0.2.9 / 2014-6-9
================
* update readme, add helloBearcat example link

0.2.8 / 2014-6-7
================
* fix factoryBean run factoryMethod inject other beans bug, fix [examples](https://github.com/bearcatnode/bearcat/tree/master/examples/simple_factory_bean)

0.2.7 / 2014-6-5
================

* add history.md  

0.1.x ~ 0.2.6 
================
ioc, aop, consistent configuration, hot reload, place holder