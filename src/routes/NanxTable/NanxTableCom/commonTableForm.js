import React, { useState } from 'react';
import { Button } from 'antd';
import '@/components/UformExtends';
import { toJS } from 'mobx';
// import '../commonTable.scss';
import { SchemaForm, createFormActions } from '@uform/antd';

const actions = createFormActions();

const CommonTableForm = (props) => {
    let formCfg = toJS(props.NanxTableStore.formCfg);
    let layoutcfg = props.layoutcfg;
    const [rawData, setRawData] = useState({ editable: props.editable });

    if (!formCfg) {
        return null;
    }
    return (
        <div className={layoutcfg == 2 ? 'addmodal' : layoutcfg == 3 ? 'addmodalt' : ''}>
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
                        hide('transactid');
                        setRawData({
                            value:
                                props.NanxTableStore.table_action == 'edit'
                                    ? { ...props.NanxTableStore.selectedRows[0] }
                                    : {}
                        });

                        for (let newkey in formCfg.properties) {
                            let newitem = formCfg.properties[newkey];

                            for (let key in newitem.properties) {
                                setFieldState(key, (item) => {
                                    item.props['x-props'].nnstore = props.NanxTableStore;
                                    item.props['x-props'].datagrid_code = props.NanxTableStore.datagrid_code;
                                    item.props['x-props'].actions = actions;
                                    item.props['x-props'].schema = formCfg;
                                });
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
                        onClick={async () => {
                            await actions.validate();
                            await props.saveFormData(actions.getFormState().values);
                            // props.hideModal();
                        }}>
                        保存
                    </Button>
                </div>
            </SchemaForm>
        </div>
    );
};

export default CommonTableForm;
