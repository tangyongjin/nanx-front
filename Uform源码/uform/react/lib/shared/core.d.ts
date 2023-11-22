import * as React from 'react';
import { ISchemaFormProps, IFieldProps } from '../type';
export interface INativeFormProps {
    component: string;
    formRef?: React.Ref<any>;
}
export interface IRegisteredFieldsMap {
    [name: string]: ComponentWithStyleComponent<any>;
}
export declare type ComponentWithStyleComponent<ComponentProps> = React.ComponentType<ComponentProps> & {
    styledComponentId?: string;
};
export declare const initialContainer: () => void;
export declare const registerFormField: (name: string, component: ComponentWithStyleComponent<IFieldProps>, notWrapper?: boolean) => void;
export declare const registerFormFields: (fields: IRegisteredFieldsMap) => void;
export declare const registerFieldMiddleware: (...wrappers: any[]) => void;
export declare const registerFormWrapper: (...wrappers: any[]) => void;
export declare const registerFieldRenderer: (renderer: React.ComponentType<{}>) => void;
export declare const registerFormFieldPropsTransformer: (name: string, transformer: any) => void;
export declare const getFormFieldPropsTransformer: (name: string) => any;
export declare const getFormField: (name: string) => any;
export declare const getFieldRenderer: () => any;
export declare const OriginForm: React.ForwardRefExoticComponent<ISchemaFormProps<any> & React.RefAttributes<any>>;
