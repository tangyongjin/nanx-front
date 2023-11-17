import React from 'react';
import { Input, Card, Select, Button, Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';
import { Tabs } from 'antd';

const { Option } = Select;
@inject('DataGridStore')
@observer
class GridFieldManager extends React.Component {
    saveCfg(field_cfg) {
        this.props.DataGridStore.saveFieldCfg(field_cfg);
    }

    changeCfg_input = function (a, attr, field) {
        let value = event.target.value;
        this.setFieldAttr(field, attr, value);
    };

    changeCfg_cbx = function (event, attr, field) {
        console.log(event, attr, field);
        let value = event.target.checked;
        this.setFieldAttr(field, attr, value);
    };

    changeCfg_dropdown = function (v, attr, field) {
        if (v == undefined) {
            v = '';
        }
        this.setFieldAttr(field, attr, v);
    };

    changeVisible = (key, e) => {
        let { ColsDbInfo } = this.props;
        ColsDbInfo.map((item) => {
            item[key] = e.target.checked;
            return item;
        });
        console.log(key, e.target.checked, this.props.DataGridStore.ColsDbInfo);
        this.props.DataGridStore.setColsDbInfo(ColsDbInfo);
    };

    setFieldAttr = (field, attr, value) => {
        this.props.DataGridStore.ColsDbInfo.map((element) => {
            if (element.Field === field) {
                element[attr] = value;
            }
        });
    };

    fieldPropertyEditor = (col) => {
        return (
            <div>
                <h3>
                    字段:{col.Field}/元类型:{col.Type}
                </h3>
                <div className="fromBox">
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path d="M7.75 2.75a.75.75 0 00-1.5 0v1.258a32.987 32.987 0 00-3.599.278.75.75 0 10.198 1.487A31.545 31.545 0 018.7 5.545 19.381 19.381 0 017 9.56a19.418 19.418 0 01-1.002-2.05.75.75 0 00-1.384.577 20.935 20.935 0 001.492 2.91 19.613 19.613 0 01-3.828 4.154.75.75 0 10.945 1.164A21.116 21.116 0 007 12.331c.095.132.192.262.29.391a.75.75 0 001.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 002.333-5.332c.31.031.618.068.924.108a.75.75 0 00.198-1.487 32.832 32.832 0 00-3.599-.278V2.75z" />
                            <path
                                fill-rule="evenodd"
                                d="M13 8a.75.75 0 01.671.415l4.25 8.5a.75.75 0 11-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 11-1.342-.67l4.25-8.5A.75.75 0 0113 8zm2.037 6.5L13 10.427 10.964 14.5h4.073z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        列名显示文本
                    </div>
                    <div className="formItem">
                        <Input
                            value={col.label}
                            onChange={(e) => {
                                this.changeCfg_input(e, 'label', col.Field);
                            }}
                        />
                    </div>
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path
                                fill-rule="evenodd"
                                d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zm4.03 6.28a.75.75 0 00-1.06-1.06L4.97 9.47a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L6.56 10l1.72-1.72zm4.5-1.06a.75.75 0 10-1.06 1.06L13.44 10l-1.72 1.72a.75.75 0 101.06 1.06l2.25-2.25a.75.75 0 000-1.06l-2.25-2.25z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        列渲染函数
                    </div>
                    <div className="formItem">
                        <Input
                            disabled={col.Field == 'id'}
                            value={col.handler}
                            onChange={(e) => {
                                this.changeCfg_input(e, 'handler', col.Field);
                            }}
                        />
                    </div>
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path d="M14 6H6v8h8V6z" />
                            <path
                                fill-rule="evenodd"
                                d="M9.25 3V1.75a.75.75 0 011.5 0V3h1.5V1.75a.75.75 0 011.5 0V3h.5A2.75 2.75 0 0117 5.75v.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v.5A2.75 2.75 0 0114.25 17h-.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-.5A2.75 2.75 0 013 14.25v-.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-.5A2.75 2.75 0 015.75 3h.5V1.75a.75.75 0 011.5 0V3h1.5zM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        字段类型/插件
                    </div>
                    <div className="formItem">
                        <Select
                            value={col.pluginname}
                            key={col.pluginname}
                            onChange={(e) => {
                                this.changeCfg_dropdown(e, 'pluginname', col.Field);
                            }}
                            disabled={col.Field == 'id'}
                            placeholder="UForm字段类型"
                            name="plugin">
                            {this.props.DataGridStore.plugins.length &&
                                this.props.DataGridStore.plugins.map((item, index) => (
                                    <Option key={index} value={item.plugid}>
                                        {item.plugname}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path
                                fill-rule="evenodd"
                                d="M15.212 2.079a.75.75 0 011.006.336A16.932 16.932 0 0118 10c0 2.724-.641 5.3-1.782 7.585a.75.75 0 11-1.342-.67A15.432 15.432 0 0016.5 10c0-2.486-.585-4.834-1.624-6.915a.75.75 0 01.336-1.006zm-10.424 0a.75.75 0 01.336 1.006A15.433 15.433 0 003.5 10c0 2.486.585 4.834 1.624 6.915a.75.75 0 11-1.342.67A16.933 16.933 0 012 10c0-2.724.641-5.3 1.782-7.585a.75.75 0 011.006-.336zm2.285 3.554a1.5 1.5 0 012.219.677l.856 2.08 1.146-1.77a2.25 2.25 0 013.137-.65l.235.156a.75.75 0 11-.832 1.248l-.235-.156a.75.75 0 00-1.045.216l-1.71 2.644 1.251 3.04.739-.492a.75.75 0 11.832 1.248l-.739.493a1.5 1.5 0 01-2.219-.677l-.856-2.08-1.146 1.77a2.25 2.25 0 01-3.137.65l-.235-.156a.75.75 0 01.832-1.248l.235.157a.75.75 0 001.045-.217l1.71-2.644-1.251-3.04-.739.492a.75.75 0 01-.832-1.248l.739-.493z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        插件参数(json)
                    </div>
                    <div className="formItem">
                        <Input
                            disabled={col.Field == 'id'}
                            value={col.uform_para}
                            onChange={(e) => {
                                this.changeCfg_input(e, 'uform_para', col.Field);
                            }}
                        />
                    </div>
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                                fill-rule="evenodd"
                                d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        表格隐藏/可见
                    </div>
                    <div className="formItem">
                        <Checkbox
                            checked={col.column_hidden}
                            onChange={(e) => {
                                this.changeCfg_cbx(e, 'column_hidden', col.Field);
                            }}>
                            隐藏
                        </Checkbox>
                    </div>
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                                fill-rule="evenodd"
                                d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        表单隐藏/可见
                    </div>
                    <div className="formItem">
                        <Checkbox
                            checked={col.form_hidden}
                            onChange={(e) => {
                                this.changeCfg_cbx(e, 'form_hidden', col.Field);
                            }}>
                            隐藏
                        </Checkbox>
                    </div>
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path
                                fill-rule="evenodd"
                                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        只读属性
                    </div>
                    <div className="formItem">
                        <Checkbox
                            checked={col.readonly}
                            onChange={(e) => {
                                this.changeCfg_cbx(e, 'readonly', col.Field);
                            }}>
                            只读
                        </Checkbox>
                    </div>
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z" />
                        </svg>
                        数据字典
                    </div>
                    <div className="formItem">
                        <Select
                            style={{ width: '200px' }}
                            value={col.category}
                            onChange={(e) => {
                                this.changeCfg_dropdown(e, 'category', col.Field);
                            }}
                            showSearch
                            allowClear
                            disabled={col.Field == 'id'}
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
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path
                                fill-rule="evenodd"
                                d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9.15l-.005.297a.75.75 0 11-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 00-3-2.965zm0 2.13a.75.75 0 01.75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 11-1.186-.918A13.687 13.687 0 009.25 9a.75.75 0 01.75-.75zm3.529 3.698a.75.75 0 01.584.885 18.883 18.883 0 01-2.257 5.84.75.75 0 11-1.29-.764 17.386 17.386 0 002.078-5.377.75.75 0 01.885-.584z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        初始值
                    </div>
                    <div className="formItem">
                        <Select
                            style={{ width: '200px' }}
                            value={col.category}
                            onChange={(e) => {
                                this.changeCfg_dropdown(e, 'category', col.Field);
                            }}
                            showSearch
                            allowClear
                            disabled={col.Field == 'id'}
                            placeholder="字典表"
                            name="category">
                            {this.props.DataGridStore.Categories.length &&
                                this.props.DataGridStore.Categories.map((item, index) => (
                                    <Option key={index} value={item.catid}>
                                        {item.catname}
                                    </Option>
                                ))}
                        </Select>
                    </div>{' '}
                    <div className="formItem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5">
                            <path
                                fill-rule="evenodd"
                                d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z"
                                clip-rule="evenodd"
                            />
                            <path d="M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z" />
                        </svg>
                        校验规则
                    </div>
                    <div className="formItem">
                        <Select
                            style={{ width: '200px' }}
                            value={col.category}
                            onChange={(e) => {
                                this.changeCfg_dropdown(e, 'category', col.Field);
                            }}
                            showSearch
                            allowClear
                            disabled={col.Field == 'id'}
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
                <div style={{ marginLeft: '390px', marginTop: '46px' }}>
                    <Button
                        className="round-button"
                        type="primary"
                        size="small"
                        onClick={this.saveCfg.bind(this, col.Field)}>
                        保存字段配置
                    </Button>
                </div>
            </div>
        );
    };

    render() {
        let xtitle =
            '当前DataGrid: (' +
            this.props.DataGridStore.DataGridCode +
            '/' +
            this.props.DataGridStore.DataGridTitle +
            ')';
        let allcols = this.props.DataGridStore.ColsDbInfo;

        return (
            <Card title={xtitle}>
                <div>
                    <Tabs
                        defaultActiveKey="1"
                        tabPosition={'top'}
                        type="card"
                        style={{
                            height: 346
                        }}
                        items={allcols.map((col, idx) => {
                            const id = String(idx);
                            return {
                                label: col.Field,
                                key: id,
                                children: this.fieldPropertyEditor(col)
                            };
                        })}
                    />
                </div>
            </Card>
        );
    }
}
export default GridFieldManager;
