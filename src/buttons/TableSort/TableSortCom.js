import React from 'react';
import { Table, Button } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';

const type = 'DragableBodyRow';

@inject('DataGridStore')
@observer
export default class TableSortCom extends React.Component {
    state = { maintableColumns: this.props.DataGridStore.ColsDbInfo };

    DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
        const ref = React.useRef();
        const [{ isOver, dropClassName }, drop] = useDrop({
            accept: type,
            collect: (monitor) => {
                const { index: dragIndex } = monitor.getItem() || {};
                if (dragIndex === index) {
                    return {};
                }
                return {
                    isOver: monitor.isOver(),
                    dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
                };
            },
            drop: (item) => {
                moveRow(item.index, index);
            }
        });

        const [, drag] = useDrag({
            item: { type, index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        });

        drop(drag(ref));

        return (
            <tr
                ref={ref}
                className={`${className}${isOver ? dropClassName : ''}`}
                style={{ cursor: 'move', ...style }}
                {...restProps}
            />
        );
    };

    BodyComponent = { body: { row: this.DragableBodyRow } };

    moveRow = (dragIndex, hoverIndex) => {
        const { maintableColumns } = this.state;
        const dragRow = maintableColumns[dragIndex];

        this.setState(
            update(this.state, {
                maintableColumns: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow]
                    ]
                }
            })
        );
    };

    async savedata() {
        let maintableColumns = this.state.maintableColumns;
        const dataarr = maintableColumns.map((col) => col.Field);
        let params = {
            data: {
                datagrid_code: this.props.DataGridStore.DataGridCode,
                filedids: dataarr
            }
        };
        let res = await api.dataGrid.saveGridFieldOrder(params);
        if (res.code == 200) {
        }
    }

    render() {
        const columns = [
            {
                title: 'Field',
                dataIndex: 'Field'
            },
            {
                title: '名称/备注',
                dataIndex: 'Comment'
            }
        ];

        return (
            <DndProvider backend={HTML5Backend}>
                <br />
                <Table
                    rowKey={(row) => row.Field}
                    columns={columns}
                    size={'small'}
                    dataSource={this.state.maintableColumns}
                    pagination={false}
                    components={this.BodyComponent}
                    onRow={(record, index) => ({
                        index,
                        moveRow: this.moveRow
                    })}
                />
                <Button
                    style={{ display: 'block', margin: '20px auto' }}
                    onClick={() => this.savedata()}
                    type="primary">
                    保存
                </Button>
            </DndProvider>
        );
    }
}
