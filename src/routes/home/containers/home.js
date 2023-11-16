import React from 'react';
import '@/UFormExtends';
import { SchemaForm } from '@uform/antd';
import 'antd/dist/reset.css';

const Home = () => {
    const formCfg = {
        type: 'object',
        'x-component': 'card',
        properties: {
            provname: {
                type: 'string',
                title: 'provname',
                required: false,
                editable: false,

                'x-props': {
                    field_id: 'provname'
                }
            },
            dropdown: {
                type: 'string',
                title: 'dropdown',
                required: false,
                'x-visible': false,
                'x-props': {
                    field_id: 'dropdown',
                    uform_para: ''
                }
            }
        }
    };
    return (
        <div style={{ marginTop: '20px' }}>
            <SchemaForm schema={formCfg}></SchemaForm>
        </div>
    );
};

export default Home;
