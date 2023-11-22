var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React from 'react';
import { connect, registerFormField } from '@uform/react';
import moment from 'moment';
import { default as AntDatePicker } from "antd/lib/date-picker";
import { mapStyledProps, mapTextComponent, StateLoading, compose, isStr, isArr } from '../utils';
var AntRangePicker = AntDatePicker.RangePicker, AntWeekPicker = AntDatePicker.WeekPicker, AntMonthPicker = AntDatePicker.MonthPicker;
var AntYearPicker = (function (_super) {
    __extends(AntYearPicker, _super);
    function AntYearPicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AntYearPicker.prototype.render = function () {
        return React.createElement(AntDatePicker, __assign({}, this.props, { mode: 'year' }));
    };
    return AntYearPicker;
}(React.Component));
var DatePicker = StateLoading(AntDatePicker);
var RangePicker = StateLoading(AntRangePicker);
var MonthPicker = StateLoading(AntMonthPicker);
var WeekPicker = StateLoading(AntWeekPicker);
var YearPicker = StateLoading(AntYearPicker);
var transformMoment = function (value, format) {
    if (format === void 0) { format = 'YYYY-MM-DD HH:mm:ss'; }
    return value && value.format ? value.format(format) : value;
};
var mapMomentValue = function (props, fieldProps) {
    var value = props.value, _a = props.showTime, showTime = _a === void 0 ? false : _a;
    try {
        if (!fieldProps.editable)
            return props;
        if (isStr(value)) {
            props.value = value
                ? moment(value, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
                : null;
        }
        else if (isArr(value) && value.length) {
            props.value = value.map(function (item) {
                return item
                    ? moment(item, showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
                    : null;
            });
        }
    }
    catch (e) {
        throw new Error(e);
    }
    return props;
};
registerFormField('date', connect({
    getValueFromEvent: function (_, value) {
        var props = this.props || {};
        return transformMoment(value, props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
    },
    getProps: compose(mapStyledProps, mapMomentValue),
    getComponent: mapTextComponent
})(DatePicker));
registerFormField('daterange', connect({
    getValueFromEvent: function (_, _a) {
        var startDate = _a[0], endDate = _a[1];
        var props = this.props || {};
        var format = props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
        return [
            transformMoment(startDate, format),
            transformMoment(endDate, format)
        ];
    },
    getProps: compose(mapStyledProps, mapMomentValue),
    getComponent: mapTextComponent
})(RangePicker));
registerFormField('month', connect({
    getValueFromEvent: function (_, value) {
        return transformMoment(value);
    },
    getProps: compose(mapStyledProps, mapMomentValue),
    getComponent: mapTextComponent
})(MonthPicker));
registerFormField('week', connect({
    getValueFromEvent: function (_, value) {
        return transformMoment(value, 'gggg-wo');
    },
    getProps: compose(mapStyledProps, function (props) {
        if (isStr(props.value) && props.value) {
            var parsed = props.value.match(/\D*(\d+)\D*(\d+)\D*/) || [
                '',
                '',
                ''
            ];
            props.value = moment(parsed[1], 'YYYY').add(parsed[2] - 1, 'weeks');
        }
        return props;
    }),
    getComponent: mapTextComponent
})(WeekPicker));
registerFormField('year', connect({
    getValueFromEvent: function (_, value) {
        return transformMoment(value);
    },
    getProps: compose(mapStyledProps, mapMomentValue),
    getComponent: mapTextComponent
})(YearPicker));
