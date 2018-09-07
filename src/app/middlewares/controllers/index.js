'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkMobileNo = require('./checkMobileNo');

Object.keys(_checkMobileNo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _checkMobileNo[key];
    }
  });
});