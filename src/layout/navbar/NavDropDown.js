import { Dropdown, Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import React from 'react';
import LoginService from '@/routes/login/LoginService';
import { port, root_url } from '@/api/api_config/base_config';
const avatarRoot = `${root_url}:${port}/`;
const { confirm } = Modal;

@inject('MenuStore')
@observer
export default class NavDropDown extends React.Component {
    constructor(props) {
        super(props);
        console.log('NavDropDown>props: ', props);
        this.LoginService = new LoginService();
    }

    logout = async () => {
        await this.LoginService.logout();
        this.props.MenuStore.history.push('/login');
    };

    showConfirm() {
        confirm({
            content: <h4>您确定要退出系统么？</h4>,
            onOk: () => this.logout(),
            cancelText: '取消',
            okText: '确定',
            okButtonProps: {
                type: 'primary',
                style: { color: 'green', backgroundColor: '#070707', borderColor: '#343c41' }
            },
            cancelButtonProps: {
                danger: true
            }
        });
    }

    render() {
        const onClick = ({ key }) => {
            if (key == 2) {
                this.showConfirm();
            }
        };

        const items = [
            {
                label: '退出登录',
                key: '2'
            }
        ];

        return (
            <div style={{ width: '190px', cursor: 'pointer' }}>
                <Dropdown
                    trigger={['click']}
                    menu={{
                        items,
                        onClick
                    }}>
                    <div>
                        <span className="nanx-role">
                            {sessionStorage.getItem('staff_name') + ' / ' + sessionStorage.getItem('role_name')}
                        </span>
                        <img
                            alt="head"
                            style={{
                                width: '36px',
                                borderRadius: '5px',
                                maxHeight: '36px',
                                verticalAlign: 'middle'
                            }}
                            src={avatarRoot + JSON.parse(sessionStorage.getItem('userInfo')).head_portrait}
                        />
                    </div>
                </Dropdown>
            </div>
        );
    }
}
