import React from 'react';
import { withLatestFrom, map } from 'rxjs/operators';
import { toJS } from 'mobx';
import { SchemaForm, createAsyncFormActions, Field, FormItemGrid } from '@uform/antd';
import { observer, inject } from 'mobx-react';

@inject('NanxTableStore')
@observer
export default class TableSearchForm extends React.Component {
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
                label: '字符串包含',
                value: 'like'
            },
            {
                label: '字符串相等',
                value: '='
            },
            {
                label: '字符串不包含',
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
                            let formCfg = toJS(this.props.NanxTableStore.formCfg.properties);
                            let operator = 'operator_' + this.props.form_index;
                            let type = '';
                            if (formCfg[state.value]) {
                                type = formCfg[state.value].type;
                                console.log('type: ', type);
                                // break;
                            }

                            switch (type) {
                                case 'string':
                                    setEnum(operator, this.operation_list.string);
                                    setType('vset_' + this.props.form_index, 'string');
                                    break;

                                case 'AssocSelect':
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

                                case 'UDateEditor':
                                    setEnum(operator, this.operation_list.date);
                                    setType('vset_' + this.props.form_index, 'UDateEditor');
                                    break;

                                default:
                                    console.log();
                                    setEnum(operator, this.operation_list.other);
                                    setType('vset_' + this.props.form_index, 'string');
                            }
                        });
                }}
                labelCol={5}
                wrapperCol={14}>
                <FormItemGrid gutter={6}>
                    <Field
                        type="string"
                        title="字段"
                        name={'field_' + this.props.form_index}
                        default=""
                        required
                        enum={this.props.fieldsList}
                        x-effect={(dispatch) => ({
                            onChange(value, type, option) {
                                dispatch('onChangeOption', option);
                            }
                        })}
                    />

                    <Field type="string" title="条件" required name={'operator_' + this.props.form_index} />
                    <Field
                        type="string"
                        title="内容"
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
