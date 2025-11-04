import { setCookie, getCookie, deleteCookie, showScene } from "./Utils/utils.js";

const botonTema = document.getElementById("botonTema");
const botonCerrarSesion = document.getElementById("cerrarSesion");

botonCerrarSesion.addEventListener("click", () => {
    deleteCookie("usuario");
    showScene("login");
});

if (botonTema) {
    // Al cargar, aplicar tema según cookie
    let tema = getCookie("tema") || "claro";
    document.body.classList.toggle("modoscuro", tema === "oscuro");
    botonTema.innerText = tema === "oscuro" ? "🌑" : "☀️";

    // Evento click para cambiar tema
    botonTema.addEventListener("click", () => {
        document.body.classList.toggle("modoscuro");
        const esOscuro = document.body.classList.contains("modoscuro");
        botonTema.innerText = esOscuro ? "🌑" : "☀️";

        setCookie("tema", esOscuro ? "oscuro" : "claro", 1);
    });
}