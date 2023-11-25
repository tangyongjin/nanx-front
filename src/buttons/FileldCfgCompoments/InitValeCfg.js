import React, { useState, useEffect } from 'react';
import { Select, Button, Popover, Input } from 'antd';
import { observer, inject } from 'mobx-react';
import QuestionIcon from '@/iconsHero/question';
import CodeBracketSquare from '@/iconsHero/CodeBracketSquare';
import ReactJson from 'react-json-view';
import { tryParseJSON } from '@/utils/tools';
import initCfgArr from './initCfgArray';

import FinterIcon from '@/iconsHero/finterIcon';
import Xsymbol from '@/iconsHero/xSymbol';

const { Option } = Select;

const InitValeCfg = inject('DataGridStore')(
    observer((props) => {
        console.log('props: ', props);
        const [initCfgArray] = useState(initCfgArr);
        const [currentInitItemId, setCurrentInitItemId] = useState(null);

        const [TplFromCfg, setTplFromCfg] = useState(null);

        const [willShowParaComponent, setWillShowParaComponent] = useState(false);

        const checkIfShowParaComponent = (initItemIDVar) => {
            console.log('initItemIDVar: ', initItemIDVar);
            setCurrentInitItemId(initItemIDVar);
            const foundItem = initCfgArray.find((item) => item.initItemID === initItemIDVar);

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
            checkIfShowParaComponent(props.col.default_v);
        });

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
                        <FinterIcon />
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
                            onChange={(v) => {
                                props.DataGridStore.changeCfg_dropdown(v, 'default_v', props.col.Field);
                                // 如果 没有 default_v, 则 defaultv_para也应该被清理
                                if (!v) {
                                    props.DataGridStore.changeCfg_dropdown(null, 'defaultv_para', props.col.Field);
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

                                                {item.data.para_tpl ? '参数json模版:' + item.data.para_tpl : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }}
                            disabled={props.col.Field == 'id'}
                            placeholder="初始值配置"
                            name="plugin">
                            {initCfgArray.map((item, index) => (
                                <Option
                                    key={index}
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
                    </div>
                </div>

                {willShowParaComponent ? (
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
                                    props.DataGridStore.changeCfg_input(e, 'defaultv_para', props.col.Field);
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
                ) : null}
            </div>
        );
    })
);

export default InitValeCfg;
