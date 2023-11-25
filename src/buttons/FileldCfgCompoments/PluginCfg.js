import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Popover } from 'antd';
import { observer, inject } from 'mobx-react';
import ReactJson from 'react-json-view';
import { tryParseJSON } from '@/utils/tools';
import QuestionIcon from '@/iconsHero/question';
import Xsymbol from '@/iconsHero/xSymbol';
import PlugSymbol from '@/iconsHero/plugSymbol';

const { Option } = Select;

const PluginCfg = inject('DataGridStore')(
    observer((props) => {
        console.log('PluginCfg>props: ', props);

        const [willShowParaComponent, setWillShowParaComponent] = useState(false);
        const [currentInitItemId, setCurrentInitItemId] = useState(null);
        const [TplFromCfg, setTplFromCfg] = useState(null);

        const showJsonTree = (str) => {
            const parsedObject = tryParseJSON(str);

            if (parsedObject == null) {
                return <div>{str}</div>;
            } else {
                return <ReactJson src={parsedObject} theme="twilight" />;
            }
        };

        const checkIfShowParaComponent = (selectedPlugId) => {
            console.log('selectedPlugId: ', selectedPlugId);
            setCurrentInitItemId(selectedPlugId);
            const foundItem = props.DataGridStore.plugins.find((item) => item.plugid === selectedPlugId);

            if (foundItem) {
                console.log('foundItem:++++++++= ', foundItem);
                if (foundItem.para_tpl) {
                    setTplFromCfg(foundItem.para_tpl);
                    setWillShowParaComponent(true);
                } else {
                    setWillShowParaComponent(false);
                }
            } else {
                console.log('foundItem-------: ', foundItem);
                setWillShowParaComponent(false);
            }
        };

        useEffect(() => {
            checkIfShowParaComponent(props.col.plugid);
        });

        return (
            <div className="formWrapper">
                <div className="fromBox">
                    <div className="formItem">
                        <PlugSymbol />
                        字段类型/插件
                    </div>

                    <div className="formItemBig">
                        <Select
                            className="longSelect"
                            style={{ width: '500px' }}
                            allowClear={true}
                            listItemHeight={321}
                            popupClassName="drop"
                            value={props.col.plugid}
                            onChange={(v) => {
                                if (!v) {
                                    props.DataGridStore.changeCfg_dropdown(null, 'plugid', props.col.Field);
                                    props.DataGridStore.changeCfg_dropdown(null, 'uform_para', props.col.Field);
                                } else {
                                    props.DataGridStore.changeCfg_dropdown(v, 'plugid', props.col.Field);
                                }

                                checkIfShowParaComponent(v);
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
                                            <div className="plugMemo">
                                                {item.data.memo}
                                                <br />
                                                <div style={{ marginTop: '8px' }}>
                                                    {item.data.para_tpl ? '参数json模版:' + item.data.para_tpl : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                            disabled={props.col.Field === 'id'}
                            placeholder="UForm字段类型"
                            name="plugin">
                            {props.DataGridStore.plugins.length &&
                                props.DataGridStore.plugins.map((item, index) => (
                                    <Option
                                        key={index}
                                        value={item.plugid}
                                        label={item.plugname}
                                        memo={item.memo}
                                        para_tpl={item.para_tpl}>
                                        <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
                                            <span style={{ width: '150px' }}>{item.plugid}</span>
                                            <span style={{ marginLeft: '30px' }}>{item.plugname}</span>
                                        </div>
                                    </Option>
                                ))}
                        </Select>

                        <Popover
                            className="help-tip"
                            title="帮助:插件参数"
                            content={'只能选择一个插件,有些插件可能需要配置json形式的参数'}
                            trigger="hover">
                            <Button>
                                <QuestionIcon />
                            </Button>
                        </Popover>
                    </div>
                </div>

                {willShowParaComponent && (
                    <div className="fromBox">
                        <div className="formItem">
                            <Xsymbol />
                            插件参数(json)
                        </div>
                        <div className="formItemBig">
                            <Input
                                disabled={props.col.Field === 'id'}
                                value={props.col.uform_para || TplFromCfg}
                                onChange={(e) => {
                                    props.DataGridStore.changeCfg_input(e, 'uform_para', props.col.Field);
                                }}
                            />
                            <Popover
                                className="help-tip"
                                content={showJsonTree(props.col.uform_para || TplFromCfg)}
                                title="帮助:插件参数"
                                trigger="hover">
                                <Button>
                                    <QuestionIcon />
                                </Button>
                            </Popover>
                        </div>
                    </div>
                )}
            </div>
        );
    })
);

export default PluginCfg;
