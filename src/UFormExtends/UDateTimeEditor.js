import React from 'react';
import { DatePicker } from 'antd';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD hh:mm:ss';

export default class UDateTimeEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log('UDateTimeEditor', props);
        this.state = {
            datevalue: props.d_value ? props.d_value : null
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
        return (
            <div>
                <DatePicker
                    style={{ width: '258px' }}
                    showTime
                    onChange={(e, ds) => {
                        this.props.onChange(ds);
                    }}
                    defaultValue={this.state.datevalue ? dayjs(this.state.datevalue, dateFormat) : null}
                    locale={locale}
                    format={dateFormat}
                />
            </div>
        );
    }
}
