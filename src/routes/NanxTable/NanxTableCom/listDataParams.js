const listDataParams = (tableStore) => {
    console.log('tableStore: ', tableStore);

    let joined_querycfg = [];

    if (Array.isArray(tableStore.search_query_cfg) && Array.isArray(tableStore.fixed_query_cfg)) {
        joined_querycfg = tableStore.search_query_cfg.slice().concat(tableStore.fixed_query_cfg.slice());
    }

    let _listParameters = {
        DataGridCode: tableStore.datagrid_code,
        role: sessionStorage.getItem('role_code'),
        user: sessionStorage.getItem('user'),
        query_cfg: joined_querycfg,
        isFilterSelfData: 'y',
        pageSize: tableStore.pageSize,
        currentPage: tableStore.currentPage
    };

    console.log(_listParameters);
    return _listParameters;
};

export default listDataParams;
