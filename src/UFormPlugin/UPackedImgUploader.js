import React from 'react';
import { Input as AntInput } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import FileUploder from '@/component/fileUploder';
import { root_url, port } from '@/api/api_config/base_config';
import api from '@/api/api';
const fileRoot = `${root_url}:${port}/`;

const WrapperAntStringComomnet = (TarGet) => {
    return class Select extends React.Component {
        constructor(props) {
            super(props);
            console.log('props: ', props);
            this.state = {
                imageUrl: null
            };
        }

        render() {
            const uploadCallbackRender = (uploadResultData) => {
                let tarGetField = this.props.field_id;
                console.log('uploadResultData: ', uploadResultData);
                let tarGetValue = uploadResultData[0]['url'];

                this.setState({
                    imageUrl: fileRoot + tarGetValue
                });

                this.props.actions.setFormState((state) => {
                    state.values = {
                        ...state.values,
                        [tarGetField]: tarGetValue
                    };
                });
            };

            return (
                <div>
                    <TarGet style={{ width: '312px' }} placeholder={'请输入....'} {...this.props} />

                    <span style={{ marginLeft: '5px' }}>
                        <FileUploder
                            callbackRender={uploadCallbackRender}
                            fileType="img"
                            showProgress={true}
                            apiEndpoint={api.file.uploadPicture}
                        />
                    </span>

                    {this.state.imageUrl ? (
                        <img
                            src={this.state.imageUrl}
                            alt="avatar"
                            style={{
                                marginTop: '5px',
                                width: '100px',
                                height: 'auto',
                                maxHeight: '246px'
                            }}
                        />
                    ) : null}
                </div>
            );
        }
    };
};

const mapStringValue = (props) => {
    return props;
};

const Input = WrapperAntStringComomnet(AntInput);

const UPackedImgUploader = connect({
    getProps: compose(mapStyledProps, mapStringValue),
    getComponent: mapTextComponent
})(Input);

registerFormField('UPackedImgUploader', UPackedImgUploader);
export { UPackedImgUploader };
