import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { pagination, rowSelection } from './tableUtils/tableUtil';
import _NanxTableStore from '@/store/NanxTableStore';
import _NanxFormStore from '@/store/NanxFormStore';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TableModal from './TableModal';
import ButtonArray from '@/buttons/ButtonArray';

const NanxTable = observer((props) => {
    console.log('NanxTable 渲染🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡', props);

    const _tbStore = new _NanxTableStore();
    const _modalStore = new _NanxFormStore();
    const [NanxTableStore] = useState(_tbStore);
    const [ModalStore] = useState(_modalStore);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(props.location.search);
            const datagridCode = params.get('datagrid_code');
            await refreshTable(datagridCode);
        };

        fetchData();

        // Cleanup function if needed
        return () => {
            // Cleanup logic
        };
    }, []); // Add dependencies if needed

    const refreshTable = async (datagridCode) => {
        console.log(' refreshTable >>> 👻❤️‍🩹👻❤️‍🩹👻❤️‍🩹👻❤️‍🩹👻❤️‍🩹');
        await NanxTableStore.resetTableStore();
        await NanxTableStore.setDataGridCode(datagridCode);
        await NanxTableStore.fetchDataGridCfg();
        await NanxTableStore.listData('from NanxTable');
        await NanxTableStore.setInitDone(true);

        // setDone(true);
    };

    const onRowHandler = (record) => {
        return {
            onClick: async () => {
                NanxTableStore.rowSelectChange([record.id], [record]);
            }
        };
    };

    return NanxTableStore.initDone ? (
        <div className="table_wrapper">
            <MemoizedButtonArray NanxTableStore={NanxTableStore} ModalStore={ModalStore} />
            <Table
                size="small"
                bordered={true}
                rowKey={(record) => record.id}
                columns={NanxTableStore.tableColumns}
                key={NanxTableStore.datagrid_code}
                dataSource={NanxTableStore.dataSource}
                onChange={NanxTableStore.TableOnChange}
                pagination={pagination(NanxTableStore)}
                rowSelection={rowSelection(NanxTableStore)}
                onRow={onRowHandler}
            />
            <MemoizedModal NanxTableStore={NanxTableStore} ModalStore={ModalStore} />
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

const MemoizedModal = React.memo((props) => (
    <TableModal NanxTableStore={props.NanxTableStore} ModalStore={props.ModalStore} />
));

// export default NanxTable;

// export default React.memo(NanxTable);

function shouldComponentUpdate(prevProps, nextProps) {
    // 在这里，你可以添加你的比较逻辑
    // 这个函数应该返回true如果前后两个props相等（即，不应该重新渲染）
    // 或者返回false如果前后两个props不相等（即，应该重新渲染）

    // if (prevProps.location.search == nextProps.location.search) {
    //     console.log('比较逻辑💜💜💜💜💜💜💜💜💜💜 ==========');
    //     return true;
    // } else {
    //     console.log('比较逻辑💜💜💜💜💜💜💜💜💜💜 <><><><><><>');
    //     return false;
    // }
    return true;
}

// export default React.memo(NanxTable, shouldComponentUpdate);
export default React.memo(NanxTable, shouldComponentUpdate);
