import React from 'react';
import { Input } from 'antd';
import { newformatDate } from '@/utils/tools';

export default class GetDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ''
        };
    }
    componentWillMount() {
        let date = newformatDate(new Date());
        this.setState(
            {
                date: date
            },
            () => {
                this.props.onChange(this.state.date);
            }
        );
    }

    onChange(e) {
        console.log(e);
    }

    render() {
        return (
            <Input
                disabled
                placeholder=""
                defaultValue={this.props.value}
                value={this.props.value != '' ? this.props.value : this.state.date}
                onChange={this.onChange}
            />
        );
    }
}
