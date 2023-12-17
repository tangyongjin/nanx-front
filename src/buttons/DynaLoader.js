import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import IconWrapper from '@/utils/IconWrapper';

const DynaLoader = ({ key, icon, NanxTableStore, comPath, buttontext, onClick }) => {
    const [Component, setComponent] = useState(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                console.log('tbStore in DynaLoader:', NanxTableStore);

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
            onClick(<Component NanxTableStore={NanxTableStore} />);
        }
    };

    return (
        <Button
            danger
            key={key}
            className="table-button"
            type="primary"
            icon={IconWrapper(icon)}
            onClick={handleButtonClick}>
            {buttontext}
        </Button>
    );
};

export default DynaLoader;
