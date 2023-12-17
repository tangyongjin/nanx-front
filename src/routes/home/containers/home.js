import React from 'react';
import ButtonArray from './ButtonArray';
import _NanxTableStore from '@/store/NanxTBS';

export default class NanxTable extends React.Component {
    constructor(props) {
        super(props);
        this.tbStore = new _NanxTableStore();
        console.log(this.tbStore);
    }

    render() {
        const buttons = [
            { buttontext: 'Button1', comPath: './a.js' },
            { buttontext: 'Button2', comPath: './b.js' }
        ];

        return (
            <div>
                <h1>Button Array</h1>
                <ButtonArray tbStore={this.tbStore} buttons={buttons} />
            </div>
        );
    }
}
