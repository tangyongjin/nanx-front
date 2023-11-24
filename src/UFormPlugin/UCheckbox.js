import React from 'react';
import { Checkbox } from 'antd';
export default class UCheckBox extends React.Component {
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
        let selectedListStr = e.join(',');
        this.props.onChange(selectedListStr);
    }
    render() {
        const selectedvalue = this.props.value ? this.props.value.split(',') : [];
        return (
            <div style={{ marginBottom: '10px' }}>
                {this.state.checkboxList.length > 0 ? (
                    <Checkbox.Group value={selectedvalue} onChange={this.onChange}>
                        {this.state.checkboxList.map((item, index) => {
                            return (
                                <Checkbox style={{ display: 'block', margin: '0px' }} key={index} value={item}>
                                    {item}
                                </Checkbox>
                            );
                        })}
                    </Checkbox.Group>
                ) : null}
            </div>
        );
    }
}
