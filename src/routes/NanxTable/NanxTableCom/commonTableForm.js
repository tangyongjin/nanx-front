import React, { useState } from 'react';
import { Button } from 'antd';
import '@/components/UformExtends';
import { toJS } from 'mobx';
import { SchemaForm, createFormActions } from '@uform/antd';
import 'antd/dist/reset.css';

const actions = createFormActions();

const CommonTableForm = (props) => {
    let formCfg = props.NanxTableStore.formCfg;
    const [rawData, setRawData] = useState({ editable: props.editable });
    console.log('💚💔💚💔💚');

    if (!formCfg) {
        return null;
    }

    // console.log('💚💚💚', props.NanxTableStore.selectedRows[0]);

    return (
        <div style={{ marginTop: '20px' }}>
            <SchemaForm
                initialValues={rawData.value}
                actions={actions}
                editable={rawData.editable}
                schema={formCfg}
                effects={($, { setFieldState }) => {
                    const hide = (name) => {
                        setFieldState(name, (field) => {
                            field.visible = false;
                        });
                    };

                    $('onFormInit').subscribe(async () => {
                        hide('id');

                        if (props.NanxTableStore.table_action == 'edit') {
                            setRawData({ value: { ...props.NanxTableStore.selectedRows[0] } });
                        } else {
                            setRawData({ value: {} });
                        }

                        for (let key in formCfg.properties) {
                            setFieldState(key, (item) => {
                                item.props['x-props'].nnstore = props.NanxTableStore;
                                item.props['x-props'].datagrid_code = props.NanxTableStore.datagrid_code;
                                item.props['x-props'].actions = actions;
                                item.props['x-props'].props_tag = '💘💘';
                                // 不知道为何无法取到日期型的数据的值
                                if (props.NanxTableStore.table_action == 'edit') {
                                    item.props['x-props'].d_value = props.NanxTableStore.selectedRows[0][key];
                                }
                            });
                        }
                    });
                }}
                labelCol={4}
                wrapperCol={15}>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type="primary"
                        htmlType="button"
                        className="round-button  marginRihgt10"
                        onClick={async () => {
                            await actions.validate();
                            await props.saveFormData(actions.getFormState().values);
                            props.NanxTableStore.hideButtonModal();
                        }}>
                        保存
                    </Button>
                </div>
            </SchemaForm>
        </div>
    );
};

export default CommonTableForm;
