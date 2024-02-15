const express=require('express')
const logic=require('../controllers/logic')   // setting path to logic
const jwtMiddleware = require('../controllers/middleware/routermiddleware')     // jwt middleware imported to routing

 
  
 
// create an object for router class in express

const router=new express.Router()

// register

router.post('/bankuser/user-register',logic.register)

// login

router.post('/bankuser/user-login',logic.login)

// user profile
router.get('/bankuser/user-profile/:acno',jwtMiddleware,logic.getProfile)

// user balance

router.get('/bankuser/user-balance/:acno',jwtMiddleware,logic.getBalance) 
 
// money transfer
router.post('/bankuser/user-moneytransfer',jwtMiddleware,logic.moneyTransfer) 

// transaction statement
router.get('/bankuser/user-statement/:acno',jwtMiddleware,logic.statement)  

// delete account

router.delete('/bankuser/user-delete/:acno',jwtMiddleware,logic.deleteAC) 

// export router 

module.exports=router 