import React from 'react';
import { root_url, port, version_2 } from '@/api/api_config/base_config';
const api_root = `${root_url}:${port}/${version_2}`;
export { api_root };
export default class applog extends React.Component {
    render() {
        console.log(api_root);
        const logurl = api_root + '/log';
        return (
            <div>
                <iframe title="applog" style={{ width: '100%', height: '1000px' }} src={logurl} />
            </div>
        );
    }
}
