'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require('../app/utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OAuth = function () {
    function OAuth() {
        _classCallCheck(this, OAuth);

        this.app = _express2.default.Router();
        this.app.get('/', this.redirectToAIS);
        this.app.get('/:aog', this.redirectToAog);
    }

    _createClass(OAuth, [{
        key: 'redirectToAog',
        value: function redirectToAog(req, res) {
            var url = 'https://oauth-redirect.googleusercontent.com/r/fail#access_token=fail&token_type=bearer&state=fail';
            if (req.query.ol5 && req.params.aog) {
                try {
                    var aog = _jsonwebtoken2.default.verify(decodeURIComponent(req.params.aog), _constants.ENV.JWT_SECRET);
                    var ol5 = _jsonwebtoken2.default.verify(req.query.ol5, _constants.ENV.JWT_OL5_SECRET);
                    var state = aog.state;
                    var project = aog.client_id;
                    var token = encodeURIComponent(ol5.privateId);
                    url = 'https://oauth-redirect.googleusercontent.com/r/' + project + '#access_token=' + token + '&token_type=bearer&state=' + state;
                } catch (err) {}
            }
            res.redirect(url);
        }
    }, {
        key: 'redirectToAIS',
        value: function redirectToAIS(req, res) {
            var aog = _jsonwebtoken2.default.sign(req.query, _constants.ENV.JWT_SECRET);
            res.render('oauth.html', { base_linking: _constants.ENV.BASE_URL_LINKING, aog: aog });
        }
    }]);

    return OAuth;
}();

exports.default = OAuth;