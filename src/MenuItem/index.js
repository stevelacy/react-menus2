"use strict";
var _reactDom = require("react-dom"),
  React = require("react"),
  assign = require("object-assign"),
  normalize = require("react-style-normalizer"),
  EVENT_NAMES = require("react-event-names"),
  getMenuOffset = require("../getMenuOffset"),
  prepareChildren = require("./prepareChildren"),
  Menu = require("../Menu"),
  MenuItemCell = require("../MenuItemCell"),
  emptyFn = function emptyFn() {};
var createClass = require('create-react-class');
function toUpperFirst(a) {
  return a ? a.charAt(0).toUpperCase() + a.substring(1) : "";
}
var MenuItem = createClass({
  displayName: "ReactMenuItem",
  getInitialState: function getInitialState() {
    return {};
  },
  getDefaultProps: function getDefaultProps() {
    return {
      isMenuItem: !0,
      interactionStyles: !0,
      style: {
        cursor: "pointer",
        userSelect: "none",
        boxSizing: "border-box"
      },
      expander: "\u203A"
    };
  },
  render: function render() {
    var a = this.prepareProps(this.props, this.state);
    return React.createElement("tr", a);
  },
  componentDidMount: function componentDidMount() {
    this.didMount = !0;
  },
  prepareProps: function prepareProps(a, b) {
    var c = {};
    return (
      assign(c, a),
      (c.theme = this.prepareTheme(c)),
      (c.mouseOver = !!b.mouseOver),
      (c.active = !!b.active),
      (c.disabled = !!c.disabled),
      (c.style = this.prepareStyle(c)),
      (c.className = this.prepareClassName(c)),
      (c.children = this.prepareChildren(c)),
      (c.onClick = this.handleClick.bind(this, c)),
      (c.onMouseEnter = this.handleMouseEnter.bind(this, c)),
      (c.onMouseLeave = this.handleMouseLeave.bind(this, c)),
      (c.onMouseDown = this.handleMouseDown),
      (c.onMouseMove = this.handleMouseMove),
      c
    );
  },
  prepareTheme: function prepareTheme(a) {
    var b = (a.themes = a.themes || this.constructor.theme || THEME),
      c = a.theme;
    return "string" == typeof c && (c = b[c]), c || b.default;
  },
  handleClick: function handleClick(a, b) {
    if (a.disabled) return void b.stopPropagation();
    (this.props.onClick || this.props.fn || emptyFn)(b, a, a.index);
  },
  handleMouseMove: function handleMouseMove() {},
  handleMouseDown: function handleMouseDown() {
    var a = function() {
      this.setState({ active: !1 }), window.removeEventListener("mouseup", a);
    }.bind(this);
    window.addEventListener("mouseup", a), this.setState({ active: !0 });
  },
  showMenu: function showMenu(a, b) {
    b.showMenu(a, offset);
  },
  handleMouseEnter: function handleMouseEnter(a, b) {
    if (!a.disabled) {
      var c = { x: b.pageX, y: b.pageY };
      if ((this.setState({ mouseOver: !0 }), a.onMenuItemMouseOver)) {
        var d;
        a.menu && (d = getMenuOffset((0, _reactDom.findDOMNode)(this))),
          a.onMenuItemMouseOver(a, d, c);
      }
    }
  },
  handleMouseLeave: function handleMouseLeave(a, b) {
    if (!a.disabled) {
      var c = { x: b.pageX, y: b.pageY };
      this.didMount && this.setState({ active: !1, mouseOver: !1 }),
        a.onMenuItemMouseOut && a.onMenuItemMouseOut(a, c);
    }
  },
  prepareChildren: prepareChildren,
  prepareClassName: function prepareClassName(a) {
    var b = a.className || "";
    return (
      (b += " menu-row"),
      a.disabled
        ? (b += " disabled " + (a.disabledClassName || ""))
        : (a.mouseOver && (b += " over " + (a.overClassName || "")),
          a.active && (b += " active " + (a.activeClassName || "")),
          a.expanded && (b += " expanded " + (a.expandedClassName || ""))),
      b
    );
  },
  prepareDefaultStyle: function prepareDefaultStyle(a) {
    var b = assign({}, a.style);
    return a.disabled && assign(b, a.defaultDisabledStyle), b;
  },
  prepareComputedStyleNames: function prepareComputedStyleNames(a) {
    var b = ["style"];
    if (a.disabled) return b.push("disabledStyle"), b;
    a.expanded && b.push("expandedStyle"); //names is something like ['style','expandedStyle']
    //
    //now we add over and active styles
    var c;
    a.mouseOver &&
      (c = b.map(function(e) {
        return "over" + toUpperFirst(e);
      }));
    var d;
    return (
      a.active &&
        (d = b.map(function(e) {
          return "active" + toUpperFirst(e);
        })),
      c && b.push.apply(b, c),
      d && b.push.apply(b, d),
      b
    );
  },
  prepareStyle: function prepareStyle(a) {
    var b = assign({}, this.prepareDefaultStyle(a)),
      c = this.prepareComputedStyleNames(a),
      d = a.theme,
      e = a.themes;
    return (
      d &&
        (a.applyDefaultTheme &&
          d != e.default &&
          e.default &&
          c.forEach(function(f) {
            assign(b, e.default[f]);
          }),
        c.forEach(function(f) {
          assign(b, d[f]);
        })),
      (a.onThemeStyleReady || emptyFn)(b, a),
      c.forEach(function(f) {
        assign(b, a[f]);
      }),
      (a.onStyleReady || emptyFn)(b, a),
      normalize(b)
    ); // assign(style, props.defaultStyle, props.style)
    // if (props.disabled){
    //     assign(style, props.defaultDisabledStyle, props.disabledStyle)
    // } else {
    //     if (props.interactionStyles){
    //         if (props.expanded){
    //             assign(style, props.defaultExpandedStyle, props.expandedStyle)
    //         }
    //         if (props.mouseOver){
    //             assign(style, props.defaultOverStyle, props.overStyle)
    //         }
    //         if (props.active){
    //             assign(style, props.defaultActiveStyle, props.activeStyle)
    //         }
    //     }
    // }
    // return normalize(style)
  }
});
module.exports = MenuItem;
