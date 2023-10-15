import React from 'react';
import { registerFormFields, connect } from '@uform/react';
import { Input } from 'antd';
import Fileuploader from './fileuploader';
import Assocselect from './assocSelect';
import AssocSelectSimple from './assocSelectSimple';
import GetLander from './getLander';
import GetDepart from './getDepart';
import GetLoginuser from './getLoginuser';
import YesOrNo from './yesOrNo';
import Dropdownlist from './dropdownList';
import GetDate from './getDate';
import GetActionCode from './getActionCode.js';
import CheckBox from './checkbox';
import GetRadio from './getRadio';
import Wangeditor from './wangeditor';
import Dropdowncombox from './dropdowncombox';
import YnSelect from './YnSelect';
import CommonTable from '@/routes/NanxTable/NanxTableCom/commonTable';
import EditgetDate from './editgetDate';
import CategoryDropDown from './categoryDropDown';

registerFormFields({
    YesOrNo: connect()((props) => <YesOrNo {...props} getComponentValue={props.onChange} value={props.value || ''} />),
    fileuploader: connect()((props) => <Fileuploader {...props} value={props.value || ''} />),

    Assocselect: connect()((props) => <Assocselect {...props} value={props.value || ''} />),
    AssocSelectSimple: connect()((props) => <AssocSelectSimple {...props} value={props.value || ''} />),
    text_area: connect()((props) => <Input.TextArea {...props} value={props.value || ''} />),
    tableEditor: connect()((props) => <CommonTable {...props} value={'aaaa'} />),
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
    Dropdowncombox: connect()((props) => <Dropdowncombox {...props} value={props.value || ''} />),
    GetRadio: connect()((props) => <GetRadio {...props} value={props.value || ''} />),
    YnSelect: connect()((props) => <YnSelect {...props} value={props.value || ''} />),
    EditgetDate: connect()((props) => <EditgetDate {...props} value={props.value || ''} />)
});
