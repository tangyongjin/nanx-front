import React from 'react'
import {Input} from 'antd'

export default class FormRow extends React.Component {

    render() {
        return (<div className="form_group">
            <div className="form_text_info">{this.props.required?<span style={{color:'red'}}>*</span>:<span></span>}{this.props.title}：</div>
            <div className="form_value_node">    
                <Input
                    disabled={this.props.disabled?true:false}
                    defaultValue={this.props.defaultValue}
                    onChange={event => this.props.onChange(event.target.value, this.props.fieldKey)}
                />
            </div>
        </div>
        )
    }
}
