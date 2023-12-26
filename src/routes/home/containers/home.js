import React from 'react';
import { observer } from 'mobx-react';
import { withStore } from '@/store/StoreHelpers';

@withStore
@observer
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log('Home->props: ', props.stores);
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}
