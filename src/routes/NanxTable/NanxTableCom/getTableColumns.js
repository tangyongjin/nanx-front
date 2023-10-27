import columnsRender from './columnsRender';
import getTextWidth from './commonTableTextTool';

const sorter = (valueA, valueB) => {
    let targetA = valueA != null && valueA.toString().toLowerCase();
    let targetB = valueB != null && valueB.toString().toLowerCase();
    return targetA != null && targetA.localeCompare ? targetA.localeCompare(targetB) : targetA - targetB;
};

const getTableColumns = (tableStore) => {
    let hideColumns = [];
    let columns = [];
    console.log(tableStore.tableColumnsJson);

    tableStore.tableColumnsJson.map((item, index) => {
        let column = {
            title: item.title,
            dataIndex: item.key,
            key: item.key,
            width: item.width && item.width != null && item.width != '' ? parseFloat(item.width) : 200,
            sorter: (a, b) => sorter(a[item.key], b[item.key]),
            render: (text, record) => {
                return columnsRender(text, record, item, tableStore);
            }
        };

        if (hideColumns.includes(item.key) == false) {
            columns.push(column);
        }
    });

    columns.map((item) => {
        let fieldValues = [];
        fieldValues.push(item.title);
        tableStore.dataSource.forEach((record) => {
            fieldValues.push(record[item.dataIndex]);
        });
        var longest = fieldValues.reduce(function (a, b) {
            if (a == null) {
                a = '';
            }
            if (b == null) {
                b = '';
            }
            return a.length > b.length ? a : b;
        });

        if (['resource_logs', 'billsjson'].includes(item.dataIndex)) {
            return (item.width = 200);
        }
        return (item.width = 45 + getTextWidth(longest));
    });

    return columns;
};

export default getTableColumns;
