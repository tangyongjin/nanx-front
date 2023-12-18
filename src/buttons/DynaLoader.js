import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import IconWrapper from '@/utils/IconWrapper';

const DynaLoader = ({ idx, icon, NanxTableStore, comPath, formTitle, buttontext, onClick }) => {
    const [Component, setComponent] = useState(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                const module = await import(`./${comPath}.js`);
                const loadedComponent = module.default;
                setComponent(() => loadedComponent);
            } catch (error) {
                console.error('Error loading component:', error);
            }
        };

        loadComponent();
    }, [comPath, NanxTableStore]);

    const handleButtonClick = async () => {
        if (Component) {
            const Instance = await new Component({ NanxTableStore });
            if (typeof Instance.init === 'function') {
                Instance.init();
            }
            onClick(<Component NanxTableStore={NanxTableStore} />, formTitle);
        }
    };

    return (
        <Button
            danger
            key={idx}
            className="table-button"
            type="primary"
            icon={IconWrapper(icon)}
            style={{ marginRight: 5, marginBottom: 8 }}
            onClick={handleButtonClick}>
            {buttontext}
        </Button>
    );
};

export default DynaLoader;
