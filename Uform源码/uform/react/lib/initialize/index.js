"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_1 = __importDefault(require("./object"));
var render_1 = __importDefault(require("./render"));
var virtualbox_1 = __importDefault(require("./virtualbox"));
var core_1 = require("../shared/core");
var state_1 = __importDefault(require("../state"));
exports.default = (function () {
    core_1.initialContainer();
    state_1.default();
    object_1.default();
    render_1.default();
    virtualbox_1.default();
});
