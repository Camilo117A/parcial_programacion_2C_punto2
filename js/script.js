function mostrarFormRegistro() {
    const seccion = document.getElementById('seccionRegistro');
    seccion.style.display = 'block';
    seccion.scrollIntoView({ behavior: 'smooth' });
}

function ocultarFormRegistro() {
    document.getElementById('seccionRegistro').style.display = 'none';
    limpiarFormulario();
}

function mostrarCamposExtra() {
    const tipo           = document.getElementById("tipoVehiculoId").value;
    const campoCilindraje    = document.getElementById("campoCilindraje");
    const campoNumeroPuertas = document.getElementById("campoNumeroPuertas");
    campoCilindraje.style.display    = (tipo === 'M') ? 'block' : 'none';
    campoNumeroPuertas.style.display = (tipo === 'C') ? 'block' : 'none';
}
