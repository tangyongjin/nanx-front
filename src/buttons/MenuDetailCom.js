import { observable, action } from 'mobx';
import React from 'react';
import { Card, Tabs } from 'antd';
import { AndroidOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { port, root_url } from '@/api/api_config/base_config';
import { observer } from 'mobx-react';
import api from '@/api/api';
const avatarRoot = `${root_url}:${port}/`;
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
            }
        };
        this.store.clearRole();
        let res = await api.permission.getRolesByMenuId(params);
        this.store.setRoleList(res.data);
    };

    getRelatedUser = async () => {
        let params = {
            data: {
                menu_id: this.props.menuID
            }
        };
        this.store.clearUser();
        let res = await api.permission.getUsersByMenuId(params);
        this.store.setUserList(res.data);
    };

    renderRole() {
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
                    style={{ width: 180, float: 'left', padding: '10px' }}
                    cover={
                        <img
                            style={{ marginLeft: '30px', width: '30px', height: '30px' }}
                            alt="useravatar"
                            src={avatarRoot + user.head_portrait}
                        />
                    }>
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
        const items = [
            {
                key: '1',
                label: (
                    <span>
                        <AndroidOutlined type="android" />
                        分配的角色
                    </span>
                ),
                children: this.getTabContentRole()
            },
            {
                key: '2',
                label: (
                    <span>
                        {' '}
                        <UsergroupAddOutlined /> 涉及人员
                    </span>
                ),
                children: this.getTabContentUser()
            }
        ];

        return <Tabs activeKey={this.store.activeKey} items={items} onChange={this.onChangeTabPane} />;
    }
}
