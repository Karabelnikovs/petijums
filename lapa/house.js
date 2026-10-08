import * as THREE from "https://unpkg.com/three@0.169.0/build/three.module.js";

const stages = [
  "Pamata guļbaļķi",
  "Grīdas klāja dēļi",
  "Durvis, stabi un graudu rezervuāri",
  "Sienas un starpsiena",
  "Griestu sijas",
  "Griestu klājs un zelmiņi",
  "Jumta balsti un kopturi",
  "Spāres un savilces",
  "Jumta latojums",
  "Niedru jumta segums",
  "Jumta piespiedējdēļi",
];

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canvas = document.querySelector("#house-view");
const frameEl = canvas.parentElement;
const label = document.querySelector("#house-label");
const stepEl = document.querySelector("#house-step");
const playBtn = document.querySelector("#house-play");
const word = playBtn.querySelector("span");
const ruler = document.querySelector("#house-ruler");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0xe7dfd2);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const sky = document.createElement("canvas");
sky.width = 2;
sky.height = 256;
const wash = sky.getContext("2d").createLinearGradient(0, 0, 0, 256);
wash.addColorStop(0, "#f6f1e8");
wash.addColorStop(0.58, "#e7dfd2");
wash.addColorStop(1, "#d3c9b6");
const sg = sky.getContext("2d");
sg.fillStyle = wash;
sg.fillRect(0, 0, 2, 256);
const skyTex = new THREE.CanvasTexture(sky);
skyTex.colorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = skyTex;
const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 200);
scene.add(new THREE.HemisphereLight(0xfff8ee, 0x8d7b66, 0.95));
const sun = new THREE.DirectionalLight(0xfff3e0, 2.05);
const fill = new THREE.DirectionalLight(0xe7d3b4, 0.72);
scene.add(sun, fill);
const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.88, metalness: 0 });

const buf = await (await fetch("house.bin?v=4")).arrayBuffer();
const view = new DataView(buf);
let o = 6;
const count = view.getUint16(4, true);
const parts = [];
const seen = {};
for (let i = 0; i < count; i++) {
  const stage = view.getUint8(o);
  const ntri = view.getUint32(o + 1, true);
  o += 5;
  const nv = ntri * 3;
  const pos = new Float32Array(nv * 3);
  for (let k = 0; k < pos.length; k++) { pos[k] = view.getFloat32(o, true); o += 4; }
  const nrm = new Float32Array(nv * 3);
  for (let k = 0; k < nrm.length; k++) { nrm[k] = view.getInt8(o) / 127; o += 1; }
  const col = new Float32Array(nv * 3);
  for (let k = 0; k < col.length; k++) { col[k] = view.getUint8(o) / 255; o += 1; }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(nrm, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);
  seen[stage] = (seen[stage] || 0) + 1;
  parts.push({ mesh, stage, order: seen[stage] });
}

const box = new THREE.Box3().setFromObject(scene);
const target = box.getCenter(new THREE.Vector3());
const size = box.getSize(new THREE.Vector3());
sun.position.copy(target).add(new THREE.Vector3(-6, 11, 8));
fill.position.copy(target).add(new THREE.Vector3(8, 6, -5));
sun.target.position.copy(target);
fill.target.position.copy(target);
scene.add(sun.target, fill.target);

const disc = new THREE.Mesh(
  new THREE.CircleGeometry(1, 40),
  new THREE.MeshBasicMaterial({ color: 0x3a2a1c, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide, fog: false }),
);
disc.rotation.x = -Math.PI / 2;
const footprint = Math.max(size.x, size.z) * 0.92;
disc.scale.set(footprint, footprint * 0.78, 1);
disc.position.set(target.x, box.min.y - 0.02, target.z);
scene.add(disc);

let rotY = 0.78, rotX = 0.46, dist = size.length() * 1.08;
let stage = 10;
let intro = calm ? 0 : performance.now();
scene.fog = new THREE.Fog(0xe4dccb, dist * 2.4, dist * 4.6);

const aim = (now) => {
  let d = dist;
  if (intro) {
    const t = Math.min(1, (now - intro) / 1200);
    d = dist * (1.14 - 0.14 * (1 - (1 - t) ** 3));
    if (t === 1) intro = 0;
  }
  camera.position.set(
    target.x + d * Math.sin(rotY) * Math.cos(rotX),
    target.y + d * Math.sin(rotX),
    target.z + d * Math.cos(rotY) * Math.cos(rotX),
  );
  camera.lookAt(target);
};

