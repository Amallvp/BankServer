// database server integration

const mongoose=require('mongoose')

// connect with mongodb atlas 

mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
    
}).then(()=>{
    console.log(".......Mongodb Atlas connected....");
})
.catch(()=>{
    console.log(".......Mongodb connection error....");
})

