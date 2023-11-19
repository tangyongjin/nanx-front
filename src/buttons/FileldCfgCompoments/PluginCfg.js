import React from 'react';
import { Input, Select, Button, Checkbox, Popover } from 'antd';
import { observer, inject } from 'mobx-react';
import ReactJson from 'react-json-view';

const { Option } = Select;
@inject('DataGridStore')
@observer
class PluginCfg extends React.Component {
    render() {
        function tryParseJSON(str) {
            if (str == undefined) {
                return '';
            }

            if (!str) {
                return '';
            }
            if (str.length == 0) {
                return '';
            }
            if (str.length < 4) {
                return '';
            }

            try {
                const parsedJSON = JSON.parse(str);
                return parsedJSON;
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return null; // or handle the error in some way
            }
        }

        const paraJson = (str) => {
            if (str == undefined) {
                return <div></div>;
            }

            if (str == null) {
                return <div></div>;
            }

            console.log(str);
            const parsedObject = tryParseJSON(str);

            if (parsedObject !== null) {
                console.log('Parsed JSON:', parsedObject);
                return <ReactJson src={parsedObject} theme="twilight" />;
            } else {
                if (str.length > 0) {
                    return <div>{str}</div>;
                }
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
                            <path d="M14 6H6v8h8V6z" />
                            <path
                                fillRule="evenodd"
                                d="M9.25 3V1.75a.75.75 0 011.5 0V3h1.5V1.75a.75.75 0 011.5 0V3h.5A2.75 2.75 0 0117 5.75v.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v.5A2.75 2.75 0 0114.25 17h-.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-.5A2.75 2.75 0 013 14.25v-.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-.5A2.75 2.75 0 015.75 3h.5V1.75a.75.75 0 011.5 0V3h1.5zM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        字段类型/插件
                    </div>
                    <div className="formItemBig">
                        <Select
                            className="longSelect"
                            style={{ width: '500px' }}
                            value={this.props.col.pluginname}
                            key={this.props.col.pluginname}
                            onChange={(e) => {
                                this.props.DataGridStore.changeCfg_dropdown(e, 'pluginname', this.props.col.Field);
                            }}
                            disabled={this.props.col.Field == 'id'}
                            placeholder="UForm字段类型"
                            name="plugin">
                            {this.props.DataGridStore.plugins.length &&
                                this.props.DataGridStore.plugins.map((item, index) => (
                                    <Option key={index} value={item.plugid}>
                                        <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
                                            <span style={{ width: '150px' }}>{item.plugid}</span>
                                            <span style={{ marginLeft: '30px' }}>
                                                (<span>{item.plugname}</span>
                                                <span style={{ width: '10px' }}>/</span>
                                                <span>{item.memo}]</span>)
                                            </span>
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
                        插件参数(json)
                    </div>

                    <div className="formItemBig">
                        <Input
                            disabled={this.props.col.Field == 'id'}
                            value={this.props.col.uform_para}
                            onChange={(e) => {
                                this.props.DataGridStore.changeCfg_input(e, 'uform_para', this.props.col.Field);
                            }}
                        />

                        <Popover
                            className="help-tip"
                            content={paraJson(this.props.col.uform_para)}
                            title="帮助:插件参数"
                            trigger="hover">
                            <Button>?</Button>
                        </Popover>
                    </div>
                </div>
            </div>
        );
    }
}
export default PluginCfg;
