import React from 'react';
import { fontIcons, antdicons } from '@/iconsHero/iconColletion';
import * as antIcons from '@ant-design/icons';

const IconLister = (props) => {
    const { ifShowList } = props;

    const containerMainStyle = {
        width: '312px',
        maxHeight: '400px',
        overflow: 'auto'
    };

    const containerStyle = {
        width: '312px',
        display: ifShowList ? 'flex' : 'none',
        flexWrap: 'wrap' // Allow items to wrap onto a new line
    };

    const AntIconWrapper = (IconText) => {
        const antdIconItem = React.createElement(antIcons[IconText], {
            style: { fontSize: '20px' }
        });
        return <div style={{ width: '40px' }}>{antdIconItem}</div>;
    };

    return (
        <div style={containerMainStyle}>
            <div style={containerStyle}>
                {fontIcons.map((IconText, index) => (
                    <div
                        onClick={() => {
                            props.callbackRender(IconText);
                        }}
                        key={index}
                        style={{ margin: '6px' }}>
                        <svg key={index} className="icon36px  pointerHand" aria-hidden="true">
                            <use href={`#${IconText}`}></use>
                        </svg>
                    </div>
                ))}
            </div>

            <div style={containerStyle}>
                {antdicons.map((IconText, index) => (
                    <div
                        style={{ cursor: 'pointer', margin: '6px', height: '24px', width: '24px' }}
                        onClick={() => {
                            props.callbackRender(IconText);
                        }}
                        key={index}>
                        {AntIconWrapper(IconText)}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default IconLister;
