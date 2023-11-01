/**
 *
 * 列的渲染函数
 *
 */

import CellsRenderHandlers from './cellRenders/cellsRenderHandlers';

const CellRender = (text, record, column_cfg, datagrid_code, store) => {
    if (text === '' || text === undefined) {
        return '';
    }
    let field_cfg = {};
    let table_columns_render_cfg = field_cfg[datagrid_code];
    if (column_cfg.handler) {
        return CellsRenderHandlers[column_cfg.handler](text, record, store);
    }

    // 不存在处理函数
    if (table_columns_render_cfg === undefined) {
        return text;
    }

    if (Object.keys(table_columns_render_cfg).includes(column_cfg.key) === false) {
        return text;
    }
    return CellsRenderHandlers[table_columns_render_cfg[column_cfg.key]](text, record);
};

export default CellRender;
