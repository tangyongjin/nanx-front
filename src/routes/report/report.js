import React from 'react';

export default class report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stepsEnabled: true,
            initialStep: 0,
            hintsEnabled: true
        };
    }

    render() {
        return <div style={{ margin: '20px', height: '100%' }}>汇总报表</div>;
    }
}
