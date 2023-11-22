import React from 'react';
import { Input as AntInput, Button } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import { NodeIndexOutlined } from '@ant-design/icons';

import 'dayjs/locale/zh-cn';

const WrapperAntStringComomnet = (TarGet) => {
    return class Select extends React.Component {
        render() {
            return (
                <div>
                    <TarGet style={{ width: '312px' }} placeholder={'请输入....'} {...this.props} />
                    <Button
                        onClick={() => {
                            // actions.setFormState(state => {
                            //     state.values = { start: 'x', end: 'y' }
                            //   })

                            console.log('💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌💌');
                            // this.props.actions.getFormState();

                            console.log(this.props.actions.getFormState());

                            this.props.actions.setFormState((state) => {
                                state.values = { bookname: '1984' };
                            });

                            console.log(this.props);
                        }}
                        style={{ marginLeft: '5px' }}>
                        <NodeIndexOutlined />
                    </Button>
                </div>
            );
        }
    };
};

const mapStringValue = (props) => {
    console.log('pr👿👿👿👿👿👿👿👿👿ops: ', props);
    return props;
};

const Input = WrapperAntStringComomnet(AntInput);

const UString = connect({
    getProps: compose(mapStyledProps, mapStringValue),
    getComponent: mapTextComponent
})(Input);

registerFormField('UString', UString);
export { UString };
