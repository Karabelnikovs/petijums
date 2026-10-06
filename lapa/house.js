import * as THREE from "https://unpkg.com/three@0.169.0/build/three.module.js";

const stages = [
  "Pamati, grīdas lagas",
  "Grīdas klājs",
  "Durvis, stabi un arodi",
  "Sienas un starpsiena",
  "Griestu sijas",
  "Griestu klājs un zelmiņi",
  "Jumta balsti un kopturi",
  "Spāres un savilces",
  "Jumta latojums",
  "Niedru jumta segums",
  "Jumta piespiedējdēļi",
];
const colors = [0x8a8175, 0xc4a574, 0x6b3a2a, 0x8d5a3c, 0xa97856, 0xb08968, 0xd7c4a3, 0xc4a882, 0xa98467, 0x6e4b32, 0x7a5236, 0x9a6b45, 0xc2a07a, 0xc4b48a, 0x5c4636];

const canvas = document.querySelector("#house-view");
const label = document.querySelector("#house-label");
const range = document.querySelector("#house-range");
const playBtn = document.querySelector("#house-play");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0xf4f0e8);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.05, 200);
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const sun = new THREE.DirectionalLight(0xffffff, 1.15);
sun.position.set(10, 16, 8);
scene.add(sun);
const mats = colors.map((c) => new THREE.MeshLambertMaterial({ color: c, side: THREE.DoubleSide }));

const buf = await (await fetch("house.bin")).arrayBuffer();
const view = new DataView(buf);
let o = 4;
const count = view.getUint16(o, true); o += 2;
const parts = [];
const seen = {};
for (let i = 0; i < count; i++) {
  const stage = view.getUint8(o);
  const group = view.getUint8(o + 1);
  const nv = view.getUint16(o + 2, true);
  const nt = view.getUint16(o + 4, true);
  o += 6;
  const pos = new Float32Array(nv * 3);
  for (let k = 0; k < pos.length; k++) { pos[k] = view.getFloat32(o, true); o += 4; }
  const idx = new Uint16Array(nt * 3);
  for (let k = 0; k < idx.length; k++) { idx[k] = view.getUint16(o, true); o += 2; }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, mats[group]);
  scene.add(mesh);
  seen[stage] = (seen[stage] || 0) + 1;
  parts.push({ mesh, stage, order: seen[stage] });
}

const box = new THREE.Box3().setFromObject(scene);
const target = box.getCenter(new THREE.Vector3());
let rotY = 0.7, rotX = 0.35, dist = box.getSize(new THREE.Vector3()).length() * 0.85;
let stage = 10;

const aim = () => {
  camera.position.set(
    target.x + dist * Math.sin(rotY) * Math.cos(rotX),
    target.y + dist * Math.sin(rotX),
    target.z + dist * Math.cos(rotY) * Math.cos(rotX),
  );
  camera.lookAt(target);
};

const show = (n, instant) => {
  const old = stage;
  stage = n;
  range.value = Math.max(0, n);
  label.textContent = n < 0 ? "Tukšs" : `${n + 1} · ${stages[n]}`;
  const now = performance.now();
  for (const p of parts) {
    const enter = p.stage > old && p.stage <= n;
    const leave = p.stage <= old && p.stage > n;
    if (instant || (!enter && !leave)) {
      p.mesh.visible = p.stage <= n;
      p.mesh.position.y = 0;
      p.anim = null;
    } else {
      p.anim = { t0: now + (enter ? p.order * 16 : 0), dur: enter ? 780 : 520, enter };
      p.mesh.visible = !enter;
      p.mesh.position.y = enter ? 3.4 : 0;
    }
  }
};

let drag = null;
canvas.addEventListener("pointerdown", (e) => {
  drag = { x: e.clientX, y: e.clientY, rotY, rotX };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener("pointermove", (e) => {
  if (!drag) return;
  rotY = drag.rotY + (e.clientX - drag.x) * 0.008;
  rotX = Math.max(-1.1, Math.min(1.2, drag.rotX + (e.clientY - drag.y) * 0.006));
});
canvas.addEventListener("pointerup", () => { drag = null; });
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  dist = Math.min(48, Math.max(3, dist * (e.deltaY > 0 ? 1.08 : 0.92)));
}, { passive: false });
let playToken = 0;
range.addEventListener("input", () => { playToken++; playBtn.textContent = "Spēlēt"; show(+range.value, true); });

playBtn.addEventListener("click", async () => {
  const token = ++playToken;
  playBtn.textContent = "Saliek";
  show(-1, true);
  for (let s = 0; s <= 10; s++) {
    if (token !== playToken) return;
    show(s, false);
    await new Promise((r) => setTimeout(r, 1400));
  }
  if (token === playToken) playBtn.textContent = "Spēlēt";
});

const fit = () => {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};
new ResizeObserver(fit).observe(canvas);
show(10, true);

(function frame(now) {
  for (const p of parts) {
    const a = p.anim;
    if (!a || now < a.t0) continue;
    const t = Math.min(1, (now - a.t0) / a.dur);
    const e = t * t * (3 - 2 * t);
    if (a.enter) p.mesh.visible = true;
    p.mesh.position.y = 3.4 * (a.enter ? 1 - e : e);
    if (t === 1) { p.mesh.position.y = 0; p.mesh.visible = p.stage <= stage; p.anim = null; }
  }
  aim();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
})(performance.now());
