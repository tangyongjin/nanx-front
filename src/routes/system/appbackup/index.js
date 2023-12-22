import React from 'react';
import { root_url, port, version } from '@/api/api_config/base_config';
const api_root = `${root_url}:${port}/${version}`;
export { api_root };
export default class AppBackUp extends React.Component {
    render() {
        return (
            <div>
                <h1>SYS_OP</h1>
            </div>
        );
    }
}
