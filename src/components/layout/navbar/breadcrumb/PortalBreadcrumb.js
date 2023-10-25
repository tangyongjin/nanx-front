import React from 'react';
import { Breadcrumb } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('navigationStore')
@observer
export default class PortalBreadcrumb extends React.Component {
    render() {
        if (!this.props.navigationStore.breadcrumb) {
            return null;
        }

        console.log(this.props.navigationStore);
        return (
            <Breadcrumb
                key={this.props.navigationStore.animationKey + 'breadcrumb'}
                separator=">"
                className="portal_bread_crumb">
                {this.props.navigationStore.breadcrumb.map((item, index) => {
                    return <Breadcrumb.Item key={index}>{item.text}</Breadcrumb.Item>;
                })}
            </Breadcrumb>
        );
    }
}
