import React from 'react';
import { inject, observer } from 'mobx-react';
import '@/styles/privilige.scss';

@inject('permissionManageStore')
@observer
export default class LookUserByRole extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.permissionManageStore;
    }
    componentDidMount() {
        this.store.getUserByRole();
    }

    render() {
        return (
            <div className="custServiceContent">
                <div className="current_role_text_box"> 当前角色：{this.store.currentRole.role_name} </div>

                <div className="user_detail_wrapper">
                    <div className="user_row header_row">
                        <div className="user_col user_header">用户名</div>
                        <div className="user_col user_header">手机号</div>
                        <div className="user_col user_header">部门</div>
                    </div>
                    {this.store.userListHasRole.map((user) => {
                        return (
                            <div className="user_row" key={user.staff_name}>
                                <div className="user_col">{user.staff_name}</div>
                                <div className="user_col">{user.mobile}</div>
                                <div className="user_col">{user.department}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
