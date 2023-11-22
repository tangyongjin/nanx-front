"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.createMutators = function (props) {
    return {
        change: function (value) {
            props.form.setValue(props.name, value);
        },
        dispatch: function (name, payload) {
            props.form.dispatchEffect(name, {
                name: props.name,
                path: props.path,
                payload: payload
            });
        },
        errors: function (errors) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            (_a = props.form).setErrors.apply(_a, [props.name, utils_1.flatArr(utils_1.toArr(errors))].concat(args));
        },
        push: function (value) {
            var arr = utils_1.toArr(props.form.getValue(props.name));
            props.form.setValue(props.name, arr.concat(value));
        },
        pop: function () {
            var arr = [].concat(utils_1.toArr(props.form.getValue(props.name)));
            arr.pop();
            props.form.setValue(props.name, arr);
        },
        insert: function (index, value) {
            var arr = [].concat(utils_1.toArr(props.form.getValue(props.name)));
            arr.splice(index, 0, value);
            props.form.setValue(props.name, arr);
        },
        remove: function (index) {
            var val = props.form.getValue(props.name);
            if (utils_1.isNum(index) && utils_1.isArr(val)) {
                val = [].concat(val);
                val.splice(index, 1);
                props.form.setValue(props.name, val);
            }
            else {
                props.form.removeValue(props.name);
            }
        },
        unshift: function (value) {
            var arr = [].concat(utils_1.toArr(props.form.getValue(props.name)));
            arr.unshift(value);
            props.form.setValue(props.name, arr);
        },
        shift: function () {
            var arr = [].concat(utils_1.toArr(props.form.getValue(props.name)));
            arr.shift();
            props.form.setValue(props.name, arr);
        },
        move: function ($from, $to) {
            var arr = [].concat(utils_1.toArr(props.form.getValue(props.name)));
            var item = arr[$from];
            arr.splice($from, 1);
            arr.splice($to, 0, item);
            props.form.setValue(props.name, arr);
        }
    };
};
