// middleware creation
// a function with 3 arguments  - 1. req  , 2. res  , 3. next 

const jwt = require('jsonwebtoken')    // importing jwt file 

  
 const jwtMiddleware = (req, res, next) => { 

    // access token from request header 

    try {

        const token = req.headers["access_token"]   // if token is not received here runtime error will happen=> to solve try catch is used 

        //validation for  the token - jwt - verify()

        jwt.verify(token,"secretkey123")    //    - true/false

        //  if token is verified continue the request 

        next()

    } 
    catch {
        res.status(404).json("Please login")

    }
}
module.exports=jwtMiddleware