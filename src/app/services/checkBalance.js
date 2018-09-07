'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckBalance = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('../utils/class/service');

var _constants = require('../utils/constants');

var _functions = require('../utils/functions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBalance = exports.CheckBalance = function (_Service) {
    _inherits(CheckBalance, _Service);

    function CheckBalance(msisdn) {
        _classCallCheck(this, CheckBalance);

        var _this = _possibleConstructorReturn(this, (CheckBalance.__proto__ || Object.getPrototypeOf(CheckBalance)).call(this, _constants.ENV.BASE_API_MYAIS));

        _this.intent('check');
        _this.method('balance');
        _this.channel('Google_Assistant');
        _this.setBody({
            userId: (0, _functions.genTransaction)(msisdn),
            mobileNo: msisdn
        });
        return _this;
    }

    _createClass(CheckBalance, [{
        key: 'request',
        value: function request() {
            return this.http.post('/chatbot');
        }
    },{
        key: 'checkStatusBalance',
        value: async function checkStatusBalance(conv, params, value, next) {
            try {
                        console.info("Before send service");
                    // var mobileNo = conv._.storage.msisdn;
                        var mobileNo = '0932780014';
                        var resBalance = await new _services.CheckBalance(mobileNo).request();
                        console.info("After send service   "+resBalance['data']['statusCode']);
                        var dataBalance1 = resBalance.data;
                        
                        if (dataBalance1.statusCode === '20000') {
                            console.info("service status 200");
                            //conv._.dataBalance1 = dataBalance1;
                            this.data.dataBalance1 = dataBalance1; 
                            await next();
                        } else {
                         //   _logger2.logRoot(errors.StatusCodeNotSuccess('status code not success'));
                            throw new Error('status code not success');
                        }
            } catch (err) {
               // _logger2.logRoot(errors.ExceptError(err.message));
                //conv.ask(this.TEXT.SERVICE_ERROR);
            }
        }
    }, {
        key: 'res',
        value: function res(conv) {
            try {
                console.info("Befoe query");
                //var dataBalance = conv._.dataBalance1;
                var  dataBalance = this.data.dataBalance1
                console.info("After query type is : "+dataBalance.data.subtype);
                switch (dataBalance.data.subtype) {
                    case _constants.BUSINESS_TYPE.POSTPAID:
                        if (dataBalance.data.totalOutstandingBalance === 0) {
                            console.info("totalOutstandingBalance === 0");
                            //conv.ask(this.TEXT.NO_OUTSTANDING_BALANCE);
                        } else {
                            console.info("totalOutstandingBalance !== 0");
                           // conv.ask(this.TEXT.OUTSTANDING_BALANCE + ' ' + dataBalance.data.totalOutstandingBalance + ' ' + this.TEXT.BAHT);
                        }
                        break;
                    case _constants.BUSINESS_TYPE.PREPAID:
                        console.info("before PREPAID");
                        var tempText = this.TEXT.BALANCE_PRE_PAID + ' ' + dataBalance.data.remainingBalance + ' ' + this.TEXT.BAHT + ' ' + this.TEXT.VALID_UNTIL + ' ' + dataBalance.data.validityDate;
                        console.info(this.TEXT.BALANCE_PRE_PAID + ' ' + dataBalance.data.remainingBalance + ' ' + this.TEXT.BAHT + ' ' + this.TEXT.VALID_UNTIL + ' ' + dataBalance.data.validityDate);
                        //conv.ask("Process PREPAID");
                        //conv.ask(tempText);
                        //conv.ask(this.TEXT.BALANCE_PRE_PAID + ' ' + dataBalance.data.remainingBalance + ' ' + this.TEXT.BAHT + ' ' + this.TEXT.VALID_UNTIL + ' ' + dataBalance.data.validityDate);
                        console.info("after PREPAID");
                        break;
                    default:
                       // _logger2.logRoot(errors.BusinessTypeNotFound('business type not found'));
                        throw new Error('business type not found');
                }
                //conv.ask(this.rich.BalanceImage);
                //conv.ask(this.TEXT.AIS_PLAY_AGAIN);
            } catch (err) {
              //  _logger2.logRoot(errors.ExceptError(err.message));
                //conv.ask(this.TEXT.SERVICE_ERROR);
            }
        }
    }]);

    return CheckBalance;
}(_service.Service);