import React from 'react';
import FormRow from '../../../components/antdComponents/formRow';
import { Select } from 'antd';
import { inject, observer } from 'mobx-react';
const { Option } = Select;

@inject('permissionManageStore')
@observer
export default class ButtonModalContent extends React.Component {
    constructor(props) {
        super();
        this.store = props.permissionManageStore;
    }

    render() {
        return (
            <div className="roleModalContent">
                <FormRow
                    title="按钮名称"
                    fieldKey="name"
                    required="true"
                    defaultValue={this.store.buttonRowData.name}
                    onChange={this.store.setButtonRowData}
                />

                <FormRow
                    title="按钮编码"
                    fieldKey="button_code"
                    required="true"
                    defaultValue={this.store.buttonRowData.button_code}
                    onChange={this.store.setButtonRowData}
                />
                <FormRow
                    title="图标"
                    fieldKey="icon"
                    required="true"
                    defaultValue={this.store.buttonRowData.icon}
                    onChange={this.store.setButtonRowData}
                />
                <div className="form_group">
                    <div className="form_text_info">
                        <span style={{ color: 'red' }}>*</span>风格：
                    </div>
                    <div className="form_value_node">
                        <Select
                            defaultValue={this.store.buttonRowData.style}
                            style={{ width: 432 }}
                            onChange={(event) => this.store.setButtonRowData(event, 'style')}>
                            <Option value="primary">primary</Option>
                            <Option value="danger">danger</Option>
                        </Select>
                    </div>
                </div>
                <FormRow
                    title="文件路径"
                    fieldKey="file_path"
                    required="true"
                    defaultValue={this.store.buttonRowData.file_path}
                    onChange={this.store.setButtonRowData}
                />
                <div className="form_group">
                    <div className="form_text_info">
                        <span style={{ color: 'red' }}>*</span>是否使用组件：
                    </div>
                    <div className="form_value_node">
                        <Select
                            defaultValue={this.store.buttonRowData.using_component}
                            style={{ width: 432 }}
                            onChange={(event) => this.store.setButtonRowData(event, 'using_component')}>
                            <Option value="y">是</Option>
                            <Option value="n">否</Option>
                        </Select>
                    </div>
                </div>
                <FormRow
                    title="组件名称"
                    fieldKey="component_name"
                    defaultValue={this.store.buttonRowData.component_name}
                    onChange={this.store.setButtonRowData}
                />
            </div>
        );
    }
}
