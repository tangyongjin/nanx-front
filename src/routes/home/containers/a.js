import React from 'react';
export default class ComA extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    init() {
        console.log('initAAAAAAAAAAAAA');
    }

    render() {
        return <div>Coma</div>;
    }
}
