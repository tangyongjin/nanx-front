import { observable, action, autorun } from 'mobx';
import api from '../api/api';

class pmStore {
    constructor() {
        autorun(() => {
            if (this.current_processkey) {
                this.setAllNodeName();
            }
        });
    }

    @observable processList = [];
    @observable biztableList = [];
    @observable roleList = [];
    @observable processMaintableList = [];
    @observable filedTypes = ['string', 'date', 'number', 'textarea'];
    @observable plugins = [];
    @observable papernorules = [];
    @observable updateDirections = ['this', 'that'];

    @observable inittypes = ['blank', 'currentdate', 'logged_in_usesr']; //初始值类型
    @observable current_processkey = '';
    @observable current_processname = '';
    @observable current_nodeid = '';

    @observable maintable = '';
    @observable maintableColumns = [];
    @observable relatedtable = '';
    @observable relatedtableColumns = [];

    @observable updateDirection = 'this'; // or that
    @observable AllNodeName = []; //所有节点名称
    @observable current_sid = '';
    @observable current_nodename = '';

    @observable PorcessSummary = {};

    @action setMainTable = (table) => {
        console.log('setMainTable to:' + table);
        this.maintable = table;
        if (this.maintable === this.relatedtable) {
            this.updateDirection = 'that';
        }

        this.getMainTableCols();
    };

    @action setRelatedtable = (table) => {
        this.relatedtable = table;
        this.getRelatedTableCols();
    };

    @action getMainTableCols = async () => {
        if (this.maintable === '') {
            this.maintableColumns = [];
        } else {
            console.log('getMainTableCols');
            console.log(this.maintable);

            let params = { method: 'POST', data: { table: this.maintable } };
            let json = await api.processmanager.getTableCols(params);
            this.maintableColumns = json.data;
        }
    };

    @action getRelatedTableCols = async () => {
        if (this.relatedtable === '') {
            this.relatedtableColumns = [];
        } else {
            console.log('getRelatedTableCols');
            let params = { method: 'POST', data: { table: this.relatedtable } };
            let json = await api.processmanager.getTableCols(params);
            this.relatedtableColumns = json.data;
        }
    };

    @action setAllNodeName = async () => {
        let params = { method: 'POST', data: { processkey: this.current_processkey } };
        let json = await api.bpm.getAllNodeName(params);
        this.AllNodeName = json.data;
    };

    @action setPorcessSummary = async (pk) => {
        if (pk.length > 0) {
            let params = { method: 'POST', data: { processkey: pk } };
            let json = await api.bpm.getPorcessSummary(params);
            console.log('后台返回:setPorcessSummary');
            console.log(json);
            this.PorcessSummary = json.data;
        }
    };

    @action setCurrentSid = (value) => {
        this.current_sid = value;
    };

    @action setCurrentNodename = (value) => {
        console.log(value);
        this.current_nodename = value;
        let node = this.AllNodeName.find((item) => item.name == value);

        this.current_nodeid = node.id;
    };

    @action setCurrentProcessKey = (pkey) => {
        this.current_processkey = pkey;
        this.current_sid = '';
        this.current_nodename = '';
    };

    @action setCurrentProcessName = (name) => {
        this.current_processname = name;
        this.current_sid = '';
        this.current_nodename = '';
    };

    @action initAll = () => {
        console.log('initall');

        this.getAllProcess();
        this.getAllRoles();
        this.getAllBiztable();
        this.getAllPlugins();
        this.getAllProcessMainTableList();
        this.getMainTableCols();
        this.getRelatedTableCols();
        this.setAllNodeName();
        this.getAllPapernoRules();
    };

    @action getAllProcess = async () => {
        let params = { data: {} };
        let json = await api.processmanager.getAllProcess(params);
        this.processList = json.data;
    };

    @action getAllBiztable = async () => {
        let params = { data: {} };
        let json = await api.processmanager.getAllBiztable(params);
        this.biztableList = json.data;
    };

    @action getAllRoles = async () => {
        let params = { data: {} };
        let json = await api.processmanager.getAllRoles(params);
        this.roleList = json.data;
    };

    @action getAllPlugins = async () => {
        let params = { data: {} };
        let json = await api.processmanager.getAllPlugins(params);
        this.plugins = json.data;
    };

    @action getAllPapernoRules = async () => {
        let params = { data: {} };
        let json = await api.processmanager.getAllPapernoRules(params);
        this.papernorules = json.data;
    };

    @action getAllProcessMainTableList = async () => {
        let params = { data: {} };
        let json = await api.curd.getProcessMaintableList(params);
        this.processMaintableList = json.data;
    };
}

export default new pmStore();
