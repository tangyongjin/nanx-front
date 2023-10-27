import { observable, action } from 'mobx';
import columnsRender from '@/routes/NanxTable/NanxTableCom/columnsRender';
import getTextWidth from '@/routes/NanxTable/NanxTableCom/commonTableTextTool';
import sorter from '@/routes/NanxTable/NanxTableCom//sorter';

class commonTableStore {
    @observable datagrid_code = null;
    @observable selectedRowKeys = [];
    @observable selectedRows = [];
    @observable dataSource = [];
    @observable total = 0;
    @observable currentPage = 1;
    @observable pageSize = 20;
    @observable formCfg = null;
    @observable referinfo = null;
    @observable layoutcfg = null;
    @observable tips = null;
    @observable curd = {};
    @observable tableButtons = [];
    @observable tableColumns = [];
    @observable rawTableColumns = [];

    // @observable tableColumns = [];

    @observable triggers = [];
    @observable table_action = null;
    @observable fixed_query_cfg = null;
    @observable table_width = 2000;
    @observable lazyButtonUsedCom = null;
    @observable ButtonUsedCom = null;
    @observable search_query_cfg = null;

    @action setPageSize = (pageSize) => (this.pageSize = pageSize);

    @action setFixedQueryCfg = (fx) => (this.fixed_query_cfg = fx);

    @action setSearchQueryConfig = async (cfg) => {
        this.search_query_cfg = cfg;
    };

    @action registerTrigger(obj) {
        this.triggers.push(obj);
    }

    @action clearTrigger() {
        this.triggers = [];
    }

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
        this.rawTableColumns = [];
        this.query_cfg = null;
        // this.lazyButtonUsedCom = 'AAA';
    };

    @action clearPaginationStore = () => {
        this.setTotal(0);
        this.setCurrentPage(1);
    };

    @action setDataGridCode = (DataGridCode) => (this.datagrid_code = DataGridCode);

    @action rowSelectChange = (selectedRowKeys, selectedRows) => {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
    };

    @action rowcheckChange = (selectedRowKeys, selectedRows) => {
        if (!this.selectedRowKeys.includes(selectedRowKeys[0])) {
            this.selectedRowKeys = this.selectedRowKeys.concat(selectedRowKeys);
            this.selectedRows = this.selectedRows.concat(selectedRows);
        }
    };

    @action setTableAction = (table_action) => (this.table_action = table_action);
    @action setCurrentPage = (currentPage) => (this.currentPage = currentPage);
    @action setDataSource = (dataSource) => (this.dataSource = dataSource);
    @action setTotal = (total) => (this.total = total);

    @action setRawTableColumns = (rawCols) => (this.rawTableColumns = rawCols);
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

    @action getTableColumns = () => {
        let hideColumns = [];
        let columns = [];

        this.rawTableColumns.map((item) => {
            let column = {
                title: item.title,
                dataIndex: item.key,
                key: item.key,
                width: item.width && item.width != null && item.width != '' ? parseFloat(item.width) : 200,
                sorter: (a, b) => sorter(a[item.key], b[item.key]),
                render: (text, record) => {
                    return columnsRender(text, record, item, this);
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
}

export default new commonTableStore();
// export default commonTableStore;
