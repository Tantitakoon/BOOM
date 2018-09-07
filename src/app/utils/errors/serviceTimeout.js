'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ServiceTimeout = exports.ServiceTimeout = function ServiceTimeout(msg) {
    return {
        message: msg,
        errorType: 'ServiceTimeout',
        statusCode: 50400
    };
};