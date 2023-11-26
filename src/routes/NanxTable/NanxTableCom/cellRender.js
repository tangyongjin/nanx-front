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
        // return text;
        if (typeof CellsRenderHandlers[column_cfg.handler] === 'function') {
            return CellsRenderHandlers[column_cfg.handler](text, record, store);
        } else {
            console.log('检查渲染函数:' + column_cfg.handler);
            return text;
        }
    }
    return text;
};

export default CellRender;
