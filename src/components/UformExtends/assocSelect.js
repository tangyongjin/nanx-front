import React from 'react';
import { Select } from 'antd';
import api from '@/api/api';

export default class AssocSelect extends React.Component {
    constructor(props) {
        super(props);

        this.tableStore = props.commontablestore;
        this.state = {
            optionValue: null,
            optionList: [],
            loading: false
        };
        this.onSelect = this.onSelect.bind(this);
    }

    componentWillUnmount() {
        this.tableStore.clearTrigger();
    }

    componentDidMount() {
        this.tableStore.registerTrigger(this);
        // 3、同一组的dom加载完毕

        // ??? 应该使用 本组件所在的formcfg来获取 Group,而不是使用 store.formCfg,
        // 因为 本组件就是下拉,不能一定认为是从 Activity 来 !
        let group = this.getDropdownGroups();
        if (this.props.query_cfg.level == group[this.props.query_cfg.trigger_group_uuid]) {
            //模拟用户选择
            this.simulateClick();
        } else {
        }
    }

    initValues() {
        // 没有ghost字段的处理
        if (this.props.query_cfg.level == 1) {
            this.getOptionList(this.props.query_cfg, null, this);
            this.props.value ? this.onSelect(this.props.value, 'n') : this.onSelect(this.props.default, 'n');
            return;
        }

        // 前一个值为空
        let prev_value = this.getPrevSelValue(this);
        if (!prev_value) {
            return;
        }

        this.getOptionList(this.props.query_cfg, prev_value, this);
        this.props.value ? this.onSelect(this.props.value, 'n') : this.onSelect(this.props.default, 'n');
    }

    async simulateClick() {
        // 1、选择数据为空，

        if (this.tableStore.table_action == 'add') {
            return;
        }

        // 2、公用table编辑状态
        if (this.tableStore.table_action == 'edit') {
            for (let i = 0; i < this.tableStore.triggers.length; i++) {
                let element = this.tableStore.triggers[i];
                // 2、同一组
                if (element.props.query_cfg.trigger_group_uuid == this.props.query_cfg.trigger_group_uuid) {
                    let curren_value = element.tableStore.selectedRows[0]['ghost_' + element.props.ass_select_field_id];
                    await element.getDefaultOptionList(element);
                    element.props.onChange(curren_value);
                    element.setState({ optionValue: curren_value });
                }
            }
            return;
        }

        // 3、有值时初始化

        for (let i = 0; i < this.tableStore.triggers.length; i++) {
            let element = this.tableStore.triggers[i];
            // 2、同一组

            if (element.props.query_cfg.trigger_group_uuid == this.props.query_cfg.trigger_group_uuid) {
                if (element.props.form_action == 'edit') {
                    element.initValues();
                }
            }
        }
    }

    async getDefaultOptionList(current_ele) {
        let prev_sel_value = null;
        if (current_ele.props.query_cfg.level == 1) {
            prev_sel_value = null;
        }
        if (current_ele.props.query_cfg.level > 1) {
            prev_sel_value = current_ele.getPrevSelValue(current_ele);
        }

        await current_ele.getOptionList(current_ele.props.query_cfg, prev_sel_value, current_ele);
    }

    // 获取同一组的下拉的数量
    getDropdownGroups() {
        // 没有schema参数
        if (!this.props.schema) {
            return;
        }
        let group = [];

        Object.keys(this.props.schema.properties).map((gourp_key) => {
            console.log(gourp_key + ': ');

            let fields_group = this.props.schema.properties[gourp_key];
            for (let key in fields_group.properties) {
                let item = fields_group.properties[key];
                if (item['x-props'] && item['x-props'].query_cfg && item['x-props'].query_cfg.level) {
                    let query_cfg = item['x-props'].query_cfg;

                    if (group[query_cfg.trigger_group_uuid] == undefined) {
                        group[query_cfg.trigger_group_uuid] = 1;
                        continue;
                    }
                    group[query_cfg.trigger_group_uuid] =
                        query_cfg.level - group[query_cfg.trigger_group_uuid] > 0
                            ? query_cfg.level
                            : group[query_cfg.trigger_group_uuid];
                }
            }
        });

        return group;
    }

    // 获取上一个联动值
    getPrevSelValue(current_ele) {
        for (let i = 0; i < this.tableStore.triggers.length; i++) {
            let element = this.tableStore.triggers[i];

            // 不同组结束本次循环
            if (element.props.query_cfg.trigger_group_uuid != current_ele.props.query_cfg.trigger_group_uuid) {
                continue;
            }
            // 不是上一个联动的结束本次循环
            if (current_ele.props.query_cfg.level - element.props.query_cfg.level != 1) {
                continue;
            }

            let prev_value = element.tableStore.selectedRows[0]['ghost_' + element.props.ass_select_field_id];

            if (prev_value) {
                return prev_value;
            }
            return element.props.default;
        }
    }

    async onSelect(value, isClear) {
        console.log('select', value);
        // 1、设置当前字段的value
        this.props.onChange(value);

        this.setState({
            optionValue: value
        });

        // 关联字段设置
        for (let i = 0; i < this.tableStore.triggers.length; i++) {
            let element = this.tableStore.triggers[i];

            // 2、同一组
            if (element.props.query_cfg.trigger_group_uuid == this.props.query_cfg.trigger_group_uuid) {
                if (element.props.query_cfg.level - this.props.query_cfg.level == 1) {
                    await element.getOptionList(element.props.query_cfg, value, element);
                    if (isClear === 'y') {
                        element.setState({
                            optionValue: null
                        });
                        element.props.value && element.props.onChange('');
                    }
                }
                // 4、清空level - 当前level >= 2 的字段的value和optionList
                if (element.props.query_cfg.level - this.props.query_cfg.level >= 2) {
                    if (isClear === 'y') {
                        element.setState({
                            optionList: [],
                            optionValue: null
                        });
                        element.props.value && element.props.onChange('');
                    }
                }
            }
        }
    }

    async onDropdownVisibleChange(open) {
        if (open === false) {
            return;
        }

        // level为1的时候加载optionList
        if (this.props.query_cfg.level == 1) {
            await this.getOptionList(this.props.query_cfg, null, this);
        }
    }

    getOptionList = async (query_cfg, value, element) => {
        this.setState({
            loading: true
        });
        let params = {
            data: { ...query_cfg, value_field: value },
            method: 'POST'
        };

        let res = await api.dataGrid.getAssociateData(params);

        if (res.code == 200) {
            let optionList = this.formatOptionList(res.data, query_cfg.label_field, query_cfg.value_field);
            element.setState({ optionList: optionList, loading: false });
        }
    };

    formatOptionList(list, label_field, value_field) {
        return list.map((item) => ({ label: item[label_field], value: item[value_field] }));
    }

    getOptionValue() {
        if (!this.props.value) {
            return;
        }

        return this.props.value;
    }

    render() {
        return (
            <Select
                loading={this.state.loading}
                showSearch
                disabled={this.props.disabled}
                value={this.getOptionValue()}
                optionFilterProp="children"
                onSelect={(event) => this.onSelect(event, 'y')}
                onDropdownVisibleChange={this.onDropdownVisibleChange.bind(this)}>
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
