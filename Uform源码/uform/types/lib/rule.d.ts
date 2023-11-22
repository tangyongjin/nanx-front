export interface IRuleDescription {
    required?: boolean;
    message?: string;
    pattern?: RegExp | string;
    validator?: Validator;
    format?: DefaultPatternRule;
}
export declare type Validator = (value: any, rule: IRuleDescription, values: any, name: string) => string | Promise<string>;
export declare type DefaultPatternRule = 'url' | 'email' | 'ipv6' | 'ipv4' | 'number' | 'integer' | 'qq' | 'phone' | 'idcard' | 'taodomain' | 'money' | 'zh' | 'date' | 'zip';
export declare type Rule = Validator | Array<Validator | IRuleDescription | DefaultPatternRule> | DefaultPatternRule | IRuleDescription;
