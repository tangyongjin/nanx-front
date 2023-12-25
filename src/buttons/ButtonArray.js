import React from 'react';
import DynaLoader from './DynaLoader';

const ButtonArray = ({ NanxTableStore, ModalStore }) => {
    return (
        <div id="ButtonBar">
            {NanxTableStore.tableButtons.map((item, index) => (
                <DynaLoader key={index} NanxTableStore={NanxTableStore} ModalStore={ModalStore} buttonSelf={item} />
            ))}
        </div>
    );
};

export default ButtonArray;
