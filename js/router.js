import Acerca from "./views/acerca.js";
import Skills from "./views/skills.js";
import Projects from "./views/projects.js";
import Contacts from "./views/contacts.js";

const routes = {
  "#acerca": Acerca,
  "#habilidades": Skills,
  "#proyectos": Projects,
  "#contacto": Contacts
};

function normalizeHash(value) {
  if (value == null || value === "") return "#acerca";
  let h = String(value).trim();
  if (!h.startsWith("#")) h = "#" + h;
  return h.toLowerCase();
}

export function router(forcedHash) {
  const app = document.getElementById("app");
  if (!app) return;
  const hash = normalizeHash(forcedHash ?? window.location.hash);
  const view = routes[hash] ?? Acerca;

  renderView(view, app);
}

export function navigate(hash) {
  const target = hash && !hash.startsWith("#") ? "#" + hash : (hash || "#acerca");
  if (window.location.hash === target) return;
  window.location.hash = target;
}

function renderView(view, container) {
  const html = getViewHtml(view);
  if (!html) return;
  container.innerHTML = "";
  appendView(html, container);
}

function getViewHtml(view) {
  if (typeof view !== "function") return "";
  try {
    const raw = view();
    return typeof raw === "string" ? raw.trim() : "";
  } catch (err) {
    console.error("Error al generar la vista:", err);
    return "";
  }
}

function appendView(html, container) {
  if (!html) return;
  const wrapper = document.createElement("div");
  wrapper.classList.add("view", "view-enter");
  wrapper.innerHTML = html;
  container.appendChild(wrapper);
  requestAnimationFrame(() => {
    wrapper.classList.add("view-enter-active");
    wrapper.classList.remove("view-enter");
  });
  if (window.AOS) window.AOS.refresh();
}

function mountNewView(view, container) {
  const html = getViewHtml(view);
  if (!html) return;
  appendView(html, container);
}

