import NanxTableStore from './NanxTableStore';
import DataGridStore from './DataGridStore';
import NavigationStore from './NavigationStore';
import MenuStore from './MenuStore';
import UserStore from './UserStore';
import TriggerStore from './TriggerStore';

const RootStore = {
    NavigationStore,
    UserStore,
    NanxTableStore,
    MenuStore,
    DataGridStore,
    TriggerStore
};

// class RootStore {
//     constructor() {
//         this.NavigationStore = new NavigationStore(this);
//         this.UserStore = new UserStore(this);
//         this.NanxTableStore = new NanxTableStore(this);
//         this.MenuStore = new MenuStore(this);
//         this.DataGridStore = new DataGridStore(this);
//         this.TriggerStore = new TriggerStore(this);
//     }
// }

export default RootStore;
