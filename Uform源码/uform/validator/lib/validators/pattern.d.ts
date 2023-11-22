import { IRuleDescription } from '@uform/types';
export declare const patternValidate: (pattern: string | RegExp | ((...args: any[]) => boolean), value: any, message: string) => string;
declare const _default: (value: any, rule: IRuleDescription, values: any, name: string) => string;
export default _default;
