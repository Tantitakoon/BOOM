'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var extractSession = exports.extractSession = function extractSession(req, res, next) {
    if (req.body.session) {
        req.body._session = req.body.session.split('/').reverse()[0];
    }
    next();
};