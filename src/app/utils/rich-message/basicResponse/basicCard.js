'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BasicCard = undefined;
var BasicCard = exports.BasicCard = function BasicCard(sender_Psid,objText,objUrl) {
    console.log('<<<<<<<<<<<Basic Card>>>>>>>>>>>')
    var payload={
        "recipient":{
            "id":sender_Psid
          },
          "message":{
            "attachment":{
              "type":"template",
              "payload":{
                "template_type":"button",
                "text":objText,
                "buttons":[
                  {
                    "type":"web_url",
                    "url":objUrl,
                    "title":"คลิกที่นี่"
                  }]
                  
                }
            }
        }
        };

    return payload;
};