document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-contacto');
  if (!formulario) return;

  const elementoCargando = formulario.querySelector('.mensaje-cargando');
  const elementoError = formulario.querySelector('.mensaje-error');
  const elementoExito = formulario.querySelector('.mensaje-exito');
  const botonEnvio = formulario.querySelector('.boton-enviar-formulario');

  function mostrarEstado(elemento, visible) {
    if (elemento) {
      elemento.classList.toggle('visible', visible);
    }
  }

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    mostrarEstado(elementoCargando, true);
    mostrarEstado(elementoError, false);
    mostrarEstado(elementoExito, false);
    if (botonEnvio) botonEnvio.disabled = true;

    const datosFormulario = new FormData(formulario);
    const cuerpoPeticion = Object.fromEntries(datosFormulario.entries());

    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuerpoPeticion)
      });

      const datos = await respuesta.json();

      if (!respuesta.ok || (datos.estado !== 'OK' && datos.status !== 'OK')) {
        throw new Error(datos.mensaje || datos.message || 'Error al procesar el mensaje.');
      }

      mostrarEstado(elementoExito, true);
      formulario.reset();
    } catch (error) {
      if (elementoError) {
        elementoError.textContent = error.message;
      }
      mostrarEstado(elementoError, true);
    } finally {
      mostrarEstado(elementoCargando, false);
      if (botonEnvio) botonEnvio.disabled = false;
    }
  });
});
