import React from 'react';
import { Breadcrumb } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('NavigationStore')
@observer
export default class PortalBreadcrumb extends React.Component {
    render() {
        if (!this.props.NavigationStore.breadcrumb) {
            return null;
        }

        return (
            <Breadcrumb
                key={this.props.NavigationStore.animationKey + 'breadcrumb'}
                separator=">"
                className="portal_bread_crumb">
                {this.props.NavigationStore.breadcrumb.map((item, index) => {
                    return <Breadcrumb.Item key={index}>{item.text}</Breadcrumb.Item>;
                })}
            </Breadcrumb>
        );
    }
}
