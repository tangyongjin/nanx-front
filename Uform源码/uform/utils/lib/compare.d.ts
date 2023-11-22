declare type Filter = (comparies: {
    a: any;
    b: any;
}, key: string) => boolean;
export declare const isEqual: (a: any, b: any, filter?: Filter) => boolean;
export {};
