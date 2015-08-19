<img src="https://cldup.com/obCuOPH5UW.png" alt="errorist" style="width: 128px; height: 128px;"/> 

# errorist [![npm version](https://badge.fury.io/js/errorist.svg)](http://badge.fury.io/js/errorist) [![Build Status](https://travis-ci.org/boneskull/errorist.svg?branch=master)](https://travis-ci.org/boneskull/errorist) [![Codacy Badge](https://www.codacy.com/project/badge/c9dc230d740b4e63bdd2a3fce9e7b141)](https://www.codacy.com/app/boneskull/errorist) 

> If you don't have an Error, errorist gives you one 

## Install

```shell
$ npm install errorist
```

## Usage

```js
var errorist = require('errorist');

function asyncFunc(callback) {
  process.nextTick(function() {
    callback('this is not an Error; it is a string');
  });
}

asyncFunc(function(err) {
  if (err) {
    // you would never do a thing like throw a string, right?
    throw errorist(err);
  }
});

// or with promises
require('bluebird').promisify(asyncFunc)()
  .catch(err) {
    // stack trace FTW
    throw errorist(err);
  });
```

## Notes

errorist's flow is a bit like this:

- If the value is an `Error`
  - `return` it.
- If the value is a non-`null` object or function
  - and its `message` property is a `string`
    - `return` a new `Error` with the `message`.
  - otherwise
     - stringify the object into JSON 
     - upon success
       - `return` the stringified object as the `Error`'s `message`.        
     - otherwise
       - `return` an empty `Error` instance.
- Otherwise
  - `return` an `Error` instance with the primitive, `null`, or `undefined` value as its message.
  
## License

© 2015 [Christopher Hiller](https://boneskull.com).  Licensed MIT.
