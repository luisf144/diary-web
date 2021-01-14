const { check } = require('express-validator');

exports.checkValidation = (method) => {
    const validRegex = new RegExp("^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    switch (method) {
        case "create": {
            return [
                check("email").exists().withMessage("It is mandatory to enter email")
                .isEmail().withMessage("The email must be in correct format as foo@bar.com"),
                check("password").exists().withMessage("It is mandatory to enter password")
                .matches(validRegex)
                    .withMessage("Password must be 8 characters, at least 1 capital letter and 1 special character."),
                check("role").exists().withMessage("It is mandatory to enter role")
                .isInt().withMessage("Role must be a number")
            ];
        }
        case "login": {
            return [
                check("email").exists().withMessage("It is mandatory to enter email")
                .isEmail().withMessage("The email must be in correct format as foo@bar.com"),
                check("password").exists().withMessage("It is mandatory to enter password")
                .isLength({ min: 6 }).withMessage("Password must be at least 6 characters in length"),
            ];
        }
    }
}
