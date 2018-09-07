"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transaction = exports.Transaction = function () {
    function Transaction() {
        _classCallCheck(this, Transaction);

        this.setTransactionId = this.setTransactionId.bind(this);
        this.getTransactionId = this.getTransactionId.bind(this);
    }

    _createClass(Transaction, null, [{
        key: "setTransactionId",
        value: function setTransactionId(id) {
            this.transactionId = id;
        }
    }, {
        key: "getTransactionId",
        value: function getTransactionId() {
            return this.transactionId;
        }
    }]);

    return Transaction;
}();