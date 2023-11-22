"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
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
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var react_2 = require("@uform/react");
var utils_1 = require("@uform/utils");
var array_1 = require("./array");
var Column = (function (_super) {
    __extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Column.prototype.render = function () {
        return this.props.children;
    };
    Column.displayName = '@schema-table-column';
    return Column;
}(react_1.Component));
react_2.registerFormField('table', styled_components_1.default((function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    class_1.prototype.createFilter = function (key, payload) {
        var schema = this.props.schema;
        var columnFilter = schema['x-props'] && schema['x-props'].columnFilter;
        return function (render, otherwise) {
            if (utils_1.isFn(columnFilter)) {
                return columnFilter(key, payload)
                    ? utils_1.isFn(render)
                        ? render()
                        : render
                    : utils_1.isFn(otherwise)
                        ? otherwise()
                        : otherwise;
            }
            else {
                return render();
            }
        };
    };
    class_1.prototype.render = function () {
        var _this = this;
        var _a = this.props, value = _a.value, schema = _a.schema, locale = _a.locale, className = _a.className, renderField = _a.renderField, getOrderProperties = _a.getOrderProperties;
        var cls = this.getProps('className');
        var style = this.getProps('style');
        var operationsWidth = this.getProps('operationsWidth');
        return (react_1.default.createElement("div", { className: className + " " + cls, style: style, onClick: this.onClearErrorHandler() }, react_1.default.createElement("div", null, react_1.default.createElement(Table, { dataSource: value }, getOrderProperties(schema.items).reduce(function (buf, _a) {
            var key = _a.key, schema = _a.schema;
            var filter = _this.createFilter(key, schema);
            var res = filter(function () {
                return buf.concat(react_1.default.createElement(Column, __assign({}, schema, { key: key, title: schema.title, dataIndex: key, cell: function (record, index) {
                        return renderField([index, key]);
                    } })));
            }, function () {
                return buf;
            });
            return res;
        }, []), react_1.default.createElement(Column, { key: 'operations', title: locale.operations, dataIndex: 'operations', width: operationsWidth, cell: function (item, index) {
                return (react_1.default.createElement("div", { className: 'array-item-operator' }, _this.renderRemove(index, item), _this.renderMoveDown(index, item), _this.renderMoveUp(index), _this.renderExtraOperations(index)));
            } })), this.renderAddition())));
    };
    return class_1;
}(array_1.ArrayField)))(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: inline-block;\n    .array-item-addition {\n      line-height: normal !important;\n      padding: 10px;\n      background: #fbfbfb;\n      border-left: 1px solid #dcdee3;\n      border-right: 1px solid #dcdee3;\n      border-bottom: 1px solid #dcdee3;\n      .ant-btn-text {\n        color: #888;\n        i {\n          margin-right: 3px;\n        }\n      }\n    }\n    .ant-table-cell-wrapper > .ant-form-item {\n      margin-bottom: 0;\n    }\n    .array-item-operator {\n      display: flex;\n    }\n  "], ["\n    display: inline-block;\n    .array-item-addition {\n      line-height: normal !important;\n      padding: 10px;\n      background: #fbfbfb;\n      border-left: 1px solid #dcdee3;\n      border-right: 1px solid #dcdee3;\n      border-bottom: 1px solid #dcdee3;\n      .ant-btn-text {\n        color: #888;\n        i {\n          margin-right: 3px;\n        }\n      }\n    }\n    .ant-table-cell-wrapper > .ant-form-item {\n      margin-bottom: 0;\n    }\n    .array-item-operator {\n      display: flex;\n    }\n  "]))));
var Table = styled_components_1.default((function (_super) {
    __extends(Table, _super);
    function Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Table.prototype.renderCell = function (_a) {
        var record = _a.record, col = _a.col, rowIndex = _a.rowIndex;
        return (react_1.default.createElement("div", { className: 'ant-table-cell-wrapper' }, utils_1.isFn(col.cell)
            ? col.cell(record ? record[col.dataIndex] : undefined, rowIndex, record)
            : record
                ? record[col.dataIndex]
                : undefined));
    };
    Table.prototype.renderTable = function (columns, dataSource) {
        var _this = this;
        return (react_1.default.createElement("div", { className: 'ant-table-body' }, react_1.default.createElement("table", null, react_1.default.createElement("thead", null, react_1.default.createElement("tr", null, columns.map(function (col, index) {
            return (react_1.default.createElement("th", { key: index, className: 'ant-table-header-node', style: { minWidth: col.width } }, react_1.default.createElement("div", { className: 'ant-table-cell-wrapper' }, col.title)));
        }))), react_1.default.createElement("tbody", null, dataSource.map(function (record, rowIndex) {
            return (react_1.default.createElement("tr", { key: rowIndex, className: 'ant-table-row' }, columns.map(function (col, colIndex) {
                return (react_1.default.createElement("td", { key: colIndex, className: 'ant-table-cell' }, _this.renderCell({
                    record: record,
                    col: col,
                    rowIndex: rowIndex
                })));
            })));
        }), this.renderPlacehodler(dataSource, columns)))));
    };
    Table.prototype.renderPlacehodler = function (dataSource, columns) {
        if (dataSource.length === 0) {
            return (react_1.default.createElement("tr", { className: 'ant-table-row' }, react_1.default.createElement("td", { className: 'ant-table-cell', colSpan: columns.length }, react_1.default.createElement("div", { className: 'ant-table-empty', style: { padding: 10 } }, react_1.default.createElement("img", { src: '//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg', style: { height: 60 } })))));
        }
    };
    Table.prototype.getColumns = function (children) {
        var columns = [];
        react_1.default.Children.forEach(children, function (child) {
            if (react_1.default.isValidElement(child)) {
                if (child.type === Column ||
                    child.type.displayName === '@schema-table-column') {
                    columns.push(child.props);
                }
            }
        });
        return columns;
    };
    Table.prototype.render = function () {
        var columns = this.getColumns(this.props.children);
        var dataSource = utils_1.toArr(this.props.dataSource);
        return (react_1.default.createElement("div", { className: this.props.className }, react_1.default.createElement("div", { className: 'ant-table zebra' }, react_1.default.createElement("div", { className: 'ant-table-inner' }, this.renderTable(columns, dataSource)))));
    };
    return Table;
}(react_1.Component)))(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  .ant-table {\n    position: relative;\n  }\n\n  .ant-table,\n  .ant-table *,\n  .ant-table :after,\n  .ant-table :before {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  .ant-table table {\n    border-collapse: collapse;\n    border-spacing: 0;\n    width: 100%;\n    background: #fff;\n    display: table !important;\n    margin: 0 !important;\n  }\n\n  .ant-table table tr:first-child td {\n    border-top-width: 0;\n  }\n\n  .ant-table th {\n    padding: 0;\n    background: #ebecf0;\n    color: #333;\n    text-align: left;\n    font-weight: 400;\n    min-width: 200px;\n    border: 1px solid #dcdee3;\n  }\n\n  .ant-table th .ant-table-cell-wrapper {\n    padding: 12px 16px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    word-break: break-all;\n  }\n\n  .ant-table td {\n    padding: 0;\n    border: 1px solid #dcdee3;\n  }\n\n  .ant-table td .ant-table-cell-wrapper {\n    padding: 12px 16px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    word-break: break-all;\n    display: flex;\n  }\n\n  .ant-table.zebra tr:nth-child(odd) td {\n    background: #fff;\n  }\n\n  .ant-table.zebra tr:nth-child(2n) td {\n    background: #f7f8fa;\n  }\n\n  .ant-table-empty {\n    color: #a0a2ad;\n    padding: 32px 0;\n    text-align: center;\n  }\n\n  .ant-table-row {\n    -webkit-transition: all 0.3s ease;\n    transition: all 0.3s ease;\n    background: #fff;\n    color: #333;\n    border: none !important;\n  }\n\n  .ant-table-row.hidden {\n    display: none;\n  }\n\n  .ant-table-row.hovered,\n  .ant-table-row.selected {\n    background: #f2f3f7;\n    color: #333;\n  }\n\n  .ant-table-body,\n  .ant-table-header {\n    overflow: auto;\n  }\n"], ["\n  .ant-table {\n    position: relative;\n  }\n\n  .ant-table,\n  .ant-table *,\n  .ant-table :after,\n  .ant-table :before {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  .ant-table table {\n    border-collapse: collapse;\n    border-spacing: 0;\n    width: 100%;\n    background: #fff;\n    display: table !important;\n    margin: 0 !important;\n  }\n\n  .ant-table table tr:first-child td {\n    border-top-width: 0;\n  }\n\n  .ant-table th {\n    padding: 0;\n    background: #ebecf0;\n    color: #333;\n    text-align: left;\n    font-weight: 400;\n    min-width: 200px;\n    border: 1px solid #dcdee3;\n  }\n\n  .ant-table th .ant-table-cell-wrapper {\n    padding: 12px 16px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    word-break: break-all;\n  }\n\n  .ant-table td {\n    padding: 0;\n    border: 1px solid #dcdee3;\n  }\n\n  .ant-table td .ant-table-cell-wrapper {\n    padding: 12px 16px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    word-break: break-all;\n    display: flex;\n  }\n\n  .ant-table.zebra tr:nth-child(odd) td {\n    background: #fff;\n  }\n\n  .ant-table.zebra tr:nth-child(2n) td {\n    background: #f7f8fa;\n  }\n\n  .ant-table-empty {\n    color: #a0a2ad;\n    padding: 32px 0;\n    text-align: center;\n  }\n\n  .ant-table-row {\n    -webkit-transition: all 0.3s ease;\n    transition: all 0.3s ease;\n    background: #fff;\n    color: #333;\n    border: none !important;\n  }\n\n  .ant-table-row.hidden {\n    display: none;\n  }\n\n  .ant-table-row.hovered,\n  .ant-table-row.selected {\n    background: #f2f3f7;\n    color: #333;\n  }\n\n  .ant-table-body,\n  .ant-table-header {\n    overflow: auto;\n  }\n"])));
var templateObject_1, templateObject_2;
