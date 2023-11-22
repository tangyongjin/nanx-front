import { IFormPathMatcher } from '@uform/types';
declare type Filter = (payload: any) => boolean;
export declare const FormPath: {
    match(pattern: string, isRealPath?: boolean | Filter, filter?: Filter): IFormPathMatcher;
    exclude(matcher: IFormPathMatcher): (path: any) => boolean;
    transform(path: string, regexp: RegExp, calllback: (...args: string[]) => string): string;
};
export {};
