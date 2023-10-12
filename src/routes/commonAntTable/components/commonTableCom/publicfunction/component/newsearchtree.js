// 现在没有用到，  以后备用
import React from 'react'
import { Tree, Input } from 'antd';

const { TreeNode } = Tree;
const { Search } = Input;

export default class SearchTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expandedKeys: [],
            searchValue: '',
            autoExpandParent: true,
        }
        this.renderTreeNodes = this.renderTreeNodes.bind(this)
    }
    componentDidMount() {
        this.props.getFirstNode();
    }

    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (this.getParentKey(key, node.children)) {
                    parentKey = this.getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    }
    nodeClick(){
        console.log(888,'node')
    }
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode key={item.value} title={item.text} onClick={this.nodeClick} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.value} title={item.text} dataRef={item} />;
        });

    getDefaultPropsHandler() {

        const { expandedKeys, autoExpandParent } = this.state;
        let treeDefaultProps = {
            showLine: true,
            onExpand: this.onExpand,
            expandedKeys: expandedKeys,
            autoExpandParent: autoExpandParent,
            multiple: this.props.multiple ? true : false
        }

        if (this.props.loadData) {
            treeDefaultProps.loadData = this.props.loadData
        }
        if(this.props.onSelect){
            treeDefaultProps.onSelect = this.props.onSelect
        }
        return treeDefaultProps;
    }

    render() {

        return (
            <div>
                {/* <Search style={{ marginBottom: 8 }} placeholder="搜索" onChange={this.onChange} /> */}
                <Tree {...this.getDefaultPropsHandler()}>
                    {this.renderTreeNodes(this.props.dataList)}
                </Tree>
            </div>
        );
    }
}
