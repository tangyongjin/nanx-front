import { connect, registerFormField } from '@uform/react';
import Radio from "antd/lib/radio";
import { transformDataSourceKey, mapStyledProps, mapTextComponent } from '../utils';
var RadioGroup = Radio.Group;
registerFormField('radio', connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
})(transformDataSourceKey(RadioGroup, 'options')));
