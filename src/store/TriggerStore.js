import { observable, action, autorun } from 'mobx';

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

    formatOptionList(list, label_field, value_field) {
        return list.map((item) => ({ label: item[label_field], value: item[value_field] }));
    }
}

const TriggerStore = new _TriggerStore();

export default TriggerStore;
