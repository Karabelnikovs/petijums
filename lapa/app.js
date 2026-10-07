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

document.addEventListener("click", (e) => {
  const img = e.target.closest(".carousel img, .reed-grid img");
  if (img) openPhoto(img);
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const img = e.target.closest?.(".carousel img, .reed-grid img");
  if (img) openPhoto(img);
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

const copy = {
  1: ["Stabi zemē. Kārtis iet caur kaltiem caurumiem.", "No pārpalikumiem: šķībi, zaraini stabi un mieti kārtīm.", "Biežāk ganību robeža, retāk tikai sētas nodaļošana.", "Egle un priede", ["Vidzemes zemnieka sēta"]],
  2: ["Kārtis gropēs. Atstarpi starp tām tur klucīši.", "Spraugu var mainīt, neliekot vai liekot klucīšus.", "Aiztur lopus. Caur redzamo spraugu nelaiž lielākus dzīvniekus.", "Egle un priede", ["Kurzemes zemnieka sēta", "Zemgale", "Kurzemes krasts"]],
  3: ["Kārtis gropēs cieši cita virs citas, bez atstarpes.", "Blīvāks par caurumu žogu. Tas pats pārpalikumu koks.", "Aiztur lopus. Caur žogu neredz.", "Egle un priede", ["Krāslava"]],
  4: ["Kārtis starp pāra stabiem un piesietas pie tiem.", "Savienojums ir saite, nevis caurums stabā.", "Aiztur lopus.", "Koks un sējums", ["Latgale"]],
  5: ["Kārtis guļ uz horizontāla koka starp stabiem.", "Kārtis neiet caur stabu. Tās balstās uz šķērskoka.", "Aiztur lopus.", "Egle un priede", ["Latgales ciems", "Latgale"]],
  6: ["Stabi un horizontālas kārtis. Zari pīti stāvus starp kārtīm.", "No pārpalikumiem: resnie baļķi stabiem, tievie zari pildījumam.", "Norobežo zemi. Ja augsts, aiztur arī dzīvniekus.", "Priede, egle, bērzs", ["Vidzemes sēta", "Latgales ciems", "Latgales podnieka sēta"]],
  7: ["Zari pīti guļus starp vertikāliem mietiem.", "Zemāks pinums. Materiāls tas pats, kas vertikālajam.", "Norobežo zemi. Augstums nosaka, vai aiztur dzīvniekus.", "Priede, egle, bērzs", ["Kurzemes zvejnieku ciems"]],
  8: ["Pāra stabi. Starp tiem baļķi slīpi, piesieti pie stabiem.", "Pietiek ar cirvi. Vajag daudz atzarota koka. Muzejā ir viens šāds žogs.", "Aiztur dzīvniekus.", "Egle. Sējums no klūgām, lazdas vai bērza", ["Latgales ciems", "Latgales ciems", "Latgales ciems"]],
  9: ["Starp stabiem kārtis, pie tām pienagloti plati dēļi bez atstarpes.", "Latgalē ceļa malā žogs bija obligāts. No 18. gs., kad ir nagla un zāģēts dēlis.", "Iezīmē teritoriju, dod privātumu un izskatu.", "Egles vai priedes dēļi", ["Latgale"]],
  10: ["Šaurāki dēļi ar atstarpi, pienagloti pie kārtīm.", "Tas pats naglotais žogs. Sprauga ir daļa no izskata.", "Iezīmē teritoriju un sakārto pagalmu.", "Egles vai priedes dēļi", ["Latgale"]],
  11: ["Kāršu žogs, kam pienagloti dēļi, lai būtu blīvāks.", "Uzstādīt tikpat viegli kā kāršu žogu. Iespējams vēlāk pārtaisīts.", "Sētām ar dažāda izmēra lopiem.", "Egle vai priede. Dēļi parasti no egles", ["Vidzemes zemnieka sēta", "Vidzemes zemnieka sēta"]],
  12: ["Šauri zari pienagloti pie kārts.", "Nav zāģētu dēļu. Nagla tur zarus.", "Iezīmē teritoriju un dod izskatu.", "Zari, naglas", ["Jaunsēta"]],
  13: ["Apgriezts krūmu vainags rindā.", "Dzīvs un regulāri apgriezts.", "Dekoratīvs, retāk norobežo zemi.", "Blīvi krūmi un koki, piemēram tūjas", ["Jaunsaimniecība"]],
  14: ["Lieli akmeņi brīvi rindā, bez javas.", "Piejūrā, kur akmeņu daudz un koka maz. Vēsturiskās sētās Latvijā rets.", "Atdala sētu no kaimiņa.", "Lieli akmeņi", ["Kurzemes zvejnieku ciems", "Kurzemes zvejnieku ciems"]],
  15: ["Ap 50 cm koki, augša sašķelta. Šķēlumā ielikts miets.", "Ātri uzceļams. Augstuma dēļ nelaiž vidējus un lielus lopus.", "Dobēm sētas iekšā.", "Tievie egļu vai retāk lapkoku zari", ["Latgales ciems"]],
  16: ["Plati dēļi bez atstarpes, augšā neliels griezums.", "Katra saimniecība grieza savu augšmalu.", "Iezīmē teritoriju, dod privātumu un izskatu.", "Egles vai priedes dēļi", ["Latgales ciems"]],
  17: ["Kāršu rāmis. Kārtis nav cieši nofiksētas, virsū brīvi zari.", "Spraugas maina ar baļķu atgriezumiem. Zarus ņem no apkārtnes.", "Aiztur lopus.", "Egle, priede un zari", ["Latgales krievu zemnieka sēta"]],
  18: ["Baļķi iesprausti zemē, gali saasināti. Vidū miets caur kaltiem caurumiem.", "Masīvākais muzejā, grūti uzstādīt.", "Sētas priekšā pret ielu. Latgalē žogs pret ceļu bija prasība.", "Egles un priedes baļķi", ["Latgales ciems", "Latgales ciems"]],
};

const schemes = {
  konstrukcija: [
    ["Stabu un kāršu rāmis", "Stabi zemē un horizontālas kārtis, līdz aptuveni 6,5 m. Atšķiras savienojums.", [1, 2, 3, 4, 5, 17]],
    ["Pinums uz kāršu rāmja", "Tas pats rāmis. Zari pīti starp kārtīm.", [6, 7]],
    ["Naglots pildījums", "Kārtis un nagla. Dēļi vai zari.", [9, 10, 11, 12, 16]],
    ["Bez kāršu rāmja", "Žogu tur stabi, akmeņi, augs vai zemē sprausti baļķi.", [8, 13, 14, 15, 18]],
  ],
  darbs: [
    ["Aizturēt lopus", "Ganības un sētas, no kurām lopi nedrīkst iziet.", [1, 2, 3, 4, 5, 8, 11, 17]],
    ["Norobežot teritoriju", "Robeža, ceļš vai kaimiņu sēta. Augsts pinums aiztur arī dzīvniekus.", [6, 7, 14, 18]],
    ["Sargāt dobes", "Zems žogs sētas iekšā.", [15]],
    ["Izskats un privātums", "Ceļa mala, pagalms, apgriezts vainags.", [9, 10, 12, 13, 16]],
  ],
  paņēmiens: [
    ["Cirvis un sējums", "Apaļkoks, grope vai caurums, saite no klūgām.", [1, 2, 3, 4, 5, 6, 7, 8, 15, 17, 18]],
    ["Nagla un zāģēts koks", "No 18. gs., kad nagla un dēlis ir pieejami.", [9, 10, 11, 12, 16]],
    ["Akmens", "Brīvi likti akmeņi, bez javas.", [14]],
    ["Augs", "Dzīvs krūms, ko apgriež.", [13]],
  ],
};

const post = (x, y = 12, h = 98) => `<rect x="${x}" y="${y}" width="7" height="${h}" fill="#1c1916"/>`;
const bar = (y, x = 24, w = 112, h = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#7c3a2d"/>`;
const boards = (gap, top = 24) => Array.from({ length: 12 }, (_, i) => {
  const x = 22 + i * (8 + gap);
  return `<polygon points="${x},${108} ${x},${top + 8} ${x + 4},${top} ${x + 8},${top + 8} ${x + 8},${108}" fill="#1c1916"/>`;
}).join("");
const diagrams = {
  1: `${post(14)}${post(139)}${bar(34, 14, 132)}${bar(60, 14, 132)}${bar(86, 14, 132)}<circle cx="17.5" cy="37" r="3.2" fill="#f4f0e8"/><circle cx="17.5" cy="63" r="3.2" fill="#f4f0e8"/><circle cx="17.5" cy="89" r="3.2" fill="#f4f0e8"/>`,
  2: `${post(14)}${post(139)}${bar(28)}${bar(50)}${bar(72)}${bar(94)}<rect x="22" y="36" width="8" height="12" fill="#5e584e"/><rect x="130" y="58" width="8" height="12" fill="#5e584e"/><rect x="22" y="80" width="8" height="12" fill="#5e584e"/>`,
  3: `${post(14)}${post(139)}${[22, 34, 46, 58, 70, 82, 94].map((y, i) => `<rect x="24" y="${y}" width="112" height="12" fill="${i % 2 ? "#6d665c" : "#5e584e"}"/>`).join("")}`,
  4: `${post(8)}${post(18)}${post(132)}${post(142)}${bar(32, 26, 106)}${bar(58, 26, 106)}${bar(84, 26, 106)}<circle cx="21" cy="35" r="6" fill="none" stroke="#1f3b33" stroke-width="1.6"/><circle cx="136" cy="61" r="6" fill="none" stroke="#1f3b33" stroke-width="1.6"/><circle cx="21" cy="87" r="6" fill="none" stroke="#1f3b33" stroke-width="1.6"/>`,
  5: `${post(14)}${post(139)}<rect x="24" y="86" width="112" height="8" fill="#1c1916"/>${bar(22, 32, 96, 12)}${bar(40, 32, 96, 12)}${bar(58, 32, 96, 12)}${bar(74, 32, 96, 12)}`,
  6: `${post(16, 16, 96)}${post(137, 16, 96)}${bar(34, 16, 128, 3)}${bar(62, 16, 128, 3)}${bar(90, 16, 128, 3)}<path d="M28 28 C34 48 26 70 32 100 M44 26 C38 50 48 72 42 104 M58 24 C64 50 52 74 60 106 M72 26 C66 48 76 76 70 104 M86 24 C92 52 80 74 88 106 M100 26 C94 50 104 78 98 104 M114 24 C120 50 110 76 118 106" fill="none" stroke="#1f3b33" stroke-width="1.4"/>`,
  7: `${[18, 42, 66, 90, 114, 138].map((x) => post(x, 28, 78)).join("")}<path d="M12 48 C40 36 70 60 100 46 C124 36 140 52 152 44 M12 66 C40 54 70 78 100 64 C124 54 140 70 152 62 M12 84 C40 72 70 96 100 82 C124 72 140 88 152 80" fill="none" stroke="#1f3b33" stroke-width="3"/>`,
  8: `${post(8)}${post(18)}${post(132)}${post(142)}<line x1="28" y1="108" x2="128" y2="18" stroke="#7c3a2d" stroke-width="4"/><line x1="28" y1="18" x2="128" y2="108" stroke="#5e584e" stroke-width="4"/><line x1="28" y1="64" x2="80" y2="18" stroke="#7c3a2d" stroke-width="4"/><line x1="70" y1="108" x2="128" y2="52" stroke="#5e584e" stroke-width="4"/><circle cx="21" cy="40" r="6" fill="none" stroke="#1f3b33" stroke-width="1.6"/><circle cx="136" cy="78" r="6" fill="none" stroke="#1f3b33" stroke-width="1.6"/>`,
  9: `${post(12)}${post(141)}${bar(30, 20, 120, 4)}${bar(96, 20, 120, 4)}${Array.from({ length: 14 }, (_, i) => `<rect x="${22 + i * 8}" y="24" width="8" height="84" fill="#${i % 2 ? "1c1916" : "3a342c"}"/>`).join("")}`,
  10: `${post(12)}${post(141)}${bar(30, 20, 120, 4)}${bar(96, 20, 120, 4)}${Array.from({ length: 8 }, (_, i) => `<rect x="${24 + i * 15}" y="24" width="7" height="84" fill="#1c1916"/>`).join("")}`,
  11: `${post(12)}${post(141)}${bar(20, 20, 120, 6)}${bar(78, 20, 120, 4)}${Array.from({ length: 9 }, (_, i) => `<rect x="${26 + i * 13}" y="40" width="8" height="68" fill="#5e584e"/>`).join("")}`,
  12: `${post(16, 20, 90)}${post(137, 20, 90)}${bar(52, 16, 128, 5)}${Array.from({ length: 16 }, (_, i) => `<line x1="${28 + i * 7}" y1="36" x2="${30 + i * 7}" y2="100" stroke="#1f3b33" stroke-width="1.3"/>`).join("")}`,
  13: `<ellipse cx="36" cy="72" rx="26" ry="34" fill="#1f3b33"/><ellipse cx="78" cy="64" rx="30" ry="40" fill="#2a5246"/><ellipse cx="118" cy="74" rx="24" ry="32" fill="#1f3b33"/>`,
  14: `<line x1="8" y1="100" x2="152" y2="100" stroke="#d9d1c4" stroke-width="2"/>${[[28, 11], [58, 13], [88, 10], [114, 14], [140, 11]].map(([x, r]) => `<ellipse cx="${x}" cy="${98 - r * 0.7}" rx="${r}" ry="${r * 0.75}" fill="#5e584e"/>`).join("")}`,
  15: `${[28, 78, 128].map((x) => `${post(x, 70, 40)}<line x1="${x}" y1="70" x2="${x - 8}" y2="46" stroke="#1c1916" stroke-width="3"/><line x1="${x + 7}" y1="70" x2="${x + 15}" y2="46" stroke="#1c1916" stroke-width="3"/>`).join("")}${bar(56, 16, 128, 5)}`,
  16: `${post(12)}${post(141)}${bar(96, 20, 120, 4)}${boards(0, 22)}`,
  17: `${post(14)}${post(139)}${bar(48)}${bar(70)}${bar(92)}<path d="M30 18 C48 40 40 28 60 44 M50 16 C70 36 64 22 88 40 M78 14 C96 38 90 20 118 42 M36 30 C58 18 80 34 110 16" fill="none" stroke="#1f3b33" stroke-width="1.3"/>`,
  18: `${bar(58, 16, 128, 5)}${Array.from({ length: 12 }, (_, i) => { const x = 20 + i * 10; return `<polygon points="${x},108 ${x + 2},20 ${x + 6},20 ${x + 8},108" fill="#1c1916"/>`; }).join("")}`,
};

const srcOf = (n, i) => `foto/zogi/${String(n).padStart(2, "0")}-${i + 1}.jpg`;
const focus = {
  konstrukcija: [0, "Konstrukcija", 1, "Īpašības"],
  darbs: [2, "Darbs", 0, "Konstrukcija"],
  paņēmiens: [3, "Materiāli", 0, "Konstrukcija"],
};
let tab = "konstrukcija";

const carousel = (n, name, places) => {
  const box = document.createElement("div");
  box.className = "carousel";
  const frame = document.createElement("div");
  frame.className = "frame";
  const img = document.createElement("img");
  const cap = document.createElement("figcaption");
  frame.append(img);
  box.append(frame, cap);
  let i = 0;
  let busy = false;
  const capOf = (j) => places.length > 1 ? `${places[j]} · ${j + 1}/${places.length}` : places[j];
  const still = (j) => {
    img.style.transition = "none";
    img.style.transform = "none";
    img.src = srcOf(n, j);
    img.alt = `${name}, ${places[j]}`;
    cap.textContent = capOf(j);
    void img.offsetWidth;
    img.style.transition = "";
  };
  const go = (dir) => {
    if (busy) return;
    busy = true;
    const j = (i + dir + places.length) % places.length;
    const next = document.createElement("img");
    next.src = srcOf(n, j);
    next.alt = `${name}, ${places[j]}`;
    next.style.transition = "none";
    next.style.transform = `translateX(${dir > 0 ? "100%" : "-100%"})`;
    frame.append(next);
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      i = j;
      next.remove();
      still(j);
      busy = false;
    };
    next.addEventListener("transitionend", (e) => {
      if (e.target === next && e.propertyName === "transform") finish();
    });
    void next.offsetWidth;
    next.style.transition = "";
    img.style.transform = `translateX(${dir > 0 ? "-100%" : "100%"})`;
    next.style.transform = "translateX(0)";
    setTimeout(finish, 520);
  };
  still(0);
  if (places.length > 1) {
    [["prev", "Iepriekšējā", -1], ["next", "Nākamā", 1]].forEach(([cls, label, dir]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = cls;
      b.setAttribute("aria-label", label);
      b.textContent = dir < 0 ? "‹" : "›";
      b.addEventListener("click", () => go(dir));
      frame.append(b);
    });
  }
  return box;
};

const tabs = document.querySelector("#fence-tabs");
const list = document.querySelector("#fence-list");
const card = (f) => {
  const el = document.createElement("article");
  el.className = "type";
  el.id = "tips-" + f.n;
  el.innerHTML = `<div class="type-head"><svg class="diagram" viewBox="0 0 160 120" aria-hidden="true">${diagrams[f.n]}</svg><div><p class="tip-n">${f.n}</p><h3>${f.name}</h3><p class="role"></p><p class="body"></p><p class="extra"></p></div></div>`;
  el.append(carousel(f.n, f.name, copy[f.n][4]));
  return el;
};
const cards = Object.fromEntries(fences.map((f) => [f.n, card(f)]));
const groupOf = (n) => schemes[tab].find((g) => g[2].includes(n));
const paint = (n) => {
  const el = cards[n];
  const [a, la, b, lb] = focus[tab];
  const text = copy[n];
  el.querySelector(".role").textContent = groupOf(n)[0];
  el.querySelector(".body").innerHTML = `<b>${la}.</b> ${text[a]}`;
  el.querySelector(".extra").innerHTML = `<b>${lb}.</b> ${text[b]}`;
};
const showScheme = (id, animate) => {
  const run = () => {
    tab = id;
    tabs.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset.tab === id));
    list.replaceChildren();
    schemes[id].forEach(([title, note, ids]) => {
      ids.forEach(paint);
      const h = document.createElement("h3");
      h.className = "class-name";
      h.textContent = title;
      const p = document.createElement("p");
      p.className = "note";
      p.textContent = note;
      list.append(h, p, ...ids.map((n) => cards[n]));
    });
    list.classList.remove("swap");
  };
  if (!animate) { run(); return; }
  list.classList.add("swap");
  setTimeout(run, 160);
};
tabs.innerHTML = [["konstrukcija", "Konstrukcija"], ["darbs", "Darbs"], ["paņēmiens", "Paņēmiens"]].map(([id, name], i) => `<button type="button" data-tab="${id}"${i ? "" : ' class="on"'}>${name}</button>`).join("");
tabs.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b && b.dataset.tab !== tab) showScheme(b.dataset.tab, true);
});
showScheme("konstrukcija");

