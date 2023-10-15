import { Table } from 'antd';
import React from 'react';
import './CourseNotify.scss';

const CourseNotify = (props) => {
    const columns = [
        {
            title: 'date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'location',
            dataIndex: 'location',
            key: 'location'
        },
        {
            title: 'topic',
            dataIndex: 'topic',
            key: 'topic'
        }
    ];

    const CreateContractBillItem = () => {
        console.log(props.emailmeta.clanderList);
        return (
            <div style={{ marginTop: '20px', marginLeft: '10px' }}>
                <Table
                    dataSource={props.emailmeta.clanderList}
                    size="small"
                    columns={columns}
                    rowClassName={'big_table'}
                    style={{ marginBottom: '20px', marginLeft: '10px' }}
                />
            </div>
        );
    };

    return (
        <div
            id="pdf_printer_wrapper"
            style={{
                paddingLeft: '20px',
                paddingTop: '20px'
            }}
            ref={props.pdfRef}>
            <div style={{ display: 'flex', width: '100px' }}>
                <br />
            </div>

            <div
                style={{
                    marginBottom: '5px',
                    marginLeft: '145px',
                    fontWeight: 'bold',
                    fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                }}>
                <h1>InvoiceNo:{props.emailmeta.invoice_no} </h1>
            </div>
            <div
                style={{
                    marginBottom: '5px',
                    marginLeft: '10px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: 'black',
                    fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                }}>
                Total:{props.emailmeta.fee}
            </div>
            <div
                style={{
                    marginBottom: '5px',
                    marginLeft: '10px',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '16px',
                    fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                }}>
                Payment Time: {props.emailmeta.payment_date}
                <br /> <br /> <br />
                {props.emailmeta.tpl}
            </div>

            {CreateContractBillItem()}

            <div
                style={{
                    marginBottom: '5px',
                    marginLeft: '10px',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '16px',
                    fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                }}>
                bala bala,your sincerely XXX ,Best regards!
            </div>
        </div>
    );
};

export default CourseNotify;
