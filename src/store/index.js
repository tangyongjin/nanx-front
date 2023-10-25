import associateSelectStore from './associateSelectStore';
import commonTableStore from './commonTableStore';
import dmStore from './dmStore';
import navigationStore from './navigationStore';
import permissionManageStore from './permissionManageStore';
import pmStore from './pmStore';
import userStore from './userStore';

const store = {
    navigationStore,
    userStore,
    commonTableStore: new commonTableStore(),
    permissionManageStore,
    pmStore,
    dmStore,
    associateSelectStore
};

export default store;
