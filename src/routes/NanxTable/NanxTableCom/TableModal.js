import React, { useRef, useState } from 'react';
import { Modal, Button } from 'antd';
import IconWrapper from '@/utils/IconWrapper';
import Draggable from 'react-draggable';
import { observer } from 'mobx-react';

const TableModal = observer((props) => {
    console.log('隶属于:TableModal props:', props.tbStore.datagrid_code);

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
                        {IconWrapper(props.modalStore.iconStr)}
                        {props.modalStore.formTitle}
                    </div>
                </div>
            }
            width={props.modalStore.formWidth}
            open={props.modalStore.buttonModalVisuble}
            onCancel={props.modalStore.hideButtonModal}
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
                <Button type="primary" key="submit" onClick={props.modalStore.hideButtonModal}>
                    关闭
                </Button>
            ]}>
            {props.tbStore.lazyButtonUsedCom ? <MemoizedLazyComponent NanxTableStore={props.tbStore} /> : null}
        </Modal>
    );
});

const MemoizedLazyComponent = React.memo((props) => (
    <props.NanxTableStore.lazyButtonUsedCom NanxTableStore={props.NanxTableStore} />
));

export default TableModal;
