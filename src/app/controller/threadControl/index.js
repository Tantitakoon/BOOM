'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.threadControl = undefined;


var _services = require('../../services');

var _constants = require('../../utils/constants');


var _richMessages = require('../../utils/rich-message');

var Rich = _interopRequireWildcard(_richMessages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var postThreadControl =  function postThreadControl(req, res) {
    console.log("postThread");
    let body =req.body; 
   
  // let body = req;
   //console.log(body);
   if (body.recipientId !== undefined && (body.term  === 'exit' || body.term === 'end' ) &&  body.method  === 'forback') {
        this.rich["TakeThreadControl"] = Rich["TakeThreadControl"](body.recipientId);
        let serviceResponse =  new _services.responseMessenger();
        serviceResponse.callSendAPI('/take_thread_control', this.rich.TakeThreadControl, () => {});
        
         console.log('WEBHOOK_BACK_TO_PRIME');
         res.status(200).send(JSON.stringify('{STATUS:OK,MESSAGE:WEBHOOK_BACK_TO_PRIME}'));
    } else if(body.recipientId !== undefined && body.term  !== undefined && body.method  === 'messages') {
         let response;
         var text = '';  
         this.rich["MessengerBasic"] = Rich["MessengerBasic"](body.term);
         let serviceResponse =  new _services.responseMessenger();
         serviceResponse.callSendAPI('//messages', this.rich.MessengerBasic, () => {});
           
            res.status(200).send(JSON.stringify('{STATUS:OK,MESSAGE:WEBHOOK_SEND_TO_MESSAGE}'));
    } else {
      
        res.sendStatus(403);
    }
      
   
};

var threadControl = exports.threadControl =  function threadControl(app) {
    console.log("threadControl");
   this.app = app; 
   this.rich = {
    MessengerBasic:null,
    PassThreadControl:null,
    TakeThreadControl:null
   };
   var _postThreadControl = postThreadControl.bind(this);
   this.app.post('/ThreadControl',_postThreadControl);  

};