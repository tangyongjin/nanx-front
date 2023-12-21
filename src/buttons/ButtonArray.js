import React from 'react';
import DynaLoader from './DynaLoader';

const ButtonArray = ({ NanxTableStore, buttons }) => {
    return (
        <div>
            {buttons.map((item, index) => (
                <DynaLoader key={index} NanxTableStore={NanxTableStore} buttonSelf={item} />
            ))}
        </div>
    );
};

export default ButtonArray;
