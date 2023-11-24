import React from 'react';
import { Tag } from 'antd';
import IconRender from './IconRender';
import ImgRender from './ImgRender';
import OfficeDocuRender from './OfficeDocuRender';

class CellsRenderHandlers {
    splitDate(text) {
        if (!text) {
            return text;
        }
        let arr = text.split(' ');
        return arr[0];
    }

    renderTag(text) {
        if (text == 'y') {
            return <Tag color="#108ee9">已读</Tag>;
        }
        if (text == 'n') {
            return <Tag color="volcano">未读</Tag>;
        }
    }

    yesOrNoHandle(text) {
        if (!text) {
            return null;
        }
        return text === 'y' ? '是' : '否';
    }
}

CellsRenderHandlers.prototype.IconRender = IconRender;
CellsRenderHandlers.prototype.ImgRender = ImgRender;
CellsRenderHandlers.prototype.OfficeDocuRender = OfficeDocuRender;

export default new CellsRenderHandlers();
