import React from 'react';
import { Select, Button, Popover, Input } from 'antd';
import { observer, inject } from 'mobx-react';
import QuestionIcon from '@/iconsHero/question';
import CodeBracketSquare from '@/iconsHero/CodeBracketSquare';
import ReactJson from 'react-json-view';
import { tryParseJSON } from '@/utils/tools';

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
                    memo: '如:2021,"hello,world"'
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
                    memo: '如根据ISBN号获取书名,必须返回json,{"value:"someValue"},或者根据产品型号获取当前价格'
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
        const showJsonTree = (str) => {
            const parsedObject = tryParseJSON(str);

            if (parsedObject == null) {
                return <div>{str}</div>;
            } else {
                return <ReactJson src={parsedObject} theme="twilight" />;
            }
        };

        return (
            <div className="formWrapper">
                <div className="fromBox">
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
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
                            style={{ width: '500px' }}
                            listItemHeight={321}
                            value={this.props.col.default_v}
                            key={this.props.col.default_v}
                            onChange={(e) => {
                                this.props.DataGridStore.changeCfg_dropdown(e, 'default_v', this.props.col.Field);
                            }}
                            optionRender={(item) => {
                                return (
                                    <div>
                                        <div className="plugBox  bottom_border">
                                            <div className="plugItem">{item.data.value}</div>
                                            <div className="plugItem"> {item.data.label}</div>
                                        </div>
                                        <div className="plugBox">
                                            <div className="plugItem"></div>
                                            <div className="plugMemo">{item.data.memo}</div>
                                        </div>
                                    </div>
                                );
                            }}
                            disabled={this.props.col.Field == 'id'}
                            placeholder="初始值配置"
                            name="plugin">
                            {this.state.opts.map((item, index) => (
                                <Option key={index} value={item.initItemID} label={item.initItemName} memo={item.memo}>
                                    <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
                                        <span style={{ width: '150px' }}>{item.initItemID}</span>
                                        <span style={{ marginLeft: '30px' }}>{item.initItemName}</span>
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>

                <div className="fromBox">
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path
                                fillRule="evenodd"
                                d="M15.212 2.079a.75.75 0 011.006.336A16.932 16.932 0 0118 10c0 2.724-.641 5.3-1.782 7.585a.75.75 0 11-1.342-.67A15.432 15.432 0 0016.5 10c0-2.486-.585-4.834-1.624-6.915a.75.75 0 01.336-1.006zm-10.424 0a.75.75 0 01.336 1.006A15.433 15.433 0 003.5 10c0 2.486.585 4.834 1.624 6.915a.75.75 0 11-1.342.67A16.933 16.933 0 012 10c0-2.724.641-5.3 1.782-7.585a.75.75 0 011.006-.336zm2.285 3.554a1.5 1.5 0 012.219.677l.856 2.08 1.146-1.77a2.25 2.25 0 013.137-.65l.235.156a.75.75 0 11-.832 1.248l-.235-.156a.75.75 0 00-1.045.216l-1.71 2.644 1.251 3.04.739-.492a.75.75 0 11.832 1.248l-.739.493a1.5 1.5 0 01-2.219-.677l-.856-2.08-1.146 1.77a2.25 2.25 0 01-3.137.65l-.235-.156a.75.75 0 01.832-1.248l.235.157a.75.75 0 001.045-.217l1.71-2.644-1.251-3.04-.739.492a.75.75 0 01-.832-1.248l.739-.493z"
                                clipRule="evenodd"
                            />
                        </svg>
                        初始值参数
                    </div>

                    <div className="formItemBig">
                        <Input
                            disabled={this.props.col.Field == 'id'}
                            value={this.props.col.defaultv_para}
                            onChange={(e) => {
                                this.props.DataGridStore.changeCfg_input(e, 'defaultv_para', this.props.col.Field);
                            }}
                        />
                        <Button style={{ marginLeft: '10px' }}>
                            <CodeBracketSquare />
                        </Button>
                        <Popover
                            className="help-tip"
                            content={showJsonTree(this.props.col.defaultv_para)}
                            title="帮助:初始值参数"
                            trigger="hover">
                            <Button>
                                <QuestionIcon />
                            </Button>
                        </Popover>
                    </div>
                </div>
            </div>
        );
    }
}
export default InitValeCfg;
