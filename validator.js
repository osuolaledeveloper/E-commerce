const { body, validationResult } = require('express-validator');

const  signupvalidator = {
    email : body("email").trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("invalid email"),
    password: body("password")
    .trim()
    .isLength({min: 6, max:20})
    .withMessage("Password must between 6-20 characters"),
    confirmationPassword:
    body("comfirmationPassword")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
    }),
    firstNmae : body('firstname')
    .trim(),
    lastNmae :body('lastName')
    .trim(),
   phoneNumber: body('phoneNumber')
    .trim()
}




module.exports =  signupvalidator