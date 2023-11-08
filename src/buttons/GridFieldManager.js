import React from 'react';
import { Input, Card, Select, Divider, Button, Row, Col, Checkbox } from 'antd';
import { toJS } from 'mobx';
import { observer, inject } from 'mobx-react';

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
        // this.props.DataGridStore.setColsDbInfo(ColsDbInfo);
    };

    render() {
        let xtitle =
            '当前DataGrid: ' + this.props.DataGridStore.DataGridTitle + '/' + this.props.DataGridStore.DataGridCode;
        let allcols = this.props.DataGridStore.ColsDbInfo;
        console.log('当前Code= ' + this.props.DataGridStore.DataGridCode + ' 所有字段:');
        console.log(toJS(allcols));

        return (
            <Card style={{ width: '1550px' }} width={'1550px'} title={xtitle}>
                <Row>
                    <Col span={2}>字段</Col>
                    <Col span={2}>Label</Col>
                    <Col span={3}>插件</Col>
                    <Col span={2}>参数</Col>
                    <Col span={2}>tableX隐藏/可见</Col>
                    <Col span={2}>form隐藏/可见</Col>
                    <Col span={2}>form只读/可编辑</Col>
                    <Col span={2}>处理函数</Col>
                    <Col span={5}>数据字典</Col>
                    <Col span={2}>操作</Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={2}></Col>
                    <Col span={3}></Col>
                    <Col span={2}></Col>
                    <Col span={2}>
                        <Checkbox
                            style={{ marginLeft: '10px' }}
                            onChange={(event) => this.changeVisible('column_hidden', event)}>
                            {' '}
                            全选
                        </Checkbox>
                    </Col>
                    <Col span={2}>
                        <Checkbox onChange={(event) => this.changeVisible('form_hidden', event)}> 全选</Checkbox>
                    </Col>
                    <Col span={2}>
                        <Checkbox onChange={(event) => this.changeVisible('readonly', event)}> 全选</Checkbox>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={5}></Col>
                    <Col span={2}>
                        <Button
                            className=" round-button "
                            type="primary"
                            htmlType="button"
                            onClick={() => this.props.DataGridStore.batchUpdateFieldCfg()}>
                            保存
                        </Button>
                    </Col>
                </Row>
                <Divider />
                {allcols.map((col, idx) => (
                    <Row style={{ height: '40px', maxHeight: 40 }} key={idx}>
                        <Col
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis ellipsis',
                                height: '40px',
                                maxHeight: 40
                            }}
                            span={2}>
                            {col.Comment.length == 0 ? col.Field : col.Field + '/' + col.Comment}
                        </Col>
                        <Col span={2}>
                            <Input
                                value={col.label}
                                onChange={(e) => {
                                    this.changeCfg_input(e, 'label', col.Field);
                                }}
                            />
                        </Col>
                        <Col span={3}>
                            <Select
                                value={col.pluginname}
                                key={col.pluginname}
                                style={{ marginLeft: '10px', width: '140px' }}
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
                        </Col>
                        <Col span={2}>
                            <Input
                                disabled={col.Field == 'id'}
                                value={col.uform_para}
                                onChange={(e) => {
                                    this.changeCfg_input(e, 'uform_para', col.Field);
                                }}
                            />
                        </Col>
                        <Col span={2}>
                            <Checkbox
                                style={{ marginLeft: '8px' }}
                                checked={col.column_hidden}
                                onChange={(e) => {
                                    this.changeCfg_cbx(e, 'column_hidden', col.Field);
                                }}>
                                隐藏
                            </Checkbox>
                        </Col>
                        <Col span={2}>
                            <Checkbox
                                checked={col.form_hidden}
                                onChange={(e) => {
                                    this.changeCfg_cbx(e, 'form_hidden', col.Field);
                                }}>
                                隐藏
                            </Checkbox>
                        </Col>
                        <Col span={2}>
                            <Checkbox
                                checked={col.readonly}
                                onChange={(e) => {
                                    this.changeCfg_cbx(e, 'readonly', col.Field);
                                }}>
                                只读
                            </Checkbox>
                        </Col>
                        <Col span={2}>
                            <Input
                                disabled={col.Field == 'id'}
                                value={col.handler}
                                onChange={(e) => {
                                    this.changeCfg_input(e, 'handler', col.Field);
                                }}
                            />
                        </Col>
                        <Col span={5}>
                            <Select
                                style={{ paddingLeft: '10px', width: '200px' }}
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
                        </Col>
                        <Col span={2}>
                            <Button
                                className="round-button"
                                type="primary"
                                size="small"
                                style={{ backgroundColor: '#312C2C', borderColor: '#312C2C', color: 'white' }}
                                onClick={this.saveCfg.bind(this, col.Field)}>
                                保存
                            </Button>
                        </Col>
                    </Row>
                ))}
            </Card>
        );
    }
}
export default GridFieldManager;
