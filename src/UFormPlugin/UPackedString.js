import React from 'react';
import { Input as AntInput, Button, message } from 'antd';
import { compose, mapStyledProps, mapTextComponent } from './uformHelpers/UFormUtils';
import { registerFormField, connect } from '@uform/react';
import { tryParseJSON } from '@/utils/tools';
import { VscLink } from 'react-icons/vsc';
import { VscGitFetch } from 'react-icons/vsc';

import api from '@/api/api';

const WrapperAntStringComomnet = (TarGet) => {
    return class Select extends React.Component {
        render() {
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
                <>
                    <TarGet style={{ width: '312px' }} placeholder={'请输入....'} {...this.props} />
                    <Button
                        className="form-operation-button"
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

                            if (this.props?.default_v == 'RemoteFetchOnSite') {
                                const {
                                    title: fieldTitle,
                                    value: fieldValue,
                                    defaultv_para: fieldDefaultvPara
                                } = this.props;

                                let tarGetField = null;
                                const parsedObject = tryParseJSON(fieldDefaultvPara);
                                if (parsedObject == null) {
                                    message.error('请检查此字段:' + this.props.title + '的配置');
                                    return;
                                } else {
                                    tarGetField = parsedObject['target'];
                                }

                                let FormState = this.props.actions.getFormState();

                                if (!FormState.values.hasOwnProperty(tarGetField)) {
                                    message.info(
                                        '注意:目标字段' + tarGetField + '不在此表单中，无需获取远程数据,也未被未被修改'
                                    );
                                    return;
                                }

                                let cloudValue = await fetchRemoteWithOnSiteValue(fieldTitle, fieldValue);

                                this.props.actions.setFormState((state) => {
                                    state.values = {
                                        ...state.values,
                                        [tarGetField]: cloudValue
                                    };
                                });
                            }
                        }}
                        style={{ marginLeft: '5px' }}>
                        {this.props?.default_v == 'RemoteFetchAlone' ? (
                            <VscGitFetch style={{ verticalAlign: '-2px' }} />
                        ) : (
                            <VscLink style={{ verticalAlign: '-2px' }} />
                        )}
                    </Button>
                </>
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
