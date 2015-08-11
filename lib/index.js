'use strict';

var isError = require('lodash.iserror');
var isObject = require('lodash.isobject');

module.exports = function errorist(value) {
  var err;
  if (isError(value)) {
    err = value;
  } else if (isObject(value)) {
    if (typeof value.message === 'string') {
      err = new Error(value.message);
    } else {
      try {
        err = new Error(JSON.stringify(value));
      } catch (ignored) {
        err = new Error();
      }
    }
  } else {
    err = new Error(value);
  }
  return err;
};
