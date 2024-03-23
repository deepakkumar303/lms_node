const nodemailer = require("nodemailer");

const sendEmailOtp = async (param) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "anamikadevi.g@invicious.in",
      pass: "nkosamgzeixqzjog", //created from app pwd
    },
  });

  const emailTemplate = `Dear ${param.name},

Thank you for choosing Batcave. To ensure the security of your account, we have generated a One-Time Password (OTP) for you. Please use the following OTP to complete the authentication process:

Your One-Time Password (OTP): ${param.otp}
Your mobile One-Time Password (OTP): ${param.mobile_otp}


Please enter this OTP on the Batcave platform within the next 5 minutes to verify your identity and complete the login process.

If you did not attempt to log in or if you have any concerns about the security of your account, please contact our support team immediately at suport@batcave.in.

Thank you for choosing Batcave.

Best regards,
Batcave
      `;

  const mailOptions = {
    to: param.email,
    from: "anamikadevi.g@invicious.in",
    subject: "Otp",
    text: emailTemplate,
  };
  const response = await transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmailOtp,
};
