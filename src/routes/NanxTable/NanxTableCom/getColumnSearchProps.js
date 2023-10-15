import React from 'react'
import Highlighter from 'react-highlight-words';
import { Input, Button, Icon } from 'antd';

let searchInput = null;
// 设置表头搜索// 
const getColumnSearchProps = (dataIndex,commonTableStore) => ({
    filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { searchInput = node; }}
                    placeholder={`搜索 ${dataIndex}`}
                    value={selectedKeys[0]}
                    type='string'
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => commonTableStore.handleSearch(selectedKeys, confirm,dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => commonTableStore.handleSearch(selectedKeys, confirm,dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
      </Button>
                <Button
                    onClick={() => commonTableStore.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    重置
      </Button>
            </div>
        ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>String(record[dataIndex]).toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.select());
        }
    },
    render: (text) => {
        return  <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[commonTableStore.searchText]}
            autoEscape
            textToHighlight={String(text)}
        />
}
})

export default getColumnSearchProps
