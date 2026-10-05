const rows = [
  { id: 2, group: "Sienas", name: "Guļbaļķi, ziemeļu fasāde, pa kreisi", n: 6, L: 1900, W: 300, T: 150, mat: "koks" },
  { id: 3, group: "Sienas", name: "Guļbaļķi, ziemeļu fasāde, vidus", n: 6, L: 3650, W: 300, T: 160, mat: "koks" },
  { id: 4, group: "Sienas", name: "Guļbaļķi, ziemeļu fasāde", n: 4, L: 4100, W: 300, T: 160, mat: "koks" },
  { id: 5, group: "Sienas", name: "Guļbaļķi, ziemeļu fasāde, pa labi", n: 6, L: 1850, W: 330, T: 160, mat: "koks" },
  { id: 6, group: "Sienas", name: "Guļbaļķi, rietumu fasāde", n: 14, L: 7210, W: 345, T: 160, mat: "koks" },
  { id: 7, group: "Sienas", name: "Guļbaļķi, austrumu fasāde", n: 13, L: 7250, W: 350, T: 160, mat: "koks" },
  { id: 8, group: "Sienas", name: "Guļbaļķi, dienvidu fasāde", n: 18, L: 5300, W: 350, T: 160, mat: "koks" },
  { id: 9, group: "Sienas", name: "Baļķi starp telpām", n: 8, L: 5100, W: 160, T: 160, mat: "koks" },
  { id: 10, group: "Lievenis", name: "Dēļi, lieveņa grīda", n: 63, L: 1640, W: 150, T: 25, mat: "zāģēts koks" },
  { id: 14, group: "Lievenis", name: "Lieveņa kolonnas", n: 6, L: 2000, W: 220, T: 150, mat: "koks" },
  { id: 29, group: "Lievenis", name: "Lieveņa sijas", n: 4, L: 1640, W: 160, T: 120, mat: "koks" },
  { id: 30, group: "Lievenis", name: "Baļķi virs lieveņa kolonnām", n: 2, L: 10300, W: 320, T: 160, mat: "koks" },
  { id: 12, group: "Lievenis", name: "Dēļi, lieveņa griesti", n: 26, L: 4200, W: 200, T: 40, mat: "zāģēts koks" },
  { id: 28, group: "Lievenis", name: "Slieksnis", n: 2, L: 900, W: 150, mat: "koks" },
  { id: 13, group: "Pārsegumi", name: "Dēļi, graudu klēts grīda", n: 18, L: 5100, W: 300, T: 25, mat: "zāģēts koks" },
  { id: 15, group: "Pārsegumi", name: "Dēļi, noliktavas grīda", n: 18, L: 4820, W: 300, T: 40, mat: "zāģēts koks" },
  { id: 17, group: "Pārsegumi", name: "Dēļi, graudu klēts griesti", n: 21, L: 5100, W: 400, T: 40, mat: "zāģēts koks" },
  { id: 16, group: "Pārsegumi", name: "Dēļi, noliktavas griesti", n: 17, L: 4820, W: 400, T: 40, mat: "zāģēts koks" },
  { id: 24, group: "Pārsegumi", name: "Iekštelpu nesošās sijas", n: 2, L: 10290, W: 250, T: 150, mat: "koks" },
  { id: 18, group: "Jumts", name: "Spāres, Z un D fasāde", n: 12, L: 5400, W: 120, T: 100, mat: "koks" },
  { id: 19, group: "Jumts", name: "Mazās spāres, R un A fasāde", n: 6, L: 2610, W: 120, T: 100, mat: "koks" },
  { id: 20, group: "Jumts", name: "Latas, Z un D fasāde", n: 36, L: 6900, D: 70, mat: "apaļkoks" },
  { id: 21, group: "Jumts", name: "Latas, R un A fasāde", n: 6, L: 4100, D: 70, mat: "apaļkoks" },
  { id: 25, group: "Jumts", name: "Vējdēļi", n: 4, L: 2730, W: 350, T: 40, mat: "zāģēts koks" },
  { id: 26, group: "Jumts", name: "Augšējie spārneši", n: 6, W: 100, T: 100, mat: "koks" },
  { id: 27, group: "Jumts", name: "Apakšējie spārneši", n: 4, D: 130, mat: "apaļkoks" },
  { id: 23, group: "Pamati", name: "Pamata baļķis", n: 7, L: 10600, W: 260, T: 200, mat: "koks" },
  { id: 31, group: "Pamati", name: "Balstenis", n: 10, L: 400, W: 400, T: 150, mat: "koks" },
  { id: 11, group: "Pamati", name: "Akmeņi perimetrā", n: 27, L: 400, W: 350, T: 150, mat: "akmens" },
];

const size = (e) => {
  if (e.D && e.L) return `Ø ${e.D} · ${e.L} mm`;
  if (e.D) return `Ø ${e.D} mm · garums nav`;
  if (e.L && e.W && e.T) return `${e.L} × ${e.W} × ${e.T}`;
  if (e.W && e.T) return `${e.W} × ${e.T} · garums nav`;
  if (e.L && e.W) return `${e.L} × ${e.W} · biezums nav`;
  return "—";
};

