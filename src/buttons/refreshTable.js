import React from 'react';

export default class RefreshTable extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    async componentDidMount() {
        await this.init();
    }

    init = async () => {
        await this.props.NanxTableStore.resetTableStore();
        // debugger;
        await this.props.NanxTableStore.fetchDataGridCfg();
        await this.props.NanxTableStore.listData('from refreshTable');
    };

    render() {
        return null;
    }
}
