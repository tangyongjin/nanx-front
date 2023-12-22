// /*

// 来源:
// https://react-icons.github.io/react-icons/icons/vsc/

// */

import { useMemo } from 'react';
import * as BootStrapIcons from 'react-icons/bs';
import * as VscIcons from 'react-icons/vsc';
import React from 'react';
import { FixedSizeGrid } from 'react-window';

const IconLister = (props) => {
    const { ifShowList } = props;

    const iconList = useMemo(() => {
        const list = [];
        for (let key in VscIcons) {
            list.push({ type: 'Vsc', name: key });
        }
        for (let key in BootStrapIcons) {
            list.push({ type: 'Bs', name: key });
        }
        return list;
    }, []); // 空数组作为依赖，表示这个 useMemo 只在组件挂载时运行一次

    const containerMainStyle = {
        width: '412px',
        maxHeight: '400px',
        backgroundColor: 'white',
        overflow: 'auto'
    };

    const handleClick = (type, name) => {
        props.callbackRender(`${type}:${name}`);
    };

    const Cell = ({ columnIndex, rowIndex, style }) => {
        const index = rowIndex * 4 + columnIndex;
        const { type, name } = iconList[index];

        return (
            <div
                style={{ ...style, cursor: 'pointer', margin: '6px', height: '32px', width: '32px' }}
                onClick={() => handleClick(type, name)}>
                <div style={{ fontSize: '22px' }}>
                    {React.createElement(type === 'Vsc' ? VscIcons[name] : BootStrapIcons[name])}
                </div>
            </div>
        );
    };

    return (
        <div style={containerMainStyle}>
            <FixedSizeGrid
                columnCount={10}
                columnWidth={40}
                height={400}
                rowCount={Math.ceil(iconList.length / 4)}
                rowHeight={40}
                width={412}>
                {Cell}
            </FixedSizeGrid>
        </div>
    );
};

export default IconLister;
