import React from 'react';
import DynaLoader from './DynaLoader';

const ButtonArray = ({ NanxTableStore, buttons }) => {
    const handleButtonClick = (Component) => {
        if (Component) {
            console.log('按钮对应的组件: ', Component);
            NanxTableStore.setModalContent(Component);
            // Component['init']();
        }
    };

    return (
        <div>
            {buttons.map((item) => (
                <DynaLoader
                    key={item.id}
                    icon={item.icon}
                    NanxTableStore={NanxTableStore}
                    comPath={item.file_path}
                    buttontext={item.title}
                    onClick={handleButtonClick}
                />
            ))}
        </div>
    );
};

export default ButtonArray;
