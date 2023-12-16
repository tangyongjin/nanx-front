import React from 'react';
import { Modal, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';

const TableModal = inject('NanxTableStore')(
    observer((props) => {
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
                        // fix eslintjsx-a11y/mouse-events-have-key-events
                        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                        onFocus={() => {}}
                        onBlur={() => {}}
                        // end
                    >
                        "ABCD"
                    </div>
                }
                styles={{
                    height: '600px',
                    overflow: 'auto',
                    bottom: 0
                }}
                width={props.width || '650px'}
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
                {props.tbStore.ModalContent}
            </Modal>
        );
    })
);

export default TableModal;