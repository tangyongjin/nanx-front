"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../shared/core");
var form_1 = require("./form");
exports.default = (function () {
    core_1.registerFormWrapper(form_1.StateForm());
});
