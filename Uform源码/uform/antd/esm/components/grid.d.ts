import { Component } from 'react';
import { IColProps, IRowProps } from '../type';
export declare class Row extends Component<IRowProps> {
    static defaultProps: {
        prefix: string;
        pure: boolean;
        fixed: boolean;
        gutter: number;
        wrap: boolean;
        component: string;
    };
    render(): JSX.Element;
}
export declare class Col extends Component<IColProps> {
    static isNextCol: boolean;
    static defaultProps: {
        prefix: string;
        pure: boolean;
        component: string;
    };
    render(): JSX.Element;
}
