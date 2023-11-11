import React from 'react';
import { Transfer, Tree } from 'antd';

const { TreeNode } = Tree;
export default class PriviligeTransfer extends React.Component {
    render() {
        let { dataSource, titles, targetKeys, selectedKeys, onChange, onSelectChange, operations, listStyle } =
            this.props;
        console.log(' 💓💓💓💓💓💓💓💓💓💓', selectedKeys);
        console.log(' 💌 💌 💌 💌 💌 💌 ', targetKeys);
        return (
            <Transfer
                dataSource={dataSource}
                titles={titles}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                operations={operations}
                listStyle={listStyle}
                render={(item) => item.text}>
                {({ direction, onItemSelect, selectedKeys }) => {
                    if (direction === 'left') {
                        const leftCheckedKeys = [...selectedKeys];

                        return (
                            <Tree
                                blockNode
                                checkable
                                checkStrictly
                                checkedKeys={leftCheckedKeys}
                                onCheck={(
                                    _,
                                    {
                                        node: {
                                            props: { eventKey }
                                        }
                                    }
                                ) => {
                                    onItemSelect(eventKey, !isChecked(leftCheckedKeys, eventKey));
                                }}
                                onSelect={(
                                    _,
                                    {
                                        node: {
                                            props: { eventKey }
                                        }
                                    }
                                ) => {
                                    console.log('onSelect>leftCheckedKeys:', leftCheckedKeys);
                                    console.log('onSelect>eventKey:', eventKey);
                                    onItemSelect(eventKey, !isChecked(leftCheckedKeys, eventKey));
                                }}>
                                {leftGenerateTree(dataSource, targetKeys)}
                            </Tree>
                        );
                    }
                    if (direction === 'right') {
                        const rightCheckedKeys = [...selectedKeys];
                        return (
                            <Tree
                                blockNode
                                checkable
                                checkStrictly
                                checkedKeys={rightCheckedKeys}
                                onCheck={(
                                    _,
                                    {
                                        node: {
                                            props: { eventKey }
                                        }
                                    }
                                ) => {
                                    onItemSelect(eventKey, !isChecked(rightCheckedKeys, eventKey));
                                }}
                                onSelect={(
                                    _,
                                    {
                                        node: {
                                            props: { eventKey }
                                        }
                                    }
                                ) => {
                                    onItemSelect(eventKey, !isChecked(rightCheckedKeys, eventKey));
                                }}>
                                {rightGenerateTree(dataSource, targetKeys)}
                            </Tree>
                        );
                    }
                }}
            </Transfer>
        );
    }
}

const leftGenerateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => (
        <TreeNode {...props} disabled={checkedKeys.includes(props.key)} key={props.key}>
            {leftGenerateTree(children, checkedKeys)}
        </TreeNode>
    ));
};

const rightGenerateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => (
        <TreeNode {...props} disabled={!checkedKeys.includes(props.key)} key={props.key}>
            {rightGenerateTree(children, checkedKeys)}
        </TreeNode>
    ));
};

const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
};
