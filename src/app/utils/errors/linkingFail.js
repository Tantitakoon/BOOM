'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var LinkingFail = exports.LinkingFail = function LinkingFail(msg) {
    return {
        message: msg,
        errorType: 'LinkingFail',
        statusCode: 40100
    };
};