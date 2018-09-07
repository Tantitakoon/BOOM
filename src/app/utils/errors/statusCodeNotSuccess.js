'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var StatusCodeNotSuccess = exports.StatusCodeNotSuccess = function StatusCodeNotSuccess(msg) {
    return {
        message: msg,
        errorType: 'StatusCodeNotSuccess',
        statusCode: 50000
    };
};