import { observable, action } from 'mobx';
import { hashHistory } from 'react-router';
import api from '../api/api';
import { message } from 'antd';

class permissionManageStore {
    @observable pagination = {
        total: 0,
        currentPage: 1,
        pageSize: 10
    };

    @observable roleList = [];

    @observable roleSearchData = {};

    @observable currentRole = {
        role_code: sessionStorage.getItem('currentRoleCode'),
        role_name: sessionStorage.getItem('currentRoleName')
    };

    @action clearPagination = () => {
        this.pagination = {
            total: 0,
            currentPage: 1,
            pageSize: 10
        };
    };

    // 角色权限列表
    @observable rolePermissionList = [];

    // 用户列表
    @observable userListHasRole = [];

    @observable searchText = '';

    @observable searchdataIndex = '';

    @action handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.searchText = selectedKeys[0];
        this.searchdataIndex = dataIndex;
    };

    @action
    handleReset = (clearFilters) => {
        clearFilters();
        this.searchText = '';
    };

    @action getRoleList = async () => {
        let params = {
            data: {
                currentPage: this.pagination.currentPage,
                pageSize: this.pagination.pageSize,
                ...this.roleSearchData
            },
            method: 'POST'
        };
        let res = await api.permission.getRoleList(params);
        if (res.code == 200) {
            this.roleList = res.data;
            this.pagination.total = res.total;
        }
    };

    @action searchRoleHandle = (event) => {
        if (JSON.stringify(this.roleSearchData) == '{}') {
            message.error('请填写角色名称或者角色code！');
            return;
        }
        this.clearPagination();
        this.getRoleList();
    };

    @action setSearRoleValue = (event, key) => (this.roleSearchData[key] = event.target.value);

    @action setRoleRowData = (event, key) => (this.roleRowData[key] = event.target.value);

    @action setCurrentPage = (currentPage) => {
        this.pagination.currentPage = currentPage;

        this.getRoleList();
    };

    @action allocationMenu = (event, record) => {
        this.customerHashPush('system/allocationMenu', record);
    };

    @action toPermissionDetail = (event, record) => {
        this.customerHashPush('system/permissionDetail', record);
    };

    @action toLookUserByRole = (event, record) => {
        this.customerHashPush('system/lookUserByRole', record);
    };

    @action customerHashPush = (pathname, record) => {
        this.currentRole.role_code = record.role_code;
        this.currentRole.role_name = record.role_name;
        sessionStorage.setItem('currentRoleCode', this.currentRole.role_code);
        sessionStorage.setItem('currentRoleName', this.currentRole.role_name);
        let params = {
            role_code: this.currentRole.role_code,
            role_name: this.currentRole.role_name
        };
        hashHistory.push({ pathname, state: params });
    };

    @action getUserByRole = async () => {
        let params = {
            data: {
                role_code: this.currentRole.role_code
            },
            method: 'POST'
        };
        let res = await api.permission.getUserByRole(params);
        this.userListHasRole = res.code == 200 ? res.data : [];
    };

    @action editRowRoleButton = (event, record) => {
        this.modalTitle = '编辑角色';
        this.roleRowData = { ...record };
        this.showModal();
    };

    @action deleteRoleRow = async (event, record) => {
        let params = {
            data: {
                id: record.key
            },
            method: 'POST'
        };
        let res = await api.permission.deleteRoleRow(params);
        if (res.code == 200) {
            message.success('刪除成功');
            this.getRoleList();
            return;
        }
        return message.error('刪除失败');
    };

    @action addRoleButton = (event) => {
        this.modalTitle = '新增角色';
        this.currentRole = {};
        this.showModal();
        this.roleRowData = {};
    };

    @action getFirstMenuList = async () => {
        let params = {
            data: {
                role_code: this.currentRole.role_code
            },
            method: 'POST'
        };
        let res = await api.permission.getFirstMenuList(params);
        this.rolePermissionList = res.code == 200 ? res.data : [];
    };

    @action getSecondMenuList = async (treeNode) => {
        if (treeNode.props.children) {
            return;
        }
        let params = {
            data: {
                key: treeNode.props.eventKey,
                role_code: this.currentRole.role_code
            },
            method: 'POST'
        };
        let res = await api.permission.getSecondMenuList(params);
        let children = [];
        if (res.code == 200) {
            treeNode.props.dataRef.children = res.data;

            this.rolePermissionList = [...this.rolePermissionList];

            return;
        }

        treeNode.props.dataRef.children = children;

        this.rolePermissionList = [...this.rolePermissionList];
    };

    /**************  角色Modal start ********************/
    @observable visibleModal = false;
    @observable roleRowData = {};

    @action showModal = () => (this.visibleModal = true);
    @action hideModal = () => (this.visibleModal = false);

    @action saveRoleHandle = async (event) => {
        if (this.validateRoleData() == false) {
            return;
        }
        let params = {
            data: this.roleRowData,
            method: 'POST'
        };
        console.log(this.roleRowData);
        if (this.modalTitle == '编辑角色') {
            this.updateRoleHandle(params);
            return;
        }
        console.log(params.data);
        if (!params.data.role_code || !params.data.role_name) {
            message.error('请将角色名称与角色code填写完整');
        } else {
            let res = await api.permission.addRole(params);
            if (res.code == 200) {
                message.success('保存成功');
                this.clearPagination();
                this.getRoleList();
                this.hideModal();
                return;
            }
            message.error('保存失败');
        }
    };

    @action updateRoleHandle = async (params) => {
        let res = await api.permission.updateRole(params);
        if (res.code == 200) {
            message.success('修改成功');
            this.clearPagination();
            this.getRoleList();
            this.hideModal();
            return;
        }
        message.error('编辑失败');
    };

    // 角色新增编辑验证
    @action validateRoleData = () => {
        if (this.roleRowData.role_code == '') {
            message.error('请填写角色编码！');
            return false;
        }
        if (this.roleRowData.role_name == '') {
            message.error('请填写角色名称！');
            return false;
        }
        return true;
    };

    /**************  菜单权限分配start ********************/

    @observable allMenuList = [];
    @observable selectMenukeys = [];

    @observable selectTartgetMenukeys = [];
    @observable treeMenuList = [];

    @action saveMenuPermission = async (nextTargetKeys, direction, moveKeys) => {
        let params = {
            data: {
                role_code: this.currentRole.role_code,
                menu_id_list: moveKeys,
                state: direction == 'right' ? 'insert' : 'delete'
            },
            method: 'POST'
        };
        let res = await api.permission.saveMenuPermission(params);
        if (res.code == 200) {
            this.selectTartgetMenukeys = nextTargetKeys;
            message.success('菜单分配成功！');
            await this.getRoleMenuList();
            await this.getAllMenuList();
            return;
        }
        message.success('菜单分配失败！');
    };

    @action getRoleMenuList = async () => {
        let params = {
            data: {
                role_code: this.currentRole.role_code
            },
            method: 'POST'
        };
        let res = await api.permission.getRoleMenuList(params);
        if (res.code == 200) {
            this.selectTartgetMenukeys = res.data.map((item) => item.key);
            return;
        }
        message.success('获取角色已分配的菜单失败');
    };

    @action getTreeMenuList = async () => {
        let params = {
            data: {},
            method: 'GET'
        };

        let res = await api.permission.getTreeMenuList(params);

        if (res.code == 200) {
            this.selectTartgetMenukeys.map((key) => {
                res.data.filter((item) => item.key == key);
            });

            this.treeMenuList = res.data;
            return;
        }
        message.success('获取菜单失败');
    };

    @action menuSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log(sourceSelectedKeys, targetSelectedKeys);
        this.selectMenukeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    };

    @action getAllMenuList = async () => {
        let params = {
            data: {
                size: 1000,
                currentPage: 1
            },
            method: 'POST'
        };

        let res = await api.permission.getAllMenuList(params);

        if (res.code == 200) {
            this.selectTartgetMenukeys.map((key) => {
                res.data.filter((item) => item.key == key);
            });

            this.allMenuList = res.data;
            return;
        }
        message.success('获取所有菜单失败');
    };

    /**************  菜单button分配Start ********************/
    @observable selectButtonkeys = [];
    @observable selectTartgetButtonkeys = [];

    @action buttonSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.selectButtonkeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    };

    @action getRoleButtonList = async () => {
        let params = {
            data: {
                role_code: this.currentRole.role_code
            },
            method: 'POST'
        };
        let res = await api.permission.getRoleButtonList(params);
        if (res.code == 200) {
            this.selectTartgetButtonkeys = res.data.map((item) => item.key);
            return;
        }
        message.success('获取角色已分配的按钮失败');
    };

    /************************* 菜单管理 *********************/

    @observable menuList = [];

    @observable menuSearchData = {};

    @observable menuRowData = {};

    @action setMenuCurrentPage = (currentPage) => {
        this.pagination.currentPage = currentPage;

        this.getTableMenuList();
    };

    @action getTableMenuList = async () => {
        let params = {
            data: {
                currentPage: this.pagination.currentPage,
                size: this.pagination.pageSize,
                ...this.menuSearchData
            },
            method: 'POST'
        };
        let res = await api.permission.getAllMenuList(params);
        if (res.code == 200) {
            res.data.forEach((item) => {
                item.parent_text = item.parent_text == undefined ? '' : item.parent_text;
            });
            this.menuList = res.data;
            this.pagination.total = res.total;
        }
    };

    @action searchMenuHandle = (event) => {
        if (JSON.stringify(this.menuSearchData) == '{}') {
            message.error('请填写菜单名称或者菜单编码！');
            return;
        }

        this.clearPagination();
        this.getTableMenuList();
    };

    @action setSearMenuValue = (event, key) => (this.menuSearchData[key] = event.target.value);

    @action setMenuRowData = (event, key) => {
        if (key == 'parent_text') {
            let menuRow = this.allMenuList.find((item) => item.parent_text === event);
            this.menuRowData['parent_id'] = menuRow.key;
            this.menuRowData[key] = event;
            return;
        }
        this.menuRowData[key] = event.target ? event.target.value : event;

        // 是一级菜单清除parent_id
        if (this.menuRowData.isFirstMenu) {
            this.menuList.parent_id = null;
        }
    };

    @action toMenuDetail = (event, record) => {
        this.menuRowData = record;
    };

    @action editRowMenuButton = (event, record) => {
        this.modalTitle = '编辑菜单';
        this.menuRowData = { ...record };
        this.menuRowData.isFirstMenu = record.menu_level == 1 ? true : false;
        this.showModal();
        this.getAllMenuList();
    };

    @action deleteMenuRow = async (event, record) => {
        let params = {
            data: {
                id: record.key
            },
            method: 'POST'
        };
        let res = await api.permission.deleteMenuRow(params);
        if (res.code == 200) {
            message.success('刪除成功');
            this.getTableMenuList();

            return;
        }
        return message.error('刪除失败');
    };

    @action addMenuButton = (event) => {
        this.modalTitle = '新增菜单';
        this.menuRowData = { isFirstMenu: false };
        this.getAllMenuList();
        this.showModal();
    };

    @action saveMenuHandle = async (event) => {
        let params = {
            data: this.menuRowData,
            method: 'POST'
        };
        if (this.modalTitle == '编辑菜单') {
            if (
                params.data.text == '' ||
                params.data.menu == '' ||
                params.data.router == '' ||
                params.data.type == ''
            ) {
                message.error('请将必填信息填写完整');
            } else {
                this.updateMenuHandle(params);
            }
            return;
        }

        if (!params.data.text || !params.data.menu || !params.data.router) {
            message.error('请将必填信息填写完整');
            return;
        }
        if (params.data.isFirstMenu == false && !params.data.parent_id) {
            message.error('请将必填信息填写完整');
        } else {
            params.data.type = '菜单';
            let res = await api.permission.addMenu(params);
            if (res.code == 200) {
                message.success('保存成功');
                this.clearPagination();
                this.getTableMenuList();
                this.hideModal();
                return;
            } else {
                message.error('保存失败');
            }
        }
    };

    @action updateMenuHandle = async (params) => {
        params.data.id = params.data.key;
        let res = await api.permission.updateMenu(params);
        if (res.code == 200) {
            message.success('修改成功');
            this.clearPagination();
            this.getTableMenuList();
            this.hideModal();
            return;
        }
        message.error('编辑失败');
    };

    /******************************* 按钮管理 ******************/

    @observable buttonSearchData = {};
    @observable buttonList = [];
    @observable buttonRowData = {};

    @action setButtonCurrentPage = (currentPage) => {
        this.pagination.currentPage = currentPage;

        this.getButtonList();
    };

    @action getButtonList = async () => {
        let params = {
            data: {
                page: this.pagination.currentPage,
                size: this.pagination.pageSize,
                ...this.buttonSearchData
            },
            method: 'POST'
        };

        let res = await api.button.getButtonList(params);
        if (res.code == 200) {
            this.buttonList = res.data;
            this.pagination.total = res.total;
            console.log(555, this.buttonList);
        }
    };
    @action getButtonList_noparams = async () => {
        let params = {
            data: {},
            method: 'POST'
        };
        let res = await api.button.getButtonList(params);
        if (res.code == 200) {
            this.buttonList = res.data;
            console.log(555, this.buttonList);
        }
    };

    @action searchButtonHandle = (event) => {
        if (JSON.stringify(this.buttonSearchData) == '{}') {
            message.error('请填写按钮称或者角色按钮编码！');
            return;
        }

        this.clearPagination();
        this.getButtonList();
    };

    @action setSearButtonValue = (event, key) => (this.buttonSearchData[key] = event.target.value);

    @action setButtonRowData = (event, key) => {
        console.log(111, event, key);
        this.buttonRowData[key] = event.target ? event.target.value : event;
        console.log(222, this.buttonRowData);
    };

    @action toButtonDetail = (event, record) => {
        this.buttonRowData = record;
    };

    @action editRowButtonBtn = (event, record) => {
        this.modalTitle = '编辑按钮';

        this.buttonRowData = { ...record };
        this.showModal();
    };

    @action deleteButtonRow = async (event, record) => {
        console.log(788, record);
        let params = {
            data: {
                id: record.id
            },
            method: 'POST'
        };
        let res = await api.button.deleteButton(params);
        if (res.code == 200) {
            message.success('刪除成功');
            this.getButtonList();
            return;
        }
        return message.error('刪除失败');
    };

    @action addButtonBtn = async (event) => {
        this.modalTitle = '新增按钮';
        this.buttonRowData = { isLeaf: true };
        await this.getAllMenuList();
        this.showModal();
    };

    @action saveButtonHandle = async (event) => {
        if (this.validateRoleData() == false) {
            return;
        }
        console.log(888999, this.buttonRowData);
        let params = {
            data: this.buttonRowData,
            method: 'POST'
        };
        if (this.modalTitle == '编辑按钮') {
            if (
                params.data.name == '' ||
                params.data.button_code == '' ||
                params.data.icon == '' ||
                params.data.file_path == '' ||
                params.data.is_standard_button == ''
            ) {
                message.error('请将必填信息填写完整');
            } else {
                this.updateButtonHandle(params);
            }

            return;
        }
        console.log(params);
        if (!params.data.name) {
            message.error('请将必填信息填写完整');
        } else {
            let res = await api.button.insertButton(params);
            if (res.code == 200) {
                message.success('保存成功');
                this.clearPagination();
                this.getButtonList();
                this.hideModal();
                return;
            }
            message.error('保存失败');
        }
    };

    @action updateButtonHandle = async (params) => {
        // params.data.id = params.id
        console.log(4455, params);
        let res = await api.button.updateButton(params);
        if (res.code == 200) {
            message.success('修改成功');
            this.clearPagination();
            this.getButtonList();
            this.hideModal();
            return;
        }
        message.error('编辑失败');
    };
}

export default new permissionManageStore();
