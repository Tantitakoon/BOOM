'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkMobileNo = undefined;

var _services = require('../services');

var _constants = require('../utils/constants');

var checkMobileNo = exports.checkMobileNo = function checkMobileNo(conv, params, value, next) {
    var session = conv.body._session;
    // query session from database
    var mobileNo = conv.user.storage.mobileNo;
    var verifyOtp = conv.user.storage.verifyOtp;

    if (mobileNo && verifyOtp) {
        return new _services.MobileNoService().verifyMobileNo(mobileNo).then(function (res) {
            if (res.data.status) {
                next();
            } else {
                conv.ask('');
            }
        });
    } else {
        conv.contexts.set('request_latest', 2, { name: conv.intent });
        conv.contexts.set('enter_mobile_no', 1);
        conv.ask(_constants.INTENT.ENTER_MOBILE_NO);
    }
};