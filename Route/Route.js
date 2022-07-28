const express = require('express')
const router = express.Router()
const {validationResult } = require('express-validator');

const {email, password, confirmationPassword, firstNmae, lastNmae, phoneNumber} = require('../validator')


router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', 
email,
password,
confirmationPassword,
firstNmae,
lastNmae,
phoneNumber,
(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
     return  res.render("signup", {errors});
    }

   
    res.render("dashboard")
})



router.get('/signin', (req, res) => {
    res.render('signin')
})



module.exports =  router
