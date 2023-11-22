import React from 'react';
export interface IColumnProps {
    title?: string;
    dataIndex?: string;
    width?: string | number;
    cell: (item?: any, index?: number) => React.ReactElement;
}
export interface ITableProps {
    className?: string;
    dataSource: any;
}
