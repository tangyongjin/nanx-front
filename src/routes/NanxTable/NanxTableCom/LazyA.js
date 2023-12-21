import React from 'react';
import { observer, inject } from 'mobx-react'; // Moved these decorators to the end

class LazyA extends React.Component {
    constructor(props) {
        console.log('props: ', props);
        super(props);
        this.init = this.init.bind(this);
    }

    async init() {
        console.log(this.props);
        this.props.GridConfigStore.setCurrentDataGridCode('AAA');
        this.props.NanxTableStore.showButtonModal();
    }

    render() {
        return <div>aaa</div>;
    }
}

const WrappedGridFieldMnt = inject('GridConfigStore')(observer(LazyA));
export default WrappedGridFieldMnt;
