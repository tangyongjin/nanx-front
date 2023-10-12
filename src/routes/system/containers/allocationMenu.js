import React from 'react';
import { inject, observer } from 'mobx-react';
import PriviligeTransfer from '../components/priviligeTransfer';
import '../privilige.scss';
@inject('permissionManageStore')
@observer
export default class AllocationMenu extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.permissionManageStore;
        this.state = {
            targetKeys: [],
            selectedKeys: [],
            disabled: false,
            dataSource: []
        };
    }

    async componentDidMount() {
        await this.store.getRoleMenuList();
        await this.store.getTreeMenuList();
    }

    render() {
        return (
            <div className="custServiceContent">
                <div className="current_role_text_box"> 当前角色：{this.store.currentRole.role_name} </div>
                <div className="allocationMenuContent">
                    <div className="option_menu_box">
                        <PriviligeTransfer
                            dataSource={this.store.treeMenuList}
                            titles={['菜单', '已分配菜单']}
                            targetKeys={this.store.selectTartgetMenukeys}
                            selectedKeys={this.store.selectMenukeys}
                            onChange={this.store.saveMenuPermission}
                            onSelectChange={this.store.menuSelectChange}
                            operations={['确认', '取消']}
                            listStyle={{
                                width: 250,
                                height: 500,
                                overflow: 'scroll'
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
