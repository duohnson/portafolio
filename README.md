# DUOHNSON

## Descripción
Portafolio personal de desarrollo backend, redes y administración Linux. Este proyecto muestra mis habilidades técnicas y formas de contacto.

## Tecnologías utilizadas
- Node.js
- Template
- CSS3 - HTML5
- JavaScript
- Cloudflare Tunnel
- SMTP para envío de emails
- Seguridad básica

## Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/duohnson/portafolio
    ```
2. Instala las dependencias:
   ```bash
    npm install
    ```
3. Configura las variables de entorno en un archivo `.env`:
    ```
    PORT=8652
    HOST=127.0.0.1
    SMTP_HOST=
    SMTP_PORT=587
    SMTP_USER=
    SMTP_PASS=
    CONTACT_EMAIL=duohnson@gmail.com
    ```
4. Modificar el sitio web para agregar tu información personal, proyectos y formas de contacto.

5. Inicia el servidor:
   ```bash
    npm start
    ```
6. Accede a tu portafolio en `http://localhost:8652`.

## Estilo y música

El estilo inspirado en Zelda está en `assets/css/main.css`. Las secciones y la navegación mantienen la estructura del portafolio.

La canción está en `src/music/cancion-zelda.m4a` y se controla desde `assets/js/musica.js`. Se reproduce en bucle al 5 % de volumen. Si el navegador bloquea el inicio automático, comienza tras el primer clic o una tecla. El botón de la cabecera permite pausarla; también se pausa al ocultar la pestaña.

## Despliegue
Para desplegar tu portafolio, puedes usar servicios como Heroku, Vercel o DigitalOcean. Asegúrate de configurar las variables de entorno en el entorno de producción.

En mi caso yo uso un servidor local con Cloudflare Tunnel para exponerlo públicamente sin necesidad de un hosting tradicional.

Para más información, puedes seguir mi guía paso a paso para configurar Cloudflare Tunnel con tu aplicación Node.js: https://github.com/duohnson/configure-cloudflared-tunnel

¿Porque uso Cloudflare Tunnel?

Me permite exponer mi servidor local de forma segura sin necesidad de configurar DNS o abrir puertos en mi router. Es ideal para proyectos personales y pruebas rápidas. Además, Cloudflare ofrece protección contra ataques DDoS y otras amenazas, lo que añade una capa extra de seguridad a mi portafolio.

## Licencia
Este proyecto se distribuye bajo la licencia GNU GPL v3.0. Puedes consultar el texto completo en el archivo `LICENSE`.

Créditos: este sitio toma inspiración visual y estructural en parte del portafolio de Jesús Chapman (https://jesuschapman.me/) y la sección de OpenLat.dev (https://openlat.dev/JesusChapman).

UTILIZAR SOLO PARA FINES EDUCATIVOS, NO PARA PROYECTOS REALES O DE PRODUCCIÓN. ESTE PROYECTO ES UN EJEMPLO BÁSICO Y RAPIDO PARA MI PORTAFOLIO, Y NO INCLUYE TODAS LAS MEJORES PRÁCTICAS DE SEGURIDAD O ESCALABILIDAD.
