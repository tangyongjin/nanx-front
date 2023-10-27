const listDataParams = (tableStore) => {
    var query_config = {};
    if (tableStore.search_query_cfg !== null && typeof tableStore.search_query_cfg !== 'object') {
        query_config = tableStore.search_query_cfg;
    } else {
        if (tableStore.fixed_query_cfg == null && tableStore.search_query_cfg != null) {
            var arr = tableStore.search_query_cfg;
            query_config.count = arr.length;
            arr.forEach((item) => {
                query_config.lines = { ...query_config.lines, ...item };
            });
        } else if (tableStore.fixed_query_cfg != null && tableStore.search_query_cfg == null) {
            query_config = tableStore.fixed_query_cfg;
        } else if (tableStore.fixed_query_cfg == null && tableStore.search_query_cfg == null) {
            query_config = null;
        } else if (tableStore.fixed_query_cfg != null && tableStore.search_query_cfg != null) {
            var queryarr = Object.keys(tableStore.fixed_query_cfg.lines);
            var num1 = queryarr.length / 4;
            var count = queryarr.length / 4;
            var num = tableStore.search_query_cfg.length;
            arr = [];
            for (var i = 0; i < num; i++) {
                var str = JSON.stringify(tableStore.search_query_cfg[i]) + '';
                var key = '_' + i;
                var newkey = '_' + count;
                str = str.replace(new RegExp(key, 'g'), newkey);
                arr.push(JSON.parse(str));
                count++;
            }
            var query_cfg = {};
            var query_cfg1 = {};

            arr.forEach((item) => {
                query_cfg.lines = { ...query_cfg.lines, ...item };
            });

            Object.assign(query_cfg1, query_cfg.lines, tableStore.fixed_query_cfg.lines);
            query_config.count = num1 + num;
            query_config.lines = query_cfg1;
        }
    }

    let _listParameters = {
        DataGridCode: tableStore.datagrid_code,
        role: sessionStorage.getItem('role_code'),
        user: sessionStorage.getItem('user'),
        query_cfg: query_config,
        isFilterSelfData: 'y',
        pageSize: tableStore.pageSize,
        currentPage: tableStore.currentPage
    };

    console.log(_listParameters);
    return _listParameters;
};

export default listDataParams;
