import { Input } from 'antd';
import { registerFormFields, connect } from '@uform/react';
import Assocselect from './assocSelect';
import CategoryDropDown from './categoryDropDown';
import CheckBox from './checkbox';
import CommonTable from '@/routes/NanxTable/NanxTableCom/NanxTable';
import Dropdownlist from './dropdownList';
import Fileuploader from './fileuploader';
import GetActionCode from './getActionCode.js';
import GetDate from './getDate';
import GetDepart from './getDepart';
import GetLander from './getLander';
import GetLoginuser from './getLoginuser';
import GetRadio from './getRadio';
import React from 'react';
import Wangeditor from './wangeditor';
import YesOrNo from './yesOrNo';
import DateEditor from './DateEditor';

registerFormFields({
    YesOrNo: connect()((props) => <YesOrNo {...props} getComponentValue={props.onChange} value={props.value || ''} />),
    fileuploader: connect()((props) => <Fileuploader {...props} value={props.value || ''} />),

    text_area: connect()((props) => <Input.TextArea {...props} value={props.value || ''} />),

    tableEditor: connect()((props) => <CommonTable {...props} value={''} />),

    Dropdownlist: connect()((props) => (
        <Dropdownlist {...props} getComponentValue={props.onChange} value={props.value || ''} />
    )),

    CategoryDropDown: connect()((props) => (
        <CategoryDropDown {...props} getComponentValue={props.onChange} value={props.value || ''} />
    )),

    GetLander: connect()((props) => <GetLander {...props} value={props.value || ''} />),
    GetLoginuser: connect()((props) => <GetLoginuser {...props} value={props.value || ''} />),
    GetDepart: connect()((props) => <GetDepart {...props} value={props.value || ''} />),
    GetDate: connect()((props) => <GetDate {...props} value={props.value || ''} />),
    GetActionCode: connect()((props) => <GetActionCode {...props} value={props.value || ''} />),
    CheckBox: connect()((props) => <CheckBox {...props} value={props.value || ''} />),
    Wangeditor: connect()((props) => <Wangeditor {...props} value={props.value || ''} />),
    GetRadio: connect()((props) => <GetRadio {...props} value={props.value || ''} />),
    Assocselect: connect()((props) => <Assocselect {...props} value={props.value || ''} />),
    // DateEditor: connect()((props) => <DateEditor {...props} value={props.value} />)

    DateEditor: connect()((props) => {
        console.log('插件:', props); // 在这里输出 props 的内容
        return <DateEditor {...props} value={props.value} />;
    })
});
