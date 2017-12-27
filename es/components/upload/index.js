'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pictureControls = require('./picture-controls');

var _pictureControls2 = _interopRequireDefault(_pictureControls);

var _attachmentControls = require('./attachment-controls');

var _attachmentControls2 = _interopRequireDefault(_attachmentControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  PictureControls: _pictureControls2.default,
  AttachmentControls: _attachmentControls2.default
};
module.exports = exports['default'];