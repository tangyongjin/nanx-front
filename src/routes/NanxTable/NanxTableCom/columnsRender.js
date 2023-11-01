/**
 *
 * 列的渲染函数
 *
 */

import columnsRenderHandle from './columnsRender/columnsRenderHandle';

const columnsRender = (text, record, column_cfg, datagrid_code, store) => {
    console.log('columnsRender', text, record, column_cfg, datagrid_code);
    if (text === '' || text === undefined) {
        return '';
    }
    let field_cfg = {};
    let table_columns_render_cfg = field_cfg[datagrid_code];
    console.log('table_columns_render_cfg: ', table_columns_render_cfg);

    if (column_cfg.handler) {
        return columnsRenderHandle[column_cfg.handler](text, record, store);
    }

    // 不存在处理函数
    if (table_columns_render_cfg === undefined) {
        return text;
    }

    if (Object.keys(table_columns_render_cfg).includes(column_cfg.key) === false) {
        return text;
    }
    return columnsRenderHandle[table_columns_render_cfg[column_cfg.key]](text, record);
};

export default columnsRender;
