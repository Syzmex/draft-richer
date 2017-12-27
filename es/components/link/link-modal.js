'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style5 = require('antd/lib/modal/style');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _style6 = require('antd/lib/input/style');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _style7 = require('antd/lib/select/style');

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _style8 = require('antd/lib/form/style');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _form2.default.Item;
var Option = _select2.default.Option;

function LinkModal(props) {

  function handleOk() {
    props.form.validateFields(function (errors, values) {
      if (!errors) {
        props.onOk(values);
      }
    });
  }

  var getFieldDecorator = props.form.getFieldDecorator;


  var formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  var selectBefore = getFieldDecorator('http', {
    initialValue: 'http://'
  })(_react2.default.createElement(
    _select2.default,
    { style: { width: 80 } },
    _react2.default.createElement(
      Option,
      { value: 'http://' },
      'http://'
    ),
    _react2.default.createElement(
      Option,
      { value: 'https://' },
      'https://'
    ),
    _react2.default.createElement(
      Option,
      { value: 'ftp://' },
      'ftp://'
    ),
    _react2.default.createElement(
      Option,
      { value: '<other>' },
      'other'
    )
  ));

  return _react2.default.createElement(
    _modal2.default,
    {
      visible: true,
      title: '\u94FE\u63A5',
      onOk: handleOk,
      onCancel: props.onCancel },
    _react2.default.createElement(
      _form2.default,
      { horizontal: true, style: { marginTop: '1.5em' } },
      _react2.default.createElement(
        FormItem,
        _extends({}, formItemLayout, {
          label: '\u94FE\u63A5\u5730\u5740' }),
        getFieldDecorator('url', {
          rules: [{ required: true, whitespace: true, message: '此项必填' }]
        })(_react2.default.createElement(_input2.default, {
          spellCheck: false,
          autoComplete: 'off',
          addonBefore: selectBefore }))
      ),
      _react2.default.createElement(
        FormItem,
        _extends({}, formItemLayout, {
          label: 'Target' }),
        getFieldDecorator('target', {
          initialValue: '_blank'
        })(_react2.default.createElement(
          _select2.default,
          null,
          _react2.default.createElement(
            Option,
            { value: '_blank' },
            '_blank'
          ),
          _react2.default.createElement(
            Option,
            { value: '_top' },
            '_top'
          ),
          _react2.default.createElement(
            Option,
            { value: '_self' },
            '_self'
          ),
          _react2.default.createElement(
            Option,
            { value: '_parent' },
            '_parent'
          )
        ))
      )
    )
  );
}

exports.default = _form2.default.create()(LinkModal);
module.exports = exports['default'];