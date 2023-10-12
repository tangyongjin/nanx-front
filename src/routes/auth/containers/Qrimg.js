import React from 'react';

import { randomString } from '../../../utils/tools'

import AuthService from '../AuthService';
import { inject, observer } from 'mobx-react'
import api from '../../../api/api'
import * as QrCode from 'qrcode.react'


const divStyle = {
    'marginTop': '20px',
    'marginBottom': '30px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center'

}

const imgStyle = {
    width: '220px'
}

@inject('navigation')
@observer
export default class Qrimg extends React.Component {

    constructor(props) {
        super();



        this.state = {
            'qrurl': '?transaction_id=' + props.transaction_id + '&minilogin=' + api.auth.miniLogin,
            'transaction_id': props.transaction_id
        }
        this.Auth = new AuthService();
    }

    componentWillUnmount() {
        // clearInterval(this.interval);
    }



    render() {
        return (
            <div style={ divStyle }>
                <QrCode value={ this.state.qrurl } size={ 220 } />
            </div>
        )
    }


}
