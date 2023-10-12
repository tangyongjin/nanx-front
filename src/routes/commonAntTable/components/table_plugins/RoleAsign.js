import React from 'react';
import { Modal, message, Checkbox } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import pmStore from '@/store/pmStore';

import { toJS } from 'mobx';
const CheckboxGroup = Checkbox.Group;

@observer
export default class RoleAsign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            current_field: null,
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            nodeNames: []
        };
        this.init = this.init.bind(this);
    }

    init() {
        if (this.props.commonTableStore.selectedRows.length == 1) {
            this.setState({
                checkedList: [],
                visible: true
            });
            pmStore.getAllRoles();
            this.getUserRoles();
        } else {
            message.error('请选择一个用户');
        }
    }

    onCancel() {
        this.setState({
            visible: false
        });
    }
    // 获取用户角色
    async getUserRoles() {
        console.log(1235, this.props.commonTableStore.selectedRows);
        let params = { data: { id: this.props.commonTableStore.selectedRows[0].id }, method: 'POST' };
        let res = await api.user.getUserRoles(params);
        if (res.code == 200) {
            var arr = [];
            for (var i = 0; i < res.data.length; i++) {
                arr.push(Object.values(res.data[i])[0]);
            }
            console.log(arr);
            this.setState({
                checkedList: arr
            });
        }
    }

    //保存节点的配置信息.

    async SaveHandler() {
        let _row = toJS(this.props.commonTableStore.selectedRows[0]);
        let cfgobj = {
            userid: _row.id,
            roles: this.state.checkedList
        };

        let params = { data: { ...cfgobj }, method: 'POST' };
        let res = await api.user.saveRoleAsign(params);
        if (res.code == 200) {
            message.success(res.message, 0.5);
            this.onCancel();
        }
    }

    onChange = (checkedList) => {
        this.setState(
            {
                checkedList,
                indeterminate: !!checkedList.length && checkedList.length < this.state.nodeNames.length,
                checkAll: checkedList.length === this.state.nodeNames.length
            },
            () => {
                console.log(this.state.checkedList);
            }
        );
    };

    onCheckAllChange = (e) => {
        let nodeNames = this.getAllCheckedValue();

        this.setState({
            checkedList: e.target.checked ? nodeNames : [],
            indeterminate: false,
            checkAll: e.target.checked
        });
    };

    getAllCheckedValue() {
        return pmStore.AllNodeName.map((item) => item.id);
    }

    render() {
        console.log(pmStore);
        console.log(this.props.commonTableStore);

        let { selectedRows } = this.props.commonTableStore;

        let allroles = pmStore.roleList;
        // console.log(898,allroles)

        return (
            <Modal
                visible={this.state.visible}
                onCancel={() => this.onCancel()}
                onOk={() => this.SaveHandler()}
                style={{ width: '400px' }}
                title="用户角色分配">
                <div>
                    <br />
                    <br />
                    <CheckboxGroup value={this.state.checkedList} onChange={this.onChange}>
                        {allroles
                            ? allroles.map((item, index) => {
                                  return (
                                      <Checkbox
                                          style={{ width: '180px', marginLeft: '10px' }}
                                          key={index}
                                          value={item.role_code}>
                                          {item.role_name}
                                      </Checkbox>
                                  );
                              })
                            : null}
                    </CheckboxGroup>
                </div>
            </Modal>
        );
    }
}
