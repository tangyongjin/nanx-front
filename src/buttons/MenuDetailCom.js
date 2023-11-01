import { observable, action } from 'mobx';
import React from 'react';
import { Card, Tabs } from 'antd';
import { AndroidOutlined, UsergroupAddOutlined } from '@ant-design/icons';

import { observer } from 'mobx-react';
import api from '@/api/api';

class MenuRelatedStore {
    @observable userList = [];
    @observable roleList = [];

    @observable activeKey = '1';
    @action clearUser = () => (this.userList = []);
    @action clearRole = () => (this.roleList = []);
    @action setRoleList = (data) => (this.roleList = data);
    @action setUserList = (data) => (this.userList = data);
    @action setActiveKey = (activeKey) => (this.activeKey = activeKey);
}

const { Meta } = Card;
const { TabPane } = Tabs;
@observer
export default class MenuDetailCom extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.store = new MenuRelatedStore();
        this.getRelatedRole();
    }

    onChangeTabPane = (activeKey) => {
        this.store.setActiveKey(activeKey);
        if (activeKey == 1) {
            this.getRelatedRole();
        }

        if (activeKey == 2) {
            this.getRelatedUser();
        }
    };

    getRelatedRole = async () => {
        let params = {
            data: {
                menu_id: this.props.menuID
            },
            method: 'POST'
        };
        this.store.clearRole();
        let res = await api.permission.getRolesByMenuId(params);
        this.store.setRoleList(res.data);
    };

    getRelatedUser = async () => {
        let params = {
            data: {
                menu_id: this.props.menuID
            },
            method: 'POST'
        };
        this.store.clearUser();
        let res = await api.permission.getUsersByMenuId(params);
        this.store.setUserList(res.data);
    };

    renderRole() {
        console.log('>>>>>>>>>>>>>>>');
        console.log(this.store.activeKey);
        return this.store.roleList.map((role) => {
            return (
                <Card key={role.id} hoverable style={{ width: 240, float: 'left', margin: '10px' }}>
                    <Meta title={role.role_code} description={role.role_name} />
                </Card>
            );
        });
    }

    renderUser() {
        return this.store.userList.map((user) => {
            return (
                <Card
                    key={user.id}
                    hoverable
                    style={{ width: 190, float: 'left', padding: '10px' }}
                    cover={<img style={{ width: '30px', height: '30px' }} alt="example" src={user.head_portrait} />}>
                    <Meta title={user.staff_name} description={user.dept_name} />
                    <div>{user.role_name}</div>
                </Card>
            );
        });
    }

    getTabContentRole = () => {
        return (
            <div>
                <div style={{ overflow: 'hidden' }}>{this.renderRole()}</div>
            </div>
        );
    };

    getTabContentUser = () => {
        return (
            <div>
                <div style={{ overflow: 'hidden' }}>{this.renderUser()}</div>
            </div>
        );
    };

    render() {
        return (
            <Tabs activeKey={this.store.activeKey} onChange={this.onChangeTabPane}>
                <TabPane
                    tab={
                        <span>
                            <AndroidOutlined type="android" /> 涉及角色
                        </span>
                    }
                    key="1">
                    {this.getTabContentRole()}
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <UsergroupAddOutlined />
                            涉及人员
                        </span>
                    }
                    key="2">
                    {this.getTabContentUser()}
                </TabPane>
            </Tabs>
        );
    }
}
