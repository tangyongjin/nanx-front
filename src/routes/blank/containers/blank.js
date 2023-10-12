import React from 'react';
import { hashHistory } from 'react-router';

export default class Blank extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log(7658, this.props);

        hashHistory.push({
            pathname: this.props.location.state.router,
            state: {
                datagrid_code: this.props.location.state.datagrid_code,
                menu_code: this.props.location.state.menu
            }
        });
    }
    render() {
        return <div>111</div>;
    }
}
