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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
var mutators_1 = require("../shared/mutators");
var context_1 = require("../shared/context");
var core_1 = require("../shared/core");
var StateField = utils_1.createHOC(function (options, Field) {
    var StateField = (function (_super) {
        __extends(StateField, _super);
        function StateField(props) {
            var _this = _super.call(this, props) || this;
            _this.renderField = function (key, addReactKey) {
                var path = _this.props.path.concat(key);
                var schemaPath = _this.props.schemaPath.concat(key);
                var name = path.join('.');
                return (react_1.default.createElement(exports.FormField, { key: addReactKey ? name : undefined, path: path, name: name, schemaPath: schemaPath }));
            };
            _this.getOrderProperties = function (outerSchema) {
                var _a = _this.props, innerSchema = _a.schema, path = _a.path;
                if (!innerSchema && !outerSchema) {
                    return [];
                }
                var properties = [];
                utils_1.each((outerSchema || innerSchema || {}).properties, function (item, key) {
                    var index = item['x-index'];
                    var newPath = path.concat(key);
                    var newName = newPath.join('.');
                    if (typeof index === 'number') {
                        properties[index] = {
                            schema: item,
                            key: key,
                            path: newPath,
                            name: newName
                        };
                    }
                    else {
                        properties.push({ schema: item, key: key, path: newPath, name: newName });
                    }
                });
                return properties.reduce(function (buf, item) {
                    return item ? buf.concat(item) : buf;
                }, []);
            };
            _this.initialized = false;
            _this.state = {};
            _this.field = props.form.registerField(props.name || props.schemaPath.join('.'), {
                path: props.schemaPath,
                onChange: _this.onChangeHandler(),
                props: props.schema
            });
            _this.mutators = mutators_1.createMutators(props);
            _this.initialized = true;
            return _this;
        }
        StateField.prototype.onChangeHandler = function () {
            var _this = this;
            return function (fieldState) {
                if (_this.unmounted) {
                    return;
                }
                if (_this.initialized) {
                    _this.setState(fieldState);
                }
                else {
                    _this.state = fieldState;
                }
            };
        };
        StateField.prototype.componentWillUnmount = function () {
            this.unmounted = true;
            this.field.unmount();
        };
        StateField.prototype.componentDidMount = function () {
            this.unmounted = false;
            this.field.mount();
        };
        StateField.prototype.componentDidUpdate = function (prevProps) {
            if (!utils_1.isEqual(this.props.schema, prevProps.schema, utils_1.filterSchema)) {
                this.field.changeProps(this.props.schema);
            }
        };
        StateField.prototype.render = function () {
            var _a = this.props, name = _a.name, path = _a.path, schemaPath = _a.schemaPath, broadcast = _a.broadcast, schema = _a.schema, form = _a.form, locale = _a.locale, getSchema = _a.getSchema;
            var _b = this.state, value = _b.value, visible = _b.visible, display = _b.display, props = _b.props, errors = _b.errors, loading = _b.loading, editable = _b.editable, required = _b.required;
            var newValue = utils_1.schemaIs(props, 'object')
                ? value || {}
                : utils_1.schemaIs(props, 'array')
                    ? value || []
                    : value;
            if (schema.properties) {
                props.properties = schema.properties;
            }
            else if (schema.items) {
                props.items = schema.items;
            }
            return visible === false || display === false ? (react_1.default.createElement(react_1.default.Fragment, null)) : (react_1.default.createElement(Field, { name: name, value: newValue, errors: errors, required: required, path: path, editable: editable, locale: locale, form: form, broadcast: broadcast, loading: loading, schemaPath: schemaPath, getSchema: getSchema, renderField: this.renderField, getOrderProperties: this.getOrderProperties, mutators: this.mutators, schema: props }));
        };
        StateField.displayName = 'StateField';
        return StateField;
    }(react_1.Component));
    return function (props) {
        var name = props.name, path = props.path, schemaPath = props.schemaPath;
        var _a = react_1.useContext(context_1.StateContext), form = _a.form, getSchema = _a.getSchema, locale = _a.locale, broadcast = _a.broadcast;
        return (react_1.default.createElement(StateField, { name: name, path: path, form: form, broadcast: broadcast, schema: getSchema(schemaPath || path), locale: locale, getSchema: getSchema, schemaPath: schemaPath }));
    };
});
exports.FormField = StateField()(function (props) {
    var schema = props.schema;
    var fieldComponentName = utils_1.lowercase(schema['x-component'] || schema.type);
    var renderComponent = schema['x-render']
        ? function (innerProps) {
            return react_1.default.createElement(core_1.getFormField(fieldComponentName), __assign({}, props, innerProps, { schema: schema, path: props.path, name: props.name }));
        }
        : undefined;
    var component = schema['x-render']
        ? core_1.getFieldRenderer()
        : core_1.getFormField(fieldComponentName);
    if (component) {
        return react_1.default.createElement(component, __assign({}, props, { renderComponent: renderComponent }));
    }
    else {
        if (console && console.error) {
            if (fieldComponentName) {
                console.error("The schema field `" + fieldComponentName + "`'s component is not found.");
            }
            else {
                console.error("The schema field's component is not found, or field's schema is not defined.");
            }
        }
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
});
