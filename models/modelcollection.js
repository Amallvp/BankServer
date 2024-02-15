const mongoose=require('mongoose')

// create model for collections
// schema are fields& values of collections 

// users

const users=new mongoose.model("users",{

    acno:Number,
    uname:String,
    pswrd:String,
    balance:Number,
    transactions:[]
})

// export 

module.exports=users