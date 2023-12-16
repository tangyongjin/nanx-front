import React from 'react';
import { Button } from 'antd';
import EditCom from './EditCom';
import IconWrapper from '@/utils/IconWrapper';

export default class BtnEditor extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    init = async () => {
        let ReactComp2 = new EditCom();

        console.log('reactComp: ', ReactComp2);
        ReactComp2.init();
        // let reactComp = <EditCom NanxTableStore={this.props.NanxTableStore} />;
        const reactComp = (props) => <EditCom {...props} NanxTableStore="AAA" />;
        // const ObservedComponent = inject('tbStore')(observer(props => <Component {...props} icon={icon} />));
        this.props.NanxTableStore.setModalContent(reactComp);
        this.props.NanxTableStore.showButtonModal();
    };

    render() {
        return (
            <Button type="primary" onClick={this.init} icon={IconWrapper(this.props.icon)}>
                Edit
            </Button>
        );
    }
}
