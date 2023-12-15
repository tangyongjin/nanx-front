import React from 'react';
import { Table, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import renderButtons from './renderButtons';
import { pagination, rowSelection } from './tableUtils/tableUtil';
import { randomString } from '@/utils/tools';
import _NanxTableStore from '@/store/NanxTBS';
import TableModal from './TableModal';

import DynamicComponentLoader from '@/buttons/DynamicComponentLoader';

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

    createButton = () => {
        const dynamic = (
            <DynamicComponentLoader
                icon="Bs:BsTextareaResize"
                NanxTableStore={this.tbStore}
                buttonPath="./BtnEditor.js"
            />
        );

        console.log('dynamic: ', dynamic);
        return dynamic;
    };

    loadTabForm = () => {
        const dynamic = <DynamicComponentLoader NanxTableStore={this.tbStore} componentPath="./EditCom.js" />;

        console.log('dynamic: ', dynamic);
        // return dynamic;
        this.tbStore.setModalContent(dynamic);
        this.tbStore.showButtonModal();
    };

    render() {
        return (
            <div className="table_wrapper">
                {/* {this.RenderBthHolder()} */}

                {/* {this.createButton()} */}
                {/* <div>{renderButtons(this.tbStore)}</div> */}
                <div>{this.state.version}</div>

                <Button type="primary" onClick={this.loadTabForm}>
                    Edit
                </Button>

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
