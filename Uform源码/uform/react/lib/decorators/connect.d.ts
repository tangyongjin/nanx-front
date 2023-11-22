import React from 'react';
import { IFieldProps } from '../type';
export interface IConnectProps extends IFieldProps {
    disabled?: boolean;
    readOnly?: boolean;
    showTime?: boolean;
    dataSource?: any[];
    [name: string]: any;
}
export interface IConnectOptions<T> {
    valueName?: string;
    eventName?: string;
    defaultProps?: object;
    getValueFromEvent?: (event?: any, value?: any) => any;
    getProps?: (props: IConnectProps, componentProps: IFieldProps) => IConnectProps | void;
    getComponent?: (Target: T, props: any, { editable, name }: {
        editable: boolean | ((name: string) => boolean);
        name: string;
    }) => T;
}
export declare const connect: <T extends React.ComponentType<IFieldProps>>(opts?: IConnectOptions<T>) => (Target: T) => React.ComponentClass<IFieldProps, any>;
