import React from 'react';
import { Radio } from 'antd';

export default class UYesOrNo extends React.Component {
    onChange = (e) => {
        this.props.getComponentValue(e.target.value);
    };

    render() {
        return (
            <Radio.Group
                disabled={this.props.editable ? !this.props.editable : false}
                onChange={this.onChange}
                value={this.props.value == '是' ? 'y' : this.props.value == '否' ? 'n' : this.props.value}>
                <Radio value={'y'}>是</Radio>
                <Radio value={'n'}>否</Radio>
            </Radio.Group>
        );
    }
}
