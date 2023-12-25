import React from 'react';
import { Button, Select } from 'antd';
import api from '@/api/api';

const { Option } = Select;

export default class RoleAsign extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = { allRoles: [], role_code: null, currentRole: null };
    }

    async componentWillMount() {
        await this.init();
    }

    //eslint-disable-next-line
    async init(buttonSource) {
        this.setState({ allRoles: [] });

        let res = await api.permission.getAllRoles();
        this.setState({
            allRoles: res.roles
        });
        this.props.NanxTableStore.showButtonModal();
        await this.getUserRole();
    }

    onChange(a) {
        this.setState({ role_code: a });
    }

    getUserRole = async () => {
        let params = { data: { user: this.props.NanxTableStore.selectedRows[0].user } };
        let res = await api.permission.getUserRole(params);
        if (res.role) {
            this.setState({ currentRole: res.role });
        }
    };

    assignUserRole = async () => {
        let params = {
            data: { role_code: this.state.role_code, user: this.props.NanxTableStore.selectedRows[0].user }
        };
        await api.permission.assignUserRole(params);
        await this.getUserRole();
    };

    render() {
        return (
            <div>
                <h4>&nbsp;</h4>
                <h3> {this.state.currentRole ? `当前角色: ${this.state.currentRole.role_name}` : null} </h3>
                选择新分配角色:
                <Select
                    style={{ width: '300px', marginLeft: '10px' }}
                    value={this.state.btncode}
                    showSearch
                    allowClear
                    placeholder="角色列表"
                    onChange={(v) => this.onChange(v)}
                    name="category">
                    {this.state.allRoles.length &&
                        this.state.allRoles.map((item, index) => (
                            <Option key={index} label={item.role_name} value={item.role_code}>
                                {item.role_code} {item.role_name}
                            </Option>
                        ))}
                </Select>
                <Button onClick={() => this.assignUserRole()} style={{ marginLeft: '10px' }}>
                    分配
                </Button>
            </div>
        );
    }
}
