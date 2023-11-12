import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { PicLeftOutlined } from '@ant-design/icons';
import React from 'react';
import LoginService from '@/routes/login/LoginService';
import LoadingGif from '@/styles/loading.gif';
// import LoadingGif from '@/styles/icons8-spinning-circle.gif';

import NavDropDown from './NavDropDown';

@inject('NavigationStore', 'NanxTableStore')
@observer
export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.NavigationStore = props.NavigationStore;
        this.LoginService = new LoginService();
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', height: '80px' }}>
                <div
                    style={{
                        width: '33.33%',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                    <div style={{ flex: '10%', width: '40px' }}>
                        <PicLeftOutlined
                            onClick={this.NavigationStore.toggleCollapse}
                            style={{ paddingLeft: '15px', fontSize: '16px', color: '#225e04' }}
                        />
                    </div>
                    <div style={{ flex: '90%', textAlign: 'left' }}>
                        <span>{toJS(this.NavigationStore).currentMenu.title}</span>
                    </div>
                </div>
                <div
                    id="preloader"
                    style={{
                        flex: 1,
                        width: '33.33%',
                        display: 'none',
                        textAlign: 'center'
                    }}>
                    <img src={LoadingGif} alt="loading" />
                </div>
                <div
                    style={{
                        flex: 1,
                        width: '33.33%',
                        textAlign: 'right',
                        display: 'flex',
                        paddingRight: '15px',
                        justifyContent: 'flex-end'
                    }}>
                    <div style={{ width: '190px', cursor: 'pointer' }}>
                        <NavDropDown />
                    </div>
                </div>
            </div>
        );
    }
}
