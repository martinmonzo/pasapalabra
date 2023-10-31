class Rosco {
    constructor(nombreJugador, activo, segundos, comodines) {
        this.nombreJugador = nombreJugador;
        this.activo = activo;
        this.segundos = parseInt(segundos);
        this.segundos_iniciales = segundos;
        this.milisegundos = segundos * 1000;
        this.comodines = Array.from({ length: parseInt(comodines) }, (_, i) => i);

        this.aciertos = [];
        this.errores = [];
        this.pasadas = [];
        this.pendientes = Array.from(dom.DIV_LETRA);
    }

    actualizarRespuestas() {
        const letras = Array.from(dom.DIV_LETRA);

        this.aciertos = letras.filter(letra => letra.style.background == COLOR_FONDO_ACIERTO);
        this.errores = letras.filter(letra => letra.style.background == COLOR_FONDO_ERROR);
        this.pendientes = letras.filter(letra => letra.style.background == COLOR_FONDO_PENDIENTE || !letra.style.background);
        this.pasadas = letras.filter(letra => letra.style.background == COLOR_FONDO_PASADA);
    }

    letrasPendientes() {
        return Array.from(dom.DIV_LETRA).filter(letra => letra.style.background == COLOR_FONDO_PENDIENTE || !letra.style.background);
    }

    deshabilitarHabilitarComodin(boton) {
        const index = parseInt(boton.id);

        if (this.comodines.includes(index)) {
            this.comodines = this.comodines.filter(indexComodin => indexComodin !== index);
        } else {
            this.comodines.push(index);
        }

        dom.deshabilitarHabilitarComodin(boton)
    }

    establecerSegundos(segundos) {
        const segundosPrevios = this.segundos;

        this.segundos = segundos;
        this.milisegundos = this.segundos * 1000;

        if (this.segundos > 0 && segundosPrevios <= 0) {
            clearInterval(reloj.interval);
            reloj.interval = setInterval(correrTiempo, 100);
        }

        dom.refrescar();
    }

    sumarSegundos(segundos) {
        segundos = Math.min(this.segundos_iniciales, this.segundos + segundos);
        this.establecerSegundos(segundos);
    }

    restarSegundos(segundos) {
        segundos = Math.max(0, this.segundos - segundos);
        this.establecerSegundos(segundos);
    }
}
