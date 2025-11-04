import { showScene, hashText, generateSalt } from "./Utils/utils.js";
import { constants } from "./Utils/constant.js"

const form = document.getElementById("form_registro");
const inputNameElement = document.getElementById("usuarioRegistro");
const inputPasswordElement = document.getElementById("contraseniaRegistro");
const inputPhoneElement = document.getElementById("telefono");
const inputCPElement = document.getElementById("cp");
const checkboxEdad = document.getElementById("mayorEdad");
const edadContainer = document.getElementById("edadContainer");
const inputEdad = document.getElementById("edad");
const mensajeRegistro = document.getElementById("mensajeRegistro");
const submitButtonElement = document.getElementById("crearCuenta");

const regexName = constants.regexName;
const regexPassword = constants.regexPassword;
const regexPhone = constants.regexPhone;
const regexCP = constants.regexPostalCode;

let nameValid = false;
let passwordValid = false;
let phoneValid = false;
let cpValid = false;
let ageValid = true;

const USERNAME_INVALID = "Mínimo 3 caracteres";
const PASSWORD_INVALID = "Debe tener al menos 8 caracteres, incluyendo una letra mayúscula y una letra minúscula";
const PHONE_INVALID = "Tiene que ser exactamente 9 dígitos numéricos.";
const CP_INVALID = "Tiene que ser exactamente 5 dígitos numéricos.";

inputNameElement.addEventListener("keyup", validateName);
inputPasswordElement.addEventListener("blur", validatePassword);
inputPhoneElement.addEventListener("blur", validatePhone);
inputCPElement.addEventListener("blur", validateCP);
checkboxEdad.addEventListener("change", toggleEdad);

function checkFullForm() {
    if (nameValid && passwordValid && phoneValid && cpValid) {
        submitButtonElement.classList.remove("notAvailable");
    } else {
        submitButtonElement.classList.add("notAvailable");
    }
}

function validateName() {
    nameValid = regexName.test(inputNameElement.value);
    inputNameElement.className = nameValid ? "success" : "error";

    const small = inputNameElement.parentNode.querySelector("small");
    small.textContent = nameValid ? "" : USERNAME_INVALID;

    checkFullForm();
}

function validatePassword() {
    passwordValid = regexPassword.test(inputPasswordElement.value);
    inputPasswordElement.className = passwordValid ? "success" : "error";

    const small = inputPasswordElement.parentNode.querySelector("small");
    small.textContent = passwordValid ? "" : PASSWORD_INVALID;

    checkFullForm();
}

function validatePhone() {
    phoneValid = regexPhone.test(inputPhoneElement.value);
    inputPhoneElement.className = phoneValid ? "success" : "error";

    const small = inputPhoneElement.parentNode.querySelector("small");
    small.textContent = phoneValid ? "" : PHONE_INVALID;

    checkFullForm();
}

function validateCP() {
    cpValid = regexCP.test(inputCPElement.value);
    inputCPElement.className = cpValid ? "success" : "error";

    const small = inputCPElement.parentNode.querySelector("small");
    small.textContent = cpValid ? "" : CP_INVALID;

    checkFullForm();
}

function validateEdad() {
    if (checkboxEdad.checked) {
        const edadValue = parseInt(inputEdad.value, 10);
        ageValid = !isNaN(edadValue) && edadValue >= 18 && edadValue <= 99;
        inputEdad.className = ageValid ? "success" : "error";

        const small = inputEdad.parentNode.querySelector("small");
        small.textContent = ageValid ? "" : "Edad inválida";
    } else {
        ageValid = true;
    }
}

function toggleEdad() {
    if (checkboxEdad.checked) {
        edadContainer.style.display = "block";
        inputEdad.required = true;
    } else {
        edadContainer.style.display = "none";
        inputEdad.required = false;
        ageValid = true;
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    validateName();
    validatePassword();
    validatePhone();
    validateCP();
    validateEdad();

    if (!(nameValid && passwordValid && phoneValid && cpValid && ageValid)) {
        mensajeRegistro.style.color = "red";
        mensajeRegistro.textContent = "Corrige los errores antes de enviar.";
        return;
    } else {
        mensajeRegistro.textContent = "";
    }

    [inputNameElement, inputPasswordElement, inputPhoneElement, inputCPElement, inputEdad].forEach(el => {
        el.addEventListener("input", () => {
            mensajeRegistro.textContent = "";
        });
    });

    const usernameKey = inputNameElement.value.trim();
    if (localStorage.getItem(usernameKey)) {
        mensajeRegistro.style.color = "red";
        mensajeRegistro.textContent = "Ese usuario ya existe. Elige otro.";
        return;
    }

    const salt = generateSalt();
    const hashedPassword = await hashText(inputPasswordElement.value + salt);
    const usuario = {
        contrasenia: hashedPassword,
        salt,
        telefono: inputPhoneElement.value.trim(),
        cp: inputCPElement.value.trim(),
        mayorEdad: checkboxEdad.checked,
        edad: checkboxEdad.checked ? inputEdad.value.trim() : null
    };
    localStorage.setItem(inputNameElement.value.trim(), JSON.stringify(usuario));

    document.getElementById("nombreUsuario").textContent = inputNameElement.value.trim();

    mensajeRegistro.style.color = "green";
    mensajeRegistro.textContent = "¡Registro completado con éxito!";

    form.reset();
    edadContainer.style.display = "none";

    showScene("panel");
    document.getElementById("nombreUsuario").textContent = inputNameElement.value.trim();
});

