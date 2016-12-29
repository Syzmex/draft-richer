'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style5 = require('antd/lib/modal/style');

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _style6 = require('antd/lib/input/style');

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _style7 = require('antd/lib/select/style');

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _style8 = require('antd/lib/form/style');

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _form2.default.Item,
    Option = _select2.default.Option;

function LinkModal(props) {

  function handleOk() {
    props.form.validateFields(function (errors, values) {
      if (!errors) {
        props.onOk(values);
      }
    });
  }

  var getFieldDecorator = props.form.getFieldDecorator,
      formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  },
      selectBefore = getFieldDecorator('http', {
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
      title: '链接',
      onOk: handleOk,
      onCancel: props.onCancel },
    _react2.default.createElement(
      _form2.default,
      { horizontal: true, style: { marginTop: '1.5em' } },
      _react2.default.createElement(
        FormItem,
        (0, _extends3.default)({}, formItemLayout, {
          label: '链接地址' }),
        getFieldDecorator('url', {
          rules: [{ required: true, whitespace: true, message: '此项必填' }]
        })(_react2.default.createElement(_input2.default, {
          spellCheck: false,
          autoComplete: 'off',
          addonBefore: selectBefore }))
      ),
      _react2.default.createElement(
        FormItem,
        (0, _extends3.default)({}, formItemLayout, {
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