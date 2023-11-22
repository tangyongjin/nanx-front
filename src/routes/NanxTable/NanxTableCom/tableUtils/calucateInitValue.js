import dayjs from 'dayjs';
import { tryParseJSON } from '@/utils/tools';

const CalucateInitValue = (formCfg, key) => {
    const _item = formCfg['properties'][key];

    if (!_item['x-props'].hasOwnProperty('default_v')) {
        return null;
    }

    if (_item['x-props']['default_v'] == 'fixValue') {
        const parsedObject = tryParseJSON(_item['x-props']['defaultv_para']);
        if (parsedObject == null) {
            return null;
        } else {
            return parsedObject['value'];
        }
    }

    if (_item['x-props']['default_v'] == 'currentData') {
        return dayjs().format('YYYY-MM-DD');
    }

    if (_item['x-props']['default_v'] == 'currentDataTime') {
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
};

export default CalucateInitValue;
