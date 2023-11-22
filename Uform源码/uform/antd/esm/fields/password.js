var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState } from 'react';
import styled from 'styled-components';
import Input from "antd/lib/input";
import { connect, registerFormField } from '@uform/react';
import { mapStyledProps } from '../utils';
var isNum = function (c) {
    return c >= 48 && c <= 57;
};
var isLower = function (c) {
    return c >= 97 && c <= 122;
};
var isUpper = function (c) {
    return c >= 65 && c <= 90;
};
var isSymbol = function (c) {
    return !(isLower(c) || isUpper(c) || isNum(c));
};
var isLetter = function (c) {
    return isLower(c) || isUpper(c);
};
var getStrength = function (val) {
    if (!val) {
        return 0;
    }
    var num = 0;
    var lower = 0;
    var upper = 0;
    var symbol = 0;
    var MNS = 0;
    var rep = 0;
    var repC = 0;
    var consecutive = 0;
    var sequential = 0;
    var len = function () { return num + lower + upper + symbol; };
    var require = function () {
        var re = num > 0 ? 1 : 0;
        re += lower > 0 ? 1 : 0;
        re += upper > 0 ? 1 : 0;
        re += symbol > 0 ? 1 : 0;
        if (re > 2 && len() >= 8) {
            return re + 1;
        }
        else {
            return 0;
        }
    };
    for (var i = 0; i < val.length; i++) {
        var c = val.charCodeAt(i);
        if (isNum(c)) {
            num++;
            if (i !== 0 && i !== val.length - 1) {
                MNS++;
            }
            if (i > 0 && isNum(val.charCodeAt(i - 1))) {
                consecutive++;
            }
        }
        else if (isLower(c)) {
            lower++;
            if (i > 0 && isLower(val.charCodeAt(i - 1))) {
                consecutive++;
            }
        }
        else if (isUpper(c)) {
            upper++;
            if (i > 0 && isUpper(val.charCodeAt(i - 1))) {
                consecutive++;
            }
        }
        else {
            symbol++;
            if (i !== 0 && i !== val.length - 1) {
                MNS++;
            }
        }
        var exists = false;
        for (var j = 0; j < val.length; j++) {
            if (val[i] === val[j] && i !== j) {
                exists = true;
                repC += Math.abs(val.length / (j - i));
            }
        }
        if (exists) {
            rep++;
            var unique = val.length - rep;
            repC = unique ? Math.ceil(repC / unique) : Math.ceil(repC);
        }
        if (i > 1) {
            var last1 = val.charCodeAt(i - 1);
            var last2 = val.charCodeAt(i - 2);
            if (isLetter(c)) {
                if (isLetter(last1) && isLetter(last2)) {
                    var v = val.toLowerCase();
                    var vi = v.charCodeAt(i);
                    var vi1 = v.charCodeAt(i - 1);
                    var vi2 = v.charCodeAt(i - 2);
                    if (vi - vi1 === vi1 - vi2 && Math.abs(vi - vi1) === 1) {
                        sequential++;
                    }
                }
            }
            else if (isNum(c)) {
                if (isNum(last1) && isNum(last2)) {
                    if (c - last1 === last1 - last2 && Math.abs(c - last1) === 1) {
                        sequential++;
                    }
                }
            }
            else {
                if (isSymbol(last1) && isSymbol(last2)) {
                    if (c - last1 === last1 - last2 && Math.abs(c - last1) === 1) {
                        sequential++;
                    }
                }
            }
        }
    }
    var sum = 0;
    var length = len();
    sum += 4 * length;
    if (lower > 0) {
        sum += 2 * (length - lower);
    }
    if (upper > 0) {
        sum += 2 * (length - upper);
    }
    if (num !== length) {
        sum += 4 * num;
    }
    sum += 6 * symbol;
    sum += 2 * MNS;
    sum += 2 * require();
    if (length === lower + upper) {
        sum -= length;
    }
    if (length === num) {
        sum -= num;
    }
    sum -= repC;
    sum -= 2 * consecutive;
    sum -= 3 * sequential;
    sum = sum < 0 ? 0 : sum;
    sum = sum > 100 ? 100 : sum;
    if (sum >= 80) {
        return 100;
    }
    else if (sum >= 60) {
        return 80;
    }
    else if (sum >= 40) {
        return 60;
    }
    else if (sum >= 20) {
        return 40;
    }
    else {
        return 20;
    }
};
var StrengthFC = styled(function (_a) {
    var strength = _a.strength, className = _a.className;
    return (React.createElement("div", __assign({}, { className: className }),
        React.createElement("div", { className: 'password-strength-wrapper' },
            React.createElement("div", { className: 'div-1 div' }),
            React.createElement("div", { className: 'div-2 div' }),
            React.createElement("div", { className: 'div-3 div' }),
            React.createElement("div", { className: 'div-4 div' }),
            React.createElement("div", { className: 'password-strength-bar', style: {
                    clipPath: "polygon(0 0," + strength + "% 0," + strength + "% 100%,0 100%)"
                } }))));
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .password-strength-wrapper {\n    background: #e0e0e0;\n    margin-bottom: 3px;\n    position: relative;\n    .div {\n      position: absolute;\n      z-index: 1;\n      height: 8px;\n      top: 0;\n      background: #fff;\n      width: 1px;\n      transform: translate(-50%, 0);\n    }\n    .div-1 {\n      left: 20%;\n    }\n    .div-2 {\n      left: 40%;\n    }\n    .div-3 {\n      left: 60%;\n    }\n    .div-4 {\n      left: 80%;\n    }\n    .password-strength-bar {\n      position: relative;\n      background-image: -webkit-linear-gradient(left, #ff5500, #ff9300);\n      transition: all 0.35s ease-in-out;\n      height: 8px;\n      width: 100%;\n      margin-top: 5px;\n    }\n  }\n"], ["\n  .password-strength-wrapper {\n    background: #e0e0e0;\n    margin-bottom: 3px;\n    position: relative;\n    .div {\n      position: absolute;\n      z-index: 1;\n      height: 8px;\n      top: 0;\n      background: #fff;\n      width: 1px;\n      transform: translate(-50%, 0);\n    }\n    .div-1 {\n      left: 20%;\n    }\n    .div-2 {\n      left: 40%;\n    }\n    .div-3 {\n      left: 60%;\n    }\n    .div-4 {\n      left: 80%;\n    }\n    .password-strength-bar {\n      position: relative;\n      background-image: -webkit-linear-gradient(left, #ff5500, #ff9300);\n      transition: all 0.35s ease-in-out;\n      height: 8px;\n      width: 100%;\n      margin-top: 5px;\n    }\n  }\n"])));
var PasswordFC = function (props) {
    var _a = useState(0), strength = _a[0], setStrength = _a[1];
    var checkStrength = props.checkStrength, others = __rest(props, ["checkStrength"]);
    var onChangeHandler = function (e) {
        var value = e.target.value;
        checkStrength && setStrength(getStrength(value));
        props.onChange && props.onChange(value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input.Password, __assign({}, others, { value: props.value || props.defaultValue, onChange: onChangeHandler })),
        checkStrength && React.createElement(StrengthFC, __assign({}, { strength: strength }))));
};
registerFormField('password', connect({
    getProps: mapStyledProps
})(PasswordFC));
var templateObject_1;
