import React from 'react';
import { inject, observer } from 'mobx-react';
import '../privilige.scss';
import { Menu, Icon } from 'antd';
import api from '@/api/api';

@inject('permissionManageStore')
@observer
export default class AllocationMenu extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.store = props.permissionManageStore;
        console.log(this.store);
    }

    state = { menulist: [] };

    async componentDidMount() {
        console.log(this.store.currentRole.role_code);

        let params = {
            data: {
                role_code: this.store.currentRole.role_code
            },
            method: 'POST'
        };
        let res = await api.permission.getMenuList(params);

        this.setState({ menulist: res.data.menuList });
    }

    getChildren(menuitem, index) {
        let one = menuitem;
        if (!one.children) {
            one.children = [];
        }

        return one.children.length === 0 ? (
            <Menu.Item key={menuitem.key}>
                {one.icon ? <Icon type={one.icon} /> : null}

                <span title={one.text}>{one.text}</span>
            </Menu.Item>
        ) : (
            <Menu.SubMenu
                key={menuitem.key}
                title={
                    <span>
                        <Icon type={one.icon} />
                        <span title={one.text}>{one.text}</span>
                    </span>
                }>
                {one.children.map((xitem, itemIndex) => this.getChildren(xitem, itemIndex))}
            </Menu.SubMenu>
        );
    }

    render() {
        return (
            <div className="menuWrapper_inner">
                <h3>
                    {this.store.currentRole.role_code} /{this.store.currentRole.role_name}
                </h3>
                {this.state.menulist ? (
                    <Menu mode="inline" theme="light">
                        {this.state.menulist.map((menuitem, index) => this.getChildren(menuitem, index))}
                    </Menu>
                ) : null}
            </div>
        );
    }
}
