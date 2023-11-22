import React from 'react';
import { IFormItemProps } from '@uform/types';
export declare const FormLayoutItem: React.FC<IFormItemProps>;
export declare const FormLayout: {
    ({ children, name: fieldName, render, ...props }: any): JSX.Element;
    defaultProps: Partial<import("@uform/react").IFieldProps>;
    displayName: string;
};
export declare const FormItemGrid: any;
export declare const FormCard: {
    ({ children, name: fieldName, render, ...props }: any): JSX.Element;
    defaultProps: Partial<import("@uform/react").IFieldProps>;
    displayName: string;
};
export declare const FormBlock: {
    ({ children, name: fieldName, render, ...props }: any): JSX.Element;
    defaultProps: Partial<import("@uform/react").IFieldProps>;
    displayName: string;
};
export declare const FormTextBox: {
    ({ children, name: fieldName, render, ...props }: any): JSX.Element;
    defaultProps: Partial<import("@uform/react").IFieldProps>;
    displayName: string;
};
