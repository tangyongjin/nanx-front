import React from 'react';
import { inject, observer } from 'mobx-react';
import TreeMenuEditer from './treeMenuEditer';
import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'antd';

@inject('MenuStore')
@observer
export default class AllocationMenu extends React.Component {
    constructor(props) {
        super(props);
        this.MenuStore = props.MenuStore;
    }

    async componentDidMount() {
        await this.MenuStore.getAllTreeMenuList();
        await this.MenuStore.getMenuTreeByTargetRoleCode(this.props.roleCode);
    }

    refreshMenuAssociated = async () => {
        await this.MenuStore.getMenuTreeByTargetRoleCode(this.props.roleCode);
    };

    render() {
        return (
            <div style={{ marginTop: '20px', height: '500px' }}>
                <div>
                    角色代码：{this.props.roleCode}
                    <Button
                        style={{ marginLeft: '10px' }}
                        onClick={this.refreshMenuAssociated}
                        size="small"
                        type="primary"
                        icon={<RedoOutlined style={{ color: '#08a742' }} />}>
                        刷新
                    </Button>
                </div>
                <br />
                {this.MenuStore.AllMenuList.length > 0 && (
                    <TreeMenuEditer
                        refreshMenuAssociated={this.refreshMenuAssociated}
                        role_code={this.props.roleCode}
                    />
                )}
            </div>
        );
    }
}
