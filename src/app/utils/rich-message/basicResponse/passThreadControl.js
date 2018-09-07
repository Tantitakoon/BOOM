'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PassThreadControl = undefined;
var PassThreadControl = exports.PassThreadControl = function PassThreadControl(sender_Psid, targetAppId) {
    console.log('PASSING THREAD CONTROL')
    let payload = {
        recipient: {
        id: sender_Psid
        },
        target_app_id: targetAppId
        

    };

    return payload;
};