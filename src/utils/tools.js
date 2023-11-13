export function splitDate(text) {
    if (!text) {
        return text;
    }
    let arr = text.split(' ');
    return arr[0];
}

export function randomString(string_length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

export function formattingParams(paramsString) {
    //格式化表单参数
    var theRequest = {};
    paramsString = paramsString.split('&');
    for (var i = 0; i < paramsString.length; i++) {
        theRequest[paramsString[i].split('=')[0]] = unescape(paramsString[i].split('=')[1]);
    }
    return theRequest;
}

export function formatDate(date) {
    //返回 2017-10-26
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
export function newformatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (second < 10) {
        second = '0' + second;
    }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
}

export function getMaxRowKey(data) {
    return data.length == 0
        ? 1
        : Math.max.apply(
              Math,
              data.map((item) => item.key)
          ) + 1;
}

export function validate(validateFields, data, message) {
    for (let i = 0; i < validateFields.length; i++) {
        let item = validateFields[i];
        let errorText = item.errorText ? item.errorText : item.title + '格式错误';
        let emptyText = item.emptyText ? item.emptyText : item.title + '不能为空！';
        // 非空验证
        if ((data[item.key] === '' || data[item.key] === undefined) && item.require == 'yes') {
            message.error(emptyText);
            return false;
        }
        if (data[item.key] instanceof Array && item.require == 'yes' && data[item.key].length === 0) {
            message.error(emptyText);
            return false;
        }
        if (
            Object.prototype.toString.call(data[item.key])[1] === 'Object' &&
            item.require == 'yes' &&
            JSON.stringify(data[item.key]) === '{}'
        ) {
            message.error(emptyText);
            return false;
        }
        // 正则验证
        if (item.reg && !item.reg.test(data[item.key])) {
            message.error(errorText);
            return false;
        }
    }
    return true;
}

export function color() {}

export function shape() {}

export function getTargetMenuKey(url) {
    let hashLocation = url.indexOf('?_k=');
    let end_string = url.slice(hashLocation + 4);
    let sessionKey = '@@History/' + end_string;
    let sessionValue = JSON.parse(sessionStorage.getItem(sessionKey));
    if (sessionValue) {
        return sessionValue.key;
    } else {
        return null;
    }
}
