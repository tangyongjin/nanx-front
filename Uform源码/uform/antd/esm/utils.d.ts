import React from 'react';
import { IConnectProps, IFieldProps } from '@uform/react';
export * from '@uform/utils';
export interface ISelectProps {
    dataSource: any[];
    className: string;
}
export interface IElement extends Element {
    oldHTML?: string;
}
export interface IStateLoadingProps {
    state?: string;
    dataSource: any[];
}
export declare const StateLoading: (Target: React.ComponentClass<{}, any>) => {
    new (props: Readonly<IStateLoadingProps>): {
        wrapper: React.ReactInstance;
        wrapperDOM: HTMLElement;
        classList: string[];
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): JSX.Element;
        mapState(): void;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IStateLoadingProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<IStateLoadingProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<IStateLoadingProps>, prevState: Readonly<{}>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<IStateLoadingProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IStateLoadingProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: IStateLoadingProps, context?: any): {
        wrapper: React.ReactInstance;
        wrapperDOM: HTMLElement;
        classList: string[];
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): JSX.Element;
        mapState(): void;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IStateLoadingProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<IStateLoadingProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<IStateLoadingProps>, prevState: Readonly<{}>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<IStateLoadingProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IStateLoadingProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any>;
};
export declare const acceptEnum: (component: any) => ({ dataSource, ...others }: {
    [x: string]: any;
    dataSource: any;
}) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.ComponentElement<IStateLoadingProps, {
    wrapper: React.ReactInstance;
    wrapperDOM: HTMLElement;
    classList: string[];
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    mapState(): void;
    context: any;
    setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IStateLoadingProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    readonly props: Readonly<IStateLoadingProps> & Readonly<{
        children?: React.ReactNode;
    }>;
    state: Readonly<{}>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    shouldComponentUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<IStateLoadingProps>, prevState: Readonly<{}>): any;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<IStateLoadingProps>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IStateLoadingProps>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<IStateLoadingProps>, nextState: Readonly<{}>, nextContext: any): void;
}>;
export declare const mapStyledProps: (props: IConnectProps, { loading, size }: IFieldProps) => void;
export declare const mapTextComponent: (Target: React.ComponentClass<{}, any>, props: any, { editable, name }: {
    editable: boolean | ((name: string) => boolean);
    name: string;
}) => React.ComponentClass<{}, any>;
export declare const compose: (...args: any[]) => (payload: any, ...extra: any[]) => any;
export declare const transformDataSourceKey: (component: any, dataSourceKey: any) => ({ dataSource, ...others }: {
    [x: string]: any;
    dataSource: any;
}) => React.ComponentElement<{}, React.Component<{}, any, any>>;
export declare const moveTo: (element: any) => void;
