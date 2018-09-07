'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenvSafe = require('dotenv-safe');

var _dotenvSafe2 = _interopRequireDefault(_dotenvSafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SSL_KEY = process.env.SSL_KEY;
var SSL_CERT = process.env.SSL_CERT;
var SSL_CA = process.env.SSL_CA;

if (process.env.NODE_ENV !== 'production') {
    _dotenvSafe2.default.load({
        path: _path2.default.join(__dirname, '../../.env.dev'),
        sample: _path2.default.join(__dirname, '../../.env.example'),
        allowEmptyValues: true
    });
}

process.env.SSL_KEY = process.env.SSL_KEY && process.env.SSL_KEY !== '' ? process.env.SSL_KEY : SSL_KEY;
process.env.SSL_CERT = process.env.SSL_CERT && process.env.SSL_CERT !== '' ? process.env.SSL_CERT : SSL_CERT;
process.env.SSL_CA = process.env.SSL_CA && process.env.SSL_CA !== '' ? process.env.SSL_CA : SSL_CA;