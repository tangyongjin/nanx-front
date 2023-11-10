import React from 'react';
import { Modal, message, Select } from 'antd';
import api from '@/api/api';
import '@/components/UformExtends';

export default class BatchUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = {
            visible: false,
            columnsdata: [],
            batchId: [],
            selectData: '',
            newValue: '',
            formConfigData: {}
        };
        this.handleOk = this.handleOk.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.init = this.init.bind(this);
    }

    componentDidMount() {
        var columns = [];
        this.NanxTableStore.tableColumnConfig.map((item) => {
            columns.push(<Select.Option key={item.key}>{item.title}</Select.Option>);
        });
        this.setState({
            columnsdata: columns
        });
    }

    async handleOk() {
        if (this.state.selectData == '') {
            message.error('请选择需要修改字段');
            return;
        }

        if (this.state.newValue == '') {
            message.error('请输入修改后的值');
            return;
        }
        let params = {
            data: {
                DataGridCode: this.NanxTableStore.datagrid_code,
                batch_ids: this.state.batchId,
                rawdata: {}
            }
        };
        params.data.rawdata[this.state.selectData] = this.state.newValue;
        let res = await api.curd.batchUpdate(params);
        if (res.success == true) {
            this.setState({
                visible: false
            });
            this.props.refreshTable();
        }
    }

    init() {
        if (this.NanxTableStore.selectedRowKeys.length == 0) {
            message.error('您还没有选择需要修改的数据，请选择');
        } else {
            this.showModal();
        }
    }

    showModal() {
        var obj = {};
        var objarr = Object.keys(this.NanxTableStore.formCfg.properties);
        for (var i = 0; i < objarr.length; i++) {
            obj = Object.assign(this.NanxTableStore.formCfg.properties[objarr[i]].properties);
        }
        var arr = this.NanxTableStore.selectedRowKeys;
        this.setState({
            visible: true,
            batchId: arr,
            formConfigData: obj
        });
    }

    async onChange(event) {
        console.log(this.state.formConfigData, event);

        let newValuearr = [];
        if (this.state.formConfigData[event].type == 'assocselect') {
            let params = {
                data: this.state.formConfigData[event]['x-props']
            };
            let res = await api.curd.getTableData(params);

            res.data.map((item) => {
                newValuearr.push(<Select.Option key={item.value}>{item.display_text}</Select.Option>);
            });
        }
        this.setState({ selectData: event }, () => {});
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    render() {
        const children = this.state.columnsdata;

        return (
            <div>
                <Modal
                    title="批量修改："
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width="500px"
                    open={this.state.visible}>
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                        <Form.Item label="选择修改字段：">
                            <Select onChange={(event) => this.onChange(event, 'selectData')}>{children}</Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}
