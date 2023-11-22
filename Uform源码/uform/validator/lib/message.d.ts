export interface ILocaleMessages {
    [key: string]: string | ILocaleMessages;
}
export interface ILocales {
    [lang: string]: ILocaleMessages;
}
export declare const setLocale: (locale: ILocales) => void;
export declare const setLanguage: (lang: string) => void;
export declare const getMessage: (path: string) => any;
