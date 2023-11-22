export interface IUploaderState {
    value: any[];
}
export declare type UploadListType = 'text' | 'picture' | 'picture-card';
export interface IUploaderProps {
    onChange: (value: any[]) => void;
    locale: {
        [name: string]: any;
    };
    value: any[];
    listType?: UploadListType;
}
