"use strict";
var Region = require("region-align"),
  getConstrainRegion = require("./getConstrainRegion");
module.exports = function(a, b, c, d) {
  var e = getConstrainRegion.call(this, d);
  if (e)
    if ("function" == typeof a.alignSubMenu) a.alignSubMenu(b, c, e);
    else {
      var f = b.alignTo(c, ["tl-tr", "bl-br", "tr-tl", "br-bl"], {
        constrain: e
      });
      return "tl-tr" == f || "tr-tl" == f //align downwards
        ? 1 //align upwards
        : -1;
    }
};

