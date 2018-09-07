'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var httpStatus = require('http-status');

/**
 * @extends Error
 */

var ExtendableError = function (_Error) {
    _inherits(ExtendableError, _Error);

    function ExtendableError(_ref) {
        var message = _ref.message,
            errors = _ref.errors,
            status = _ref.status,
            isPublic = _ref.isPublic,
            stack = _ref.stack;

        _classCallCheck(this, ExtendableError);

        var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

        _this.name = _this.constructor.name;
        _this.message = message;
        _this.errors = errors;
        _this.status = status;
        _this.isPublic = isPublic;
        _this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        _this.stack = stack;
        // Error.captureStackTrace(this, this.constructor.name);
        return _this;
    }

    return ExtendableError;
}(Error);

/**
 * Class representing an API error.
 * @extends ExtendableError
 */


var APIError = function (_ExtendableError) {
    _inherits(APIError, _ExtendableError);

    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    function APIError(_ref2) {
        var message = _ref2.message,
            errors = _ref2.errors,
            stack = _ref2.stack,
            _ref2$status = _ref2.status,
            status = _ref2$status === undefined ? httpStatus.INTERNAL_SERVER_ERROR : _ref2$status,
            _ref2$isPublic = _ref2.isPublic,
            isPublic = _ref2$isPublic === undefined ? false : _ref2$isPublic;

        _classCallCheck(this, APIError);

        return _possibleConstructorReturn(this, (APIError.__proto__ || Object.getPrototypeOf(APIError)).call(this, {
            message: message,
            errors: errors,
            status: status,
            isPublic: isPublic,
            stack: stack
        }));
    }

    return APIError;
}(ExtendableError);

module.exports = APIError;