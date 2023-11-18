import { Input } from 'antd';
import React from 'react';
import { registerFormFields, connect } from '@uform/react';
import Assocselect from './UAssocSelect';
import CategoryDropDown from './UCategoryDropDown';
import CheckBox from './UCheckbox';
import TableEditor from './UTableEditor';
import Dropdownlist from './UDropdownList';
import Fileuploader from './UFileuploader';
import GetActionCode from './UGetActionCode';
import GetDate from './UGetDateString';
import GetLoginuser from './UGetLoginuser';
import GetRadio from './UGetRadio';
import Wangeditor from './UWangeditor';
import YesOrNo from './UYesOrNo';
import UDateEditor from './UDateEditor';
import UDateTimeEditor from './UDateTimeEditor';

registerFormFields({
    YesOrNo: connect()((props) => <YesOrNo {...props} getComponentValue={props.onChange} value={props.value || ''} />),
    fileuploader: connect()((props) => <Fileuploader {...props} value={props.value || ''} />),

    text_area: connect()((props) => <Input.TextArea {...props} value={props.value || ''} />),

    Dropdownlist: connect()((props) => (
        <Dropdownlist {...props} getComponentValue={props.onChange} value={props.value || ''} />
    )),

    CategoryDropDown: connect()((props) => (
        <CategoryDropDown {...props} getComponentValue={props.onChange} value={props.value || ''} />
    )),

    GetLoginuser: connect()((props) => <GetLoginuser {...props} value={props.value || ''} />),
    GetDate: connect()((props) => <GetDate {...props} value={props.value || ''} />),
    GetActionCode: connect()((props) => <GetActionCode {...props} value={props.value || ''} />),
    CheckBox: connect()((props) => <CheckBox {...props} value={props.value || ''} />),
    Wangeditor: connect()((props) => <Wangeditor {...props} value={props.value || ''} />),
    GetRadio: connect()((props) => <GetRadio {...props} value={props.value || ''} />),
    Assocselect: connect()((props) => <Assocselect {...props} value={props.value || ''} />),
    UDateEditor: connect()((props) => {
        console.log('插件:', props); // 在这里输出 props 的内容
        return <UDateEditor {...props} value={props.value} />;
    }),

    UDateTimeEditor: connect()((props) => {
        console.log('插件:', props); // 在这里输出 props 的内容
        return <UDateTimeEditor {...props} value={props.value} />;
    }),

    TableEditor: connect()((props) => {
        console.log('TableEditor/插件:', props); // 在这里输出 props 的内容
        // return <TableEditor {...props} value={props.value} />;
        return <TableEditor {...props} value={props.value} />;
    })
});
