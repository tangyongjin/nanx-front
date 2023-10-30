import React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';

@inject('NavigationStore')
@observer
export default class Hamburger extends React.Component {
    constructor(props) {
        super();
        this.NavigationStore = props.NavigationStore;
    }

    render() {
        return (
            <div className="trigger_box" style={{ marginTop: '7px' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-align-justify"
                    onClick={this.NavigationStore.toggleCollapse}>
                    <line x1="21" y1="10" x2="3" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="21" y1="18" x2="3" y2="18"></line>
                </svg>
            </div>
        );
    }
}
