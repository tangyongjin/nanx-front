import React from 'react';
import { Input, Select } from 'antd';
import { observer, inject } from 'mobx-react';
import CellsRenderHandlers from '@/routes/NanxTable/NanxTableCom/cellRenders/cellsRenderHandlers';
const { Option } = Select;

@inject('GridConfigStore')
@observer
class ColRenderCfg extends React.Component {
    render() {
        const renders = [];
        for (let key in CellsRenderHandlers) {
            renders.push(key);
        }

        return (
            <div className="fromBox">
                <div className="formItem">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L4.97 9.47a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L6.56 10l1.72-1.72zm4.5-1.06a.75.75 0 10-1.06 1.06L13.44 10l-1.72 1.72a.75.75 0 101.06 1.06l2.25-2.25a.75.75 0 000-1.06l-2.25-2.25z"
                            clipRule="evenodd"
                        />
                    </svg>
                    列渲染函数
                </div>
                <div className="formItem">
                    <Select
                        style={{ width: '200px' }}
                        value={this.props.col.handler}
                        onChange={(e) => {
                            this.props.GridConfigStore.changeCfg_dropdown(e, 'handler', this.props.col.Field);
                        }}
                        showSearch
                        allowClear
                        disabled={this.props.col.Field == 'id'}
                        placeholder="列渲染函数"
                        name="handler">
                        {renders.map((item, index) => (
                            <Option key={index} value={item}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        );
    }
}
export default ColRenderCfg;
