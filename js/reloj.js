class Reloj {
    constructor() {
        this.tiempoCorre = false;
        this.interval = setInterval(correrTiempo, 100);
    }

    pausar() {
        this.tiempoCorre = false;
        this.consumirTiempo();
        dom.refrescar();
    }

    reanudar() {
        this.tiempoCorre = true;
        dom.refrescar();
    }

    pausarReanudar() {
        if (this.tiempoCorre) {
            this.pausar();
        } else {
            this.reanudar();
        }
    }

    consumirTiempo() {
        if (roscoActivo.segundos == 0) return;
    
        const milisegundosMin = roscoActivo.milisegundos - 500;
        const milisegundosMax = (roscoActivo.segundos) * 1000;

        roscoActivo.milisegundos = Math.max(milisegundosMin, milisegundosMax);    
        roscoActivo.segundos = Math.floor(roscoActivo.milisegundos / 1000);
    };
}


function correrTiempo() {
    if (!reloj.tiempoCorre) return;
    
    roscoActivo.milisegundos -= 100;
    roscoActivo.segundos = Math.floor(roscoActivo.milisegundos / 1000);

    if (roscoActivo.segundos > 0) {
        dom.refrescar();
    } else {
        reloj.pausar();
        clearInterval(this.interval);
    }
}
