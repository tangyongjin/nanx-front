import React from 'react';
import dayjs from 'dayjs';
import { DatePicker as AntDatePicker } from 'antd';
import { compose, mapStyledProps } from './UFormUtils';
import { registerFormField, connect } from '@uform/react';
import { mapTextComponent } from '@uform/utils';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn'); // 全局使用简体中文
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

const WrapperAntComomnet = (TarGet) => {
    return class Select extends React.Component {
        render() {
            return <TarGet placeholder={'请输入时间+++'} locale={locale} format={dateFormat} {...this.props} />;
        }
    };
};

const mapMomentValue = (props) => {
    props.value = props.value ? dayjs(props.value, dateFormat) : null;
    return props;
};

const DatePicker = WrapperAntComomnet(AntDatePicker);

const UDateEditor = connect({
    getValueFromEvent(event, dateValue) {
        console.log('日期值的:::::::', dateValue);
        return dateValue;
    },
    getProps: compose(mapStyledProps, mapMomentValue),
    getComponent: mapTextComponent
})(DatePicker);

registerFormField('UDateEditor', UDateEditor);

export { UDateEditor };
