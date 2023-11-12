import { observable, action, autorun } from 'mobx';
import CellRender from '@/routes/NanxTable/NanxTableCom/cellRender';
import getTextWidth from '@/routes/NanxTable/NanxTableCom/commonTableTextTool';
import listDataParams from '@/routes/NanxTable/NanxTableCom/listDataParams';
import api from '@/api/api';
import { toJS } from 'mobx';

class _NanxTableStore {
    constructor() {
        autorun(() => {
            if (this.SERIALNO == null) {
            }
        });
    }

    @observable DefaultPageSize = 20;

    @observable SERIALNO = null;
    @observable buttonModalVisuble = false;
    @observable datagrid_code = null;
    @observable datagrid_title = '';

    @observable selectedRowKeys = [];
    @observable selectedRows = [];
    @observable dataSource = [];
    @observable total = 0;
    @observable currentPage = 1;
    @observable pageSize = this.DefaultPageSize;
    @observable formCfg = null;
    @observable referinfo = null;
    @observable layoutcfg = null;
    @observable tips = null;
    @observable curd = {};
    @observable tableButtons = [];

    // 原始配置的 clos
    @observable tableColumnConfig = [];
    // 给 Table用的 cols
    @observable tableColumns = [];

    @observable table_action = null;
    @observable fixed_query_cfg = null;
    @observable lazyButtonUsedCom = null;
    @observable ButtonUsedCom = null;
    @observable search_query_cfg = [];

    @action hideButtonModal = async () => (this.buttonModalVisuble = false);
    @action showButtonModal = async () => (this.buttonModalVisuble = true);

    @action setPageSize = (pageSize) => (this.pageSize = pageSize);

    @action setFixedQueryCfg = (fx) => (this.fixed_query_cfg = fx);

    @action setGridTitle = (title) => (this.datagrid_title = title);

    @action setSearchQueryConfig = async (cfg) => {
        this.search_query_cfg = cfg;
    };

    @action resetTableStore = () => {
        this.selectedRowKeys = [];
        this.selectedRows = [];
        this.dataSource = [];
        this.total = 0;
        this.currentPage = 1;
        this.pageSize = this.DefaultPageSize;
        this.formCfg = null;
        this.layoutcfg = null;
        this.curd = {};
        this.tableColumnConfig = [];
        this.search_query_cfg = [];
    };

    @action setDataGridCode = (DataGridCode) => (this.datagrid_code = DataGridCode);

    @action rowSelectChange = async (selectedRowKeys, selectedRows) => {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
    };

    @action rowcheckChange = async (selectedRowKeys, selectedRows) => {
        if (!this.selectedRowKeys.includes(selectedRowKeys[0])) {
            this.selectedRowKeys = this.selectedRowKeys.concat(selectedRowKeys);
            this.selectedRows = this.selectedRows.concat(selectedRows);
        }
    };

    @action setTableAction = async (table_action) => {
        this.table_action = table_action;
    };

    @action setCurrentPage = async (current) => {
        this.currentPage = current;
    };

    @action TableOnChange = async (pagination) => {
        if (pagination.pageSize == this.pageSize) {
            console.log('没有改变 pageSize');
            console.log(pagination.current);
            await this.setCurrentPage(pagination.current);
            await this.listData('setCurrentPage');

            // 没有改变 pageSize
        } else {
            console.log('改变 pageSize !!! ');
            await this.setCurrentPage(1);
            await this.setPageSize(pagination.pageSize);
            await this.listData('onShowSizeChange');
        }
    };

    @action setDataSource = (dataSource) => (this.dataSource = dataSource);
    @action setTotal = (total) => (this.total = total);

    @action setTableColumnConfig = async (rawCols) => {
        this.tableColumnConfig = rawCols;
        let hideColumns = [];
        let columns = [];

        this.tableColumnConfig.map((item) => {
            let column = {
                title: item.title,
                dataIndex: item.key,
                width: item.width && item.width != null && item.width != '' ? parseFloat(item.width) : 200,
                // sorter: (a, b) => sorter(a[item.key], b[item.key]),
                render: (text, record) => {
                    return CellRender(text, record, item, this);
                }
            };

            if (hideColumns.includes(item.key) == false) {
                columns.push(column);
            }
        });

        columns.map((item) => {
            let fieldValues = [];
            fieldValues.push(item.title);
            this.dataSource.forEach((record) => {
                fieldValues.push(record[item.dataIndex]);
            });
            var longest = fieldValues.reduce(function (a, b) {
                if (a == null) {
                    a = '';
                }
                if (b == null) {
                    b = '';
                }
                return a.length > b.length ? a : b;
            });
            return (item.width = 45 + getTextWidth(longest));
        });

        this.setTableColumns(columns);
    };

    @action getTableColumns = () => {};
    @action setTableColumns = (cols) => (this.tableColumns = cols);

    @action setFormCfg = (formCfg) => (this.formCfg = formCfg);

    @action setReferinfo = (referinfo) => (this.referinfo = referinfo);
    @action setlayoutCfg = (layoutcfg) => (this.layoutcfg = layoutcfg);
    @action setTips = (tips) => (this.tips = tips);
    @action setTableButtons = (json) => (this.tableButtons = json);
    @action setCurd = (curd) => (this.curd = curd);

    @action setLazyButtonUsedCom = (com) => {
        // console.log('设置 lazyButtonUsedCom 组件................');
        // console.log(com);
        this.lazyButtonUsedCom = com;
    };

    @action setButtonUsedCom = async (com) => {
        // console.log('设置 ButtonUsedCom 组件................');
        // console.log(com);
        this.ButtonUsedCom = com;
    };

    @action fetchDataGridCfg = async () => {
        let params = {
            data: {
                DataGridCode: this.datagrid_code,
                role: sessionStorage.getItem('role_code'),
                user: sessionStorage.getItem('user')
            }
        };

        let res = await api.dataGrid.fetchDataGridCfg(params);
        if (res.code == 200) {
            this.setTableColumnConfig(toJS(res.data.tableColumnConfig));

            this.setFormCfg(res.data.formcfg);
            this.setReferinfo(res.data.referinfo);
            this.setlayoutCfg(res.data.layoutcfg);
            this.setTips(res.data.tips);
            this.setTableButtons(res.data.buttons);
            this.setCurd(res.data.curd);

            this.setFixedQueryCfg(res.data.fixed_query_cfg);
        }
    };

    @action listData = async () => {
        let data = listDataParams(this);
        let params = {
            data: data
        };

        params.geturl = toJS(this.curd).geturl;
        if (params.geturl === undefined) {
            return;
        }

        let json = await api.curd.listData(params);
        if (json.code == 200) {
            await this.setDataSource(json.data);
            await this.setTotal(json.total);
            await this.rowSelectChange([], []);
        }
    };

    /**
     * 返回某个下拉组的level级别,来控制
     * 2级别联动,还是3级联动,还是4级联动,etc
     *
     * return :
     *
     * [ TriggerGrp1:1,  TriggerGrp2:3 ]
     *
     */
    getDropdownLevelInfo() {
        let x_group = [];
        for (let key in this.formCfg.properties) {
            let item = this.formCfg.properties[key];
            x_group.push(item['x-props']?.trigger_cfg?.trigger_group_uuid);
        }

        let summary = {};
        x_group.forEach((item) => {
            if (summary[item]) {
                summary[item] += 1; // Increment the count if the element already exists in the summary
            } else {
                summary[item] = 1; // Initialize the count to 1 if it doesn't exist in the summary
            }
        });
        return summary;
    }
}

const NanxTableStore = new _NanxTableStore();

export default NanxTableStore;
