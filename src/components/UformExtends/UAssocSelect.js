import React from 'react';
import { Select } from 'antd';
import api from '@/api/api';
import { observer, inject } from 'mobx-react';

@inject('NanxTableStore', 'TriggerStore')
@observer
export default class AssocSelect extends React.Component {
    constructor(props) {
        super(props);
        console.log(' 💘AssocSelect💘', props);
        this.state = {
            optionList: [],
            loading: false
        };

        this.onSelect = this.onSelect.bind(this);
    }

    componentWillUnmount() {
        this.props.TriggerStore.clearTrigger();
    }

    async componentDidMount() {
        //把自己(AssosSelect注册到 triggers )

        this.props.TriggerStore.registerTrigger(this);
        let groups = this.props.NanxTableStore.getDropdownLevelInfo();

        if (this.props.trigger_cfg.level == 1 && this.props.NanxTableStore.table_action === 'add') {
            await this.getOptionList(this.props.trigger_cfg, null, this);
        }

        if (this.props.trigger_cfg.level == groups[this.props.trigger_cfg.trigger_group_uuid]) {
            //模拟用户点击下拉选择
            if (this.props.NanxTableStore.table_action === 'edit') {
                await this.simulateClick();
            }
        }
    }

    async simulateClick() {
        for (let i = 0; i < this.props.TriggerStore.triggers.length; i++) {
            let element = this.props.TriggerStore.triggers[i];

            if (element.props.trigger_cfg.trigger_group_uuid == this.props.trigger_cfg.trigger_group_uuid) {
                let _tmp1_rows = element.props.nnstore.selectedRows;
                let curren_value = _tmp1_rows[0]['ghost_' + element.props.trigger_cfg.as_select_field_id];
                await element.getDefaultOptionList(element);
                element.props.onChange(curren_value);
            }
        }
    }

    // eslint-disable-next-line
    async getDefaultOptionList(current_ele) {
        let prev_sel_value = null;
        if (current_ele.props.trigger_cfg.level == 1) {
            prev_sel_value = null;
        }
        if (current_ele.props.trigger_cfg.level > 1) {
            prev_sel_value = current_ele.getPrevSelValue(current_ele);
        }

        await current_ele.getOptionList(current_ele.props.trigger_cfg, prev_sel_value, current_ele);
    }

    // 获取上一个级别的联动值
    // eslint-disable-next-line
    getPrevSelValue(current_ele) {
        for (let i = 0; i < this.props.TriggerStore.triggers.length; i++) {
            let element = this.props.TriggerStore.triggers[i];

            // 不同组结束本次循环
            if (element.props.trigger_cfg.trigger_group_uuid != current_ele.props.trigger_cfg.trigger_group_uuid) {
                continue;
            }
            // 不是上一个联动的结束本次循环
            if (current_ele.props.trigger_cfg.level - element.props.trigger_cfg.level != 1) {
                continue;
            }

            let prev_value =
                element.props.nnstore.selectedRows[0]['ghost_' + element.props.trigger_cfg.as_select_field_id];
            if (prev_value) {
                return prev_value;
            }
            return element.props.default;
        }
    }

    async onSelect(value) {
        this.props.onChange(value);

        for (let i = 0; i < this.props.TriggerStore.triggers.length; i++) {
            let element = this.props.TriggerStore.triggers[i];

            // 2、同一组
            if (element.props.trigger_cfg.trigger_group_uuid == this.props.trigger_cfg.trigger_group_uuid) {
                if (element.props.trigger_cfg.level - this.props.trigger_cfg.level == 1) {
                    await element.getOptionList(element.props.trigger_cfg, value, element);
                    element.props.value && element.props.onChange('');
                }
                // 4、清空level - 当前level >= 2 的字段的value和optionList
                if (element.props.trigger_cfg.level - this.props.trigger_cfg.level >= 2) {
                    element.props.value && element.props.onChange('');
                }
            }
        }
    }

    getOptionList = async (trigger_cfg, searchValue, element) => {
        this.setState({
            loading: true
        });
        let params = {
            data: { ...trigger_cfg, value_field: searchValue },
            method: 'POST'
        };

        let res = await api.dataGrid.getAssociateData(params);
        if (res.code == 200) {
            let optionList = this.props.TriggerStore.formatOptionList(
                res.data,
                trigger_cfg.label_field,
                trigger_cfg.value_field
            );
            element.setState({ optionList: optionList, loading: false });
        }
    };

    render() {
        return (
            <Select
                loading={this.state.loading}
                showSearch
                disabled={this.props.disabled}
                value={this.props.value}
                optionFilterProp="children"
                onSelect={(event) => this.onSelect(event, 'y')}>
                {this.state.optionList.map((option) => {
                    return (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    );
                })}
            </Select>
        );
    }
}
