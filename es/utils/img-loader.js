"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (url, ready, load, error) {
  var _onready = void 0;
  var newWidth = void 0;
  var newHeight = void 0;
  var img = new Image();

  img.src = url;

  // 如果图片被缓存，则直接返回缓存数据
  if (img.complete) {
    ready(img);
    load && load(img);
    return;
  }

  var width = img.width;
  var height = img.height;

  // 加载错误后的事件
  img.onerror = function () {
    error && error(img);
    _onready.end = true;
    img = img.onload = img.onerror = null;
  };

  // 图片尺寸就绪
  _onready = function onready() {
    newWidth = img.width;
    newHeight = img.height;
    // 如果图片已经在其他地方加载可使用面积检测
    if (newWidth !== width || newHeight !== height || newWidth * newHeight > 1024) {
      ready(img);
      _onready.end = true;
    }
  };
  _onready();

  // 完全加载完毕的事件
  img.onload = function () {
    // onload在定时器时间差范围内可能比onready快
    // 这里进行检查并保证onready优先执行
    !_onready.end && _onready();

    load && load(img);

    // IE gif动画会循环执行onload，置空onload即可
    img = img.onload = img.onerror = null;
  };

  // 加入队列中定期执行
  if (!_onready.end) {
    list.push(_onready);
    // 无论何时只允许出现一个定时器，减少浏览器性能损耗
    if (intervalId === null) intervalId = setInterval(tick, 40);
  }
};

var list = [];
var intervalId = null;

// 停止所有定时器队列
var stop = function stop() {
  clearInterval(intervalId);
  intervalId = null;
};

// 用来执行队列
var tick = function tick() {
  var i = 0;
  for (; i < list.length; i++) {
    list[i].end ? list.splice(i--, 1) : list[i]();
  }
  !list.length && stop();
};

module.exports = exports["default"];