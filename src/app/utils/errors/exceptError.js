'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ExceptError = exports.ExceptError = function ExceptError(msg) {
    return {
        message: msg,
        errorType: 'ExceptError',
        statusCode: 50000
    };
};