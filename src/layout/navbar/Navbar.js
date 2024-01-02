import { inject, observer } from 'mobx-react';
import { PicLeftOutlined } from '@ant-design/icons';
import React from 'react';
// import LoadingGif from '@/styles/loading.gif';
import NavDropDown from './NavDropDown';

import './loading.css';

@inject('MenuStore')
@observer
export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.MenuStore = props.MenuStore;
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', height: '80px' }}>
                <div id="navbar_collapse_bread">
                    <div style={{ flex: '10%', width: '40px' }}>
                        <PicLeftOutlined
                            onClick={this.MenuStore.toggleCollapse}
                            style={{ paddingLeft: '15px', fontSize: '16px', color: '#225e04' }}
                        />
                    </div>
                    <div style={{ flex: '90%', textAlign: 'left', color: '#1c4308' }}>
                        <span>{this.MenuStore.breadcrumb || '首页'}</span>
                    </div>
                </div>
                <div id="navbar_preloader">
                    {/* <img src={LoadingGif} alt="loading" /> */}
                    <div class="custom-loader"></div>
                </div>
                <div id="navbar_dropdown">
                    <NavDropDown history={this.props.history} />
                </div>
            </div>
        );
    }
}
