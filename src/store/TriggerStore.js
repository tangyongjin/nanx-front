import { observable, action, autorun } from 'mobx';
import api from '@/api/api';

class _TriggerStore {
    constructor() {
        autorun(() => {
            if (this.SERIALNO == null) {
            }
        });
    }

    @observable triggers = [];

    @action registerTrigger(obj) {
        this.triggers.push(obj);
    }

    @action clearTrigger() {
        this.triggers = [];
    }

    getPrevSelValue(current_ele) {
        for (let i = 0; i < this.triggers.length; i++) {
            let element = this.triggers[i];

            // 不同组结束本次循环
            if (element.props.query_cfg.trigger_group_uuid != current_ele.props.query_cfg.trigger_group_uuid) {
                continue;
            }

            // 不是上一个联动的结束本次循环
            if (current_ele.props.query_cfg.level - element.props.query_cfg.level != 1) {
                continue;
            }

            let prev_value = element.props.nnstore.selectedRows[0]['ghost_' + element.props.as_select_field_id];

            if (prev_value) {
                return prev_value;
            }

            return element.props.default;
        }
    }

    formatOptionList(list, label_field, value_field) {
        return list.map((item) => ({ label: item[label_field], value: item[value_field] }));
    }

    async getOptionList(query_cfg, value, element) {
        this.setState({
            loading: true
        });
        let params = {
            data: { ...query_cfg, value_field: value },
            method: 'POST'
        };

        let res = await api.dataGrid.getAssociateData(params);
        if (res.code == 200) {
            let optionList = this.formatOptionList(res.data, query_cfg.label_field, query_cfg.value_field);
            element.setState({ optionList: optionList, loading: false });
        }
    }
}
const TriggerStore = new _TriggerStore();

export default TriggerStore;
