"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NEWER = Symbol('newer');
var OLDER = Symbol('older');
function LRUMap(limit, entries) {
    if (typeof limit !== 'number') {
        entries = limit;
        limit = 0;
    }
    this.size = 0;
    this.limit = limit;
    this.oldest = this.newest = undefined;
    this._keymap = new Map();
    if (entries) {
        this.assign(entries);
        if (limit < 1) {
            this.limit = this.size;
        }
    }
}
exports.LRUMap = LRUMap;
function Entry(key, value) {
    this.key = key;
    this.value = value;
    this[NEWER] = undefined;
    this[OLDER] = undefined;
}
LRUMap.prototype._markEntryAsUsed = function (entry) {
    if (entry === this.newest) {
        return;
    }
    if (entry[NEWER]) {
        if (entry === this.oldest) {
            this.oldest = entry[NEWER];
        }
        entry[NEWER][OLDER] = entry[OLDER];
    }
    if (entry[OLDER]) {
        entry[OLDER][NEWER] = entry[NEWER];
    }
    entry[NEWER] = undefined;
    entry[OLDER] = this.newest;
    if (this.newest) {
        this.newest[NEWER] = entry;
    }
    this.newest = entry;
};
LRUMap.prototype.assign = function (entries) {
    var entry;
    var limit = this.limit || Number.MAX_VALUE;
    this._keymap.clear();
    var it = entries[Symbol.iterator]();
    for (var itv = it.next(); !itv.done; itv = it.next()) {
        var e = new Entry(itv.value[0], itv.value[1]);
        this._keymap.set(e.key, e);
        if (!entry) {
            this.oldest = e;
        }
        else {
            entry[NEWER] = e;
            e[OLDER] = entry;
        }
        entry = e;
        if (limit-- === 0) {
            throw new Error('overflow');
        }
    }
    this.newest = entry;
    this.size = this._keymap.size;
};
LRUMap.prototype.get = function (key) {
    var entry = this._keymap.get(key);
    if (!entry) {
        return;
    }
    this._markEntryAsUsed(entry);
    return entry.value;
};
LRUMap.prototype.set = function (key, value) {
    var entry = this._keymap.get(key);
    if (entry) {
        entry.value = value;
        this._markEntryAsUsed(entry);
        return this;
    }
    this._keymap.set(key, (entry = new Entry(key, value)));
    if (this.newest) {
        this.newest[NEWER] = entry;
        entry[OLDER] = this.newest;
    }
    else {
        this.oldest = entry;
    }
    this.newest = entry;
    ++this.size;
    if (this.size > this.limit) {
        this.shift();
    }
    return this;
};
LRUMap.prototype.shift = function () {
    var entry = this.oldest;
    if (entry) {
        if (this.oldest[NEWER]) {
            this.oldest = this.oldest[NEWER];
            this.oldest[OLDER] = undefined;
        }
        else {
            this.oldest = undefined;
            this.newest = undefined;
        }
        entry[NEWER] = entry[OLDER] = undefined;
        this._keymap.delete(entry.key);
        --this.size;
        return [entry.key, entry.value];
    }
};
LRUMap.prototype.find = function (key) {
    var e = this._keymap.get(key);
    return e ? e.value : undefined;
};
LRUMap.prototype.has = function (key) {
    return this._keymap.has(key);
};
LRUMap.prototype.delete = function (key) {
    var entry = this._keymap.get(key);
    if (!entry) {
        return;
    }
    this._keymap.delete(entry.key);
    if (entry[NEWER] && entry[OLDER]) {
        entry[OLDER][NEWER] = entry[NEWER];
        entry[NEWER][OLDER] = entry[OLDER];
    }
    else if (entry[NEWER]) {
        entry[NEWER][OLDER] = undefined;
        this.oldest = entry[NEWER];
    }
    else if (entry[OLDER]) {
        entry[OLDER][NEWER] = undefined;
        this.newest = entry[OLDER];
    }
    else {
        this.oldest = this.newest = undefined;
    }
    this.size--;
    return entry.value;
};
LRUMap.prototype.clear = function () {
    this.oldest = this.newest = undefined;
    this.size = 0;
    this._keymap.clear();
};
function EntryIterator(oldestEntry) {
    this.entry = oldestEntry;
}
EntryIterator.prototype[Symbol.iterator] = function () {
    return this;
};
EntryIterator.prototype.next = function () {
    var ent = this.entry;
    if (ent) {
        this.entry = ent[NEWER];
        return { done: false, value: [ent.key, ent.value] };
    }
    else {
        return { done: true, value: undefined };
    }
};
function KeyIterator(oldestEntry) {
    this.entry = oldestEntry;
}
KeyIterator.prototype[Symbol.iterator] = function () {
    return this;
};
KeyIterator.prototype.next = function () {
    var ent = this.entry;
    if (ent) {
        this.entry = ent[NEWER];
        return { done: false, value: ent.key };
    }
    else {
        return { done: true, value: undefined };
    }
};
function ValueIterator(oldestEntry) {
    this.entry = oldestEntry;
}
ValueIterator.prototype[Symbol.iterator] = function () {
    return this;
};
ValueIterator.prototype.next = function () {
    var ent = this.entry;
    if (ent) {
        this.entry = ent[NEWER];
        return { done: false, value: ent.value };
    }
    else {
        return { done: true, value: undefined };
    }
};
LRUMap.prototype.keys = function () {
    return new KeyIterator(this.oldest);
};
LRUMap.prototype.values = function () {
    return new ValueIterator(this.oldest);
};
LRUMap.prototype.entries = function () {
    return this;
};
LRUMap.prototype[Symbol.iterator] = function () {
    return new EntryIterator(this.oldest);
};
LRUMap.prototype.forEach = function (fun, thisObj) {
    if (typeof thisObj !== 'object') {
        thisObj = this;
    }
    var entry = this.oldest;
    while (entry) {
        fun.call(thisObj, entry.value, entry.key, this);
        entry = entry[NEWER];
    }
};
LRUMap.prototype.toJSON = function () {
    var s = new Array(this.size);
    var i = 0;
    var entry = this.oldest;
    while (entry) {
        s[i++] = { key: entry.key, value: entry.value };
        entry = entry[NEWER];
    }
    return s;
};
LRUMap.prototype.toString = function () {
    var s = '';
    var entry = this.oldest;
    while (entry) {
        s += String(entry.key) + ':' + entry.value;
        entry = entry[NEWER];
        if (entry) {
            s += ' < ';
        }
    }
    return s;
};
