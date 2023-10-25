import React from 'react';
import { inject, observer } from 'mobx-react';

import { Icon } from 'antd';

@inject('navigationStore')
@observer
export default class Hamburger extends React.Component {
    constructor(props) {
        super();
        this.store = props.navigationStore;
    }

    render() {
        return (
            <div className="trigger_box">
                <Icon
                    size="30"
                    className="trigger"
                    type={this.store.isCollapse ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.store.toggleCollapse}
                />
            </div>
        );
    }
}
