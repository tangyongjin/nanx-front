import React from 'react';
import { Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';

@inject('DataGridStore')
@observer
class PluginCfg extends React.Component {
    render() {
        return (
            <div className="fromBox">
                <div className="formItem">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    只读属性
                </div>
                <div className="formItem">
                    <Checkbox
                        disabled={this.props.col.Field == 'id'}
                        checked={this.props.col.readonly}
                        onChange={(e) => {
                            this.props.DataGridStore.changeCfg_cbx(e, 'readonly', this.props.col.Field);
                        }}>
                        只读
                    </Checkbox>
                </div>
            </div>
        );
    }
}
export default PluginCfg;
