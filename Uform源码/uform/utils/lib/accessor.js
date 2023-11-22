"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@uform/types");
var array_1 = require("./array");
var lru_1 = require("./lru");
function whitespace(c) {
    return c === ' ' || c === '\n' || c === '\t' || c === '\f' || c === '\r';
}
function toString(val) {
    if (!val) {
        return '';
    }
    if (types_1.isArr(val)) {
        return val.join('.');
    }
    return types_1.isStr(val) ? val : '';
}
var PathCache = new lru_1.LRUMap(1000);
function getPathSegments(path) {
    if (types_1.isArr(path)) {
        return path;
    }
    if (types_1.isStr(path) && path) {
        var cached = PathCache.get(path);
        if (cached) {
            return cached;
        }
        var pathArr = path.split('.');
        var parts = [];
        for (var i = 0; i < pathArr.length; i++) {
            var p = pathArr[i];
            while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
                p = p.slice(0, -1) + '.';
                p += pathArr[++i];
            }
            parts.push(p);
        }
        PathCache.set(path, parts);
        return parts;
    }
    if (types_1.isNum(path)) {
        return [path];
    }
    return [];
}
exports.getPathSegments = getPathSegments;
var DestructTokenizer = (function () {
    function DestructTokenizer(text, handlers) {
        this.text = text;
        this.index = 0;
        this.handlers = handlers;
        this.state = this.processNameStart;
        this.declareNameStart = 0;
        this.declareNameEnd = 0;
        this.nbraceCount = 0;
        this.nbracketCount = 0;
    }
    DestructTokenizer.prototype.parse = function () {
        var char = '';
        var prev = '';
        var l = this.text.length;
        for (; this.index < l; this.index++) {
            char = this.text.charAt(this.index);
            this.EOF = l - 1 === this.index;
            this.state(char, prev);
            prev = char;
        }
    };
    DestructTokenizer.prototype.processNameStart = function (char) {
        if (char === '{' || char === '[') {
            this.state = this.processDestructStart;
            this.index--;
        }
        else if (!whitespace(char)) {
            this.declareNameStart = this.index;
            this.state = this.processName;
        }
    };
    DestructTokenizer.prototype.processName = function (char, prev) {
        if (whitespace(char)) {
            this.declareNameEnd = this.index;
            this.handlers.name(this.getName());
        }
        else if (this.EOF) {
            this.declareNameEnd = this.index + 1;
            this.handlers.name(this.getName());
        }
    };
    DestructTokenizer.prototype.processDestructStart = function (char) {
        if (char === '{') {
            this.nbraceCount++;
            this.handlers.destructObjectStart();
        }
        else if (char === '[') {
            this.nbracketCount++;
            this.handlers.destructArrayStart();
        }
        else if (!whitespace(char)) {
            this.state = this.processDestructKey;
            this.destructKeyStart = this.index;
            this.index--;
        }
    };
    DestructTokenizer.prototype.processDestructKey = function (char, prev) {
        if (char === '}') {
            this.nbraceCount--;
            if (this.nbraceCount || this.nbracketCount) {
                this.state = this.processDestructStart;
            }
            if (!whitespace(prev)) {
                this.destructKey = this.text.substring(this.destructKeyStart, this.index);
            }
            this.handlers.destructKey(this.destructKey);
            this.handlers.destructObjectEnd();
            if (!this.nbraceCount && !this.nbracketCount) {
                this.index = this.text.length;
            }
        }
        else if (char === ']') {
            this.nbracketCount--;
            if (this.nbraceCount || this.nbracketCount) {
                this.state = this.processDestructStart;
            }
            if (!whitespace(prev)) {
                this.destructKey = this.text.substring(this.destructKeyStart, this.index);
            }
            this.handlers.destructKey(this.destructKey);
            this.handlers.destructArrayEnd();
            if (!this.nbraceCount && !this.nbracketCount) {
                this.index = this.text.length;
            }
        }
        else if (whitespace(char) || char === ':' || char === ',') {
            if (!whitespace(prev)) {
                this.destructKey = this.text.substring(this.destructKeyStart, this.index);
            }
            if (!whitespace(char)) {
                this.state = this.processDestructStart;
                this.handlers.destructKey(this.destructKey, char === ':');
            }
        }
    };
    DestructTokenizer.prototype.getName = function () {
        return this.text.substring(this.declareNameStart, this.declareNameEnd);
    };
    return DestructTokenizer;
}());
var parseDestruct = function (str) {
    if (!types_1.isStr(str)) {
        return str;
    }
    var destruct;
    var stack = [];
    var token = '';
    var realKey = '';
    var lastDestruct;
    var root;
    new DestructTokenizer(str, {
        name: function (key) {
            root = key;
        },
        destructKey: function (key, readyReplace) {
            if (!key) {
                return;
            }
            token = key;
            if (readyReplace) {
                realKey = key;
                lastDestruct = destruct;
                return;
            }
            if (types_1.isArr(destruct)) {
                ;
                destruct.push(key);
            }
            else if (types_1.isPlainObj(destruct)) {
                destruct[realKey && lastDestruct === destruct ? realKey : key] = key;
            }
            realKey = '';
            lastDestruct = destruct;
        },
        destructArrayStart: function () {
            if (!destruct) {
                root = [];
                destruct = root;
            }
            else {
                destruct = [];
            }
            var tail = stack[stack.length - 1];
            if (types_1.isPlainObj(tail)) {
                tail[token] = destruct;
            }
            else if (types_1.isArr(tail)) {
                tail.push(destruct);
            }
            stack.push(destruct);
        },
        destructObjectStart: function () {
            if (!destruct) {
                root = {};
                destruct = root;
            }
            else {
                destruct = {};
            }
            var tail = stack[stack.length - 1];
            if (types_1.isPlainObj(tail)) {
                tail[token] = destruct;
            }
            else if (types_1.isArr(tail)) {
                tail.push(destruct);
            }
            stack.push(destruct);
        },
        destructArrayEnd: function () {
            stack.pop();
            destruct = stack[stack.length - 1];
        },
        destructObjectEnd: function () {
            stack.pop();
            destruct = stack[stack.length - 1];
        }
    }).parse();
    return root;
};
exports.parseDestruct = parseDestruct;
var traverse = function (obj, callback) {
    var internalTraverse = function (internalObj, path) {
        if (types_1.isStr(internalObj)) {
            return callback(internalObj, internalObj);
        }
        array_1.each(internalObj, function (item, key) {
            var newPath = path.concat(key);
            if (types_1.isArr(item) || types_1.isPlainObj(item)) {
                internalTraverse(item, newPath);
            }
            else {
                callback(newPath, item);
            }
        });
    };
    return internalTraverse(obj, []);
};
var mapReduce = function (obj, callback) {
    var internalTraverse = function (internalObj, path) {
        return array_1.map(internalObj, function (item, key) {
            var newPath = path.concat(key);
            if (types_1.isArr(item) || types_1.isPlainObj(item)) {
                return internalTraverse(item, newPath);
            }
            else {
                return callback(newPath, newPath.slice(0, newPath.length - 1).concat(item));
            }
        });
    };
    return internalTraverse(obj, []);
};
var parseDesturctPath = function (path) {
    var newPath = getPathSegments(path);
    var lastKey = newPath[newPath.length - 1];
    var startPath = newPath.slice(0, newPath.length - 1);
    var destruct = parseDestruct(lastKey);
    return {
        path: newPath,
        lastKey: lastKey,
        startPath: startPath,
        destruct: destruct
    };
};
exports.parseDesturctPath = parseDesturctPath;
var parsePaths = function (path) {
    var result = [];
    var parsed = parseDesturctPath(path);
    if (types_1.isStr(parsed.destruct)) {
        return path;
    }
    else if (parsed.destruct) {
        traverse(parsed.destruct, function (internalPath, key) {
            result.push({
                path: parsed.startPath.concat(internalPath),
                startPath: parsed.startPath,
                endPath: internalPath,
                key: key
            });
        });
        return result;
    }
    else {
        return path;
    }
};
exports.parsePaths = parsePaths;
var resolveGetIn = function (get) {
    var cache = new Map();
    return function (obj, path, value) {
        var ast = null;
        if (!cache.get(path)) {
            ast = parseDesturctPath(path);
            cache.set(path, ast);
        }
        else {
            ast = cache.get(path);
        }
        if (!types_1.isArr(ast.destruct) && !types_1.isPlainObj(ast.destruct)) {
            return get(obj, path, value);
        }
        return mapReduce(ast.destruct, function (mapPath, key) {
            return get(obj, ast.startPath.concat(key[key.length - 1]));
        });
    };
};
var resolveUpdateIn = function (update, internalGetIn) {
    var cache = new Map();
    return function (obj, path, value, getSchema) {
        var paths = [];
        if (!cache.get(path)) {
            paths = parsePaths(path);
            cache.set(path, paths);
        }
        else {
            paths = cache.get(path);
        }
        if (!types_1.isArr(paths)) {
            return update(obj, path, value, getSchema);
        }
        if (paths && paths.length) {
            array_1.each(paths, function (_a) {
                var mapPath = _a.mapPath, key = _a.key, startPath = _a.startPath, endPath = _a.endPath;
                update(obj, startPath.concat(key), internalGetIn(value, endPath), getSchema);
            });
        }
        return obj;
    };
};
var resolveExistIn = function (has) {
    var cache = new Map();
    return function (obj, path) {
        var paths = [];
        if (!cache.get(path)) {
            paths = parsePaths(path);
            cache.set(path, paths);
        }
        else {
            paths = cache.get(path);
        }
        if (!types_1.isArr(paths)) {
            return has(obj, path);
        }
        if (paths && paths.length) {
            return array_1.every(paths, function (_a) {
                var startPath = _a.startPath, key = _a.key;
                return has(obj, startPath.concat(key));
            });
        }
        return false;
    };
};
function _getIn(obj, path, value) {
    if (!types_1.isObj(obj) || !path) {
        return obj;
    }
    path = toString(path);
    if (path in obj) {
        return obj[path];
    }
    var pathArr = getPathSegments(path);
    for (var i = 0; i < pathArr.length; i++) {
        if (!Object.prototype.propertyIsEnumerable.call(obj, pathArr[i])) {
            return value;
        }
        obj = obj[pathArr[i]];
        if (obj === undefined || obj === null) {
            if (i !== pathArr.length - 1) {
                return value;
            }
            break;
        }
    }
    return obj;
}
function _setIn(obj, path, value, getSchema) {
    if (!types_1.isObj(obj) || !path) {
        return;
    }
    path = toString(path);
    if (path in obj) {
        obj[path] = value;
        return;
    }
    var pathArr = getPathSegments(path);
    for (var i = 0; i < pathArr.length; i++) {
        var p = pathArr[i];
        if (!types_1.isObj(obj[p])) {
            if (obj[p] === undefined && value === undefined) {
                return;
            }
            if (/^\d+$/.test(pathArr[i + 1 + ''])) {
                if (getSchema) {
                    var schema = getSchema(pathArr.slice(0, i));
                    if (!schema || schema.type === 'array') {
                        obj[p] = [];
                    }
                    else {
                        obj[p] = {};
                    }
                }
                else {
                    obj[p] = [];
                }
            }
            else {
                obj[p] = {};
            }
        }
        if (i === pathArr.length - 1) {
            obj[p] = value;
        }
        obj = obj[p];
    }
}
function _deleteIn(obj, path) {
    if (!types_1.isObj(obj) || !path) {
        return;
    }
    path = toString(path);
    if (path in obj) {
        delete obj[path];
        return;
    }
    var pathArr = getPathSegments(path);
    for (var i = 0; i < pathArr.length; i++) {
        var p = pathArr[i];
        if (i === pathArr.length - 1) {
            if (types_1.isArr(obj)) {
                obj.splice(p, 1);
            }
            else {
                delete obj[p];
            }
            return;
        }
        obj = obj[p];
        if (!types_1.isObj(obj)) {
            return;
        }
    }
}
function _existIn(obj, path) {
    if (!types_1.isObj(obj) || !path) {
        return false;
    }
    path = toString(path);
    if (path in obj) {
        return true;
    }
    var pathArr = getPathSegments(path);
    for (var i = 0; i < pathArr.length; i++) {
        if (types_1.isObj(obj)) {
            if (!(pathArr[i] in obj)) {
                return false;
            }
            obj = obj[pathArr[i]];
        }
        else {
            return false;
        }
    }
    return true;
}
exports.getIn = resolveGetIn(_getIn);
exports.setIn = resolveUpdateIn(_setIn, exports.getIn);
exports.deleteIn = resolveUpdateIn(_deleteIn, exports.getIn);
exports.existIn = resolveExistIn(_existIn);
