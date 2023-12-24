import React from 'react';
import { Button } from 'antd';
import { observer, inject } from 'mobx-react';
import PluginCfg from './FileldCfgCompoments/PluginCfg';
import LabelCfg from './FileldCfgCompoments/LabelCfg';
import ColRenderCfg from './FileldCfgCompoments/ColRenderCfg';
import TableVisibleCfg from './FileldCfgCompoments/TableVisibleCfg';
import FormVisbleCfg from './FileldCfgCompoments/FormVisbleCfg';
import CategeroyCfg from './FileldCfgCompoments/CategeroyCfg';
import InitValueCfg from './FileldCfgCompoments/InitValueCfg';
import ReadOnlyCfg from './FileldCfgCompoments/ReadOnlyCfg';
import ValidateRuleCfg from './FileldCfgCompoments/ValidateRuleCfg';

@inject('GridConfigStore')
@observer
class FieldPropertyRender extends React.Component {
    render() {
        return (
            <div style={{ marginLeft: '10px' }}>
                <h3>
                    字段:{this.props.col.Field}/元类型:{this.props.col.Type}
                </h3>

                <div className="formWrapper">
                    <LabelCfg col={this.props.col} />
                    <ColRenderCfg col={this.props.col} />
                    <PluginCfg col={this.props.col} />
                    <TableVisibleCfg col={this.props.col} />
                    <FormVisbleCfg col={this.props.col} />
                    <ReadOnlyCfg col={this.props.col} />
                    <CategeroyCfg col={this.props.col} />
                    <InitValueCfg col={this.props.col} />
                    <ValidateRuleCfg col={this.props.col} />
                </div>
                <div style={{ marginLeft: '386px', marginTop: '46px' }}>
                    <Button
                        disabled={this.props.col.Field == 'id'}
                        type="primary"
                        onClick={() => this.props.GridConfigStore.saveCfg(this.props.col.Field)}>
                        保存字段配置
                    </Button>
                </div>
            </div>
        );
    }
}
export default FieldPropertyRender;
