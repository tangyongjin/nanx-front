import React from 'react';
import { Radio } from 'antd';
export default class GetRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxList: []
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.props.uform_para && this.props.uform_para.indexOf(',') != -1) {
            let arr = this.props.uform_para.split(',');
            this.setState({
                checkboxList: arr
            });
        } else {
            let arr = [];
            arr.push(this.props.uform_para);
            this.setState({
                checkboxList: arr
            });
        }
    }
    onChange(e) {
        this.props.onChange(e);
    }
    render() {
        console.log(4455, this.props);
        const selectedvalue = this.props.value;
        return (
            <div style={{ marginBottom: '10px' }}>
                {this.state.checkboxList.length > 0 ? (
                    <Radio.Group value={selectedvalue} onChange={this.onChange}>
                        {this.state.checkboxList.map((item, index) => {
                            return (
                                <Radio style={{ display: 'block', margin: '0px' }} key={index} value={item}>
                                    {item}
                                </Radio>
                            );
                        })}
                    </Radio.Group>
                ) : null}
            </div>
        );
    }
}
