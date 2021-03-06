"use strict";
var Region = require("region-align"),
  selectParent = require("select-parent");
module.exports = function(a) {
  var b = Region.from(selectParent(".z-menu", a)),
    c = Region.from(a);
  return {
    // pageX : thisRegion.left,
    // pageY : thisRegion.top,
    left: c.left - b.left,
    top: c.top - b.top,
    width: c.width,
    height: c.height
  };
};

