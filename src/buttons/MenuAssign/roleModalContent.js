import React from 'react';
import { Input } from 'antd';

export default class RoleModalContent extends React.Component {
    render() {
        return (
            <div className="roleModalContent">
                <div className="form_group">
                    <div className="form_text_info">角色code：</div>
                    <div className="form_value_node">
                        <Input
                            defaultValue={this.props.roleRowData.role_code}
                            onChange={(event) => this.props.setRowData(event, 'role_code')}
                        />
                    </div>
                </div>
                <div className="form_group">
                    <div className="form_text_info">角色名称：</div>
                    <div className="form_value_node">
                        <Input
                            defaultValue={this.props.roleRowData.role_name}
                            onChange={(event) => this.props.setRowData(event, 'role_name')}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
