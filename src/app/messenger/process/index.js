'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.process = undefined;
var _services = require('../../services');

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../../utils/constants');


var _class = require('../../utils/class');

var _classIntent = require('../../utils/class/intent');

var _richMessages = require('../../utils/rich-message');

var Rich = _interopRequireWildcard(_richMessages);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var process = exports.process = function (_Intent) {
    _inherits(process, _Intent);

    function process(app) {

        _classCallCheck(this, process);
        console.log('process____________________--');



        return _possibleConstructorReturn(this, (process.__proto__ || Object.getPrototypeOf(process)).call(this,app,"++++check++++"));
    }

    function urlify(text) {
        var urlRegex = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?""''=]))?/g
        var urlFull = '';
        var obj={};
        var txt = text.replace(urlRegex, function(url) {
                urlFull = url;
                return   url;
        }).concat(' ').replace(/<[^>]+>/g, '')
        obj['txt'] = txt;
        obj['url'] = urlFull
        return obj;
   }

    _createClass(process, [{
        key: 'onInit',
        value: function onInit() {
           return this.use(this.res).end();
        }
    },  {
        key: 'res',
        value:async function res() {
            
             
            console.log('res start');
            var intent = this.data.received_message;

            let response = await new _services.handleMessage(intent).request();
            let responseData = response.data;
            let responseStatusCode = responseData['statusCode'];
             console.info(`Status Code ${responseStatusCode}`);
            if(responseStatusCode === '20000'){
                    let responseParams = responseData['params'];
                    let messageDataObj = responseData['data'];
                    let intentData  =responseParams['intent'];
                      console.info(`intent : ${responseParams['intent']}  and method : ${responseParams['method']}`);

             console.info(`intent : ${responseParams['intent']}  and method : ${responseParams['method']}`);
                    var intentTagData = responseParams['intentTag'];
                    if(intentTagData.toLocaleUpperCase().indexOf("CHECK")>-1){
                        intentData = 'check';
                    }
                    if(intent === 'Agent'){
                        intentData = 'transfer';
                    }
                    switch (intentData) {
                        case 'display':
                           this.replyDisplay(messageDataObj);
                           console.log('display : ');
                            break;
                        case 'ir':
                             console.info("in ir intent");
                             //conv.ask("Ir");
                             console.log('ir');
                             break;
                        case 'ontop':
                            console.info("in ontop intent");
                            let serviceOfferPackageOntop= new _services.OfferPackageOntop('');
                            await this.use(serviceOfferPackageOntop.res).end();
                            break;
                        case 'check':
                              var methodName = intentTagData.split('_').pop();
                              if(methodName.toLocaleUpperCase()==='BALANCE'||methodName.toLocaleUpperCase()==='BALANCEINTERNET'){
                                     var text = "อุ่นใจยังไม่ได้ให้บริการผ่านช่องทางนี้ครับ สามารถใช้ผ่านช่องทางอื่นได้ที่นี่ <a href=\"https://goo.gl/RT5cMp\" target=\"_blank\" data-vtz-browse=\"https://goo.gl/RT5cMp\" data-vtz-link-type=\"Web\">";
                                     var objText = urlify(text);
                                     this.rich["BasicCard"] = Rich["BasicCard"](this.data.sender_psid,objText['txt'],objText['url']);
                                     let serviceResponse =  new _services.responseMessenger(this.app);
                                     serviceResponse.callSendAPI('/messages', this.rich.BasicCard, () => {});
                                    }
                              else{
                                //text = replyDisplay(messageDataObj);
                                    responseReply = this.createSuggest(messageDataObj);
                                 //conv.ask(this.TEXT.SERVICE_ERROR);
                              }
                            break;
                        case 'authenticate':
                            break;
                        case 'transfer':
                              console.info("in transfer intent");
                              text = "transfer";
                              //this.rich["PassThreadControl"] = Rich["PassThreadControl"](this.data.sender_psid,_constants.ENV.APP_ID_2);
                              this.rich["TakeThreadControl"] = Rich["TakeThreadControl"](this.data.sender_psid);

                              let serviceResponse =  new _services.responseMessenger(this.app);
                              //await serviceResponse.callSendAPI('/pass_thread_control', this.rich.PassThreadControl, () => {});
                              await serviceResponse.callSendAPI('/permissions', this.rich.TakeThreadControl, () => {});
                              //passThreadControl(sender_psid,_constants.ENV.APP_ID_2);
                            break;
                        default:
                            console.info("in default switch case");
                            this.replyDisplay(messageDataObj);
                            break;
                    }
                }else{
                    //conv.ask("Error Something wrong");
                }


                console.info("Final line in res function");

        }
    },{
        key:'modifyMessage',
        value:function modifyMessage(messages){
            let results = {};
           for(var message of messages){
                if(message.indexOf("{{msgSelect:")>-1){
                    results['msgSelect']= message.substring(message.indexOf('{{msgSelect:') +
                                  12, message.indexOf('}}')).replace(/<[^>]+>/g, '');
                    console.info(results['msgSelect']);
                }else if(message.indexOf('{{msgMore:') > -1 ){
                            results['msgMore']  = message.substring(message.indexOf('{{msgMore:') +
                                          10, message.indexOf('}}')).replace(/<[^>]+>/g, '');
                            console.info(results['msgMore']);
                      }else{
                            results['message'] = message;
                           }
            }
            return results;
        }
    },{
        key:'createSuggest',
        value:function createSuggest(messageDataObj){
            let objReply;
            var msgSelects = [];
            for(var msgSelectObj of messageDataObj['msgParam']['msgSelect']){
               let payload ={};
               if(msgSelectObj['title']!==undefined){
                  payload = {
                              content_type: 'text',
                              title: msgSelectObj['title'],
                              payload: msgSelectObj['title']
                            }
                }
                else{
                      payload = {
                              content_type: 'text',
                              title: msgSelectObj['payload'],
                              payload: msgSelectObj['payload']
                            }

                }
               msgSelects.push(payload);

            }
               return msgSelects;
        }
    },{
        key:'replyDisplay',
        value:function replyDisplay(messageDataObj){
             let messageObj = this.modifyMessage(messageDataObj['message']);

             if(messageDataObj['msgParam'] !== undefined &&
                messageDataObj['msgParam']['msgSelect'] !== undefined &&
                messageObj['msgSelect']!==undefined){
                     console.log("=====================MsgSelect===============");
                     var msgSelects = this.createSuggest(messageDataObj);
                     this.rich["MessengerBasic"] = Rich["MessengerBasic"](messageObj['msgSelect'],this.data.sender_psid,msgSelects);
                     let serviceResponse =  new _services.responseMessenger(this.app);
                     serviceResponse.callSendAPI('/messages', this.rich.MessengerBasic, () => {});
         }else if(messageDataObj['msgParam'] !== undefined &&
                      messageDataObj['msgParam']['msgMore'] !== undefined &&
                      messageObj['msgMore']!==undefined){
                        console.log("=================msgMore===================");
                        this.rich["MessengerBasic"] = Rich["MessengerBasic"](messageObj['msgMore'],this.data.sender_psid);
                        let serviceResponse =  new _services.responseMessenger(this.app);
                        serviceResponse.callSendAPI('/messages', this.rich.MessengerBasic, () => {});
                        console.log(messageObj['msgMore']);

                 }
            else if(messageObj['message']!==undefined){
                console.log("=================message===================");
                        console.log("messageObj : "+messageObj['message']);
                        var objText = urlify(messageObj['message']);


                        console.log("url :"+objText['url']);
                        console.log("txt : "+objText['txt']);
                        if(objText['url']!=""){
                        this.rich["BasicCard"] = Rich["BasicCard"](this.data.sender_psid,objText['txt'],objText['url']);
                        let serviceResponse =  new _services.responseMessenger(this.app);
                        serviceResponse.callSendAPI('/messages',this.rich.BasicCard, () => {});
                        }
                        else{
                           
                           // this.rich["MessengerBasic"] = Rich["MessengerBasic"](objText['txt'],this.data.sender_psid);
                            //let serviceResponse =  new _services.responseMessenger(this.app);
                            //serviceResponse.callSendAPI('/messages',this.rich.MessengerBasic, () => {});
                            let response = {
                                "attachment":{
                                    "type":"template",
                                    "payload":{
                                    "template_type":"generic",
                                    "elements": [{
                                        "title":"I took Peter's 'Which Hat Are You?' Quiz",
                                        "image_url": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.iphone-droid.net%2Fwp-content%2Fuploads%2F2012%2F11%2Faunjai.jpg&imgrefurl=https%3A%2F%2Fwww.iphone-droid.net%2Fspecial-day-get-now-free-ais-aunjai-and-myappsmall%2F&docid=2qdfXfbo5WyXfM&tbnid=Efex9KjGBpgPXM%3A&vet=10ahUKEwjI3O2zhLLdAhUGp48KHZ5bB8wQMwg4KAAwAA..i&w=196&h=196&client=firefox-b-ab&bih=591&biw=1366&q=aunjai&ved=0ahUKEwjI3O2zhLLdAhUGp48KHZ5bB8wQMwg4KAAwAA&iact=mrc&uact=8",
                                        "subtitle": "My result: Fez",
                                        "default_action":{
                                        "type":"web_url",
                                        "url": "https://chatbotboom.herokuapp.com/a.html"
                                        },
                                        "buttons":[{
                                        "type":"web_url",
                                        "url":"https://chatbotboom.herokuapp.com/a.html",
                                        "title":"Take the Quiz"
                                        }]
                                    }]
                                    }
                                }
                                };


                                 let request_body = {
                                    "recipient": {
                                        "id": this.data.sender_psid
                                    },
                                    "message": response
                                    };

                                    let serviceResponse =  new _services.responseMessenger(this.app);
                                   serviceResponse.callSendAPI('/messages',request_body, () => {});
                                                        
                        }
                              
                }
            else{

                                // conv.ask(this.TEXT.SERVICE_ERROR);
                }
           // console.log("=======================Test=======================");



        }
    }]);

    return process;
}(_class.Intent);
