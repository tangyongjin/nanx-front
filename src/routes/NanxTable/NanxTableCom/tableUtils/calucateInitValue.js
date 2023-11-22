import dayjs from 'dayjs';

const CalucateInitValue = (formCfg, key) => {
    const _item = formCfg['properties'][key];

    if (!_item['x-props'].hasOwnProperty('default_v')) {
        return null;
    }

    if (_item['x-props']['default_v'] == 'fixValue') {
        return 1989;
    }

    if (_item['x-props']['default_v'] == 'currentData') {
        return dayjs().format('YYYY-MM-DD');
    }

    if (_item['x-props']['default_v'] == 'currentDataTime') {
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
    }

    // if (_item['x-props']['default_v'] == 'FetchRemoteData') {
    //     _tmp[key] = 'abc';
    //     setRawData({ value: _tmp });
    // }
};

export default CalucateInitValue;
