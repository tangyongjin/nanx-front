"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("@uform/validator");
exports.setValidationLocale = validator_1.setLocale;
exports.setValidationLanguage = validator_1.setLanguage;
var form_1 = require("./form");
exports.Form = form_1.Form;
var utils_1 = require("./utils");
exports.calculateSchemaInitialValues = utils_1.calculateSchemaInitialValues;
__export(require("./path"));
exports.createForm = function (_a) {
    var initialValues = _a.initialValues, values = _a.values, onSubmit = _a.onSubmit, onReset = _a.onReset, schema = _a.schema, onFormChange = _a.onFormChange, onFieldChange = _a.onFieldChange, onFormWillInit = _a.onFormWillInit, subscribes = _a.subscribes, editable = _a.editable, effects = _a.effects, onValidateFailed = _a.onValidateFailed, traverse = _a.traverse;
    var fields = [];
    var calculatedValues = utils_1.calculateSchemaInitialValues(schema, utils_1.isEmpty(values) ? utils_1.clone(initialValues) : utils_1.clone(values), function (_a, schema, value) {
        var name = _a.name, path = _a.path, schemaPath = _a.schemaPath;
        fields.push({ name: name, path: path, schemaPath: schemaPath, schema: schema, value: value });
    });
    if (utils_1.isEmpty(values)) {
        initialValues = calculatedValues;
    }
    else {
        values = calculatedValues;
    }
    var form = new form_1.Form({
        initialValues: initialValues,
        values: values,
        onSubmit: onSubmit,
        onReset: onReset,
        subscribes: subscribes,
        onFormChange: onFormChange,
        onFieldChange: onFieldChange,
        editable: editable,
        effects: effects,
        onValidateFailed: onValidateFailed,
        schema: schema,
        traverse: traverse
    });
    if (utils_1.isFn(onFormWillInit)) {
        onFormWillInit(form);
    }
    fields = fields.map(function (_a) {
        var name = _a.name, schemaPath = _a.schemaPath, schema = _a.schema;
        return form.registerField(name || schemaPath.join('.'), {
            path: schemaPath,
            props: schema
        });
    });
    form.syncUpdate(function () {
        form.dispatchEffect('onFormInit', form.publishState());
        utils_1.each(fields, function (field) {
            form.dispatchEffect('onFieldChange', field.publishState());
        }, true);
    });
    return form;
};
exports.default = exports.createForm;
