import React from 'react';
import { Input as AntInput, Button, message } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import { CloudDownloadOutlined, FunctionOutlined } from '@ant-design/icons';
import { tryParseJSON } from '@/utils/tools';

import api from '@/api/api';
import 'dayjs/locale/zh-cn';

const WrapperAntStringComomnet = (TarGet) => {
    return class Select extends React.Component {
        render() {
            // console.log(this.props.nnstore.table_action);
            const fetchRemoteAlone = async () => {
                let res = await api.curd.remoteCommonFetch();
                return res.value;
            };

            const fetchRemoteWithOnSiteValue = async (title, queryValue) => {
                if (!queryValue) {
                    message.error('必须输入' + title + '的值才能获取远程数据');
                    return null;
                }

                let params = { data: { queryValue: queryValue } };
                let res = await api.curd.remoteCommonFetch(params);
                return res.value;
            };

            return (
                <div>
                    <TarGet style={{ width: '312px' }} placeholder={'请输入....'} {...this.props} />
                    <Button
                        onClick={async () => {
                            // 获取远方数据,改变自己的值

                            if (this.props?.default_v == 'RemoteFetchAlone') {
                                //直接修改自己的值,用API的返回value
                                let tarGetField = this.props.field_id;
                                let cloudValue = await fetchRemoteAlone();
                                this.props.actions.setFormState((state) => {
                                    state.values = {
                                        ...state.values,
                                        [tarGetField]: cloudValue
                                    };
                                });
                            }

                            //用自己的值当参数, 呼叫API
                            // let tarGetField = this.props.field_id;

                            if (this.props?.default_v == 'RemoteFetchOnSite') {
                                console.log(this.props);
                                let tarGetField = 'bookname';

                                const parsedObject = tryParseJSON(this.props.defaultv_para);
                                if (parsedObject == null) {
                                    tarGetField = null;
                                } else {
                                    tarGetField = parsedObject['target'];
                                }

                                let cloudValue = await fetchRemoteWithOnSiteValue(this.props.title, this.props.value);
                                this.props.actions.setFormState((state) => {
                                    state.values = {
                                        ...state.values,
                                        [tarGetField]: cloudValue
                                    };
                                });
                            }
                        }}
                        style={{ marginLeft: '5px' }}>
                        {this.props?.default_v == 'RemoteFetchAlone' ? <CloudDownloadOutlined /> : <FunctionOutlined />}
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

const UString = connect({
    getProps: compose(mapStyledProps, mapStringValue),
    getComponent: mapTextComponent
})(Input);

registerFormField('UString', UString);
export { UString };
