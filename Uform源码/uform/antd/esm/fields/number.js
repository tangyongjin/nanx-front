import { connect, registerFormField } from '@uform/react';
import InputNumber from "antd/lib/input-number";
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils';
registerFormField('number', connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
})(acceptEnum(InputNumber)));
