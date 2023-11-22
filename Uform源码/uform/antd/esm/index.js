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
import './form';
import './fields/string';
import './fields/number';
import './fields/boolean';
import './fields/date';
import './fields/time';
import './fields/range';
import './fields/upload';
import './fields/checkbox';
import './fields/radio';
import './fields/rating';
import './fields/transfer';
import './fields/array';
import './fields/table';
import './fields/textarea';
import './fields/password';
import './fields/cards';
export * from '@uform/react';
export * from './components/formButtonGroup';
export * from './components/button';
export * from './components/layout';
import React from 'react';
import { SchemaForm as InternalSchemaForm, Field as InternalField } from '@uform/react';
export { mapStyledProps, mapTextComponent } from './utils';
var SchemaForm = (function (_super) {
    __extends(SchemaForm, _super);
    function SchemaForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SchemaForm.prototype.render = function () {
        return React.createElement(InternalSchemaForm, __assign({}, this.props));
    };
    return SchemaForm;
}(React.Component));
export default SchemaForm;
var Field = (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.render = function () {
        return React.createElement(InternalField, __assign({}, this.props));
    };
    return Field;
}(React.Component));
export { Field };
