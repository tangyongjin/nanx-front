/*

来源:
https://react-icons.github.io/react-icons/icons/vsc/

*/

import React from 'react';

import * as BootStrapIcons from 'react-icons/bs';
import * as VscIcons from 'react-icons/vsc';

const IconLister = (props) => {
    const { ifShowList } = props;

    const BootStrapIconsList = [];
    const VscIconsList = [];

    for (let key in BootStrapIcons) {
        BootStrapIconsList.push(key);
    }

    for (let key in VscIcons) {
        VscIconsList.push(key);
    }

    const containerMainStyle = {
        width: '812px',
        maxHeight: '400px',
        backgroundColor: 'white',
        overflow: 'auto'
    };

    const containerStyle = {
        width: '812px',
        display: ifShowList ? 'flex' : 'none',
        flexWrap: 'wrap' // Allow items to wrap onto a new line
    };

    return (
        <div style={containerMainStyle}>
            <div style={containerStyle}>
                {VscIconsList.map((IconText, index) => (
                    <div
                        style={{ cursor: 'pointer', margin: '6px', height: '32px', width: '32px' }}
                        onClick={() => {
                            props.callbackRender('Vsc:' + IconText);
                        }}
                        key={index}>
                        <div style={{ fontSize: '22px' }}> {React.createElement(VscIcons[IconText])}</div>
                    </div>
                ))}
            </div>
            <div style={containerStyle}>
                {BootStrapIconsList.map((IconText, index) => (
                    <div
                        style={{ cursor: 'pointer', margin: '6px', height: '32px', width: '32px' }}
                        onClick={() => {
                            props.callbackRender('Bs:' + IconText);
                        }}
                        key={index}>
                        <div style={{ fontSize: '22px' }}> {React.createElement(BootStrapIcons[IconText])}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default IconLister;
