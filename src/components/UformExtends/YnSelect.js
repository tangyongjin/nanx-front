import React from 'react';
import { Select } from 'antd'


export default class YnSelect extends React.Component {
    constructor(props) {

        super(props)
        this.state={
            step:null
        }
        
    
       
    }
    componentWillReceiveProps(nextProps){ 
            this.setState({
                step:nextProps.step
            })
 
     
    } 
    handleChange=(value)=>{
        this.props.onChange(value)
    }
    render() {
        const stepnum=this.state.step
        var step=[false,false,false,false,false]
        for(var i=0;i<=stepnum;i++){          
            step[i]=true
        }
        return (
            <Select style={{ width:"100%" }} onChange={this.handleChange}>
            <Select.Option key='初步洽谈' value="初步洽谈" disabled={step[0]}>初步洽谈</Select.Option>
            <Select.Option key='需求确认' value="需求确认" disabled={step[1]}>需求确认</Select.Option>
            <Select.Option key='方案/报价' value="方案/报价" disabled={step[2]}>方案/报价</Select.Option>
            <Select.Option key='谈判审核' value="谈判审核" disabled={step[3]}>谈判审核</Select.Option>
            <Select.Option key='输单' value="输单" disabled={step[4]}>输单</Select.Option>
            <Select.Option key='赢单' value="赢单" disabled={step[5]}>赢单</Select.Option>
          </Select>
        );
    }
}