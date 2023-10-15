import React from 'react';
import { Input } from 'antd'


export default class GetLoginuser extends React.Component {
    constructor(props) {

        super(props)
        console.log(props)
    }
    componentWillMount() {
        console.log(1234, JSON.parse(sessionStorage.getItem('userInfo')).user)
        this.props.onChange(JSON.parse(sessionStorage.getItem('userInfo')).user)
    }
    render() {

        return (
            <Input disabled placeholder="" defaultValue={ JSON.parse(sessionStorage.getItem('userInfo')).user } value={ this.props.value != '' ? this.props.value : JSON.parse(sessionStorage.getItem('userInfo')).user } />
        );
    }
}