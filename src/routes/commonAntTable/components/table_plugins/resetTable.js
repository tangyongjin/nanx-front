import React from 'react'

export default class ResetTable extends React.Component {
    constructor(props) {
        super(props)

        console.log(props)
        this.init = this.init.bind(this)
    }


    init() {
        this.props.resetTable()
    }

    render() {
        return null
    }
}