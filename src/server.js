const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const dotenv = require('dotenv');
const enviarEmail = require('./emailController');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', enviarEmail);

// Exporta a função serverless
module.exports.handler = serverless(app);