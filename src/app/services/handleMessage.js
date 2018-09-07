'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('../utils/class/service');

var _constants = require('../utils/constants');

var _functions = require('../utils/functions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var handleMessage = exports.handleMessage = function (_Service) {
    _inherits(handleMessage, _Service);

     function handleMessage(intent) {
         _classCallCheck(this, handleMessage);

        var _this = _possibleConstructorReturn(this, (handleMessage.__proto__ || Object.getPrototypeOf(handleMessage)).call(this, _constants.ENV.BASE_API_MYAIS));

        _this.intent('display');
        _this.method('message');
        _this.channel('Google_Assistant');
        _this.term(intent);
        console.info("This term "+intent);
        _this.setBody({ 
            userId: '11111111111',
        });
        return _this;
    }
    _createClass(handleMessage, [{
        key: 'request',
        value: function request() {
            return this.http.post('/chatbot');
        }
    }]);

    return handleMessage;
}(_service.Service);