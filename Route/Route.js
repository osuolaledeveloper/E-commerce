const express = require('express')
const router = express.Router()
const {validationResult ,body} = require('express-validator');
const user = require("../db")
const {email, password, confirmationPassword, firstNmae, lastNmae, phoneNumber} = require('../validator')
const crypto = require('crypto');
const request = require('request');


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
    
     return  res.render("signup", {errors});
    }
      const salt = crypto.randomBytes(8).toString("hex")
    const passords = crypto.scryptSync(req.body.password, salt, 64).toString('hex')
    const hashPassword = `${passords}.${salt}`
    req.body.password = hashPassword
    const {firstName, lastName,phoneNumber, email, password,   } = req.body
     user.create({firstName, lastName, phoneNumber, email, password}, (error, data) =>{
        if(error){
            console.log(error)
        }
        else{
            req.session.user = data.id
        }

     })
    res.render("dashboard")
})



router.get('/signin', (req, res) => {
    res.render('signin')
})

router.post('/signin',
body('email').trim()
.custom( async (value) => {
    const users = await user.findOne({email: value}).exec()
console.log(!users)
    if(!users){
     throw new Error("user not found")
    }
   }),
body('password')
.trim()
.custom( async(value, { req }) => {
    const users = await user.findOne({email: req.body.email}).exec()
    if(users){
    const  hashPassword =  users.password.split('.')[0].trim()
     const salt = users.password.split('.')[1].trim()
    const passords = crypto.scryptSync(req.body.password, salt, 64).toString('hex').trim()
    if(passords !== hashPassword){
        throw new Error(" password incorrect")
    }}
  
    return true
}),
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    
     return  res.render("signin", {errors});
    }
    const users = await user.findOne({email: req.body.email}).exec()
  

    res.redirect('/')
})

router.post('/signout', (req, res) => {
    
    res.send('signed out')
})

router.get('/dashboard', (req, res) => {

    res.render('dashboard')
    
})
  router.get('/topup/airtime', (req, res) => {
    res.render('airtime')
  })
  router.post('/topup/airtime', (req, res) => {
    console.log(req.body)
    request(`https://vtu.ng/wp-json/api/v1/airtime?username=osuolale1998&password=bolaji@vtu56&phone=${req.body.phonenumber}&network_id=${req.body.airtime}&amount=${req.body.amount}`, function (error, response, body) {
        if(error){
            console.log(error)
        }
        else{
           res.send(body)
        }
        
      });
 })

  router.get('/admin/dashboard', async (req, res) => {
    const users = await user.find({}).exec()
    console.log(users)
    res.render("admin", {users})
  })

module.exports =  router
