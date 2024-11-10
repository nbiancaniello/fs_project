const hbs = require('hbs');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');

const customerEmail = async (req, res) => {
   try {
      const { orderID, firstName, lastname, items, total, email, address } = req.body;
      const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 587,
         auth: {
            user: process.env.SMTP_GOOGLE_MAIL,
            pass: process.env.SMTP_GOOGLE_SECRET
         }
      });

      const template = hbs.compile(fs.readFileSync(path.join(__dirname, '../templates', 'orderEmailtemplate.hbs'), 'utf8'));

      // //Generate HTML with email template and form data
      const htmlToSend = template({ orderID, firstName, items, total, address });

      const mailOptions = {
         from: transporter.options.auth.user, // sender address
         to: email, // list of receivers
         subject: `Pedido Nro: ${orderID}`, // Subject line
         // text: message
         html: htmlToSend,
      };

      transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
            return res.status(500).send(err.message);
         }
         console.log('Message sent: %s', info.messageId);
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
         return res.render('emailConfirmation');

      });

   } catch (error) {
      console.error("Error while sending email:", error);
      res.status(500).send("There was an error while sending the email");
   }
};

const proofEmail = async (req, res) => {
   try {
      const { orderID, firstName, lastname, items, total, email, address } = req.body;
      const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 587,
         auth: {
            user: process.env.SMTP_GOOGLE_MAIL,
            pass: process.env.SMTP_GOOGLE_SECRET
         }
      });

      const message = `Nombre: ${firstName} ${lastname}
      \n
      Email: ${email}
      \n
      ${address ? `Enviar a: ${address}\n` : `Retira en el local`} 
      \n
      Items: ${items}
      \n
      Total a cobrar: ${total}
      \n
      `;

      const mailOptions = {
         from: transporter.options.auth.user, // sender address
         to: transporter.options.auth.user, // list of receivers
         subject: `Pedido de ${firstName} ${lastname} Nro: ${orderID}`, // Subject line
         text: message
      };

      transporter.sendMail(mailOptions, (err, info) => {
         if (err) {
            return res.status(500).send(err.message);
         }
         console.log('Message sent: %s', info.messageId);
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
         return res.render('emailConfirmation');

      });

   } catch (error) {
      console.error("Error while sending email:", error);
      res.status(500).send("There was an error while sending the email");
   }
};

module.exports = {
   customerEmail,
   proofEmail
};