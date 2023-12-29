import React from 'react';
import DynaLoader from './DynaLoader';

const ButtonArray = (props) => {
    console.log('按钮组：ButtonArray>>>>props: ', props);

    return (
        <div id="ButtonBar">
            {props.NanxTableStore.tableButtons.map((item, index) => (
                <DynaLoader
                    key={index}
                    NanxTableStore={props.NanxTableStore}
                    ModalStore={props.ModalStore}
                    buttonSelf={item}
                />
            ))}
        </div>
    );
};

export default ButtonArray;
