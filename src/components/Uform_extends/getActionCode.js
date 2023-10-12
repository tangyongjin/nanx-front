import React from 'react';
import { Input } from 'antd';

export default class GetActionCode extends React.Component {
    constructor(props) {
        super(props);
        console.log(2345, props);
    }
    componentWillMount() {
        this.props.onChange(this.props.datagrid_code);
    }
    render() {
        console.log(this.props);
        return (
            <Input
                disabled
                placeholder=""
                defaultValue={this.props.datagrid_code}
                value={this.props.value != '' ? this.props.value : null}
            />
        );
    }
}
