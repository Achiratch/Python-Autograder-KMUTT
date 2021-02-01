import Validator from 'validator'
import isEmpty from './is-empty'

let validateRegisterInput: Function;

export default validateRegisterInput = (data: any) => {
    let errors: any = {};

    data.studentId.toString()
    data.studentId = !isEmpty(data.studentId) ? data.studentId : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

    if (!Validator.isLength(data.studentId, { min: 11, max: 11 })) {
        errors.studentId = 'Please insert your 11 digits KMUTT student\'s Id';
    }
    if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.name = 'Firstname must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.name = 'Firstname field is required';
    }

    if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.name = 'Lastname must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.name = 'Lastname field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must be matched';
    }
    return {
        errors,
        isValid: isEmpty(errors)

    };
};