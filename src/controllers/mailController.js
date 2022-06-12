
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: 'ampa.estalella.i.graells@gmail.com',
    pass: '#AmpaEG2' // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: 'vindication@enron.com',
  to: 'friendsofenron@gmail.com, enemiesofenron@gmail.com',
  subject: 'Invoices due', 
  html:''
};


const emailSend = async function (req, res) {
  try {
    if (req.body != null) {
        const data = req.body;
        mailOptions.from = data["from"];
        mailOptions.to = data["to"];
        mailOptions.subject = data["subject"];
        mailOptions.html = `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <p>Nombre contacto: ${data["of"]}</p>
            <p>Email Usuario: ${data["from"]}</p>
            <p>Asunto: ${data["subject"]}</p>
            <p>${data["text"]}</p>
          </body>
        </html>`;
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            res.status(400).send(error);
          } else {
            res.status(200).send(info);
          }
        });
        
    }
  } catch (error) {
      res.status(400).send(error.message);
  }
}

module.exports = {emailSend}