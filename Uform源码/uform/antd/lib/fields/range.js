"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var react_1 = __importDefault(require("react"));
var slider_1 = __importDefault(require("antd/lib/slider"));
var react_2 = require("@uform/react");
var utils_1 = require("../utils");
react_2.registerFormField('range', react_2.connect({
    defaultProps: {
        style: {
            width: 320
        }
    },
    getProps: utils_1.mapStyledProps
})((function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, value = _a.value, min = _a.min, max = _a.max, marks = _a.marks;
        var newMarks = {};
        if (Array.isArray(marks)) {
            marks.forEach(function (mark) {
                newMarks[mark] = mark;
            });
        }
        else {
            newMarks = marks;
        }
        return (react_1.default.createElement(slider_1.default, { onChange: onChange, value: value, min: min, max: max, marks: newMarks }));
    };
    return Component;
}(react_1.default.Component))));
