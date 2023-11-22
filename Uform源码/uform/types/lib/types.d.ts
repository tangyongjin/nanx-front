export declare const isFn: (obj: unknown) => obj is (...args: any[]) => any;
export declare const isArr: (arg: any) => arg is any[];
export declare const isPlainObj: (obj: unknown) => obj is object;
export declare const isStr: (obj: unknown) => obj is string;
export declare const isBool: (obj: unknown) => obj is boolean;
export declare const isNum: (obj: unknown) => obj is number;
export declare const isObj: (val: unknown) => val is object;
export declare const isRegExp: (obj: unknown) => obj is RegExp;
