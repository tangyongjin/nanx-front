import React from 'react';
import { Resizable } from 'react-resizable';
const ResizeableTitle = (props) => {
    const { onResize, width, ...restProps } = props;
    if (!width) {
        return <th {...restProps} />;
    }
    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            handle={
                <span
                    className={`react-resizable-handle react-resizable-handle-se`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            }
            draggableOpts={{ enableUserSelectHack: false }}>
            <th {...restProps} />
        </Resizable>
    );
};
export default ResizeableTitle;
