import React from 'react';
import dayjs from 'dayjs';
import { DatePicker as AntDatePicker } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn'); // 全局使用简体中文
dayjs.extend(customParseFormat);
const dateFormat1 = 'YYYY-MM-DD';
const dateFormat2 = 'YYYY-MM-DD HH:mm:ss';
console.log('mapTextComponent: ', mapTextComponent);

const WrapperAntDateComomnet = (TarGet) => {
    return class Select extends React.Component {
        render() {
            return <TarGet placeholder={'请输入日期'} locale={locale} format={dateFormat1} {...this.props} />;
        }
    };
};

const WrapperAntDateTimeComomnet = (TarGet) => {
    return class Select extends React.Component {
        render() {
            return <TarGet showTime placeholder={'请输入时间'} locale={locale} format={dateFormat2} {...this.props} />;
        }
    };
};

const mapMomentDateValue = (props) => {
    props.value = props.value ? dayjs(props.value, dateFormat1) : null;
    return props;
};

const mapMomentDateTimeValue = (props) => {
    props.value = props.value ? dayjs(props.value, dateFormat2) : null;
    return props;
};

const DatePicker = WrapperAntDateComomnet(AntDatePicker);
const DateTimePicker = WrapperAntDateTimeComomnet(AntDatePicker);

const UDateEditor = connect({
    getValueFromEvent(event, _value) {
        return _value;
    },
    getProps: compose(mapStyledProps, mapMomentDateValue),
    getComponent: mapTextComponent
})(DatePicker);

const UDateTimeEditor = connect({
    getValueFromEvent(event, _value) {
        return _value;
    },
    getProps: compose(mapStyledProps, mapMomentDateTimeValue),
    getComponent: mapTextComponent
})(DateTimePicker);

registerFormField('UDateEditor', UDateEditor);
registerFormField('UDateTimeEditor', UDateTimeEditor);

export { UDateEditor, UDateTimeEditor };
