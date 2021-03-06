"use strict";
var React = require("react"),
  assign = require("object-assign"),
  renderCells = require("./MenuItem/renderCells"),
  MenuItem = require("./MenuItem"),
  MenuItemFactory = React.createFactory(MenuItem),
  MenuSeparator = require("./MenuSeparator");
module.exports = function(a, b, c, d) {
  var e = b.itemProps ? b.itemProps.index : -1;
  if ("-" === c) return React.createElement(MenuSeparator, { key: d });
  var f = [a.itemClassName, c.cls, c.className]
      .filter(function(i) {
        return !!i;
      })
      .join(" "),
    g = assign(
      {
        className: f,
        key: d,
        data: c,
        columns: a.columns,
        expanded: d === e,
        disabled: c.disabled,
        onClick: c.onClick || c.fn
      },
      a.itemStyleProps
    );
  if (((g.children = renderCells(g)), c.items)) {
    var Menu = require("./Menu");
    g.children.push(React.createElement(Menu, { items: c.items }));
  }
  return (a.itemFactory || MenuItemFactory)(g);
};

