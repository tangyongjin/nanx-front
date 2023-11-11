import React from 'react';
import { inject, observer } from 'mobx-react';
import PriviligeTransfer from './priviligeTransfer';
import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { toJS } from 'mobx';
@inject('MenuStore')
@observer
export default class AllocationMenu extends React.Component {
    constructor(props) {
        super(props);
        this.MenuStore = props.MenuStore;
    }

    async componentDidMount() {
        await this.MenuStore.getTreeMenuList();
    }

    refreshMenuAssociated = async () => {
        await this.MenuStore.getMenuTreeByRoleCode();
    };

    render() {
        return (
            <div style={{ marginTop: '20px', height: '500px' }}>
                <div>
                    当前角色：{this.MenuStore.currentRole.role_name}{' '}
                    <Button
                        onClick={this.refreshMenuAssociated}
                        size="small"
                        type="primary"
                        shape="circle"
                        icon={<RedoOutlined />}
                    />
                </div>
                <br />

                {this.MenuStore.AllMenuList.length > 0 && (
                    <PriviligeTransfer
                        role_code={this.MenuStore.currentRole.role_code}
                        dataSource={toJS(this.MenuStore.AllMenuList)}
                        AllMenuKeys={this.MenuStore.AllMenuKeys}
                        titles={['菜单', '已分配菜单']}
                        targetKeys={this.MenuStore.selectTartgetMenukeys}
                        RoleUsedKeys={this.MenuStore.RoleUsedKeys}
                        onChange={this.MenuStore.saveMenuPermission}
                        onSelectChange={this.MenuStore.menuSelectChange}
                        operations={['确认', '取消']}
                    />
                )}
            </div>
        );
    }
}
