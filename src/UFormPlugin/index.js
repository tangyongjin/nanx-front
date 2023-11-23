import { Input } from 'antd';
import React from 'react';
import { registerFormFields, registerFormField, connect } from '@uform/react';
import 'dayjs/locale/zh-cn';
import AssocSelect from './UAssocSelect';
import CategoryDropDown from './UCategoryDropDown';
import CheckBox from './UCheckbox';
import TableEditor from './UTableEditor';
import Dropdownlist from './UDropdownList';
import Fileuploader from './UFileuploader';
import GetLoginuser from './UGetLoginuser';
import GetRadio from './UGetRadio';
import Wangeditor from './UWangeditor';
import YesOrNo from './UYesOrNo';
import { acceptEnum, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';

import './UPackedDate';
import './UPackedString';

const { TextArea } = Input;

registerFormFields({
    YesOrNo: connect()((props) => {
        console.log('Y/N: ', props);
        return <YesOrNo {...props} getComponentValue={props.onChange} value={props.value || ''} />;
    }),

    fileuploader: connect()((props) => <Fileuploader {...props} value={props.value || ''} />),

    text_area: connect()((props) => <Input.TextArea {...props} value={props.value || ''} />),

    Dropdownlist: connect()((props) => (
        <Dropdownlist {...props} getComponentValue={props.onChange} value={props.value || ''} />
    )),

    CategoryDropDown: connect()((props) => (
        <CategoryDropDown {...props} getComponentValue={props.onChange} value={props.value || ''} />
    )),

    GetLoginuser: connect()((props) => <GetLoginuser {...props} value={props.value || ''} />),
    CheckBox: connect()((props) => <CheckBox {...props} value={props.value || ''} />),
    Wangeditor: connect()((props) => <Wangeditor {...props} value={props.value || ''} />),
    GetRadio: connect()((props) => <GetRadio {...props} value={props.value || ''} />),
    AssocSelect: connect()((props) => <AssocSelect {...props} value={props.value || ''} />),
    TableEditor: connect()((props) => {
        return <TableEditor {...props} getComponentValue={props.onChange} value={props.value} />;
    })
});

registerFormField(
    'UTextarea',
    connect({
        getProps: mapStyledProps,
        getComponent: mapTextComponent
    })(acceptEnum(TextArea))
);
