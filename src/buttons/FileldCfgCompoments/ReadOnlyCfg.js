import React from 'react';
import { Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';
import { VscCircleSlash } from 'react-icons/vsc';

@inject('GridConfigStore')
@observer
class PluginCfg extends React.Component {
    render() {
        return (
            <div className="fromBox-half">
                <div className="formItem">
                    <VscCircleSlash style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                    只读属性
                </div>
                <div className="formItem">
                    <Checkbox
                        disabled={this.props.col.Field == 'id'}
                        checked={this.props.col.readonly}
                        onChange={(e) => {
                            this.props.GridConfigStore.changeCfg_cbx(e, 'readonly', this.props.col.Field);
                        }}>
                        只读
                    </Checkbox>
                </div>
            </div>
        );
    }
}
export default PluginCfg;
