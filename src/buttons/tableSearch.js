import React from 'react';
import SearchFormContainer from './tableSearch/searchFormContainer';
import { SearchOutlined } from '@ant-design/icons';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';

export default class TableSearch extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    init = async () => {
        await this.props.NanxTableStore.showButtonModal();
    };

    render() {
        return (
            <CommonModal
                width="700px"
                title={
                    <div>
                        <SearchOutlined />
                        数据检索
                    </div>
                }>
                {/* HostedTableStore 指定为 NanxTableStore  或者作为插件时候的 TableAsEditorStore */}
                <SearchFormContainer HostedTableStore={this.props.NanxTableStore} />
            </CommonModal>
        );
    }
}
