import React from 'react';
import RootStore from './index'; // 导入实际的 RootStore
import { Provider as MobxStoreProvider } from 'mobx-react';

const StoreContext = React.createContext(RootStore);
// return <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>;

export const StoreProvider = ({ children }) => {
    return <MobxStoreProvider {...RootStore}>{children}</MobxStoreProvider>;
};

export const useStore = () => React.useContext(StoreContext);

export const withStore = (Component) => (props) => {
    const stores = useStore();
    return <Component {...props} stores={stores} />;
};
