import React, { useState } from 'react';
import { Button } from 'antd';
import '@/UFormExtends';
import { SchemaForm, createFormActions } from '@uform/antd';
import 'antd/dist/reset.css';

const actions = createFormActions();

const CommonTableForm = (props) => {
    let formCfg = props.NanxTableStore.formCfg;
    const [rawData, setRawData] = useState({ value: {} });

    if (!formCfg) {
        return null;
    }

    const setInitValue = (key) => {
        let _tmp = rawData;
        if (key == 'total') {
            _tmp[key] = 222;
            setRawData({ value: _tmp });
        }

        if (key == 'location_name') {
            _tmp[key] = 333;
            setRawData({ value: _tmp });
        }
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <SchemaForm
                initialValues={rawData.value}
                actions={actions}
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
                        }

                        if (props.NanxTableStore.table_action == 'add_from_tpl') {
                            //eslint-disable-next-line
                            const { id, ...rest } = props.NanxTableStore.selectedRows[0];
                            setRawData({ value: { ...rest } });
                        }

                        for (let key in formCfg.properties) {
                            if (props.NanxTableStore.table_action == 'add') {
                                // add 时候确定 default value
                                setInitValue(key);
                            }

                            setFieldState(key, (item) => {
                                item.props['x-props'].nnstore = props.NanxTableStore;
                                item.props['x-props'].datagrid_code = props.NanxTableStore.datagrid_code;
                                item.props['x-props'].actions = actions;
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
                        className="round-button"
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
