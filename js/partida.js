class Partida {
    constructor(jugador1, jugador2, segundos, comodines) {
        segundos = parseInt(segundos);
        this.comodines = parseInt(comodines);

        const rosco1 = new Rosco(jugador1, true, segundos, comodines);
        const rosco2 = new Rosco(jugador2, false, segundos, comodines);

        this.roscos = [rosco1, rosco2];
        roscoActivo = this.roscos[0];
    }

    obtenerRoscoActivo() {
        let rosco1 = partida.roscos[0];
        let rosco2 = partida.roscos[1];

        if (rosco1.activo) {
            return rosco1;
        } else if (rosco2.activo) {
            return rosco2;
        }
    }

    cambiarRoscoActivo() {
        if (reloj.tiempoCorre) return;
        partida.roscos[0].activo = !partida.roscos[0].activo;
        partida.roscos[1].activo = !partida.roscos[1].activo;

        roscoActivo = this.obtenerRoscoActivo();

        dom.refrescar();
    }
}
