'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _process = require('./process');

Object.keys(_process).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _process[key];
    }
  });
});