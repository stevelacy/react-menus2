"use strict";
var _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source)
          Object.prototype.hasOwnProperty.call(source, key) &&
            (target[key] = source[key]);
      }
      return target;
    },
  React = require("react"),
  Menu = require("../Menu"),
  MenuItemCell = require("../MenuItemCell"),
  renderCell = require("./renderCell");
var _react = require("react");
module.exports = function(a) {
  var c,
    b = [];
  if (
    (React.Children.forEach(a.children, function(f) {
      if (f) {
        if (f.props && f.props.isMenu)
          return void (c = (0, _react.cloneElement)(f, {
            ref: "subMenu",
            subMenu: !0
          }));
        "string" != typeof f &&
          (f = (0, _react.cloneElement)(f, {
            style: a.cellStyle,
            itemIndex: a.itemIndex,
            itemCount: a.itemCount
          })),
          b.push(f);
      }
    }),
    c)
  ) {
    a.menu = c;
    var d = a.expander || !0,
      e = {};
    d && (e.onClick = a.onExpanderClick),
      b.push(React.createElement(MenuItemCell, _extends({ expander: d }, e)));
  }
  return b;
};

