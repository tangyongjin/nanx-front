/**
 *
 * 列的渲染函数
 *
 */

import CellsRenderHandlers from './cellRenders/cellsRenderHandlers';

const CellRender = (text, record, column_cfg, store) => {
    if (column_cfg.handler == undefined) {
        return text;
    }

    if (column_cfg.handler) {
        return CellsRenderHandlers[column_cfg.handler](text, record, store);
    }
    return text;
};

export default CellRender;
