import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default class Dropdownlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opts: ['aa', 'bb', 'cc', 'dd']
        };
    }

    onChange = (e) => {
        this.props.getComponentValue(e);
    };

    render() {
        let dropdownoptions = this.state.opts;
        console.log('🧤🧤🧤🧤🧤🧤🧤', this.props.value, this.props.default);

        return (
            <div>
                <Select
                    value={this.props.value || this.props.default}
                    placeholder="请选择"
                    style={{ width: 120 }}
                    onChange={this.onChange}>
                    {dropdownoptions
                        ? dropdownoptions.map((item, index) => {
                              return (
                                  <Option key={index} value={item}>
                                      {item}
                                  </Option>
                              );
                          })
                        : null}
                </Select>
            </div>
        );
    }
}
