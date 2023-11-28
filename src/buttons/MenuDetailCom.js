import { observable, action } from 'mobx';
import React from 'react';
import { Table } from 'antd';
import { toJS } from 'mobx';
import ImgRender from '@/routes/NanxTable/NanxTableCom/cellRenders/ImgRender';
import { BsPerson } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
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
                        <BsPeople style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                        <div style={{ fontWeight: 'bold' }}> {text}</div>
                    </div>
                );
            }
            if (text == '用户') {
                return (
                    <div style={{ verticalAlign: 'middle', display: 'flex' }}>
                        <BsPerson style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
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
