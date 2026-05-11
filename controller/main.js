function crearVehiculo() {

    const placa            = document.getElementById("placaId").value;
    const propietario      = document.getElementById("propietarioId").value;
    const horasEstacionado = parseInt(document.getElementById("horasId").value);
    const tarifaBase       = parseInt(document.getElementById("tarifaBaseId").value);
    const tipoVehiculo     = document.getElementById("tipoVehiculoId").value;

    let vehiculo;
    if (tipoVehiculo === 'M') {
        const cilindraje = parseInt(document.getElementById("cilindrajeId").value);
        vehiculo = new Moto(placa, propietario, horasEstacionado, tarifaBase, cilindraje);
    } else if (tipoVehiculo === 'C') {
        const numeroPuertas = parseInt(document.getElementById("numeroPuertasId").value);
        vehiculo = new Carro(placa, propietario, horasEstacionado, tarifaBase, numeroPuertas);
    } else {
        vehiculo = new Vehiculo(placa, propietario, horasEstacionado, tarifaBase, tipoVehiculo);
    }

    vehiculo.tarifaTotal = vehiculo.calcularTarifaTotal();
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    const editIndex = document.getElementById("formVehiculo").dataset.editIndex;

    if (editIndex !== undefined && editIndex !== "") {
        vehiculos[parseInt(editIndex)] = vehiculo;
        delete document.getElementById("formVehiculo").dataset.editIndex;
    } else {
        vehiculos.push(vehiculo);
    }

    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    limpiarFormulario();
    mostrarVehiculos();
}

function mostrarVehiculos() {
    const tbody = document.querySelector('#tablaVehiculos tbody');
    tbody.innerHTML = '';

    const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    vehiculos.forEach((v, index) => {
        const fila = `<tr>
            <td>${index + 1}</td>
            <td>${v.placa}</td>
            <td>${v.propietario}</td>
            <td>${v.horasEstacionado}</td>
            <td>${v.tarifaBase}</td>
            <td>${v.tipoVehiculo}</td>
            <td>${v.cilindraje !== undefined ? v.cilindraje : '-'}</td>
            <td>${v.numeroPuertas !== undefined ? v.numeroPuertas : '-'}</td>
            <td>$${v.tarifaTotal.toLocaleString('es-CO')}</td>
            <td><button type="button" class="btn btn-warning" onclick="actualizarVehiculo(${index})">Actualizar</button></td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarVehiculo(${index})">Eliminar</button></td>
        </tr>`;
        tbody.innerHTML += fila;
    });

    const aux = new Vehiculo(null, null, 0, 0, null);
    document.getElementById("totalDiario").textContent = "$" + aux.hallarTotalDiario().toLocaleString('es-CO');
}

function eliminarVehiculo(index) {
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    vehiculos.splice(index, 1);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    mostrarVehiculos();
}

function actualizarVehiculo(index) {
    const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    const v = vehiculos[index];

    document.getElementById("placaId").value         = v.placa;
    document.getElementById("propietarioId").value   = v.propietario;
    document.getElementById("horasId").value         = v.horasEstacionado;
    document.getElementById("tarifaBaseId").value    = v.tarifaBase;
    document.getElementById("tipoVehiculoId").value  = v.tipoVehiculo;

    mostrarCamposExtra();

    if (v.cilindraje !== undefined) document.getElementById("cilindrajeId").value     = v.cilindraje;
    if (v.numeroPuertas !== undefined) document.getElementById("numeroPuertasId").value = v.numeroPuertas;

    document.getElementById("formVehiculo").dataset.editIndex = index;
    mostrarFormRegistro();
}

function limpiarFormulario() {
    document.getElementById("placaId").value        = "";
    document.getElementById("propietarioId").value  = "";
    document.getElementById("horasId").value        = "";
    document.getElementById("tarifaBaseId").value   = "";
    document.getElementById("cilindrajeId").value   = "";
    document.getElementById("numeroPuertasId").value = "";
    delete document.getElementById("formVehiculo").dataset.editIndex;
    mostrarCamposExtra();
}

mostrarVehiculos();
