import React from 'react';
import { Table } from 'antd';
import { observer, inject } from 'mobx-react';
import renderButtons from './renderButtons';
import { pagination, rowSelection } from './tableUtils/tableUtil';

@inject('NanxTableStore')
@observer
export default class NanxTable extends React.Component {
    constructor(props) {
        super(props);
        this.tbStore = props.NanxTableStore;
    }

    async componentDidMount() {
        await this.tbStore.setDataGridCode(this.props.datagrid_code);
        await this.refreshTable();
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

    RenderBthHolder() {
        let LazyModalContainer = this.tbStore.ButtonUsedCom;
        if (this.tbStore.ButtonUsedCom) {
            return (
                <LazyModalContainer
                    ref={async (item) => {
                        await this.tbStore.setLazyButtonUsedCom(item);
                    }}
                    NanxTableStore={this.tbStore}
                    refreshTable={this.refreshTable}
                    afterEditRefresh={this.afterEditRefresh}
                    afterDelteRefresh={this.afterEditRefresh}
                />
            );
        }
    }

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
                {this.RenderBthHolder()}
                <div>{renderButtons(this.tbStore)}</div>

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
            </div>
        );
    }
}
