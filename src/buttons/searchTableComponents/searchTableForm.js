import React from 'react';
import { withLatestFrom, map } from 'rxjs/operators';
import { toJS } from 'mobx';
import { SchemaForm, createAsyncFormActions, Field, FormItemGrid } from '@uform/antd';
import { observer, inject } from 'mobx-react';

@inject('commonTableStore')
@observer
export default class SearchTableForm extends React.Component {
    constructor(props) {
        super(props);
        let actions = createAsyncFormActions();
        this.state = {
            actions: actions
        };
    }

    operation_list = {
        string: [
            {
                label: '包含',
                value: 'like'
            },
            {
                label: '等于',
                value: '='
            },
            {
                label: '不等于',
                value: '!='
            }
        ],
        date: [
            {
                label: '大于等于',
                value: '>='
            },
            {
                label: '等于',
                value: '='
            },
            {
                label: '小于等于',
                value: '<='
            }
        ],
        number: [
            {
                label: '大于等于',
                value: '>='
            },
            {
                label: '等于',
                value: '='
            },
            {
                label: '小于等于',
                value: '<='
            }
        ],
        other: [
            {
                label: '包含',
                value: 'like'
            },
            {
                label: '等于',
                value: '='
            },
            {
                label: '小于等于',
                value: '!='
            }
        ]
    };

    getFieldList = () => {
        return this.props.commonTableStore.rawTableColumns.map(({ title, key }) => ({ label: title, value: key }));
    };

    componentWillMount() {
        this.props.saveActions(this, this.props.form_index);
    }

    getSearchTableFormData = async () => {
        let inner_fmdata = await this.state.actions.submit();
        return inner_fmdata.values;
    };

    render() {
        return (
            <SchemaForm
                actions={this.state.actions}
                effects={($, { setFieldState }) => {
                    $('onFormInit').subscribe(() => {
                        setFieldState('field_' + this.props.form_index, (state) => {
                            state.enum = this.props.fieldList;
                        });
                    });

                    const setEnum = (name, operator_list) => {
                        setFieldState(name, (state) => {
                            console.log(state, name, operator_list);
                            state.props.enum = operator_list;
                            for (var k = 0; k < operator_list.length; k++) {
                                if (operator_list[k].value == 'like') {
                                    state.value = 'like';
                                }
                            }
                        });
                    };

                    const setType = (name, type) => {
                        setFieldState(name, (state) => {
                            state.props.type = type;
                            if (type != 'date') {
                                state.value = '';
                            }
                        });
                    };
                    let contentfield = 'vset_' + this.props.form_index;
                    $('savevalue', contentfield).subscribe(() => {
                        this.props.onOk();
                    });
                    $('onFieldChange', contentfield).subscribe((fieldState) => {
                        if (fieldState.value) {
                            setFieldState(contentfield, (state) => {
                                state.value = state.value ? state.value.replace(/(^\s*)|(\s*$)/g, '') : '';
                            });
                        }
                    });
                    let field = 'field_' + this.props.form_index;

                    $('onFieldChange', field)
                        .pipe(
                            withLatestFrom($('onChangeOption')),
                            map(([fieldState, { payload: option }]) => {
                                return {
                                    state: fieldState,
                                    option
                                };
                            })
                        )

                        .subscribe(async ({ state }) => {
                            let formCfg = toJS(this.props.commonTableStore.formCfg.properties);
                            let operator = 'operator_' + this.props.form_index;

                            let keys = Object.keys(formCfg);
                            let type = '';
                            for (let i = 0; i < keys.length; i++) {
                                let field_group_key = keys[i];
                                if (formCfg[field_group_key].properties[state.value]) {
                                    field = formCfg[field_group_key].properties[state.value].type;
                                    break;
                                }
                            }

                            switch (type) {
                                case 'string':
                                    setEnum(operator, this.operation_list.string);

                                    setType('vset_' + this.props.form_index, 'string');
                                    break;
                                case 'number':
                                    setEnum(operator, this.operation_list.number);
                                    setType('vset_' + this.props.form_index, 'number');
                                    break;
                                case 'date':
                                    setEnum(operator, this.operation_list.date);
                                    setType('vset_' + this.props.form_index, 'date');
                                    break;
                                default:
                                    console.log();
                                    setEnum(operator, this.operation_list.other);
                                    setType('vset_' + this.props.form_index, 'string');
                            }
                        });
                }}
                labelCol={8}
                wrapperCol={16}>
                <FormItemGrid gutter={3} cols={[8, 8, 8]}>
                    <Field
                        type="string"
                        title="搜索字段"
                        name={'field_' + this.props.form_index}
                        default=""
                        required
                        enum={this.getFieldList()}
                        x-effect={(dispatch) => ({
                            onChange(value, type, option) {
                                dispatch('onChangeOption', option);
                            }
                        })}
                    />

                    <Field type="string" title="搜索条件" required name={'operator_' + this.props.form_index} />
                    <Field
                        type="string"
                        title="搜索内容"
                        name={'vset_' + this.props.form_index}
                        required
                        default={null}
                        x-effect={(dispatch) => ({
                            onPressEnter(value, type, option) {
                                dispatch('savevalue', option);
                            }
                        })}
                    />
                </FormItemGrid>
            </SchemaForm>
        );
    }
}
