import React from 'react';
import { IFieldProps } from '../type';
export interface ICircleButtonProps {
    onClick: React.MouseEvent;
    hasText: boolean;
}
export interface IArrayFieldOptions {
    TextButton: React.ComponentType;
    CircleButton: React.ComponentType<ICircleButtonProps>;
    AddIcon: React.ComponentType;
    RemoveIcon: React.ComponentType;
    MoveDownIcon: React.ComponentType;
    MoveUpIcon: React.ComponentType;
}
export interface IArrayFieldProps extends IFieldProps {
    className?: string;
}
export declare class ArrayFieldComponent<P> extends React.Component<P> {
    isActive: (key: string, value: any) => boolean;
    onClearErrorHandler: () => () => void;
    renderRemove: (index: number, item: any) => React.ReactElement;
    renderMoveDown: (index: number, item: any) => React.ReactElement;
    renderMoveUp: (index: number) => React.ReactElement;
    renderExtraOperations: (index: number) => React.ReactElement;
    renderEmpty: (title?: string) => React.ReactElement;
    renderAddition: () => React.ReactElement;
    getProps: (path?: string) => any;
}
export declare type TypeArrayField<P> = new (props: P, context: any) => ArrayFieldComponent<P>;
export declare const createArrayField: (options: IArrayFieldOptions) => TypeArrayField<IArrayFieldProps>;
