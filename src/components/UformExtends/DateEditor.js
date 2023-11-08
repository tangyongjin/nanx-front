import React from 'react';
import { DatePicker } from 'antd';
// import moment from 'moment';
// import locale from 'antd/es/date-picker/locale/zh_CN';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

export default class DateEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log('DateEditor💘💘', props);
        this.state = {
            datevalue: props.d_value
        };
    }

    componentDidMount() {
        this.setState(
            {
                datevalue: this.props.d_value
            },
            () => {
                this.props.onChange(this.state.datevalue);
            }
        );
    }

    render() {
        const onChange = (date, dateString) => {
            console.log(date);
            console.log(dateString);
        };

        return (
            <DatePicker
                onChange={(e, ds) => {
                    this.props.onChange(ds);
                }}
                defaultValue={dayjs(this.state.datevalue, dateFormat)}
                locale={locale}
                format={dateFormat}
            />
        );
    }
}
