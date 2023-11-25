const initCfgArray = [
    {
        initItemID: 'fixValue',
        initItemName: '固定值',
        memo: '如:2021,"hello,world"',
        para_tpl: '{"value":"初始值"}'
    },
    {
        initItemID: 'currentData',
        initItemName: '当前日期',
        memo: '类似 2023-11-22',
        para_tpl: null
    },
    {
        initItemID: 'currentDataTime',
        initItemName: '当前日期',
        memo: '类似 2023-11-22 14:31:22',
        para_tpl: null
    },
    {
        initItemID: 'RemoteFetchOnSite',
        initItemName: '根据当前表单某个字段设置其他字段的值',
        memo: '如根据ISBN号获取书名,必须返回json,{"value:"someValue"},或者根据产品型号获取当前价格',
        para_tpl: '{"target":"被修改的字段名"}'
    },
    {
        initItemID: 'RemoteFetchAlone',
        initItemName: '获取某个接口返回的数据',
        memo: '比如当天汇率/温度,必须返回json,{"value:"此时的汇率"}',
        para_tpl: null
    }
];

export default initCfgArray;
