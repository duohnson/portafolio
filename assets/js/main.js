document.addEventListener('DOMContentLoaded', () => {
  const capaIntro = document.getElementById('intro-cli');
  const contenidoIntro = document.getElementById('contenido-intro-cli');

  if (capaIntro && contenidoIntro) {
    document.body.style.overflow = 'hidden';

    const lineas = [
      { texto: 'ssh duohnson@10.0.0.42', tipo: 'comando', terminal: '$ ' },
      { texto: 'duohnson@10.0.0.42\'s password: ', tipo: 'pausa', tiempo: 400 },
      { texto: '\nWelcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-89-generic x86_64)\n\nLast login: ' + new Date().toDateString() + ' from 192.168.1.3\n\n', tipo: 'salida', tiempo: 400 },
      { texto: 'cd portafolio', tipo: 'comando', terminal: 'duohnson@10.0.0.42:~$ ' },
      { texto: 'npm run serve', tipo: 'comando', terminal: 'duohnson@10.0.0.42:~/portafolio$ ' },
      { texto: '\n> portafolio@1.0.0 serve\n> Iniciando el servidor...\n\n  > Local: http://localhost:3000/\n  > Network: use `--host` to expose\n\nready in 125ms.\n\n', tipo: 'salida', tiempo: 800 }
    ];

    let htmlActual = '';

    const escribirTexto = async (texto, velocidad = 40) => {
      for (let i = 0; i < texto.length; i++) {
        htmlActual += texto.charAt(i);
        contenidoIntro.innerHTML = htmlActual + '<span class="cursor-cli"></span>';
        await new Promise(r => setTimeout(r, velocidad + (Math.random() * 20)));
      }
    };

    const iniciarIntro = async () => {
      for (const linea of lineas) {
        if (linea.tipo === 'comando') {
          htmlActual += `<span>${linea.terminal}</span>`;
          contenidoIntro.innerHTML = htmlActual + '<span class="cursor-cli"></span>';
          await new Promise(r => setTimeout(r, 400));
          await escribirTexto(linea.texto);
          await new Promise(r => setTimeout(r, 200));
          htmlActual += '\n';
          contenidoIntro.innerHTML = htmlActual + '<span class="cursor-cli"></span>';
        } else if (linea.tipo === 'salida' || linea.tipo === 'pausa') {
          if (linea.texto) {
            htmlActual += linea.texto;
            contenidoIntro.innerHTML = htmlActual + '<span class="cursor-cli"></span>';
          }
          await new Promise(r => setTimeout(r, linea.tiempo || 500));
        }
      }

      await new Promise(r => setTimeout(r, 500));
      capaIntro.classList.add('oculto');
      document.body.style.overflow = '';
      setTimeout(() => capaIntro.remove(), 1000);
    };

    iniciarIntro();
  }

  const elementoEstado = document.querySelector('[data-scramble]');
  if (elementoEstado) {
    const textoFinal = elementoEstado.getAttribute('data-scramble');
    if (textoFinal) {
      elementoEstado.textContent = textoFinal;
    }
  }

  const botonMenu = document.querySelector('.boton-menu-movil');
  const menuMovil = document.querySelector('.menu-movil-desplegable');

  if (botonMenu && menuMovil) {
    function alternarMenu() {
      const estaAbierto = menuMovil.classList.toggle('abierto');
      botonMenu.classList.toggle('abierto', estaAbierto);
      botonMenu.setAttribute('aria-expanded', String(estaAbierto));
    }

    botonMenu.addEventListener('click', alternarMenu);

    menuMovil.querySelectorAll('a').forEach((enlace) => {
      enlace.addEventListener('click', () => {
        menuMovil.classList.remove('abierto');
        botonMenu.classList.remove('abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const secciones = document.querySelectorAll('section[id]');
  const enlacesNavegacion = document.querySelectorAll('.enlace-navegacion');

  if (secciones.length > 0 && enlacesNavegacion.length > 0) {
    const observadorSecciones = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const idActual = entrada.target.getAttribute('id');
          enlacesNavegacion.forEach((enlace) => {
            const destino = enlace.getAttribute('href');
            enlace.classList.toggle('activo', destino === `#${idActual}`);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    secciones.forEach((seccion) => observadorSecciones.observe(seccion));
  }

  const pestanasCodigo = document.querySelectorAll('.pestana-codigo');
  const bloquesCodigo = document.querySelectorAll('.bloque-codigo');

  pestanasCodigo.forEach((pestana) => {
    pestana.addEventListener('click', () => {
      const identificador = pestana.getAttribute('data-pestana');

      pestanasCodigo.forEach((item) => item.classList.remove('activa'));
      bloquesCodigo.forEach((bloque) => bloque.classList.remove('activo'));

      pestana.classList.add('activa');
      const bloqueSeleccionado = document.getElementById(`codigo-${identificador}`);
      if (bloqueSeleccionado) {
        bloqueSeleccionado.classList.add('activo');
      }
    });
  });

  const elementosInteractivos = document.querySelectorAll('.tarjeta-servicio, .fila-proyecto, .tarjeta-categoria-stack');
  elementosInteractivos.forEach((elemento) => {
    elemento.addEventListener('mousemove', (evento) => {
      const rectangulo = elemento.getBoundingClientRect();
      const posicionX = evento.clientX - rectangulo.left;
      const posicionY = evento.clientY - rectangulo.top;
      elemento.style.setProperty('--raton-x', `${posicionX}px`);
      elemento.style.setProperty('--raton-y', `${posicionY}px`);
    });
  });

  const botonesCopiar = document.querySelectorAll('.boton-copiar-correo');
  botonesCopiar.forEach((boton) => {
    boton.addEventListener('click', async () => {
      const correo = boton.getAttribute('data-correo') || 'duohnson@gmail.com';
      try {
        await navigator.clipboard.writeText(correo);
        const textoBoton = boton.querySelector('.texto-copiar');
        if (textoBoton) {
          textoBoton.textContent = 'Copiado';
        }
        boton.classList.add('copiado');
        setTimeout(() => {
          if (textoBoton) {
            textoBoton.textContent = 'Copiar';
          }
          boton.classList.remove('copiado');
        }, 2000);
      } catch (error) {
        console.error('No se pudo copiar el correo:', error);
      }
    });
  });

  const elementosRevelar = document.querySelectorAll('.revelar');
  if (elementosRevelar.length > 0) {
    const observadorRevelar = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('revelado');
          observadorRevelar.unobserve(entrada.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elementosRevelar.forEach((elemento) => observadorRevelar.observe(elemento));
  }
});