import NanxTableStore from './NanxTableStore';
import GridConfigStore from './GridConfigStore';
import MenuStore from './MenuStore';
import UserStore from './UserStore';
import TriggerStore from './TriggerStore';
import TableAsEditorStore from './TableAsEditorStore';

const RootStore = {
    UserStore,
    NanxTableStore,
    MenuStore,
    GridConfigStore,
    TableAsEditorStore,
    TriggerStore
};

export default RootStore;
