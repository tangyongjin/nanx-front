import React from 'react';
import { Form } from '@uform/core';
import { ISchema, IFormActions } from '@uform/types';
import { IBroadcast } from '@uform/utils';
export interface IStateContext {
    getSchema: (path: string) => ISchema;
    form: Form;
    actions: IFormActions;
    locale: {
        [key: string]: any;
    };
    broadcast: IBroadcast;
}
export declare const MarkupContext: React.Context<Partial<ISchema<any>>>;
export declare const StateContext: React.Context<Partial<IStateContext>>;
export declare const BroadcastContext: React.Context<Partial<IBroadcast>>;
