import commonTableStore from './commonTableStore';
import dmStore from './dmStore';
import navigationStore from './navigationStore';
import permissionManageStore from './permissionManageStore';
import userStore from './userStore';

const store = {
    navigationStore,
    userStore,
    commonTableStore,
    permissionManageStore,
    dmStore
};

// commonTableStore: new commonTableStore(),

export default store;
