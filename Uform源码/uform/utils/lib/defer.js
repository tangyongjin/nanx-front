"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = function () {
    var internalResolve;
    var internalReject;
    var promise = new Promise(function (resolve, reject) {
        internalResolve = resolve;
        internalReject = reject;
    });
    return {
        promise: promise,
        resolve: internalResolve,
        reject: internalReject
    };
};
