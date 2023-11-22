"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var camel_case_1 = __importDefault(require("camel-case"));
exports.camelCase = camel_case_1.default;
exports.lowercase = function (str) { return String(str || '').toLowerCase(); };
