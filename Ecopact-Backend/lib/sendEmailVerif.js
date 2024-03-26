const nodemailer = require("nodemailer");

const randomNumber = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};

module.exports = async function sendEmailVerif(req, res, next) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL_ADRESS, //change to Anpe host email
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });
  const otpCode = randomNumber();
  const message = {
    from: process.env.APP_EMAIL_ADRESS, //change to Anpe email
    to: `${req.body.email}`,
    subject: "Change your password",
    text:
      "Hello, thank you for using ECOPACT as a solution for your water resource analysis. Enter the OTP code to proceed to password verification!",
    html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>CodePen - OTP Email Template</title>
      </head>
      <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Password Recovery</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Thank you for choosing ECOPACT. Use the following OTP to complete your Password Recovery Procedure.</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
            <p style="font-size:0.9em;">Regards,<br />Ecopact</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>ECOPACT</p>
              <p>Anpe Company</p>
              <p>Tunisia</p>
            </div>
          </div>
        </div>
      </body>
      </html>`,
  };
  req.body.otpCode = otpCode;
  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to send verification email' });
    }
    next();
  });
};
