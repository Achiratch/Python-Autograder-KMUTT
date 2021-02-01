import Validator from 'validator'
import isEmpty from './is-empty'

let validateLoginInput: Function;

export default validateLoginInput = (data: any) => {
    let errors: any = {};

    data.studentId = !isEmpty(data.studentId) ? data.studentId : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if (Validator.isEmpty(data.studentId)) {
        errors.studentId = 'Student ID field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)

    };
};