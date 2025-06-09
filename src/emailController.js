const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send('Campos obrigatórios ausentes.');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER | "emanuelmalungo25@gmail.com",
      pass: process.env.EMAIL_PASS | "bfgkmaznebubsgrz"
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER | "emanuelmalungo25@gmail.com",
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).send('Erro ao enviar email.');
  }
};