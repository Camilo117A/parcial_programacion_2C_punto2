class Vehiculo {

    constructor(placa, propietario, horasEstacionado, tarifaBase, tipoVehiculo) {
        this.placa             = placa;
        this.propietario       = propietario;
        this.horasEstacionado  = horasEstacionado;
        this.tarifaBase        = tarifaBase;
        this.tipoVehiculo      = tipoVehiculo;
    }

    calcularTarifaTotal() {
        let recargo = 0;
        if      (this.tipoVehiculo === 'M') recargo = 2000;
        else if (this.tipoVehiculo === 'C') recargo = 5000;
        else if (this.tipoVehiculo === 'K') recargo = 8000;
        else if (this.tipoVehiculo === 'B') recargo = 15000;
        return (this.tarifaBase * this.horasEstacionado) + recargo;
    }

    hallarTotalDiario() {
        const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
        let total = 0;
        vehiculos.forEach(v => {
            let recargo = 0;
            if      (v.tipoVehiculo === 'M') recargo = 2000;
            else if (v.tipoVehiculo === 'C') recargo = 5000;
            else if (v.tipoVehiculo === 'K') recargo = 8000;
            else if (v.tipoVehiculo === 'B') recargo = 15000;
            total += (v.tarifaBase * v.horasEstacionado) + recargo;
        });
        return total;
    }
}
