import { observable, action } from 'mobx';
import React from 'react';
import { Table } from 'antd';
import { toJS } from 'mobx';
import ImgRender from '@/routes/NanxTable/NanxTableCom/cellRenders/ImgRender';

import { port, root_url } from '@/api/api_config/base_config';
import { observer } from 'mobx-react';
import api from '@/api/api';
const avatarRoot = `${root_url}:${port}/`;
class MenuRelatedStore {
    @observable userList = [];
    @observable roleList = [];
    @observable combinedArray = [];
    @action clearUser = () => (this.userList = []);
    @action clearRole = () => (this.roleList = []);
    @action setRoleList = (data) => (this.roleList = data);
    @action setUserList = (data) => (this.userList = data);
}

@observer
export default class MenuDetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.store = new MenuRelatedStore();
    }

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

    componentWillMount = async () => {
        await this.getRelatedRole();
        await this.getRelatedUser();
        this.store.combinedArray = [];

        // 遍历roles数组
        this.store.roleList.forEach((role) => {
            const tmp = {
                type: '角色',
                name: role.role_name,
                code: role.role_code,
                avatar: ''
            };
            this.store.combinedArray.push(tmp);
        });

        // 遍历users数组
        this.store.userList.forEach((user) => {
            const tmp = {
                type: '用户',
                name: user.user,
                code: '',
                avatar: avatarRoot + user.head_portrait
            };
            this.store.combinedArray.push(tmp);
        });
    };

    render() {
        const URRender = (text) => {
            if (text == '角色') {
                return (
                    <div style={{ verticalAlign: 'middle', display: 'flex' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                        </svg>
                        <div style={{ fontWeight: 'bold' }}> {text}</div>
                    </div>
                );
            }
            if (text == '用户') {
                return (
                    <div style={{ verticalAlign: 'middle', display: 'flex' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>
                        <div> {text}</div>
                    </div>
                );
            }
        };

        const columns = [
            {
                title: '类型',
                dataIndex: 'type',
                render: (text) => {
                    return URRender(text);
                }
            },
            {
                title: 'name',
                dataIndex: 'name'
            },
            {
                title: 'code',
                dataIndex: 'code'
            },
            {
                title: 'avatar',
                dataIndex: 'avatar',
                render: (text) => {
                    return ImgRender(text);
                }
            }
        ];

        return (
            <div>
                <Table
                    size="small"
                    pagination={false}
                    columns={columns}
                    dataSource={toJS(this.store.combinedArray)}></Table>
            </div>
        );
    }
}
