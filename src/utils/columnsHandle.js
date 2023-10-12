import React from 'react';
import { notification } from 'antd';
import { hashHistory } from 'react-router';

export const noPassCustomerName = (text) => {
    if (text) {
        return text.slice(0, 5);
    }
    return '';
};

export const noPassName = (text) => {
    if (text == null || text == undefined || text == '') {
        return '';
    }
    if (text.length <= 3) {
        return text.substring(0, 1) + (text.length == 3 ? '**' : '*');
    }
    if (text.length > 3 && text.length <= 6) {
        return text.substring(0, 1) + '**';
    }
    if (text.length > 6) {
        return text.substring(0, 2) + '****' + text.substring(6, text.length);
    }
};

export const noPassPrice = (text) => {
    return '***';
};

/**
 * 以上为兼容代码
 **/

const hideMoreHandle = (text) => {
    if (text.length > 8) {
        return (
            <span className="checkContent" onClick={(event) => showNotification(event, text)} title={text}>
                {text.substr(0, 8)}...
            </span>
        );
    }
    if (text.length <= 8) {
        return text;
    }
};

const renderOppName = (text, record) => {
    return (
        <span
            className="detailContent"
            onClick={(event) => changePage(event, record, '/oppotunity/salesOpportunityDetail')}>
            {text}
        </span>
    );
};

const changePage = (event, record, pathname) => {
    hashHistory.push({
        pathname: pathname,
        state: { detail: record }
    });
};

const showNotification = (e, text, title) => {
    e.stopPropagation();
    notification.open({
        message: '查看更多',
        description: text,
        style: {
            width: 600,
            marginLeft: 335 - 600
        }
    });
};

export const columnsRender = {
    hideMoreHandle,
    noPassPrice,
    renderOppName
};
