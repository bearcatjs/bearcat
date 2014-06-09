## Bearcat -- a POJOs based application framework
Bearcat is a POJOs based application framework which provides a lightweight container for writing simple, maintainable [node.js](http://nodejs.org/). Bearcat provides an infrastructural backbone to manage business objects so that developers can focus on application-level business logic. Bearcat enables you to build applications from "plain old javaScript object"(POJO) and to apply enterprise services non-invasively to POJOs.

> ###Simple POJOs + Configuration metadatas = Elastic, maintainable system 
  
![](http://bearcatnode.github.io/bearcat/images/bearcat-logo.png)
[![Build Status](https://travis-ci.org/bearcatnode/bearcat.svg?branch=master)](https://travis-ci.org/bearcatnode/bearcat)

 * Homepage: <http://bearcatnode.github.io/bearcat/>
 * Mailing list: <https://groups.google.com/group/bearcatnode/>
 * Wiki: <https://github.com/bearcatnode/bearcat/wiki/>
 * Issues: <https://github.com/bearcatnode/bearcat/issues/>
 * Tags: nodejs, POJO, IoC, AOP, consistent configuration

## Features
### lightweight container

* Dependency injection implementated Inversion of Control (IoC) to manage POJOs
* AOP based declarative middleware services
* Consistent development and configuration

### Easy

* Simple meta configuration and POJOs
* Lightweight: high development efficiency based on node.js
* Reuseable: POJOs can be used to any development environment
* Invasive: there's no dependence on a container API
* Modular: you just use only those parts that you need
* One stop shop: no need for a dedicated Singleton or factory for every object etc
* Easy to mock objects for unit test based on IoC
* Hot reload prototype function nicely
* Function annotation based on $ named parameters, no need to update json files

### Powerful

* Good reference materials: full [docs](https://github.com/bearcatnode/bearcat/wiki), many examples includes [web todo](https://github.com/bearcatnode/todo), [realtime app](https://github.com/bearcatnode/chatofpomelo-websocket)
* well-tested: test cases [coverage](http://bearcatnode.github.io/bearcat/coverage.html) is over 95%

### Extensible
* Custom features: you can add custom codes to container

## What is POJO ? 
POJO is an acronym for Plain Old Java Object, you can refer to [POJO wikipedia](http://en.wikipedia.org/wiki/Plain_Old_Java_Object). It is mostly used in Java Platform which is used to emphasize that a given object is an ordinary Java Object, not a special object.   
In Node, what is POJO ?  
It must be Plain Old JavaScript Object, which is simple, ordinary, and not anonymous.  
To be not anonymous, it must have Constructor function.  
So POJO can be like this:  
```
var POJO = function() {
	this.props = null;
}

POJO.prototype.method = function() {
	
}

module.exports = POJO;
```  

## Why should we use POJO ? 
* POJO is simple, everyone can write it  
* POJO makes development consistently, all your codes is POJOs  
* POJO makes it friendly to document  

## Usage
Running bearcat is quite simple, all you have to do is to write simple POJOs and simple configuration metadatas like context.json, after this, passing context.json paths to bearcat, and run it, then all your POJOs will be magicly turned into an elastic, maintainable system.  

[helloBearcat](https://github.com/bearcatnode/bearcat/wiki/HelloWorld-of-Bearcat) example 
```
var Bearcat = require('bearcat');
var contextPath = require.resolve('./context.json');

var bearcat = Bearcat.createApp([contextPath]);
bearcat.start(function(){
   var helloBearcat = bearcat.getBean('helloBearcat'); // get bean
   helloBearcat.hello(); // call the method
});
```

Codes written by simple POJOs and simple configuration metadatas can be run without Bearcat, however, in this case, you should have to do a lot of things by yourself, like handling dependency, configuration  

more bearcat apis can be refered to [bearcat-api](http://bearcatnode.github.io/bearcat/bearcat-api.html)

## Generator
[generator-bearcat](https://github.com/bearcatnode/generator-bearcat) is provided for quick startup  
```
npm install -g yo
```

```
npm install -g generator-bearcat
```

```
yo bearcat
```

you can choose to generate bearcat-app, bearcat-webapp, bearcat-library for your application needs 
![](http://bearcatnode.github.io/bearcat/images/yeoman_bearcat.png)

## License

(The MIT License)

Copyright (c) fantasyni and other contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
