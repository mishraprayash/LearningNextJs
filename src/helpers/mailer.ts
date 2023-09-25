import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import next from "next";

export const sendEmail = async (email: string,emailType: string,userId: string) => {
  try {
    // taking the userID and hashing it to generate a token for verification
    const hashedToken = await bcryptjs.hash(userId, 10);
    // finding the user in the database and updating the token
    if (emailType === "VERIFY_EMAIL") {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          verifyToken: hashedToken,
          verifyTokenExpiration: Date.now() + 60 * 60 * 1000,
        },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET_PASSWORD") {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiration: Date.now() + 60 * 60 * 1000,
        },
        { new: true, runValidators: true }
      );
    }
    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 2525,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: "testing@gmail.com",
      to: email,
      html:
        emailType === "VERIFY_EMAIL"
          ? `
            <h2>Verify Your Email</h2>
            <p>Please click on the link below to verify your email</p>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Verify</a>
            `
          : `<h2>Reset your password</h2> 
            <p>Please click on the link below to reset your password</p>
            <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">Reset Password</a>
            `,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
