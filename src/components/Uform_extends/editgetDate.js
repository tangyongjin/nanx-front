import React from 'react';
import { DatePicker } from 'antd'
import { formatDate} from '@/utils/tools'
import moment from 'moment';


export default class GetDate extends React.Component {
    constructor(props) {

        super(props)
        this.state={
            datevalue:''
        }
        
    }
    componentWillMount(){
        this.setState({
            selectedRowKeys: [],
            datevalue: formatDate(new Date())
        },()=>{this.props.onChange(this.state.datevalue) })
                   
        
        
    }
    formChange = (e, dateString) => {
        this.setState({
            datevalue:dateString
        },()=>{this.props.onChange(this.state.datevalue) })

    }
    render() {
        return (
            // <div style={{width:'32%'}}>
            <DatePicker style={{width:'32%'}} value={moment(this.state.datevalue)} format="YYYY-MM-DD" onChange={this.formChange} placeholder='请选择时间' />
            // </div>
        );
    }
}