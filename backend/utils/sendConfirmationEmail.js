const mailer = require("./mailer");

module.exports = sendConfirmationEmail = (to, username, email_token) => {
  try {
    const template = `<p style="font-size: 2em;">Dear <b style="color: green;">${username}</b>,<br/>
                    To Verify your account <a href="http://127.0.0.1:3000/verify_email/${email_token}">Click Here</a></p>`;

    mailer.sendMail(to, "HYPERTUBE - Confirm Account", template);
  } catch (error) {
    console.error(error);
  }
};