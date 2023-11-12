import { port, root_url, version } from './api_config/base_config';
import dataGrid from './api_dataGrid';
import auth from './api_auth';
import button from './api_button';
import curd from './api_curd';
import file from './api_file';
import permission from './api_permission';
import processmanager from './api_processmanager';
import user from './api_user';
import organization from './api_organization';

const api_root = `${root_url}:${port}/${version}`;
export { api_root };

export default class api {}

api.button = button.apis;
api.organization = organization.apis;
api.processmanager = processmanager.apis;
api.dataGrid = dataGrid.apis;
api.curd = curd.apis;
api.auth = auth.apis;
api.permission = permission.apis;
api.user = user.apis;
api.file = file.apis;
