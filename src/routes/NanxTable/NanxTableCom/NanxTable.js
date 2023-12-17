import React from 'react';

import { Table, Button, Input } from 'antd';
import { observer, inject } from 'mobx-react';
import renderButtons from './renderButtons';
import { pagination, rowSelection } from './tableUtils/tableUtil';
import { randomString } from '@/utils/tools';
import _NanxTableStore from '@/store/NanxTBS';
import TableModal from './TableModal';
import ButtonArray from '@/buttons/ButtonArray';

// import DynamicComponentLoader from '@/buttons/DynamicComponentLoader';
import DynamicCom from '@/buttons/DynamicCom';

// import NanxTableStore from '@/store/NanxTableStore';
// const tbStore = new _NanxTableStore();

// @inject('tbStore')
@observer
export default class NanxTable extends React.Component {
    constructor(props) {
        super(props);
        this.tbStore = new _NanxTableStore();
        console.log(this.tbStore);
        this.state = {
            version: randomString(10)
        };

        this.xref = React.createRef();
    }

    async componentDidMount() {
        await this.tbStore.setDataGridCode(this.props.datagrid_code);
        await this.refreshTable();

        // 准备按钮数组
    }

    refreshTable = async () => {
        await this.tbStore.resetTableStore();
        await this.tbStore.fetchDataGridCfg();
        await this.tbStore.listData('from refreshTable');
    };

    afterEditRefresh = async () => {
        await this.tbStore.listData('edit');
    };

    afterDelteRefresh = async () => {
        await this.tbStore.listData('delete');
    };

    onRowHandler = (record) => {
        return {
            onClick: async () => {
                this.tbStore.rowSelectChange([record.id], [record]);
            }
        };
    };

    loadComponent = () => {
        // const dynamic = <Input ref={this.state.dynamicComponentRef} />;
        this.tbStore.setModalContent(<DynamicCom />);
        this.tbStore.showButtonModal();
    };

    render() {
        return (
            <div className="table_wrapper">
                <ButtonArray NanxTableStore={this.tbStore} buttons={this.tbStore.tableButtons} />
                <Table
                    size="small"
                    bordered={true}
                    rowKey={(record) => record.id}
                    columns={this.tbStore.tableColumns}
                    key={this.props.datagrid_code}
                    dataSource={this.tbStore.dataSource}
                    onChange={this.tbStore.TableOnChange}
                    pagination={pagination(this.tbStore)}
                    rowSelection={rowSelection(this.tbStore)}
                    onRow={this.onRowHandler}
                />
                <TableModal ModalContent={this.tbStore.ModalContent} tbStore={this.tbStore} />
            </div>
        );
    }
}
