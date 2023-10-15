import React from 'react';
import { Form } from 'antd';
import { observer, inject } from 'mobx-react';
@inject('dmStore')
@observer
class Gridinfo extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    saveCfg(field_cfg) {
        this.dmstore.saveFieldCfg(field_cfg);
    }

    changeCfg_input = function (a, attr, field) {
        let value = event.target.value;
        this.dmstore.setFieldAttr(field, attr, value);
    };

    changeCfg_cbx = function (a, attr, field) {
        let value = event.target.checked;
        this.dmstore.setFieldAttr(field, attr, value);
    };

    changeCfg_dropdown = function (v, attr, field) {
        if (v == undefined) {
            v = '';
        }
        this.dmstore.setFieldAttr(field, attr, v);
    };

    render() {
        let xtitle = '字段管理:' + this.dmstore.current_actname + '/' + this.dmstore.DataGridCode;
        return <div> {xtitle} </div>;
    }
}
export default Form.create()(Gridinfo);
