import React from 'react';

export default class home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stepsEnabled: true,
            hintsEnabled: true,
            hints: [
                {
                    element: '.hello',
                    hint: 'Hello hint',
                    hintPosition: 'middle-right'
                }
            ]
        };
    }

    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
    };

    toggleSteps = () => {
        this.setState((prevState) => ({ stepsEnabled: !prevState.stepsEnabled }));
    };

    addStep = () => {
        const newStep = {
            element: '.alive',
            intro: 'Alive step'
        };

        this.setState((prevState) => ({ steps: [...prevState.steps, newStep] }));
    };

    toggleHints = () => {
        this.setState((prevState) => ({ hintsEnabled: !prevState.hintsEnabled }));
    };

    addHint = () => {
        const newHint = {
            element: '.alive',
            hint: 'Alive hint',
            hintPosition: 'middle-right'
        };

        this.setState((prevState) => ({ hints: [...prevState.hints, newHint] }));
    };

    render() {
        return <div style={{ height: '100%' }}></div>;
    }
}