const land = (t) => {
  const c1 = 1.1, c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

const ticks = stages.map((name, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.title = name;
  b.setAttribute("aria-label", `${i + 1}. ${name}`);
  b.innerHTML = "<i></i>";
  b.style.left = (i / (stages.length - 1)) * 100 + "%";
  ruler.append(b);
  return b;
});
const fillBar = document.createElement("span");
fillBar.className = "fill";
ruler.prepend(fillBar);

const paint = (n) => {
  ticks.forEach((b, i) => {
    b.classList.toggle("on", i === n);
    b.classList.toggle("done", n >= 0 && i < n);
  });
  ruler.style.setProperty("--i", String(Math.max(0, n)));
};

let labelTimer = 0;
const write = (n, instant) => {
  stepEl.textContent = n < 0 ? "—" : String(n + 1).padStart(2, "0");
  const next = n < 0 ? "Tukšs laukums" : stages[n];
  paint(n);
  if (label.textContent === next) return;
  clearTimeout(labelTimer);
  if (instant || calm) { label.textContent = next; label.classList.remove("swap"); return; }
  label.classList.add("swap");
  labelTimer = setTimeout(() => {
    label.textContent = next;
    label.classList.remove("swap");
  }, 140);
};

const show = (n, instant) => {
  const old = stage;
  stage = n;
  write(n, instant);
  const now = performance.now();
  for (const p of parts) {
    const enter = p.stage > old && p.stage <= n;
    const leave = p.stage <= old && p.stage > n;
    if (instant || calm || (!enter && !leave)) {
      p.mesh.visible = p.stage <= n;
      p.mesh.position.y = 0;
      p.anim = null;
    } else {
      p.anim = { t0: now + (enter ? p.order * 22 : 0), dur: enter ? 880 : 460, enter };
      p.mesh.visible = !enter;
      p.mesh.position.y = enter ? 2.2 : 0;
    }
  }
};

const setPlay = (on) => {
  playBtn.classList.toggle("on", on);
  playBtn.setAttribute("aria-pressed", on ? "true" : "false");
  word.textContent = on ? "Apturēt" : "Spēlēt";
};

let drag = null;
let touched = false;
const pointers = new Map();
let pinch = null;
canvas.addEventListener("pointerdown", (e) => {
  pointers.set(e.pointerId, [e.clientX, e.clientY]);
  touched = true;
  intro = 0;
  frameEl.classList.add("used");
  canvas.setPointerCapture(e.pointerId);
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), dist };
    drag = null;
    return;
  }
  drag = { x: e.clientX, y: e.clientY, rotY, rotX };
  frameEl.classList.add("drag");
});
canvas.addEventListener("pointermove", (e) => {
  if (pointers.has(e.pointerId)) pointers.set(e.pointerId, [e.clientX, e.clientY]);
  if (pinch && pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    const d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1;
    dist = Math.min(48, Math.max(3, pinch.dist * (pinch.d / d)));
    return;
  }
  if (!drag) return;
  rotY = drag.rotY + (e.clientX - drag.x) * 0.008;
  rotX = Math.max(-1.05, Math.min(1.15, drag.rotX + (e.clientY - drag.y) * 0.006));
});
const endDrag = (e) => {
  pointers.delete(e.pointerId);
  pinch = null;
  drag = null;
  frameEl.classList.remove("drag");
};
canvas.addEventListener("pointerup", endDrag);
canvas.addEventListener("pointercancel", endDrag);
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  intro = 0;
  touched = true;
  dist = Math.min(48, Math.max(3, dist * (e.deltaY > 0 ? 1.08 : 0.92)));
}, { passive: false });

const at = (e) => {
  const r = ruler.getBoundingClientRect();
  const x = Math.min(Math.max(0, e.clientX - r.left), r.width - 0.01);
  return Math.round((x / r.width) * (stages.length - 1));
};
const jump = (n) => {
  playToken++;
  setPlay(false);
  show(n, false);
};
let playToken = 0;
let scrub = null;
ruler.addEventListener("pointerdown", (e) => {
  const btn = e.target.closest("button");
  scrub = { x: e.clientX, moved: false, i: btn ? ticks.indexOf(btn) : at(e) };
  ruler.setPointerCapture(e.pointerId);
});
ruler.addEventListener("pointermove", (e) => {
  if (!scrub || (!scrub.moved && Math.abs(e.clientX - scrub.x) < 6)) return;
  if (!scrub.moved) { playToken++; setPlay(false); scrub.moved = true; }
  show(at(e), true);
});
const endScrub = () => {
  if (!scrub) return;
  const hit = scrub;
  scrub = null;
  if (!hit.moved) jump(hit.i);
};
ruler.addEventListener("pointerup", endScrub);
ruler.addEventListener("pointercancel", () => { scrub = null; });
ticks.forEach((b, i) => b.addEventListener("click", (e) => {
  if (e.detail) return;
  jump(i);
}));
ruler.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  e.preventDefault();
  const n = Math.max(0, Math.min(stages.length - 1, stage + (e.key === "ArrowRight" ? 1 : -1)));
  playToken++;
  setPlay(false);
  show(n, false);
  ticks[n].focus();
});

playBtn.addEventListener("click", async () => {
  if (playBtn.classList.contains("on")) { playToken++; setPlay(false); return; }
  const token = ++playToken;
  setPlay(true);
  show(-1, true);
  await new Promise((r) => setTimeout(r, calm ? 0 : 420));
  for (let s = 0; s <= 10; s++) {
    if (token !== playToken) return;
    show(s, false);
    await new Promise((r) => setTimeout(r, calm ? 0 : 1320));
  }
  if (token === playToken) setPlay(false);
});

const fit = () => {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
new ResizeObserver(fit).observe(canvas);
fit();
show(10, true);

(function loop(now) {
  for (const p of parts) {
    const a = p.anim;
    if (!a || now < a.t0) continue;
    const t = Math.min(1, (now - a.t0) / a.dur);
    const e = a.enter ? land(t) : t * t * (3 - 2 * t);
    if (a.enter) p.mesh.visible = true;
    p.mesh.position.y = 2.2 * (a.enter ? 1 - e : e);
    if (t === 1) { p.mesh.position.y = 0; p.mesh.visible = p.stage <= stage; p.anim = null; }
  }
  if (!drag && !calm && (playBtn.classList.contains("on") || !touched)) {
    rotY += playBtn.classList.contains("on") ? 0.0026 : 0.0005;
  }
  aim(now);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
})(performance.now());
