let dom, reloj, roscoActivo, partida;


function iniciarJuego() {
    const url = new URL(window.location.href);
    const parametros = url.searchParams;

    const jugador1 = parametros.get('jugador1');
    const jugador2 = parametros.get('jugador2');
    const segundos = parametros.get('segundos');
    const comodines = parametros.get('comodines');

    
    if (!jugador1 || !jugador2 || !segundos || comodines == null) {
        window.location.href = window.location.href.replace('rosco.html', 'index.html').replace(window.location.search, '');
    }

    dom = new DOM();
    reloj = new Reloj();
    partida = new Partida(jugador1, jugador2, segundos, comodines);

    dom.refrescar();
}
