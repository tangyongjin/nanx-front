import React from 'react';
import { inject, observer } from 'mobx-react';
import api from '@/api/api';
import SearchTree from '@/routes/system/containers/searchTree';
@inject('MenuStore')
@observer
export default class UserManage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: []
        };
    }

    async getFirstNode() {
        const params = {
            data: {
                category_to_use: 'sinnet',
                value: 'sinnet',
                node: '1'
            },
            method: 'POST'
        };
        const res = await api.cabinet_api.getCabinetData(params);

        this.setState({
            dataList: res.server_resp
        });
    }

    async onClickTreeNode(treeNode) {
        console.log(treeNode);
    }

    async loadData(treeNode) {
        console.log(treeNode);
        const params = {
            data: {
                category_to_use: treeNode.props.dataRef.category,
                value: treeNode.props.dataRef.value,
                node: 'node-' + treeNode.props.dataRef.value
            },
            method: 'POST'
        };
        const res = await api.cabinet_api.getCabinetData(params);
        treeNode.props.dataRef.children = [...res.server_resp];
        this.setState({
            dataList: this.state.dataList
        });
    }

    getTreeProps() {
        return {
            loadData: this.loadData.bind(this),
            dataList: this.state.dataList,
            getFirstNode: this.getFirstNode.bind(this),
            onSelect: this.onClickTreeNode.bind(this),
            multiple: false,
            treeKey: 'id_value',
            treeTitle: 'text',
            className: 'deptBox'
        };
    }

    render() {
        const treeProps = this.getTreeProps();
        return (
            <div className="custServiceContent">
                <SearchTree {...treeProps}></SearchTree>
            </div>
        );
    }
}
