import moment from 'moment';
import IconWrapper from '@/utils/IconWrapper';

export function isEmpty(value) {
    return typeof value === 'undefined' || value === null;
}

export function nowString() {
    const now = moment();
    const timeString = now.format('HH:mm:ss');
    return timeString;
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
    // let hashLocation = url.indexOf('?_k=');
    // let end_string = url.slice(hashLocation + 4);
    // let sessionKey = '@@History/' + end_string;
    // let sessionValue = JSON.parse(sessionStorage.getItem(sessionKey));
    // if (sessionValue) {
    //     return sessionValue.key;
    // } else {
    //     return null;
    // }
    const params = new URLSearchParams(url);
    const menuKey = params.get('key');
    return menuKey;
}

export function findItemByKey(menuArray, key) {
    console.log('所有的>>>,寻找可以>>>>>: ', menuArray, key);

    for (const item of menuArray) {
        if (item.key === key) {
            return item; // 返回找到的项
        }

        // 如果有子项，递归查找
        if (item.children && item.children.length > 0) {
            const foundInChildren = findItemByKey(item.children, key);
            if (foundInChildren) {
                return foundInChildren; // 返回找到的子项
            }
        }
    }
    // 如果未找到匹配项，返回 null 或适当的值
    return null;
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

export function findMenuPath(RoleBasedMenuList, currentMenukey) {
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

    let path = [];
    const result = findPath(RoleBasedMenuList, currentMenukey, path);
    if (typeof result === 'undefined') {
        return [];
    } else {
        return result;
    }
}

// 登录后的第一个路由.暂时定位第一个原素
export function getDefaultMenuItem(menus) {
    let defaultMenuItem = menus[0];
    console.log('💜💜💜💜💜💜💜defaultMenuItem: ', defaultMenuItem);
    return defaultMenuItem;
}

export function menuTransformer(menuList) {
    function transformMenuArray(menuArray) {
        return menuArray.map((item) => {
            const { key, children, title, menu, icon, router, datagrid_code } = item;
            const transformedItem = {
                key,
                icon: IconWrapper(icon),
                ...(children && children.length > 0 && { children: transformMenuArray(children) }),
                label: title,
                menu,
                router,
                datagrid_code,
                type: null
            };
            return transformedItem;
        });
    }
    let _mit = transformMenuArray(menuList);
    return _mit;
}
