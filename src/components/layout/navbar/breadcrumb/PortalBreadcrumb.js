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

        let breadItems = [];

        this.props.NavigationStore.breadcrumb.map((item) => {
            breadItems.push({ title: item.text });
        });

        return (
            <Breadcrumb
                style={{
                    margin: '16px 0'
                }}
                items={breadItems}
                key={this.props.NavigationStore.animationKey + 'breadcrumb'}></Breadcrumb>
        );
    }
}
