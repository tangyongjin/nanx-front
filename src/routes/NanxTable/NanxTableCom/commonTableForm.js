import React, { useState } from 'react';
import { Button } from 'antd';
import '@/UFormExtends';
import { SchemaForm, createFormActions } from '@uform/antd';
import 'antd/dist/reset.css';
import 'dayjs/locale/zh-cn';
import CalucateInitValue from './tableUtils/calucateInitValue';

const actions = createFormActions();

const CommonTableForm = (props) => {
    let formCfg = props.NanxTableStore.formCfg;

    const prepareRawData = () => {
        if (props.NanxTableStore.table_action == 'edit') {
            let _tmp_for_edit = { ...props.NanxTableStore.selectedRows[0] };
            return _tmp_for_edit;
        }

        if (props.NanxTableStore.table_action == 'add_from_tpl') {
            //eslint-disable-next-line
            const { id, ...rest } = props.NanxTableStore.selectedRows[0];
            return { ...rest };
        }

        if (props.NanxTableStore.table_action == 'add') {
            let _tmp_for_add = {};
            for (let key in formCfg.properties) {
                _tmp_for_add[key] = CalucateInitValue(formCfg, key);
            }
            return _tmp_for_add;
        }
    };

    let tplData = prepareRawData();
    const [rawData] = useState({ value: tplData });

    if (!formCfg) {
        return null;
    }

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

                        for (let key in formCfg.properties) {
                            setFieldState(key, (item) => {
                                console.log('onFormInit>>>>>>: ', item);

                                item.props['x-props'].nnstore = props.NanxTableStore;

                                // 设置 字段 style
                                // item.props['x-props'].style = { width: '110px' };
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
