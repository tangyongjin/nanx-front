import React from 'react';
import { observer, inject } from 'mobx-react'; // Moved these decorators to the end

class LazyB extends React.Component {
    constructor(props) {
        console.log('props: ', props);
        super(props);
    }

    render() {
        return <div>bbb</div>;
    }
}

const WrappedGridFieldMnt = inject('GridConfigStore')(observer(LazyB));
export default WrappedGridFieldMnt;
