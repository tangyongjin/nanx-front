import React from 'react';
import { message, Descriptions, Table } from 'antd';

export default class GridRefer extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            xinfo: null
        };
    }

    componentWillMount() {
        this.setState({ xinfo: this.props.xinfo });
    }
    componentWillUnmount() {
        this.setState({ xinfo: null });
    }
    createReferRowOne = (row) => {
        console.log('******createReferRowOne******', row);
        if (!row) {
            return null;
        }

        let obj = Object.keys(row);
        obj.foreach((item) => {
            var tap = '';
            if (typeof row[item] == 'object' && row[item] != null) {
                row[item].foreach((items) => {
                    tap = tap + items.url;
                });
                row[item] = tap;
            }
        });

        return (
            <Descriptions key={obj} bordered style={{ marginLeft: '10px' }}>
                {obj.map((item) => (
                    <Descriptions.Item key={item} label={item}>
                        {row[item]}
                    </Descriptions.Item>
                ))}
            </Descriptions>
        );
    };

    renderOneField = (item) => {
        let rows = item.data.rows;
        let jkey = item.jkey;
        if (rows.length != 0) {
            return rows.map((item) => (
                <Descriptions.Item key={jkey} label={jkey}>
                    <div title={item.author}>{item.jvalue}</div>
                </Descriptions.Item>
            ));
        }
    };
    createTableByRows = (row) => {
        let data = Object.keys(row[0]);

        let columns = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {
                title: data[i],
                dataIndex: data[i],
                key: data[i]
            };
            columns.push(obj);
        }
        let newrow = JSON.stringify(row);
        newrow = JSON.parse(newrow);
        let num = 0;
        for (var j = 0; j < newrow.length; j++) {
            num++;
            newrow[j]['key'] = num;
        }
        return (
            <div>
                <Table
                    dataSource={newrow}
                    columns={columns}
                    size="small"
                    pagination={{
                        hideOnSinglePage: true
                    }}
                    style={{ marginBottom: '20px', marginLeft: '10px' }}
                />
            </div>
        );
    };
    renderAddAsRef = (data) => {
        return (
            <Descriptions bordered key={data} style={{ marginLeft: '10px', marginBottom: '5px' }}>
                {data.map((info) => {
                    return this.renderOneField(info);
                })}
            </Descriptions>
        );
    };
    getTitle(info, title) {
        let numstr = '0123456789';
        console.log(info.data);
        for (var i = 0; i < info.length; i++) {
            if (info[i].data.rows.length != 0) {
                return (
                    <div style={ref_title}>
                        {title != null && numstr.indexOf(title.substring(0, 1)) != -1 ? title.substring(1) : title}
                    </div>
                );
            }
        }
        console.log(980, info, title);
    }
    renderRowsFormatData = (key, rows) => {
        if (!rows) {
            return null;
        }
        if (key == 'left_cabinets') {
            if (rows.length == 0) {
                message.info('没有可选机柜');
            }

            return null;
        }

        if (rows.length > 1) {
            return this.createTableByRows(rows);
        } else {
            return this.createReferRowOne(rows[0]);
        }
    };
    render() {
        let xinfo = this.state.xinfo;
        return (
            <div>
                {
                    <div>
                        {<div style={ref_title}>{xinfo.key == 'left_cabinets' ? '' : xinfo.bigtitle} </div>}
                        {this.renderRowsFormatData(xinfo.key, xinfo.bigdata)}
                    </div>
                }
            </div>
        );
    }
}

const ref_title = {
    marginBottom: '9px',
    marginLeft: '10px',
    marginTop: '10px',
    fontWeight: 'bold'
};
