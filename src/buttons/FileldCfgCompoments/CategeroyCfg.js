import React from 'react';
import { Select } from 'antd';
import { observer, inject } from 'mobx-react';
import { BsCardList } from 'react-icons/bs';

<BsCardList />;

const { Option } = Select;
@inject('GridConfigStore')
@observer
class PluginCfg extends React.Component {
    render() {
        return (
            <div className="fromBox">
                <div className="formItem">
                    <BsCardList style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                    数据字典
                </div>
                <div className="formItem">
                    <Select
                        style={{ width: '200px' }}
                        value={this.props.col.category}
                        onChange={(e) => {
                            this.props.GridConfigStore.changeCfg_dropdown(e, 'category', this.props.col.Field);
                        }}
                        showSearch
                        allowClear
                        disabled={this.props.col.Field == 'id'}
                        placeholder="字典表"
                        name="category">
                        {this.props.GridConfigStore.Categories.length &&
                            this.props.GridConfigStore.Categories.map((item, index) => (
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
