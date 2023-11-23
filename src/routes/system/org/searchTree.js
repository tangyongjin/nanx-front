// 现在没有用到，  以后备用
import React from 'react';
import { Tree, Input } from 'antd';

const { TreeNode } = Tree;
const { Search } = Input;
export default class SearchTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true
        };
        this.renderTreeNodes = this.renderTreeNodes.bind(this);
    }
    componentDidMount() {
        this.props.getFirstNode();
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    onChange = (e) => {
        const { value } = e.target;
        const expandedKeys = this.props.dataList
            .map((item) => {
                if (item[this.props.treeKey].indexOf(value) > -1) {
                    return this.getParentKey(item.key, this.props.dataList);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true
        });
    };

    getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.treeData) {
                if (node.treeData.some((item) => item.key === key)) {
                    parentKey = node.key;
                } else if (this.getParentKey(key, node.treeData)) {
                    parentKey = this.getParentKey(key, node.treeData);
                }
            }
        }
        return parentKey;
    };

    renderTreeNodes = (data) =>
        data.map((item) => {
            const index = item[this.props.treeTitle].indexOf(this.state.searchValue);
            const beforeStr = item[this.props.treeTitle].substr(0, index);
            const afterStr = item[this.props.treeTitle].substr(index + this.state.searchValue.length);
            const title =
                index > -1 ? (
                    <span>
                        {beforeStr}
                        <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
                        {afterStr}
                    </span>
                ) : (
                    <span>{item[this.props.treeTitle]}</span>
                );
            if (item.treeData) {
                return (
                    <TreeNode key={item[this.props.treeKey]} title={title}>
                        {this.renderTreeNodes(item.treeData)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item[this.props.treeKey]} title={title} dataRef={item} />;
        });

    getDefaultPropsHandler() {
        const { expandedKeys, autoExpandParent } = this.state;
        let treeDefaultProps = {
            showLine: true,
            onExpand: this.onExpand,
            expandedKeys: expandedKeys,
            autoExpandParent: autoExpandParent,
            multiple: this.props.multiple ? true : false
        };

        if (this.props.loadData) {
            treeDefaultProps.loadData = this.props.loadData;
        }
        if (this.props.onSelect) {
            treeDefaultProps.onSelect = this.props.onSelect;
        }
        return treeDefaultProps;
    }

    render() {
        return (
            <div>
                <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange} />
                <Tree {...this.getDefaultPropsHandler()}>{this.renderTreeNodes(this.props.dataList)}</Tree>
            </div>
        );
    }
}
