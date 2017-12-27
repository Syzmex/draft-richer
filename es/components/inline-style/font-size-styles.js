"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].reduce(function (styles, size) {
  styles[size] = { fontSize: size + "px" };
  return styles;
}, {});
module.exports = exports["default"];