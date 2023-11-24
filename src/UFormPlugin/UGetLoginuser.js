import React from 'react';
import { Input } from 'antd';

export default class UGetLoginuser extends React.Component {
    componentWillMount() {
        this.props.onChange(JSON.parse(sessionStorage.getItem('userInfo')).user);
    }

    render() {
        return (
            <Input
                disabled
                placeholder=""
                defaultValue={JSON.parse(sessionStorage.getItem('userInfo')).user}
                value={this.props.value != '' ? this.props.value : JSON.parse(sessionStorage.getItem('userInfo')).user}
            />
        );
    }
}
