import { router, navigate } from "./router.js";

// Año en el footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

let navegandoPorClic = false;

// Navegación por data-link (delegación de eventos)
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (!link) return;
  const targetHash = (link.getAttribute("data-link") || "").trim();
  if (!targetHash) return;
  e.preventDefault();
  navegandoPorClic = true;
  router(targetHash);
  navigate(targetHash);
  // Evitar que hashchange sobrescriba la vista que acabamos de renderizar
  setTimeout(() => { navegandoPorClic = false; }, 0);
});

window.addEventListener("hashchange", () => {
  if (navegandoPorClic) return;
  router(window.location.hash || "#acerca");
});

// Primera carga
router();

// AOS después de que el router haya montado la primera vista
requestAnimationFrame(() => {
  if (window.AOS) window.AOS.init();
});
