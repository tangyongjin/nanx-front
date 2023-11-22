"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@uform/types");
var array_1 = require("./array");
var noop = function () { return undefined; };
var Broadcast = (function () {
    function Broadcast() {
        this.entries = [];
        this.buffer = [];
    }
    Broadcast.prototype.subscribe = function (subscriber, subscription) {
        var _this = this;
        if (!types_1.isFn(subscriber)) {
            return noop;
        }
        var index = this.entries.length;
        this.entries.push({
            subscriber: subscriber,
            subscription: subscription
        });
        this.flushBuffer(this.entries[index]);
        return function () {
            _this.entries.splice(index, 1);
        };
    };
    Broadcast.prototype.unsubscribe = function () {
        this.entries.length = 0;
        this.buffer.length = 0;
    };
    Broadcast.prototype.flushBuffer = function (_a) {
        var subscriber = _a.subscriber, subscription = _a.subscription;
        array_1.each(this.buffer, function (_a) {
            var payload = _a.payload, filter = _a.filter;
            if (types_1.isFn(filter)) {
                var notification = filter(payload, subscription);
                if (notification !== undefined) {
                    subscriber(notification);
                }
            }
            else {
                subscriber(payload, subscription);
            }
        });
    };
    Broadcast.prototype.notify = function (payload, filter) {
        if (this.length === 0) {
            this.buffer.push({ payload: payload, filter: filter });
            return;
        }
        array_1.each(this.entries, function (_a) {
            var subscriber = _a.subscriber, subscription = _a.subscription;
            if (types_1.isFn(filter)) {
                var notification = filter(payload, subscription);
                if (notification !== undefined) {
                    subscriber(notification);
                }
            }
            else {
                subscriber(payload, subscription);
            }
        });
        this.buffer.length = 0;
    };
    return Broadcast;
}());
exports.Broadcast = Broadcast;
