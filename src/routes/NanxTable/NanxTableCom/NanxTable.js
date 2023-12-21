import React from 'react';
import { Table } from 'antd';
import { observer } from 'mobx-react';
import { pagination, rowSelection } from './tableUtils/tableUtil';
import _NanxTableStore from '@/store/NanxTBS';
import TableModal from './TableModal';
import ButtonArray from '@/buttons/ButtonArray';

@observer
export default class NanxTable extends React.Component {
    constructor(props) {
        super(props);
        console.log('NanxTable>>>props: ', props);
        this.tbStore = new _NanxTableStore();
    }

    async componentDidMount() {
        const params = new URLSearchParams(this.props.history.location.search);
        const datagridCode = params.get('datagrid_code');
        await this.tbStore.setDataGridCode(datagridCode);
        await this.refreshTable();
    }

    refreshTable = async () => {
        await this.tbStore.resetTableStore();
        await this.tbStore.fetchDataGridCfg();
        await this.tbStore.setLazyComponent();
        await this.tbStore.listData('from refreshTable');
    };

    onRowHandler = (record) => {
        return {
            onClick: async () => {
                this.tbStore.rowSelectChange([record.id], [record]);
            }
        };
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
                    key={this.tbStore.datagrid_code}
                    dataSource={this.tbStore.dataSource}
                    onChange={this.tbStore.TableOnChange}
                    pagination={pagination(this.tbStore)}
                    rowSelection={rowSelection(this.tbStore)}
                    onRow={this.onRowHandler}
                />

                {this.tbStore.lazyButtonUsedCom && this.tbStore.buttonModalVisuble ? (
                    <TableModal tbStore={this.tbStore} />
                ) : null}
            </div>
        );
    }
}
