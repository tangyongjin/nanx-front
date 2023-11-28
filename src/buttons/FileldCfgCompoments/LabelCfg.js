import React from 'react';
import { Input } from 'antd';
import { observer, inject } from 'mobx-react';
import { VscQuote } from 'react-icons/vsc';

@inject('GridConfigStore')
@observer
class LabelCfg extends React.Component {
    render() {
        return (
            <div className="fromBox">
                <div className="formItem">
                    <VscQuote style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                    列名显示为
                </div>
                <div className="formItem">
                    <Input
                        value={this.props.col.label || this.props.col.Comment || this.props.col.Field}
                        onChange={(e) => {
                            this.props.GridConfigStore.changeCfg_input(e, 'label', this.props.col.Field);
                        }}
                    />
                </div>
            </div>
        );
    }
}
export default LabelCfg;
