export function isEmpty(value) {
    return typeof value === 'undefined' || value === null;
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

export function getAllKeys(menuData) {
    let keys = [];

    function extractKeys(menuItem) {
        if (menuItem.children && menuItem.children.length == 0) {
            keys.push(menuItem.key);
        }

        if (!menuItem.children) {
            keys.push(menuItem.key);
        }

        if (menuItem.children && menuItem.children.length > 0) {
            menuItem.children.forEach((child) => {
                extractKeys(child);
            });
        }
    }

    menuData.forEach((item) => {
        extractKeys(item);
    });

    return keys;
}

export function findMenuPath(menu, key) {
    const findPath = (menu, key, path) => {
        for (let i = 0; i < menu.length; i++) {
            const item = menu[i];
            path.push(item);
            if (item.key === key) {
                return path;
            }
            if (item.children) {
                const foundPath = findPath(item.children, key, path);
                if (foundPath) {
                    return foundPath;
                }
            }
            path.pop();
        }
    };

    const path = [];
    const result = findPath(menu, key, path);
    if (typeof result === 'undefined') {
        return [];
    } else {
        return result;
    }
}

export function tryParseJSON(str) {
    if (isEmpty(str)) {
        return null;
    }

    if (str.length == 0) {
        return null;
    }

    if (str.length == 1) {
        return null;
    }

    try {
        const parsedJSON = JSON.parse(str);
        return parsedJSON;
    } catch (error) {
        console.log('Error parsing JSON:', error);
        return null; // or handle the error in some way
    }
}

export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
