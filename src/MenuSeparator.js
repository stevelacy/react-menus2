"use strict";
var React = require("react"),
  assign = require("object-assign"),
  emptyFn = function emptyFn() {};
var createClass = require('create-react-class');
var MenuSeparator = createClass({
    displayName: "ReactMenuSeparator",
    getDefaultProps: function getDefaultProps() {
      return { size: 1 };
    },
    render: function render() {
      var a = this.prepareProps(this.props);
      return React.createElement(
        "tr",
        a,
        React.createElement("td", { colSpan: 10, style: { padding: 0 } })
      );
    },
    prepareProps: function prepareProps(a) {
      var b = {};
      return (
        assign(b, a),
        (b.style = this.prepareStyle(b)),
        (b.className = this.prepareClassName(b)),
        b
      );
    },
    prepareClassName: function prepareClassName(a) {
      var b = a.className || "";
      return (b += " menu-separator"), b;
    },
    prepareStyle: function prepareStyle(a) {
      var b = {};
      return (
        assign(
          b,
          MenuSeparator.style,
          MenuSeparator.style,
          { height: MenuSeparator.size || a.size },
          a.style
        ),
        b
      );
    }
  });
(MenuSeparator.style = { cursor: "auto", background: "gray" }),
  (MenuSeparator.style = {}),
  (module.exports = MenuSeparator);
