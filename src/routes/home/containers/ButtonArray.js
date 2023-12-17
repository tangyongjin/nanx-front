import React from 'react';
import DynaLoader from './DynaLoader';

const ButtonArray = ({ buttons }) => {
    const handleButtonClick = (Component) => {
        if (Component) {
            console.log('Component: ', Component);
        }
    };

    return (
        <div>
            {buttons.map(({ buttontext, comPath }) => (
                <DynaLoader key={buttontext} comPath={comPath} buttontext={buttontext} onClick={handleButtonClick} />
            ))}
        </div>
    );
};

export default ButtonArray;
