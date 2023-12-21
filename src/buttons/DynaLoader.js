import React from 'react';
import { Button } from 'antd';
import IconWrapper from '@/utils/IconWrapper';

const DynaLoader = ({ NanxTableStore, buttonSelf }) => {
    const loadDynamic = async (file_path) => {
        try {
            let module = await require(`./${file_path}.js`).default;
            await NanxTableStore.setLazyButtonUsedCom(module);
        } catch (error) {
            console.error('Error loading dynamic component:', error);
        }
    };

    const handleButtonClick = async () => {
        console.log('按钮点击>>');
        await loadDynamic(buttonSelf.file_path);
        // await NanxTableStore.showButtonModal();
    };

    return (
        <Button
            danger
            key={buttonSelf.id}
            className="table-button"
            type="primary"
            icon={IconWrapper(buttonSelf.icon)}
            style={{ marginRight: 5, marginBottom: 8 }}
            onClick={handleButtonClick}>
            {buttonSelf.title}
        </Button>
    );
};

export default DynaLoader;
