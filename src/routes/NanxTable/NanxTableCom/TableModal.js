import React, { useRef, useState } from 'react';
import { Modal, Button } from 'antd';
import { observer } from 'mobx-react';
import IconWrapper from '@/utils/IconWrapper';
import Draggable from 'react-draggable';

const TableModal = observer((props) => {
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
    });
    const draggleRef = useRef(null);
    const { clientWidth } = window.document.documentElement;
    const clientHeight = 2000;
    const onStart = (_event, uiData) => {
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y)
        });
    };

    return (
        <Modal
            destroyOnClose={true}
            title={
                <div
                    className="modeal-drag-title"
                    style={{
                        width: '100%',
                        cursor: 'move'
                    }}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {
                        setDisabled(true);
                    }}
                    onFocus={() => {}}
                    onBlur={() => {}}>
                    <div>
                        {IconWrapper(props.tbStore.iconStr)}
                        {props.tbStore.formTitle}
                    </div>
                </div>
            }
            width={props.tbStore.formWidth}
            open={props.tbStore.buttonModalVisuble}
            onCancel={props.tbStore.hideButtonModal}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    nodeRef={draggleRef}
                    onStart={(event, uiData) => onStart(event, uiData)}>
                    <div ref={draggleRef}>{modal}</div>
                </Draggable>
            )}
            footer={[
                <Button type="primary" key="submit" onClick={props.tbStore.hideButtonModal}>
                    关闭
                </Button>
            ]}>
            {props.tbStore.lazyButtonUsedCom ? (
                <props.tbStore.lazyButtonUsedCom NanxTableStore={props.tbStore} />
            ) : null}
        </Modal>
    );
});

export default TableModal;
