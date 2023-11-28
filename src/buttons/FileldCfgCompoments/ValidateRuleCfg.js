import React from 'react';
import { Select } from 'antd';
import { observer, inject } from 'mobx-react';
import { VscCheck } from 'react-icons/vsc';

const { Option } = Select;
@inject('GridConfigStore')
@observer
class PluginCfg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opts: [
                {
                    validateItemId: 'chineseMobile',
                    validateItemName: '中国手机号',
                    memo: 'ff'
                },
                {
                    validateItemId: 'chinaID',
                    validateItemName: '中国身份证',
                    memo: 'ff'
                }
            ]
        };
    }

    render() {
        return (
            <div className="fromBox">
                <div className="formItem">
                    <VscCheck style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                    校验规则
                </div>

                <div className="formItem">
                    <Select
                        value={this.props.col.validateRule}
                        onChange={(e) => {
                            this.props.GridConfigStore.changeCfg_dropdown(e, 'validateRule', this.props.col.Field);
                        }}
                        showSearch
                        allowClear
                        disabled={this.props.col.Field == 'id'}
                        placeholder="校验规则"
                        name="validateRule">
                        {this.state.opts.map((item, index) => (
                            <Option key={index} value={item.validateItemId}>
                                <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
                                    <span style={{ width: '150px' }}>{item.validateItemId}</span>
                                    <span style={{ marginLeft: '30px' }}>
                                        (<span>{item.validateItemName}</span>
                                        <span style={{ width: '10px' }}>/</span>
                                        <span>{item.memo}]</span>)
                                    </span>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        );
    }
}
export default PluginCfg;
