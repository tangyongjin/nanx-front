import { observable, action } from 'mobx';

class AssociateSelectStore {
    // select的引用数组
    @observable triggers = [];

    @action registerTrigger(obj) {
        this.triggers.push(obj);
    }

    @action clearTrigger() {
        this.triggers = [];
    }
}

export default new AssociateSelectStore();
