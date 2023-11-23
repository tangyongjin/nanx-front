const pagination = (tbStore) => {
    return {
        total: tbStore.total,
        defaultCurrent: 1,
        current: tbStore.currentPage,
        pageSize: tbStore.pageSize,
        showQuickJumper: true,
        showTotal: () => {
            let pageNum = Math.ceil(tbStore.total / tbStore.pageSize);
            return `共${pageNum}页/${tbStore.total}条数据`;
        },
        showSizeChanger: true
    };
};

const rowSelection = (tbStore) => {
    return {
        type: 'radio',
        selectedRowKeys: tbStore.selectedRowKeys,
        onChange: async (selectedRowKeys, selectedRows) => {
            tbStore.rowSelectChange(selectedRowKeys, selectedRows);
        }
    };
};

export { pagination, rowSelection };
