'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var BusinessTypeNotFound = exports.BusinessTypeNotFound = function BusinessTypeNotFound(msg) {
    return {
        message: msg,
        errorType: 'BusinessTypeNotFound',
        statusCode: 40440
    };
};