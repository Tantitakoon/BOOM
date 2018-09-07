'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TakeThreadControl = undefined;
var TakeThreadControl = exports.TakeThreadControl = function TakeThreadControl(sender_Psid) {
    console.log('TAKING THREAD CONTROL')
    let payload = {
        recipient: {
        id: sender_Psid
        }
    };

    return payload;

};