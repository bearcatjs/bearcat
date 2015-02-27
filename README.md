## Bearcat
Bearcat makes plain javaScript object magic and expressive, which makes it easy to resolve dependency through DI and declarative middleware service through AOP. Bearcat supports frontend browser, backend [node.js](http://nodejs.org/) , and javaScript based hybrid apps, all you write are plain old javaScript objects, so codes can be easilly shared. Bearcat provides an infrastructural backbone to manage business objects so that developers can focus on application-level business logic. 

> ###Magic, self-described javaScript objects build up elastic, maintainable front-backend javaScript applications
 
![](http://bearcatjs.github.io/bearcat/images/bearcat-logo.png)
[![Build Status](https://travis-ci.org/bearcatjs/bearcat.svg?branch=master)](https://travis-ci.org/bearcatjs/bearcat)

 * Homepage: <http://bearcatjs.org/>
 * Guide: <http://bearcatjs.org/guide/>
 * API Reference: <http://bearcatjs.org/api/>
 * Examples: <http://bearcatjs.org/examples/>
 * Blog: <http://bearcatjs.org/blog/>
 * Mailing list: <https://groups.google.com/group/bearcatjs/>
 * Wiki: <https://github.com/bearcatjs/bearcat/wiki/>
 * Issues: <https://github.com/bearcatjs/bearcat/issues/>
 * Tags: 
 nodejs, browser, hybrid apps, POJO, IoC, AOP,  
 consistent configuration, front-backend, asynchronous script loading

## Features
### Simple   
Write simple plain old javaScript objects, that's it
### Efficient  
Dependency injection with asynchronous loading(frontend), no need to use define, require, or a bundle file
### Reuseable  
Simple javaScript objects can be used for frontend and backend(node.js) without any modifications
### Easy  
Easy to use, all javaScript objects will be scaned ready for you, no need to write extra complex, messy configuration files
### Powerful  
Powered by dependency injection, AOP based declarative middleware services
### Moduler  
You just use only those parts that you need

## Install
### Frontend
* standalone :   
[bearcat.js](https://raw.githubusercontent.com/bearcatjs/bearcat/master/dist/bearcat.js)  
[bearcat.min.js](https://raw.githubusercontent.com/bearcatjs/bearcat/master/dist/bearcat.min.js)

* bower : 
```
bower install bearcat
```

* browserfiy : 
```
npm install bearcat
```

### Backend(nodejs)
```
npm install bearcat
```

## Build
```
grunt package
```

## Tests
```
grunt
```

for browser tests, open browser-test.html in your browser

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
