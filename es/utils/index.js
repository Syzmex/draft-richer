'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimFrame = exports.cancelAnimFrame = exports.cancelAnimationFrame = exports.requestAnimationFrame = exports.browser = exports.getRaw = exports.createEditorState = exports.createArticleState = exports.isCS = exports.isES = exports.isContentState = exports.isEditorState = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _whatitis = require('whatitis');

var _whatitis2 = _interopRequireDefault(_whatitis);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _draftJs = require('draft-js');

var _decorator = require('../components/decorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 对象类型判断
var isEditorState = exports.isEditorState = _whatitis2.default.isItClass(_draftJs.EditorState);
var isContentState = exports.isContentState = _whatitis2.default.isItClass(_draftJs.ContentState);
var isES = exports.isES = isEditorState;
var isCS = exports.isCS = isContentState;

var createEditorStateFromContent = function createEditorStateFromContent(isArticle) {
  return function (content) {

    if (isES(content)) {
      return content;
    }

    (0, _invariant2.default)(_whatitis2.default.String(content) || _whatitis2.default.Number(content) || _whatitis2.default.PlainObject(content), 'Draft-Richer: Expecting content of createEditorState is a string or number or raw.');

    var contentState = void 0;

    if (_whatitis2.default.PlainObject(content)) {
      try {
        contentState = (0, _draftJs.convertFromRaw)(content);
      } catch (e) {
        // eslint-disable-next-line
        console.error('Draft-Richer: A error has occurred when convert data from Raw.\n', e);
      }
    } else {
      contentState = _draftJs.ContentState.createFromText('' + content);
    }

    return contentState ? _draftJs.EditorState.createWithContent(contentState, isArticle ? _decorator.articleDecorator : _decorator.editorDecorator) : _draftJs.EditorState.createEmpty(isArticle ? _decorator.articleDecorator : _decorator.editorDecorator);
  };
};

// 创建 editorState 浏览用
var createArticleState = exports.createArticleState = createEditorStateFromContent(true);

// 创建 editorState 编辑用
var createEditorState = exports.createEditorState = createEditorStateFromContent(false);

// 通过 editorState 获取 Raw
var getRaw = exports.getRaw = function getRaw(editorState) {
  (0, _invariant2.default)(isEditorState(editorState), 'Draft-Richer: Expecting editorState of getRaw is EditorState in instanceof check.');
  return (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
};

// 浏览器判断 for ssr and csr
var browser = exports.browser = function () {
  try {
    var userAgent = navigator.userAgent.toLowerCase();
    var makeArray = function makeArray(some) {
      return !Array.isArray(some) ? [some] : some;
    };
    var regexps = {
      ie: [/rv:([\d.]+)\) like gecko/, /msie ([\d.]+)/],
      firefox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    };
    return Object.entries(regexps).reduce(function (env, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          regexps = _ref2[1];

      makeArray(regexps).map(function (regexp) {
        return userAgent.match(regexp);
      }).filter(function (s) {
        return s;
      }).forEach(function (s) {
        env[key] = s[1];
      });
      return env;
    }, {});
  } catch (e) {
    return {};
  }
}();

// rAF-shim for ssr and csr
var requestAnimationFrame = exports.requestAnimationFrame = function () {
  try {
    var lastTime = 0;
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    return window.requestAnimationFrame;
  } catch (e) {
    return function () {
      return 0;
    };
  }
}();

var cancelAnimationFrame = exports.cancelAnimationFrame = function () {
  try {
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || function (id) {
      clearTimeout(id);
    };
    return window.cancelAnimationFrame;
  } catch (e) {
    return function () {};
  }
}();

var cancelAnimFrame = exports.cancelAnimFrame = function cancelAnimFrame(id) {

  (0, _invariant2.default)(_whatitis2.default.Number(id), 'Draft-Richer: Expecting id of cancelAnimFrame is a number.');

  return cancelAnimationFrame(id);
};

var requestAnimFrame = exports.requestAnimFrame = function requestAnimFrame(callback) {

  (0, _invariant2.default)(_whatitis2.default.Function(callback), 'Draft-Richer: Expecting callback of requestAnimFrame is a function.');

  var id = void 0;
  var cancel = function cancel() {
    return cancelAnimFrame(id);
  };
  id = requestAnimationFrame(function frameCallback(time) {
    // eslint-disable-line
    callback(time, cancel);
    id = requestAnimationFrame(frameCallback);
  });

  return { cancel: cancel };
};