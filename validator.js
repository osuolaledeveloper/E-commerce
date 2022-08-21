const { body, validationResult } = require('express-validator');
const user = require('./db');
const router = require('./Route/Route');

const  signupvalidator = {
    email : body("email").trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("invalid email").
    custom( async (value) => {
     const users = await user.findOne({email: value}).exec()
console.log(users)
     if(users){
      throw new Error("email in use")
     }
    }),
    password: body("password")
    .trim()
    .isLength({min: 6, max:20})
    .withMessage("Password must between 6-20 characters"),
    confirmationPassword:
    body("comfirmationPassword")
    .trim()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password')
        }
        return true;
    }),
    firstNmae : body('firstname')
    .trim(),
    lastNmae :body('lastName')
    .trim(),
   phoneNumber: body('phoneNumber')
    .trim(),
   emailSignin: body("email").trim()
   .normalizeEmail()
   .isEmail()
   .withMessage("invalid email").
   custom( async (value) => {
    const users = await user.findOne({email: value}).exec()
console.log(users)
    if(!users){
     throw new Error('cannot find user')
    }
   }),
}


module.exports =  signupvalidator