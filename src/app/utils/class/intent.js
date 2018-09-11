'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Intent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

var _richMessages = require('../rich-message');

var Rich = _interopRequireWildcard(_richMessages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import {
//     CheckBalance,
//     CheckNetworkType,
//     CheckRemaining,
//     CheckMainPromotion,
//     GetPublicId,
//     CallAISPlay,
//     OfferPackageOntop,
//     RegisterPackgetOntop
// } from '../../services'

var Intent = exports.Intent = function () {
    function Intent(app,INTENT) {

        _classCallCheck(this, Intent);
         console.log("Intent_start");

        this.TEXT = null;
        this.data = null;
        this.app = app;
        this.conv = null;
        this.params = null;
        this.value = null;
        this.language = null;
        this.user_token = null ;

        this.rich = {
            MessengerBasic:null,
            PassThreadControl:null,
            TakeThreadControl:null

            };
        // this.service = {
        //     CheckBalance: null,
        //     CheckNetworkType: null,
        //     CheckRemaining: null,
        //     CheckMainPromotion: null,
        //     GetPublicId: null,
        //     CallAISPlay: null,
        //     OfferPackageOntop: null,
        //     RegisterPackgetOntop: null
        // }

        //console.log("constants :"+_constants.ENV.APP_ID);
        for (var richName in Rich) {
           this.rich[richName] = {};
         }
         this.callWebhook = this.callWebhook.bind(this);
         this._ = this._.bind(this);
         this.app.post('/webhook',this.callWebhook);
         this.app.get('/webhook',this.callGetWebhook);
    }

     _createClass(Intent, [{
        key: '_',
        value: function _(sender_psid,received_message) {
             console.log("this value :"+sender_psid+" received_message : "+received_message);
             this.data = {};

             this.data.sender_psid = sender_psid;
             this.data.received_message = received_message;
            //this.params = params;
            //this.value = value;
            //this.language = conv.body.queryResult.languageCode;
            //this.TEXT = (0, _constants.getTextLanguage)(this.language);
          //  this.conv.contexts.set('before_intent', 1, { name: this.INTENT });
            this.middlewareStack = [];
            // for (const serviceName in Service) {
            //     this.service[serviceName] = new Service[serviceName](conv._.storage.msisdn).request
            // }

            this.use = this.use.bind(this);
            this.next = this.next.bind(this);
            this.end = this.end.bind(this);
            return this.onInit(this.data);
        }
    },{
      key:'callGetWebhook',
      value: function callGetWebhook(req,res){
             console.log("getWebhook");
            const VERIFY_TOKEN = process.env.TOKEN;
            console.log(VERIFY_TOKEN);
            // Parse params from the webhook verification request
            let mode = req.query['hub.mode'];
            let token = req.query['hub.verify_token'];
            console.log("token : "+token);
            let challenge = req.query['hub.challenge'];

            // Check if a token and mode were sent
            if (mode && token) {

                // Check the mode and token sent are correct
                if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                    // Respond with 200 OK and challenge token from the request
                    console.log('WEBHOOK_VERIFIED');
                    res.status(200).send(challenge);

                } else {
                    // Responds with '403 Forbidden' if verify tokens do not match
                    res.sendStatus(403);
                }
            }


      }
    },{
      key:'callWebhook',
      value: function callWebhook(req,res){
       
       // Parse the request body from the POST
       let body = req.body;
       console.log(body);
       console.log('===============Webhook=================');

    // Check the webhook event is from a Page subscription
       if (body.object === 'page') {

        // parse messaging array
          const webhook_events = body.entry[0];

  // initialize quick reply properties
          let text, title, payload;

  // Secondary Receiver is in control - listen on standby channel
        if (webhook_events.standby) {
            console.log('webhook_events');
            // iterate webhook events from standby channel
                webhook_events.standby.forEach(event => {

                const psid = event.sender.id;
                const message = event.message;
                // Gets the body of the webhook event
                            console.log(webhook_events);
                            let webhook_event = message;
                            console.log(webhook_event);
                            console.log('Message: '+webhook_event.text);
                            // Get the sender PSID
                            let sender_psid = psid;
                            console.log(`Sender PSID: ${sender_psid}`);
                });
          }
          else{
          // Bot is in control - listen for messages
          if (webhook_events.messaging) {

            console.log('webhook_events.messaging');
            // iterate webhook events
            webhook_events.messaging.forEach(event => {
          
              // parse sender PSID and message
              const psid = event.sender.id;
              const message = event.message;
                    console.log('else');
                    body.entry.forEach(entry => {

                        // Gets the body of the webhook event
                        let webhook_event = entry.messaging[0];
                        console.log(webhook_event);

                        // Get the sender PSID
                        let sender_psid = webhook_event.sender.id;
                        console.log(`Sender PSID: ${sender_psid}`);
                    


/////////////////////////////////////////////////////////////////////////////
                        // Check if the event is a message or postback and
                        // pass the event to the appropriate handler function
                        if (webhook_event.message.text) { 
                            this._(sender_psid,webhook_event.message.text);
                        }else if(webhook_event.message.attachments){
                                   var messageAttachments = webhook_event.message.attachments
                                   var lat = null;
                                   var long = null;
                                    if(messageAttachments[0].payload.coordinates)
                                    {
                                        lat = messageAttachments[0].payload.coordinates.lat;
                                        long = messageAttachments[0].payload.coordinates.long;
                                    }
                                    console.log("attachments  :lat = "+lat+" long = "+long);

                        } else if (webhook_event.postback) {
                            handlePostback(sender_psid, webhook_event.postback);
                        }

                    });
            });
          }
        }

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

        } else {
            // Return a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }


      }
    }, {
        key: 'use',
        value: function use(fn) {


            this.middlewareStack.push(fn.bind(this));
            return { use: this.use, end: this.end };
        }
    }, {
        key: 'next',
        value: function next() {
            var nextFn = this.middlewareStack.pop();
            if (nextFn) {
                return nextFn(this.conv, this.params, this.value, this.next);
            }
        }
    }, {
        key: 'end',
        value: function end() {
            this.middlewareStack.reverse();
            return this.next();
        }
    }]);

    return Intent;
}();
