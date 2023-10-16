import React from 'react';
import { message, Select, Modal } from 'antd';
import api from '@/api/api';
const { Option } = Select;

export default class GridButtonAdder extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;
        this.state = {
            record: null,
            allButtons: [],
            buttons: [],
            visible: false,
            btncode: null
        };
    }

    onChange(a) {
        this.setState({ btncode: a });
    }

    async init() {
        if (this.props.commonTableStore.selectedRows.length <= 0) {
            message.error('请选择一条数据');
            return;
        }

        let currentrow = this.props.commonTableStore.selectedRows[0];
        console.log(currentrow);

        let params = { data: {}, method: 'POST' };
        let res = await api.button.getAllButtons(params);

        this.setState({
            visible: true,
            record: currentrow,
            allButtons: res.data
        });
    }

    handleOk = async () => {};

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <div>
                {this.state.record ? (
                    <Modal
                        title="分配按钮"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                        width="1200px"
                        visible={this.state.visible}
                        destroyOnClose={true}>
                        {this.state.allButtons.length == 0 ? null : (
                            <div>
                                <Select
                                    style={{ width: '400px' }}
                                    value={this.state.btncode}
                                    showSearch
                                    allowClear
                                    placeholder="按钮列表"
                                    onChange={(v) => this.onChange(v)}
                                    name="category">
                                    {this.state.allButtons.length &&
                                        this.state.allButtons.map((item, index) => (
                                            <Option key={index} value={item.button_code}>
                                                {item.button_code} {item.name}
                                            </Option>
                                        ))}
                                </Select>
                            </div>
                        )}
                    </Modal>
                ) : null}
            </div>
        );
    }
}
