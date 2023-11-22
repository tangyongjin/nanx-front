import { IFormPathMatcher } from '@uform/types';
export * from '@uform/utils';
export declare const raf: any, caf: any;
export declare const resolveFieldPath: (path: string | number | (string | number)[] | IFormPathMatcher) => string[];
export declare const isChildField: (field: any, parent: any) => boolean;
export declare const hasRequired: (rules: any) => boolean;
export declare const publishFormState: (state: any) => {
    values: any;
    valid: any;
    invalid: any;
    errors: any;
    pristine: any;
    dirty: any;
    initialValues: any;
};
export declare const publishFieldState: (state: any) => {
    value: any;
    valid: any;
    invalid: any;
    editable: any;
    visible: any;
    display: any;
    loading: any;
    errors: any;
    pristine: any;
    initialValue: any;
    name: any;
    path: any;
    props: any;
    required: any;
    rules: any;
};
export declare class BufferList {
    data: any[];
    indexes: {};
    push(key: string, value: any, extra: any): void;
    forEach(callback: any): void;
    remove(key: string, value?: any): void;
}
