//import jwt

const jwt = require('jsonwebtoken')

// import model (users)

const users = require("../models/modelcollection")


// logic for register
const register = (req, res) => {             // body = { acno:123 ,  uname="anu" ,  pswrd="kdns"}

    const acno = req.body.acno
    const uname = req.body.uname
    const pswrd = req.body.pswrd

    // check acno is present in users collection 

    users.findOne({ acno }).then(user => {                 // findOne is an asynchronus menthod so o/p can be accessed only by using then
        if (user) {

            res.status(401).send("User already exist")

        }

        else {

            // register new user -  create a new data object for user 

            var newUser = new users({
                acno,
                uname,
                pswrd,
                balance: 0,
                transactions: []
            })
            // save the object in collection

            newUser.save()

            // response send // json() - convert js data to json type and send 

            res.status(200).json(newUser)
        }

    })
}

// logic for login 

const login = (req, res) => {                      // body = { acno:1000 ,  pswrd="kdns"}

    const { acno, pswrd } = req.body

    users.findOne({ acno, pswrd }).then(user => {

        if (user) {

            // generate token
            var token = jwt.sign({ acno }, "secretkey123")

            res.status(200).json({
                acno: user.acno,
                uname: user.uname,
                token
            })

        }
        else {
            res.status(401).json("incorrect account number or password")
        }
    })
}

// logic to get profile datas 

const getProfile = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {

        if (user) {
            res.status(200).json({
                acno: user.acno,
                uname: user.uname

            })
        }
        else {
            res.status(401).json("user not found")
        }

    })
}
// logic for balance view

const getBalance = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {

        if (user) {
            res.status(200).json({
                acno: user.acno,
                uname: user.uname,
                balance: user.balance
            })
        }
        else {
            res.status(401).json("user not found")
        }

    })

} 


// logic for money transfer 

const moneyTransfer = (req, res) => {
    // access all datas from body

    const { fromacno, toacno, pswrd, amount, datetime } = req.body

    //    convert amount to number 
    let amnt = parseInt(amount)

    // check if from user is in db

    users.findOne({ acno: fromacno}).then((fromuser) => {

        if (fromuser) {

            // check for to user in db

            users.findOne({ acno: toacno}).then(touser => {
                if (touser) {

                    // from balance check

                    if (amnt <= fromuser.balance) {
                        fromuser.balance-=amnt
                        fromuser.transactions.push({ type: "DEBIT", amount: amnt, datetime, user: touser.uname })
                        fromuser.save()

                        touser.balance+=amnt
                        touser.transactions.push({ type: "CREDIT", amount: amnt, datetime, user: fromuser.uname })
                        touser.save()

                        res.status(200).json({message:"transaction success"})  

                    }
                    else {

                        res.status(401).json({message:"insufficient balance"})
                    }

                }
                else {
                    res.status(401).json({message:"invalid credit credentials"})
                }
            })

        }

        else {
            res.status(401).json({message:"invalid debit credentials"})
        }
    })

}

// trasaction statement logic    

const statement = (req, res) => {
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json(user.transactions)
        }
        else {
            res.status(401).json("user not exist")
        }

    })


}

// logic to delete account

const deleteAC = (req, res) => {
    const { acno } = req.params
    users.deleteOne({ acno }).then(user => {      //delete count = 0
        if (user) {
            res.status(200).json("Account Deleted Successfully")
        }
        else {
            res.status(401).json("user not found")
        }
    })
}

module.exports = {
    register, login, getProfile, getBalance, moneyTransfer, statement, deleteAC
}