import React from 'react'
import { Table } from 'antd';

export default class PortalTable extends React.Component {
    render() {
        let { bordered, dataSource, pagination, scroll, columns, selectedRowKeys, rowSelectChange } = this.props;
        return (
            <Table
                bordered={bordered}
                dataSource={dataSource}
                pagination={pagination}
                rowSelection={
                    this.props.selectedRowKeys
                        ?
                        {
                            selectedRowKeys: this.props.selectedRowKeys,
                            onChange: this.props.rowSelectChange,
                            type:'radio'
                        }
                        :
                        null
                }
                scroll={scroll}
                columns={columns} />
        )
    }

}
