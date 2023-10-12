import React from 'react';
import { Input } from 'antd'


export default class GetLander extends React.Component {
    constructor(props) {

        super(props)
        console.log(props)
    }
    componentWillMount(){
        console.log(1234,JSON.parse(sessionStorage.getItem('userInfo')).staff_name)
        this.props.onChange(JSON.parse(sessionStorage.getItem('userInfo')).staff_name)
    }
    render() {

        return (
            <Input disabled placeholder="" defaultValue={JSON.parse(sessionStorage.getItem('userInfo')).staff_name}  value={this.props.value!=''?this.props.value:JSON.parse(sessionStorage.getItem('userInfo')).staff_name}/>
        );
    }
}