import React from 'react';
import { Select } from 'antd';
import api from '@/api/api';
const { Option } = Select;

export default class UCategoryDropDown extends React.Component {
    state = {
        opts: []
    };

    componentDidMount() {
        this.getOptionList();
    }

    getOptionList = async () => {
        // 根据插件参数获取数据字典对应的数据
        let params = {
            data: {
                category: this.props.uform_para
            }
        };

        let json = await api.bpm.getNanxCodeTableByCategory(params);
        if (json.code == 200) {
            this.setState({ opts: json.data });
        }
    };

    onChange = (e) => {
        this.props.getComponentValue(e);
    };

    render() {
        return (
            <div>
                <Select
                    value={this.props.value || this.props.default}
                    placeholder="请选择"
                    style={{ width: 120 }}
                    onChange={this.onChange}>
                    {this.state.opts.map((item, index) => {
                        return (
                            <Option key={index} value={item.display_text}>
                                {item.display_text}
                            </Option>
                        );
                    })}
                </Select>
            </div>
        );
    }
}
