import React from 'react';
export * from '@uform/utils';
export declare const isNum: (value: string | number) => boolean;
export declare const isNotEmptyStr: (str: string) => boolean;
export declare const flatArr: (arr: any[]) => any;
export declare const compose: (payload: any, args: any[], revert: boolean) => any;
export declare const createHOC: (wrapper?: (options: object, Target: any) => any) => (options?: object) => (Target: React.ComponentType<{}>) => any;
export declare const filterSchema: (_: any, key: any) => boolean;
export declare const filterSchemaPropertiesAndReactChildren: (_: any, key: any) => boolean;
