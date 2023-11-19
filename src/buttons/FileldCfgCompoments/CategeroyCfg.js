import React from 'react';
import { Select } from 'antd';
import { observer, inject } from 'mobx-react';

const { Option } = Select;
@inject('DataGridStore')
@observer
class PluginCfg extends React.Component {
    render() {
        return (
            <div className="fromBox">
                <div className="formItem">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z" />
                    </svg>
                    数据字典
                </div>
                <div className="formItem">
                    <Select
                        style={{ width: '200px' }}
                        value={this.props.col.category}
                        onChange={(e) => {
                            this.props.DataGridStore.changeCfg_dropdown(e, 'category', this.props.col.Field);
                        }}
                        showSearch
                        allowClear
                        disabled={this.props.col.Field == 'id'}
                        placeholder="字典表"
                        name="category">
                        {this.props.DataGridStore.Categories.length &&
                            this.props.DataGridStore.Categories.map((item, index) => (
                                <Option key={index} value={item.catid}>
                                    {item.catname}
                                </Option>
                            ))}
                    </Select>
                </div>
            </div>
        );
    }
}
export default PluginCfg;
