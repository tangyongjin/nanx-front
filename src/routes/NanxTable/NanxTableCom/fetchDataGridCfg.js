import api from '@/api/api';
import { message } from 'antd';
import { toJS } from 'mobx';

const fetchDataGridCfg = async (tableStore) => {
    let params = {
        data: {
            DataGridCode: tableStore.datagrid_code,
            role: sessionStorage.getItem('role_code'),
            user: sessionStorage.getItem('user')
        }
    };

    let res = await api.dataGrid.fetchDataGridCfg(params);
    if (res.code == 200) {
        await tableStore.setTableColumnConfig(toJS(res.data.tableColumnConfig));
        await tableStore.setFormCfg(res.data.formcfg);
        await tableStore.setReferinfo(res.data.referinfo);
        await tableStore.setlayoutCfg(res.data.layoutcfg);
        await tableStore.setTips(res.data.tips);
        await tableStore.setTableButtons(res.data.buttons);
        await tableStore.setCurd(res.data.curd);
        await tableStore.setTableWidth(res.data.table_width);
        await tableStore.setFixedQueryCfg(res.data.fixed_query_cfg);
        await tableStore.setGridTitle(res.data.datagrid_title);

        return;
    } else {
        message.error('获取表格配置失败');
    }
};

export default fetchDataGridCfg;
