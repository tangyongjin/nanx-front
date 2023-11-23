import api from '@/api/api';
import { Button, message, Modal, Spin, Upload } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';

@observer
export default class UploadSubSheets extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.getExcelUrl = this.getExcelUrl.bind(this);
        this.getModalProps = this.getModalProps.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
    }

    state = {
        visible: false,
        working: false
    };

    init() {
        this.setState({ visible: true, working: false });
    }

    showLoading = () => {
        this.setState({ working: true });
    };

    hideLoading = () => {
        this.setState({ working: false });
    };

    onCancel = () => {
        this.setState({
            visible: false,
            working: false
        });
    };

    getExcelUrl = () => {
        const that = this;
        const props = {
            name: 'file',
            action: api.filehandler.uploadSubSheetExcel,
            loading: true,
            // accept: 'application/vnd.ms-excel',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            onChange(info) {
                that.showLoading();

                if (info.file.status === 'error') {
                    that.hideLoading();
                    message.success(`${info.file.name} 上传失败！`);
                }

                if (info.file.status === 'done') {
                    that.hideLoading();

                    if (info.file.response.code === 200) {
                        message.success(`${info.file.name} 上传成功！`);
                        that.props.refreshTable();
                    }

                    if (info.file.response.code === 500) {
                        message.error(info.file.response.message, 10);
                    }
                }
            }
        };
        return props;
    };

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            title: '上传子表xls',
            bodyStyle: {
                width: 1200,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onCancel: () => this.onCancel()
        };
    }

    render() {
        const modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    <div>上传文件中不能包含重复数据(月份+类型+姓名)</div>
                    <div>上传文件中所有姓名必须在员工表中</div>
                    <div>上传文件中数据不能已经存在</div>
                    <br />

                    {this.state.working ? <Spin tip="上传中..."></Spin> : ''}
                    <br />
                    <br />

                    <Upload {...this.getExcelUrl()} showUploadList={false}>
                        <Button>选择子表文件</Button>
                    </Upload>
                </div>
            </Modal>
        );
    }
}
