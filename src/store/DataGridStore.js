import { observable, action } from 'mobx';
import { message } from 'antd';
import api from '../api/api';

class DataGridStore {
    @observable dataGrids = [];
    @observable biztableList = [];
    @observable plugins = [];
    @observable Categories = [];

    // 单个DataGrid相关
    @observable DataGridCode = null;
    @observable DataGridTitle = '---';
    @observable BaseTable = '';
    @observable ColsDbInfo = [];
    @observable trigger_groups = [];
    @observable relatedtableColumns = [];
    @observable relatedtable = '';

    @action prepareDataGirdEnv = async () => {
        await this.initAll();
        await this.getDataGridConfigure();
    };

    @action initAll = async () => {
        console.log('初始化所有 DataGridStore 属性.');
        await this.getAllGrids();
        await this.getAllBiztable();
        await this.getAllPlugins();
        await this.getAllCategory();
    };

    @action getDataGridConfigure() {
        // 单个 DataGrid 配置
        this.getColsDbInfo();
        this.getTriggerGroups();
        this.getRelatedTableCols();
    }

    @action setRelatedtable = (table) => {
        this.relatedtable = table;
        this.getRelatedTableCols();
    };

    @action getRelatedTableCols = async () => {
        if (this.relatedtable == '') {
            this.relatedtableColumns = [];
        } else {
            console.log('getRelatedTableCols');
            let params = { data: { table: this.relatedtable } };
            let json = await api.processmanager.getTableCols(params);
            this.relatedtableColumns = json.data;
        }
    };

    @action setCurrentActcode = (DataGridCode) => {
        console.log('设置当前 DataGridCode');
        this.DataGridCode = DataGridCode;
    };

    @action clearColsDbInfo = () => {
        this.ColsDbInfo = [];
    };

    @action setCurrentBasetable = (table) => {
        this.BaseTable = table;
    };

    @action setCurrentDatagridTitle = (name) => {
        this.DataGridTitle = name;
    };

    @action getAllPlugins = async () => {
        let params = { data: {} };
        let json = await api.processmanager.getAllPlugins(params);
        this.plugins = json.data;
    };

    @action getAllCategory = async () => {
        let params = { data: {} };
        let json = await api.dataGrid.getAllCategory(params);
        this.Categories = json.data;
    };

    @action getColsDbInfo = async () => {
        if (this.DataGridCode === null) {
            this.setColsDbInfo([]);
        } else {
            let params = { data: { DataGridCode: this.DataGridCode } };
            let json = await api.dataGrid.getColsDbInfo(params);
            this.setColsDbInfo(json.data);
        }
    };

    @action setColsDbInfo = (data) => (this.ColsDbInfo = data);

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
        let params = { data: { DataGridCode: this.DataGridCode } };
        let json = await api.dataGrid.getTriggerGroups(params);
        this.trigger_groups = json.data;
    };

    @action saveTriggerGroup = async (obj) => {
        let params = { data: obj };
        console.log(obj);
        let json = await api.dataGrid.saveTriggerGroup(params);
        message.info(json.message);
        this.getTriggerGroups();
    };

    @action deleteTriggerGroup = async (gpid) => {
        let params = { data: { groupid: gpid } };
        let json = await api.dataGrid.deleteTriggerGroup(params);
        message.info(json.message);
        this.getTriggerGroups();
    };

    @action setFieldAttr = (field, attr, value) => {
        this.ColsDbInfo.map((element) => {
            if (element.Field === field) {
                element[attr] = value;
            }
        });
    };

    @action saveFieldCfg = async (field) => {
        let indicator = -1;

        this.ColsDbInfo.forEach((element, idx) => {
            if (element.Field === field) {
                indicator = idx;
            }
        });

        let obj = this.ColsDbInfo[indicator];
        obj.DataGridCode = this.DataGridCode;

        let params = { data: obj };
        await api.dataGrid.saveFieldCfg(params);
        this.getColsDbInfo();
    };

    // 字段配置保存
    @action saveCfg = (field_cfg) => {
        this.saveFieldCfg(field_cfg);
    };

    @action changeCfg_input = (event, attr, field) => {
        let value = event.target.value;
        this.setFieldAttr(field, attr, value);
    };

    @action changeCfg_cbx = (event, attr, field) => {
        console.log(event, attr, field);
        let value = event.target.checked;
        this.setFieldAttr(field, attr, value);
    };

    @action changeCfg_dropdown = (v, attr, field) => {
        if (v == undefined) {
            v = '';
        }
        this.setFieldAttr(field, attr, v);
    };

    @action getFieldAttr = (field, attr) => {
        console.log(this.ColsDbInfo);
        this.ColsDbInfo.map((element) => {
            if (element.Field === field) {
                return element[attr];
            }
        });
        return '{}';
    };
}

export default new DataGridStore();
