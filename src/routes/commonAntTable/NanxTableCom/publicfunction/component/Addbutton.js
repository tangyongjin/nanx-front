import React from 'react';
import { Form, Select, message, Modal } from 'antd';
import api from '@/api/api';
import { observer } from 'mobx-react';
import permissionManageStore from '@/store/permissionManageStore';
import dmStore from '@/store/dmStore';
const { Option } = Select;

@observer
export default class Addbutton extends React.Component {
    constructor(props) {
        super(props);
        this.store = permissionManageStore;
        this.stores = dmStore;
        this.state = {
            visible: false,
            value: ''
        };
        this.handleOk = this.handleOk.bind(this);
        this.addbutton = this.addbutton.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    componentWillMount() {
        this.store.getButtonList_noparams();
    }

    async handleOk() {
        let params = {
            data: {
                datagrid_code: this.stores.current_DataGridCode,
                id: this.state.value
            },
            method: 'POST'
        };
        let res = await api.button.addmenuButton(params);
        if (res.code == '200') {
            message.success('添加成功');
            this.handleCancel();
        }
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }

    addbutton() {
        this.setState({
            visible: true
        });
    }
    getValue(value) {
        console.log(value);
        this.setState({
            value: value
        });
    }

    render() {
        const children = [];
        let list = this.store.buttonList;
        for (var i = 0; i < list.length; i++) {
            children.push(<Option key={list[i].id}>{list[i].name}</Option>);
        }
        return (
            <Modal
                title="关联按钮："
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认"
                cancelText="取消"
                width="400px"
                visible={this.state.visible}>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                    <Form.Item label="选择按钮：">
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={this.getValue}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {children}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
