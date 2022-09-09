const nodemailer = require("nodemailer");
require('dotenv').config();


exports.sendLink = (link, email, req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILERUSER, // generated ethereal user
      pass: process.env.NODEMAILERPASS, // generated ethereal password
    },
  });

  return transporter.sendMail({
    from: `${process.env.NODEMAILERUSER}`, // sender address
    to: `${email}`, // list of receivers
    subject: `Password Reset Link`, // Subject line
    html: `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>click on the link below to reset password</p>
            <a href=${link}>click here to reset password</a>
          </body>
        </html>`, // plain text body
  }, function (err) {
    if (err) {
      return res.status(404).redirect("/404");
    }
    return res.status(202).redirect("/login");
  });
}

exports.sendRegisterLink = (user) => {
  let transporter = nodemailer.createTransport({
    //  host: process.env.NODEMAILERSMTP,
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILERUSER, // generated ethereal user
      pass: process.env.NODEMAILERPASS, // generated ethereal password
    },
  });

  return transporter.sendMail({
    from: `${process.env.NODEMAILERUSER}`, // sender address
    to: `info@dechconsult.com`, // list of receivers
    subject: `Regisration update`, // Subject line
    html: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p>Image: <amp-img src="https://dechconsult.com/assets/images/logo.png" width="16" height="16"/></p>
          <p>A new user join dechdash info: ${user.email}\n${user.phone_number}\n${user.business_name}\n${user.contact_person}\n${user.trade}\n</p>
        </body>
      </html>`, // plain text body
  }, function (err) {
    if (err) {
      return console.log(err)
    }
    return console.log('done');
  });
}

exports.sendWelcomeLink = (user) => {
  let transporter = nodemailer.createTransport({
    //  host: process.env.NODEMAILERSMTP,
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILERUSER, // generated ethereal user
      pass: process.env.NODEMAILERPASS, // generated ethereal password
    },
  });

  transporter.sendMail({
    from: `${process.env.NODEMAILERUSER}`, // sender address
    to: `${user.email}`, // list of receivers
    subject: `Weelcome to dechdash`, // Subject line
    html: `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <style amp4email-boilerplate>body{visibility:hidden}</style>
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
        </head>
        <body>
          <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
          <p>Welcome to Dech Dashboard,
          Dear ${user.business_name},
          Thank you for choosing our ${user.trade} Dashboard for analyzing your business data</p>
        </body>
      </html>`, // plain text body
  }, function (err) {
    if (err) {
      return console.log(err)
    }
    return console.log('done');
  });
}