import React, { useState } from 'react';
import { Tree } from 'antd';
import { inject, observer } from 'mobx-react';
const { TreeNode } = Tree;

const PriviligeTransfer = inject('MenuStore')(
    observer((props) => {
        const [expandedKeys] = useState(props.AllMenuKeys);

        const AssingMenu = (e, menu) => {
            e.preventDefault();
            console.log('props: ', props.role_code, menu);
        };

        const DisAssingMenu = (e, menu) => {
            e.preventDefault();
            console.log('props: ', props.role_code, menu);
        };

        const TitleMessage = (menu) => {
            console.log('menuProps: ', menu);

            if (menu.nodeKeys.menu_level == 1 && menu.nodeKeys.children && menu.nodeKeys.children.length > 0) {
                return (
                    <div
                        style={{
                            width: '300px',
                            height: '30px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <div> {menu.title}</div>
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            width: '300px',
                            height: '30px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <div>{menu.title}</div>
                        <button
                            onClick={(e) => AssingMenu(e, menu.nodeKeys)}
                            className="btn-assign-menu"
                            style={{ marginLeft: 'auto', marginRight: '5px' }}>
                            分配
                        </button>
                        <button onClick={(e) => DisAssingMenu(e, menu.nodeKeys)} className="btn-cancel-menu">
                            取消
                        </button>
                    </div>
                );
            }
        };

        const getTreeNode = (data) => {
            if (data && data.length > 0) {
                return data.map((item) => {
                    if (item.children) {
                        return (
                            <TreeNode
                                disableCheckbox={true}
                                title={<TitleMessage title={item.title} nodeKeys={item} btnTxt={'bt'} />}
                                key={item.key}>
                                {getTreeNode(item.children)}
                            </TreeNode>
                        );
                    }
                    return (
                        <TreeNode
                            disableCheckbox={true}
                            title={<TitleMessage title={item.title} nodeKeys={item} btnTxt={'bt'} />}
                            key={item.key}
                        />
                    );
                });
            }
            return [];
        };

        return (
            <div
                style={{
                    overflowY: 'scroll',
                    paddingBottom: '6px',
                    height: '440px'
                }}>
                <Tree
                    checkable
                    selectable={false}
                    showLine={true}
                    expandedKeys={expandedKeys}
                    autoExpandParent={true}
                    checkedKeys={props.MenuStore.RoleUsedKeys}>
                    {getTreeNode(props.dataSource)}
                </Tree>
            </div>
        );
    })
);

export default PriviligeTransfer;
