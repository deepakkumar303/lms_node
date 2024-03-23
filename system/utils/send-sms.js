require("dotenv").config();

const sendMobileOtp = async (param) => {
  const accountSid = process.env.TWILIO_AUTH_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: `Your OTP is: ${param.otp}. This OTP is valid for 5 minutes.`,
      from: "+12402417770",
      to: `+91${param.mobile}`,
    })
    .then((message) => console.log("message.sid", message.sid))
    .catch((e) => {
      console.log("e", e);
    });
};

module.exports = {
  sendMobileOtp,
};
