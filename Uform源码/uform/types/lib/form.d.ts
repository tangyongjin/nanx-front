/// <reference types="react" />
import { Subject } from 'rxjs/internal/Subject';
import { Path } from './path';
import { IFieldState, IField } from './field';
import { ISchema } from './schema';
import { IEffects } from './effects';
export interface IFormPayload {
    formState: IFormState;
}
export interface IFieldPayload {
    fieldState: IFieldState;
    formState: IFormState;
}
export interface IFieldError {
    name: string;
    errors: string[];
}
export interface IFormState<V = any> {
    values: V;
    initialValues: V;
    valid: boolean;
    invalid: boolean;
    errors: IFieldError[];
    pristine: boolean;
    dirty: boolean;
}
export interface ISubscribers {
    [eventName: string]: Subject<any>;
}
export interface IFormOptions<V = any> {
    editable: boolean | ((name: string) => boolean);
    effects: IEffects;
    defaultValue?: V;
    values?: V;
    initialValues?: V;
    schema: ISchema;
    subscribes: ISubscribers;
    onFormChange: (payload: IFormPayload) => void;
    onFieldChange: (payload: IFieldPayload) => void;
    onValidateFailed: (fieldErrors: IFieldError[]) => void;
    onFormWillInit?: (form: any) => void;
    onReset: (payload: IFormPayload) => void;
    onSubmit: (values: any) => Promise<any> | void;
    traverse?: (schema: ISchema) => ISchema;
}
export interface IFormActions {
    setFieldState: (name: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => void) => Promise<void>;
    getFieldState: {
        (name: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => void): void;
        (name: Path | IFormPathMatcher): IFieldState;
    };
    getFormState: {
        (): IFormState;
        (callback: (formState: IFormState) => void): void;
    };
    setFormState: (callback: (formState: IFormState) => void) => Promise<void>;
    getSchema: (path: Path) => ISchema;
    reset: (forceClear?: boolean | {
        forceClear?: boolean;
        validate?: boolean;
    }, validate?: boolean) => void;
    submit: () => Promise<IFormState>;
    validate: () => Promise<IFormState>;
    dispatch: <T = any>(type: string, payload: T) => void;
}
export interface IAsyncFormActions {
    setFieldState: (name: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => void) => Promise<void>;
    getFieldState: {
        (name: Path | IFormPathMatcher, callback: (fieldState: IFieldState) => void): Promise<void>;
        (name: Path | IFormPathMatcher): Promise<IFieldState>;
    };
    getFormState: {
        (): Promise<IFormState>;
        (callback: (formState: IFormState) => void): Promise<void>;
    };
    setFormState: (callback: (fieldState: IFormState) => void) => Promise<void>;
    getSchema: (path: Path) => Promise<ISchema>;
    reset: (forceClear?: boolean | {
        forceClear?: boolean;
        validate?: boolean;
    }, validate?: boolean) => Promise<void>;
    submit: () => Promise<IFormState>;
    validate: () => Promise<IFormState>;
    dispatch: <T = any>(type: string, payload: T) => Promise<void>;
}
export interface IFormPathMatcher {
    (payload: IField | Path | {
        fieldState: IFieldState;
    }): boolean;
    hasWildcard: boolean;
    pattern: string;
}
export declare type TextAlign = 'left' | 'right';
export declare type Size = 'small' | 'medium' | 'large';
export declare type Layout = 'horizontal' | 'vertical' | 'inline';
export declare type TextEl = string | JSX.Element | null;
export declare type LabelAlign = 'left' | 'top' | 'inset';
declare type ColSpanType = number | string;
export interface ColSize {
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
}
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
    xs?: ColSpanType | ColSize;
    sm?: ColSpanType | ColSize;
    md?: ColSpanType | ColSize;
    lg?: ColSpanType | ColSize;
    xl?: ColSpanType | ColSize;
    xxl?: ColSpanType | ColSize;
    prefixCls?: string;
}
export interface IFormItemGridProps {
    name?: string;
    help?: React.ReactNode;
    extra?: React.ReactNode;
    description?: string;
    title?: string;
    cols?: any;
}
interface IFormSharedProps {
    labelCol?: ColProps | number;
    wrapperCol?: ColProps | number;
    autoAddColon?: boolean;
    size?: Size;
    inline?: boolean;
    labelAlign?: LabelAlign;
    labelTextAlign?: TextAlign;
    className?: string;
    style?: React.CSSProperties;
    prefix?: string;
    maxTipsNum?: number;
}
export interface IFormProps extends IFormSharedProps {
    layout?: string;
    children?: React.ReactNode;
    component?: string;
    onValidateFailed?: () => void;
}
export interface IFormItemProps extends IFormSharedProps {
    id?: string;
    required?: boolean;
    label?: React.ReactNode;
    extra?: React.ReactNode;
    validateState?: any;
    isTableColItem?: boolean;
    help?: React.ReactNode;
    noMinHeight?: boolean;
    children?: React.ReactElement;
    type?: string;
    schema?: ISchema;
}
export {};
