import React from 'react';
import { Button, message } from 'antd';
import TableSearchForm from './TableSearchForm';
import { observer } from 'mobx-react';
import api from '@/api/api';

@observer
export default class SearchFormContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            field_group: [{ inner_order: 0 }]
        };
    }

    saveFixedQueryConfigure = async () => {
        let _searchLines = await this.returnQueryLines();
        let params = {
            data: {
                datagrid_code: this.props.targetDataGrid,
                fixedQueryLiens: _searchLines
            }
        };
        await api.dataGrid.saveFixedQueryConfigure(params);
        this.props.afterEditRefresh();
        // this.props.refreshTable();
    };

    getFieldList = () => {
        if (this.props.fieldsList) {
            return this.props.fieldsList;
        } else {
            return this.props.HostedTableStore.tableColumnConfig.map(({ title, key }) => ({
                label: title,
                value: key
            }));
        }
    };

    saveActions = (actions, index) => {
        let { field_group } = this.state;
        field_group[index].actions = actions;
        this.setState({
            field_group
        });
    };

    addLine = () => {
        let { field_group } = this.state;
        let field_cfg = { inner_order: field_group.length };
        field_group.push(field_cfg);
        this.setState({ field_group });
    };

    deleteLine = () => {
        if (this.state.field_group.length == 1) {
            return;
        }
        let { field_group } = this.state;
        field_group.pop();
        this.setState({ field_group });
    };

    // 执行带搜索条件的后台查询
    searchHandler = async () => {
        let queryLines = await this.returnQueryLines();
        await this.props.HostedTableStore.setCurrentPage(1);
        await this.props.HostedTableStore.setSearchQueryConfig(queryLines);
        await this.props.HostedTableStore.rowSelectChange([], []);
        await this.props.HostedTableStore.listData();
        await this.props.HostedTableStore.hideButtonModal();
    };

    //  回传搜索条件给上级组件 returnQueryLines
    returnQueryLines = async () => {
        let queryLines = [];
        for (let i = 0; i < this.state.field_group.length; i++) {
            let formValue = await this.state.field_group[i].actions.getSearchTableFormData();
            formValue['and_or_' + i] = 'and';
            let fixedFormValue = {};
            fixedFormValue.and_or = formValue['and_or_' + i];
            fixedFormValue.field = formValue['field_' + i];
            fixedFormValue.operator = formValue['operator_' + i];
            fixedFormValue.vset = formValue['vset_' + i];
            queryLines.push(fixedFormValue);
        }

        if (this.validateRepeatField(queryLines) === false) {
            return [];
        }

        let query_cfg = {
            count: this.state.field_group.length,
            lines: {}
        };
        queryLines.map((item) => {
            query_cfg.lines = { ...query_cfg.lines, ...item };
        });

        return queryLines;
    };

    validateRepeatField = (submitData) => {
        for (let i = 0; i < submitData.length; i++) {
            let field_pre = submitData[i]['field_' + i];
            for (let j = i + 1; j < submitData.length - i; j++) {
                let field_next = submitData[j]['field_' + j];
                if (field_pre === field_next) {
                    message.warning('搜索字段不能重复');
                    return false;
                }
            }
        }

        return true;
    };

    render() {
        return (
            <div style={{ width: '1000px', marginTop: '25px' }}>
                <div style={{ marginBottom: '14px' }}>
                    <Button
                        type="primary"
                        className="round-button"
                        onClick={this.addLine}
                        style={{ marginRight: '10px' }}>
                        增加搜索条件
                    </Button>
                    <Button type="primary" className="round-button" onClick={this.deleteLine}>
                        删除
                    </Button>

                    {this.props.fieldsList ? (
                        <Button
                            type="primary"
                            className="round-button"
                            style={{ marginLeft: '664px' }}
                            onClick={this.saveFixedQueryConfigure}>
                            保存固定搜索条件
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            style={{ marginLeft: '744px' }}
                            className="round-button"
                            onClick={this.searchHandler}>
                            查询
                        </Button>
                    )}
                </div>
                {this.state.field_group.map((item, index) => {
                    return (
                        <TableSearchForm
                            NanxTableStore={this.props.HostedTableStore}
                            key={index}
                            fieldsList={this.getFieldList()}
                            saveActions={this.saveActions}
                            onOk={this.props.onOk}
                            form_index={item.inner_order}></TableSearchForm>
                    );
                })}
            </div>
        );
    }
}
