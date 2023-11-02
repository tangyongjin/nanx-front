import { observable, action, autorun } from 'mobx';
import CellRender from '@/routes/NanxTable/NanxTableCom/cellRender';
import getTextWidth from '@/routes/NanxTable/NanxTableCom/commonTableTextTool';
import sorter from '@/routes/NanxTable/NanxTableCom//sorter';
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

    @observable SERIALNO = null;
    @observable buttonModalVisuble = false;
    @observable datagrid_code = null;
    @observable selectedRowKeys = [];
    @observable selectedRows = [];
    @observable dataSource = [];
    @observable total = 0;
    @observable currentPage = 1;
    @observable pageSize = 10;
    @observable formCfg = null;
    @observable referinfo = null;
    @observable layoutcfg = null;
    @observable tips = null;
    @observable curd = {};
    @observable tableButtons = [];
    @observable tableColumns = [];
    @observable rawTableColumns = [];

    @observable table_action = null;
    @observable fixed_query_cfg = null;
    @observable table_width = 2000;
    @observable lazyButtonUsedCom = null;
    @observable ButtonUsedCom = null;
    @observable search_query_cfg = [];

    @action hideButtonModal = async () => (this.buttonModalVisuble = false);
    @action showButtonModal = async () => (this.buttonModalVisuble = true);

    @action setPageSize = (pageSize) => (this.pageSize = pageSize);

    @action setFixedQueryCfg = (fx) => (this.fixed_query_cfg = fx);

    @action setSearchQueryConfig = async (cfg) => {
        this.search_query_cfg = cfg;
    };

    @action resetTableStore = () => {
        this.selectedRowKeys = [];
        this.selectedRows = [];
        this.dataSource = [];
        this.total = 0;
        this.currentPage = 1;
        this.pageSize = 10;
        this.formCfg = null;
        this.layoutcfg = null;
        this.curd = {};
        this.tableColumnConfig = [];
        this.query_cfg = null;
    };

    @action clearPaginationStore = () => {
        this.setTotal(0);
        this.setCurrentPage(1);
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

    @action setCurrentPage = (currentPage) => {
        this.currentPage = currentPage;
        this.listData();
    };

    @action setDataSource = (dataSource) => (this.dataSource = dataSource);
    @action setTotal = (total) => (this.total = total);

    @action setTableColumnConfig = (rawCols) => (this.tableColumnConfig = rawCols);
    @action setTableColumns = (cols) => (this.tableColumns = cols);

    @action setFormCfg = (formCfg) => (this.formCfg = formCfg);
    @action setReferinfo = (referinfo) => (this.referinfo = referinfo);
    @action setlayoutCfg = (layoutcfg) => (this.layoutcfg = layoutcfg);
    @action setTips = (tips) => (this.tips = tips);
    @action setTableButtons = (json) => (this.tableButtons = json);
    @action setCurd = (curd) => (this.curd = curd);
    @action setTableWidth = (table_width) => (this.table_width = table_width);

    @action setLazyButtonUsedCom = (com) => {
        console.log('设置 lazyButtonUsedCom 组件................');
        console.log(com);
        this.lazyButtonUsedCom = com;
    };

    @action setButtonUsedCom = async (com) => {
        console.log('设置 ButtonUsedCom 组件................');
        console.log(com);
        this.ButtonUsedCom = com;
    };

    @action fetchDataGridCfg = async () => {
        let params = {
            data: {
                DataGridCode: this.datagrid_code,
                role: sessionStorage.getItem('role_code'),
                user: sessionStorage.getItem('user')
            },
            method: 'POST'
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
            this.setTableWidth(res.data.table_width);
            this.setFixedQueryCfg(res.data.fixed_query_cfg);
        }
    };

    @action getTableColumns = () => {
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
        return columns;
    };

    @action listData = async () => {
        let data = listDataParams(this);
        let params = {
            data: data,
            method: 'POST'
        };

        params.geturl = toJS(this.curd).geturl;
        if (params.geturl === undefined) {
            return;
        }

        let json = await api.curd.listData(params);
        if (json.code == 200) {
            this.getTableColumns();
            this.setDataSource(json.data);
            this.setTotal(json.total);
            this.rowSelectChange([], []);
        }
    };

    @action onShowSizeChange = async (current, pageSize) => {
        await this.setCurrentPage(current);
        await this.setPageSize(pageSize);
        await this.listData();
    };

    getPageNation = async () => {
        let pg = {
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            total: this.total,
            showLessItems: true,
            defaultCurrent: this.currentPage,
            current: this.currentPage,
            pageSize: this.pageSize,
            showQuickJumper: true,
            showTotal: (count) => {
                let pageNum = Math.ceil(count / this.pageSize);
                return `共${pageNum}页/${count}条数据`;
            },
            onChange: (currentPage) => this.setCurrentPage(currentPage)
        };
        return pg;
    };
}
const NanxTableStore = new _NanxTableStore();

export default NanxTableStore;
