import React from 'react';
import { hashHistory } from 'react-router';

export default class Blank extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }
    componentDidMount() {
        hashHistory.push({
            pathname: this.props.location.state.router,
            state: {}
        });
    }
    render() {
        return <div>111</div>;
    }
}
