'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Service = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _logger = require('../../../config/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = new _logger2.default().app;

_axios2.default.defaults.timeout = 6000;

_axios2.default.interceptors.request.use(function (config) {
    config.requestTime = new Date().getTime();
    return config;
}, function (err) {
    return Promise.reject(err);
});

_axios2.default.interceptors.response.use(function (res) {
    logger.logService({}, res.config, res, res.request.connection);
    return res;
}, function (err) {
    logger.logService(err, err.config, {}, err.request.connection);
    return Promise.reject(err);
});

var Service = function () {
    function Service(BASE_API) {
        _classCallCheck(this, Service);

        this.BASE_API = BASE_API;
        this.methodName = '';
        this.channelName = '';
        this.intentName = '';
        this.termName = '';
        this.query = {};
        this.body = {};
        this.headers = {};
        this.reqTime = 0;
        this.term = this.term.bind(this);
        this.method = this.method.bind(this);
        this.channel = this.channel.bind(this);
        this.intent = this.intent.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.getQuery = this.getQuery.bind(this);
        this.setBody = this.setBody.bind(this);
        this.getBody = this.getBody.bind(this);
        this.setHeaders = this.setHeaders.bind(this);
        this.getHeaders = this.getHeaders.bind(this);
       
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.http = {
            get: this.get,
            post: this.post
        };
        this.setHeaders({});
    }

    _createClass(Service, [{
        key: 'method',
        value: function method(_method) {
            this.methodName = _method;
        }
    }, {
        key: 'channel',
        value: function channel(_channel) {
            this.channelName = _channel;
        }
    }, {
        key: 'intent',
        value: function intent(_intent) {
            this.intentName = _intent;
        }
    },{
        key: 'term',
        value: function term(_term) {
            this.termName = _term;
        }
    }
    , {
        key: 'setQuery',
        value: function setQuery(query) {
            this.query = query;
        }
    }, {
        key: 'getQuery',
        value: function getQuery() {
            var query = '';
            for (var key in this.query) {
                query += key + '=' + this.query[key];
            }
            return query;
        }
    }, {
        key: 'setBody',
        value: function setBody(body) {
            this.body = body;
        }
    }, {
        key: 'getBody',
        value: function getBody() {
            return _extends({
                term:this.termName,
                method: this.methodName,
                channel: this.channelName,
                intent: this.intentName,
                timeout: 1000
                
            }, this.body);
        }
    }, {
        key: 'setHeaders',
        value: function setHeaders(headers) {
            if (!headers['x-api-request-id']) {
                var randomNumber = Math.floor(Math.random() * 1000000 + 1).toString();
                headers['x-api-request-id'] = 'self-' + new Date().getTime() + randomNumber;
            }
            this.headers = _extends({}, this.headers, headers);
        }
    }, {
        key: 'getHeaders',
        value: function getHeaders() {
            var agent = new _https2.default.Agent({
                rejectUnauthorized: false
            });
            return {
                httpsAgent: agent,
                headers: this.headers
            };
        }
    }, {
        key: 'get',
        value: function get(path) {
            var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var url = this.BASE_API + path + '?' + encodeURI(this.getQuery());
            this.reqTime = new Date().getTime();
            return _axios2.default.get(url, this.getHeaders());
        }
    }, {
        key: 'post',
        value: function post(path) {
            var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var url = this.BASE_API + path;
            this.reqTime = new Date().getTime();
            console.info(`Test Url: ${url}  ${this.getBody()}  ${this.getHeaders()} `);
            return _axios2.default.post(url, this.getBody(), this.getHeaders());
        }
    }, {
        key: 'getRequestForLog',
        value: function getRequestForLog(url, method) {
            return {
                url: url,
                method: method,
                headers: this.getHeaders(),
                query: this.getQuery(),
                body: this.getBody()
            };
        }
    }]);

    return Service;
}();

exports.Service = Service;