import { IFormOptions } from '@uform/types';
import { setLocale as setValidationLocale, setLanguage as setValidationLanguage } from '@uform/validator';
import { Form } from './form';
import { calculateSchemaInitialValues } from './utils';
export * from './path';
export declare const createForm: ({ initialValues, values, onSubmit, onReset, schema, onFormChange, onFieldChange, onFormWillInit, subscribes, editable, effects, onValidateFailed, traverse }: IFormOptions<any>) => Form;
export { setValidationLocale, setValidationLanguage, Form, calculateSchemaInitialValues };
export default createForm;
