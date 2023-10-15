import React from 'react'

export default class RefreshTable extends React.Component {
    constructor(props) {
        super(props)

        console.log(props)
        this.init = this.init.bind(this)
    }


    init() {
        this.props.refreshTable()
    }

    render() {
        return null
    }
}