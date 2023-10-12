import React from 'react';
import { List, Card } from 'antd';
import api from '@/api/api';
import SearchTree from '@/components/antdComponents/searchTree';

export default class DepartmentManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            orgOriginData: [],
            userList: [],
            top: 10
        };
    }

    async getFirstNode() {
        let res = await api.organization.orgTree();

        this.setState({
            orgOriginData: res,
            dataList: res
        });
    }

    async onClickTreeNode(dept_ids) {
        if (dept_ids.length == 0) {
            return;
        }
        let params = {
            data: {
                deptid: dept_ids[0]
            },
            method: 'POST'
        };
        let res = await api.organization.getDeptMembers(params);

        console.log(res);
        this.setState({
            userList: res
        });
    }

    getTreeProps() {
        return {
            dataList: this.state.dataList,
            getFirstNode: this.getFirstNode.bind(this),
            onSelect: this.onClickTreeNode.bind(this),
            multiple: false,
            treeKey: 'dept_id',
            treeTitle: 'dept_name',
            className: 'deptBox'
        };
    }

    render() {
        let treeProps = this.getTreeProps();
        return (
            <div className="orgnizationWrapper" style={{ overflow: 'hidden', padding: '20px', position: 'relative' }}>
                <div className="deptTreeBox" style={{ float: 'left', width: '30%', marginRight: '20px' }}>
                    <SearchTree {...treeProps}></SearchTree>
                </div>
                <div
                    className="userBox"
                    style={{
                        float: 'left',
                        width: '50%',
                        position: 'fixed',
                        marginLeft: '30%',
                        overflowY: 'auto',
                        height: '90%'
                    }}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 2,
                            sm: 2,
                            md: 8,
                            lg: 8,
                            xl: 4,
                            xxl: 3,
                            column: 4
                        }}
                        dataSource={this.state.userList}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={item.user}>{item.username}</Card>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }
}
