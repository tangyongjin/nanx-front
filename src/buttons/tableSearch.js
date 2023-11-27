import React from 'react';
import SearchFormContainer from './tableSearch/searchFormContainer';
import CommonModal from '@/routes/NanxTable/NanxTableCom/commonModal';
import IconWrapper from '@/utils/IconWrapper';

export default class TableSearch extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.state = { iconStr: null };
    }

    init = async (buttonSource) => {
        this.setState({ iconStr: buttonSource.icon });
        await this.props.NanxTableStore.showButtonModal();
    };

    render() {
        return (
            <CommonModal
                width="700px"
                title={
                    <div>
                        {IconWrapper(this.state.iconStr)}
                        数据检索
                    </div>
                }>
                {/* HostedTableStore 指定为 NanxTableStore  或者作为插件时候的 TableAsEditorStore */}
                <SearchFormContainer HostedTableStore={this.props.NanxTableStore} />
            </CommonModal>
        );
    }
}
