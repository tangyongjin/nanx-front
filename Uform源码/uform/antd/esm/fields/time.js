import { connect, registerFormField } from '@uform/react';
import moment from 'moment';
import TimePicker from "antd/lib/time-picker";
import { mapStyledProps, mapTextComponent } from '../utils';
registerFormField('time', connect({
    getValueFromEvent: function (_, value) {
        return value ? value : null;
    },
    getProps: function (props, fieldProps) {
        var value = props.value, _a = props.disabled, disabled = _a === void 0 ? false : _a;
        try {
            if (!disabled && value) {
                props.value = moment(value, 'HH:mm:ss');
            }
        }
        catch (e) {
            throw new Error(e);
        }
        mapStyledProps(props, fieldProps);
    },
    getComponent: mapTextComponent
})(TimePicker));
