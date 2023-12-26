import { observable } from 'mobx';

class _DemoStore {
    @observable demoVersion = '8964';
}

const DemoStore = new _DemoStore();

export default DemoStore;
