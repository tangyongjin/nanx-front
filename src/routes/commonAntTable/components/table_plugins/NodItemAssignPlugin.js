import React from 'react';
import { Modal, Descriptions, message, Checkbox } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import pmStore from '@/store/pmStore';

import { toJS } from 'mobx';
const CheckboxGroup = Checkbox.Group;

@observer
export default class NodItemAssignPlugin extends React.Component {
    constructor(props) {
        super(props);
        this.pmStore = pmStore;
        this.state = {
            visible: false,
            current_field: null,
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            nodeNames: []
        };
        this.init = this.init.bind(this);
    }

    async init() {
        if (this.pmStore.current_processkey == '') {
            message.info('必须选择一个流程');
        } else {
            let { selectedRows } = this.props.commonTableStore;
            if (selectedRows.length == 0) {
                message.info('必须选择一项');
                return;
            } else {
                this.setState({
                    visible: true
                });
                let NodeData = toJS(this.props.commonTableStore.selectedRows[0]);
                console.log(NodeData);
                let params = {
                    data: {
                        processkey: NodeData.processkey,
                        id: NodeData.id,
                        item_type: NodeData.reftype,
                        assigntype: this.props.commonTableStore.datagrid_code
                    },
                    method: 'POST'
                };
                let resp = await api.bpm.getItemAssignInfo(params);
                if (resp.code == 200) {
                    var arr = [];
                    for (var i = 0; i < resp.data.length; i++) {
                        arr.push(resp.data[i].nodesid + '');
                    }
                    this.setState({
                        checkedList: arr
                    });
                    message.success(resp.message);
                }
            }
        }
    }

    onCancel() {
        this.setState({
            checkedList: [],
            visible: false
        });
    }

    //将增加区的信息,配置为某个节点可以查看

    async SaveRefItemAssign() {
        let _row = toJS(this.props.commonTableStore.selectedRows[0]);
        let _rows = toJS(this.props.commonTableStore.selectedRows);

        let itemids = [];

        _rows.map((_tmp_item) => {
            itemids.push(_tmp_item.id);
        });

        console.log(_rows);

        console.log('选择的节点', this.props.commonTableStore);
        let cfgobj = {
            assigntype: this.props.commonTableStore.datagrid_code,
            itemids: itemids,
            itemid: _row.id,
            processkey: _row.processkey,
            processname: _row.processname,
            assigns: this.state.checkedList
        };

        console.log(this.state.checkedList);
        console.log(pmStore.AllNodeName);

        //  将 node_id ,node_name 同时送后台.

        let combine = [];

        this.state.checkedList.map((node_id) => {
            let _tmp = {};
            _tmp.nodesid = node_id;

            var found_node = pmStore.AllNodeName.find(function (xnode) {
                return xnode.id == node_id;
            });

            _tmp.nodename = found_node.name;
            console.log(_tmp);
            combine.push(_tmp);
        });

        cfgobj.assigns_combine = combine;
        let params = { data: { ...cfgobj }, method: 'POST' };

        console.log(params);

        let res = await api.processmanager.SaveRefItemAssign(params);
        if (res.code == 200) {
            message.success(res.message, 0.5);
        }
    }

    onChangeSelectNode = (checkedList) => {
        console.log(checkedList);

        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < this.state.nodeNames.length,
            checkAll: checkedList.length === this.state.nodeNames.length
        });
    };

    onCheckAllChange = (e) => {
        let nodeNames = this.getAllCheckedValue();

        this.setState({
            checkedList: e.target.checked ? nodeNames : [],
            indeterminate: false,
            checkAll: e.target.checked
        });
    };

    getAllCheckedValue() {
        return pmStore.AllNodeName.map((item) => item.id);
    }

    render() {
        console.log(pmStore);
        console.log(this.props.commonTableStore);

        let { selectedRows } = this.props.commonTableStore;

        let nodeNames = pmStore.AllNodeName;

        // nodeNames.push({ 'id': 'init_node', 'name': '初始节点' })

        console.log(nodeNames);

        return selectedRows.length > 0 ? (
            <Modal
                visible={this.state.visible}
                bodyStyle={{ width: '1400px', overflow: 'auto', bottom: 0 }}
                destroyOnClose={true}
                onCancel={() => this.onCancel()}
                onOk={() => this.SaveRefItemAssign()}
                title="节点权限分配[ver1]"
                width={1400}>
                <div style={{ width: '1380px' }}>
                    <div style={{ borderBottom: '1px solid #E9E9E9', width: '1380px', margin: '10px' }}>
                        <div className="field_msg">
                            <Descriptions title="元素" size={'middle'} bordered>
                                <Descriptions.Item key={'x1'} label="ID">
                                    {selectedRows[0].id}
                                </Descriptions.Item>
                                <Descriptions.Item key={'x2'} label="字段">
                                    {selectedRows[0].fieldtitle}
                                </Descriptions.Item>
                                <Descriptions.Item key={'x3'} label="Fieldid">
                                    {selectedRows[0].id}
                                </Descriptions.Item>
                                <Descriptions.Item key={'x4'} label="memo">
                                    {selectedRows[0].memo}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                    <br />
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}>
                        选择所有
                    </Checkbox>
                    <br />
                    <br />
                    <CheckboxGroup value={this.state.checkedList} onChange={this.onChangeSelectNode}>
                        {nodeNames
                            ? nodeNames.map((item, index) => {
                                  return (
                                      <Checkbox
                                          style={{ width: '180px', marginLeft: '10px' }}
                                          key={index}
                                          value={item.id}>
                                          <div>
                                              {item.name}
                                              <br />
                                              {item.id}
                                          </div>
                                      </Checkbox>
                                  );
                              })
                            : null}
                    </CheckboxGroup>
                </div>
            </Modal>
        ) : null;
    }
}
