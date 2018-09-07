'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var BUSINESS_TYPE = exports.BUSINESS_TYPE = {
    PREPAID: 'Pre-paid',
    POSTPAID: 'Post-paid'
};

var NETWORK_TYPE = exports.NETWORK_TYPE = {
    '3PE': {
        TYPE: '3PE',
        BUSINESS_TYPE: BUSINESS_TYPE.PREPAID
    },
    '3PO': {
        TYPE: '3PO',
        BUSINESS_TYPE: BUSINESS_TYPE.POSTPAID
    }
};