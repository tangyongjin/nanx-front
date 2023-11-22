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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var react_1 = __importDefault(require("react"));
var react_2 = require("@uform/react");
var moment_1 = __importDefault(require("moment"));
var date_picker_1 = __importDefault(require("antd/lib/date-picker"));
var utils_1 = require("../utils");
var AntRangePicker = date_picker_1.default.RangePicker, AntWeekPicker = date_picker_1.default.WeekPicker, AntMonthPicker = date_picker_1.default.MonthPicker;
var AntYearPicker = (function (_super) {
    __extends(AntYearPicker, _super);
    function AntYearPicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AntYearPicker.prototype.render = function () {
        return react_1.default.createElement(date_picker_1.default, __assign({}, this.props, { mode: 'year' }));
    };
    return AntYearPicker;
}(react_1.default.Component));
var DatePicker = utils_1.StateLoading(date_picker_1.default);
var RangePicker = utils_1.StateLoading(AntRangePicker);
var MonthPicker = utils_1.StateLoading(AntMonthPicker);
var WeekPicker = utils_1.StateLoading(AntWeekPicker);
var YearPicker = utils_1.StateLoading(AntYearPicker);
var transformMoment = function (value, format) {
    if (format === void 0) {
        format = 'YYYY-MM-DD HH:mm:ss';
    }
    return value && value.format ? value.format(format) : value;
};
var mapMomentValue = function (props, fieldProps) {
    var value = props.value, _a = props.showTime, showTime = _a === void 0 ? false : _a;
    try {
        if (!fieldProps.editable)
            return props;
        if (utils_1.isStr(value)) {
            props.value = value
                ? moment_1.default(value, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
                : null;
        }
        else if (utils_1.isArr(value) && value.length) {
            props.value = value.map(function (item) {
                return item
                    ? moment_1.default(item, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
                    : null;
            });
        }
    }
    catch (e) {
        throw new Error(e);
    }
    return props;
};
react_2.registerFormField('date', react_2.connect({
    getValueFromEvent: function (_, value) {
        var props = this.props || {};
        return transformMoment(value, props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
    },
    getProps: utils_1.compose(utils_1.mapStyledProps, mapMomentValue),
    getComponent: utils_1.mapTextComponent
})(DatePicker));
react_2.registerFormField('daterange', react_2.connect({
    getValueFromEvent: function (_, _a) {
        var startDate = _a[0], endDate = _a[1];
        var props = this.props || {};
        var format = props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
        return [
            transformMoment(startDate, format),
            transformMoment(endDate, format)
        ];
    },
    getProps: utils_1.compose(utils_1.mapStyledProps, mapMomentValue),
    getComponent: utils_1.mapTextComponent
})(RangePicker));
react_2.registerFormField('month', react_2.connect({
    getValueFromEvent: function (_, value) {
        return transformMoment(value);
    },
    getProps: utils_1.compose(utils_1.mapStyledProps, mapMomentValue),
    getComponent: utils_1.mapTextComponent
})(MonthPicker));
react_2.registerFormField('week', react_2.connect({
    getValueFromEvent: function (_, value) {
        return transformMoment(value, 'gggg-wo');
    },
    getProps: utils_1.compose(utils_1.mapStyledProps, function (props) {
        if (utils_1.isStr(props.value) && props.value) {
            var parsed = props.value.match(/\D*(\d+)\D*(\d+)\D*/) || [
                '',
                '',
                ''
            ];
            props.value = moment_1.default(parsed[1], 'YYYY').add(parsed[2] - 1, 'weeks');
        }
        return props;
    }),
    getComponent: utils_1.mapTextComponent
})(WeekPicker));
react_2.registerFormField('year', react_2.connect({
    getValueFromEvent: function (_, value) {
        return transformMoment(value);
    },
    getProps: utils_1.compose(utils_1.mapStyledProps, mapMomentValue),
    getComponent: utils_1.mapTextComponent
})(YearPicker));
