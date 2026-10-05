const express = require('express');
const ruta = require('path');
const cors = require('cors');
const helmet = require('helmet');
const limiteTasa = require('express-rate-limit');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const servidor = express();
const puerto = process.env.PORT || 8652;
const anfitrion = process.env.HOST || '0.0.0.0';

servidor.use(helmet({
  contentSecurityPolicy: false
}));

servidor.use(cors());
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));

const limitadorGeneral = limiteTasa({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { estado: 'ERROR', mensaje: 'Demasiadas peticiones. Intenta más tarde.' },
  standardHeaders: true,
  legacyHeaders: false
});

const limitadorContacto = limiteTasa({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { estado: 'ERROR', mensaje: 'Has enviado demasiados mensajes. Por favor espera un momento.' },
  standardHeaders: true,
  legacyHeaders: false
});

servidor.use(limitadorGeneral);
servidor.use(express.static(ruta.join(__dirname)));

async function enviarCorreoContacto(datos) {
  const anfitrionSmtp = process.env.SMTP_HOST;
  const usuarioSmtp = process.env.SMTP_USER;
  const claveSmtp = process.env.SMTP_PASS;
  const correoDestino = process.env.CONTACT_EMAIL || 'duohnson@gmail.com';

  if (!anfitrionSmtp || !usuarioSmtp || !claveSmtp) {
    console.log('Mensaje de contacto recibido:', datos);
    return true;
  }

  const transportador = nodemailer.createTransport({
    host: anfitrionSmtp,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: usuarioSmtp,
      pass: claveSmtp
    }
  });

  await transportador.sendMail({
    from: usuarioSmtp,
    to: correoDestino,
    replyTo: datos.correo,
    subject: `[Portafolio] ${datos.asunto}`,
    text: `De: ${datos.nombre} (${datos.correo})\n\nAsunto: ${datos.asunto}\n\nMensaje:\n${datos.mensaje}`
  });

  return true;
}

function procesarContacto(peticion, respuesta) {
  const nombre = (peticion.body.nombre || peticion.body.name || '').trim();
  const correo = (peticion.body.correo || peticion.body.email || '').trim();
  const asunto = (peticion.body.asunto || peticion.body.subject || '').trim();
  const mensaje = (peticion.body.mensaje || peticion.body.message || '').trim();

  if (!nombre || !correo || !asunto || !mensaje) {
    return respuesta.status(400).json({
      estado: 'ERROR',
      status: 'ERROR',
      mensaje: 'Todos los campos son obligatorios.'
    });
  }

  const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!expresionCorreo.test(correo)) {
    return respuesta.status(400).json({
      estado: 'ERROR',
      status: 'ERROR',
      mensaje: 'Por favor ingresa un correo electrónico válido.'
    });
  }

  enviarCorreoContacto({ nombre, correo, asunto, mensaje })
    .then(() => {
      respuesta.json({
        estado: 'OK',
        status: 'OK',
        mensaje: 'Mensaje enviado correctamente.'
      });
    })
    .catch((error) => {
      console.error('Error al enviar correo:', error.message);
      respuesta.status(500).json({
        estado: 'ERROR',
        status: 'ERROR',
        mensaje: 'No fue posible enviar el mensaje. Intenta de nuevo más tarde o contactarme a duohnson@gmail.com'
      });
    });
}

servidor.post('/api/contacto', limitadorContacto, procesarContacto);
servidor.post('/api/contact', limitadorContacto, procesarContacto);

servidor.get('*', (peticion, respuesta) => {
  respuesta.sendFile(ruta.join(__dirname, 'index.html'));
});

servidor.listen(puerto, anfitrion, () => {
  console.log(`http://${anfitrion}:${puerto}`);
});
