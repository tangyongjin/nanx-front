import decode from 'jwt-decode';
import { hashHistory } from "react-router";
import api from '../../api/api'
import navigationStore from '../../store/navigationStore'
import userStore from '../../store/userStore'
import AuthService from './AuthService';
import { inject, observer } from 'mobx-react'



export default class WsService {
    constructor() {
        this.Auth = new AuthService();

    }

    wsinit(transaction_id) {

         
    }



}
