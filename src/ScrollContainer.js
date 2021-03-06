"use strict";
var _reactDom = require("react-dom"),
  React = require("react"),
  assign = require("object-assign"),
  buffer = require("buffer-function"),
  Scroller = require("./Scroller");
var createClass = require('create-react-class');
function stop(a) {
  a.preventDefault(), a.stopPropagation();
}
module.exports = createClass({
  displayName: "ReactMenuScrollContainer",
  getInitialState: function getInitialState() {
    return { adjustScroll: !0, scrollPos: 0 };
  },
  getDefaultProps: function getDefaultProps() {
    return { scrollStep: 5, scrollSpeed: 50 };
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.enableScroll &&
      window.removeEventListener("resize", this.onResizeListener);
  },
  componentDidMount: function componentDidMount() {
    this.props.enableScroll &&
      setTimeout(
        function() {
          this.isMounted() &&
            (this.adjustScroll(),
            window.addEventListener(
              "resize",
              (this.onResizeListener = buffer(
                this.onWindowResize,
                this.props.onWindowResizeBuffer,
                this
              ))
            ));
        }.bind(this),
        0
      );
  },
  componentDidUpdate: function componentDidUpdate() {
    this.props.enableScroll && this.adjustScroll();
  },
  onWindowResize: function onWindowResize() {
    this.adjustScroll(), this.doScroll(0);
  },
  render: function render() {
    var a = this.props,
      b = a.children;
    if (!a.enableScroll) return b;
    var c = { position: "relative" };
    this.state.scrollPos && (c.top = -this.state.scrollPos);
    var d = { position: "relative", overflow: "hidden" };
    return (
      a.maxHeight && (d.maxHeight = a.maxHeight),
      React.createElement(
        "div",
        {
          onMouseEnter: a.onMouseEnter,
          onMouseLeave: a.onMouseLeave,
          className: "z-menu-scroll-container",
          style: d
        },
        React.createElement("div", { ref: "tableWrap", style: c }, b),
        this.renderScroller(a, -1),
        this.renderScroller(a, 1)
      )
    );
  },
  renderScroller: function renderScroller(a, b) {
    var c = -1 == b ? this.handleScrollTop : this.handleScrollBottom,
      d = -1 == b ? this.handleScrollTopMax : this.handleScrollBottomMax,
      e = -1 == b ? this.state.hasTopScroll : this.state.hasBottomScroll,
      f = assign({}, a.scrollerProps, {
        visible: e,
        side: -1 == b ? "top" : "bottom",
        onMouseDown: c,
        onDoubleClick: d
      });
    return React.createElement(Scroller, f);
  },
  adjustScroll: function adjustScroll() {
    if (this.props.enableScroll) {
      if (!this.state.adjustScroll) return void (this.state.adjustScroll = !0);
      var a = this.getAvailableHeight(),
        b = this.getCurrentTableHeight(),
        c = { adjustScroll: !1, hasTopScroll: !1, hasBottomScroll: !1 };
      b > a
        ? ((c.maxScrollPos = b - a),
          (c.hasTopScroll = 0 !== this.state.scrollPos),
          (c.hasBottomScroll = this.state.scrollPos != c.maxScrollPos))
        : ((c.maxScrollPos = 0), (c.scrollPos = 0)),
        this.setState(c);
    }
  },
  getAvailableHeight: function getAvailableHeight() {
    return this.getAvailableSizeDOM().clientHeight;
  },
  getAvailableSizeDOM: function getAvailableSizeDOM() {
    return (0, _reactDom.findDOMNode)(this);
  },
  getCurrentTableHeight: function getCurrentTableHeight() {
    return this.getCurrentSizeDOM().clientHeight;
  },
  getCurrentSizeDOM: function getCurrentSizeDOM() {
    return (0, _reactDom.findDOMNode)(this.refs.tableWrap);
  },
  handleScrollTop: function handleScrollTop(a) {
    a.preventDefault(), this.handleScroll(-1);
  },
  handleScrollBottom: function handleScrollBottom(a) {
    a.preventDefault(), this.handleScroll(1);
  },
  handleScrollTopMax: function handleScrollTopMax(a) {
    stop(a), this.handleScrollMax(-1);
  },
  handleScrollBottomMax: function handleScrollBottomMax(a) {
    stop(a), this.handleScrollMax(1);
  },
  handleScrollMax: function handleScrollMax(a) {
    var b = -1 == a ? 0 : this.state.maxScrollPos;
    this.setScrollPosition(b);
  },
  handleScroll: function handleScroll(a /*1 to bottom, -1 to up*/) {
    var b = function() {
      this.stopScroll(), window.removeEventListener("mouseup", b);
    }.bind(this);
    window.addEventListener("mouseup", b),
      (this.scrollInterval = setInterval(
        this.doScroll.bind(this, a),
        this.props.scrollSpeed
      ));
  },
  doScroll: function doScroll(a) {
    this.setState({ scrollDirection: a });
    var b = this.state.scrollPos + a * this.props.scrollStep;
    this.setScrollPosition(b);
  },
  setScrollPosition: function setScrollPosition(a) {
    a > this.state.maxScrollPos && (a = this.state.maxScrollPos),
      0 > a && (a = 0),
      this.setState({ scrollPos: a, scrolling: !0 });
  },
  stopScroll: function stopScroll() {
    clearInterval(this.scrollInterval), this.setState({ scrolling: !1 });
  }
});

