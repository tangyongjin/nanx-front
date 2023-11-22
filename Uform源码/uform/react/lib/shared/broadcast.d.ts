import React, { Component } from 'react';
import { IBroadcast } from '@uform/utils';
import { ISelector, IFormActions } from '@uform/types';
import { Broadcast } from '../utils';
declare type ChildrenFunction = (broadcast: IBroadcast) => React.ReactNode;
interface IFormProviderProps {
    children?: React.ReactNode | ChildrenFunction;
}
export declare class FormProvider extends Component<IFormProviderProps> {
    static displayName: string;
    broadcast: Broadcast<unknown, unknown, unknown>;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export declare const FormBridge: () => (Target: React.ComponentType<{}>) => {
    (props: any): JSX.Element;
    displayName: string;
};
export interface IOption {
    selector?: ((payload: any) => boolean) | string[] | string;
}
export interface IFormState {
    status?: any;
    state?: object;
    schema?: object;
}
export declare const useForm: (options?: IOption) => {
    status: any;
    state: object;
    schema: object;
    submit: () => void;
    reset: () => void;
    dispatch: (name: any, payload: any) => void;
};
interface IFormControllerOptions {
    actions: IFormActions;
    effects: (selector: ISelector, actions: IFormActions) => void;
}
export declare const useFormController: {
    ({ actions, effects }: IFormControllerOptions): {
        dispatch: (eventName: string, ...args: any[]) => void;
        implementActions: any;
    };
    createActions: any;
};
export declare const FormConsumer: ({ children, selector }: {
    children: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | ((formApi: any) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>);
    selector?: string | string[] | ((payload: any) => boolean);
}) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
export {};
