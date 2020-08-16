export const validations = {
    matchRegexp: (value:string, regexp:RegExp) => {
      const validationRegexp =
        regexp instanceof RegExp ? regexp : new RegExp(regexp);
      return validations.isEmpty(value) || validationRegexp.test(value);
    },
  
    isEmail:(value:string) =>
      validations.matchRegexp(
        value,
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
      ),
    formName:(value:string) => validations.matchRegexp(value, /^[^a-zA-Z]+$/i),
    isExisty:(value:string) => value !== null && value !== undefined,
  
    isEmpty:(value:any) => {
      if (value instanceof Array) {
        return value.length === 0;
      }
      return value === '' || !validations.isExisty(value);
    },
  
    required:(value:string) => !validations.isEmpty(value),
    isValidPincode:(value:string) => {
      return value.toString().length === 6 ? true : false;
    },
    isNumber:(value:string) => validations.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i),
    isValidMobile:(value:string) => validations.matchRegexp(value, /^[7896]\d{9}$/i),
    isFloat:(value:string) =>
      validations.matchRegexp(value, /^[+-]?([0-9]*[.])?[0-9]+$/i),
  
    isPositive:(value:number) => {
      if (validations.isExisty(value.toString())) {
        return (
          (validations.isNumber(value.toString()) || validations.isFloat(value.toString())) &&
          value >= 0
        );
      }
      return true;
    },
    isIndianNumber: (value:string) => validations.matchRegexp(value, /^(\+91)\d+/i),
    maxNumber: (value:string, max:string) =>
      validations.isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10),
  
    minNumber: (value:string, min:string) =>
      validations.isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10),
  
    maxFloat: (value:string, max:string) =>
      validations.isEmpty(value) || parseFloat(value) <= parseFloat(max),
  
    minFloat: (value:string, min:string) =>
      validations.isEmpty(value) || parseFloat(value) >= parseFloat(min),
  
    isString:(value:any) =>
     validations.matchRegexp(value,/^[A-Za-z]+$/i),
  
    minStringLength: (value:string, length:number) =>
      validations.isString(value) && value.length >= length,
  
    maxStringLength: (value:string, length:number) =>
      validations.isString(value) && value.length <= length,
  };
  export interface ErrorType  {
    'isEmail':Function;
    'skip': Function;
    'required': Function;
    'isValidMobile':Function;
    'retypePassword': Function;
    'isString': Function;
  }
  type ErrorProps =  {
    value?: any;
    field?: string;
    minLength?:number;
    password?: string;
    errorMessage?:string;
  }
  export const validationErrors:ErrorType = {
    isEmail: ({value, errorMessage = ''}:ErrorProps):string => {
      if (!validations.isEmail(value)) {
        return `${errorMessage.length > 0 ? errorMessage : '* Please enter valid email'}`;
      }
      return '';
    },
    skip: () => {
      return '';
    },
    required: ({value, errorMessage = ''}:ErrorProps):string => {
      if (!validations.required(value)) {
        return `${errorMessage}`;
      }
      return '';
    },
    isValidMobile: ({value, errorMessage = '', field}:ErrorProps):string => {
      if (validations.required(value)) {
        if (!validations.isNumber(value)) {
          return `* Enter digits only`;
        }
        if (!validations.isValidMobile(value)) {
          return `${errorMessage.length > 0 ? errorMessage: `* Please enter valid 10 digit mobile number`}`;
        } else {
          return '';
        }
      } else {
        return `* ${field} is Mandatory`;
      }
    },
    isString: ({value,errorMessage = ''}:ErrorProps) => {
      if(!validations.isString(value)) {
        return errorMessage;
      }
        return '';
      
    },
    retypePassword: ({value,password = '',errorMessage}:ErrorProps):string => {
      if (value.trim() !== password.trim()) {
        return `${errorMessage}`;
      }
      return '';
    },
}
export default validationErrors;