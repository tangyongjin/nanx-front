import NanxTableStore from './NanxTableStore';
import GridConfigStore from './GridConfigStore';
import MenuStore from './MenuStore';
import UserStore from './UserStore';
import TriggerStore from './TriggerStore';
import TableAsEditorStore from './TableAsEditorStore';
import MenuItemStore from './MenuItemStore';

const RootStore = {
    UserStore,
    NanxTableStore,
    MenuStore,
    MenuItemStore,
    GridConfigStore,
    TableAsEditorStore,
    TriggerStore
};

console.log('RootStore', RootStore);

export default RootStore;
