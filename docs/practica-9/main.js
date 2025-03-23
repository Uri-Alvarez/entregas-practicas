document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const mensajeExito = document.getElementById("mensaje-exito");
    const loader = document.getElementById("loader");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let valido = true;

        // Validación del nombre
        if (!/^[a-zA-Z\s]+$/.test(nombre.value.trim())) {
            mostrarError("error-nombre", "El nombre solo puede contener letras y espacios.");
            valido = false;
        } else {
            limpiarError("error-nombre");
        }

        // Validación del correo
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
            mostrarError("error-correo", "El correo no es válido.");
            valido = false;
        } else {
            limpiarError("error-correo");
        }

        // Validación de la contraseña
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password.value)) {
            mostrarError("error-password", "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
            valido = false;
        } else {
            limpiarError("error-password");
        }

        // Validación de confirmación de contraseña
        if (password.value !== confirmPassword.value) {
            mostrarError("error-confirm-password", "Las contraseñas no coinciden.");
            valido = false;
        } else {
            limpiarError("error-confirm-password");
        }

        if (valido) {
            loader.classList.remove("oculto");
            setTimeout(() => {
                loader.classList.add("oculto");
                mensajeExito.classList.remove("oculto");
                form.reset();
            }, 5000);
        }
    });

    function mostrarError(id, mensaje) {
        const errorElemento = document.getElementById(id);
        errorElemento.textContent = mensaje;
        errorElemento.style.color = "red";
    }

    function limpiarError(id) {
        const errorElemento = document.getElementById(id);
        errorElemento.textContent = "";
    }
});
