import { connect, registerFormField } from '@uform/react';
import Transfer from "antd/lib/transfer";
import { mapStyledProps } from '../utils';
registerFormField('transfer', connect({
    getProps: mapStyledProps,
    valueName: 'targetKeys'
})(Transfer));
