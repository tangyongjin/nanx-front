import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import '@/components/UformExtends';
import { toJS } from 'mobx';
import { SchemaForm, createFormActions } from '@uform/antd';
const FormActions = createFormActions();

const hideField = (setFieldState, fieldName) => {
    setFieldState(fieldName, (state) => {
        state.visible = false;
    });
};

// 提取出设置字段属性的函数
const setFieldProperties = (setFieldState, fieldItem, commonTableStore, FormActions, formCfg) => {
    setFieldState(fieldItem, (fieldItem) => {
        console.log(fieldItem);
        fieldItem.props['x-props'].commontablestore = commonTableStore;
        fieldItem.props['x-props'].actions = FormActions;
        fieldItem.props['x-props'].schema = formCfg;
    });
};

// 提取出处理表单字段的属性设置
const handleFieldProperties = (setFieldState, commonTableStore, FormActions, formCfg) => {
    for (let newkey in formCfg.properties) {
        let newitem = formCfg.properties[newkey];

        for (let key in newitem.properties) {
            setFieldProperties(setFieldState, key, commonTableStore, FormActions, formCfg);
        }
    }
};

const CommonTableForm = (props) => {
    let formCfg = toJS(props.commonTableStore.formCfg);
    let layoutcfg = props.commonTableStore.layoutcfg;
    const [state, setRawData] = useState({});
    const value = {};

    useEffect(() => {
        // 这里执行初始化操作
        console.log('组件已经渲染，并且初始化操作可以在这里执行。');

        setRawData({
            value: props.optionType == 'edit' ? { ...props.commonTableStore.selectedRows[0] } : {}
        });

        // 如果需要进行一次性的清理操作，你可以返回一个清理函数
        return () => {
            console.log('组件即将卸载，可以在这里执行清理操作。');
        };
    }, [props.commonTableStore.selectedRows, props.optionType]); // 空数组表示仅在组件挂载和卸载时执行

    const handleSaveClick = async (event) => {
        await FormActions.validate();
        await props.saveFormData(
            FormActions.getFormState().values,
            '',
            props.onChange,
            props.as_virtual,
            props.optionType
        );
        props.hideModal();
    };

    return (
        <div className={layoutcfg == 2 ? 'addmodal' : layoutcfg == 3 ? 'addmodalt' : ''}>
            <SchemaForm
                value={value}
                initialValues={state.value}
                actions={FormActions}
                editable={true}
                schema={formCfg}
                effects={($, { setFieldState }) => {
                    $('onFormInit').subscribe(async () => {
                        hideField(setFieldState, 'id'); // 使用提取出的 hideField 函数
                        handleFieldProperties(setFieldState, props.commonTableStore, FormActions, formCfg); // 使用提取出的函数
                    });
                }}
                labelCol={layoutcfg == '2' ? 9 : layoutcfg == '3' ? 9 : 8}
                wrapperCol={layoutcfg == '2' ? 15 : layoutcfg == '3' ? 10 : 15}>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type="primary"
                        htmlType="button"
                        className="marginRihgt10"
                        onClick={handleSaveClick} // 使用重构后的处理函数
                    >
                        保存
                    </Button>
                </div>
            </SchemaForm>
        </div>
    );
};
export default CommonTableForm;
