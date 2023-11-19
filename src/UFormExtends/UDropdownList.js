import React from 'react';
import { Select } from 'antd';
import { tryParseJSON } from '@/utils/tools';
const { Option } = Select;
export default class Dropdownlist extends React.Component {
    constructor(props) {
        super(props);
        console.log('props: ', props);

        this.state = {
            opts: tryParseJSON(props.uform_para)
        };
    }

    onChange = (e) => {
        this.props.getComponentValue(e);
    };

    render() {
        let dropdownoptions = this.state.opts;

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
