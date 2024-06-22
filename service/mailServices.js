const nodemailer = require('nodemailer');
const user_Schema = require('../model/user_Schema')
const jwt = require('jsonwebtoken')

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rinkesh270698@gmail.com",
        pass: "vnelxggsxxgagbxo"
    }
});

// Export transporter
module.exports = transporter;

// Function to send reset password email
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
                // Send Email
                let info = await transporter.sendMail({
                    from: "nikhilpatil0759@gmail.com",
                    to: email,
                    subject: "Password reset link",
                    html: `<a href=${link}> click here to reset password </a>`,
                });
                res.status(200).send({
                    status: "success",
                    message: "Password Reset Email sent. Please check your email",
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong",
        });
    }
};

// Export the function
module.exports = sendUserResetPasswordEmail;
