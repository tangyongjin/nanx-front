import React from 'react'
import classnames from 'classnames'
import { Input, Button } from 'antd'
import api from '@/api/api'
export class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customerLists: [],
            isShowSelect: false
        }

        this._choiceOption = this._choiceOption.bind(this);
        this._searchCustomer = this._searchCustomer.bind(this);

        this.searchInput = null;
        this.setTextInputRef = element => {//回调式ref创建
            this.searchInput = element;
        };
    }

    componentDidMount() {
        this.searchInput.value = this.props.customerName;
    }

    shouldComponentUpdate() {
        return true;
    }

    async _choiceOption(item, e) {
        this.searchInput.value = item.name;
        this.setState({ isShowSelect: false })
        await this.props.change('customerName', item.name)
        let params = {
            data: { companyKey: item.name },
            method: 'POST'
        }
        let res = await api.customer.inquiryCompanyMsg(params);
        this.props.addressHandle(res.data.data.address);
    }

    async _searchCustomer(e) {
        let params = {
            data: { companyKey: this.searchInput.value },
            method: 'POST'
        }
        let res = await api.customer.inquiryCompanyList(params);
        this.setState({
            customerLists: res.data.data.items,
            isShowSelect: true
        });
    }

    render() {
        let text_info = this.props.text_info;
        let customerLists = this.state.customerLists;
        let select_class = classnames({
            slideDown: this.state.isShowSelect,
            slideUp: !this.state.isShowSelect
        });

        return (
            <div className="form_value_node">
                <Input
                    className="search_input"
                    name="customerName"
                    ref={this.setTextInputRef}
                    style={{ width: '288px' }}
                />
                <Button className="search_btn"
                    type="primary"
                    htmlType="button"
                    onClick={(e) => this._searchCustomer(e)}>搜索</Button>

                <div className={classnames(['self_select', select_class])} >
                    {
                        customerLists.map((item) => {
                            return <div className="self_option" key={item.id}
                                onClick={this._choiceOption.bind(this, item)}>{item.name}</div>
                        })
                    }
                </div>
            </div>
        )
    }
}
