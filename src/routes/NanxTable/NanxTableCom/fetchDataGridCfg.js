import api from '@/api/api';
import { message } from 'antd';
import { toJS } from 'mobx';

const fetchDataGridCfg = async (tableStore, setFixedQueryCfg) => {
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
        tableStore.setRawTableColumns(toJS(res.data.tableColumnConfig));
        tableStore.setFormCfg(res.data.formcfg);
        tableStore.setReferinfo(res.data.referinfo);
        tableStore.setlayoutCfg(res.data.layoutcfg);
        tableStore.setTips(res.data.tips);
        tableStore.setTableButtons(res.data.buttons);
        tableStore.setCurd(res.data.curd);
        tableStore.setTableWidth(res.data.table_width);

        if (res.data.fixed_query_cfg) {
            setFixedQueryCfg(res.data.fixed_query_cfg);
        }
        return;
    } else {
        message.error('获取表格配置失败');
    }
};

export default fetchDataGridCfg;
