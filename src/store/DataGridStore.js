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

    @action batchUpdateFieldCfg = async () => {
        console.log('批量修改字段配置', this.ColsDbInfo);
        let params = {
            data: {
                submitData: this.ColsDbInfo,
                datagrid_code: this.DataGridCode
            }
        };
        let json = await api.dataGrid.batchUpdateFieldCfg(params);
        if (json.code == 200) {
            await this.getColsDbInfo();
        }
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
        this.ColsDbInfo.foreach((element) => {
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
        let json = await api.dataGrid.saveFieldCfg(params);
        message.info(json.message);
        this.getColsDbInfo();
    };
}

export default new DataGridStore();
