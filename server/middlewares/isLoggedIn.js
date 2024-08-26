const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

const isUserLoggedIn = async(req,res,next)=>{

if(!req.cookies.token) {

return  res.status(403).json({
   status:"Error",
   response: "You need to login first"
})
}
try{

   let decoded =  jwt.verify(req.cookies.token,process.env.JWT_SECRET)
   let user = await userModel.findOne({email:decoded.email}).select("-password")
req.user = user

next()
}catch(err){
   res.status(403).json({
      status:"Error",
      response: err.message
   })
}

}

const isOwnerLoggedIn = async(req,res,next)=>{

if(!req.cookies.token) {
   // res.send("Login First")
return  res.status(403).json({
   status:"Error",
   response: "You need to login first"
})
}else{

   try{
   
      let decoded =  jwt.verify(req.cookies.token,process.env.JWT_SECRET)
      let owner = await ownerModel.findOne({email:decoded.email}).select("-password")
   req.owner = owner
   
   next()
   }catch(err){
      res.status(403).json({
         status:"Error",
         response: err.message
      })
   }
}

}

module.exports = {isUserLoggedIn, isOwnerLoggedIn}