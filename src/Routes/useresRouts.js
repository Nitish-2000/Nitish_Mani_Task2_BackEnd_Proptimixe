const express = require('express')
const routes = express.Router();
const userRouter = require('../controller/users')
const auth = require('../common/auth')

routes.get('/',auth.validate,auth.checkrole,userRouter.getusers)
routes.get('/:id',userRouter.getUserById)
routes.post('/',userRouter.createUser)
routes.put('/:id',userRouter.edituserById)
routes.delete('/:id',userRouter.deleteUserById)
routes.post('/login',userRouter.logincheck)

module.exports=routes
