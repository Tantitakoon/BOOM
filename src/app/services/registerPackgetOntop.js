'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RegisterPackgetOntop = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('../utils/class/service');

var _constants = require('../utils/constants');

var _functions = require('../utils/functions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegisterPackgetOntop = exports.RegisterPackgetOntop = function (_Service) {
    _inherits(RegisterPackgetOntop, _Service);

    function RegisterPackgetOntop(props) {
        _classCallCheck(this, RegisterPackgetOntop);

        var _this = _possibleConstructorReturn(this, (RegisterPackgetOntop.__proto__ || Object.getPrototypeOf(RegisterPackgetOntop)).call(this, _constants.ENV.BASE_API_MYAIS));

        _this.intent('ontop');
        _this.method('register');
        _this.channel('Google_Assistant');
        _this.setBody({
            userId: (0, _functions.genTransaction)(props.msisdn),
            mobileNo: props.msisdn,
            id: props.id
        });
        return _this;
    }

    _createClass(RegisterPackgetOntop, [{
        key: 'request',
        value: function request() {
            return this.http.post('/chatbot');
        }
    }]);

    return RegisterPackgetOntop;
}(_service.Service);