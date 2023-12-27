import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { pagination, rowSelection } from './tableUtils/tableUtil';
import _NanxTableStore from '@/store/NanxTBS';
import _NanxFormStore from '@/store/NanxFormStore';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TableModal from './TableModal';
import ButtonArray from '@/buttons/ButtonArray';

const NanxTable = observer((props) => {
    console.log('NanxTable 渲染🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡');
    const [done, setDone] = useState(false);
    const _tbStore = new _NanxTableStore();
    const _modalStore = new _NanxFormStore();

    const [tbStore] = useState(_tbStore);
    const [modalStore] = useState(_modalStore);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(props.location.search);
            const datagridCode = params.get('datagrid_code');
            await tbStore.setDataGridCode(datagridCode);
            await refreshTable();
        };

        fetchData();

        // Cleanup function if needed
        return () => {
            // Cleanup logic
        };
    }, []); // Add dependencies if needed

    const refreshTable = async () => {
        setDone(false);
        await tbStore.resetTableStore();
        await tbStore.fetchDataGridCfg();
        await tbStore.setLazyComponent();
        await tbStore.listData('from refreshTable');
        setDone(true);
    };

    const onRowHandler = (record) => {
        return {
            onClick: async () => {
                tbStore.rowSelectChange([record.id], [record]);
            }
        };
    };

    return done ? (
        <div className="table_wrapper">
            <MemoizedButtonArray NanxTableStore={tbStore} ModalStore={modalStore} />
            <Table
                size="small"
                bordered={true}
                rowKey={(record) => record.id}
                columns={tbStore.tableColumns}
                key={tbStore.datagrid_code}
                dataSource={tbStore.dataSource}
                onChange={tbStore.TableOnChange}
                pagination={pagination(tbStore)}
                rowSelection={rowSelection(tbStore)}
                onRow={onRowHandler}
            />
            <MemoizedModal tbStore={tbStore} modalStore={modalStore} />
        </div>
    ) : (
        <div className="table_wrapper">
            <Spin
                indicator={
                    <LoadingOutlined
                        id="tableloadingSpin"
                        style={{
                            display: 'blcok',
                            color: '#225e04',
                            fontSize: 25
                        }}
                        spin
                    />
                }
            />
        </div>
    );
});

const MemoizedButtonArray = React.memo((props) => (
    <ButtonArray NanxTableStore={props.NanxTableStore} ModalStore={props.ModalStore} />
));

const MemoizedModal = React.memo((props) => <TableModal tbStore={props.tbStore} modalStore={props.modalStore} />);

export default NanxTable;
