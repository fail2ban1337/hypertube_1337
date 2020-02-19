const mailer = require("./mailer");

module.exports = sendResetPasswordEmail = (to, username, email_token) => {
  try {
    const template = `<p style="font-size: 2em;">Dear <b style="color: green;">${username}</b>,<br/>
                    To Reset your Password <a href="http://localhost:3000/reset_password/${email_token}">Click Here</a></p>`;

    mailer.sendMail(to, "HYPERTUBE - Reset Password", template);
  } catch (error) {
    console.error(error);
  }
};
