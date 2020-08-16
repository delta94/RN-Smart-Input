import validationErrors,{ErrorType} from './ValidationRules';
export interface ValidateTypes {
    fieldName: string;
    formType: 'skip' | 'isEmail' | 'required' | 'isValidMobile' | 'isString' | 'retypePassword';
    value:any;
    password: string;
    errorMessage?: string;
}
export default function Validate({fieldName, formType, value, password = '',errorMessage=''}:ValidateTypes) {
    const result = validationErrors[formType]({value, fieldName, minLength: 3, password,errorMessage})
    if (result) {
        return result;
    }

    return ''
}
