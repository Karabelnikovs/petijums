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
  pageLock();
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

const pageLock = () => { document.body.style.overflow = "hidden"; };
const pageUnlock = () => {
  if (view.hidden && document.querySelector("#fence").hidden) document.body.style.overflow = "";
};

const closePhoto = () => {
  if (!current) return;
  const start = frame(current);
  current = null;
  big.style.transform = start.transform;
  view.classList.remove("on");
  setTimeout(() => {
    view.hidden = true;
    pageUnlock();
  }, 420);
};

document.querySelectorAll(".photos img, .reed-grid img, #fence-img").forEach((img) => {
  img.tabIndex = 0;
  img.addEventListener("click", () => openPhoto(img));
  img.addEventListener("keydown", (e) => { if (e.key === "Enter") openPhoto(img); });
});
view.addEventListener("click", closePhoto);

const fences = [
  { n: 1, lat: 56.991742, lng: 24.276381, name: "Stabu kāršu kaltos caurumos" },
  { n: 2, lat: 56.993006, lng: 24.274775, name: "Stabu kāršu gropēs ar atstarpi" },
  { n: 3, lat: 56.987929, lng: 24.280367, name: "Stabu kāršu gropēs bez atstarpes" },
  { n: 4, lat: 56.988283, lng: 24.280429, name: "Stabu kāršu pāra stabiem piesietas" },
  { n: 5, lat: 56.987652, lng: 24.281588, name: "Stabu kāršu pāra stabi atstutēti starp" },
  { n: 6, lat: 56.991357, lng: 24.276652, name: "Zedeņu vertikāli" },
  { n: 7, lat: 56.991845, lng: 24.268472, name: "Zedeņu horizontāli" },
  { n: 8, lat: 56.989095, lng: 24.278830, name: "Vilku žogs" },
  { n: 9, lat: 56.988742, lng: 24.279158, name: "Dēļu bez atstarpes" },
  { n: 10, lat: 56.988417, lng: 24.278948, name: "Dēļu ar atstarpi" },
  { n: 11, lat: 56.990551, lng: 24.279517, name: "Kāršu-dēļu ar naglām" },
  { n: 12, lat: 56.989586, lng: 24.283857, name: "Pienagloti zari" },
  { n: 13, lat: 56.989619, lng: 24.284726, name: "Dzīvžogs" },
  { n: 14, lat: 56.991033, lng: 24.267983, name: "Akmeņu žogs" },
  { n: 15, lat: 56.987935, lng: 24.280603, name: "Šķeltu koku žogs" },
  { n: 16, lat: 56.987856, lng: 24.280523, name: "Dēļu bez atstarpes ar formu" },
  { n: 17, lat: 56.987191, lng: 24.281521, name: "Stabu kāršu ar brīvpieejamiem zariem" },
  { n: 18, lat: 56.988785, lng: 24.279007, name: "Stāvžogs" },
];

const fenceBox = document.querySelector("#fence");
const openFence = (f) => {
  document.querySelector("#fence-type").textContent = "";
  document.querySelector("#fence-title").textContent = `${f.n} · ${f.name}`;
  document.querySelector("#fence-where").textContent = "";
  document.querySelector("#fence-text").textContent = "";
  document.querySelector("#fence-size").textContent = "";
  const img = document.querySelector("#fence-img");
  img.hidden = true;
  fenceBox.hidden = false;
  pageLock();
  requestAnimationFrame(() => fenceBox.classList.add("on"));
};
const closeFence = () => {
  if (fenceBox.hidden) return;
  fenceBox.classList.remove("on");
  setTimeout(() => {
    fenceBox.hidden = true;
    pageUnlock();
  }, 300);
};
fenceBox.addEventListener("click", closeFence);
fenceBox.querySelector("article").addEventListener("click", (e) => e.stopPropagation());
document.querySelector("#fence-x").addEventListener("click", closeFence);

const map = L.map("map", {
  scrollWheelZoom: true,
  minZoom: 14,
  maxZoom: 19,
  maxBounds: [[56.978, 24.25], [57.004, 24.305]],
}).fitBounds([[56.9848, 24.2656], [56.9965, 24.2888]], { padding: [20, 20] });
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap",
  maxZoom: 19,
}).addTo(map);

fences.forEach((f) => {
  const icon = L.divIcon({ className: "", html: `<span class="pin">${f.n}</span>`, iconSize: [28, 28], iconAnchor: [14, 14] });
  L.marker([f.lat, f.lng], { icon, title: `${f.n} ${f.name}` }).addTo(map).on("click", () => openFence(f));
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!view.hidden) closePhoto();
  else closeFence();
});