const index = document.querySelector("#fence-index");
index.innerHTML = `<thead><tr><th>Nr.</th><th>Tips</th><th>Sēta</th></tr></thead><tbody>${fences.map((f) => `<tr data-n="${f.n}"><td>${f.n}</td><td>${f.name}</td><td>${[...new Set(copy[f.n][4])].join(", ")}</td></tr>`).join("")}</tbody>`;

const fenceBox = document.querySelector("#fence");
const openFence = (f) => {
  const [k, ip, d, m, places] = copy[f.n];
  document.querySelector("#fence-type").textContent = groupOf(f.n)[0];
  document.querySelector("#fence-title").textContent = `${f.n} · ${f.name}`;
  document.querySelector("#fence-text").innerHTML = `<p><b>Konstrukcija.</b> ${k}</p><p><b>Īpašības.</b> ${ip}</p><p><b>Darbs.</b> ${d}</p><p><b>Materiāli.</b> ${m}</p>`;
  document.querySelector("#fence-where").textContent = [...new Set(places)].join(", ");
  document.querySelector("#fence-photos").replaceChildren(carousel(f.n, f.name, places));
  fenceBox.hidden = false;
  pageLock();
  requestAnimationFrame(() => fenceBox.classList.add("on"));
};
index.addEventListener("click", (e) => {
  const tr = e.target.closest("tr[data-n]");
  if (tr) openFence(fences.find((f) => f.n === +tr.dataset.n));
});
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
