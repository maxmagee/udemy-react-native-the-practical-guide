const validate = (val, rules, connectedValue) => {
    let isValid = true;

    // eslint-disable-next-line no-restricted-syntax
    for (const rule in rules) {
        // see https://eslint.org/docs/rules/guard-for-in
        if (Object.prototype.hasOwnProperty.call(rules, rule)) {
            switch (rule) {
                case 'isEmail':
                    isValid = isValid && emailValidator(val);
                    break;
                case 'minLength':
                    isValid = isValid && minLengthValidator(val, rules[rule]);
                    break;
                case 'equalTo':
                    isValid = isValid && equalToValidator(val, connectedValue[rule]);
                    break;
                default:
                    isValid = true;
                    break;
            }
        }
    }

    return isValid;
};

const emailValidator = val => {
    // eslint-disable-next-line max-len
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};

export default validate;
