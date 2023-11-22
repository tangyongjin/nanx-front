"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var utils_1 = require("../utils");
var ArrayFieldComponent = (function (_super) {
    __extends(ArrayFieldComponent, _super);
    function ArrayFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ArrayFieldComponent;
}(react_1.default.Component));
exports.ArrayFieldComponent = ArrayFieldComponent;
exports.createArrayField = function (options) {
    var _a = __assign({ TextButton: function () { return react_1.default.createElement("div", null, "You Should Pass The TextButton."); }, CircleButton: function () { return react_1.default.createElement("div", null, "You Should Pass The CircleButton."); }, AddIcon: function () { return react_1.default.createElement("div", null, "You Should Pass The AddIcon."); }, RemoveIcon: function () { return react_1.default.createElement("div", null, "You Should Pass The RemoveIcon."); }, MoveDownIcon: function () { return react_1.default.createElement("div", null, "You Should Pass The MoveDownIcon."); }, MoveUpIcon: function () { return react_1.default.createElement("div", null, "You Should Pass The MoveUpIcon."); } }, options), TextButton = _a.TextButton, CircleButton = _a.CircleButton, AddIcon = _a.AddIcon, RemoveIcon = _a.RemoveIcon, MoveDownIcon = _a.MoveDownIcon, MoveUpIcon = _a.MoveUpIcon;
    return (function (_super) {
        __extends(ArrayFieldComponent, _super);
        function ArrayFieldComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isActive = function (key, value) {
                var readOnly = _this.getProps('readOnly');
                var disabled = _this.getDisabled();
                if (utils_1.isFn(disabled)) {
                    return disabled(key, value);
                }
                else if (utils_1.isFn(readOnly)) {
                    return readOnly(key, value);
                }
                else {
                    return !readOnly && !disabled;
                }
            };
            return _this;
        }
        ArrayFieldComponent.prototype.getApi = function (index) {
            var _this = this;
            var value = this.props.value;
            return {
                index: index,
                isActive: this.isActive,
                dataSource: value,
                record: value[index],
                add: this.onAddHandler(),
                remove: this.onRemoveHandler(index),
                moveDown: function (e) {
                    return _this.onMoveHandler(index, index + 1 > value.length - 1 ? 0 : index + 1)(e);
                },
                moveUp: function (e) {
                    return _this.onMoveHandler(index, index - 1 < 0 ? value.length - 1 : index - 1)(e);
                }
            };
        };
        ArrayFieldComponent.prototype.getProps = function (path) {
            return utils_1.getIn(this.props.schema, "x-props" + (path ? '.' + path : ''));
        };
        ArrayFieldComponent.prototype.renderWith = function (name, index, defaultRender) {
            var render = this.getProps(utils_1.camelCase("render-" + name));
            if (utils_1.isFn(index)) {
                defaultRender = index;
                index = 0;
            }
            if (utils_1.isFn(render)) {
                return render(this.getApi(index));
            }
            else if (defaultRender) {
                return utils_1.isFn(defaultRender)
                    ? defaultRender(this.getApi(index), render)
                    : defaultRender;
            }
        };
        ArrayFieldComponent.prototype.renderAddition = function () {
            var locale = this.props.locale;
            var value = this.props.value;
            return (this.isActive('addition', value) &&
                this.renderWith('addition', function (_a, text) {
                    var add = (_a === void 0 ? {} : _a).add;
                    return (react_1.default.createElement("div", { className: 'array-item-addition', onClick: add },
                        react_1.default.createElement(TextButton, null,
                            react_1.default.createElement(AddIcon, null),
                            text || locale.addItem || '添加')));
                }));
        };
        ArrayFieldComponent.prototype.renderEmpty = function () {
            var _a = this.props, locale = _a.locale, value = _a.value;
            return (value.length === 0 &&
                this.renderWith('empty', function (_a, text) {
                    var add = _a.add, isActive = _a.isActive;
                    var active = isActive('empty', value);
                    return (react_1.default.createElement("div", { className: "array-empty-wrapper " + (!active ? 'disabled' : ''), onClick: active ? add : undefined },
                        react_1.default.createElement("div", { className: 'array-empty' },
                            react_1.default.createElement("img", { style: { backgroundColor: 'transparent' }, src: '//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg' }),
                            active && (react_1.default.createElement(TextButton, null,
                                react_1.default.createElement(AddIcon, null),
                                text || locale.addItem || '添加')))));
                }));
        };
        ArrayFieldComponent.prototype.renderRemove = function (index, item) {
            return (this.isActive(index + ".remove", item) &&
                this.renderWith('remove', index, function (_a, text) {
                    var remove = _a.remove;
                    return (react_1.default.createElement(CircleButton, { onClick: remove, hasText: !!text },
                        react_1.default.createElement(RemoveIcon, null),
                        text && react_1.default.createElement("span", { className: 'op-name' }, text)));
                }));
        };
        ArrayFieldComponent.prototype.renderMoveDown = function (index, item) {
            var value = this.props.value;
            return (value.length > 1 &&
                this.isActive(index + ".moveDown", item) &&
                this.renderWith('moveDown', index, function (_a, text) {
                    var moveDown = _a.moveDown;
                    return (react_1.default.createElement(CircleButton, { onClick: moveDown, hasText: !!text },
                        react_1.default.createElement(MoveDownIcon, null),
                        react_1.default.createElement("span", { className: 'op-name' }, text)));
                }));
        };
        ArrayFieldComponent.prototype.renderMoveUp = function (index) {
            var value = this.props.value;
            return (value.length > 1 &&
                this.isActive(index + ".moveUp", value) &&
                this.renderWith('moveUp', index, function (_a, text) {
                    var moveUp = _a.moveUp;
                    return (react_1.default.createElement(CircleButton, { onClick: moveUp, hasText: !!text },
                        react_1.default.createElement(MoveUpIcon, null),
                        react_1.default.createElement("span", { className: 'op-name' }, text)));
                }));
        };
        ArrayFieldComponent.prototype.renderExtraOperations = function (index) {
            return this.renderWith('extraOperations', index);
        };
        ArrayFieldComponent.prototype.getDisabled = function () {
            var _a = this.props, editable = _a.editable, name = _a.name;
            var disabled = this.getProps('disabled');
            if (editable !== undefined) {
                if (utils_1.isFn(editable)) {
                    if (!editable(name)) {
                        return true;
                    }
                }
                else if (editable === false) {
                    return true;
                }
            }
            return disabled;
        };
        ArrayFieldComponent.prototype.onRemoveHandler = function (index) {
            var _a = this.props, value = _a.value, mutators = _a.mutators, schema = _a.schema, locale = _a.locale;
            var minItems = schema.minItems;
            return function (e) {
                e.stopPropagation();
                if (minItems >= 0 && value.length - 1 < minItems) {
                    mutators.errors(locale.array_invalid_minItems, minItems);
                }
                else {
                    mutators.remove(index);
                }
            };
        };
        ArrayFieldComponent.prototype.onMoveHandler = function (from, to) {
            var mutators = this.props.mutators;
            return function (e) {
                e.stopPropagation();
                mutators.move(from, to);
            };
        };
        ArrayFieldComponent.prototype.onAddHandler = function () {
            var _a = this.props, value = _a.value, mutators = _a.mutators, schema = _a.schema, locale = _a.locale;
            var maxItems = schema.maxItems;
            return function (e) {
                e.stopPropagation();
                if (maxItems >= 0 && value.length + 1 > maxItems) {
                    mutators.errors(locale.array_invalid_maxItems, maxItems);
                }
                else {
                    mutators.push();
                }
            };
        };
        ArrayFieldComponent.prototype.onClearErrorHandler = function () {
            var _this = this;
            return function () {
                var _a = _this.props, value = _a.value, mutators = _a.mutators, schema = _a.schema;
                var maxItems = schema.maxItems, minItems = schema.minItems;
                if ((maxItems >= 0 && value.length <= maxItems) ||
                    (minItems >= 0 && value.length >= minItems)) {
                    mutators.errors();
                }
            };
        };
        ArrayFieldComponent.prototype.validate = function () {
            var _a = this.props, value = _a.value, mutators = _a.mutators, schema = _a.schema, locale = _a.locale;
            var maxItems = schema.maxItems, minItems = schema.minItems;
            if (value.length > maxItems) {
                mutators.errors(locale.array_invalid_maxItems, maxItems);
            }
            else if (value.length < minItems) {
                mutators.errors(locale.array_invalid_minItems, minItems);
            }
            else {
                mutators.errors();
            }
        };
        ArrayFieldComponent.prototype.componentDidUpdate = function (prevProps) {
            if (!utils_1.isEqual(prevProps.value, this.props.value)) {
                this.validate();
            }
        };
        ArrayFieldComponent.prototype.componentDidMount = function () {
            this.validate();
        };
        return ArrayFieldComponent;
    }(react_1.default.Component));
};
