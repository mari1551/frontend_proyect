document.getElementById("formulario").addEventListener("submit", function (event) {
    if (!validarFormulario()) {
        event.preventDefault();
    } else {
        event.preventDefault();

        alert(
            'nombre: ' + document.getElementById('nombre').value + '\n' +
            'email: ' + document.getElementById('email').value + '\n' +
            'country: ' + document.getElementById('country').value + '\n' +
            'tema: ' + document.getElementById('tema').value + '\n'
        )
    }
});

function validarFormulario() {
    let camposTexto = document.querySelectorAll('input[type="text"]');
    let validacionCorrecta = true;

    camposTexto.forEach(function (campo) {
        let errorCampo = document.getElementById("error" + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));
        if (campo.value.length == '') {
            mostrarError(errorCampo, "¡Este campo es requerido!");
            validacionCorrecta = false;

        } else if (campo.value.length > 0 && campo.value.length < 3) {
            mostrarError(errorCampo, "Debe tener al menos 3 letras.");
            validacionCorrecta = false;

        } else {
            ocultarError(errorCampo);
        }
    });

    let aceptoTerminos = document.getElementById("aceptoTerminos");
    let errorAceptoTerminos = document.getElementById("errorAceptoTerminos");

    if (!aceptoTerminos.checked) {
        mostrarError(errorAceptoTerminos, "Debes aceptar los términos y condiciones.");
        validacionCorrecta = false;
    } else {
        ocultarError(errorAceptoTerminos);
    }

    // Validación de email
    let email = document.getElementById("email");
    let errorEmail = document.getElementById("errorEmail");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        mostrarError(errorEmail, "Ingrese un correo electrónico válido.");
        validacionCorrecta = false;
    } else {
        ocultarError(errorEmail);
    }

    // Validación de País
    let country = document.getElementById("country");
    let errorCountry = document.getElementById("errorCountry");

    if (country.value === "") {
        mostrarError(errorCountry, "Selecciona tu actividad.");
        validacionCorrecta = false;
    } else {
        ocultarError(errorCountry);
    }

    // Validación Tema
    let tema = document.getElementById("tema");
    let errorTema = document.getElementById("errorTema");

    if (tema.value === "") {
        mostrarError(errorTema, "Selecciona tema.");
        validacionCorrecta = false;
    } else {
        ocultarError(errorTema);
    }

    return validacionCorrecta;
}

function mostrarError(elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";
}

function ocultarError(elemento) {
    elemento.textContent = "";
    elemento.style.display = "none";
}

