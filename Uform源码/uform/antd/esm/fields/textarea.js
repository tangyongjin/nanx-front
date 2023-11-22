import { connect, registerFormField } from '@uform/react';
import Input from "antd/lib/input";
import { acceptEnum, mapStyledProps, mapTextComponent } from '../utils';
var TextArea = Input.TextArea;
registerFormField('textarea', connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
})(acceptEnum(TextArea)));
