import React from 'react';

export default class Characters extends React.Component {
    componentDidMount() {
        this.scrol();
    }
    scrol() {
        this.timer = setInterval(() => {
            let dataarr = this.state.list.slice(1);
            dataarr.push(this.state.list[0]);
            this.setState({
                list: dataarr
            });
        }, 1000);
    }
    stop() {
        window.clearInterval(this.timer);
    }
    goon() {
        this.scrol();
    }
    click(e) {
        console.log(e);
    }
    render() {
        return (
            <div
                style={{ height: '50%', textAlign: 'center', color: '#e5831d', fontSize: '17px' }}
                onMouseOut={() => this.goon()}
                onMouseOver={() => this.stop()}>
                <div style={{ width: '100%', height: '100%', paddingTop: '10%' }}>
                    {this.state.list.map((item, index) => {
                        return (
                            <p key={index} onClick={() => this.click(item)}>
                                {item}
                            </p>
                        );
                    })}
                </div>
            </div>
        );
    }
}
