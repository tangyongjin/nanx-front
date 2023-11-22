import { format } from './utils';
import { ValidateHandler, IValidateResponse, IFieldMap } from '@uform/types';
export * from './message';
export { format };
export declare const runValidation: (values: object, fieldMap: IFieldMap, forceUpdate?: boolean | ValidateHandler, callback?: ValidateHandler) => Promise<IValidateResponse[]>;
export default runValidation;
