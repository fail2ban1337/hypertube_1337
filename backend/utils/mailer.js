exports.sendMail = (to, subject, html) => {
    var nodemailer = require("nodemailer");
  
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "boumalekyounes@gmail.com",
        pass: "inboxteamdev22"
      }
    });
  
    var mailOptions = {
      from: "boumalekyounes@gmail.com",
      to: to,
      subject: subject,
      html: html
    };
    return transporter.sendMail(mailOptions);
  };