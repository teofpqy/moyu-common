function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { PureComponent } from 'react'; // import classnames from 'classnames';

import './styles.less';

var Content =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Content, _PureComponent);

  function Content() {
    var _this;

    _classCallCheck(this, Content);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Content).apply(this, arguments));

    _this.contnteReplace = function (content) {
      var result = content;

      if (!content) {
        return '';
      } // 添加折叠


      var subtitle = new RegExp(/<h4 class="content-subtitle">([\s\S]*?)<\/h4>/g);
      result = result.replace(subtitle, function (val) {
        return "<h4 class=\"content-subtitle-mark\"></h4>".concat(val);
      });
      result += '<h4 class="content-subtitle-mark"></h4>';
      var h4Content = new RegExp(/<h4 class="content-subtitle">([\s\S]*?)<\/h4>([\s\S]*?)<h4 class="content-subtitle-mark">/g);
      result = result.replace(h4Content, function (val, m1, m2) {
        return "<h4 class=\"content-subtitle\" expand=false>".concat(m1, "</h4><div class=\"content-subcontent\">").concat(m2, "</div><h4 class=\"content-subtitle-mark\">");
      });
      var h5Content = new RegExp(/<h5 class="content-collapse-title">([\s\S]*?)<\/h5>([\s\S]*?)<h5 class="content-collapse-title-end">/g);
      result = result.replace(h5Content, function (val, m1, m2) {
        return "<h5 class=\"content-collapse-title\" expand=false>".concat(m1, "</h5><div class=\"content-h5-content\">").concat(m2, "</div><h5 class=\"content-collapse-title-end\">");
      }); // 隐藏table 里面的行

      result = result.replace(new RegExp('<td class="content-table-row-delete">1</td>', 'g'), '<td class="content-table-row-delete-hide">1</td>'); // 去除正文的空行（只有空行）

      result = result.replace(new RegExp('<p class="content-text">&nbsp;</p>', 'g'), '<p class="content-text"></p>');
      return result;
    }; // 点击折叠


    _this.clickExpand = function (e) {
      var target = e.target;
      var classList = ['content-subtitle', 'content-collapse-title'];

      if (!classList.includes(target.className)) {
        return;
      }

      var targetVal = target.getAttribute('expand') === 'false' ? 'true' : 'false';

      if (!target.parentNode) {
        target.setAttribute('expand', targetVal);
        return;
      } else {
        var brothers = target.parentNode.querySelectorAll(".".concat(target.className));
        brothers.forEach(function (item) {
          return item.setAttribute('expand', 'false');
        });
        target.setAttribute('expand', targetVal);
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    return _this;
  }

  _createClass(Content, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          _this$props$content = _this$props.content,
          content = _this$props$content === void 0 ? '' : _this$props$content;
      return React.createElement("div", {
        className: "".concat(className, " content"),
        onClick: this.clickExpand,
        dangerouslySetInnerHTML: {
          __html: this.contnteReplace(content)
        }
      });
    }
  }]);

  return Content;
}(PureComponent);

export default Content;