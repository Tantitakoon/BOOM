'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _oauth = require('./config/oauth');

var _oauth2 = _interopRequireDefault(_oauth);

var _logger = require('./config/logger');

var _logger2 = _interopRequireDefault(_logger);

var _express = require('./config/express');

var _express2 = _interopRequireDefault(_express);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
  function Server() {
    _classCallCheck(this, Server);

    this.app = new _express2.default(new _oauth2.default().app, new _logger2.default().app);
    this.app.listen();
  }

  _createClass(Server, null, [{
    key: 'bootstrap',
    value: function bootstrap() {
      new Server();
    }
  }]);

  return Server;
}();

exports.default = Server;