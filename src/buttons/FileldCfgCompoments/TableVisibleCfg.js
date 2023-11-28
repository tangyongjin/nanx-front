import React from 'react';
import { Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';
import { BsEyeFill } from 'react-icons/bs';

@inject('GridConfigStore')
@observer
class TableVisibleCfg extends React.Component {
    render() {
        return (
            <div className="fromBox">
                <div className="formItem">
                    <BsEyeFill style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                    表格隐藏/可见
                </div>
                <div className="formItem">
                    <Checkbox
                        checked={this.props.col.column_hidden}
                        onChange={(e) => {
                            this.props.GridConfigStore.changeCfg_cbx(e, 'column_hidden', this.props.col.Field);
                        }}>
                        隐藏
                    </Checkbox>
                </div>
            </div>
        );
    }
}
export default TableVisibleCfg;
