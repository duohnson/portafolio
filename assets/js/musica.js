(() => {
  const musica = document.getElementById('musica-ambiente');
  const boton = document.getElementById('boton-musica');
  const texto = document.getElementById('texto-musica');
  if (!musica || !boton || !texto) return;

  let inicioAutomatico = true;
  let reanudarAlVolver = false;
  musica.volume = 0.15;

  function actualizarBoton() {
    const reproduciendo = !musica.paused;
    boton.setAttribute('aria-pressed', String(reproduciendo));
    boton.setAttribute('aria-label', reproduciendo ? 'Pausar música de Zelda' : 'Activar música de Zelda');
    texto.textContent = reproduciendo ? 'Pausar' : 'Música';
  }

  async function reproducir() {
    try {
      await musica.play();
      inicioAutomatico = false;
      retirarInicioAutomatico();
    } catch (error) {
      if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
        texto.textContent = 'Sin audio';
        boton.setAttribute('aria-label', 'No se pudo cargar la música');
      }
    }
  }

  function iniciarConInteraccion(evento) {
    if (inicioAutomatico && !boton.contains(evento.target)) reproducir();
  }

  function retirarInicioAutomatico() {
    document.removeEventListener('click', iniciarConInteraccion);
    document.removeEventListener('keydown', iniciarConInteraccion);
  }

  boton.addEventListener('click', () => {
    inicioAutomatico = false;
    reanudarAlVolver = false;
    retirarInicioAutomatico();
    if (musica.paused) reproducir();
    else musica.pause();
  });

  musica.addEventListener('play', actualizarBoton);
  musica.addEventListener('pause', actualizarBoton);
  musica.addEventListener('error', () => {
    inicioAutomatico = false;
    retirarInicioAutomatico();
    texto.textContent = 'Sin audio';
    boton.setAttribute('aria-label', 'No se pudo cargar la música');
    boton.setAttribute('aria-pressed', 'false');
    boton.disabled = true;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      reanudarAlVolver = !musica.paused;
      musica.pause();
    } else if (reanudarAlVolver) {
      reanudarAlVolver = false;
      reproducir();
    }
  });

  document.addEventListener('click', iniciarConInteraccion);
  document.addEventListener('keydown', iniciarConInteraccion);
  reproducir();
})();
