import { observable, action, toJS } from 'mobx';

class commonTableStore {
    @observable datagrid_code = null;

    @observable selectedRowKeys = [];

    @observable selectedRows = [];

    @observable dataSource = [];

    @observable tableOptionType = null;

    @observable searchText = '';

    @observable searchdataIndex = '';

    @observable total = 0;

    @observable currentPage = 1;

    @observable pageSize = 20;

    @observable loading = false;

    @observable formCfg = null;

    @observable referinfo = null;

    @observable layoutcfg = null;

    @observable tips = null;

    @observable staticformcfg = null;

    @observable selectType = null;

    @observable curd = {};

    @observable TableButtonsJson = [];

    @observable tableColumnsJson = [];

    // @observable query_cfg = null //查询参数.

    @observable base_table = null;

    @observable triggers = [];

    @observable schmeForm = [];

    @observable table_action = null;

    @observable fixed_query_cfg = null;

    @observable dropdownRef = [];

    @observable table_width = 2000;

    @action registerSchmeForm(obj) {
        this.schmeForm.push(obj);
    }

    @action registerDropDown(key, obj) {
        this.dropdownRef[key] = obj;
    }

    @action clearDropdownRef() {
        this.dropdownRef = [];
    }

    @action setPageSize = (pageSize) => (this.pageSize = pageSize);

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
        this.tableOptionType = null;
        this.searchText = '';
        this.total = 0;
        this.currentPage = 1;
        this.pageSize = 10;
        this.loading = false;
        this.formCfg = null;
        this.layoutcfg = null;
        this.staticformcfg = null;
        this.selectType = null;
        this.curd = {};
        this.tableColumnsJson = [];
        this.query_cfg = null;
        this.base_table = null;
    };

    @action clearSelectRowData = () => {
        this.selectedRowKeys = [];
        this.selectedRows = [];
    };
    @action clearPaginationStore = () => {
        this.total = 0;
        this.loading = false;
        this.currentPage = 1;
    };

    @action setActionCode = (DataGridCode) => (this.datagrid_code = DataGridCode);

    // TO-DO  如果已经有 fixed_query_cfg , 则应该合并 .
    // @action setQueryCfg = newcfg => {
    //     console.log("query_cfg 变化 ")
    //     console.log(newcfg)
    //     this.query_cfg = newcfg
    // }

    // @action setFixedQueryCfg = newcfg => {
    //     console.log("setFixedQueryCfg 变化 ")
    //     console.log(newcfg)
    //     this.fixed_query_cfg = newcfg
    // }

    // 设置操作table的类型
    @action setTableOptionType = (tableOptionType) => (this.tableOptionType = tableOptionType);

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
    @action
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchdataIndex = dataIndex;
        console.log(selectedKeys, dataIndex);
    };

    @action
    handleReset = (clearFilters) => {
        clearFilters();
        this.searchText = '';
    };

    @action setTableAction = (table_action) => (this.table_action = table_action);

    @action setCurrentPage = (currentPage) => (this.currentPage = currentPage);

    @action setTableLoading = (loading) => (this.loading = loading);

    @action setDataSource = (dataSource) => (this.dataSource = dataSource);

    @action setTotal = (total) => (this.total = total);

    @action setTableColumnsJson = (tableColumnsJson) => (this.tableColumnsJson = toJS(tableColumnsJson));

    @action setFormCfg = (formCfg) => (this.formCfg = formCfg);

    @action setReferinfo = (referinfo) => (this.referinfo = referinfo);

    @action setlayoutCfg = (layoutcfg) => (this.layoutcfg = layoutcfg);
    @action setTips = (tips) => (this.tips = tips);

    @action setstaticformcfg = (staticformcfg) => (this.staticformcfg = staticformcfg);

    @action setselectType = (selectType) => (this.selectType = selectType);

    @action setTableButtonsJson = (json) => (this.TableButtonsJson = json);

    @action setBaseTable = (base_table) => (this.base_table = base_table);

    @action setCurd = (curd) => (this.curd = curd);

    @action setTableWidth = (table_width) => (this.table_width = table_width);
}

export default commonTableStore;
