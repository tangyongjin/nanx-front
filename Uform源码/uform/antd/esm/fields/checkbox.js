import { connect, registerFormField } from '@uform/react';
import Checkbox from "antd/lib/checkbox";
import { transformDataSourceKey, mapStyledProps, mapTextComponent } from '../utils';
var CheckboxGroup = Checkbox.Group;
registerFormField('checkbox', connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
})(transformDataSourceKey(CheckboxGroup, 'options')));
