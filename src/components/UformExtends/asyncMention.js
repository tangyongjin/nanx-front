import React from 'react';
import { registerFormField, connect } from '@uform/react';
import { Mentions, Select } from 'antd';

import debounce from 'lodash/debounce';
const { Option } = Select;

class AsyncMention extends React.Component {
    constructor() {
        super();

        this.loadGithubUsers = debounce(this.loadGithubUsers, 800);
    }

    state = {
        search: '',
        loading: false,
        users: []
    };

    onSearch = (search) => {
        this.setState({ search, loading: !!search, users: [] });

        this.loadGithubUsers(search);
    };

    onSelect = (optionProps, prefix) => {
        console.log(optionProps, prefix);
    };

    async loadGithubUsers(key) {
        if (!key) {
            this.setState({
                users: []
            });
            return;
        }

        let params = { data: { searchKey: key }, method: 'POST' };
        let res = await this.props.mentionListApi(params);

        if (res.code != 200) return;

        const { search } = this.state;

        if (search !== key) return;

        this.setState({
            users: res.data.slice(0, 10),
            loading: false
        });
    }

    onChange = (text) => {
        console.log(text, 'onchange');
    };

    validateSearch = (text, props) => {
        console.log('validateSearch', text, props);
    };

    render() {
        console.log(this.state.users);
        return (
            <Mentions
                style={{ width: '100%' }}
                loading={this.state.loading}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
                onChange={this.onChange}
                // validateSearch={this.validateSearch}
            >
                {this.state.users.length == 0
                    ? null
                    : this.state.users.map((item, index) => (
                          <Option
                              key={index}
                              userid={item.id}
                              children={item.id}
                              value={item.staff_name}
                              className="antd-demo-dynamic-option">
                              {item.staff_name + `(${item.department})`}
                          </Option>
                      ))}
            </Mentions>
        );
    }
}

registerFormField(
    'asyncMention',
    connect()((props) => <AsyncMention {...props} />)
);
