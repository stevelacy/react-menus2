"use strict";var _extends=Object.assign||function(g){for(var j,h=1;h<arguments.length;h++)for(var k in j=arguments[h],j)Object.prototype.hasOwnProperty.call(j,k)&&(g[k]=j[k]);return g},React=require("react"),Menu=require("../Menu"),MenuItemCell=require("../MenuItemCell"),renderCell=require("./renderCell"),_react=require("react");module.exports=function(g){var h,j=[];if(React.Children.forEach(g.children,function(m){if(m){if(m.props&&m.props.isMenu)return void(h=(0,_react.cloneElement)(m,{ref:"subMenu",subMenu:!0}));"string"!=typeof m&&(m=(0,_react.cloneElement)(m,{style:g.cellStyle,itemIndex:g.itemIndex,itemCount:g.itemCount})),j.push(m)}}),h){g.menu=h;var k=g.expander||!0,l={};k&&(l.onClick=g.onExpanderClick),j.push(React.createElement(MenuItemCell,_extends({expander:k},l)))}return j};