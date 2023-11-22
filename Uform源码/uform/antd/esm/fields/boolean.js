import Switch from "antd/lib/switch";
import { connect, registerFormField } from '@uform/react';
import { acceptEnum, mapStyledProps } from '../utils';
registerFormField('boolean', connect({
    valueName: 'checked',
    getProps: mapStyledProps
})(acceptEnum(Switch)));
