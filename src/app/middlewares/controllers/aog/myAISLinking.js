'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.myAISLinking = undefined;

var _actionsOnGoogle = require('actions-on-google');

var _services = require('../../services');

var _constants = require('../../utils/constants');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _logger = require('../../../config/logger');

var _logger2 = _interopRequireDefault(_logger);

var _errors = require('../../utils/errors');

var errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _logger2.default().app;

var _getPublicId = async function _getPublicId(conv, params, signin, next) {
    try {
        var accessToken = conv.user.raw.accessToken && decodeURIComponent(conv.user.raw.accessToken);
        console.info("before getpublicId");
        var resGetPublicId = await new _services.GetPublicId(accessToken, '12345').request();
        console.info("after getpublicId");
        var dataGetPublicId = resGetPublicId.data;
        if (dataGetPublicId.status && dataGetPublicId.statusCode === '20000') {
            conv.user.storage = { data: await _jsonwebtoken2.default.sign({ msisdn: dataGetPublicId.data.publicId }, _constants.ENV.JWT_DATA_STORAGE) };
            conv._.storage = { msisdn: dataGetPublicId.data.publicId };
            console.info("before await next");
            await next();
            console.info("after await next");
        } else {
            logger.logRoot(errors.StatusCodeNotSuccess('status code not success'));
            throw new Error('status code not success');
        }
    } catch (err) {
        logger.logRoot(errors.ExceptError(err.message));
        conv.ask(this.TEXT.SERVICE_ERROR);
    }
};

var myAISLinking = exports.myAISLinking = async function myAISLinking(conv, params, signin, next) {
    var getPublicId = _getPublicId.bind(this);
    console.info("in AisLinking");
    try {
        var accessToken = conv.user.raw.accessToken && decodeURIComponent(conv.user.raw.accessToken);
        var msisdn = undefined;

        try {
            console.info("Before call verify");
            var storage = await _jsonwebtoken2.default.verify(conv.user.storage.data, _constants.ENV.JWT_DATA_STORAGE);
            msisdn = storage.msisdn;
            console.info("after msisdn: "+msisdn);
            conv._.storage = { msisdn: msisdn };
        } catch (err) {
            console.info("Error line 69 myAISLinking ");
            console.info(errors.ExceptError(err.message));
        }

        if (signin && signin.status !== undefined) {
            console.info("signin && stauts !== undefined ");
            if (signin.status === 'OK') {
                console.info("signin status ok");
                return getPublicId(conv, params, signin, next);
            } else {
                logger.logRoot(errors.LinkingFail('linking fail'));
                conv.ask('Linking fail');
                conv.ask(this.TEXT.AIS_PLAY_AGAIN);
            }
        } else if (msisdn || accessToken) {
            if (msisdn === undefined || msisdn === '') {
                return getPublicId(conv, params, signin, next);
            }
            if (accessToken === undefined || accessToken === '') {
                return conv.ask(new _actionsOnGoogle.SignIn('my AIS Account Linking'));
            }
            if (msisdn && accessToken) {
                return await next();
            }
            return conv.ask(new _actionsOnGoogle.SignIn('my AIS Account Linking'));
        } else {
            conv.ask(new _actionsOnGoogle.SignIn('my AIS Account Linking'));
        }
    } catch (err) {
        logger.logRoot(errors.ExceptError(err.message));
        conv.ask(this.TEXT.SERVICE_ERROR);
    }
};