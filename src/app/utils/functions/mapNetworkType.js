'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapNetworkType = undefined;

var _constants = require('../constants');

var mapNetworkType = exports.mapNetworkType = function mapNetworkType(type) {
    return _constants.NETWORK_TYPE[type.networkType];
};