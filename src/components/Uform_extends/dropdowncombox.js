import React from 'react'
import { Select } from 'antd'
import api from '@/api/api'


export default class Dropdowncombox extends React.Component {

    constructor(props) {

        console.log('============   Dropdowncombox ========================');
        console.log(props);

        super(props)
        this.store = props.commontablestore
        this.state = {
            optionValue: null,
            optionList: [],
            loading: false,
            isInit: false,
            assocGroup: []
        }
        this.onSelect = this.onSelect.bind(this)
    }

    componentWillUnmount() {
        this.store.clearTrigger()
        this.store.clearDropdownRef()
    }

    componentDidMount() {
        if (!this.store) {
            return;
        }
        this.store.registerTrigger(this)
        this.store.registerDropDown(this.props.ass_select_field_id, this)


        if (this.props.form_action === 'edit') {
            this.initValues()
            return;
        }

        // 3、同一组的dom加载完毕
        let group = this.getGroupCount()
        if (this.props.query_cfg.level == group[this.props.query_cfg.trigger_group_uuid]) {
            //模拟用户选择
            this.simulateClick()
        }
        console.log(this.props)
    }

    initValues() {
        // 没有ghost字段的处理
        if (this.props.query_cfg.level == 1) {
            this.getOptionList(this.props.query_cfg, null, this)
            this.onSelect(this.props.value)
            return;
        }
        // 前一个值为空
        let prev_value = getPrevSelValue(this)
        if (!prev_value) {
            return;
        }
        this.getOptionList(this.props.query_cfg, prev_value, this)
        this.onSelect(this.props.value)
    }



    async simulateClick() {
        // 1、选择数据不为空，
        if (this.store.selectedRows[0] && this.store.selectedRows[0].length == 0) {
            return;
        }
        // 2、编辑状态
        if (this.store.table_action == 'edit_table') {
            for (let i = 0; i < this.store.triggers.length; i++) {
                let element = this.store.triggers[i];
                // 2、同一组
                if (element.props.query_cfg.trigger_group_uuid == this.props.query_cfg.trigger_group_uuid) {
                    let curren_value = element.store.selectedRows[0]['ghost_' + element.props.ass_select_field_id];
                    await element.getDefaultOptionList(element, element);
                    element.props.onChange(curren_value)
                    element.setState({ optionValue: curren_value })
                }

            }
            return;
        }

    }

    async getDefaultOptionList(current_ele, element) {
        let prev_sel_value = null
        if (current_ele.props.query_cfg.level == 1) {
            prev_sel_value = null
        }
        if (current_ele.props.query_cfg.level > 1) {
            prev_sel_value = current_ele.getPrevSelValue(current_ele);
        }

        await element.getOptionList(element.props.query_cfg, prev_sel_value, element)
    }

    getGroupCount() {
        let group = new Array()

        Object.keys(this.store.formCfg.properties.group_all.properties).map(gourp_key => {
            let fields_group = this.store.formCfg.properties.group_all.properties[gourp_key];

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
                            ?
                            query_cfg.level
                            :
                            group[query_cfg.trigger_group_uuid]
                }
            }
        })
        return group
    }

    // 获取上一个联动值
    getPrevSelValue(current_ele) {

        for (let i = 0; i < this.store.triggers.length; i++) {
            let element = this.store.triggers[i];

            // 不同组结束本次循环
            if (element.props.query_cfg.trigger_group_uuid != current_ele.props.query_cfg.trigger_group_uuid) {
                continue;
            }
            // 不是上一个联动的结束本次循环
            if (current_ele.props.query_cfg.level - element.props.query_cfg.level != 1) {
                continue;
            }
            let prev_value = element.store.selectedRows[0]['ghost_' + element.props.ass_select_field_id];
            return prev_value
        }
    }


    async onSelect(value) {
        // 1、设置当前字段的value
        this.props.onChange(value)

        this.setState({
            optionValue: value
        })

        // 关联字段设置
        for (let i = 0; i < this.store.triggers.length; i++) {
            let element = this.store.triggers[i];

            // 2、同一组
            if (element.props.query_cfg.trigger_group_uuid == this.props.query_cfg.trigger_group_uuid) {
                // 3、加载下一个联动select的option，并清空下一个select的value
                if (element.props.query_cfg.level - this.props.query_cfg.level == 1) {
                    await element.getOptionList(element.props.query_cfg, value, element);
                    element.setState({
                        optionValue: null
                    });
                    element.props.value && element.props.onChange('');
                }
                // 4、清空level - 当前level >= 2 的字段的value和optionList
                if (element.props.query_cfg.level - this.props.query_cfg.level >= 2) {
                    element.setState({
                        optionList: [],
                        optionValue: null
                    });
                    element.props.value && element.props.onChange('');
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
        console.log('============   getOptionList ========================');
        this.setState({
            loading: true
        })
        let params = {
            data: { ...query_cfg, value_field: value },
            method: 'POST'
        };

        console.log(params)
        let res = await api.activity.getAssociateData(params)
        if (res.code == 200) {
            let optionList = this.formatOptionList(res.data, query_cfg.label_field, query_cfg.value_field)
            element.setState({ optionList: optionList, loading: false });
        }
    }

    formatOptionList(list, label_field, value_field) {
        return list.map(item => ({ label: item[label_field], value: item[value_field] }))
    }

    getOptionValue() {
        if (!this.props.value) {
            return;
        }


        return this.props.value
    }


    render() {
        return (
            <Select
                loading={ this.state.loading }
                showSearch
                disabled={ this.props.disabled ? true : false }
                value={ this.getOptionValue() }
                onSelect={ this.onSelect }
                onDropdownVisibleChange={ this.onDropdownVisibleChange.bind(this) }
            >
                {
                    this.state.optionList.map(option => {
                        return <Select.Option key={ option.value } value={ option.value }>{ option.label }</Select.Option>
                    })
                }

            </Select>
        );
    }
}
