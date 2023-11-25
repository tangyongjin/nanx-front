import React from 'react';
// import * as antIcons from '@ant-design/icons';
import { fontIcons } from '@/iconsHero/iconColletion';

const IconLister = (props) => {
    const { ifShowList } = props;

    const containerStyle = {
        width: '312px',
        display: ifShowList ? 'flex' : 'none',
        flexWrap: 'wrap' // Allow items to wrap onto a new line
    };

    return (
        <div style={containerStyle}>
            {fontIcons.map((IconText, index) => (
                <div
                    onClick={() => {
                        props.callbackRender(IconText);
                    }}
                    key={index}
                    stlye={{ margin: '6px' }}>
                    <svg key={index} style={{ fontSize: '18px' }} className="icon36px  pointerHand" aria-hidden="true">
                        <use href={`#${IconText}`}></use>
                    </svg>
                </div>
            ))}
        </div>
    );
};
export default IconLister;
