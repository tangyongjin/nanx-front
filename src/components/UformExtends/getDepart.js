import React from 'react';
import { Input } from 'antd'


export default class GetDepart extends React.Component {
    constructor(props) {

        super(props)
        console.log(4567,props)
    }
    componentWillMount(){
        this.props.onChange(JSON.parse(sessionStorage.getItem('userInfo')).department)
    }
    render() {

        return (
            <Input disabled placeholder="" defaultValue={JSON.parse(sessionStorage.getItem('userInfo')).department} value={this.props.value!=''?this.props.value:JSON.parse(sessionStorage.getItem('userInfo')).department}/>
        );
    }
}