// import React, { useState, useEffect } from 'react';
// import { Button } from 'antd';
// import '@/components/UformExtends';
// import { toJS } from 'mobx';
// import { SchemaForm, createFormActions } from '@uform/antd';
// import { observer, inject } from 'mobx-react';
// const FormActions = createFormActions();

// const CommonTableForm = inject('NanxTableStore')(
//     observer((props) => {
//         let formCfg = toJS(props.NanxTableStore.formCfg);
//         let layoutcfg = props.NanxTableStore.layoutcfg;
//         const [state, setRawData] = useState({});

//         useEffect(() => {
//             setRawData({
//                 value: props.optionType == 'edit' ? { ...props.NanxTableStore.selectedRows[0] } : {}
//             });
//         }, [props.NanxTableStore.selectedRows, props.optionType]); // 空数组表示仅在组件挂载和卸载时执行

//         // 提取出设置字段属性的函数
//         const setFieldProperties = (setFieldState, fieldItem, xTableStore, FormActions, formCfg) => {
//             setFieldState(fieldItem, (col) => {
//                 // 此处必须小写
//                 console.log('此处必须小写');
//                 console.log('xTableStore: ', xTableStore);
//                 col.props['x-props'].nnstore = xTableStore;
//                 col.props['x-props'].actions = FormActions;
//                 col.props['x-props'].schema = formCfg;
//             });
//         };

//         // 提取出处理表单字段的属性设置
//         const handleFieldProperties = (setFieldState, xTableStore, FormActions, formCfg) => {
//             for (let newkey in formCfg.properties) {
//                 let newitem = formCfg.properties[newkey];
//                 for (let col in newitem.properties) {
//                     setFieldProperties(setFieldState, col, xTableStore, FormActions, formCfg);
//                 }
//             }
//         };

//         const hideField = (setFieldState, fieldName) => {
//             setFieldState(fieldName, (state) => {
//                 state.visible = false;
//             });
//         };

//         const handleSaveClick = async () => {
//             await FormActions.validate();
//             await props.saveFormData(FormActions.getFormState().values, props.onChange, props.as_virtual);
//             props.hideModal();
//         };

//         return (
//             <div className={layoutcfg == 2 ? 'addmodal' : layoutcfg == 3 ? 'addmodalt' : ''}>
//                 <SchemaForm
//                     initialValues={state.value}
//                     actions={FormActions}
//                     editable={true}
//                     schema={formCfg}
//                     effects={($, { setFieldState }) => {
//                         $('onFormInit').subscribe(async () => {
//                             hideField(setFieldState, 'id'); // 使用提取出的 hideField 函数
//                             handleFieldProperties(setFieldState, props.NanxTableStore, FormActions, formCfg); // 使用提取出的函数
//                         });
//                     }}
//                     labelCol={layoutcfg == '2' ? 9 : layoutcfg == '3' ? 9 : 8}
//                     wrapperCol={layoutcfg == '2' ? 15 : layoutcfg == '3' ? 10 : 15}>
//                     <div style={{ textAlign: 'center' }}>
//                         <Button
//                             type="primary"
//                             htmlType="button"
//                             className="marginRihgt10"
//                             onClick={handleSaveClick} // 使用重构后的处理函数
//                         >
//                             保存
//                         </Button>
//                     </div>
//                 </SchemaForm>
//             </div>
//         );
//     })
// );

// export default CommonTableForm;

import React, { useState } from 'react';
import { Button } from 'antd';
import '@/components/UformExtends';
import { toJS } from 'mobx';
import '../commonTable.scss';
import { SchemaForm, createFormActions } from '@uform/antd';

const actions = createFormActions();

const CommonTableForm = (props) => {
    console.log('props: ', props);

    // let formCfg = toJS(props.formCfg);
    let formCfg = toJS(props.NanxTableStore.formCfg);
    let layoutcfg = props.layoutcfg;
    const [state, setState, value] = useState({ editable: props.editable });

    if (!formCfg) {
        return null;
    }
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
                            value: props.optionType == 'edit' ? { ...props.NanxTableStore.selectedRows[0] } : {}
                        });

                        for (let newkey in formCfg.properties) {
                            let newitem = formCfg.properties[newkey];

                            for (let key in newitem.properties) {
                                let item = newitem.properties[key];

                                setFieldState(key, (state) => {
                                    state.props['x-props'].nnstore = props.NanxTableStore;
                                    state.props['x-props'].datagrid_code = props.dataGridcode;
                                    state.props['x-props'].actions = actions;
                                    state.props['x-props'].schema = formCfg;
                                });

                                if (item['x-props'] && item['x-props'].field_id == 'phone') {
                                    setFieldState(key, (state) => {
                                        state.props['x-rules'] = 'phone';
                                    });
                                }

                                if (item['x-props'] && item['x-props'].field_id == 'email') {
                                    setFieldState(key, (state) => {
                                        state.props['x-rules'] = 'email';
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
};

export default CommonTableForm;
