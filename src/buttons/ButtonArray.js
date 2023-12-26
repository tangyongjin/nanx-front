import React from 'react';
import DynaLoader from './DynaLoader';

const ButtonArray = (props) => {
    console.log('props: ', props);

    return (
        <div id="ButtonBar">
            {props.NanxTableStore.tableButtons.map((item, index) => (
                <DynaLoader key={index} {...props} buttonSelf={item} />
            ))}
        </div>
    );

    // return (
    //     <div id="ButtonBar">
    //         {props.NanxTableStore.tableButtons.map((item, index) => (
    //             <button key={index} >{item.title} </button>
    //         ))}
    //     </div>
    // );
};

export default ButtonArray;
