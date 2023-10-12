import React from 'react';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import api from '@/api/api';

@inject('permissionManageStore')
@observer
export default class Dev2online extends React.Component {
    componentDidMount() {}

    async synchro() {
        let data = {};
        let params = { data: data, method: 'POST' };
        let res = await api.activity.syncAllconfig(params);
        if (res.code == 200) {
        }
    }

    render() {
        return (
            <div className="custServiceContent">
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Button style={{ marginTop: '25%' }} type="primary" onClick={(e) => this.synchro()}>
                        同步
                    </Button>
                </div>
            </div>
        );
    }
}
