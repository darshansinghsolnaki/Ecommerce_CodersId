const express = require('express')
const userRouter = express.Router()
const userController = require('../controller/userController')
const userValidation = require('../validation/user/userValidation')
const  upload  = require('../middleware/imageConfig')
const mailsend = require('../service/mailServices')



userRouter.post("/sigup", userController.sigup)
userRouter.post("/login", userValidation.loginValSchema,  userController.login)
userRouter.post("/resetmail", mailsend)
userRouter.post("/resetpassword/:id/:token", userController.resetPassword)
userRouter.patch("/profileupadate/:id", upload.single("profil_pic"), userController.profile_Upadate)

module.exports = userRouter;
