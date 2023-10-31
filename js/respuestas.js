function marcarRespuesta(letra, color) {
    if (esPasapalabraOError(color) && reloj.tiempoCorre) {
        reloj.pausar();
    }

    letra.style.background = color;
    roscoActivo.actualizarRespuestas();
    
    if (roscoActivo.pendientes.length == 0 && roscoActivo.pasadas.length > 0) {
        dom.marcarPasadasComoPendientes();
        for (const letra of roscoActivo.pasadas) {
            letra.style.background = COLOR_FONDO_PENDIENTE;
        }
        
        roscoActivo.actualizarRespuestas();
    }
    
    dom.refrescar();
}


function marcarRespuestaBoton(letra) {
    let color;

    if (letra.style.background == COLOR_FONDO_PENDIENTE || !letra.style.background) color = COLOR_FONDO_ACIERTO;
    else if (letra.style.background == COLOR_FONDO_ACIERTO) color = COLOR_FONDO_PASADA;
    else if (letra.style.background == COLOR_FONDO_PASADA) color = COLOR_FONDO_ERROR;
    else if (letra.style.background == COLOR_FONDO_ERROR) color = COLOR_FONDO_PENDIENTE;

    marcarRespuesta(letra, color);
}


function marcarRespuestaAutomatica(color) {
    const letrasPendientes = roscoActivo.letrasPendientes();
    if (!letrasPendientes || !letrasPendientes.length) return;
    
    const letra = letrasPendientes[0];

    marcarRespuesta(letra, color);
}


function esPasapalabraOError(color) {
    return color == COLOR_FONDO_PASADA || color == COLOR_FONDO_ERROR;
}
