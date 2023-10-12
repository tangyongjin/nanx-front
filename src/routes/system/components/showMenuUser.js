import { observable, action } from 'mobx';
import React from 'react';
import { Modal, Card, Icon, Tabs } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';

class ShowUserRoleStore {
    @observable userList = [];
    @observable isEnd = false;
    @observable page = 1;
    @observable activeKey = '1';

    @action setUserList = (isFresh, data) => (this.userList = isFresh ? data : [...this.userList, ...data]);
    @action setIsEnd = (isEnd) => (this.isEnd = isEnd);
    @action addPage = () => (this.page = this.page + 1);
    @action initPage = () => (this.page = 1);

    @action setActiveKey = (activeKey) => (this.activeKey = activeKey);
}

const { Meta } = Card;
const { TabPane } = Tabs;
@observer
export default class showMenuUser extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;
        this.store = new ShowUserRoleStore();
    }

    state = {
        visible: false,
        record: {}
    };

    onCancelHandle() {
        this.setState({
            visible: false
        });
        this.getUserList(true);
    }

    showModal(text, record) {
        this.store.initPage();
        this.store.setActiveKey('1');
        this.setState(
            {
                visible: true,
                record
            },
            () => {
                this.getUserList(false);
            }
        );
    }

    onChangeTabPane = (activeKey) => {
        this.store.setActiveKey(activeKey);
        this.store.initPage();
        this.store.setIsEnd(false);
        this.getUserList(true);
    };

    getUserList = async (isFresh) => {
        if (JSON.stringify(this.state.record) === '{}') {
            return null;
        }

        let params = {
            data: {
                menu_id: this.state.record.key,
                currentPage: this.store.page,
                pagesize: 10
            },
            method: 'POST'
        };

        let res =
            this.store.activeKey == 1
                ? await api.permission.getRoleByMenuId(params)
                : await api.permission.getMenuIdAssosiedUsers(params);

        this.store.setUserList(isFresh, res.data);
        this.store.setIsEnd(res.data.length < 10 ? true : false);
    };

    getMoreUsers = () => {
        if (this.store.isEnd) {
            return;
        }
        this.store.addPage();
        this.getUserList(false);
    };

    getModalProps() {
        return {
            destroyOnClose: true,
            title: '详情',
            width: 1110,
            bodyStyle: {
                height: '600px',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '保存',
            visible: this.state.visible,
            onOk: this.onCancelHandle,
            onCancel: () => this.onCancelHandle()
        };
    }

    getUserOrRole() {
        if (!this.store || !this.store.userList || this.store.userList.length === 0) {
            return null;
        }

        if (this.store.activeKey == 1) {
            // role
            return this.store.userList.map((role) => {
                return (
                    <Card key={role.id} hoverable style={{ width: 240, float: 'left', margin: '10px' }}>
                        <Meta title={role.role_code} description={role.role_name} />
                    </Card>
                );
            });
        }

        return this.store.userList.map((user) => {
            // user
            return (
                <Card
                    key={user.id}
                    hoverable
                    style={{ width: 190, float: 'left', margin: '10px' }}
                    cover={
                        <img
                            style={{ width: '100px', height: '100px', margin: '0 auto' }}
                            alt="example"
                            src={user.head_portrait}
                        />
                    }>
                    <Meta title={user.staff_name} description={user.dept_name} />
                    <div>{user.role_name}</div>
                </Card>
            );
        });
    }

    getTabContent = () => {
        return (
            <div>
                <div style={{ overflow: 'hidden' }}>{this.getUserOrRole()}</div>

                <div style={{ textAlign: 'center' }}>
                    {this.store.isEnd || <Icon type="more" style={{ fontSize: '24px' }} onClick={this.getMoreUsers} />}
                </div>
            </div>
        );
    };

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <Tabs activeKey={this.store.activeKey} onChange={this.onChangeTabPane}>
                    <TabPane
                        tab={
                            <span>
                                {' '}
                                <Icon type="user" /> 角色{' '}
                            </span>
                        }
                        key="1">
                        {this.getTabContent()}
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                {' '}
                                <Icon type="android" /> 人员{' '}
                            </span>
                        }
                        key="2">
                        {this.getTabContent()}
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }
}
