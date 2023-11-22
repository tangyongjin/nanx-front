import { IFieldState } from './field';
export interface IValidateResponse {
    name: string;
    value: any;
    field: IFieldState;
    invalid: boolean;
    valid: boolean;
    errors: string[];
}
export declare type ValidateHandler = (response: IValidateResponse[]) => void;
