const userModel = require('../models/User')
const pwdAuth = require('../common/auth')
// const  hash  = require('bcrypt')

const getusers =   async(req,res)=>{
  try{
    let users = await userModel.find({},{password:0}) // Mongo db function for finding all values
    res.status(200).send({Message:"Data Received",
                          users
                        })
  }
  catch(error){
    res.status(400).send(error)
  }
}

const getUserById = async(req,res)=>{
  try{
    let id = await userModel.findOne({_id:req.params.id})  // Finding a object using id in Mongo
    // console.log(id)
    if(id){
    res.status(201).send({Message:"Data Fetched",
                          id})
    }
    
    else{
      res.status(400).send("Id not found")
    }
  }
  catch(error){
    res.status(500).send(error.message)
  }
}


const createUser = async (req,res)=>{
  try{
    let user = await userModel.findOne({email:req.body.email})
    if(!user){
      req.body.password = await pwdAuth.hashpassword(req.body.password)
    await userModel.create(req.body)
    res.status(201).send("Data Created")
    }
    else{
      res.status(400).send({
        message:`Mail id ${req.body.email} already exists`
      })
    }
  }
  catch(error){
    res.status(500).send(error.message)
  }
}

const edituserById = async (req,res)=>{
  try{
            let users = await userModel.findOne({_id:req.params.id}) 
            if(users){
                      
              let {firstName,lastName,email,password,status,role} = req.body

              users.firstName = firstName?firstName:users.firstName
              users.lastName = lastName?lastName:users.lastName
              users.email = email?email:users.email
              users.password = password?password:users.password
              users.status = status?status:users.status
              users.role = role?role:users.role

              await users.save()
              res.status(201).send("Id values updated Successfully")
            }      
            else{
              res.status(400).send("Invalid Id ")
            }
  }
  catch(error){
    res.status(500).send(error)
  }
}



const deleteUserById = async (req,res)=>{
  try{
       let user = await userModel.findOne({_id:req.params.id})
       console.log(user)
       if(user){
          await userModel.deleteOne({_id:req.params.id})
          res.status(200).send({Message:"Id deleted"})
        
       }
       else
       {
           res.status(400).send({message:"Invalid User"})
       }

  }
  catch(error){
    res.status(500).send(error.message)
  }

}

const logincheck = async (req,res)=>{

  // Creating login authentication for validating users email, 
  // If email found in the Db an token is generated and 
  // the token enrypted with basic user details.

  try{ 
    let user = await userModel.findOne({email:req.body.email})
    if(user){
          let pwdcheck = await pwdAuth.hashcompare(req.body.password,user.password)


          if(pwdcheck){
            let token = await pwdAuth.createToken({
              firstname:user.firstName,
              lastname:user.lastName,
              email:user.email,
              role:user.role
            })
            res.status(200).send({message:'Valid Password',
                                token})
          }
        
          else{
            res.status(404).send(`Inavlid Password ${pwdcheck}  `)
          }
  }


    else{
      res.status(404).send({
        message:`user ${req.body.email} is not found`
      })
    }
  
    
  } 
  catch (error) {
    res.status(400).send({
      message:"Login failed",
    error:error.message})
  }

}


module.exports = {getusers,
  getUserById,
  createUser,
  edituserById,
  deleteUserById,
  logincheck
};
