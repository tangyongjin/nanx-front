import { inject, observer } from 'mobx-react';
import { PicLeftOutlined } from '@ant-design/icons';
import React from 'react';
import LoadingGif from '@/styles/loading.gif';
// import LoadingGif from '@/styles/icons8-spinning-circle.gif';

import NavDropDown from './NavDropDown';

@inject('NavigationStore', 'NanxTableStore')
@observer
export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.NavigationStore = props.NavigationStore;
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', height: '80px' }}>
                <div id="navbar_collapse_bread">
                    <div style={{ flex: '10%', width: '40px' }}>
                        <PicLeftOutlined
                            onClick={this.NavigationStore.toggleCollapse}
                            style={{ paddingLeft: '15px', fontSize: '16px', color: '#225e04' }}
                        />
                    </div>
                    <div style={{ flex: '90%', textAlign: 'left', color: '#1c4308' }}>
                        <span>{this.NavigationStore.breadcrumb}</span>
                    </div>
                </div>
                <div id="navbar_preloader">
                    <img src={LoadingGif} alt="loading" />
                </div>
                <div id="navbar_dropdown">
                    <NavDropDown />
                </div>
            </div>
        );
    }
}
