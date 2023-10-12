import React from 'react';

export default class Brokenline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{ height: '50%' }}>
                <div id="line" style={{ width: '100%', height: '100%' }}></div>
            </div>
        );
    }
}
