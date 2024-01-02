import React from 'react';
import { Select } from 'antd';
import { observer, inject } from 'mobx-react';
import CellsRenderHandlers from '@/routes/NanxTable/cellRenders/cellsRenderHandlers';
import { BsCodeSquare } from 'react-icons/bs';

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
            <div className="fromBox-half">
                <div className="formItem">
                    <BsCodeSquare style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                    列渲染函数
                </div>
                <div className="formItem">
                    <Select
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
