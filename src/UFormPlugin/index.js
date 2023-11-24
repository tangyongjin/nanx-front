import { Input } from 'antd';
import React from 'react';
import { registerFormFields, registerFormField, connect } from '@uform/react';
import 'dayjs/locale/zh-cn';
import UAssocSelect from './UAssocSelect';
import UCategoryDropDown from './UCategoryDropDown';
import UCheckbox from './UCheckbox';
import UTableEditor from './UTableEditor';
import UDropdownList from './UDropdownList';
import UGetLoginuser from './UGetLoginuser';
import UGetRadio from './UGetRadio';
import UWangeditor from './UWangeditor';
import UYesOrNo from './UYesOrNo';
import { acceptEnum, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';

import './UPackedDate';
import './UPackedString';
import './UPackedImgUploader';
import './UPackedDocumentUploader';

const { TextArea } = Input;

registerFormFields({
    UYesOrNo: connect()((props) => {
        // console.log('Y/N: ', props);
        return <UYesOrNo {...props} getComponentValue={props.onChange} value={props.value || ''} />;
    }),

    UTextarea: connect()((props) => {
        // console.log('text_area: ', props);
        return <Input.TextArea {...props} value={props.value || ''} />;
    }),

    UDropdownList: connect()((props) => {
        // console.log('Dropdownlist: ', props);
        return <UDropdownList {...props} getComponentValue={props.onChange} value={props.value || ''} />;
    }),

    UCategoryDropDown: connect()((props) => {
        // console.log('UCategoryDropDown: ', props);
        return <UCategoryDropDown {...props} getComponentValue={props.onChange} value={props.value || ''} />;
    }),

    UGetLoginuser: connect()((props) => {
        // console.log('GetLoginuser: ', props);
        return <UGetLoginuser {...props} value={props.value || ''} />;
    }),

    UCheckbox: connect()((props) => {
        // console.log('CheckBox: ', props);
        return <UCheckbox {...props} value={props.value || ''} />;
    }),

    UWangeditor: connect()((props) => {
        // console.log('Wangeditor: ', props);
        return <UWangeditor {...props} value={props.value || ''} />;
    }),

    UGetRadio: connect()((props) => {
        // console.log('GetRadio: ', props);
        return <UGetRadio {...props} value={props.value || ''} />;
    }),

    UAssocSelect: connect()((props) => {
        // console.log('UAssocSelect: ', props);
        return <UAssocSelect {...props} value={props.value || ''} />;
    }),

    UTableEditor: connect()((props) => {
        // console.log('UTableEditor: ', props);
        return <UTableEditor {...props} getComponentValue={props.onChange} value={props.value} />;
    })
});

registerFormField(
    'UTextarea',
    connect({
        getProps: mapStyledProps,
        getComponent: mapTextComponent
    })(acceptEnum(TextArea))
);
