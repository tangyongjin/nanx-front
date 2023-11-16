import React from 'react';
import { Table } from 'antd';
import SearchFormContainer from '@/buttons/tableSearch/searchFormContainer';
import { observer, inject } from 'mobx-react';
import { pagination, rowSelection } from '@/routes/NanxTable/NanxTableCom/tableUtils/tableUtil';

@inject('TableAsEditorStore')
@observer
export default class UTableEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log('TableEditor>>>>>>>>>>props: ', props);
        this.tbStore = props.TableAsEditorStore;
    }

    async componentDidMount() {
        await this.tbStore.setDataGridCode(this.props.uform_para);
        await this.refreshTable();
    }

    refreshTable = async () => {
        await this.tbStore.resetTableStore();
        await this.tbStore.fetchDataGridCfg();
        await this.tbStore.listData('from refreshTable');
    };

    onRowHandler = (record) => {
        return {
            onClick: async () => {
                // 因为是作为Ufrom插件的编辑器,所以调用 onChange 来提供 value
                this.props.onChange(record.role_code);
                this.tbStore.rowSelectChange([record.id], [record]);
            }
        };
    };

    render() {
        return (
            <div className="editor_table_wrapper">
                <SearchFormContainer HostedTableStore={this.tbStore} />
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
