'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _cron = require('cron');

var _cron2 = _interopRequireDefault(_cron);

var _constants = require('../app/utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        this.createDirectory = this.createDirectory.bind(this);
        this.createLogger = this.createLogger.bind(this);
        this.logRequest = this.logRequest.bind(this);
        this.logResponse = this.logResponse.bind(this);
        this.logService = this.logService.bind(this);
        this.logRoot = this.logRoot.bind(this);

        this.accessLog = this.accessLog.bind(this);
        this.infoLog = this.infoLog.bind(this);
        this.serviceLog = this.serviceLog.bind(this);
        this.rootLog = this.rootLog.bind(this);
        this.logFormat = this.logFormat.bind(this);
        this.fileTimestamp = this.fileTimestamp.bind(this);
        this.setCronJobLogRotate = this.setCronJobLogRotate.bind(this);
        this.app = {
            logRequest: this.logRequest,
            logResponse: this.logResponse,
            logService: this.logService,
            logRoot: this.logRoot,
            setCronJobLogRotate: this.setCronJobLogRotate
        };
        this.createDirectory();
    }

    _createClass(Logger, [{
        key: 'setCronJobLogRotate',
        value: function setCronJobLogRotate() {
            var CronJob = _cron2.default.CronJob;
            new CronJob('*/' + _constants.ENV.LOG_ROTATE_TIME + ' * * * *', function () {
                var type = ['access', 'info', 'service', 'root'];
                type.forEach(function (level) {
                    var logFile = _path2.default.join('' + _constants.ENV.LOG_PATH, level + '/' + level + '.log');
                    var timestamp = (0, _moment2.default)().subtract(15, 'minutes').format('YYYYMMDD_HHmm');
                    var newLogFile = _path2.default.join('' + _constants.ENV.LOG_PATH, level + '/' + level + '.log.' + timestamp);
                    _fsExtra2.default.appendFileSync(newLogFile, _fsExtra2.default.readFileSync(logFile));
                    _fsExtra2.default.writeFile(logFile, '');
                });
            }, null, true);
        }
    }, {
        key: 'fileTimestamp',
        value: function fileTimestamp() {
            var date = new Date();
            var offset = date.getTimezoneOffset();
            date.setMinutes(date.getMinutes() - offset);
            var dateTimeStr = date.toISOString();
            var dateStr = dateTimeStr.slice(0, 10);
            var dateHourStr = dateTimeStr.slice(0, 13).replace(/T/g, "-");

            return {
                dateStr: dateStr,
                dateHourStr: dateHourStr,
                dateTimeStr: dateTimeStr
            };
        }
    }, {
        key: 'logTimestamp',
        value: function logTimestamp() {
            return (0, _moment2.default)(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss.SSS');
        }
    }, {
        key: 'createDirectory',
        value: function createDirectory() {
            if (!_constants.ENV.SAVE_LOG) return;
            var type = ['access', 'info', 'service', 'root'];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = type[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var level = _step.value;

                    var logPath = _path2.default.join('' + _constants.ENV.LOG_PATH, '' + level);
                    if (!_fsExtra2.default.existsSync(logPath)) {
                        (0, _mkdirp2.default)(logPath, function (err) {
                            if (err) return;
                        });
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'createLogger',
        value: function createLogger(level) {
            var _this = this;

            return function (message) {
                var timestamp = _this.fileTimestamp();
                var logFile = _path2.default.join('' + _constants.ENV.LOG_PATH, level + '/' + level + '.log');
                _fsExtra2.default.writeFile(logFile, _this.logFormat(message) + '\r\n', {
                    flag: 'a'
                }, function (err) {
                    if (err) return;
                });
            };
        }
    }, {
        key: 'logRequest',
        value: function logRequest(req, res, next) {
            req.startTime = new Date().getTime();
            var message = {
                TIMESTAMP: this.logTimestamp(),
                ID: process.pid,
                IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                REQUEST_ID: req.headers['x-api-request-id'] || req.id,
                REQUEST_METHOD: req.method.toUpperCase(),
                REQUEST_URI: req.url,
                REQUEST_HEADERS: req.headers,
                REQUEST_PARAMS: req.params,
                REQUEST_BODY: req.body
            };
            this.accessLog(message);
            next();
        }
    }, {
        key: 'logResponse',
        value: function logResponse(req, res, next) {
            var _this2 = this;

            var oldWrite = res.write;
            var oldEnd = res.end;
            var chunks = [];

            res.write = function () {
                for (var _len = arguments.length, restArgs = Array(_len), _key = 0; _key < _len; _key++) {
                    restArgs[_key] = arguments[_key];
                }

                chunks.push(new Buffer(restArgs[0]));
                oldWrite.apply(res, restArgs);
            };
            res.end = function () {
                for (var _len2 = arguments.length, restArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    restArgs[_key2] = arguments[_key2];
                }

                if (restArgs[0]) {
                    chunks.push(new Buffer(restArgs[0]));
                }
                var body = Buffer.concat(chunks).toString('utf8');
                var startTime = req.startTime;
                var endTime = new Date().getTime();
                var responseTime = endTime - startTime;

                var message = {
                    TIMESTAMP: _this2.logTimestamp(),
                    ID: process.pid,
                    IP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                    REQUEST_ID: req.headers['x-api-request-id'] || req.id,
                    REQUEST_METHOD: req.method.toUpperCase(),
                    REQUEST_URI: req.url,
                    REQUEST_HEADERS: req.headers,
                    REQUEST_PARAMS: req.params,
                    REQUEST_BODY: req.body,
                    RESPONSE_STATUS: res.statusCode,
                    RESPONSE_BODY: body,
                    RESPONSE_TIME: responseTime
                };
                _this2.infoLog(message);
                oldEnd.apply(res, restArgs);
            };
            next();
        }
    }, {
        key: 'logService',
        value: function logService(err, req, res, connection) {
            var responseTime = new Date().getTime() - req.requestTime;
            var message = {
                TIMESTAMP: this.logTimestamp(),
                ID: process.pid,
                IP: req.headers['x-forwarded-for'] || connection.remoteAddress || 'None',
                REQUEST_ID: req.headers['x-api-request-id'] || req.id || 'None',
                REQUEST_METHOD: req.method.toUpperCase(),
                REQUEST_URI: req.url,
                REQUEST_HEADERS: req.headers,
                REQUEST_PARAMS: function () {
                    var match = req.url.match(/\?(.*)/gi);
                    if (match !== null) {
                        var json = {};
                        var stringParams = match[0].replace(/^\?/gi, '');
                        stringParams.split('&').map(function (param) {
                            var keyAndValue = param.split('=', 2);
                            if (keyAndValue.length === 2) {
                                json[keyAndValue[0]] = keyAndValue[1];
                            } else {
                                json[keyAndValue[0]] = '';
                            }
                            return null;
                        });
                        return json;
                    } else {
                        return {};
                    }
                }(),
                REQUEST_BODY: req.data,
                RESPONSE_STATUS: res.status || 'None',
                RESPONSE_BODY: res.data || 'None',
                RESPONSE_TIME: responseTime,
                ERROR_MESSAGE: err.message || '',
                ERROR_INSTANCE: ''
            };
            this.serviceLog(message);
        }
    }, {
        key: 'logRoot',
        value: function logRoot(error) {
            var message = {
                TIMESTAMP: (0, _moment2.default)(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss.SSS'),
                ID: process.pid,
                ERROR_TYPE: error.errorType,
                ERROR_MESSAGE: error.message,
                STATUS_CODE: error.statusCode
            };
            this.rootLog(message);
        }
    }, {
        key: 'accessLog',
        value: function accessLog(message) {
            var logger = this.createLogger('access');
            logger(message);
        }
    }, {
        key: 'infoLog',
        value: function infoLog(message) {
            var logger = this.createLogger('info');
            logger(message);
        }
    }, {
        key: 'rootLog',
        value: function rootLog(message) {
            var logger = this.createLogger('root');
            logger(message);
        }
    }, {
        key: 'serviceLog',
        value: function serviceLog(message) {
            var logger = this.createLogger('service');
            logger(message);
        }
    }, {
        key: 'logFormat',
        value: function logFormat(message) {
            var log = '';
            for (var key in message) {
                var value = _typeof(message[key]) === 'object' ? JSON.stringify(message[key]) : message[key];
                log += key + '|' + value + '|';
            }
            log = log.replace(/\|$/, '');
            return log;
        }
    }]);

    return Logger;
}();

exports.default = Logger;