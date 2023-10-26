import React, { useState } from 'react';
import { Button } from 'antd';
import '@/components/UformExtends';
import { toJS } from 'mobx';
import '../commonTable.scss';
import { SchemaForm, createFormActions } from '@uform/antd';

const actions = createFormActions();

const CommonTableForm = (props) => {
    let formCfg = toJS(props.formCfg);
    let layoutcfg = props.layoutcfg;
    const [state, setState, value] = useState({ editable: props.editable });

    if (!formCfg) {
        return null;
    }
    if (props.optionType == 'add' || props.optionType == 'edit') {
        return (
            <div className={layoutcfg == 2 ? 'addmodal' : layoutcfg == 3 ? 'addmodalt' : ''}>
                <SchemaForm
                    value={value}
                    initialValues={state.value}
                    actions={actions}
                    editable={state.editable}
                    schema={formCfg}
                    effects={($, { setFieldState, getFieldState }) => {
                        const hide = (name) => {
                            setFieldState(name, (state) => {
                                state.visible = false;
                            });
                        };

                        $('onFormInit').subscribe(async () => {
                            hide('id');
                            hide('transactid');
                            setState({
                                value: props.optionType == 'edit' ? { ...props.commonTableStore.selectedRows[0] } : {}
                            });

                            for (let newkey in formCfg.properties.group_all.properties) {
                                let newitem = formCfg.properties.group_all.properties[newkey];

                                for (let key in newitem.properties) {
                                    let item = newitem.properties[key];

                                    setFieldState(key, (state) => {
                                        state.props['x-props'].commontablestore = props.commonTableStore;
                                        state.props['x-props'].datagrid_code = props.dataGridcode;
                                        state.props['x-props'].actions = actions;
                                        state.props['x-props'].schema = formCfg;
                                    });

                                    if (item['x-props'] && item['x-props'].field_id == 'customer_phone') {
                                        setFieldState(key, (state) => {
                                            state.props['x-rules'] = 'phone';
                                        });
                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'phone') {
                                        setFieldState(key, (state) => {
                                            state.props['x-rules'] = 'phone';
                                        });
                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'contactPhone') {
                                        setFieldState(key, (state) => {
                                            state.props['x-rules'] = 'phone';
                                        });
                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'customer_email') {
                                        setFieldState(key, (state) => {
                                            state.props['x-rules'] = 'email';
                                        });
                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'email') {
                                        setFieldState(key, (state) => {
                                            state.props['x-rules'] = 'email';
                                        });
                                    }
                                    if (item['x-props'] && item['x-props'].field_id == 'postcode') {
                                        setFieldState(key, (state) => {
                                            state.props['x-rules'] = 'zip';
                                        });
                                    }
                                }
                            }
                        });
                    }}
                    labelCol={layoutcfg == '2' ? 9 : layoutcfg == '3' ? 9 : 8}
                    wrapperCol={layoutcfg == '2' ? 15 : layoutcfg == '3' ? 10 : 15}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            htmlType="button"
                            className="marginRihgt10"
                            onClick={async (event) => {
                                await actions.validate();
                                await props.saveFormData(
                                    actions.getFormState().values,
                                    '',
                                    props.onChange,
                                    props.as_virtual,
                                    props.optionType
                                );
                                props.hideModal();
                            }}>
                            保存
                        </Button>
                    </div>
                </SchemaForm>
            </div>
        );
    }
};
export default CommonTableForm;
