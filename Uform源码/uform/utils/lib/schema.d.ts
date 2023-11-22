import { ISchema } from '@uform/types';
interface IPathInfo {
    name: string;
    path: string[];
    schemaPath: string[];
}
export declare const getSchemaNodeFromPath: (schema: ISchema<any>, path: string | number | (string | number)[]) => ISchema<any>;
export declare const schemaIs: (schema: ISchema<any>, type: string) => boolean;
export declare const isVirtualBox: (name: string) => boolean;
export declare const registerVirtualboxFlag: (name: string) => void;
export declare const calculateSchemaInitialValues: (schema: ISchema<any>, initialValues: any, callback?: (pathInfo: IPathInfo, schema: ISchema<any>, value: any) => void) => any;
export {};
