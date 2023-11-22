import React from 'react';
import { Input as AntInput, Button } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import { CloudDownloadOutlined } from '@ant-design/icons';
import api from '@/api/api';

import 'dayjs/locale/zh-cn';

const WrapperAntStringComomnet = (TarGet) => {
    return class Select extends React.Component {
        render() {
            const fetchRemote = async () => {
                let res = await api.curd.remoteCommonFetch();
                console.log(res);
                return res.value;
            };

            return (
                <div>
                    <TarGet style={{ width: '312px' }} placeholder={'请输入....'} {...this.props} />
                    <Button
                        onClick={async () => {
                            let cloudValue = await fetchRemote();
                            // 获取远方数据,改变自己的值
                            if (this.props?.default_v == 'RemoteFetchAlone') {
                                let tarGetField = this.props.field_id;
                                this.props.actions.setFormState((state) => {
                                    state.values = {
                                        ...state.values,
                                        [tarGetField]: cloudValue
                                    };
                                });
                            }

                            console.log(this.props?.default_v);
                        }}
                        style={{ marginLeft: '5px' }}>
                        <CloudDownloadOutlined />
                    </Button>
                </div>
            );
        }
    };
};

const mapStringValue = (props) => {
    console.log(' 👿👿👿👿👿👿👿👿👿 属性: ', props);
    return props;
};

const Input = WrapperAntStringComomnet(AntInput);

const UString = connect({
    getProps: compose(mapStyledProps, mapStringValue),
    getComponent: mapTextComponent
})(Input);

registerFormField('UString', UString);
export { UString };
