'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _basicResponse = require('./basicResponse');

Object.keys(_basicResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _basicResponse[key];
    }
  });
});