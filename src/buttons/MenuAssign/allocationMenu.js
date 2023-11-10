import React from 'react';
import { inject, observer } from 'mobx-react';
import PriviligeTransfer from './priviligeTransfer';
// import '@/styles/privilige.scss';
@inject('MenuStore')
@observer
export default class AllocationMenu extends React.Component {
    constructor(props) {
        super(props);
        this.MenuStore = props.MenuStore;
    }

    async componentDidMount() {
        await this.MenuStore.getTreeMenuList();
        await this.MenuStore.getRoleMenuList();
    }

    render() {
        return (
            <div style={{ marginTop: '20px' }}>
                <div> 当前角色：{this.MenuStore.currentRole.role_name} </div>
                <PriviligeTransfer
                    dataSource={this.MenuStore.treeMenuList}
                    titles={['菜单', '已分配菜单']}
                    targetKeys={this.MenuStore.selectTartgetMenukeys}
                    selectedKeys={this.MenuStore.selectMenukeys}
                    onChange={this.MenuStore.saveMenuPermission}
                    onSelectChange={this.MenuStore.menuSelectChange}
                    operations={['确认', '取消']}
                    listStyle={{
                        width: 250,
                        height: 500,
                        marginTop: 10,
                        overflow: 'scroll'
                    }}
                />
            </div>
        );
    }
}
