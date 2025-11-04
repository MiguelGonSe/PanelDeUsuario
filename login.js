import { getCookie, setCookie, mostrarPanel, showScene, hashText } from "./Utils/utils.js";

const formLogin = document.getElementById("form_login");
const errorLogin = document.getElementById("errorLogin");
const registrarseBoton = document.getElementById("registrarse");

const toggleBoton = document.querySelector(".toggle_password");
const passwordInput = document.getElementById("contraseniaLogin");

const usuarioCookie = getCookie("usuario");
if (usuarioCookie) {
    mostrarPanel(usuarioCookie);
}

registrarseBoton.addEventListener("click", () => {
    showScene("registro");
});

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuarioLogin").value.trim();
    const contrasenia = document.getElementById("contraseniaLogin").value;

    const datosGuardados = JSON.parse(localStorage.getItem(usuario));

    if (!datosGuardados) {
        errorLogin.textContent = "Usuario o contraseña incorrectos.";
        return;
    }

    // Hasheamos la contraseña introducida con el mismo salt
    const hashedInput = await hashText(contrasenia + datosGuardados.salt);

    if (hashedInput === datosGuardados.contrasenia) {
        setCookie("usuario", usuario, 1); 
        mostrarPanel(usuario);
    } else {
        errorLogin.textContent = "Usuario o contraseña incorrectos.";
    }
});

toggleBoton.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  toggleBoton.innerHTML = `<i class="fa ${isPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
});