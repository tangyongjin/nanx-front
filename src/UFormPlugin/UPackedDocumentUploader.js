import React from 'react';
import { Input as AntInput } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import FileUploder from '@/component/fileUploder';
import api from '@/api/api';

const WrapperAntStringComomnet = (TarGet) => {
    return class Select extends React.Component {
        constructor(props) {
            super(props);
            console.log('props: ', props);
        }

        render() {
            const uploadCallbackRender = (uploadResultData) => {
                let tarGetField = this.props.field_id;
                console.log('uploadResultData: ', uploadResultData);
                let tarGetValue = uploadResultData[0]['url'];

                this.props.actions.setFormState((state) => {
                    state.values = {
                        ...state.values,
                        [tarGetField]: tarGetValue
                    };
                });
            };

            return (
                <div style={{ display: 'flex' }}>
                    <TarGet style={{ width: '312px' }} placeholder={'请输入....'} {...this.props} />
                    <span style={{ marginLeft: '5px' }}>
                        <FileUploder
                            callbackRender={uploadCallbackRender}
                            fileType="office"
                            showProgress={true}
                            apiEndpoint={api.file.uploadOfficeFile}
                        />
                    </span>
                </div>
            );
        }
    };
};

const mapStringValue = (props) => {
    return props;
};

const Input = WrapperAntStringComomnet(AntInput);

const UPackedDocumentUploader = connect({
    getProps: compose(mapStyledProps, mapStringValue),
    getComponent: mapTextComponent
})(Input);

registerFormField('UPackedDocumentUploader', UPackedDocumentUploader);
export { UPackedDocumentUploader };
