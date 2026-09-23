document.addEventListener('DOMContentLoaded', () => {
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