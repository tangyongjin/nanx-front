import React from 'react';
import { Button, message } from 'antd';
import SearchTableForm from './searchTableForm';
import { observer, inject } from 'mobx-react';

@inject('commonTableStore')
@observer
export default class SearchFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field_group: [{ inner_order: 0 }],
            field_list: []
        };
    }

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

    searchHandler = async () => {
        let submitData = [];

        for (let i = 0; i < this.state.field_group.length; i++) {
            let formValue = await this.state.field_group[i].actions.getSearchTableFormData();
            formValue['and_or_' + i] = 'and';
            submitData.push(formValue);
        }

        if (this.validateRepeatField(submitData) === false) {
            return;
        }

        let query_cfg = {
            count: this.state.field_group.length,
            lines: {}
        };
        submitData.map((item) => {
            query_cfg.lines = { ...query_cfg.lines, ...item };
        });

        this.props.commonTableStore.setCurrentPage(1);
        this.props.commonTableStore.setSearchQueryConfig(submitData);
        this.props.commonTableStore.rowSelectChange([], []);
        this.props.commonTableStore.listData();
        this.props.hideModal();
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
            <div>
                <div style={{ marginBottom: '15px' }}>
                    <Button
                        type="primary"
                        htmlType="button"
                        size="small"
                        onClick={this.addLine}
                        style={{ marginRight: '10px' }}>
                        增加
                    </Button>
                    <Button type="danger" htmlType="button" size="small" onClick={this.deleteLine}>
                        删除
                    </Button>
                </div>
                {this.state.field_group.map((item, index) => {
                    return (
                        <SearchTableForm
                            key={index}
                            saveActions={this.saveActions}
                            onOk={this.props.onOk}
                            form_index={item.inner_order}></SearchTableForm>
                    );
                })}
            </div>
        );
    }
}
