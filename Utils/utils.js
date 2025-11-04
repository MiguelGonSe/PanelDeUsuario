// Función para convertir un ArrayBuffer en string hexadecimal
export function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// Genera un hash SHA-256 del texto dado
export async function hashText(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return bufferToHex(hashBuffer);
}

// Crea una sal aleatoria (16 bytes)
export function generateSalt() {
  const saltArray = new Uint8Array(16);
  crypto.getRandomValues(saltArray);
  return bufferToHex(saltArray);
}

export function showScene(id) {
  document.querySelectorAll('.scene').forEach(
    element => element.classList.remove('active')
  );
  document.getElementById(id).classList.add('active');
}

export function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
  document.cookie = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}; expires=${fecha.toUTCString()}; path=/`;
}

export function getCookie(nombre) {
  const nombreCookie = encodeURIComponent(nombre) + "=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nombreCookie)) {
      return decodeURIComponent(cookie.substring(nombreCookie.length));
    }
  }
  return "";
}

export function deleteCookie(nombre) {
  document.cookie = `${encodeURIComponent(nombre)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function inicializarBannerCookies() {
  const cookieBanner = document.getElementById("cookieBanner");
  const aceptarBoton = document.getElementById("aceptar");

  if (!cookieBanner || !aceptarBoton) return; // Evita errores si no existe el footer

  // Si ya se aceptó, ocultamos el banner
  if (getCookie("cookiesAccepted") === "true") {
    cookieBanner.classList.add("hidden");
  } else {
    // Mostrar el banner
    cookieBanner.classList.remove("hidden");

    aceptarBoton.addEventListener("click", () => {
      setCookie("cookiesAccepted", "true", 365); 
      cookieBanner.classList.add("hidden");
    });
  }
}

export function mostrarPanel(usuario) {
  showScene("panel");
  const nombreUsuario = document.getElementById("nombreUsuario");
  if (nombreUsuario) nombreUsuario.textContent = usuario;
}