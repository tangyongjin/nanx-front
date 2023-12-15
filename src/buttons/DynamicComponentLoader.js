import React, { useEffect, useState } from 'react';
import { observer, inject, Provider } from 'mobx-react';

const DynamicComponentLoader = ({ NanxTableStore, componentPath }) => {
    console.log('componentPath: ', componentPath);

    const [DynamicComponent, setDynamicComponent] = useState(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                // Dynamically import the component
                const module = await import(`${componentPath}`);
                // Access the default export, assuming your component is the default export
                const Component = module.default;

                // Inject tbStore into the component
                const ObservedComponent = inject('NanxTableStore')(observer(Component));

                setDynamicComponent(() => ObservedComponent);
            } catch (error) {
                console.error('Error loading dynamic component:', error);
            }
        };

        loadComponent();
    }, [componentPath, NanxTableStore]);

    if (!DynamicComponent) {
        return null; // You can render a loading indicator here if needed
    }

    return (
        <Provider NanxTableStore={NanxTableStore}>
            <DynamicComponent />
        </Provider>
    );
};

export default DynamicComponentLoader;
