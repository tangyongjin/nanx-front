import React from 'react';

export default class ComB extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    init() {
        console.log('bbbbbbbbbb');
    }

    render() {
        return <div>ComB</div>;
    }
}
