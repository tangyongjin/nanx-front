import React, { useState, useEffect } from 'react';
import { Select, Button, Popover, Input } from 'antd';
import { observer, inject } from 'mobx-react';
import QuestionIcon from '@/iconsHero/question';
import initCfgArr from './initCfgArray';
import FingerIcon from '@/iconsHero/FingerIcon';
import Xsymbol from '@/iconsHero/xSymbol';
import showJsonTree from '@/component/jsonTree.js';

const { Option } = Select;

const InitValueCfg = inject('GridConfigStore')(
    observer((props) => {
        console.log('props: ', props);
        const [initCfgArray] = useState(initCfgArr);
        const [TplFromCfg, setTplFromCfg] = useState(null);
        const [willShowParaComponent, setWillShowParaComponent] = useState(false);

        const checkIfShowParaComponent = (initItemIDVar) => {
            const foundItem = initCfgArray.find((item) => item.initItemID === initItemIDVar);

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

        const handleSelectChange = (v) => {
            props.GridConfigStore.changeCfg_dropdown(v, 'default_v', props.col.Field);
            if (!v) {
                props.GridConfigStore.changeCfg_dropdown(null, 'defaultv_para', props.col.Field);
            }
            checkIfShowParaComponent(v);
        };

        useEffect(() => {
            checkIfShowParaComponent(props.col.default_v);
        });

        const showHelp_init = () => {
            return (
                <div style={{ maxWidth: '300px', textIndent: '20px', lineHeight: '170%' }}>
                    在新增记录时候,设置某些字段的初始值,有两种情况: 1: 直接设置值,不需要手工录入,比如直接设置"当前日期",
                    "当前时刻". 2:通过当前字段录入的值,来设置另外一个字段的值.比如:录入产品型号, 来设置产品价格字段.
                    这种情况需要一个json格式的参数.
                </div>
            );
        };

        return (
            <div className="formWrapper">
                <div className="fromBox">
                    <div className="formItem">
                        <FingerIcon />
                        初始值
                    </div>

                    <div className="formItemBig">
                        <Select
                            className="longSelect"
                            allowClear={true}
                            style={{ width: '500px' }}
                            listItemHeight={321}
                            value={props.col.default_v}
                            key={props.col.default_v}
                            onChange={handleSelectChange}
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

                                                {item.data.para_tpl ? '参数json模版:' + item.data.para_tpl : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                            disabled={props.col.Field == 'id'}
                            placeholder="初始值配置"
                            name="plugin">
                            {initCfgArray.map((item) => (
                                <Option
                                    key={item.initItemID}
                                    value={item.initItemID}
                                    label={item.initItemName}
                                    memo={item.memo}
                                    para_tpl={item.para_tpl}>
                                    <div style={{ display: 'flex', justifyContent: 'flexStart' }}>
                                        <span style={{ width: '150px' }}>{item.initItemID}</span>
                                        <span style={{ marginLeft: '30px' }}>{item.initItemName}</span>
                                    </div>
                                </Option>
                            ))}
                        </Select>

                        <Popover className="help-tip" title="帮助:初始值" content={showHelp_init()} trigger="hover">
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
                            初始值参数
                        </div>

                        <div className="formItemBig">
                            <Input
                                disabled={props.col.Field == 'id'}
                                value={props.col.defaultv_para || TplFromCfg}
                                onChange={(e) => {
                                    props.GridConfigStore.changeCfg_input(e, 'defaultv_para', props.col.Field);
                                }}
                            />

                            <Popover
                                className="help-tip"
                                content={showJsonTree(props.col.defaultv_para || TplFromCfg)}
                                title="帮助:初始值参数"
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

export default InitValueCfg;
