import React from 'react';
import { Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';
import { BsEyeFill } from 'react-icons/bs';

@inject('GridConfigStore')
@observer
class PluginCfg extends React.Component {
    render() {
        return (
            <div className="fromBox-half">
                <div className="formItem">
                    <BsEyeFill style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                    表单隐藏/可见
                </div>
                <div className="formItem">
                    <Checkbox
                        checked={this.props.col.form_hidden}
                        onChange={(e) => {
                            this.props.GridConfigStore.changeCfg_cbx(e, 'form_hidden', this.props.col.Field);
                        }}>
                        隐藏
                    </Checkbox>
                </div>
            </div>
        );
    }
}
export default PluginCfg;
