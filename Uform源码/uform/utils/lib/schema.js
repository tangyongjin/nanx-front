"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array_1 = require("./array");
var accessor_1 = require("./accessor");
var types_1 = require("@uform/types");
var isEmpty_1 = require("./isEmpty");
var numberRE = /^\d+$/;
var VIRTUAL_BOXES = {};
exports.getSchemaNodeFromPath = function (schema, path) {
    var res = schema;
    var suc = 0;
    path = array_1.toArr(path);
    for (var i = 0; i < path.length; i++) {
        var key = path[i];
        if (res && !isEmpty_1.isEmpty(res.properties)) {
            res = res.properties[key];
            suc++;
        }
        else if (res && !isEmpty_1.isEmpty(res.items) && numberRE.test(key)) {
            res = res.items;
            suc++;
        }
    }
    return suc === path.length ? res : undefined;
};
exports.schemaIs = function (schema, type) {
    return schema && schema.type === type;
};
exports.isVirtualBox = function (name) {
    return !!VIRTUAL_BOXES[name];
};
exports.registerVirtualboxFlag = function (name) {
    VIRTUAL_BOXES[name] = true;
};
var isVirtualBoxSchema = function (schema) {
    return exports.isVirtualBox(schema.type) || exports.isVirtualBox(schema['x-component']);
};
var schemaTraverse = function (schema, callback, path, schemaPath) {
    if (path === void 0) { path = []; }
    if (schemaPath === void 0) { schemaPath = []; }
    if (schema) {
        if (isVirtualBoxSchema(schema)) {
            path = path.slice(0, path.length - 1);
        }
        callback(schema, { path: path, schemaPath: schemaPath });
        if (exports.schemaIs(schema, 'object') || schema.properties) {
            array_1.each(schema.properties, function (subSchema, key) {
                schemaTraverse(subSchema, callback, path.concat(key), schemaPath.concat(key));
            });
        }
        else if (exports.schemaIs(schema, 'array') || schema.items) {
            if (schema.items) {
                callback(schema.items, function (key) {
                    schemaTraverse(schema.items, callback, path.concat(key), schemaPath.concat(key));
                }, path);
            }
        }
    }
};
exports.calculateSchemaInitialValues = function (schema, initialValues, callback) {
    initialValues = initialValues || schema.default || {};
    schemaTraverse(schema, function (subSchema, $path, parentPath) {
        var defaultValue = subSchema.default;
        if (types_1.isFn($path) && parentPath) {
            array_1.each(array_1.toArr(accessor_1.getIn(initialValues, parentPath)), function (value, index) {
                $path(index);
            });
        }
        else if ($path) {
            var isVirtualBoxInstance = isVirtualBoxSchema(subSchema);
            var name_1 = isVirtualBoxInstance
                ? $path.schemaPath.join('.')
                : $path.path.join('.');
            var path = isVirtualBoxInstance ? $path.schemaPath : $path.path;
            var schemaPath = $path.schemaPath;
            var initialValue = accessor_1.getIn(initialValues, name_1);
            var value = !isEmpty_1.isEmpty(initialValue) ? initialValue : defaultValue;
            if (!isEmpty_1.isEmpty(value)) {
                accessor_1.setIn(initialValues, name_1, value);
            }
            if (callback && types_1.isFn(callback)) {
                var newPath = {
                    name: name_1,
                    path: path,
                    schemaPath: schemaPath
                };
                callback(newPath, subSchema, value);
            }
        }
    });
    return initialValues;
};
