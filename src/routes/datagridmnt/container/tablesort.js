import React from 'react';
import { Table, Button } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { observer } from 'mobx-react';
import api from '@/api/api';

const type = 'DragableBodyRow';

@observer
export default class Tablesort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.maintableColumns,
            datagrid_code: this.props.current_DataGridCode
        };
    }
    componentDidUpdate(props) {
        if (props.current_DataGridCode != this.state.datagrid_code) {
            this.props.onTabChange('tab0', 'key');
        }
    }
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
    components = {
        body: {
            row: this.DragableBodyRow
        }
    };
    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];

        this.setState(
            update(this.state, {
                data: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow]
                    ]
                }
            })
        );
    };
    async savedata() {
        let data = this.state.data;
        let dataarr = [];
        for (var i = 0; i < data.length; i++) {
            dataarr.push(data[i].Field);
        }
        let params = {
            data: {
                datagrid_code: this.state.datagrid_code,
                filedids: dataarr
            },
            method: 'POST'
        };
        let res = await api.activity.saveActCodeColumnOrder(params);
        if (res.code == 200) {
        }
    }
    render() {
        const columns = [
            {
                title: 'Field',
                dataIndex: 'Field',
                key: 'Field'
            },
            {
                title: '名称',
                dataIndex: 'label',
                key: 'label'
            }
        ];
        return (
            <DndProvider backend={HTML5Backend}>
                <Table
                    rowKey={(row) => row.Field}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={false}
                    components={this.components}
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
