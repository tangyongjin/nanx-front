import React from 'react';
import { Input as AntInput, Button, message } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import { CloudUploadOutlined } from '@ant-design/icons';

import api from '@/api/api';

const WrapperAntStringComomnet = (TarGet) => {
    return class Select extends React.Component {
        render() {
            return (
                <div>
                    <TarGet style={{ width: '312px' }} placeholder={'请输入....'} {...this.props} />
                    <Button onClick={async () => {}} style={{ marginLeft: '5px' }}>
                        <CloudUploadOutlined />
                    </Button>
                </div>
            );
        }
    };
};

const mapStringValue = (props) => {
    return props;
};

const Input = WrapperAntStringComomnet(AntInput);

const UFileuploader = connect({
    getProps: compose(mapStyledProps, mapStringValue),
    getComponent: mapTextComponent
})(Input);

registerFormField('UFileuploader', UFileuploader);
export { UFileuploader };
