import React from 'react';
import { message, Button } from 'antd';
import AllocationMenu from './MenuAssign/allocationMenu';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import { ClusterOutlined } from '@ant-design/icons';

import IconRender from '@/routes/NanxTable/NanxTableCom/cellRenders/IconRender';

export default class MenuAssign extends React.Component {
    constructor(props) {
        super(props);
        this.NanxTableStore = props.NanxTableStore;
        this.state = {
            record: null,
            iconStr: null
        };
    }

    // eslint-disable-next-line
    async init(buttonSource) {
        this.setState({ iconStr: buttonSource.icon });
        if (this.props.NanxTableStore.selectedRows.length <= 0) {
            message.error('请选择一个角色');
            return;
        }

        let currentrow = this.props.NanxTableStore.selectedRows[0];

        this.props.NanxTableStore.showButtonModal();
        this.setState({ record: currentrow });
    }

    render() {
        return (
            <div>
                {this.state.record ? (
                    <CommonModal
                        title={
                            <div>
                                {IconRender(this.state.iconStr)}
                                分配菜单
                            </div>
                        }
                        width="1200px"
                        height="500px"
                        destroyOnClose={true}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleCancel}>
                                关闭
                            </Button>
                        ]}>
                        <AllocationMenu roleCode={this.state.record.role_code} />
                    </CommonModal>
                ) : null}
            </div>
        );
    }
}
