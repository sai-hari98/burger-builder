/**
 * method to check validity of a form control
 * value and validation config of the input field are obtained
 */
export const checkValidity = (value, validation) => {
    let isValid = true;
    if (!validation) {
        return true;
    }

    if (validation.required) {
        isValid = isValid && value.trim() !== '';
    }
    if (validation.minlength) {
        isValid = isValid && value.trim().length >= validation.minlength;
    }
    if (validation.maxlength) {
        isValid = isValid && value.trim().length <= validation.maxlength;
    }
    if (validation.numeric) {
        isValid = isValid && !isNaN(value);
    }
    if (validation.email) {
        isValid = isValid && validateEmail(value);
    }
    return isValid;
}

export const checkFormValidity = (form) => {
    let valid = true;
    for (let key of Object.keys(form)) {
        valid = valid && form[key].valid;
    }
    return valid;
}

const validateEmail = (email) => {
    let regEx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    return regEx.test(email);
}