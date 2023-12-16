import React, { useEffect, useState, forwardRef } from 'react';
import { observer, inject, Provider } from 'mobx-react';

const DynamicComponentLoader = forwardRef(({ NanxTableStore, componentPath, forwardedProps }, ref) => {
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
                setDynamicComponent(() => <ObservedComponent {...forwardedProps} />);
            } catch (error) {
                console.error('Error loading dynamic component:', error);
            }
        };

        loadComponent();
    }, [componentPath, NanxTableStore, forwardedProps]);

    if (!DynamicComponent) {
        return null; // You can render a loading indicator here if needed
    }

    // Wrap only the dynamically loaded component with the Provider
    return <Provider NanxTableStore={NanxTableStore}>{DynamicComponent}</Provider>;
});

export default DynamicComponentLoader;
