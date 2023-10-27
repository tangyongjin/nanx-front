import { observable, action } from 'mobx';

class commonTableStore {
    @observable datagrid_code = null;
    @observable selectedRowKeys = [];
    @observable selectedRows = [];
    @observable dataSource = [];
    @observable total = 0;
    @observable currentPage = 1;
    @observable pageSize = 20;
    @observable loading = false;
    @observable formCfg = null;
    @observable referinfo = null;
    @observable layoutcfg = null;
    @observable tips = null;
    @observable curd = {};
    @observable TableButtons = [];
    @observable tableColumns = [];

    @observable triggers = [];
    @observable schmeForm = [];
    @observable table_action = null;
    @observable fixed_query_cfg = null;
    @observable dropdownRef = [];
    @observable table_width = 2000;

    @observable lazyButtonUsedCom = null;
    @observable ButtonUsedCom = null;

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
        this.total = 0;
        this.currentPage = 1;
        this.pageSize = 10;
        this.formCfg = null;
        this.layoutcfg = null;
        this.curd = {};
        this.tableColumns = [];
        this.query_cfg = null;
        // this.lazyButtonUsedCom = 'AAA';
    };

    @action clearSelectRowData = () => {
        this.selectedRowKeys = [];
        this.selectedRows = [];
    };
    @action clearPaginationStore = () => {
        this.total = 0;
        this.currentPage = 1;
    };

    @action setActionCode = (DataGridCode) => (this.datagrid_code = DataGridCode);

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
    handleReset = (clearFilters) => {
        clearFilters();
    };

    @action setTableAction = (table_action) => (this.table_action = table_action);
    @action setCurrentPage = (currentPage) => (this.currentPage = currentPage);
    @action setDataSource = (dataSource) => (this.dataSource = dataSource);
    @action setTotal = (total) => (this.total = total);
    @action setTableColumns = (tableColumns) => (this.tableColumns = tableColumns);
    @action setFormCfg = (formCfg) => (this.formCfg = formCfg);
    @action setReferinfo = (referinfo) => (this.referinfo = referinfo);
    @action setlayoutCfg = (layoutcfg) => (this.layoutcfg = layoutcfg);
    @action setTips = (tips) => (this.tips = tips);
    @action setTableButtons = (json) => (this.TableButtons = json);
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
}

export default commonTableStore;
