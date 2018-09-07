'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var AISPlaySearchNotFound = exports.AISPlaySearchNotFound = function AISPlaySearchNotFound(msg) {
    return {
        message: msg,
        errorType: 'AISPlaySearchNotFound',
        statusCode: 40460
    };
};