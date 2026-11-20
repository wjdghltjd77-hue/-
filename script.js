const d = PORTFOLIO;
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

document.title = `${d.name} | 포트폴리오`;
$("logo").textContent = d.name;
$("name").textContent = d.name;
$("role").textContent = d.role;
$("intro").textContent = d.intro;
$("footer-name").textContent = d.name;
$("year").textContent = `© ${new Date().getFullYear()}`;

$("avatar").innerHTML = d.photo
  ? `<img src="${esc(d.photo)}" alt="${esc(d.name)}">`
  : esc(d.name.charAt(0));

$("about-text").innerHTML = d.about.map((p) => `<p>${esc(p)}</p>`).join("");
$("skills").innerHTML = d.skills.map((s) => `<li>${esc(s)}</li>`).join("");

$("project-list").innerHTML = d.projects.map((p) => `
  <article class="card">
    ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}">` : `<div class="thumb">${esc(p.title)}</div>`}
    <div class="card-body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="links">
        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">데모 ↗</a>` : ""}
        ${p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">코드 ↗</a>` : ""}
      </div>
    </div>
  </article>`).join("");

$("timeline").innerHTML = d.experience.map((e) => `
  <li><span class="period">${esc(e.period)}</span><strong>${esc(e.title)}</strong><p>${esc(e.detail)}</p></li>`).join("");

const labels = { email: "이메일", github: "GitHub", blog: "블로그", linkedin: "LinkedIn" };
$("contact-list").innerHTML = Object.entries(d.contact)
  .filter(([, v]) => v)
  .map(([k, v]) => {
    const href = k === "email" ? `mailto:${v}` : v;
    return `<li><span>${labels[k] || k}</span><a href="${esc(href)}" target="_blank" rel="noopener">${esc(v)}</a></li>`;
  }).join("");

// 다크/라이트 테마
const root = document.documentElement;
try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch {}
$("theme").addEventListener("click", () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch {}
});
