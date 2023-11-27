import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Popover } from 'antd';
import { observer, inject } from 'mobx-react';
import showJsonTree from '@/component/jsonTree.js';
import { VscSymbolNamespace } from 'react-icons/vsc';

import { BsBraces, BsFillQuestionCircleFill } from 'react-icons/bs';
import { BsGearWideConnected } from 'react-icons/bs';

const { Option } = Select;

const PluginCfg = inject('GridConfigStore')(
    observer((props) => {
        console.log('PluginCfg>props: ', props);

        const [willShowParaComponent, setWillShowParaComponent] = useState(false);
        const [TplFromCfg, setTplFromCfg] = useState(null);

        const checkIfShowParaComponent = (selectedPlugId) => {
            const foundItem = props.GridConfigStore.plugins.find((item) => item.plugid === selectedPlugId);

            if (foundItem) {
                if (foundItem.para_tpl) {
                    setTplFromCfg(foundItem.para_tpl);
                    setWillShowParaComponent(true);
                } else {
                    setWillShowParaComponent(false);
                }
            } else {
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
                        <BsGearWideConnected style={{ marginRight: '6px' }} />
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
                                    props.GridConfigStore.changeCfg_dropdown(null, 'plugid', props.col.Field);
                                    props.GridConfigStore.changeCfg_dropdown(null, 'uform_para', props.col.Field);
                                } else {
                                    props.GridConfigStore.changeCfg_dropdown(v, 'plugid', props.col.Field);
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
                            {props.GridConfigStore.plugins.length &&
                                props.GridConfigStore.plugins.map((item, index) => (
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
                                <BsFillQuestionCircleFill style={{ verticalAlign: '-2px' }} />
                            </Button>
                        </Popover>
                    </div>
                </div>

                {willShowParaComponent && (
                    <div className="fromBox">
                        <div className="formItem">
                            <VscSymbolNamespace />
                            插件参数(json)
                        </div>
                        <div className="formItemBig">
                            <Input
                                disabled={props.col.Field === 'id'}
                                value={props.col.uform_para || TplFromCfg}
                                onChange={(e) => {
                                    props.GridConfigStore.changeCfg_input(e, 'uform_para', props.col.Field);
                                }}
                            />
                            <Popover
                                className="help-tip"
                                content={showJsonTree(props.col.uform_para || TplFromCfg)}
                                title="帮助:插件参数"
                                trigger="hover">
                                <Button>
                                    <BsBraces style={{ verticalAlign: '-2px' }} />
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
