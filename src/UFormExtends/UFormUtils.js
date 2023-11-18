import { Select } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn'); // 全局使用简体中文
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

const mapStyledProps = () => {};

const compose = (...args) => {
    return (payload, ...extra) => {
        return args.reduce((buf, fn) => {
            return buf !== undefined ? fn(buf, ...extra) : fn(payload, ...extra);
        }, payload);
    };
};

const acceptEnum = (component: React.JSXElementConstructor<any>) => {
    return ({ dataSource, ...others }) => {
        if (dataSource) {
            return React.createElement(Select, { dataSource, ...others });
        } else {
            return React.createElement(component, others);
        }
    };
};

const mapMomentValue = (props) => {
    props.value = props.value ? dayjs(props.value, dateFormat) : null;
    return props;
};

export { mapMomentValue, mapStyledProps, compose, acceptEnum };
