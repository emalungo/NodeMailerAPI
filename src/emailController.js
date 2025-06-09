const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send('Campos obrigatórios ausentes.');
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // importante para Gmail
    auth: {
      user: "emanuelmalungo25@gmail.com",
      pass: "bfgkmaznebubsgrz" // de preferência use variável de ambiente
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
});

// Exporta a função serverless
module.exports = serverless(app);
