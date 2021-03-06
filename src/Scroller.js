"use strict";
var React = require("react"),
  assign = require("object-assign"),
  getArrowStyle = require("arrow-style");
var createClass = require('create-react-class');
function emptyFn() {}
var SCROLLER_STYLE = {
  left: 0,
  right: 0,
  position: "absolute",
  cursor: "pointer",
  zIndex: 1
};
function generateArrowStyle(a, b, c) {
  var d = assign({}, c),
    e = { color: d.color || a.arrowColor },
    f = 4,
    g = d.width || a.arrowWidth || a.arrowSize || a.style.height - f,
    h = d.height || a.arrowHeight || a.arrowSize || a.style.height - f;
  return (
    (e.width = g),
    (e.height = h),
    assign(d, getArrowStyle("top" == a.side ? "up" : "down", e)),
    (d.display = "inline-block"),
    (d.position = "absolute"),
    (d.left = "50%"),
    (d.marginLeft = -g),
    (d.top = "50%"),
    (d.marginTop = -h / 2),
    b.active && (d.marginTop += "top" == a.side ? -1 : 1),
    d
  );
}
var Scroller = createClass({
  displayName: "Scroller",
  display: "ReactMenuScroller",
  getInitialState: function getInitialState() {
    return {};
  },
  getDefaultProps: function getDefaultProps() {
    return {
      height: 10,
      style: { background: "white" },
      defaultOverStyle: {},
      overStyle: {},
      defaultTopStyle: { borderBottom: "1px solid gray" },
      topStyle: {},
      defaultBottomStyle: { borderTop: "1px solid gray" },
      bottomStyle: {},
      arrowColor: "gray",
      arrowStyle: {},
      defaultArrowStyle: {},
      defaultArrowOverStyle: { color: "rgb(74, 74, 74)" },
      arrowOverStyle: {}
    };
  },
  handleMouseEnter: function handleMouseEnter() {
    this.setState({ mouseOver: !0 });
  },
  handleMouseLeave: function handleMouseLeave() {
    this.setState({ mouseOver: !1 });
  },
  handleMouseDown: function handleMouseDown(a) {
    this.setState({ active: !0 }), (this.props.onMouseDown || emptyFn)(a);
  },
  handleMouseUp: function handleMouseUp(a) {
    this.setState({ active: !1 }), (this.props.onMouseUp || emptyFn)(a);
  },
  render: function render() {
    var a = assign({}, this.props, {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp
      }),
      b = this.state,
      c = a.side;
    (a.className = this.prepareClassName(a, b)),
      (a.style = this.prepareStyle(a, b));
    var d = this.prepareArrowStyle(a, b);
    return a.factory
      ? a.factory(a, c)
      : React.createElement("div", a, React.createElement("div", { style: d }));
  },
  prepareStyle: function prepareStyle(a, b) {
    var c, d;
    b.mouseOver && ((d = a.overStyle), (c = a.defaultOverStyle));
    var e = "top" == a.side ? a.defaultTopStyle : a.defaultBottomStyle,
      f = "top" == a.side ? a.topStyle : a.bottomStyle,
      g = assign({}, SCROLLER_STYLE, a.style, e, c, a.style, f, d);
    return (
      (g.height = g.height || a.height),
      (g[a.side] = 0),
      a.visible || (g.display = "none"),
      g
    );
  },
  prepareClassName: function prepareClassName(a) {
    //className
    var b = a.className || "";
    return (
      (b += " z-menu-scroller " + a.side),
      a.active && a.visible && (b += " active"),
      b
    );
  },
  prepareArrowStyle: function prepareArrowStyle(a, b) {
    var c, d;
    b.mouseOver && ((c = a.defaultArrowOverStyle), (d = a.arrowOverStyle));
    var e = assign({}, a.defaultArrowStyle, c, a.arrowStyle, d);
    return generateArrowStyle(a, b, e);
  },
  handleClick: function handleClick(a) {
    a.stopPropagation;
  }
});
module.exports = Scroller;

