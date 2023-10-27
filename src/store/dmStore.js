import { observable, action, autorun } from 'mobx';
import { message } from 'antd';
import api from '../api/api';

class dmStore {
    constructor() {
        autorun(() => {
            if (this.DataGridCode) {
                this.initAll();
            }
        });
    }

    @observable dataGrids = [];
    @observable maintableColumns = [];
    @observable biztableList = [];
    @observable DataGridCode = null;
    @observable DataGridTitle = '';
    @observable trigger_groups = [];
    @observable plugins = [];
    @observable Categories = [];
    @observable currentObj = {};
    @observable maintable = '';
    @observable relatedtableColumns = [];
    @observable relatedtable = [];

    @action setRelatedtable = (table) => {
        this.relatedtable = table;
        this.getRelatedTableCols();
    };

    @action getRelatedTableCols = async () => {
        if (this.relatedtable == '') {
            this.relatedtableColumns = [];
        } else {
            console.log('getRelatedTableCols');
            let params = { method: 'POST', data: { table: this.relatedtable } };
            let json = await api.processmanager.getTableCols(params);
            this.relatedtableColumns = json.data;
        }
    };

    @action setCurrentActcode = (DataGridCode) => {
        console.log('设置当前 DataGridCode');
        this.DataGridCode = DataGridCode;
    };

    @action clearMaintableColumns = () => {
        this.maintableColumns = [];
    };

    @action setCurrentBasetable = (table) => {
        this.maintable = table;
    };

    @action setCurrentActName = (name) => {
        this.DataGridTitle = name;
    };

    @action initAll = () => {
        console.log('初始化所有 dmStore 属性.');
        this.getAllGrids();
        this.getAllBiztable();
        this.getActCols();
        this.getTriggerGroups();
        this.getAllPlugins();
        this.getAllCategory();
        this.getRelatedTableCols();
    };

    @action getAllPlugins = async () => {
        let params = { data: {} };
        let json = await api.processmanager.getAllPlugins(params);
        this.plugins = json.data;
    };

    @action batchUpdateFieldCfg = async () => {
        console.log('批量修改字段配置', this.maintableColumns);
        let params = {
            data: {
                submitData: this.maintableColumns,
                datagrid_code: this.DataGridCode
            },
            method: 'POST'
        };
        let json = await api.dataGrid.batchUpdateFieldCfg(params);
        if (json.code == 200) {
            await this.getActCols();
        }
    };

    @action getAllCategory = async () => {
        let params = { data: {} };
        let json = await api.dataGrid.getAllCategory(params);
        this.Categories = json.data;
    };

    @action getActCols = async () => {
        if (this.DataGridCode === null) {
            this.maintableColumns = [];
        } else {
            let params = { method: 'POST', data: { DataGridCode: this.DataGridCode } };
            let json = await api.dataGrid.getActCols(params);
            this.setMaintableColumns(json.data);
        }
    };

    @action setMaintableColumns = (data) => (this.maintableColumns = data);

    @action getAllGrids = async () => {
        let params = { data: {} };
        let json = await api.dataGrid.getPortalDataGrids(params);
        this.dataGrids = json.data;
    };

    @action getAllBiztable = async () => {
        let params = { data: {} };
        let json = await api.processmanager.getAllBiztable(params);
        this.biztableList = json.data;
    };

    @action getTriggerGroups = async () => {
        let params = { method: 'POST', data: { DataGridCode: this.DataGridCode } };
        let json = await api.dataGrid.getTriggerGroups(params);
        this.trigger_groups = json.data;
    };

    @action saveTriggerGroup = async (obj) => {
        let params = { data: obj, method: 'POST' };
        console.log(obj);
        let json = await api.dataGrid.saveTriggerGroup(params);
        message.info(json.message);
        this.getTriggerGroups();
    };

    @action deleteTriggerGroup = async (gpid) => {
        let params = { data: { groupid: gpid }, method: 'POST' };
        let json = await api.dataGrid.deleteTriggerGroup(params);
        message.info(json.message);
        this.getTriggerGroups();
    };

    @action setFieldAttr = (field, attr, value) => {
        this.maintableColumns.foreach((element) => {
            if (element.Field === field) {
                element[attr] = value;
            }
        });
        // this.setMaintableColumns(this.maintableColumns);
    };

    @action saveFieldCfg = async (field) => {
        let indicator = -1;

        this.maintableColumns.forEach((element, idx) => {
            if (element.Field === field) {
                indicator = idx;
            }
        });

        let obj = this.maintableColumns[indicator];
        obj.DataGridCode = this.DataGridCode;

        let params = { data: obj, method: 'POST' };
        let json = await api.dataGrid.saveFieldCfg(params);
        message.info(json.message);
        this.getActCols();
    };
}

export default new dmStore();
