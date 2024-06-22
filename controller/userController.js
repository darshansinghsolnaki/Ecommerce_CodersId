const user_Schema = require('../model/user_Schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transporter = require("../service/mailServices");


const sigup = async (req, res) => {
  try {
    const { password, confirmpassword } = req.body
    const { email } = req.body.email
    const userData = new user_Schema(req.body)
    if (userData != null) {
      const userExists = await user_Schema.findOne({ email: email })
      if (userExists != null) {
        return res.status(403).json({
          status: "Failed",
          message: "User Alredy Exist"
        })
      } else if (password === confirmpassword && userData != null) {
        if (userData.role === "user") {
          userData.is_Active = true
        } else {
          userData.is_Active = false
        }
        // if (userData.gender === "male") {
        //   userData.profil_pic = '/uploads/img_avatar(male).png'
        // } else if (userData.gender === "female") {
        //   userData.profil_pic = '/uploads/img_avatar(female).png'
        // }
        const salt = await bcrypt.genSalt(10)
        userData.password = await bcrypt.hash(password, salt)
        await userData.save()
        res.status(200).json({
          status: "success",
          message: "User Signup Successful",
          "userData": userData
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Password NOT Match",
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    })
  }
}


const login = async (req, res) => {
  try {
    const { email } = req.body
    const userCheck = new user_Schema(req.body)
    if (userCheck != null) {
      const userExist = await user_Schema.findOne({ email: email })
      if (userExist != null) {
        const isMatch = await bcrypt.compare(userCheck.password, userExist.password)
        if (userExist.email === userCheck.email && isMatch) {
          const token = jwt.sign({ userID: userExist._id }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" })
          res.status(200).json({
            status: "Success",
            message: "user login succesful",
            "token": token
          })
        } else {
          res.status(401).json({
            status: 'Failed',
            message: "user password not match"
          })
        }
      } else (
        res.status(403).json({
          status: "NOT Exist",
          messsage: "user email not valid"
        })
      )
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    })
  }
}


const profile_Upadate = async (req, res) => {
  const id = req.params.id
  data = req.body
  try {
    const filePath = `/uploads/${req.file.filename}`
    data.profil_pic = filePath
    // console.log(filePath)
    const edit = await user_Schema.findByIdAndUpdate(id, data, { new: true })
    return res.status(200).json({
      status: "Success",
      message: "Upadate User Data..",
      "EditData": edit
    })
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: error.message
    })
  }
}

const sendUserResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      const user = await user_Schema.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "5d",
        });
        const link = `===>>>LINK<<<===/${user._id}/${token}`;
        //send Email
        let info = await transporter.sendMail({
          from: "nikhilpatil0759@gmail.com",
          to: email,
          subject: "Password reset link",
          html: `<a href=${link}> click here to reset password </a>`,
        });
        res.status(200).send({
          status: "success",
          message: "password Reset Email sent..plzz /check your email",
          link: link,
        });
      } else {
        res.status(401).send({
          status: "failed",
          message: "User not found",
        });
      }
    } else {
      res.status(400).send({
        status: "failed",
        message: "Email is required",
      });
    }
  } catch {
    res.status(500).json({
      status: "Failed",
      message: "Something goes wrong",
    });
  }
};

  const resetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { id, token } = req.params;
    const user = await user_Schema.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;

    try {
      jwt.verify(token, new_secret);
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          res.send({
            STATUS: "FAILED",
            message: "verify pass",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          var new_password = await bcrypt.hash(password, salt);
          await user_Schema.findByIdAndUpdate(user._id, {
            $set: { password: new_password },
          });
          res.status(200).send({
            status: " success",
            message: "password reset successfully",
          });
        }
      } else {
        res.status(400).send({
          status: "failed",
          message: "all fields are required",
        });
      }
    } catch {
      res.status(500).json({
        status: "Failed",
        message: "Something goes wrong",
      });
    }
  };





module.exports = {
  sigup, login, profile_Upadate, sendUserResetPasswordEmail, resetPassword
}

