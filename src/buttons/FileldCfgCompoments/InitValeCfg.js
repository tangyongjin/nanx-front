import React from 'react';
import { Select } from 'antd';
import { observer, inject } from 'mobx-react';

const { Option } = Select;
@inject('DataGridStore')
@observer
class InitValeCfg extends React.Component {
    constructor(props) {
        super(props);
        console.log('props: ', props);

        this.state = {
            opts: [
                {
                    initItemID: 'fixValue',
                    initItemName: '固定值',
                    memo: 'ff'
                },
                {
                    initItemID: 'currentData',
                    initItemName: '当前日期',
                    memo: '类似 2023-11-22'
                },
                {
                    initItemID: 'currentDataTime',
                    initItemName: '当前日期',
                    memo: '类似 2023-11-22 14:31:22'
                },
                {
                    initItemID: 'RemoteFetchOnSite',
                    initItemName: '根据当前表单某个字段获取其他值',
                    memo: '如根据ISBN号获取书名,必须返回json,{"value:"someValue"}'
                },
                {
                    initItemID: 'RemoteFetchAlone',
                    initItemName: '获取某个接口返回的数据',
                    memo: '比如当天汇率/温度,必须返回json,{"value:"someValue"}'
                }
            ]
        };
    }

    render() {
        return (
            <div className="fromBox">
                <div className="formItem">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9.15l-.005.297a.75.75 0 11-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 00-3-2.965zm0 2.13a.75.75 0 01.75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 11-1.186-.918A13.687 13.687 0 009.25 9a.75.75 0 01.75-.75zm3.529 3.698a.75.75 0 01.584.885 18.883 18.883 0 01-2.257 5.84.75.75 0 11-1.29-.764 17.386 17.386 0 002.078-5.377.75.75 0 01.885-.584z"
                            clipRule="evenodd"
                        />
                    </svg>
                    初始值
                </div>

                <div className="formItemBig">
                    <Select
                        className="longSelect"
                        value={this.props.col.default_v}
                        onChange={(e) => {
                            this.props.DataGridStore.changeCfg_dropdown(e, 'default_v', this.props.col.Field);
                        }}
                        showSearch
                        allowClear
                        disabled={this.props.col.Field == 'id'}
                        placeholder="初始值配置"
                        name="default_v">
                        {this.state.opts.map((item, index) => (
                            <Option key={index} value={item.initItemID}>
                                <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
                                    <span style={{ width: '150px' }}>{item.initItemID}</span>
                                    <span style={{ marginLeft: '30px' }}>
                                        (<span>{item.initItemName}</span>
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
export default InitValeCfg;
