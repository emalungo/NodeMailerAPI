const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async function enviarEmail(req, res) {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).send('Campos obrigatórios ausentes.');
    }

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "emanuelmalungo25@gmail.com",
          pass: "bfgkmaznebubsgrz"
        }
      });

    const mailOptions = {
        from: "emanuelmalungo25@gmail.com",
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).send('Erro ao enviar email.');
    }
};
