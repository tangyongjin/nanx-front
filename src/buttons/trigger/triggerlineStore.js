import { observable, action } from 'mobx';
import api from '@/api/api';

export default class triggerlineStore {
    @observable field_e = null;
    @observable combo_table = null; //参照表
    @observable codetable_category_value = null;
    @observable list_field = null;
    @observable value_field = null;
    @observable filter_field = null;
    @observable refercolumns = []; //参照表的字段

    @action resetCombo_table = async (table) => {
        this.resetValueField(null);
        this.resetListField(null);
        this.resetFilterField(null);
        this.combo_table = table;
        let params = { method: 'POST', data: { table: table } };
        let json = await api.processmanager.getTableCols(params);
        console.log(json.data);
        this.refercolumns = json.data;
    };

    @action resetFieldE = async (field) => {
        this.field_e = field;
    };

    @action resetValueField = async (field) => {
        this.value_field = field;
    };

    @action resetListField = async (field) => {
        this.list_field = field;
    };

    @action resetFilterField = async (field) => {
        this.filter_field = field;
    };
}

// export default new triggerlineStore()
