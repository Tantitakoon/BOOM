"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var randomResponse = exports.randomResponse = function randomResponse(array) {
    return array[Math.floor(Math.random() * array.length)];
};