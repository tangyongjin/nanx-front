import React from 'react';

export default class RefreshTable extends React.Component {
    constructor(props) {
        super(props);
        console.log('💋💋💋💋💋RefreshTable>>>>props: ', props);

        this.init = this.init.bind(this);
    }

    async componentDidMount() {
        // await this.props.NanxTableStore.setTableAction('edit');
        await this.init();
    }  

    init = async () => {
        await this.props.NanxTableStore.resetTableStore();
        await this.props.NanxTableStore.fetchDataGridCfg();
        // await this.tbStore.setLazyComponent();
        await this.props.NanxTableStore.listData('from refreshTable');
    };

    render() {
        return null;
    }
}
