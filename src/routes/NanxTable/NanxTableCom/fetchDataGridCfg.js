import api from '@/api/api';
import { message } from 'antd';

const fetchDataGridCfg = async (tableStore, setTableCompomentQueryCfg) => {
    tableStore.clearSelectRowData();
    let params = {
        data: {
            DataGridCode: tableStore.datagrid_code,
            role: sessionStorage.getItem('role_code'),
            user: sessionStorage.getItem('user')
        },
        method: 'POST'
    };

    let res = await api.dataGrid.fetchDataGridCfg(params);
    if (res.code == 200) {
        console.log(res.data);

        tableStore.setTableColumnsJson(res.data.tableColumnConfig);
        tableStore.setFormCfg(res.data.formcfg);
        tableStore.setReferinfo(res.data.referinfo);
        tableStore.setlayoutCfg(res.data.layoutcfg);
        tableStore.setTips(res.data.tips);
        if (res.data.staticformcfg) {
            tableStore.setstaticformcfg(res.data.staticformcfg);
        }

        tableStore.setselectType(res.data.multiple);
        tableStore.setTableButtonsJson(res.data.buttons);
        tableStore.setBaseTable(res.data.base_table);
        tableStore.setCurd(res.data.curd);
        tableStore.setTableWidth(res.data.table_width);

        if (res.data.fixed_query_cfg) {
            setTableCompomentQueryCfg(res.data.fixed_query_cfg);
        }
        return;
    }

    tableStore.setTableColumnsJson([]);
    tableStore.setFormCfg({});
    message.error('获取表格配置失败');
};

export default fetchDataGridCfg;
