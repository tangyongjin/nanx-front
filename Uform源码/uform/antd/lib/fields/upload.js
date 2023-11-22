"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
var react_1 = __importDefault(require("react"));
var react_2 = require("@uform/react");
var button_1 = __importDefault(require("antd/lib/button"));
var upload_1 = __importDefault(require("antd/lib/upload"));
var icon_1 = __importDefault(require("antd/lib/icon"));
var styled_components_1 = __importDefault(require("styled-components"));
var utils_1 = require("../utils");
var UploadDragger = upload_1.default.Dragger;
var exts = [
    {
        ext: /\.docx?/i,
        icon: '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png'
    },
    {
        ext: /\.pptx?/i,
        icon: '//img.alicdn.com/tfs/TB1ItgWr_tYBeNjy1XdXXXXyVXa-200-200.png'
    },
    {
        ext: /\.jpe?g/i,
        icon: '//img.alicdn.com/tfs/TB1wrT5r9BYBeNjy0FeXXbnmFXa-200-200.png'
    },
    {
        ext: /pdf/i,
        icon: '//img.alicdn.com/tfs/TB1GwD8r9BYBeNjy0FeXXbnmFXa-200-200.png'
    },
    {
        ext: /\.png/i,
        icon: '//img.alicdn.com/tfs/TB1BHT5r9BYBeNjy0FeXXbnmFXa-200-200.png'
    },
    {
        ext: /\.eps/i,
        icon: '//img.alicdn.com/tfs/TB1G_iGrVOWBuNjy0FiXXXFxVXa-200-200.png'
    },
    {
        ext: /\.ai/i,
        icon: '//img.alicdn.com/tfs/TB1B2cVr_tYBeNjy1XdXXXXyVXa-200-200.png'
    },
    {
        ext: /\.gif/i,
        icon: '//img.alicdn.com/tfs/TB1DTiGrVOWBuNjy0FiXXXFxVXa-200-200.png'
    },
    {
        ext: /\.svg/i,
        icon: '//img.alicdn.com/tfs/TB1uUm9rY9YBuNjy0FgXXcxcXXa-200-200.png'
    },
    {
        ext: /\.xlsx?/i,
        icon: '//img.alicdn.com/tfs/TB1any1r1OSBuNjy0FdXXbDnVXa-200-200.png'
    },
    {
        ext: /\.psd?/i,
        icon: '//img.alicdn.com/tfs/TB1_nu1r1OSBuNjy0FdXXbDnVXa-200-200.png'
    },
    {
        ext: /\.(wav|aif|aiff|au|mp1|mp2|mp3|ra|rm|ram|mid|rmi)/i,
        icon: '//img.alicdn.com/tfs/TB1jPvwr49YBuNjy0FfXXXIsVXa-200-200.png'
    },
    {
        ext: /\.(avi|wmv|mpg|mpeg|vob|dat|3gp|mp4|mkv|rm|rmvb|mov|flv)/i,
        icon: '//img.alicdn.com/tfs/TB1FrT5r9BYBeNjy0FeXXbnmFXa-200-200.png'
    },
    {
        ext: /\.(zip|rar|arj|z|gz|iso|jar|ace|tar|uue|dmg|pkg|lzh|cab)/i,
        icon: '//img.alicdn.com/tfs/TB10jmfr29TBuNjy0FcXXbeiFXa-200-200.png'
    },
    {
        ext: /\..+/i,
        icon: '//img.alicdn.com/tfs/TB10.R4r3mTBuNjy1XbXXaMrVXa-200-200.png'
    }
];
var UploadPlaceholder = styled_components_1.default(function (props) {
    return (react_1.default.createElement("div", null, react_1.default.createElement(icon_1.default, { type: props.loading ? 'loading' : 'plus' }), react_1.default.createElement("div", { className: 'ant-upload-text' }, "\u4E0A\u4F20")));
})(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var testOpts = function (ext, options) {
    if (options && utils_1.isArr(options.include)) {
        return options.include.some(function (url) { return ext.test(url); });
    }
    if (options && utils_1.isArr(options.exclude)) {
        return !options.exclude.some(function (url) { return ext.test(url); });
    }
    return true;
};
var getImageByUrl = function (url, options) {
    for (var i = 0; i < exts.length; i++) {
        if (exts[i].ext.test(url) && testOpts(exts[i].ext, options)) {
            return exts[i].icon || url;
        }
    }
    return url;
};
var normalizeFileList = function (fileList) {
    if (fileList && fileList.length) {
        return fileList.map(function (file) {
            return __assign({ uid: file.uid, status: file.status, name: file.name, url: file.downloadURL || file.imgURL || file.url }, file.response, { thumbUrl: getImageByUrl(file.imgURL || file.downloadURL || file.url, {
                    exclude: ['.png', '.jpg', '.jpeg', '.gif']
                }) });
        });
    }
    return [];
};
var shallowClone = function (val) {
    var result = utils_1.isArr(val)
        ? val.slice() : typeof val === 'object'
        ? __assign({}, val) : val;
    if (utils_1.isArr(result)) {
        result = result.map(function (item) {
            return (__assign({}, item, { uid: item.uid ||
                    Math.random()
                        .toFixed(16)
                        .slice(2, 10) }));
        });
    }
    return result;
};
react_2.registerFormField('upload', react_2.connect({
    getProps: utils_1.mapStyledProps
})((_a = (function (_super) {
    __extends(Uploader, _super);
    function Uploader(props) {
        var _this = _super.call(this, props) || this;
        _this.onRemoveHandler = function (file) {
            var value = _this.state.value;
            var fileList = [];
            value.forEach(function (item) {
                if (item.uid !== file.uid) {
                    fileList.push(item);
                }
            });
            _this.props.onChange(fileList);
        };
        _this.onChangeHandler = function (_a) {
            var fileList = _a.fileList;
            var onChange = _this.props.onChange;
            fileList = utils_1.toArr(fileList);
            if (fileList.every(function (file) {
                if (file.status === 'done' ||
                    file.imgURL ||
                    file.downloadURL ||
                    file.url ||
                    file.thumbUrl)
                    return true;
                if (file.response) {
                    if (file.response.imgURL ||
                        file.response.downloadURL ||
                        file.response.url ||
                        file.response.thumbUrl)
                        return true;
                }
                return false;
            }) &&
                fileList.length) {
                fileList = normalizeFileList(fileList);
                _this.setState({
                    value: fileList
                }, function () {
                    onChange(fileList.length > 0 ? fileList : undefined);
                });
            }
            else {
                _this.setState({
                    value: fileList
                });
            }
        };
        _this.state = {
            value: shallowClone(utils_1.toArr(props.value))
        };
        return _this;
    }
    Uploader.prototype.componentDidUpdate = function (preProps) {
        if (this.props.value && !utils_1.isEqual(this.props.value, preProps.value)) {
            this.setState({
                value: shallowClone(this.props.value)
            });
        }
    };
    Uploader.prototype.render = function () {
        var _a = this.props, listType = _a.listType, locale = _a.locale, onChange = _a.onChange, value = _a.value, others = __rest(_a, ["listType", "locale", "onChange", "value"]);
        if (listType.indexOf('card') > -1) {
            return (react_1.default.createElement(upload_1.default, __assign({}, others, { fileList: this.state.value, onChange: this.onChangeHandler, onRemove: this.onRemoveHandler, listType: 'picture-card' }), react_1.default.createElement(UploadPlaceholder, null)));
        }
        if (listType.indexOf('dragger') > -1) {
            return (react_1.default.createElement(UploadDragger, __assign({}, others, { fileList: this.state.value, onChange: this.onChangeHandler, onRemove: this.onRemoveHandler, listType: listType.indexOf('image') > -1 ? 'picture' : 'text' }), react_1.default.createElement("p", { className: 'ant-upload-drag-icon' }, react_1.default.createElement(icon_1.default, { type: 'inbox' })), react_1.default.createElement("p", { className: 'ant-upload-text' }, "\u62D6\u62FD\u4E0A\u4F20")));
        }
        return (react_1.default.createElement(upload_1.default, __assign({}, others, { fileList: this.state.value, onChange: this.onChangeHandler, onRemove: this.onRemoveHandler, listType: listType }), react_1.default.createElement(button_1.default, { style: { margin: '0 0 10px' } }, react_1.default.createElement(icon_1.default, { type: 'upload' }), (locale && locale.uploadText) || '上传文件')));
    };
    return Uploader;
}(react_1.default.Component)),
    _a.defaultProps = {
        action: 'https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload',
        listType: 'text',
        multiple: true,
        className: 'antd-uploader'
    },
    _a)));
var templateObject_1;
