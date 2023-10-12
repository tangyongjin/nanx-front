import React from 'react'
import { Breadcrumb } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { inject, observer } from 'mobx-react'


@inject('navigation')
@observer
export default class PortalBreadcrumb extends React.Component {
    constructor(props) {
        super(props);
        //
        console.log('navigation------PortalBreadcrumb3333------------')

        console.log(props)
    }


    render() {

        if (!this.props.navigation.breadcrumb) {
            return null
        }

        console.log(this.props.navigation)
        return (
            <Breadcrumb key={ this.props.navigation.animationKey + 'breadcrumb' } separator=">" className="portal_bread_crumb">
                {
                    this.props.navigation.breadcrumb.map((item, index) => {
                        return <Breadcrumb.Item key={ index }>
                            { item.text }
                        </Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        )
    }
}