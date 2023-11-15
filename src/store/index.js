import NanxTableStore from './NanxTableStore';
import DataGridStore from './DataGridStore';
import MenuStore from './MenuStore';
import UserStore from './UserStore';
import TriggerStore from './TriggerStore';
import TableAsEditorStore from './TableAsEditorStore';

const RootStore = {
    UserStore,
    NanxTableStore,
    MenuStore,
    DataGridStore,
    TableAsEditorStore,
    TriggerStore
};

export default RootStore;
