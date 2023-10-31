document.addEventListener("keydown", function(e) {
    e = e || window.event;
    if (e.code === ARROW_UP) {
        marcarRespuestaAutomatica(COLOR_FONDO_ACIERTO);
    } else if (e.code === ARROW_RIGHT) {
        marcarRespuestaAutomatica(COLOR_FONDO_PASADA);
    } else if (e.code === ARROW_DOWN) {
        marcarRespuestaAutomatica(COLOR_FONDO_ERROR);
    } else if (e.code === KEY_P) {
        reloj.pausarReanudar();
    } else if (e.code === KEY_C) {
        partida.cambiarRoscoActivo();
    } else if (e.code === KEY_R && (e.ctrlKey || e.metaKey)) {
        alert("Para evitar reiniciar la página involuntariamente, esta funcionalidad se encuentra deshabilitada. Para recargar la página debe hacer clic en el botón superior izquierdo correspondiente.")
        e.preventDefault();
    } else return;
});
