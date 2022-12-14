const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p><h1>MO SWACHA RAJYA</h1></p>
    <h3>Rate our work</h3>
    <ul>  
      <a href="https://www.youtube.com/">click here</a>
       </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.YOURDOMAIN.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    service:"Gmail",
    auth: {
        user: 'murmudamodar111@gmail.com', // generated ethereal user
        pass: 'vmwqbaicrpmwdeyp'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    } 
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'murmudamodar111@gmail.com', // sender address
    to: ['biswakirandas@gmail.com','mdamu9@gmail.com'], // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello kaise ho', // plain text body
      html: output // html body
  };

  // send mail with defined transport object9999
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(3000, () => console.log('Server started...'));