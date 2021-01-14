const responseHandler = (success, code = 400, message = 'valid', data) => {
    return {
        success,
        code,
        message,
        data
    };
};

// validation error function
const validationError = (errors, res) => {
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.json(responseHandler(false, 422, 'Check data errors', extractedErrors));
}

module.exports = helperFunction = {
    responseHandler,
    validationError
};