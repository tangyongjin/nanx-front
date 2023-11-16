import React from 'react';
import { Table } from 'antd';
import SearchFormContainer from '@/buttons/tableSearch/searchFormContainer';
import { observer, inject } from 'mobx-react';
import { pagination, rowSelection } from '@/routes/NanxTable/NanxTableCom/tableUtils/tableUtil';
import { Collapse } from 'antd';

@inject('TableAsEditorStore')
@observer
export default class UTableEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log('TableEditor>>>>>>>>>>props: ', props);
        // uform_para like {"gridcode":"nanx_user_role","field":"role_code"}
        this.uformObj = JSON.parse(props.uform_para);
        this.tbStore = props.TableAsEditorStore;
    }

    async componentDidMount() {
        await this.tbStore.setDataGridCode(this.uformObj.gridcode);
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
                this.props.onChange(record[this.uformObj.field]);
                this.tbStore.rowSelectChange([record.id], [record]);
            }
        };
    };

    render() {
        return (
            <div className="editor_table_wrapper">
                <Collapse
                    items={[
                        {
                            key: '1',
                            label: '搜索...',
                            children: <SearchFormContainer HostedTableStore={this.tbStore} />
                        }
                    ]}
                />
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
