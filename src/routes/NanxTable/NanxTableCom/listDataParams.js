const listDataParams = (tableStore, parentState) => {
    var query_config = {};
    if (parentState.search_query_cfg !== null && typeof parentState.search_query_cfg !== 'object') {
        query_config = parentState.search_query_cfg;
    } else {
        if (parentState.query_cfg == null && parentState.search_query_cfg != null) {
            var arr = parentState.search_query_cfg;
            query_config.count = arr.length;
            arr.forEach((item) => {
                query_config.lines = { ...query_config.lines, ...item };
            });
        } else if (parentState.query_cfg != null && parentState.search_query_cfg == null) {
            query_config = parentState.query_cfg;
        } else if (parentState.query_cfg == null && parentState.search_query_cfg == null) {
            query_config = null;
        } else if (parentState.query_cfg != null && parentState.search_query_cfg != null) {
            var queryarr = Object.keys(parentState.query_cfg.lines);
            var num1 = queryarr.length / 4;
            var count = queryarr.length / 4;
            var num = parentState.search_query_cfg.length;
            arr = [];
            for (var i = 0; i < num; i++) {
                var str = JSON.stringify(parentState.search_query_cfg[i]) + '';
                var key = '_' + i;
                var newkey = '_' + count;
                str = str.replace(new RegExp(key, 'g'), newkey);
                arr.push(JSON.parse(str));
                count++;
            }
            var query_cfg = {};
            var query_cfg1 = {};
            arr.foreach((item) => {
                query_cfg.lines = { ...query_cfg.lines, ...item };
            });

            Object.assign(query_cfg1, query_cfg.lines, parentState.query_cfg.lines);
            query_config.count = num1 + num;
            query_config.lines = query_cfg1;
        }
    }
    return {
        DataGridCode: tableStore.datagrid_code,
        role: sessionStorage.getItem('role_code'),
        user: sessionStorage.getItem('user'),
        query_cfg: query_config,
        isFilterSelfData: parentState.isFilterSelfData ? 'y' : 'n',
        pageSize: tableStore.pageSize,
        currentPage: tableStore.currentPage
    };
};

export default listDataParams;
