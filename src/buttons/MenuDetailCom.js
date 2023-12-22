import React, { useEffect } from 'react';
import { Table } from 'antd';
import { toJS } from 'mobx';
import ImgRender from '@/routes/NanxTable/NanxTableCom/cellRenders/ImgRender';
import { BsPerson } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';

const MenuDetailCom = inject('MenuItemStore')(
    observer((props) => {
        useEffect(() => {
            const asyncFun = async () => {
                let params = { data: { menu_id: props.menuID } };

                let res = await api.permission.getRolesByMenuId(params);
                props.MenuItemStore.setRoleList(res.data);

                let res2 = await api.permission.getUsersByMenuId(params);
                props.MenuItemStore.setUserList(res2.data);
                console.log('res2: ', res2);

                await props.MenuItemStore.getCombinedArray();
            };
            asyncFun();
        }, [props.menuID, props.MenuItemStore]);

        const URRender = (text, idx) => {
            if (text == '角色') {
                return (
                    <div key={idx} style={{ verticalAlign: 'middle', display: 'flex' }}>
                        <BsPeople style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                        <div style={{ fontWeight: 'bold' }}> {text}</div>
                    </div>
                );
            }
            if (text == '用户') {
                return (
                    <div key={idx} style={{ verticalAlign: 'middle', display: 'flex' }}>
                        <BsPerson style={{ marginRight: '4px', fontSize: '18px', color: 'black' }} />
                        <div> {text}</div>
                    </div>
                );
            }
        };

        const columns = [
            {
                title: '类型',
                dataIndex: 'type',
                render: (text) => {
                    return URRender(text);
                }
            },
            {
                title: 'name',
                dataIndex: 'name'
            },
            {
                title: 'code',
                dataIndex: 'code'
            },
            {
                title: 'avatar',
                dataIndex: 'avatar',
                render: (text) => {
                    return ImgRender(text);
                }
            }
        ];

        return (
            <div>
                <Table
                    size="small"
                    rowKey={(row) => row.name}
                    pagination={false}
                    columns={columns}
                    dataSource={toJS(props.MenuItemStore.combinedArray)}></Table>
            </div>
        );
    })
);

export default MenuDetailCom;
