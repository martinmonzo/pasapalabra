class DOM {
    constructor() {
        this.ICONO_PLAY = document.getElementById("iconoPlay");
        this.ICONO_PAUSA = document.getElementById("iconoPausa");
        this.DIV_LETRA = document.getElementsByClassName("letra");
        this.DIV_ACIERTOS = document.getElementById("aciertos");
        this.DIV_ERRORES = document.getElementById("errores");
        this.DIV_SEGUNDOS = document.getElementById("segundos");
        this.LETRA_CENTRAL = document.getElementById("letraCentral");
        this.NOMBRE_JUGADOR = document.getElementById("nombreJugador");
        this.COMODINES = document.getElementById("comodines");
    }

    deshabilitarHabilitarComodin(boton) {
        boton.classList.toggle("disabled");
    }

    marcarPasadasComoPendientes() {
        for (const letra of roscoActivo.pasadas) {
            letra.style.background = COLOR_FONDO_PENDIENTE;
        }
    }

    refrescarRoscoActivo() {
        for (const letra of this.DIV_LETRA) {
            if (roscoActivo.aciertos.includes(letra)) {
                letra.style.background = COLOR_FONDO_ACIERTO;
            } else if (roscoActivo.errores.includes(letra)) {
                letra.style.background = COLOR_FONDO_ERROR;
            } else if (roscoActivo.pasadas.includes(letra)) {
                letra.style.background = COLOR_FONDO_PASADA;
            } else if (roscoActivo.pendientes.includes(letra)) {
                letra.style.background = COLOR_FONDO_PENDIENTE;
            }
        }

        if (roscoActivo.pendientes.length && roscoActivo.segundos > 0) {
            this.LETRA_CENTRAL.style.fontSize = "35vh";
            this.LETRA_CENTRAL.innerHTML = roscoActivo.pendientes[0].innerText;
        } else {
            this.LETRA_CENTRAL.style.fontSize = "5vh";
            this.LETRA_CENTRAL.innerHTML = "Juego terminado";
        }

        this.refrescarDatosRoscoActivo();
    }

    refrescarDatosRoscoActivo() {
        this.NOMBRE_JUGADOR.innerHTML = roscoActivo.nombreJugador;
        this.DIV_ACIERTOS.innerHTML = roscoActivo.aciertos.length;
        this.DIV_ERRORES.innerHTML = roscoActivo.errores.length;
        this.DIV_SEGUNDOS.innerHTML = roscoActivo.segundos;

        let comodinesHTML = '';
        for (let i = 0; i < partida.comodines; i++) {
            let disabled = roscoActivo.comodines.includes(i) ? '' : 'disabled';
            comodinesHTML += `
                <div id="${i}" onclick="roscoActivo.deshabilitarHabilitarComodin(this);"
                class="${disabled} circulo botonCircular comodin deg-comodin${i}">
                    <i class="fa fa-trophy" aria-hidden="true"></i>
                </div>
            `;
        }
        this.COMODINES.innerHTML = comodinesHTML;
    }

    refrescarBotonPlayPausa() {
        if (reloj.tiempoCorre) {
            this.ICONO_PAUSA.style.display = "block";
            this.ICONO_PLAY.style.display = "none";
        } else {
            this.ICONO_PLAY.style.display = "block";
            this.ICONO_PAUSA.style.display = "none";
        }
    }

    refrescar() {
        this.refrescarRoscoActivo();
        this.refrescarBotonPlayPausa();
    }
}
