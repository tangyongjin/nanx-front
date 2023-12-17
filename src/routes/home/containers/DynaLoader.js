import React, { useState, useEffect } from 'react';

const DynaLoader = ({ comPath, buttontext, onClick }) => {
    const [componentInstance, setComponentInstance] = useState(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                const module = await import(`${comPath}`);
                const loadedComponent = module.default;
                const instance = new loadedComponent();
                setComponentInstance(instance);
            } catch (error) {
                console.error('Error loading component:', error);
            }
        };

        loadComponent();
    }, [comPath]);

    return (
        <button key={buttontext} onClick={() => onClick(componentInstance)}>
            {buttontext}
        </button>
    );
};

export default DynaLoader;
