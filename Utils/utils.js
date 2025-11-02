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
  fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
  document.cookie = `${nombre}=${valor}; expires=${fecha.toUTCString()}; path=/`;
}

export function getCookie(nombre) {
  const nombreEQ = nombre + "=";
  const cookies = document.cookie.split(";");
  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(nombreEQ)) return c.substring(nombreEQ.length);
  }
  return null;
}

export function deleteCookie(nombre) {
  document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}