const groups = [...new Set(rows.map((r) => r.group))];
const tbody = document.querySelector("#body");
groups.forEach((g) => {
  const head = document.createElement("tr");
  head.className = "group";
  head.innerHTML = `<td colspan="3">${g}</td>`;
  tbody.append(head);
  rows.filter((r) => r.group === g).forEach((r) => {
    const tr = document.createElement("tr");
    tr.className = "row";
    tr.innerHTML = `<td>${r.name}</td><td class="num">${r.n}</td><td>${size(r)}</td>`;
    tr.addEventListener("click", () => select(r, tr));
    tbody.append(tr);
  });
});

function select(e, tr) {
  document.querySelectorAll("tr.on").forEach((n) => n.classList.remove("on"));
  tr.classList.add("on");
  if (window.matchMedia("(max-width: 800px)").matches) {
    document.querySelector("aside").scrollIntoView({ block: "nearest" });
  }
  document.querySelector("#pick").hidden = false;
  document.querySelector("#empty").hidden = true;
  document.querySelector("#pick-name").textContent = e.name;
  document.querySelector("#pick-meta").textContent = `${e.mat} · ${e.n} gab. · ${e.group}`;
  const box = document.querySelector("#cross");
  box.innerHTML = "";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 260 170");
  svg.setAttribute("class", "cross");
  if (e.D) {
    svg.innerHTML = `<circle cx="90" cy="85" r="48" fill="none" stroke="#1c1916" stroke-width="1.5"/><text x="150" y="80" font-size="13" font-family="Avenir Next, sans-serif">Ø ${e.D} mm</text><text x="150" y="100" font-size="13" font-family="Avenir Next, sans-serif">${e.L ? "L " + e.L + " mm" : "garums nav"}</text>`;
  } else if (e.W && e.T) {
    const s = 120 / Math.max(e.W, e.T);
    const w = e.W * s;
    const h = Math.max(e.T * s, 8);
    const x = 20;
    const y = 20 + (120 - h) / 2;
    svg.innerHTML = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#1c1916" stroke-width="1.5"/>
      <text x="${x}" y="${y + h + 16}" font-size="12" font-family="Avenir Next, sans-serif">${e.W} mm</text>
      <text x="${x + w + 8}" y="${y + h / 2}" font-size="12" font-family="Avenir Next, sans-serif">${e.T} mm</text>`;
  } else {
    svg.innerHTML = `<text x="16" y="85" font-size="14" font-family="Avenir Next, sans-serif">Trūkst izmēra</text>`;
  }
  box.append(svg);
  const cell = (label, value) => `<div><span>${label}</span><b>${value}</b></div>`;
  document.querySelector("#pick-vol").innerHTML = [
    cell("Skaits", e.n),
    cell("Garums", e.L ? e.L + " mm" : "nav"),
    e.D ? cell("Diametrs", "Ø " + e.D + " mm") : cell("Platums", e.W ? e.W + " mm" : "nav"),
    e.D ? "" : cell("Biezums", e.T ? e.T + " mm" : "nav"),
  ].join("");
}

document.querySelector("#body tr.row").click();

const view = document.createElement("div");
view.id = "view";
view.hidden = true;
view.innerHTML = "<img alt=''><p></p>";
document.body.append(view);
const big = view.querySelector("img");
const cap = view.querySelector("p");
let current = null;

const frame = (img) => {
  const from = img.getBoundingClientRect();
  const ratio = img.naturalWidth / img.naturalHeight || 4 / 3;
  let w = Math.min(innerWidth * 0.94, 1280);
  let h = w / ratio;
  const maxH = innerHeight - 88;
  if (h > maxH) { h = maxH; w = h * ratio; }
  const dx = from.left + from.width / 2 - innerWidth / 2;
  const dy = from.top + from.height / 2 - innerHeight / 2;
  return { w, h, transform: `translate(${dx}px, ${dy}px) scale(${from.width / w})` };
};

const openPhoto = (img) => {
  current = img;
  big.src = img.src;
  big.alt = img.alt;
  cap.textContent = img.parentElement.querySelector("figcaption")?.textContent || "";
  view.hidden = false;
  document.body.style.overflow = "hidden";
  const start = frame(img);
  big.style.width = start.w + "px";
  big.style.height = start.h + "px";
  big.style.transition = "none";
  big.style.transform = start.transform;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    view.classList.add("on");
    big.style.transition = "transform .4s cubic-bezier(.2,.7,.2,1)";
    big.style.transform = "none";
  }));
};

const closePhoto = () => {
  if (!current) return;
  const start = frame(current);
  current = null;
  big.style.transform = start.transform;
  view.classList.remove("on");
  setTimeout(() => {
    view.hidden = true;
    document.body.style.overflow = "";
  }, 420);
};

document.querySelectorAll(".photos img, .reed-grid img").forEach((img) => {
  img.tabIndex = 0;
  img.addEventListener("click", () => openPhoto(img));
  img.addEventListener("keydown", (e) => { if (e.key === "Enter") openPhoto(img); });
});
view.addEventListener("click", closePhoto);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePhoto(); });
