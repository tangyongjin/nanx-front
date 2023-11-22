import React from 'react';
import { ComponentWithStyleComponent } from './core';
import { IFieldProps } from '../type';
export declare type TVirtualBoxProps = React.PropsWithChildren<{
    name?: string;
    render?: (fieldProps: IFieldProps) => string | JSX.Element | null;
}>;
export declare const createVirtualBox: <P extends unknown>(name: string, component: ComponentWithStyleComponent<IFieldProps>, isController?: boolean) => {
    ({ children, name: fieldName, render, ...props }: any): JSX.Element;
    defaultProps: Partial<IFieldProps>;
    displayName: string;
};
export declare const createControllerBox: <P extends unknown>(name: string, component: ComponentWithStyleComponent<IFieldProps>) => {
    ({ children, name: fieldName, render, ...props }: any): JSX.Element;
    defaultProps: Partial<IFieldProps>;
    displayName: string;
};
export declare const FormSlot: ({ name, children }: {
    name: any;
    children: any;
}) => JSX.Element;
