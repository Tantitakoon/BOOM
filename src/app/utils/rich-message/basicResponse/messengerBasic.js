'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessengerBasic = undefined;
var MessengerBasic = exports.MessengerBasic = function MessengerBasic(text,sender_psid,responsePayload) {
    console.log("===========MessengerBasic===========");
        var response = {}; 
        if(responsePayload &&responsePayload.length > 0 ) {
            response = {
                "text": text , 
                quick_replies: responsePayload
            };
            } else {
            response = {
            "text":text            
            };
        }

       let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
        };
   
    return request_body;    
    
};
