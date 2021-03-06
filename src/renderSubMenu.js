"use strict";
var Region = require("region-align"),
  assign = require("object-assign"),
  React = require("react"),
  cloneElement = React.cloneElement,
  getPositionStyle = require("./getSubMenuPositionStyle");
module.exports = function(a, b) {
  var c = b.menu;
  if (c && this.didMount) {
    var d = getPositionStyle.call(this, a, b);
    return (
      (c = cloneElement(
        c,
        assign(
          {
            ref: "subMenu",
            subMenu: !0,
            parentMenu: this,
            maxHeight: b.subMenuMaxHeight,
            onActivate: this.onSubMenuActivate,
            onInactivate: this.onSubMenuInactivate,
            scrollerProps: a.scrollerProps,
            constrainTo: a.constrainTo,
            expander: a.expander,
            theme: a.theme,
            themes: a.themes || this.constructor.themes
          },
          a.itemStyleProps
        )
      )),
      React.createElement(
        "div",
        {
          ref: "subMenuWrap",
          style: d,
          onMouseEnter: this.handleSubMenuMouseEnter,
          onMouseLeave: this.handleSubMenuMouseLeave
        },
        c
      )
    );
  }
};

