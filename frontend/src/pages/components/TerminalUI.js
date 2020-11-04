import React, { useState, useRef } from 'react';

/* 
// Modified by Alex Carter (iommu) from https://github.com/nitin42/terminal-in-react to remove scrolling effect
*/

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/**\n * Modfied version of [termynal.js](https://github.com/ines/termynal/blob/master/termynal.css).\n *\n * @author Ines Montani <ines@ines.io>\n * @version 0.0.1\n * @license MIT\n */\n .react-terminal-wrapper {\n  width: 100%;\n  background: #252a33;\n  color: #eee;\n  font-size: 18px;\n  font-family: 'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier, monospace;\n  border-radius: 4px;\n  padding: 75px 45px 35px;\n  position: relative;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n }\n\n.react-terminal {\n  height: 600px;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\n\n.react-terminal-wrapper.react-terminal-light {\n  background: #ddd;\n  color: #1a1e24;\n}\n\n.react-terminal-wrapper:before {\n  content: '';\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  /* A little hack to display the window buttons in one pseudo element. */\n  background: #d9515d;\n  -webkit-box-shadow: 25px 0 0 #f4c025, 50px 0 0 #3ec930;\n          box-shadow: 25px 0 0 #f4c025, 50px 0 0 #3ec930;\n}\n\n.react-terminal-wrapper:after {\n  content: attr(data-terminal-name);\n  position: absolute;\n  color: #a2a2a2;\n  top: 5px;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n\n.react-terminal-wrapper.react-terminal-light:after {\n  color: #D76D77;\n}\n\n.react-terminal-line {\n  display: block;\n  line-height: 1.5;\n}\n\n.react-terminal-line:before {\n  /* Set up defaults and ensure empty lines are displayed. */\n  content: '';\n  display: inline-block;\n  vertical-align: middle;\n  color: #a2a2a2;\n}\n\n.react-terminal-light .react-terminal-line:before {\n  color: #D76D77;\n}\n\n.react-terminal-input:before {\n  margin-right: 0.75em;\n  content: '$';\n}\n\n.react-terminal-input[data-terminal-prompt]:before {\n  content: attr(data-terminal-prompt);\n}\n\n.react-terminal-active-input:after {\n  content: '▋';\n  font-family: monospace;\n  margin-left: 0.2em;\n  -webkit-animation: blink 1s infinite;\n          animation: blink 1s infinite;\n}\n\n/* Cursor animation */\n\n@-webkit-keyframes blink {\n  50% {\n      opacity: 0;\n  }\n}\n\n@keyframes blink {\n  50% {\n      opacity: 0;\n  }\n}\n\n.hidden-input-wrapper {\n  overflow: hidden;\n  position: relative;\n}\n\n.hidden-input {\n    position: absolute;\n}\n/* .react-terminal-progress {\n  display: flex;\n  margin: .5rem 0;\n}\n\n.react-terminal-progress-bar {\n  background-color: #fff;\n  border-radius: .25rem;\n  width: 25%;\n}\n\n.react-terminal-wrapper.react-terminal-light .react-terminal-progress-bar {\n  background-color: #000;\n} */\n";
styleInject(css_248z);

var LineType;
(function (LineType) {
    LineType[LineType["Input"] = 0] = "Input";
    LineType[LineType["Output"] = 1] = "Output";
})(LineType || (LineType = {}));
var ColorMode;
(function (ColorMode) {
    ColorMode[ColorMode["Light"] = 0] = "Light";
    ColorMode[ColorMode["Dark"] = 1] = "Dark";
})(ColorMode || (ColorMode = {}));
var Terminal = function (props) {
    var _a = useState(''), currentLineInput = _a[0], setCurrentLineInput = _a[1];
    var lastLineRef = useRef(null);
    var updateCurrentLineInput = function (event) {
        setCurrentLineInput(event.target.value);
    };
    var handleEnter = function (event) {
        if (props.onInput != null && event.key === 'Enter') {
            props.onInput(currentLineInput);
            setCurrentLineInput('');
        }
    };
    var renderedLineData = props.lineData.map(function (ld, i) {
        var classes = ['react-terminal-line'];
        if (ld.type === LineType.Input) {
            classes.push('react-terminal-input');
        }
        if (props.lineData.length === i + 1 && props.onInput == null) {
            return (React.createElement("span", { className: classes.join(' '), key: i, ref: lastLineRef }, ld.value));
        }
        else {
            return (React.createElement("span", { className: classes.join(' '), key: i }, ld.value));
        }
    });
    if (props.onInput != null) {
        renderedLineData.push(React.createElement("span", { className: "react-terminal-line react-terminal-input react-terminal-active-input", "data-terminal-prompt": props.prompt || '$', key: props.lineData.length, ref: lastLineRef }, currentLineInput));
    }
    var classes = ['react-terminal-wrapper'];
    if (props.colorMode === ColorMode.Light) {
        classes.push('react-terminal-light');
    }
    return (React.createElement("div", { className: classes.join(' '), "data-terminal-name": props.name },
        React.createElement("div", { className: "react-terminal" }, renderedLineData),
        React.createElement("div", { className: "hidden-input-wrapper" },
            React.createElement("div", { className: "hidden-input" },
                React.createElement("label", { htmlFor: "terminal-hidden" }, "Terminal Hidden Input"),
                React.createElement("input", { id: "terminal-hidden", value: currentLineInput, onChange: updateCurrentLineInput, onKeyDown: handleEnter })))));
};

export default Terminal;
export { ColorMode, LineType };
