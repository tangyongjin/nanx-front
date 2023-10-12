import React from 'react'
import {Select} from 'antd'
import {observer} from 'mobx-react'

@observer
export default class SelectRow extends React.Component {

    render() {
        console.log();
        return (<div className="form_group">
            <div className="form_text_info">{this.props.required?<span style={{color:'red'}}>*</span>:<span></span>}{this.props.title}：</div>
            <div className="form_value_node">
                <Select
                    defaultValue={this.props.defaultValue || '请选择'}
                    onChange={event => this.props.onChange(event, this.props.fieldKey)}
                    style={{width: '100%'}}
                >
                    <Select.Option value='请选择'>请选择</Select.Option>
                    {
                        this.props.option_list.map(item=> {
                            return <Select.Option key={item.key} value={item.key}>
                            {
                                item.parent_text ? item.parent_text + "-" + item.text : item.text
                            }
                            </Select.Option>
                        })
                    }
                    
                </Select>
            </div>
        </div>
        )
    }
}
