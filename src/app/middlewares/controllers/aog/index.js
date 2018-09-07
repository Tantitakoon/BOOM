'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _myAISLinking = require('./myAISLinking');

Object.keys(_myAISLinking).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _myAISLinking[key];
    }
  });
});