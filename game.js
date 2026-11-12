"use strict";
const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
const now = () => Date.now() + (window.__skew || 0);
window.X6 = (() => {
  const d = {
    flags: {},
    fb: {},
    cat: { aff: 0, gift: 0 },
    dec: [],
    clr: [],
    cave: { cr: {}, rod: 0 },
    gt: 12,
    tps: 1,
    rec: 0,
    dump: 0,
    curse: 0,
    gift37: 0,
    fbk: {},
    god: {},
  };
  try {
    const o = JSON.parse(localStorage.getItem("island_x36") || "{}");
    for (const k in d) if (o[k] !== undefined) d[k] = o[k];
  } catch (e) {}
  return d;
})();
let _sv6 = 0;
function sv6() {
  clearTimeout(_sv6);
  _sv6 = setTimeout(() => {
    try {
      localStorage.setItem("island_x36", JSON.stringify(X6));
    } catch (e) {}
  }, 600);
}
const FLAT = 27,
  SHORE = 60,
  SEA = 0.28,
  VR = 18,
  L = 64,
  WET = 40 * 6e4,
  MATT = { carrot: 360, tree: 1200 };
const hs = (x, y, s) => {
  const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
  return v - Math.floor(v);
};
const vn = (x, y, s) => {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    fx = x - xi,
    fy = y - yi,
    u = fx * fx * (3 - 2 * fx),
    v = fy * fy * (3 - 2 * fy),
    a = hs(xi, yi, s),
    b = hs(xi + 1, yi, s),
    c = hs(xi, yi + 1, s),
    d = hs(xi + 1, yi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};
const ss = (a, b, x) => {
  x = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return x * x * (3 - 2 * x);
};
const HX = -24,
  HZ = -24,
  HA = 12,
  HS = 9,
  TH = Math.atan2(-HZ, -HX),
  AW = TH + 0.55,
  CW = TH - 0.75,
  AO = [Math.cos(AW), Math.sin(AW)],
  CO = [Math.cos(CW), Math.sin(CW)],
  RA = 7.5,
  RCV = 8.6,
  HF = (r) => HA * Math.exp((-r * r) / (2 * HS * HS)),
  AX = HX + AO[0] * RA,
  AZ = HZ + AO[1] * RA,
  CX0 = HX + CO[0] * RCV,
  CZ0 = HZ + CO[1] * RCV,
  AF = HF(RA) + 0.9 - 4.7,
  CF = HF(RCV) + 0.9 - 3.9,
  PNX = HX + AO[0] * 21,
  PNZ = HZ + AO[1] * 21,
  I2X = -224,
  I2Z = 135;
const sgd = (x, z, ax, az, bx, bz) => {
  const dx = bx - ax,
    dz = bz - az,
    t = Math.max(
      0,
      Math.min(1, ((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz)),
    );
  return Math.hypot(x - ax - dx * t, z - az - dz * t);
};
const TRN = [
  [-20, -22, 20, -22],
  [-2, -22, -2, -28],
  [-20, 22, 20, 22],
  [-2, 22, -2, 28],
  [-24, -18, -24, 18],
  [-24, -18, -20, -22],
  [-24, 18, -20, 22],
  [20, -22, 20, -15],
  [20, 22, 20, 15],
];
function gh(x, z) {
  const d = Math.hypot(x, z);
  let h = 1 - 1.35 * ss(FLAT, SHORE, d);
  h +=
    (vn(x / 7, z / 7, 3) * 2 - 0.7) *
    1.15 *
    ss(FLAT + 1, FLAT + 7, d) *
    (1 - ss(25, SHORE, d));
  const pd = Math.hypot(x + 11, z - 7);
  if (pd < 4.6) h = Math.min(h, 0.1 + ss(2.7, 4.6, pd) * 0.9);
  const hd = Math.hypot(x - HX, z - HZ);
  if (hd < 42) {
    const hf = HF(hd);
    h +=
      hf * (0.88 + 0.24 * vn(x / 3, z / 3, 21)) +
      0.35 * vn(x / 1.6, z / 1.6, 22) * ss(1, 6, hf);
  }
  {
    const a = sgd(
      x,
      z,
      AX - AO[0] * 1.6,
      AZ - AO[1] * 1.6,
      AX + AO[0] * 4.6,
      AZ + AO[1] * 4.6,
    );
    if (a < 3.9) h += (AF - h) * (1 - ss(3.2, 3.9, a));
    const c = sgd(x, z, CX0, CZ0, CX0 + CO[0] * 3, CZ0 + CO[1] * 3);
    if (c < 3.6) h += (CF - h) * (1 - ss(2.2, 3.6, c));
    const pn = Math.hypot(x - PNX, z - PNZ);
    if (pn < 6) h = Math.min(h, 0.05 + ss(3, 6, pn) * 0.95);
  }
  {
    const px = x - HX,
      pz = z - HZ,
      bt = -(px * Math.cos(TH) + pz * Math.sin(TH)),
      lt = -px * Math.sin(TH) + pz * Math.cos(TH),
      w = ss(1.5, 6.5, bt);
    if (w > 0) {
      h +=
        w *
        6.2 *
        Math.exp(
          -(Math.pow(bt - 10, 2) / (2 * 8.5 * 8.5) + (lt * lt) / (2 * 11 * 11)),
        ) *
        (0.9 + 0.2 * vn(x / 4, z / 4, 23));
    }
  }
  {
    const d2 = Math.hypot(x - I2X, z - I2Z);
    if (d2 < 100) {
      const e = 1 - ss(38, 64, d2);
      let v =
        6.4 * e -
        0.55 +
        0.12 * vn(x / 10, z / 10, 60) * e +
        1.0 * vn(x / 16, z / 16, 64) * ss(30, 52, d2) * e;
      const aa = Math.atan2(-I2Z, -I2X),
        ca = Math.cos(aa),
        sa = Math.sin(aa),
        dx = (x - (I2X + 1)) / 1.6,
        dz = (z - (I2Z - 1)) / 1.6,
        lx = dx * ca + dz * sa,
        lz = -dx * sa + dz * ca,
        q = Math.max(Math.abs(lx - 1) - 17, Math.abs(lz) - 15);
      if (q < 5) v += (5 - v) * (1 - ss(0, 5, q));
      if (v > h) h = v;
      {
        let td = 1e9;
        for (let i = 0; i < TRN.length; i++) {
          const t = TRN[i];
          td = Math.min(td, sgd(lx, lz, t[0], t[1], t[2], t[3]));
        }
        if (td < 2.6) h -= 1.15 * (1 - ss(0.9, 2.6, td)) * ss(1.2, 3.4, h);
      }
    }
  }
  return h;
}
// ---------- renderer & scene ----------
const R = new THREE.WebGLRenderer({
  canvas: $("#c"),
  antialias: true,
  powerPreference: "high-performance",
});
R.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
R.outputEncoding = THREE.LinearEncoding;
R.shadowMap.enabled = true;
R.shadowMap.type = THREE.PCFSoftShadowMap;
R.shadowMap.autoUpdate = false;
R.shadowMap.needsUpdate = true;
var _shT = 0,
  _wvT = 0;

const scene = new THREE.Scene(),
  cam = new THREE.PerspectiveCamera(38, 1, 0.5, 520);
const hemi = new THREE.HemisphereLight(0xe8f6ff, 0x9ab87a, 0.5),
  sun = new THREE.DirectionalLight(0xfff4e0, 0.6);
sun.castShadow = true;
sun.shadow.mapSize.set(
  innerWidth < 760 ? 1024 : 2048,
  innerWidth < 760 ? 1024 : 2048,
);
{
  const c = sun.shadow.camera;
  c.left = -26;
  c.right = 26;
  c.top = 26;
  c.bottom = -26;
  c.near = 1;
  c.far = 100;
}
sun.shadow.bias = -0.0005;
sun.shadow.normalBias = 0.04;
scene.add(hemi, sun, sun.target);
scene.fog = new THREE.Fog(0xbfe8ff, 38, 140);
scene.background = new THREE.Color(0xbfe8ff);
const M = (c, o) =>
  new THREE.MeshStandardMaterial(
    Object.assign({ color: c, roughness: 0.85, metalness: 0 }, o),
  );
function resize() {
  R.setSize(innerWidth, innerHeight, false);
  cam.aspect = innerWidth / innerHeight;
  cam.updateProjectionMatrix();
}
addEventListener("resize", resize);
resize();
// terrain
const tg = new THREE.PlaneGeometry(2 * L, 2 * L, 230, 230);
tg.rotateX(-Math.PI / 2);
{
  const p = tg.attributes.position,
    c = new Float32Array(p.count * 3),
    k = new THREE.Color(),
    A = new THREE.Color(),
    B = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      z = p.getZ(i),
      h = gh(x, z);
    p.setY(i, h);
    const n = vn(x / 3, z / 3, 8),
      m = vn(x / 10, z / 10, 12);
    if (h < SEA) k.setHex(0xd2bd86).lerp(A.setHex(0xb9a574), ss(0.2, -0.2, h));
    else {
      A.setHex(0xf6e2a8).lerp(B.setHex(0xe9cd90), n);
      k.setHex(0x7fd25c)
        .lerp(B.setHex(0xa6e36c), n * 0.8)
        .lerp(B.setHex(0x6cc457), m * 0.5);
      if (h > 1.45) k.lerp(B.setHex(0xa4c75e), 0.4);
      k.lerp(A, 1 - ss(0.5, 0.78, h));
    }
    c.set([k.r, k.g, k.b], i * 3);
  }
  tg.setAttribute("color", new THREE.BufferAttribute(c, 3));
  tg.computeVertexNormals();
}
const terrain = new THREE.Mesh(tg, M(0xffffff, { vertexColors: true }));
terrain.receiveShadow = true;
scene.add(terrain);
var HMG = null;
{
  const p = tg.attributes.position,
    N = 231,
    S = (2 * L) / 230;
  HMG = new Float32Array(N * N);
  for (let i = 0; i < p.count; i++) {
    const ix = Math.round((p.getX(i) + L) / S),
      iz = Math.round((p.getZ(i) + L) / S);
    HMG[iz * N + ix] = p.getY(i);
  }
}
function hm(x, z) {
  if (!HMG) return gh(x, z);
  const S = (2 * L) / 230,
    fx = (x + L) / S,
    fz = (z + L) / S;
  if (fx < 0 || fz < 0 || fx >= 230 || fz >= 230) return gh(x, z);
  const ix = Math.floor(fx),
    iz = Math.floor(fz),
    tx = fx - ix,
    tz = fz - iz,
    a = HMG[iz * 231 + ix],
    b = HMG[iz * 231 + ix + 1],
    c = HMG[(iz + 1) * 231 + ix],
    d = HMG[(iz + 1) * 231 + ix + 1];
  return (
    a * (1 - tx) * (1 - tz) +
    b * tx * (1 - tz) +
    c * (1 - tx) * tz +
    d * tx * tz
  );
}
function grnd(g, T, R, x, z, minY) {
  const r = 0.8,
    h = [hm(x, z), hm(x + r, z), hm(x - r, z), hm(x, z + r), hm(x, z - r)],
    n = new THREE.Vector3(
      -(h[1] - h[2]) / (2 * r),
      1,
      -(h[3] - h[4]) / (2 * r),
    ).normalize();
  T.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n);
  g.rotation.y = rnd() * 6.28;
  R.position.set(x, Math.max(...h, minY === undefined ? -9 : minY) + 0.02, z);
}
const wg = new THREE.PlaneGeometry(2 * L, 2 * L, 100, 100);
wg.rotateX(-Math.PI / 2);
const wp = wg.attributes.position;
{
  const c = new Float32Array(wp.count * 3),
    k = new THREE.Color(),
    B = new THREE.Color();
  for (let i = 0; i < wp.count; i++) {
    const dp = SEA - gh(wp.getX(i), wp.getZ(i));
    k.setHex(0x7fe6e0).lerp(B.setHex(0x3f9fe8), ss(0.1, 1.1, dp));
    c.set([k.r, k.g, k.b], i * 3);
  }
  wg.setAttribute("color", new THREE.BufferAttribute(c, 3));
}
const water = new THREE.Mesh(
  wg,
  M(0xffffff, { vertexColors: true, roughness: 0.3, metalness: 0.05 }),
);
water.position.y = SEA;
scene.add(water);
const sea = new THREE.Mesh(
  new THREE.CircleGeometry(420, 40),
  M(0x4aa8e6, { roughness: 0.4 }),
);
sea.rotation.x = -Math.PI / 2;
sea.position.y = SEA - 0.06;
scene.add(sea);
// ---------- world objects ----------
const items = [],
  IG = new THREE.Group();
scene.add(IG);
function addItem(o) {
  o.r0 = o.r;
  o.s0 = o.root.scale.x;
  o.root.userData.item = o;
  IG.add(o.root);
  o.root.updateMatrixWorld(true);
  items.push(o);
  return o;
}
let sd = 7;
const rnd = () => {
  sd = (sd * 16807) % 2147483647;
  return (sd - 1) / 2147483646;
};
const FIX = [
  [0, 5, 3],
  [0, -10, 6.6],
  [7, 6, 2.2],
  [-6, 5, 2.4],
  [0, -1, 3.2],
  [-11, 7, 6],
];
function shoreAt(a, from) {
  for (let r = from; r < 62; r += 0.25) {
    const x = Math.cos(a) * r,
      z = Math.sin(a) * r;
    if (gh(x, z) < 0.62) return [x, z];
  }
  return null;
}
const BOATP = shoreAt(2.6, 28) || [-24, 10];
FIX.push([BOATP[0], BOATP[1], 5]);
const CVX = 300,
  CVZ = 0,
  inPond = (x, z) => Math.hypot(x + 11, z - 7) < 4.3;
const free = (x, z, m) =>
  FIX.every((u) => Math.hypot(x - u[0], z - u[1]) > u[2] + m) &&
  items.every((i) => Math.hypot(x - i.x, z - i.z) > (i.r || 0) + m);
const G = {
  trunk: new THREE.CylinderGeometry(0.15, 0.22, 1.1, 8),
  crown: new THREE.SphereGeometry(1, 12, 9),
  stem: new THREE.CylinderGeometry(0.02, 0.02, 0.28, 4),
  rock: new THREE.DodecahedronGeometry(1, 0),
};
function treeMesh(cherry, i) {
  const g = new THREE.Group(),
    t = new THREE.Mesh(G.trunk, M(0x8a5a3a));
  t.position.y = 0.55;
  t.castShadow = true;
  g.add(t);
  const pal = cherry
      ? [0xffb9cf, 0xffa6c2, 0xffcbdb]
      : [0x82d96c, 0x6fc860, 0x96e072],
    mat = M(pal[i % 3]);
  [
    [0, 1.75, 0, 1.2],
    [0.6, 1.35, 0.2, 0.82],
    [-0.55, 1.4, -0.25, 0.88],
    [0.1, 2.25, 0.1, 0.7],
  ].forEach(([x, y, z, s]) => {
    const c = new THREE.Mesh(G.crown, mat);
    c.position.set(x, y, z);
    c.scale.set(s, s * 0.88, s);
    c.castShadow = true;
    g.add(c);
  });
  return g;
}
function rockMesh(i) {
  const g = new THREE.Group(),
    m = M(i % 2 ? 0xb9bec8 : 0xa8aeb9);
  [
    [0, 0.35, 0, 0.7, 0.55],
    [0.55, 0.22, 0.2, 0.42, 0.35],
    [-0.45, 0.18, -0.25, 0.34, 0.3],
  ].forEach(([x, y, z, a, b]) => {
    const r = new THREE.Mesh(G.rock, m);
    r.position.set(x, y, z);
    r.scale.set(a, b, a * 0.9);
    r.rotation.set(i, i * 2, 0);
    r.castShadow = r.receiveShadow = true;
    g.add(r);
  });
  return g;
}
function bushMesh(i) {
  const g = new THREE.Group(),
    m = M(0x5fc058);
  [
    [0, 0.4, 0, 0.55],
    [0.4, 0.3, 0.15, 0.4],
    [-0.38, 0.32, -0.1, 0.42],
  ].forEach(([x, y, z, s]) => {
    const b = new THREE.Mesh(G.crown, m);
    b.position.set(x, y, z);
    b.scale.setScalar(s);
    b.castShadow = true;
    g.add(b);
  });
  const bm = M(0xff5a78);
  for (let k = 0; k < 5; k++) {
    const b = new THREE.Mesh(G.crown, bm);
    b.scale.setScalar(0.07);
    const a = k * 1.3 + i;
    b.position.set(Math.cos(a) * 0.5, 0.35 + (k % 2) * 0.2, Math.sin(a) * 0.5);
    g.add(b);
  }
  return g;
}
function place(root, x, z, y) {
  root.position.set(x, y === undefined ? gh(x, z) : y, z);
  return root;
}
let nT = 0,
  nR = 0,
  nB = 0;
for (let n = 0, tries = 0; n < 95 && tries < 1500; tries++) {
  const a = rnd() * 6.283,
    d = 13.5 + rnd() * 30,
    x = Math.cos(a) * d,
    z = Math.sin(a) * d;
  if (gh(x, z) < 0.8 || !free(x, z, 1.7)) continue;
  n++;
  const ch = hs(x, z, 5) > 0.72,
    r = treeMesh(ch, n);
  r.rotation.y = rnd() * 6;
  r.scale.setScalar(0.85 + rnd() * 0.5);
  addItem({
    id: "t" + nT++,
    kind: "tree",
    x,
    z,
    r: 0.55,
    reach: 1.9,
    root: place(r, x, z),
    hint: "Tap to chop 🪓",
    cd: 0,
  });
}
for (let n = 0, tries = 0; n < 16 && tries < 700; tries++) {
  const a = rnd() * 6.283,
    d = 9 + rnd() * 32,
    x = Math.cos(a) * d,
    z = Math.sin(a) * d;
  if (gh(x, z) < 0.8 || !free(x, z, 1.4)) continue;
  n++;
  const r = rockMesh(n);
  r.rotation.y = rnd() * 6;
  addItem({
    id: "r" + nR++,
    kind: "rock",
    x,
    z,
    r: 0.8,
    reach: 2,
    root: place(r, x, z),
    hint: "Tap to mine stone ⛏️",
    cd: 0,
  });
}
for (let n = 0, tries = 0; n < 48 && tries < 800; tries++) {
  const a = rnd() * 6.283,
    d = 6 + rnd() * 34,
    x = Math.cos(a) * d,
    z = Math.sin(a) * d;
  if (gh(x, z) < 0.8 || !free(x, z, 1.2)) continue;
  n++;
  addItem({
    id: "b" + nB++,
    kind: "bush",
    x,
    z,
    r: 0.5,
    reach: 1.7,
    root: place(bushMesh(n), x, z),
    hint: "Tap to pick berries 🌿",
    cd: 0,
  });
}
// grass tufts & flowers
{
  const cg = new THREE.ConeGeometry(0.09, 0.3, 5);
  cg.translate(0, 0.15, 0);
  const tm = M(0xffffff),
    T = new THREE.InstancedMesh(cg, tm, 1900),
    mx = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e = new THREE.Euler(),
    c = new THREE.Color();
  let n = 0;
  for (let t = 0; t < 9000 && n < 1900; t++) {
    const a = hs(t, 1, 1) * 6.283,
      d = Math.sqrt(hs(t, 2, 2)) * 46,
      x = Math.cos(a) * d,
      z = Math.sin(a) * d,
      h = gh(x, z);
    if (h < 0.75 || !free(x, z, 0.5)) continue;
    e.set(
      (hs(t, 3, 3) - 0.5) * 0.5,
      hs(t, 4, 4) * 6,
      (hs(t, 5, 5) - 0.5) * 0.5,
    );
    q.setFromEuler(e);
    const s = 0.7 + hs(t, 6, 6) * 0.9;
    mx.compose(
      new THREE.Vector3(x, h - 0.02, z),
      q,
      new THREE.Vector3(s, s, s),
    );
    T.setMatrixAt(n, mx);
    c.setHex(0x5fc454).lerp(new THREE.Color(0xa9e66f), hs(t, 7, 7));
    T.setColorAt(n++, c);
  }
  T.count = n;
  window.GRS = T;
  window.GRSn = n;
  T.receiveShadow = true;
  T.frustumCulled = false;
  scene.add(T);
  const fg = new THREE.SphereGeometry(0.1, 8, 6),
    F = new THREE.InstancedMesh(fg, M(0xffffff), 380),
    fs = new THREE.InstancedMesh(G.stem, M(0x4fae4a), 380),
    fc = [0xffffff, 0xff9ec0, 0xffe066, 0xc9a6ff, 0xff8a7a];
  let f = 0;
  for (let t = 0; t < 4000 && f < 380; t++) {
    const a = hs(t, 11, 1) * 6.283,
      d = Math.sqrt(hs(t, 12, 2)) * 44,
      x = Math.cos(a) * d,
      z = Math.sin(a) * d,
      h = gh(x, z);
    if (h < 0.9 || !free(x, z, 0.6)) continue;
    mx.makeTranslation(x, h + 0.3, z);
    F.setMatrixAt(f, mx);
    c.setHex(fc[f % 5]);
    F.setColorAt(f, c);
    mx.makeTranslation(x, h + 0.14, z);
    fs.setMatrixAt(f++, mx);
  }
  F.count = fs.count = f;
  window.FLW = [F, fs];
  window.FLWn = f;
  F.frustumCulled = fs.frustumCulled = false;
  scene.add(F, fs);
}
// ---------- structures ----------
const hg = new THREE.Shape();
hg.moveTo(0, -0.6);
hg.bezierCurveTo(-1.1, 0.1, -0.6, 0.9, 0, 0.45);
hg.bezierCurveTo(0.6, 0.9, 1.1, 0.1, 0, -0.6);
const HEARTG = new THREE.ExtrudeGeometry(hg, {
  depth: 0.3,
  bevelEnabled: true,
  bevelSize: 0.08,
  bevelThickness: 0.08,
  bevelSegments: 3,
  curveSegments: 18,
});
HEARTG.center();
const glow = [];
const EM = (c, i) => {
  const m = M(c, { emissive: c, emissiveIntensity: i, roughness: 0.4 });
  glow.push(m);
  return m;
};
const stone = M(0xd8d2c8),
  dark = M(0x8f8a84);
const altar = new THREE.Group();
{
  const b = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 4, 0.35, 32), stone),
    s = new THREE.Mesh(new THREE.CylinderGeometry(2.9, 3.1, 0.3, 32), stone),
    p = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.72, 1.5, 16), stone);
  b.position.y = 0.17;
  s.position.y = 0.5;
  p.position.y = 1.4;
  [b, s, p].forEach((m) => {
    m.castShadow = m.receiveShadow = true;
    altar.add(m);
  });
  const heart = new THREE.Mesh(HEARTG, EM(0xff5a8a, 0.7));
  heart.scale.setScalar(0.9);
  heart.position.y = 3;
  heart.castShadow = true;
  altar.add(heart);
  altar.userData.heart = heart;
  const pl = new THREE.PointLight(0xff7aa8, 0.9, 12);
  pl.position.y = 3;
  altar.add(pl);
  altar.userData.pl = pl;
}
place(altar, 0, -10, 1);
scene.add(altar);
const altarItem = { x: 0, z: -10, r: 1.1 };
items.push(Object.assign({ kind: "static", root: altar }, altarItem));
const BR = [
  ["flirty", "😘", 0xff8fb3, "Flirty", 10],
  ["spicy", "🔥", 0xff6a3c, "Spicy", 20],
  ["hot", "🥵", 0xd0144e, "Hot", 30],
  ["deep", "🧠", 0x5a8bff, "Deep", 25],
  ["dare", "😈", 0xa86bff, "Dare", 25],
];
const flames = [];
BR.forEach((b, i) => {
  const a = (i - 2) * 0.58,
    x = Math.sin(a) * 3.1,
    z = -10 + Math.cos(a) * 3.1,
    g = new THREE.Group(),
    bowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.22, 0.4, 14),
      dark,
    ),
    f = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.7, 10), EM(b[2], 1.3)),
    leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.5, 8), dark);
  leg.position.y = 0.25;
  bowl.position.y = 0.62;
  f.position.y = 1.1;
  bowl.castShadow = leg.castShadow = true;
  g.add(leg, bowl, f);
  flames.push(f);
  const pl = new THREE.PointLight(b[2], 0.5, 5);
  pl.position.y = 1.2;
  g.add(pl);
  addItem({
    id: "brazier",
    kind: "brazier",
    bk: b[0],
    x,
    z,
    r: 0.4,
    reach: 1.8,
    root: place(g, x, z, 1.02),
    hint: b[1] + " " + b[3] + " flame: tap to draw a card",
    cd: 0,
  });
});
const mb = new THREE.Group();
{
  const post = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 1.1, 0.18),
      M(0x9a6a40),
    ),
    box = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.5, 1.05), M(0xff8fb3)),
    top = new THREE.Mesh(
      new THREE.CylinderGeometry(0.375, 0.375, 1.05, 14, 1, false, 0, Math.PI),
      M(0xff8fb3),
    ),
    flag = new THREE.Group(),
    fl = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.28, 0.06), M(0xffe066));
  post.position.y = 0.55;
  box.position.y = 1.25;
  top.rotation.z = Math.PI / 2;
  top.rotation.y = 0;
  top.position.set(0, 1.5, 0);
  top.rotation.set(0, 0, Math.PI / 2);
  fl.position.x = 0.25;
  flag.add(fl);
  flag.position.set(0.4, 1.45, 0.2);
  mb.add(post, box, flag);
  mb.userData.flag = flag;
  mb.traverse((o) => {
    o.castShadow = true;
  });
}
const mbItem = addItem({
  id: "mail",
  kind: "mail",
  x: 7,
  z: 6,
  r: 0.6,
  reach: 1.9,
  root: place(mb, 7, 6),
  hint: "✉️ Mailbox: send or answer 3 questions",
  cd: 0,
});
const bench = new THREE.Group();
{
  const top = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.16, 0.95),
      M(0xd9a566),
    ),
    lg = new THREE.BoxGeometry(0.14, 0.8, 0.14);
  top.position.y = 0.88;
  bench.add(top);
  [
    [-0.8, -0.4],
    [0.8, -0.4],
    [-0.8, 0.4],
    [0.8, 0.4],
  ].forEach(([x, z]) => {
    const l = new THREE.Mesh(lg, M(0x8a5a3a));
    l.position.set(x, 0.4, z);
    bench.add(l);
  });
  const saw = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.05, 0.18),
    M(0xc9ccd4),
  );
  saw.position.set(-0.3, 1, 0);
  const hm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.12), M(0x777));
  hm.position.set(0.4, 1.02, 0.1);
  bench.add(saw, hm);
  bench.traverse((o) => {
    o.castShadow = true;
  });
}
addItem({
  id: "bench",
  kind: "bench",
  x: -6,
  z: 5,
  r: 1,
  reach: 2.3,
  root: place(bench, -6, 5),
  hint: "🔨 Workbench: craft materials",
  cd: 0,
});
const heartTree = new THREE.Group();
{
  const t = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.45, 2.2, 10),
    M(0x9a6a5a),
  );
  t.position.y = 1.1;
  t.castShadow = true;
  heartTree.add(t);
  [
    [0, 3, 0, 1.7],
    [1, 2.5, 0.3, 1.1],
    [-1, 2.6, -0.3, 1.2],
    [0.2, 3.9, 0.2, 1],
  ].forEach(([x, y, z, s], i) => {
    const c = new THREE.Mesh(G.crown, M(i % 2 ? 0xffb2c9 : 0xffa0be));
    c.position.set(x, y, z);
    c.scale.set(s, s * 0.85, s);
    c.castShadow = true;
    heartTree.add(c);
  });
}
const htItem = addItem({
  id: "ht",
  kind: "ht",
  x: 0,
  z: -1,
  r: 0.7,
  reach: 2.4,
  root: place(heartTree, 0, -1),
  hint: "💞 Heart Tree: grow it together",
  cd: 0,
});
{
  const b = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.16, 8, 26), stone);
  b.rotation.x = Math.PI / 2;
  b.position.set(0, -0.5, 0);
  heartTree.add(b);
}
// lamp posts
const lamps = [];
[
  [-4, 2],
  [4, 2],
  [-12, -3],
  [12, -3],
].forEach(([x, z]) => {
  const g = new THREE.Group(),
    p = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 2, 8),
      M(0x4a4a58),
    ),
    b = new THREE.Mesh(G.crown, EM(0xffe6a0, 0.2));
  p.position.y = 1;
  b.position.y = 2.1;
  b.scale.setScalar(0.2);
  g.add(p, b);
  lamps.push(b);
  place(g, x, z);
  scene.add(g);
});
// ---------- cave, hidden parts ----------
function spotAt(x, z) {
  for (let rr = 0; rr < 16; rr += 1.5)
    for (let k = 0; k < 8; k++) {
      const a = k * 0.785,
        px = x + Math.cos(a) * rr,
        pz = z + Math.sin(a) * rr;
      if (gh(px, pz) > 0.85 && Math.hypot(px, pz) < 33 && free(px, pz, 1.4))
        return [px, pz];
    }
  return [x, z];
}
function beachAt(a) {
  for (let r = 62; r > 24; r -= 0.2) {
    const x = Math.cos(a) * r,
      z = Math.sin(a) * r,
      h = gh(x, z);
    if (h < 0.78 && h > 0.52) return [x, z];
  }
  return null;
}
const ENT = spotAt(-20, -17),
  caveG = new THREE.Group();
caveG.position.set(CVX, 0, CVZ);
scene.add(caveG);
{
  const rk = M(0x9a96a2),
    arch = new THREE.Group();
  [-1.25, 1.25].forEach((x) => {
    const r = new THREE.Mesh(G.rock, rk);
    r.position.set(x, 0.9, 0);
    r.scale.set(0.9, 1.5, 0.9);
    r.castShadow = true;
    arch.add(r);
  });
  const tp = new THREE.Mesh(G.rock, rk);
  tp.position.set(0, 2.2, 0);
  tp.scale.set(1.9, 0.7, 0.9);
  tp.castShadow = true;
  arch.add(tp);
  const mo = new THREE.Mesh(new THREE.CircleGeometry(0.95, 16), M(0x15101c));
  mo.position.set(0, 0.95, 0.7);
  arch.add(mo);
  arch.rotation.y = Math.atan2(-ENT[0], -ENT[1]);
  addItem({
    id: "cave",
    kind: "cave",
    x: ENT[0],
    z: ENT[1],
    r: 1.6,
    reach: 3.2,
    root: place(arch, ENT[0], ENT[1]),
    hint: "🕳️ A small cave: tap to go inside",
  });
  const fl = new THREE.Mesh(new THREE.CircleGeometry(6.2, 28), M(0x8a8196));
  fl.rotation.x = -Math.PI / 2;
  fl.position.y = 0.5;
  fl.receiveShadow = true;
  caveG.add(fl);
  const wm = M(0x6e667c);
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * 6.283,
      r = new THREE.Mesh(G.rock, wm);
    r.position.set(Math.cos(a) * 6.4, 0.9, Math.sin(a) * 6.4);
    r.scale.set(1.3, 0.75 + hs(i, 1, 1) * 0.35, 1.3);
    r.rotation.y = i;
    r.castShadow = true;
    caveG.add(r);
  }
  const dm = new THREE.Mesh(
    new THREE.SphereGeometry(9.5, 22, 10, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x2c2538, side: THREE.BackSide }),
  );
  dm.position.y = 0.3;
  caveG.add(dm);
  const l1 = new THREE.PointLight(0xa58aff, 1.1, 18);
  l1.position.set(0, 3, 0);
  caveG.add(l1);
  [0.6, 2.2, 3.8, 5.2].forEach((a, i) => {
    const g = new THREE.Group(),
      cc = [0x7aa7ff, 0xb48cff, 0x6fe3c1];
    [
      [0, 0.9, 0.3],
      [0.35, 0.7, 0.25],
      [-0.3, 0.6, 0.22],
    ].forEach(([x, h, r], k) => {
      const c = new THREE.Mesh(
        new THREE.ConeGeometry(r, h * 2, 5),
        EM(cc[(i + k) % 3], 1.1),
      );
      c.position.set(x, h, 0);
      c.rotation.z = x * 0.5;
      g.add(c);
    });
    const x = CVX + Math.cos(a) * 3.6,
      z = CVZ + Math.sin(a) * 3.6;
    addItem({
      id: "cr" + i,
      kind: "crystal",
      x,
      z,
      r: 0.5,
      reach: 2,
      root: place(g, x, z, 0.5),
      hint: "💎 Crystals: tap to mine",
      cd: 0,
    });
  });
  const ex = new THREE.Group(),
    ar = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.18, 8, 24, Math.PI),
      EM(0xffe6a0, 1.6),
    ),
    pl2 = new THREE.PointLight(0xffe6a0, 1.2, 9);
  ar.position.y = 0.5;
  pl2.position.y = 1.5;
  ex.add(ar, pl2);
  addItem({
    id: "exit",
    kind: "exit",
    x: CVX,
    z: CVZ + 4.6,
    r: 0,
    reach: 3.4,
    root: place(ex, CVX, CVZ + 4.6, 0.5),
    hint: "↩️ Leave the cave",
  });
}
const PARTS = [
  {
    at: () => spotAt(10, -4),
    h: "A sparkle glints near the village's east edge.",
  },
  {
    at: () => [CVX - 2.6, CVZ - 2.4],
    h: "Something shiny hides deep inside the little cave.",
  },
  {
    at: () => [-11, 7.6],
    h: "Wade into the pond: a sparkle rests on the bottom.",
  },
  { at: () => spotAt(-6, -25), h: "On the high ground north of the altar." },
  { at: () => beachAt(0.35) || [30, 10], h: "Washed up on the eastern beach." },
  { at: () => spotAt(-23, 13), h: "Hidden in the western grove." },
  {
    at: () => [BOATP[0] * 0.78, BOATP[1] * 0.78],
    h: "Under the driftwood near the wreck.",
  },
  {
    at: () => spotAt(3, -7),
    h: "Beneath the altar's glow. It only shows when you are both there.",
  },
];
PARTS.forEach((q) => {
  q.p = q.at();
});
let partItem = null;
function syncPart() {
  const c = chap(),
    done = true;
  if (partItem && (done || partItem.c !== c)) {
    IG.remove(partItem.root);
    items.splice(items.indexOf(partItem), 1);
    partItem = null;
  }
  if (done || partItem) return;
  const p = PARTS[c].p,
    g = new THREE.Group(),
    core = new THREE.Mesh(G.crown, EM(0xffd24a, 1.5)),
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.05, 8, 20),
      EM(0xfff2a0, 1.1),
    );
  core.scale.setScalar(0.2);
  core.position.y = 0.7;
  ring.position.y = 0.7;
  ring.rotation.x = Math.PI / 2;
  g.add(core, ring);
  partItem = addItem({
    id: "part",
    kind: "part",
    c,
    x: p[0],
    z: p[1],
    r: 0,
    reach: 2.2,
    root: place(
      g,
      p[0],
      p[1],
      c === 1 ? 0.5 : Math.max(gh(p[0], p[1]), c === 2 ? 0.1 : 0),
    ),
    hint: "✨ Something is buried here! Tap to dig it up",
  });
  partTick();
}
function partTick() {
  if (!partItem) return;
  const d = Math.hypot(partItem.x - me3.x, partItem.z - me3.z),
    on = IG.children.includes(partItem.root);
  if (d < 10 && !on) IG.add(partItem.root);
  else if (d >= 10 && on) IG.remove(partItem.root);
}
// ---------- campaign structures ----------
const boatG = new THREE.Group(),
  boatParts = [];
let boatHole;
{
  const wood = M(0xb5835a),
    sh = new THREE.Shape();
  sh.moveTo(-2.3, 1);
  sh.quadraticCurveTo(-2.15, 0.1, -1.5, 0);
  sh.lineTo(1.6, 0);
  sh.quadraticCurveTo(2.8, 0.15, 3.2, 1.25);
  sh.lineTo(2.6, 0.95);
  sh.lineTo(-1.9, 0.85);
  sh.lineTo(-2.3, 1);
  const hg2 = new THREE.ExtrudeGeometry(sh, {
    depth: 1.5,
    bevelEnabled: true,
    bevelSize: 0.12,
    bevelThickness: 0.12,
    bevelSegments: 2,
    curveSegments: 8,
  });
  hg2.translate(0, 0, -0.75);
  hg2.rotateY(-Math.PI / 2);
  const hull = new THREE.Mesh(hg2, wood),
    bow = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.06, 4.3), M(0x6e4a2e));
  bow.position.set(0, 0.93, 0.4);
  hull.castShadow = true;
  boatHole = new THREE.Mesh(new THREE.CircleGeometry(0.36, 14), M(0x1e140c));
  boatHole.position.set(0.9, 0.5, 0.3);
  boatHole.rotation.y = Math.PI / 2;
  boatG.add(hull, bow, boatHole);
  const part = (i, m) => {
    m.userData.part = i;
    boatParts.push(m);
    boatG.add(m);
    m.traverse((o) => {
      o.castShadow = true;
    });
  };
  const bx = (w, h, d, c, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M(c));
    m.position.set(x, y, z);
    return m;
  };
  part(0, bx(0.06, 0.6, 0.8, 0xe6b87a, 0.93, 0.5, 0.3));
  part(
    1,
    (() => {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.1, 3.4, 8),
        M(0x8a5a3a),
      );
      m.position.set(0, 2.4, 0.4);
      return m;
    })(),
  );
  part(
    2,
    (() => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(2.1, 2.3),
        M(0xfff4e0, {
          side: THREE.DoubleSide,
          emissive: 0xfff4e0,
          emissiveIntensity: 0.45,
        }),
      );
      m.position.set(0, 2.7, 0.9);
      m.rotation.y = Math.PI / 2;
      return m;
    })(),
  );
  part(3, bx(0.1, 0.8, 0.9, 0x8a5a3a, 0, 0.5, -2.35));
  part(4, bx(1.3, 0.06, 1.5, 0x2a4a8a, 0, 1.0, -1.0));
  part(
    5,
    (() => {
      const g = new THREE.Group();
      g.add(bx(1.2, 0.9, 1.1, 0xd9a566, 0, 1.3, 1.3));
      const r = new THREE.Mesh(
        new THREE.ConeGeometry(0.95, 0.6, 4),
        M(0xc8685a),
      );
      r.rotation.y = Math.PI / 4;
      r.position.set(0, 2.05, 1.3);
      g.add(r);
      return g;
    })(),
  );
  part(
    6,
    (() => {
      const g = new THREE.Group();
      g.add(
        bx(0.5, 0.5, 0.5, 0xc79a5a, -0.4, 1.1, -1.8),
        bx(0.5, 0.5, 0.5, 0xb8884a, 0.4, 1.1, -1.9),
      );
      return g;
    })(),
  );
  part(
    7,
    (() => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 0.6),
        M(0xff7aa2, {
          side: THREE.DoubleSide,
          emissive: 0xff7aa2,
          emissiveIntensity: 0.3,
        }),
      );
      m.position.set(0, 4.3, 0.9);
      m.rotation.y = Math.PI / 2;
      return m;
    })(),
  );
}
let boatItem = null;
{
  const s = BOATP;
  boatG.scale.setScalar(1.3);
  boatG.position.set(s[0], Math.max(gh(s[0], s[1]), SEA) + 0.05, s[1]);
  boatG.rotation.y = Math.atan2(s[0], s[1]) + 1.57;
  boatItem = addItem({
    id: "boat",
    kind: "boat",
    x: s[0],
    z: s[1],
    r: 1.9,
    reach: 3.8,
    root: boatG,
    hint: "⛵ The wrecked boat: tap to see the repairs",
  });
}
const ship = new THREE.Group(),
  smoke = [];
{
  const h = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.2, 10), M(0x4a4f58)),
    c = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.8, 2.8), M(0x6a6f78)),
    st = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.65, 2.4, 10),
      M(0xc04030),
    );
  h.position.y = 0.5;
  c.position.set(0, 1.9, -1.6);
  st.position.set(0, 3.5, -1.6);
  ship.add(h, c, st);
  for (let i = 0; i < 7; i++) {
    const m = new THREE.Mesh(
      G.crown,
      new THREE.MeshBasicMaterial({
        color: 0x34343a,
        transparent: true,
        opacity: 0.7,
      }),
    );
    m.userData.o = i / 7;
    smoke.push(m);
    ship.add(m);
  }
}
ship.position.set(Math.cos(0.75) * 60, SEA, Math.sin(0.75) * 60);
ship.rotation.y = 1.2;
addItem({
  id: "ship",
  kind: "ship",
  x: ship.position.x,
  z: ship.position.z,
  r: 0,
  reach: 0,
  remote: true,
  root: ship,
  hint: "",
});
const barrels = {},
  barG = new THREE.CylinderGeometry(0.32, 0.32, 0.6, 12),
  barM = M(0xe8c02a),
  barS = M(0x2a2a2a);
function syncBarrels() {
  const day = Math.floor(now() / DAY),
    cl = Object.assign({}, village.cleaned, localCleaned),
    want = {};
  let un = 0;
  for (let d = day - 2; d <= day; d++)
    for (let i = 0; i < Math.min(14, 4 + Math.floor(chap() * 1.5)); i++) {
      const k = d + "_" + i;
      if (!cl[k]) {
        want[k] = [d, i];
        un += d === day ? 0.5 : 1;
      }
    }
  for (const k in barrels)
    if (!want[k]) {
      const it = barrels[k];
      IG.remove(it.root);
      items.splice(items.indexOf(it), 1);
      delete barrels[k];
    }
  for (const k in want) {
    if (barrels[k]) continue;
    const [d, i] = want[k],
      sp = beachAt(hs(d, i, 41) * 6.283);
    if (!sp) continue;
    const g = new THREE.Group(),
      b = new THREE.Mesh(barG, barM),
      sb = new THREE.Mesh(
        new THREE.CylinderGeometry(0.33, 0.33, 0.12, 12),
        barS,
      );
    b.position.y = sb.position.y = 0.3;
    b.castShadow = true;
    g.add(b, sb);
    g.rotation.z = 0.2;
    g.rotation.y = i;
    barrels[k] = addItem({
      id: "bar" + k,
      kind: "barrel",
      key: k,
      x: sp[0],
      z: sp[1],
      r: 0.4,
      reach: 3.2,
      root: place(g, sp[0], sp[1], Math.max(gh(sp[0], sp[1]), SEA) + 0.05),
      hint: "☣️ Toxic barrel: tap to clean it up",
    });
  }
  polB = Math.max(0, un / 10 - have("tree") * 0.03);
}
let catItem = null;
const catS = { tx: 5, tz: 3, t: 0 };
function ensureCat() {
  if (!village.cat || catItem) return;
  const g = new THREE.Group(),
    m = M(0xf2a65a),
    b = new THREE.Mesh(G.crown, m),
    h = new THREE.Mesh(G.crown, m),
    t = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), m);
  b.scale.set(0.3, 0.25, 0.5);
  b.position.y = 0.3;
  h.scale.setScalar(0.22);
  h.position.set(0, 0.5, 0.42);
  t.position.set(0, 0.5, -0.55);
  t.rotation.x = 0.9;
  g.add(b, h, t);
  [-0.1, 0.1].forEach((x) => {
    const e = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 4), m);
    e.position.set(x, 0.74, 0.42);
    g.add(e);
  });
  g.traverse((o) => {
    o.castShadow = true;
  });
  catItem = addItem({
    id: "cat",
    kind: "cat",
    x: 4,
    z: 3,
    r: 0.3,
    reach: 1.8,
    root: place(g, 4, 3),
    hint: "🐱 Twombly: tap to pet him",
  });
}
function boatState() {
  const c = chap();
  boatParts.forEach((m) => {
    m.visible = c > m.userData.part;
  });
  boatHole.visible = c < 1;
  boatG.rotation.z = c < 1 ? 0.1 : 0;
  ship.visible = c < 8;
  boatItem.hint =
    c >= 8
      ? "⛵ The boat is ready. Twombly is waiting!"
      : "⛵ The boat: chapter " + (c + 1) + " of 8, tap to see the repairs";
}
function campaignSync() {
  syncBarrels();
  boatState();
  ensureCat();
  syncPart();
  applyBroken();
  if (ready && chap() > lastChap) {
    lastChap = chap();
    leaderMsg();
  }
}
function campaignTick(dt, t) {
  if (partItem) {
    partItem.root.rotation.y += dt * 1.5;
    partItem.root.children[0].position.y = 0.7 + Math.sin(t * 3) * 0.1;
  }
  smoke.forEach((m) => {
    const u = (t * 0.12 + m.userData.o) % 1;
    m.position.set(Math.sin(u * 5) * 0.4, 4.2 + u * 10, -1.6 - u * 4);
    m.scale.setScalar(0.5 + u * 1.8);
    m.material.opacity = 0.7 * (1 - u);
  });
  ship.position.y = SEA + Math.sin(t * 0.8) * 0.08;
  ship.rotation.z = Math.sin(t * 0.6) * 0.03;
  if (catItem) {
    catS.t -= dt;
    if (catS.t <= 0) {
      catS.t = 3 + Math.random() * 3;
      const a = Math.random() * 6.283;
      catS.tx = 5 + Math.cos(a) * 5;
      catS.tz = 3 + Math.sin(a) * 4;
    }
    const dx = catS.tx - catItem.x,
      dz = catS.tz - catItem.z,
      d = Math.hypot(dx, dz);
    if (d > 0.2) {
      catItem.x += (dx / d) * 1.1 * dt;
      catItem.z += (dz / d) * 1.1 * dt;
      catItem.root.rotation.y = Math.atan2(dx, dz);
    }
    catItem.root.position.set(
      catItem.x,
      gh(catItem.x, catItem.z) +
        Math.abs(Math.sin(t * 8)) * (d > 0.2 ? 0.05 : 0),
      catItem.z,
    );
  }
}
// ---------- characters ----------
function label(txt) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const g = c.getContext("2d");
  g.font = "bold 34px system-ui,sans-serif";
  g.textAlign = "center";
  g.lineWidth = 7;
  g.strokeStyle = "rgba(0,0,0,.55)";
  g.strokeText(txt, 128, 44);
  g.fillStyle = "#fff";
  g.fillText(txt, 128, 44);
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(c),
      transparent: true,
      depthTest: false,
    }),
  );
  s.scale.set(2.2, 0.55, 1);
  s.renderOrder = 9;
  return s;
}
function emoteSprite(e) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  g.font = "90px serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(e, 64, 70);
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(c),
      transparent: true,
      depthTest: false,
    }),
  );
  s.scale.set(1, 1, 1);
  s.renderOrder = 10;
  return s;
}
function makeChar(shirt, hair) {
  const g = new THREE.Group(),
    skin = M(0xffdcc0),
    sh = M(shirt),
    pa = M(0x6e5f8a),
    hr = M(hair),
    u = {};
  const tor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.37, 0.64, 16),
    sh,
  );
  tor.position.y = 0.84;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.44, 24, 18), skin);
  head.position.y = 1.55;
  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(0.47, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.52),
    hr,
  );
  cap.position.y = 1.56;
  const fr = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), hr);
  fr.position.set(0.1, 1.84, 0.28);
  fr.scale.set(1.3, 0.7, 0.8);
  const eg = new THREE.SphereGeometry(0.055, 8, 6),
    em = M(0x2a2030),
    e1 = new THREE.Mesh(eg, em),
    e2 = new THREE.Mesh(eg, em);
  e1.position.set(-0.15, 1.52, 0.4);
  e2.position.set(0.15, 1.52, 0.4);
  const cg = new THREE.SphereGeometry(0.07, 8, 6),
    cm = M(0xffa0b0),
    c1 = new THREE.Mesh(cg, cm),
    c2 = new THREE.Mesh(cg, cm);
  c1.position.set(-0.27, 1.42, 0.34);
  c2.position.set(0.27, 1.42, 0.34);
  c1.scale.z = c2.scale.z = 0.4;
  [tor, head, cap, fr, e1, e2, c1, c2].forEach((m) => {
    m.castShadow = true;
    g.add(m);
  });
  const limb = (x, y, len, r, mat, foot) => {
    const p = new THREE.Group(),
      m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.9, len, 10), mat);
    m.position.y = -len / 2;
    m.castShadow = true;
    p.add(m);
    const f = new THREE.Mesh(new THREE.SphereGeometry(r * 1.25, 10, 8), foot);
    f.position.y = -len;
    f.scale.z = 1.3;
    f.castShadow = true;
    p.add(f);
    p.position.set(x, y, 0);
    g.add(p);
    return p;
  };
  u.lL = limb(-0.15, 0.52, 0.5, 0.11, pa, M(0x5a4a3a));
  u.lR = limb(0.15, 0.52, 0.5, 0.11, pa, M(0x5a4a3a));
  u.aL = limb(-0.4, 1.08, 0.45, 0.08, sh, skin);
  u.aR = limb(0.4, 1.08, 0.45, 0.08, sh, skin);
  const hold = new THREE.Group();
  hold.position.set(0, -0.5, 0.12);
  u.aR.add(hold);
  u.hold = hold;
  u.head = head;
  u.tor = tor;
  g.userData.u = u;
  return g;
}
function mkHeld(k) {
  const g = new THREE.Group();
  if (!k || k === "hand") return g;
  if (k.startsWith("cw")) return CRE.held(+k.slice(2));
  let m;
  if (k === "pistol" || k === "crowbar") return mkCaveHeld(k);
  if (BT[k])
    m = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.26, 0.26),
      M(BT[k], {
        transparent: k === "glass",
        opacity: k === "glass" ? 0.6 : 1,
      }),
    );
  else if (k === "seed")
    m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), M(0xff8a2a));
  else if (k === "sapling") {
    m = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 7), M(0x5fc454));
    m.position.y = 0.1;
  } else if (k === "can") {
    m = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.15, 0.24, 10),
      M(0x4aa8e6),
    );
  } else {
    m = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.06), M(0x8a5a3a));
    const h = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.07, 0.07),
      M(0x9aa0aa),
    );
    h.position.y = 0.22;
    g.add(h);
  }
  g.add(m);
  return g;
}
const PAL = [
  [0xff7aa2, 0x6b3b2a],
  [0x5aa0ff, 0x2f2a3d],
  [0x5ad6a0, 0x7a4a2a],
  [0xffc04a, 0x3a2a2a],
];
function actor(ci, name) {
  const c = makeChar(PAL[ci % 4][0], PAL[ci % 4][1]);
  c.scale.setScalar(0.78);
  const l = label(name);
  l.position.y = 2.55;
  c.add(l);
  scene.add(c);
  return {
    g: c,
    u: c.userData.u,
    x: 0,
    z: 5,
    y: 1,
    ry: 0,
    ph: 0,
    spd: 0,
    act: 0,
    lab: l,
    em: null,
    emT: 0,
    held: "",
    name,
    ci,
  };
}
// ---------- state ----------
const BT = {
  plank: 0xd9a566,
  brick: 0xc8685a,
  glass: 0xbfe9ff,
  thatch: 0xe8cf7a,
  heart: 0xff9ec0,
  lantern: 0xffe28a,
  purifier: 0x4fd1c5,
  generator: 0xffc83a,
  converter: 0x8a8f9a,
  plastic: 0x3fa7e0,
  door: 0xa9763e,
  window: 0x9fd4ec,
  roof: 0xb5503c,
  bed: 0xc23a4a,
};
const RC = [
  ["Planks", "1🪵 → 2🟫", { wood: 1 }, { plank: 2 }, 0],
  ["Bricks", "1🪨 → 2🧱", { stone: 1 }, { brick: 2 }, 0],
  ["Glass", "2🏖️ → 1🪟", { sand: 2 }, { glass: 1 }, 0],
  ["Thatch", "2🌿 → 2🟨", { fiber: 2 }, { thatch: 2 }, 0],
  ["Heart block", "5🟫 + 20🪙 → 1💗", { plank: 5 }, { heart: 1 }, 20],
  [
    "Lantern",
    "1🧱 + 1🟫 + 5🪙 → 1🏮",
    { brick: 1, plank: 1 },
    { lantern: 1 },
    5,
  ],
  [
    "Purifier",
    "3🧱 + 2🪟 → 1♻️ (cleans air, needs ⚡)",
    { brick: 3, glass: 2 },
    { purifier: 1 },
    0,
  ],
  [
    "Generator",
    "4🧱 + 2🪨 → 1⚡ (powers 2 purifiers)",
    { brick: 4, stone: 2 },
    { generator: 1 },
    0,
  ],
  [
    "Trash converter",
    "3🧱 + 2🟫 → 1🏭 (tap it: 3🗑️ → 1🔷)",
    { brick: 3, plank: 2 },
    { converter: 1 },
    0,
  ],
];
const NM = {
  wood: "🪵",
  stone: "🪨",
  sand: "🏖️",
  fiber: "🌿",
  plank: "🟫",
  brick: "🧱",
  glass: "🪟",
  thatch: "🟨",
  heart: "💗",
  lantern: "🏮",
  seed: "🥕",
  sapling: "🌱",
  purifier: "♻️",
  gem: "💎",
  trash: "🗑️",
  plastic: "🔷",
  generator: "⚡",
  converter: "🏭",
  fish: "🐟",
  crab: "🦀",
};
const SL = [
  ["hand", "✋"],
  ["pick", "⛏️"],
  ["can", "💧"],
  ["seed", "🥕"],
  ["sapling", "🌱"],
  ["plank", "🟫"],
];
const Q = [
  [1, "What was the first thing you noticed about me?"],
  [1, "Describe your perfect lazy morning with me."],
  [1, "What outfit of mine do you secretly love the most?"],
  [2, "What's your favorite way to be kissed? Be specific."],
  [2, "Which part of me do you miss touching the most?"],
  [
    2,
    "What's something you've thought about doing with me but never said out loud?",
  ],
  [
    3,
    "Describe your ideal night with me when we're finally together. Details welcome.",
  ],
  [3, "Tell me one fantasy you want us to try, and why it turns you on."],
  [3, "Write me the opening line of a very steamy story starring us."],
  [4, "If you could know the exact date you'd die, would you want to? Why?"],
  [4, "Is love a choice, a feeling, or a skill?"],
  [4, "Do we have free will, or do we just tell ourselves a good story?"],
  [4, "What makes a life well lived, and are we living one?"],
  [4, "Can you truly know another person? Do you feel you know me?"],
  [4, "What do you believe that most people would disagree with?"],
];
const DARES = [
  [1, "Send a voice note saying something sweet in your sexiest voice."],
  [1, "Write 'I miss you' in 3 creative ways."],
  [2, "Send a selfie with your best bedroom eyes."],
  [2, "Slowly describe a kiss, one sentence at a time, for 2 minutes."],
  [
    3,
    "Tell your partner exactly what you'd do in the first 5 minutes alone together.",
  ],
  [3, "Record a 30 second whisper of your most daring wish."],
];
const LV = { flirty: 1, spicy: 2, hot: 3 };
const HEARTS = [0, 200, 600, 1500, 3000],
  HN = ["Sprout", "Young Tree", "Blooming", "Radiant", "Eternal"];
const DAY = 864e5,
  SMOG = new THREE.Color(0x8d8f6c);
var timeOff = 0,
  WXK = 0,
  WXR = 0,
  WXC = new THREE.Color(0x58606c);
// 8 chapters, about 116 days of daily play. Leaders are fictional caricatures.
const CHP = [
  {
    n: "The first piece",
    l: "Chairman Plastico",
    q: "Your little island will drown in my plastic. Enjoy the view.",
    d: 1,
    r: { clean: 4 },
    m: { plank: 6 },
    part: "Patched hull",
  },
  {
    n: "A mast to stand on",
    l: "President Petrol",
    q: "Nobody sails without oil. Drill, baby, drill.",
    d: 3,
    r: { tree: 2, clean: 12, altar: 3 },
    m: { brick: 6 },
    part: "Mast",
  },
  {
    n: "Sail of dreams",
    l: "Baron Smogsworth",
    q: "A cloud is just profit that hasn't been invoiced yet.",
    d: 6,
    r: { harvest: 12, blocks: 30, altar: 8 },
    m: { thatch: 8, glass: 4 },
    part: "Sail",
  },
  {
    n: "A steady rudder",
    l: "Colonel Coalbert",
    q: "Coal built this world. You will not out-grow it.",
    d: 10,
    r: { heart: 1, clean: 35, tree: 6 },
    m: { plank: 15 },
    part: "Rudder",
  },
  {
    n: "Sun on the water",
    l: "Minister Merger",
    q: "Everything will be privatised. Even your sunshine.",
    d: 15,
    r: { harvest: 30, altar: 20, blocks: 60 },
    m: { glass: 10, brick: 12 },
    part: "Solar panels",
  },
  {
    n: "A cabin for two",
    l: "Lord Lobbyist",
    q: "Every paradise has a price. I already own the lawyers.",
    d: 20,
    r: { blocks: 120, heart: 2, tree: 12 },
    m: { plank: 25, lantern: 2 },
    part: "Cabin",
  },
  {
    n: "Supplies for the voyage",
    l: "Governor Fracker",
    q: "Drink up. The water will taste like freedom. And chemicals.",
    d: 25,
    r: { tree: 20, clean: 120, harvest: 60 },
    m: { brick: 15, thatch: 15 },
    part: "Provisions",
  },
  {
    n: "Set sail for Twombly",
    l: "Premier Plutocrat",
    q: "You cannot escape. The whole sea is my market.",
    d: 30,
    r: { heart: 3, altar: 40, harvest: 80 },
    m: { plank: 30, lantern: 4, purifier: 2 },
    part: "Flag of freedom",
  },
];
const RL = {
  tree: "Grown trees",
  clean: "Barrels cleaned",
  harvest: "Carrots harvested",
  altar: "Altar and letter answers",
  blocks: "Blocks built",
  heart: "Heart Tree stage",
};
let pollution = 0,
  lastChap = 0,
  shake_ = 0,
  jumpReq = false,
  inCave = false,
  retPos = { x: 0, z: 0 },
  localCleaned = {},
  localBroken = {},
  offline = false,
  lastOffer = 0,
  offerPrev = 0,
  colL = new Map();
let db,
  uid,
  P = {},
  BL = {},
  PL = {},
  village = {},
  ready = false,
  pend = 0,
  q = Promise.resolve(),
  slot = 0,
  me3,
  partner = null,
  plantMeshes = {},
  blockMeshes = {},
  blockIds = {},
  occ = new Set(),
  goalPt = null,
  goalObj = null,
  goalDig = false,
  modalOpen = false,
  card = null,
  askSel = [],
  lastSend = 0,
  digCd = 0,
  yaw = 0.55,
  pitch = 0.82,
  dist = 17,
  keys = {},
  sound = true,
  recap = [];
const me = () => P[uid] || {},
  inv = () => Object.assign({}, me().inv),
  nm = (u) => (P[u] && P[u].name) || "Partner",
  other = () => Object.keys(P).find((u) => u !== uid);
const earned = () => Object.values(P).reduce((s, p) => s + (p.earned || 0), 0),
  spent = () => Object.values(P).reduce((s, p) => s + (p.sp || 0), 0),
  gold = () => earned() - spent(),
  gave = () => Object.values(P).reduce((s, p) => s + (p.gave || 0), 0);
const bump = (k) =>
  Object.assign({}, me().cnt, { [k]: ((me().cnt || {})[k] || 0) + 1 });
const cnt = (k) =>
  Object.values(P).reduce((s, p) => s + ((p.cnt || {})[k] || 0), 0);
const chap = () => village.chap || 0;
const have = (k) =>
  k === "tree"
    ? Object.values(PL).filter(
        (p) => p.k === "tree" && prog(p, now()) >= MATT.tree,
      ).length
    : k === "blocks"
      ? Object.keys(BL).length
      : k === "heart"
        ? htStage()
        : cnt(k);
async function vup(o) {
  try {
    const r = db.doc("village/v7"),
      g = await r.get();
    if (g.exists) await r.update(o);
    else await r.set(o);
  } catch (e) {
    toast("Couldn't save: " + (e.message || e.code));
  }
}
const offerTs = () => {
  const o = other();
  if (!o || !P[o]) return 0;
  return Math.max(0, ...Object.keys(P[o].answers || {}).map(Number));
};
const newOffer = () => offerTs() > (me().seenAns || 0);
const E = (m) => (me().ev || []).concat([{ t: now(), m }]).slice(-15);
const can = (i, c) => Object.keys(c).every((k) => (i[k] || 0) >= c[k]),
  pay = (i, c) => {
    const r = Object.assign({}, i);
    for (const k in c) r[k] = (r[k] || 0) - c[k];
    return r;
  },
  give = (i, c) => {
    const r = Object.assign({}, i);
    for (const k in c) r[k] = (r[k] || 0) + c[k];
    return r;
  };
function toast(t) {
  const e = $("#toast");
  e.textContent = t;
  e.style.display = "block";
  clearTimeout(e._t);
  e._t = setTimeout(() => (e.style.display = "none"), 2600);
}
// audio
let ac, mg;
const ensureAudio = () => {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === "suspended") ac.resume();
  } catch (e) {}
};
function tone(f, d, ty, v, dl) {
  if (!sound || !ac) return;
  try {
    const t = ac.currentTime + (dl || 0),
      o = ac.createOscillator(),
      k = ac.createGain();
    o.type = ty || "sine";
    o.frequency.value = f;
    k.gain.setValueAtTime(0, t);
    k.gain.linearRampToValueAtTime(v || 0.1, t + 0.01);
    k.gain.exponentialRampToValueAtTime(0.001, t + d);
    o.connect(k);
    k.connect(ac.destination);
    o.start(t);
    o.stop(t + d + 0.02);
  } catch (e) {}
}
const jingle = (a) =>
  a.forEach((f, i) => tone(f, 0.3, "triangle", 0.1, i * 0.11));
setInterval(() => {
  if (ready && sound && ac && !modalOpen && Math.random() < 0.7)
    tone(
      [392, 440, 523, 587, 659, 784][Math.floor(Math.random() * 6)],
      1.6,
      "sine",
      0.035,
    );
}, 3300);
function goHome(msg) {
  inCave = false;
  modalOpen && closeModal();
  me3.x = Object.keys(P).length > 1 ? 1.5 : 0;
  me3.z = 5;
  me3.y = gh(me3.x, 5) + 0.1;
  me3.vy = 0;
  me3.vx = me3.vz = 0;
  goalPt = goalObj = null;
  snapCam();
  toast(msg || "Back at the village 🏡");
  jingle([392, 523]);
}
$("#home").addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  goHome();
});
let jt = [];
function jumpPress() {
  jumpReq = true;
  const n = now();
  jt = jt.filter((t) => n - t < 2000);
  jt.push(n);
  if (jt.length >= 4) {
    jt = [];
    goHome();
  }
}
$("#jmp").addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  jumpPress();
  ensureAudio();
});
$("#snd").onclick = () => {
  sound = !sound;
  $("#snd").textContent = sound ? "🔊" : "🔇";
  ensureAudio();
};
// particles
const PN = 240,
  pp = new Float32Array(PN * 3),
  pc = new Float32Array(PN * 3),
  pv = new Float32Array(PN * 3),
  pl = new Float32Array(PN);
const pgeo = new THREE.BufferGeometry();
pgeo.setAttribute("position", new THREE.BufferAttribute(pp, 3));
pgeo.setAttribute("color", new THREE.BufferAttribute(pc, 3));
const dotC = document.createElement("canvas");
dotC.width = dotC.height = 32;
{
  const g = dotC.getContext("2d"),
    r = g.createRadialGradient(16, 16, 2, 16, 16, 15);
  r.addColorStop(0, "#fff");
  r.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 32, 32);
}
const parts = new THREE.Points(
  pgeo,
  new THREE.PointsMaterial({
    size: 0.34,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    map: new THREE.CanvasTexture(dotC),
    alphaTest: 0.02,
  }),
);
parts.frustumCulled = false;
scene.add(parts);
let pi = 0;
function burst(x, y, z, hex, n, sp, up) {
  const c = new THREE.Color(hex);
  for (let k = 0; k < n; k++) {
    const i = pi++ % PN;
    pp.set([x, y, z], i * 3);
    const a = Math.random() * 6.283,
      s = (0.4 + Math.random()) * (sp || 2);
    pv.set(
      [
        Math.cos(a) * s,
        (up === undefined ? 2.5 : up) * (0.5 + Math.random()),
        Math.sin(a) * s,
      ],
      i * 3,
    );
    pc.set([c.r, c.g, c.b], i * 3);
    pl[i] = 1;
  }
  pgeo.attributes.color.needsUpdate = true;
}
// ---------- sync ----------
function saveMe(patch) {
  const d = Object.assign({}, me(), patch);
  P[uid] = d;
  pend++;
  q = q
    .then(() => db.doc("p7/" + uid).set(d))
    .catch((e) => toast("Couldn't save: " + (e.message || e.code)))
    .then(() => {
      pend--;
    });
  hud();
}
function award(n, entry) {
  const p = me(),
    a = Object.assign({}, p.answers || {});
  if (entry) a[now()] = entry;
  saveMe({ earned: (p.earned || 0) + n, answers: a });
  toast("+" + n + " 🪙");
  jingle([784, 988, 1175]);
  burst(me3.x, me3.y + 2, me3.z, 0xffd24a, 16, 2.5);
}
function addInv(c, msg) {
  saveMe({ inv: give(inv(), c) });
  if (msg) toast(msg);
}
// ---------- blocks ----------
const BG = new THREE.BoxGeometry(1, 1, 1);
Object.keys(BT).forEach((k) => {
  const m =
    k === "lantern" || k === "purifier"
      ? M(BT[k], {
          emissive: k === "purifier" ? 0x4fd1c5 : 0xffd25a,
          emissiveIntensity: 0.6,
        })
      : k === "heart"
        ? M(BT[k], { roughness: 0.5 })
        : k === "glass"
          ? M(BT[k], { transparent: true, opacity: 0.45, roughness: 0.1 })
          : M(BT[k]);
  if (k === "lantern" || k === "purifier") glow.push(m);
  const im = new THREE.InstancedMesh(BG, m, 700);
  im.count = 0;
  im.castShadow = k !== "glass";
  im.receiveShadow = true;
  im.userData.btype = k;
  im.frustumCulled = false;
  blockMeshes[k] = im;
  blockIds[k] = [];
  scene.add(im);
});
function rebuildBlocks() {
  occ = new Set();
  colL = new Map();
  const mx = new THREE.Matrix4(),
    c = new THREE.Color();
  Object.keys(BT).forEach((k) => (blockIds[k] = []));
  for (const key in BL) {
    const t = BL[key].t;
    if (!blockIds[t]) continue;
    const [x, l, z] = key.split("_").map(Number);
    blockIds[t].push(key);
    if (t === "door") continue;
    const ck = x + "," + z;
    if (!colL.has(ck)) colL.set(ck, []);
    colL.get(ck).push(l);
    if (l <= 1) occ.add(x + "," + z);
  }
  for (const k in blockMeshes) {
    const im = blockMeshes[k];
    blockIds[k].forEach((key, i) => {
      const [x, l, z] = key.split("_").map(Number);
      mx.makeTranslation(x + 0.5, 1 + l + 0.5, z + 0.5);
      im.setMatrixAt(i, mx);
      const j = 0.94 + hs(x, z, l) * 0.12;
    });
    im.count = blockIds[k].length;
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
  }
  if (ready) syncBarrels();
}
// ---------- plants ----------
const prog = (p, t) =>
  Math.min(
    MATT[p.k],
    (p.g || 0) + Math.max(0, Math.min(t, p.w || 0) - (p.t || 0)) / 1000,
  );
function plantMesh(p) {
  const g = new THREE.Group();
  const soil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.6, 0.08, 14),
    M(0x8a6a4a),
  );
  soil.position.y = 0.02;
  soil.receiveShadow = true;
  g.add(soil);
  g.userData.soil = soil;
  const body = new THREE.Group();
  body.scale.setScalar(0.35);
  g.add(body);
  g.userData.body = body;
  if (p.k === "tree") {
    body.add(treeMesh(false, 1));
  } else {
    const lm = M(0x5fc454);
    for (let i = 0; i < 5; i++) {
      const l = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.5, 5), lm);
      l.position.set(Math.cos(i * 1.26) * 0.12, 0.3, Math.sin(i * 1.26) * 0.12);
      l.rotation.set(Math.sin(i * 1.26) * 0.4, 0, -Math.cos(i * 1.26) * 0.4);
      l.castShadow = true;
      body.add(l);
    }
    const c = new THREE.Mesh(
      new THREE.ConeGeometry(0.15, 0.45, 8),
      M(0xff8a2a),
    );
    c.rotation.x = Math.PI;
    c.position.y = 0.1;
    body.add(c);
    g.userData.ripe = c;
  }
  const dr = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 10, 8),
    EM(0x4aa8e6, 0.6),
  );
  dr.scale.y = 1.4;
  dr.position.y = 1.5;
  g.add(dr);
  g.userData.drop = dr;
  return g;
}
function syncPlants() {
  for (const k in plantMeshes)
    if (!PL[k]) {
      const it = plantMeshes[k];
      scene.remove(it.root);
      IG.remove(it.root);
      items.splice(items.indexOf(it), 1);
      delete plantMeshes[k];
    }
  for (const k in PL) {
    if (plantMeshes[k]) {
      plantMeshes[k].data = PL[k];
      continue;
    }
    const [x, z] = k.split("_").map(Number),
      cx = x + 0.5,
      cz = z + 0.5,
      m = plantMesh(PL[k]);
    place(m, cx, cz);
    const it = addItem({
      id: "pl" + k,
      kind: "plant",
      key: k,
      data: PL[k],
      x: cx,
      z: cz,
      r: PL[k].k === "tree" ? 0.5 : 0,
      reach: 1.9,
      root: m,
      hint: "",
      cd: 0,
    });
    plantMeshes[k] = it;
  }
  plantTick();
}
function plantTick() {
  const t = now();
  for (const k in plantMeshes) {
    const it = plantMeshes[k],
      p = it.data,
      f = prog(p, t) / MATT[p.k],
      wet = t < (p.w || 0),
      u = it.root.userData;
    const s = p.k === "tree" ? 0.3 + 0.7 * f : 0.4 + 0.6 * f;
    u.body.scale.setScalar(s);
    if (u.ripe) u.ripe.visible = f >= 1;
    u.soil.material.color.setHex(wet ? 0x5c4430 : 0x8a6a4a);
    u.drop.visible = !wet && f < 1;
    u.drop.position.y =
      (p.k === "tree" ? 2.2 * s + 0.6 : 1.2) + Math.sin(t / 300) * 0.08;
    it.hint =
      f >= 1
        ? p.k === "carrot"
          ? "🥕 Ripe! Tap to harvest"
          : "🌳 Fully grown! Tap to chop"
        : wet
          ? "🌱 Growing… " +
            Math.ceil(((1 - f) * MATT[p.k]) / 60) +
            " min of watering left"
          : "💧 Thirsty! Use the watering can";
  }
}
// ---------- actors & input ----------
me3 = actor(0, "You");
const rayc = new THREE.Raycaster(),
  mv2 = new THREE.Vector2();
function cast(cx, cy, list) {
  mv2.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
  rayc.setFromCamera(mv2, cam);
  return rayc.intersectObjects(list, true);
}
const hit = (h) => {
  let o = h.object;
  while (o) {
    if (o.userData.item) return { item: o.userData.item };
    if (o.userData.fol) return { fol: o.userData.fol, h };
    if (o.userData.who) return { who: o.userData.who };
    if (o.userData.btype) return { block: o, h };
    o = o.parent;
  }
  return { ground: h };
};
function proj(x, y, z) {
  const v = new THREE.Vector3(x, y, z).project(cam);
  return { x: ((v.x + 1) / 2) * innerWidth, y: ((1 - v.y) / 2) * innerHeight };
}
const inZone = (cx, cz) =>
  !inCave &&
  hm(cx, cz) > 0.6 &&
  !items.some(
    (i) =>
      i.r && i.kind !== "plant" && Math.hypot(cx - i.x, cz - i.z) < i.r + 0.75,
  ) &&
  !FIX.some(
    (u) =>
      u[2] > 2 &&
      Math.hypot(cx - u[0], cz - u[1]) < u[2] - 0.5 &&
      u[1] !== 5 &&
      u[0] !== -11 &&
      false,
  );
function tapAt(cx, cy) {
  if (modalOpen) return;
  ensureAudio();
  const list = [
    IG,
    terrain,
    ...Object.values(blockMeshes),
    ...(window.FOLL || []),
  ];
  if (partner) list.push(partner.g);
  let hits = cast(cx, cy, list);
  if (!hits.length) return;
  const tool = SL[slot][0];
  if (BT[tool]) {
    const hf = hits.filter((x) => {
      const o = hit(x);
      return !(
        o.fol ||
        (o.item && (o.item.kind === "htree" || o.item.kind === "fgod"))
      );
    });
    if (hf.length) hits = hf;
  }
  const h = hits[0],
    t = hit(h);
  if (t.fol && window.folTap) {
    window.folTap(t.fol, h, tool);
    return;
  }
  if (t.item) {
    if (t.item.remote) {
      doInteract(t.item);
    } else {
      goalObj = t.item;
      goalPt = null;
    }
    return;
  }
  if (t.who && partner && t.who === partner) {
    goalPt = { x: partner.x, z: partner.z };
    emote("❤️");
    saveMe({ emo: "❤️", emoT: now() });
    return;
  }
  if (t.who) {
    emote("😘");
    return;
  }
  if (t.block) {
    const k = t.block.userData.btype,
      key = blockIds[k][h.instanceId];
    if (!key) return;
    if (k === "converter" && !BT[tool] && tool !== "pick") {
      exConv();
      return;
    }
    if (k === "bed" && !BT[tool] && tool !== "pick") {
      exSleep();
      return;
    }
    if (k === "generator" && !BT[tool] && tool !== "pick") {
      exGen();
      return;
    }
    if (k === "purifier" && !BT[tool] && tool !== "pick") {
      exPur();
      return;
    }
    if (tool === "pick") {
      if (Math.hypot(me3.x - h.point.x, me3.z - h.point.z) > 9)
        return toast("Too far away");
      breakBlock(key);
      return;
    }
    if (BT[tool]) {
      const n = h.face.normal,
        [x, l, z] = key.split("_").map(Number);
      placeBlock(
        x + Math.round(n.x),
        l + Math.round(n.y),
        z + Math.round(n.z),
        tool,
      );
      return;
    }
    goalPt = { x: h.point.x, z: h.point.z };
    return;
  }
  if (
    t.ground &&
    window.folNear &&
    !BT[tool] &&
    tool !== "seed" &&
    tool !== "sapling" &&
    tool !== "can"
  ) {
    const n = window.folNear(h.point.x, h.point.z, 1.25, 4.6);
    if (n) {
      window.folTap(
        n.f,
        { object: n.m, instanceId: n.i, point: { x: n.x, y: n.y, z: n.z } },
        tool,
      );
      return;
    }
  }
  const p = h.point,
    cxx = Math.floor(p.x),
    czz = Math.floor(p.z);
  if (BT[tool]) {
    placeBlock(cxx, Math.max(0, Math.round(p.y - 1)), czz, tool);
    return;
  }
  if (tool === "seed" || tool === "sapling") {
    plantAt(cxx, czz, tool);
    return;
  }
  if (gh(p.x, p.z) < 0.62 && gh(p.x, p.z) > 0.3 && tool === "hand") {
    goalPt = { x: p.x, z: p.z };
    goalDig = true;
    goalObj = null;
    return;
  }
  goalPt = { x: p.x, z: p.z };
  goalObj = null;
  goalDig = false;
}
function placeBlock(x, l, z, t) {
  const cx = x + 0.5,
    cz = z + 0.5,
    key = x + "_" + l + "_" + z;
  if (l < 0 || l > 26 || BL[key]) return;
  if (Math.hypot(me3.x - cx, me3.z - cz) > 10) return toast("Too far away");
  if (!inZone(cx, cz)) return toast("You can't build here 🚫");
  if (
    l < 2 &&
    [me3, partner].some((a) => a && Math.hypot(a.x - cx, a.z - cz) < 0.85)
  )
    return toast("Someone is standing there");
  if (PL[x + "_" + z] && l === 0) return toast("A plant is growing there");
  const i = inv();
  if (!(i[t] > 0)) return toast("You're out of that block");
  saveMe({
    inv: pay(i, { [t]: 1 }),
    st: Object.assign({}, me().st, { place: 1 }),
  });
  BL[key] = { t, by: uid };
  rebuildBlocks();
  db.doc("blk7/" + key)
    .set({ t, by: uid })
    .catch((e) => toast("Couldn't save: " + e.message));
  tone(330 + l * 40, 0.12, "triangle", 0.12);
  burst(cx, 1 + l + 1, cz, BT[t], 8, 1.5, 2);
}
function breakBlock(key) {
  const b = BL[key];
  if (!b) return;
  delete BL[key];
  rebuildBlocks();
  db.doc("blk7/" + key)
    .delete()
    .catch(() => {});
  saveMe({ inv: give(inv(), { [b.t]: 1 }) });
  tone(200, 0.1, "square", 0.1);
  const [x, l, z] = key.split("_").map(Number);
  burst(x + 0.5, 1 + l + 0.5, z + 0.5, BT[b.t], 10, 2, 2);
}
function plantAt(x, z, tool) {
  const cx = x + 0.5,
    cz = z + 0.5,
    key = x + "_" + z;
  if (Math.hypot(me3.x - cx, me3.z - cz) > 9) return toast("Too far away");
  if (!inZone(cx, cz) || occ.has(x + "," + z) || PL[key])
    return toast("Plant on free grass inside the village ring 🌱");
  if (!(inv()[tool] > 0)) return toast("You're out of seeds");
  PL[key] = {
    k: tool === "seed" ? "carrot" : "tree",
    g: 0,
    t: now(),
    w: 0,
    by: uid,
  };
  syncPlants();
  saveMe({
    inv: pay(inv(), { [tool]: 1 }),
    st: Object.assign({}, me().st, { plant: 1 }),
    ev: E("planted a " + (tool === "seed" ? "carrot 🥕" : "tree 🌳")),
  });
  db.doc("pl7/" + key).set(PL[key]);
  tone(520, 0.15, "sine", 0.1);
  burst(cx, 1.2, cz, 0x8a6a4a, 10, 1.4, 2);
  toast("Planted! Now water it 💧");
}
function emote(e) {
  me3.em = e;
  me3.emT = now();
}
// ---------- interactions ----------
function swing() {
  me3.act = 0.5;
}
function breakItem(it) {
  it.fall = 0.5;
  it.broken = 1;
  it.r = 0;
  it.hint = "";
  localBroken[it.id] = now();
  village.broken = Object.assign({}, village.broken, { [it.id]: now() });
  vup({ broken: { [it.id]: now() } });
}
function applyBroken() {
  const br = Object.assign({}, village.broken, localBroken);
  items.forEach((i) => {
    if (!(i.kind === "tree" || i.kind === "rock") || !i.id) return;
    const ts = br[i.id];
    if (ts && now() - ts < 3 * DAY) {
      if (!i.broken) {
        i.broken = 1;
        i.r = 0;
        i.hint = "";
        IG.remove(i.root);
      }
    } else if (i.broken) {
      i.broken = 0;
      i.r = i.r0;
      i.hp = undefined;
      i.fall = 0;
      i.root.scale.setScalar(i.s0);
      IG.add(i.root);
      i.hint = i.kind === "tree" ? "Tap to chop 🪓" : "Tap to mine stone ⛏️";
    }
  });
}
function doInteract(it) {
  swing();
  const t = now();
  if (
    exInt6(it) ||
    exInt5(it) ||
    exInt4(it) ||
    exInt3(it) ||
    exInt2(it) ||
    exInt(it)
  )
    return;
  if (it.kind === "tree" || it.kind === "rock") {
    if (it.broken || t < it.cd) return;
    it.cd = t + 450;
    it.shake = 0.5;
    it.hp = (it.hp === undefined ? (it.kind === "rock" ? 4 : 3) : it.hp) - 1;
    tone(it.kind === "tree" ? 170 : 260, 0.12, "square", 0.1);
    const st = Object.assign({}, me().st, { chop: 1 }),
      last = it.hp <= 0;
    if (it.kind === "tree") {
      const c = { wood: last ? 3 : 1 };
      if (last) c.sapling = 1 + (Math.random() < 0.5 ? 1 : 0);
      saveMe({ inv: give(inv(), c), st });
      burst(it.x, 2, it.z, last ? 0x6fc860 : 0x8a5a3a, last ? 22 : 8, 2.2);
      toast(
        last
          ? "🌳 The tree fell! +3🪵 +" + c.sapling + "🌱 tree seeds"
          : "+1🪵 (" + it.hp + " more hits)",
      );
    } else {
      const c = { stone: last ? 2 : 1 };
      saveMe({ inv: give(inv(), c), st });
      burst(it.x, 0.8, it.z, 0xb9bec8, last ? 18 : 8, 2);
      toast(
        last ? "⛏️ The rock broke! +2🪨" : "+1🪨 (" + it.hp + " more hits)",
      );
    }
    if (last) breakItem(it);
    return;
  }
  if (it.kind === "cave") {
    inCave = true;
    retPos = { x: ENT[0], z: ENT[1] + 2.8 };
    me3.x = CVX - 6.8;
    me3.z = CVZ;
    yaw = -Math.PI / 2;
    cpit = 0.14;
    me3.y = 0.5;
    me3.vy = 0;
    goalPt = goalObj = null;
    snapCam();
    jingle([330, 262]);
    toast("🕳️ The little cave");
    return;
  }
  if (it.kind === "exit") {
    inCave = false;
    me3.x = retPos.x;
    me3.z = retPos.z;
    me3.y = gh(me3.x, me3.z);
    me3.vy = 0;
    goalPt = goalObj = null;
    snapCam();
    jingle([262, 330]);
    return;
  }
  if (it.kind === "crystal") {
    if (t < it.cd) return toast("The crystal needs time to glow again ✨");
    it.cd = t + 25000;
    saveMe({
      inv: give(inv(), { stone: 1, gem: 1 }),
      ev: E("mined crystals in the cave 💎"),
    });
    burst(it.x, 1, it.z, 0x9a7aff, 16, 2);
    tone(900, 0.2, "sine", 0.1);
    award(10);
    return;
  }
  if (it.kind === "part") {
    const c = it.c;
    if (c === 7) {
      const o = other(),
        pp = o && P[o];
      if (!pp || Math.hypot(pp.x - it.x, pp.z - it.z) > 7)
        return toast("It only shimmers when you are both here 💞");
    }
    village.parts = Object.assign({}, village.parts, { [c]: uid });
    vup({ parts: { [c]: uid } });
    jingle([523, 659, 784, 1047]);
    burst(it.x, 1.3, it.z, 0xffd24a, 30, 3, 3);
    saveMe({ ev: E("found the boat part: " + CHP[c].part + " 🔧") });
    toast("🔧 You found the " + CHP[c].part + "!");
    syncPart();
    return;
  }
  if (it.kind === "tree" || it.kind === "rock" || it.kind === "bush") {
    if (t < it.cd) return toast("It needs a moment to regrow 🌱");
    it.cd = t + 9000;
    it.shake = 0.5;
    tone(it.kind === "tree" ? 170 : 260, 0.12, "square", 0.1);
    const n = 2 + Math.floor(Math.random() * 2),
      st = Object.assign({}, me().st, { chop: 1 });
    if (it.kind === "tree") {
      const c = { wood: n };
      if (Math.random() < 0.35) c.sapling = 1;
      saveMe({ inv: give(inv(), c), st });
      burst(it.x, 2, it.z, 0x6fc860, 12, 2.2);
      toast("+" + n + "🪵" + (c.sapling ? " +1🌱" : ""));
    } else if (it.kind === "rock") {
      saveMe({ inv: give(inv(), { stone: n }), st });
      burst(it.x, 0.8, it.z, 0xb9bec8, 10, 2);
      toast("+" + n + "🪨");
    } else {
      const c = { fiber: n };
      if (Math.random() < 0.6) c.seed = 1;
      saveMe({ inv: give(inv(), c), st });
      burst(it.x, 0.8, it.z, 0xff5a78, 8, 1.6);
      toast("+" + n + "🌿" + (c.seed ? " +1🥕 seed" : ""));
    }
    return;
  }
  if (it.kind === "plant") {
    const p = it.data,
      f = prog(p, t) / MATT[p.k],
      tool = SL[slot][0];
    if (tool === "can") {
      if (f >= 1) return toast("It's fully grown already");
      const g = prog(p, t),
        np = Object.assign({}, p, { g, t, w: t + WET });
      PL[it.key] = np;
      it.data = np;
      db.doc("pl7/" + it.key).set(np);
      tone(700, 0.25, "sine", 0.08);
      burst(it.x, 1.6, it.z, 0x6ec6ff, 14, 1.4, 3);
      if (p.by !== uid) {
        saveMe({
          earned: (me().earned || 0) + 5,
          ev: E(
            "watered " +
              nm(p.by) +
              "'s " +
              (p.k === "tree" ? "tree 🌳" : "carrot 🥕"),
          ),
        });
        toast("💧 Watered " + nm(p.by) + "'s plant! +5 🪙 for kindness");
      } else toast("💧 Watered! It grows for the next 40 minutes");
      return;
    }
    if (f < 1)
      return toast(
        t < (p.w || 0)
          ? "Still growing 🌱 come back later"
          : "It's thirsty! Select the 💧 watering can",
      );
    if (p.k === "carrot") {
      delete PL[it.key];
      syncPlants();
      db.doc("pl7/" + it.key).delete();
      const c = { seed: 1 + (Math.random() < 0.5 ? 1 : 0) };
      saveMe({
        inv: give(inv(), c),
        cnt: bump("harvest"),
        earned: (me().earned || 0) + 12,
        st: Object.assign({}, me().st, { harvest: 1 }),
        ev: E("harvested a carrot 🥕"),
      });
      burst(it.x, 1, it.z, 0xff8a2a, 14, 2);
      jingle([660, 880]);
      toast("+12 🪙 +" + c.seed + " seed");
    } else {
      it.shake = 0.5;
      saveMe({ inv: give(inv(), { wood: 4, sapling: 1 }) });
      burst(it.x, 2, it.z, 0x6fc860, 14, 2);
      toast("+4🪵 +1🌱");
    }
    return;
  }
  if (it.kind === "boat") return openBoat();
  if (it.kind === "ship") return leaderMsg();
  if (it.kind === "barrel") {
    if (!barrels[it.key]) return;
    swing();
    const k = it.key;
    localCleaned[k] = uid;
    village.cleaned = Object.assign({}, village.cleaned, { [k]: uid });
    vup({ cleaned: { [k]: uid } });
    saveMe({ cnt: bump("clean"), ev: E("cleaned up a toxic barrel ☣️") });
    burst(it.x, 0.8, it.z, 0x7bd05a, 16, 2);
    tone(300, 0.2, "sawtooth", 0.08);
    campaignSync();
    award(8);
    return;
  }
  if (it.kind === "cat") {
    const day = new Date(now()).toISOString().slice(0, 10);
    burst(it.x, 1, it.z, 0xff7aa2, 10, 1.2, 3);
    tone(880, 0.3, "sine", 0.08);
    if (me().pet !== day) {
      saveMe({ pet: day, earned: (me().earned || 0) + 3 });
      toast("Purr... +3 🪙");
    } else toast("Twombly purrs 🐱");
    return;
  }
  if (it.kind === "brazier") return openCard(it.bk);
  if (it.kind === "mail") return openMail();
  if (it.kind === "bench") return openBench();
  if (it.kind === "ht") return openHeart();
}
function digSand() {
  const t = now();
  if (t < digCd) return;
  digCd = t + 700;
  swing();
  addInv({ sand: 1 }, "+1 🏖️ sand");
  tone(240, 0.1, "triangle", 0.08);
  burst(me3.x, 1, me3.z, 0xf1d99a, 8, 1.5);
}
// ---------- modals ----------
function showModal(h) {
  const m = $("#modal");
  m.innerHTML = `<div class="box">${h}</div>`;
  m.style.display = "flex";
  modalOpen = true;
  goalPt = goalObj = null;
  tone(520, 0.1, "sine", 0.06);
}
function closeModal() {
  $("#modal").style.display = "none";
  modalOpen = false;
  card = null;
}
$("#modal").addEventListener("pointerdown", (e) => {
  if (e.target.id === "modal") closeModal();
});
const X = `<button id="x" style="float:right;padding:2px 10px">✕</button>`;
function feedHtml() {
  const all = [];
  for (const u in P)
    for (const t in P[u].answers || {}) all.push([+t, u, P[u].answers[t]]);
  all.sort((a, b) => b[0] - a[0]);
  if (!all.length) return "";
  return (
    `<h3 style="margin:14px 0 4px">Offerings on the altar</h3>` +
    all
      .slice(0, 6)
      .map(
        ([t, u, e]) =>
          `<div class="it"><span class="mute">${u !== uid && t > offerPrev ? "✨ NEW · " : ""}${esc(nm(u))} · ${esc(e.k)}</span><br><i>${esc(e.q)}</i><br>${esc(e.a || "✅ done")}</div>`,
      )
      .join("")
  );
}
function openCard(k) {
  if (!modalOpen) offerPrev = me().seenAns || 0;
  const b = BR.find((x) => x[0] === k),
    pool = (k === "dare" ? DARES : Q).filter((x) =>
      k === "dare" || k === "deep"
        ? k === "dare"
          ? true
          : x[0] === 4
        : x[0] === LV[k],
    ),
    c = pool[Math.floor(Math.random() * pool.length)];
  card = { c, k, g: b[4] };
  showModal(
    `${X}<h2>${b[1]} ${b[3]} flame</h2><div class="mute">Answer honestly to earn ${b[4]} 🪙</div><p style="font-size:17px;font-weight:700">${esc(c[1])}</p><textarea id="ans" rows="4" placeholder="${k === "dare" ? "Optional note for your partner..." : "Your honest answer..."}"></textarea><button id="go" class="on">${k === "dare" ? "Done! ✔" : "Offer my answer 💌"}</button><button id="re">Draw another</button>${feedHtml()}`,
  );
  $("#x").onclick = closeModal;
  $("#re").onclick = () => openCard(k);
  saveMe({ seenAns: now() });
  $("#go").onclick = () => {
    const a = $("#ans").value.trim();
    if (k !== "dare" && a.length < 3) return toast("Write a little more 😉");
    const cd = card;
    closeModal();
    award(cd.g, { k: k === "dare" ? "dare" : cd.k + " flame", q: cd.c[1], a });
    saveMe({
      cnt: bump("altar"),
      st: Object.assign({}, me().st, { altar: 1 }),
      ev: E(k === "dare" ? "completed a dare 😈" : "answered at the altar 💋"),
    });
    burst(0, 3, -10, 0xff7aa8, 30, 3, 3);
  };
}
function openMail() {
  const my = me().ask,
    o = other(),
    rep = me().rep || {},
    inbox = o && P[o].ask && !rep[P[o].ask.id] ? P[o].ask : null;
  const sent = my
    ? `<h3 style="margin:12px 0 4px">Your letter</h3>${my.qs.map((s, i) => `<div class="it"><i>${esc(s)}</i>${o && P[o].rep && P[o].rep[my.id] ? `<br><b>${esc(nm(o))}:</b> ${esc(P[o].rep[my.id][i] || "")}` : "<br><span class='mute'>waiting for a reply...</span>"}</div>`).join("")}`
    : "";
  if (inbox) {
    showModal(
      `${X}<h2>✉️ A letter from ${esc(nm(o))}</h2><div class="mute">Answer all three for 150 🪙</div>${inbox.qs.map((s, i) => `<p><i>${esc(s)}</i><textarea id="a${i}" rows="2"></textarea></p>`).join("")}<button id="go" class="on">Send my answers 💌</button>${sent}`,
    );
    $("#go").onclick = () => {
      const ans = [0, 1, 2].map((i) => $("#a" + i).value.trim());
      if (ans.some((x) => x.length < 3)) return toast("Answer all three 😉");
      const id = inbox.id,
        qs = inbox.qs;
      closeModal();
      saveMe({
        cnt: bump("altar"),
        rep: Object.assign({}, me().rep, { [id]: ans }),
        ev: E("answered your 3 questions 💋"),
      });
      award(150, { k: "3 questions", q: qs.join(" / "), a: ans.join(" / ") });
    };
  } else {
    const pool = Q.map(
      (x, i) =>
        `<button data-p="${i}" class="${askSel.includes(x[1]) ? "on" : ""}" style="text-align:left">${esc(x[1])}</button>`,
    ).join("");
    showModal(
      `${X}<h2>✉️ Write a letter</h2><div class="mute">Pick 3 questions (or write your own). If your partner answers all three they earn 150 🪙. Selected ${askSel.length}/3</div>${askSel.map((s) => `<div class="it">${esc(s)}</div>`).join("")}<input id="cu" maxlength="140" placeholder="Write your own question"><button id="add">Add mine</button><button id="send" class="on" ${askSel.length === 3 ? "" : "disabled"}>Post it 📮</button><div>${pool}</div>${sent}`,
    );
    document.querySelectorAll("[data-p]").forEach(
      (b) =>
        (b.onclick = () => {
          const s = Q[+b.dataset.p][1],
            i = askSel.indexOf(s);
          if (i >= 0) askSel.splice(i, 1);
          else if (askSel.length < 3) askSel.push(s);
          openMail();
        }),
    );
    $("#add").onclick = () => {
      const v = $("#cu").value.trim();
      if (v.length > 3 && askSel.length < 3) {
        askSel.push(v);
        openMail();
      }
    };
    $("#send").onclick = () => {
      if (askSel.length !== 3) return;
      saveMe({
        ask: { id: String(now()), qs: askSel.slice() },
        ev: E("sent you a letter with 3 questions 💌"),
      });
      askSel = [];
      closeModal();
      jingle([523, 659, 784]);
      toast("Posted! They earn 150 🪙 for answering");
    };
  }
  $("#x").onclick = closeModal;
}
function openBench() {
  const i = inv(),
    mats =
      Object.keys(NM)
        .filter((k) => i[k] > 0)
        .map((k) => `${NM[k]} ${i[k]}`)
        .join(" · ") || "nothing yet";
  showModal(
    `${X}<h2>🔨 Workbench</h2><div class="mute">Your materials: ${mats}<br>Chop 🌲, mine 🪨, pick 🌿, dig 🏖️ sand on the beach.</div>${RC.map((r, n) => `<div class="it"><b>${r[0]}</b> <span class="mute">${r[1]}</span><br><button data-r="${n}" ${can(i, r[2]) && gold() >= r[4] ? "" : "disabled"}>Craft</button></div>`).join("")}`,
  );
  $("#x").onclick = closeModal;
  document.querySelectorAll("[data-r]").forEach(
    (b) =>
      (b.onclick = () => {
        const r = RC[+b.dataset.r];
        if (!can(inv(), r[2]) || gold() < r[4]) return;
        saveMe({
          inv: give(pay(inv(), r[2]), r[3]),
          sp: (me().sp || 0) + r[4],
          st: Object.assign({}, me().st, { craft: 1 }),
        });
        jingle([440, 660]);
        tone(200, 0.08, "square", 0.1);
        openBench();
      }),
  );
}
function leaderMsg() {
  const c = Math.min(7, chap()),
    h = CHP[c];
  showModal(
    `${X}<h2>🏭 ${esc(h.l)}</h2><div class="mute">A polluting world leader, watching from the horizon</div><p style="font-size:17px"><i>${esc(h.q)}</i></p><p class="mute">Keep the island clean, grow trees, and keep repairing the boat. Their smog only wins if you stop.</p>`,
  );
  $("#x").onclick = closeModal;
}
function openBoat() {
  const c = chap(),
    h = CHP[c];
  if (!h) {
    showModal(
      `${X}<h2>⛵ The boat is ready</h2><p>Every plank, sail and flag is in place. Twombly is waiting.</p>`,
    );
    $("#x").onclick = closeModal;
    return;
  }
  const t = (village.chStart || now()) + h.d * DAY - now(),
    ok = Object.keys(h.r).every((k) => have(k) >= h.r[k]),
    mat = can(inv(), h.m),
    pf = !!(village.parts && village.parts[c]),
    go = mat;
  showModal(
    `${X}<h2>⛵ Chapter ${c + 1} of 8: ${esc(h.n)}</h2><div class="mute">Repairing: ${esc(h.part)}</div><p><b>${esc(h.l)}</b> sends word:<br><i>${esc(h.q)}</i></p><div class="it"><b>Materials (yours)</b><br>${Object.entries(
      h.m,
    )
      .map(
        ([k, v]) =>
          `${(inv()[k] || 0) >= v ? "✅" : "⬜"} ${NM[k]} ${inv()[k] || 0}/${v}`,
      )
      .join(
        " · ",
      )}</div><div class="it">${t > 0 ? "⏳ The tide is not right yet: about " + Math.ceil((t / DAY) * 10) / 10 + " days" : "🌊 The tide is right"}</div><button id="rp" class="on" ${go ? "" : "disabled"}>Repair the boat 🔧</button><div class="mute">A few quick repairs, then sail off with Twombly!</div>`,
  );
  $("#x").onclick = closeModal;
  $("#rp").onclick = () => {
    if (!go) return;
    closeModal();
    saveMe({
      inv: pay(inv(), h.m),
      ev: E("repaired the boat: " + h.part + " ⛵"),
    });
    village.chap = c + 1;
    village.chStart = now();
    vup({ chap: c + 1, chStart: now() });
    lastChap = c + 1;
    boatState();
    jingle([392, 523, 659, 784, 1047]);
    shake_ = 1;
    burst(boatG.position.x, 2, boatG.position.z, 0xffd24a, 30, 3, 3);
    if (c + 1 >= 8) {
      village.cat = 1;
      vup({ cat: 1 });
      ensureCat();
      setTimeout(
        () =>
          showModal(
            `<h2>🎉 Twombly is free!</h2><p>You sail out together, past the smog ship, past the leaders who said you never would. Twombly leaps into your arms.</p><p>Back on your island, he curls up by the Heart Tree. You built this paradise, one day at a time.</p><button id="fin" class="on">Home 💞</button>`,
          ),
        900,
      );
      setTimeout(() => {
        const f = $("#fin");
        if (f) f.onclick = closeModal;
      }, 1000);
    } else setTimeout(() => leaderMsg(), 900);
  };
}
function htStage() {
  const g = gave();
  let s = 0;
  HEARTS.forEach((v, i) => {
    if (g >= v) s = i;
  });
  return s;
}
function openHeart() {
  const g = gave(),
    s = htStage(),
    nx = HEARTS[Math.min(4, s + 1)],
    pr = s >= 4 ? 100 : Math.round((100 * (g - HEARTS[s])) / (nx - HEARTS[s]));
  showModal(
    `${X}<h2>💞 The Heart Tree</h2><div class="mute">Stage ${s + 1}/5 · ${HN[s]} · ${g} 🪙 given together</div><div class="bar"><i style="width:${pr}%"></i></div><p>Every coin you give makes it bloom. It grows with both of you.</p><button data-g="25" ${gold() < 25 ? "disabled" : ""}>Give 25 🪙</button><button data-g="100" ${gold() < 100 ? "disabled" : ""}>Give 100 🪙</button>`,
  );
  $("#x").onclick = closeModal;
  document.querySelectorAll("[data-g]").forEach(
    (b) =>
      (b.onclick = () => {
        const n = +b.dataset.g;
        if (gold() < n) return;
        const before = htStage();
        saveMe({
          gave: (me().gave || 0) + n,
          sp: (me().sp || 0) + n,
          ev: E("gave " + n + " 🪙 to the Heart Tree 💞"),
        });
        burst(0, 3.5, -1, 0xff9ec0, 24, 3, 3);
        tone(700, 0.2, "sine", 0.1);
        if (htStage() > before) {
          jingle([523, 659, 784, 1047]);
          toast("✨ The Heart Tree grew to " + HN[htStage()] + "!");
        }
        openHeart();
      }),
  );
}
// ---------- HUD ----------
function hud() {
  $("#coin").textContent = "🪙 " + gold();
  const i = inv(),
    h = $("#hot");
  h.innerHTML = SL.map(([k, ic], n) => {
    const c = i[k] || 0,
      tool = n < 3;
    return `<div class="slot ${n === slot ? "on" : ""} ${!tool && !c ? "dim" : ""}" data-s="${n}">${ic}${tool ? "" : `<b>${c}</b>`}</div>`;
  }).join("");
  h.querySelectorAll("[data-s]").forEach(
    (e) =>
      (e.onclick = (ev) => {
        ev.stopPropagation();
        pick(+e.dataset.s);
      }),
  );
  const o = other();
  $("#who").style.display = o ? "block" : "none";
  if (o)
    $("#who").textContent = "💕 " + nm(o) + (partner ? " is here" : " is away");
}
function pick(n) {
  slot = n;
  me3.held = "";
  hud();
  tone(600 + n * 30, 0.06, "sine", 0.06);
  const names = [
    "Hand: gather & talk",
    "Pickaxe: break blocks",
    "Watering can: water plants",
    "Seeds: tap grass to plant",
    "Sapling: tap grass to plant a tree",
  ];
  toast(n < 5 ? names[n] : "Placing " + SL[n][0] + " blocks");
}
function hintText() {
  if (inCave) return "↩️ Tap the glowing arch to leave the cave, or press 🏡";
  const st = me().st || {},
    t = now();
  let best = null,
    bd = 3.4;
  items.forEach((i) => {
    if (i.hint == null || !i.hint) return;
    const d = Math.hypot(i.x - me3.x, i.z - me3.z);
    if (d < bd) {
      bd = d;
      best = i;
    }
  });
  if (best) return best.hint;
  if (!st.chop) return "Tap a tree to chop it 🪓 (3 hits)";
  {
    const c0 = chap();
    if (0) 0;
  }
  if (!st.craft) return "Walk to the 🔨 workbench by the pond-side to craft";
  if (!st.place) return "Select 🟫 in the hotbar and tap the grass to build";
  if (!st.plant)
    return "Select 🥕 seeds and tap grass to plant, then 💧 to water";
  if (!st.altar) return "Visit the 💗 Love Altar and tap a flame";
  const c = chap(),
    h = CHP[c];
  if (!h) return "⛵ The boat is ready. Twombly is waiting!";
  const miss = Object.keys(h.r).find((k) => have(k) < h.r[k]);
  return miss
    ? "⛵ Chapter " +
        (c + 1) +
        ": " +
        RL[miss] +
        " " +
        Math.min(have(miss), h.r[miss]) +
        "/" +
        h.r[miss]
    : "⛵ Chapter " + (c + 1) + ": gather the materials, then visit the boat";
}
// ---------- input ----------
function SSN() {
  return window.__scope === 2 ? 0.1 : window.__scope === 1 ? 0.45 : 1;
}
let dn = null;
const cv = $("#c");
cv.addEventListener("pointerdown", (e) => {
  dn = { x: e.clientX, y: e.clientY, yaw, cp: cpit, op: opit, dr: false };
  cv.setPointerCapture(e.pointerId);
});
cv.addEventListener("pointermove", (e) => {
  if (inCave && !modalOpen) {
    if (document.pointerLockElement === cv) {
      yaw -= (e.movementX || 0) * 0.0032;
      cpit = clamp(cpit + (e.movementY || 0) * 0.0026, -0.5, 0.85);
      return;
    }
    if (dn) {
      const dx = e.clientX - dn.x,
        dy = e.clientY - dn.y;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6 || dn.dr) {
        dn.dr = true;
        yaw = dn.yaw - dx * 0.0052;
        cpit = clamp(dn.cp + dy * 0.003, -0.5, 0.85);
      }
    }
    return;
  }
  if (dn) {
    const dx = e.clientX - dn.x;
    if (Math.abs(dx) > 8 || Math.abs(e.clientY - dn.y) > 8 || dn.dr) {
      dn.dr = true;
      window.lastDragT = performance.now();
      yaw = dn.yaw - dx * 0.006 * SSN();
      if (TPS && !sailing)
        opit = clamp(dn.op + (e.clientY - dn.y) * 0.003 * SSN(), -0.2, 0.85);
    }
  } else if (e.pointerType === "mouse") ghostAt(e.clientX, e.clientY);
});
cv.addEventListener("pointerup", (e) => {
  if (dn && !dn.dr) {
    if (inCave) {
      if (document.pointerLockElement !== cv) {
        tapAt(e.clientX, e.clientY);
        goalPt = null;
      }
    } else tapAt(e.clientX, e.clientY);
  }
  dn = null;
});
cv.addEventListener(
  "wheel",
  (e) => {
    dist = Math.max(9, Math.min(24, dist + e.deltaY * 0.01));
    e.preventDefault();
  },
  { passive: false },
);
addEventListener("keydown", (e) => {
  if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
  const k = e.key.toLowerCase();
  keys[k] = true;
  if (k === " ") jumpPress();
  if (k === "h") goHome();
  if (k >= "1" && k <= "9" && SL[+k - 1]) pick(+k - 1);
  if (k === "0") pick(9);
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k))
    e.preventDefault();
  if (k === "escape") closeModal();
});
addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});
const ghost = new THREE.Mesh(
  BG,
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
  }),
);
ghost.visible = false;
scene.add(ghost);
function ghostAt(cx, cy) {
  ghost.visible = false;
  const t = SL[slot][0];
  if (!BT[t] || modalOpen || !ready) return;
  const hh = cast(cx, cy, [terrain, ...Object.values(blockMeshes)])[0];
  if (!hh) return;
  const o = hit(hh);
  let x, l, z;
  if (o.block) {
    const key = blockIds[o.block.userData.btype][hh.instanceId];
    if (!key) return;
    const n = hh.face.normal,
      a = key.split("_").map(Number);
    x = a[0] + Math.round(n.x);
    l = a[1] + Math.round(n.y);
    z = a[2] + Math.round(n.z);
  } else {
    x = Math.floor(hh.point.x);
    z = Math.floor(hh.point.z);
    l = Math.max(0, Math.round(hh.point.y - 1));
  }
  if (l < 0 || l > 26 || BL[x + "_" + l + "_" + z] || !inZone(x + 0.5, z + 0.5))
    return;
  ghost.position.set(x + 0.5, 1 + l + 0.5, z + 0.5);
  ghost.material.color.setHex(BT[t]);
  ghost.visible = true;
}
// ---------- movement ----------
function walkable(x, z) {
  return inCave
    ? caveOK(x, z, 0)
    : sailing || CRE.fly || hm(x, z) > -0.2 || exDock(x, z);
}
let sailing = false;
const floorY = (x, z) =>
  inCave
    ? 0.5
    : exDock(x, z)
      ? 0.9
      : sailing
        ? SEA + 0.22
        : Math.max(hm(x, z), SEA - 0.38, altY(x, z));
function supportAt(x, z, feet) {
  let b = floorY(x, z);
  if (inCave) return b;
  for (let i = Math.floor(x - 0.3); i <= Math.floor(x + 0.3); i++)
    for (let j = Math.floor(z - 0.3); j <= Math.floor(z + 0.3); j++) {
      const ls = colL.get(i + "," + j);
      if (ls)
        for (const l of ls) {
          const top = l + 2;
          if (top <= feet + 0.42 && top > b) b = top;
        }
    }
  return b;
}
var COLL = [];
function resolve(a, nx, nz) {
  let x = nx,
    z = nz;
  for (const c of COLL) {
    const dx = x - c.x,
      dz = z - c.z,
      m = c.r + 0.32;
    if (dx * dx + dz * dz >= m * m) continue;
    const d = Math.hypot(dx, dz);
    if (d < m && d > 1e-4) {
      x = c.x + (dx / d) * m;
      z = c.z + (dz / d) * m;
    }
  }
  for (const it of items) {
    if (!it.r) continue;
    const dx = x - it.x,
      dz = z - it.z,
      m = it.r + 0.32;
    if (dx * dx + dz * dz >= m * m) continue;
    const d = Math.hypot(dx, dz);
    if (d < m && d > 1e-4) {
      x = it.x + (dx / d) * m;
      z = it.z + (dz / d) * m;
    }
  }
  const cx = Math.floor(x),
    cz = Math.floor(z);
  for (let i = cx - 1; i <= cx + 1; i++)
    for (let j = cz - 1; j <= cz + 1; j++)
      if (
        (colL.get(i + "," + j) || []).some(
          (l) => 1 + l < a.y + 1.5 && l + 2 > a.y + 0.15,
        )
      ) {
        const px = Math.max(i, Math.min(x, i + 1)),
          pz = Math.max(j, Math.min(z, j + 1)),
          dx = x - px,
          dz = z - pz,
          d = Math.hypot(dx, dz);
        if (d < 0.32) {
          if (d > 1e-4) {
            x = px + (dx / d) * 0.32;
            z = pz + (dz / d) * 0.32;
          } else {
            const dl = x - i,
              dr = i + 1 - x,
              dt2 = z - j,
              db = j + 1 - z,
              m = Math.min(dl, dr, dt2, db);
            if (m === dl) x = i - 0.32;
            else if (m === dr) x = i + 1.32;
            else if (m === dt2) z = j - 0.32;
            else z = j + 1.32;
          }
        }
      }
  return [x, z];
}
function stepActor(a, dt, dirx, dirz, spd) {
  const tx = dirx * spd,
    tz = dirz * spd;
  const acc = a === me3 && slimeAt(a.x, a.z) ? 1.3 : 11;
  a.vx = (a.vx || 0) + (tx - (a.vx || 0)) * Math.min(1, dt * acc);
  a.vz = (a.vz || 0) + (tz - (a.vz || 0)) * Math.min(1, dt * acc);
  let nx = a.x + a.vx * dt,
    nz = a.z + a.vz * dt;
  const up = (x2, z2) =>
    !(a === me3 && CRE.fly) &&
    (hm(x2, z2) - hm(a.x, a.z)) /
      Math.max(0.01, Math.hypot(x2 - a.x, z2 - a.z)) >
      1.4;
  if (!walkable(nx, a.z) || up(nx, a.z)) nx = a.x;
  if (!walkable(nx, nz) || up(nx, nz)) nz = a.z;
  if (!(a === me3 && CRE.fly && a.y > hm(a.x, a.z) + 2.8)) {
    [nx, nz] = resolve(a, nx, nz);
  }
  a.x = nx;
  a.z = nz;
  a.spd = Math.hypot(a.vx, a.vz);
  if (a.spd > 0.2) {
    const want = Math.atan2(a.vx, a.vz);
    let d = want - a.ry;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    a.ry += d * Math.min(1, dt * 10);
  }
  if (a === me3 && inCave && !(dead > 0)) {
    const w = Math.atan2(-Math.sin(yaw), -Math.cos(yaw));
    let d2 = w - a.ry;
    d2 = Math.atan2(Math.sin(d2), Math.cos(d2));
    a.ry += d2 * Math.min(1, dt * 18);
  }
}
let stuck = 0,
  lastPos = 0,
  lastSent = { x: 0, z: 0 };
function moveMe(dt) {
  if (CLIMB.on || RT.on || (inCave && dead > 0) || PRIS.busted > 0) return;
  const fx = -Math.sin(yaw),
    fz = -Math.cos(yaw),
    rx = Math.cos(yaw),
    rz = -Math.sin(yaw);
  let dx = 0,
    dz = 0;
  if (!modalOpen) {
    if (keys.w || keys.arrowup) {
      dx += fx;
      dz += fz;
    }
    if (keys.s || keys.arrowdown) {
      dx -= fx;
      dz -= fz;
    }
    if (keys.a || keys.arrowleft) {
      dx -= rx;
      dz -= rz;
    }
    if (keys.d || keys.arrowright) {
      dx += rx;
      dz += rz;
    }
    if (keys.q) yaw += dt * 1.6 * SSN();
    if (keys.e && !inCave) yaw -= dt * 1.6 * SSN();
  }
  if (dx || dz) {
    goalPt = goalObj = null;
    const l = Math.hypot(dx, dz);
    dx /= l;
    dz /= l;
  } else if (goalObj) {
    const d = Math.hypot(goalObj.x - me3.x, goalObj.z - me3.z),
      r = goalObj.reach || 1.8;
    if (d <= r) {
      const it = goalObj;
      goalObj = null;
      me3.ry = Math.atan2(it.x - me3.x, it.z - me3.z);
      doInteract(it);
    } else {
      dx = (goalObj.x - me3.x) / d;
      dz = (goalObj.z - me3.z) / d;
    }
  } else if (goalPt) {
    const d = Math.hypot(goalPt.x - me3.x, goalPt.z - me3.z);
    if (d < 0.25) {
      goalPt = null;
      if (goalDig) {
        goalDig = false;
        digSand();
      }
    } else {
      dx = (goalPt.x - me3.x) / d;
      dz = (goalPt.z - me3.z) / d;
    }
  }
  const px = me3.x,
    pz = me3.z;
  if (!window.__nr) window.__nr = 0;
  if ((dx || dz) && me3.onG !== false) {
    const ax = me3.x + dx * 0.55,
      az = me3.z + dz * 0.55,
      ls = colL.get(Math.floor(ax) + "," + Math.floor(az));
    if (
      ls &&
      ls.some(
        (l) =>
          l + 2 > me3.y + 0.42 && l + 2 <= me3.y + 1.35 && 1 + l < me3.y + 1.5,
      )
    )
      jumpReq = true;
  }
  const swim = !CRE.fly && !inCave && !sailing && gh(me3.x, me3.z) < SEA - 0.02;
  sailing
    ? sailMove(dx, dz, dt)
    : stepActor(
        me3,
        dt,
        dx,
        dz,
        (swim && !CRE.fly ? 2.3 : 3.6) * slopeMul(dx, dz) * (CRE.fly ? 2.3 : 1) * (keys.shift ? 1.5 : 1),
      );
  if (swim && me3.spd > 0.5 && Math.random() < dt * 7)
    burst(me3.x, SEA + 0.05, me3.z, 0xbfeaff, 2, 0.8, 0.5);
  {
    const trying = !sailing && !modalOpen && (dx || dz);
    if (trying && Math.hypot(me3.x - px, me3.z - pz) < dt * 0.15)
      window.stuckT = (window.stuckT || 0) + dt;
    else window.stuckT = 0;
    if (window.stuckT > 4) {
      window.stuckT = 0;
      goHome("You were stuck, so you're back at the village 🏡");
    }
  }
  {
    if (!inCave) {
      const ls = colL.get(Math.floor(me3.x) + "," + Math.floor(me3.z));
      if (ls) {
        const inside = ls.filter(
          (l) => 1 + l < me3.y + 1.2 && l + 2 > me3.y + 0.3,
        );
        if (inside.length) me3.y = Math.max(me3.y, ...inside.map((l) => l + 2));
      }
    }
    const gY = supportAt(me3.x, me3.z, me3.y);
    if (jumpReq && me3.onG) {
      me3.vy = 6.8;
      me3.onG = false;
      tone(520, 0.12, "sine", 0.07);
    }
    jumpReq = false;
    if (CRE.fly) CRE.flyStep(dt, gY);
    else {
      me3.vy = (me3.vy || 0) - 19 * dt;
      me3.y += me3.vy * dt;
      if (me3.y <= gY) {
        me3.y = Math.min(gY, me3.y + Math.max(0.3, dt * 8));
        me3.vy = 0;
        me3.onG = true;
      } else me3.onG = false;
    }
  }
  if ((goalPt || goalObj) && Math.hypot(me3.x - px, me3.z - pz) < dt * 0.4) {
    stuck += dt;
    if (stuck > 0.7) {
      goalPt = goalObj = null;
      goalDig = false;
      stuck = 0;
    }
  } else stuck = 0;
  const t = now();
  if (
    t - lastPos > 300 &&
    Math.hypot(me3.x - lastSent.x, me3.z - lastSent.z) > 0.05 &&
    db
  ) {
    lastPos = t;
    lastSent = { x: me3.x, z: me3.z };
    try {
      db.doc("p7/" + uid)
        .update({ x: me3.x, z: me3.z, y: me3.y, ry: me3.ry })
        .catch(() => {});
    } catch (e) {}
  }
}
function animActor(a, dt, t) {
  const sp = a === me3 && sailing ? 0 : a.spd,
    u = a.u,
    w = Math.min(1, sp / 3.4);
  a.ph += sp * dt * 2.4;
  const s = Math.sin(a.ph) * 0.8 * w;
  u.lL.rotation.x = s;
  u.lR.rotation.x = -s;
  u.aL.rotation.x = -s * 0.9;
  u.aR.rotation.x = s * 0.9;
  if (a.act > 0) {
    a.act -= dt;
    u.aR.rotation.x = -1.5 + Math.sin((0.5 - a.act) * 14) * 0.9;
  }
  if (a === me3 && inCave) cavePose(a, dt);
  const bob = Math.abs(Math.sin(a.ph)) * 0.07 * w + Math.sin(t / 600) * 0.012;
  if (a !== me3)
    a.y +=
      ((a.ty === undefined ? gh(a.x, a.z) : a.ty) - a.y) * Math.min(1, dt * 10);
  a.g.position.set(a.x, a.y + bob, a.z);
  a.g.rotation.y = a.ry;
  u.tor.rotation.z = Math.sin(a.ph) * 0.05 * w;
  u.head.rotation.z =
    Math.sin(a.ph * 0.5) * 0.04 * w + Math.sin(t / 900) * 0.02;
  if (a.em && now() - a.emT < 2600) {
    if (!a.emS || a.emS.e !== a.em) {
      if (a.emS) a.g.remove(a.emS);
      a.emS = emoteSprite(a.em);
      a.emS.e = a.em;
      a.g.add(a.emS);
    }
    a.emS.position.y = 3.1 + Math.sin(t / 260) * 0.08;
  } else if (a.emS) {
    a.g.remove(a.emS);
    a.emS = null;
    a.em = null;
  }
  if (a.heldK !== a.held) {
    a.heldK = a.held;
    u.hold.clear();
    u.hold.add(mkHeld(a.held));
  }
}
// ---------- day cycle & loop ----------
const SK = [
  [0, 0x1f2a60, 0.2],
  [5, 0x34428a, 0.24],
  [6.6, 0xffb08f, 0.75],
  [8.2, 0xbfe8ff, 1.15],
  [16.5, 0xbfe8ff, 1.15],
  [18.8, 0xff9f7e, 0.75],
  [20.6, 0x303d80, 0.26],
  [24, 0x1f2a60, 0.2],
];
function dayCycle() {
  const d = new Date(now() + timeOff),
    h = d.getHours() + d.getMinutes() / 60;
  let a = SK[0],
    b = SK[1];
  for (let i = 0; i < SK.length - 1; i++)
    if (h >= SK[i][0] && h <= SK[i + 1][0]) {
      a = SK[i];
      b = SK[i + 1];
    }
  const f = (h - a[0]) / (b[0] - a[0] || 1),
    c = new THREE.Color(a[1]).lerp(new THREE.Color(b[1]), f),
    it = a[2] + (b[2] - a[2]) * f;
  c.lerp(SMOG, pollution * 0.85);
  c.lerp(WXC, WXK * 0.7);
  if (inCave) c.setHex(0x050205);
  scene.background.copy(c);
  scene.fog.color.copy(c);
  scene.fog.near = 38 - 18 * pollution;
  const night = 1 - ss(0.3, 0.9, it);
  hemi.intensity = (0.36 + it * 0.2) * (1 - 0.25 * pollution) * (1 - 0.5 * WXK);
  sun.intensity = (0.24 + it * 0.42) * (1 - 0.3 * pollution) * (1 - 0.85 * WXK);
  sun.color.setHex(night > 0.5 ? 0x8fa6ff : it < 0.9 ? 0xffc796 : 0xfff2d8);
  const ang = Math.max(
    0.15,
    Math.min(Math.PI - 0.15, ((h - 6) / 12) * Math.PI),
  );
  sun.userData.dir = new THREE.Vector3(
    Math.cos(ang) * 28,
    Math.max(12, Math.sin(ang) * 34),
    14,
  );
  glow.forEach((m) => {
    m.emissiveIntensity =
      (m.userData.base === undefined
        ? (m.userData.base = m.emissiveIntensity)
        : m.userData.base) *
      (0.35 + night * 1.4);
  });
  return night;
}
const clouds = [];
for (let i = 0; i < 9; i++) {
  const g = new THREE.Group(),
    m = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      fog: false,
    });
  for (let k = 0; k < 4; k++) {
    const s = new THREE.Mesh(G.crown, m);
    s.position.set(k * 1.6 - 2.4, Math.sin(k) * 0.4, 0);
    s.scale.set(2 + Math.cos(k * 2) * 0.6, 1, 1.5);
    g.add(s);
  }
  g.position.set(-90 + i * 24, 34 + (i % 3) * 4, -60 + ((i * 37) % 110));
  g.userData.sp = 0.6 + (i % 4) * 0.25;
  clouds.push(g);
  scene.add(g);
}
const FF = 60,
  ffp = new Float32Array(FF * 3),
  ffg = new THREE.BufferGeometry();
ffg.setAttribute("position", new THREE.BufferAttribute(ffp, 3));
const ffm = new THREE.PointsMaterial({
  size: 0.22,
  color: 0xfff3a0,
  transparent: true,
  opacity: 0,
  depthWrite: false,
  map: new THREE.CanvasTexture(dotC),
});
const ff = new THREE.Points(ffg, ffm);
ff.frustumCulled = false;
scene.add(ff);
function camWant() {
  const s = sailing,
    pe = s ? Math.max(pitch, 0.42) : pitch,
    dd = s ? dist * 1.35 + 2.5 + BO.v * 0.25 : dist,
    cp = Math.cos(pe),
    ax = s ? BO.lx * 0.45 : 0,
    az = s ? BO.lz * 0.45 : 0;
  return new THREE.Vector3(
    me3.x + ax + Math.sin(yaw) * cp * dd,
    me3.y + 1.2 + Math.sin(pe) * dd,
    me3.z + az + Math.cos(yaw) * cp * dd,
  );
}
function snapCam() {
  cam.position.copy(camWant());
  cam.userData.look = new THREE.Vector3(
    me3.x + (sailing ? BO.lx : 0),
    me3.y + 1.2,
    me3.z + (sailing ? BO.lz : 0),
  );
  cam.lookAt(cam.userData.look);
  cam.updateMatrixWorld(true);
}
let last = performance.now(),
  night = 0,
  lt = 0,
  slowT = 0;
function frame(tm) {
  requestAnimationFrame(frame);
  let dt = Math.min(0.05, (tm - last) / 1000);
  last = tm;
  const t = tm / 1000;
  if (HIT.t > 0) {
    HIT.t -= dt;
    dt *= 0.1;
  }
  if (ready) {
    moveMe(dt);
    animActor(me3, dt, tm);
    if (partner) {
      const p = window.__rp
        ? Object.assign({}, P[other()], window.__rp)
        : P[other()];
      if (p && p.x !== undefined) {
        const dx = p.x - partner.x,
          dz = p.z - partner.z,
          d = Math.hypot(dx, dz);
        partner.ty = p.y;
        partner.vx = 0;
        partner.x += dx * Math.min(1, dt * 7);
        partner.z += dz * Math.min(1, dt * 7);
        partner.spd = Math.min(3.6, d * 9);
        if (d > 0.03) {
          let a = Math.atan2(dx, dz) - partner.ry;
          a = Math.atan2(Math.sin(a), Math.cos(a));
          partner.ry += a * Math.min(1, dt * 9);
        }
        if (p.emo && now() - p.emoT < 2600) {
          partner.em = p.emo;
          partner.emT = p.emoT;
        }
      }
      animActor(partner, dt, tm);
    }
  }
  me3.held = inCave
    ? caveHeld()
    : CRE.on && CRE.w >= 0 && !sailing
      ? "cw" + CRE.w
      : SL[slot][0];
  // camera
  if (sailing) {
    sailCamTick(dt);
    const la = 4.5 + BO.v * 1,
      k = Math.min(1, dt * 2.2);
    BO.lx += (Math.sin(BO.h) * la - BO.lx) * k;
    BO.lz += (Math.cos(BO.h) * la - BO.lz) * k;
  } else {
    BO.lx = BO.lz = 0;
  }
  const tx = me3.x + BO.lx,
    tz = me3.z + BO.lz,
    ty = me3.y + 1.2,
    want = camWant();
  cam.position.lerp(want, Math.min(1, dt * (sailing ? 6 : 5)));
  cam.userData.look = (cam.userData.look || new THREE.Vector3(tx, ty, tz)).lerp(
    new THREE.Vector3(tx, ty, tz),
    Math.min(1, dt * 8),
  );
  cam.lookAt(cam.userData.look);
  if (inCave) caveCamApply(dt);
  else if (TPS && !sailing && !photoOn) tpsApply(dt);
  if (t - lt > 0.5) {
    lt = t;
    night = dayCycle();
    plantTick();
    partTick();
    items.forEach((i) => {
      if (i.kind === "brazier") {
        if (!i.h0) i.h0 = i.hint;
        i.hint =
          (newOffer() ? "💌 New answer from " + nm(other()) + "! " : "") + i.h0;
      }
    });
    if (ready) {
      $("#hint").textContent = hintText();
      const o = other(),
        h = !!(o && P[o] && P[o].ask && !(me().rep || {})[P[o].ask.id]);
      mb.userData.flag.rotation.z = h ? 0 : -1.2;
      mbItem.hint = h
        ? "✉️ A letter is waiting for you!"
        : "✉️ Mailbox: send or answer 3 questions";
    }
  }
  if (sun.userData.dir) {
    sun.position.set(me3.x, 0, me3.z).add(sun.userData.dir);
    sun.target.position.set(me3.x, 0, me3.z);
  }
  // water waves
  if (tm - _wvT >= 66) {
    _wvT = tm;
    const wpa = wp.array;
    for (let i = 0; i < wp.count; i++) {
      const x = wpa[i * 3],
        z = wpa[i * 3 + 2];
      wpa[i * 3 + 1] =
        (Math.sin(x * 0.55 + t * 1.3) * 0.035 +
          Math.cos(z * 0.45 + t * 1.1) * 0.03) *
          (1 + WXK * 5) *
          WK[i] +
        WB[i];
    }
    wp.needsUpdate = true;
  }
  altar.userData.heart.scale.setScalar(
    0.9 + (newOffer() ? 0.28 + Math.sin(t * 5) * 0.1 : 0),
  );
  altar.userData.heart.rotation.y = t * 0.8;
  altar.userData.heart.position.y = 3 + Math.sin(t * 1.6) * 0.15;
  altar.userData.pl.intensity = 0.7 + Math.sin(t * 2) * 0.2 + night * 0.8;
  flames.forEach((f, i) => {
    f.scale.set(
      1 + Math.sin(t * 9 + i) * 0.12,
      1 + Math.sin(t * 11 + i * 2) * 0.2,
      1 + Math.sin(t * 8 + i) * 0.12,
    );
  });
  const hs3 = 1 + htStage() * 0.28;
  heartTree.scale.setScalar(
    0.55 + Math.min(1, gave() / 3000) * 1.5 + Math.sin(t * 1.2) * 0.015,
  );
  items.forEach((i) => {
    if (i.fall > 0) {
      i.fall -= dt;
      i.root.scale.setScalar(Math.max(0.01, (i.fall / 0.5) * i.s0));
      i.root.rotation.z = (0.5 - i.fall) * 1.6;
      if (i.fall <= 0) IG.remove(i.root);
    } else if (i.shake > 0) {
      i.shake -= dt;
      i.root.rotation.z = Math.sin(t * 40) * i.shake * 0.12;
    } else if (i.root.rotation.z && !i.broken) i.root.rotation.z = 0;
  });
  clouds.forEach((c) => {
    c.position.x += c.userData.sp * dt;
    if (c.position.x > 110) c.position.x = -110;
  });
  campaignTick(dt, t);
  for (let i = 0; i < PN; i++) {
    if (pl[i] > 0) {
      pl[i] -= dt * 1.1;
      pv[i * 3 + 1] -= 6 * dt;
      pp[i * 3] += pv[i * 3] * dt;
      pp[i * 3 + 1] += pv[i * 3 + 1] * dt;
      pp[i * 3 + 2] += pv[i * 3 + 2] * dt;
      if (pl[i] <= 0) pp[i * 3 + 1] = -50;
    }
  }
  pgeo.attributes.position.needsUpdate = true;
  ffm.opacity = night * 0.9;
  for (let i = 0; i < FF; i++) {
    ffp[i * 3] =
      me3.x + Math.sin(t * 0.3 + i * 3.1) * 14 + Math.sin(t * 0.9 + i) * 0.8;
    ffp[i * 3 + 2] =
      me3.z + Math.cos(t * 0.27 + i * 1.7) * 14 + Math.cos(t * 0.7 + i) * 0.8;
    ffp[i * 3 + 1] = 1.5 + Math.sin(t * 0.8 + i * 2) * 0.8 + (i % 5) * 0.3;
  }
  ffg.attributes.position.needsUpdate = true;
  if (window.exTick) exTick(dt, t);
  if (tm - _shT >= 33 || dt > 0.045) {
    _shT = tm;
    R.shadowMap.needsUpdate = true;
  }
  R.render(scene, cam);
}
// ---------- daily / start ----------
function daily() {
  const day = new Date(now()).toISOString().slice(0, 10),
    p = me();
  if (p.day === day) return;
  const y = new Date(now() - 864e5).toISOString().slice(0, 10),
    st = p.day === y ? (p.streak || 0) + 1 : 1,
    g = 10 * Math.min(st, 7);
  saveMe({ day, streak: st, earned: (p.earned || 0) + g });
  setTimeout(() => toast("Day " + st + " together: +" + g + " 🪙"), 1500);
}
function onboard() {
  const m = me();
  if (!m.name) {
    showModal(
      `<h2>🏝️ Welcome to your island</h2><p>What should your partner call you?</p><input id="nm" maxlength="16" placeholder="Your nickname"><button id="ok" class="on">Continue</button>`,
    );
    $("#ok").onclick = () => {
      const v = $("#nm").value.trim();
      if (!v) return;
      closeModal();
      me3.name = v;
      saveMe({
        name: v.slice(0, 16),
        inv: { wood: 3, seed: 3, sapling: 1, plank: 4 },
        ci: Object.keys(P).filter((u) => u !== uid).length ? 1 : 0,
      });
      me3.g.remove(me3.lab);
      me3.lab = label(v);
      me3.lab.position.y = 2.55;
      me3.g.add(me3.lab);
      onboard();
    };
    return;
  }
  if (!m.intro) {
    showModal(
      `<h2>🌅 Our paradise</h2><p>You and the person you love washed up on a filthy island. The boat is wrecked on the shore and Twombly, your cat, is waiting on the other side.</p><p>Clear the trash, assemble an air purifier from parts you find around the island, fish from the pier, explore the hill and its cave, then repair the boat and sail off with Twombly. Press <b>Tab</b> (or 📋) for the map, goals and crafting list.</p><button id="bg" class="on">Begin ✨</button>`,
    );
    $("#bg").onclick = () => {
      closeModal();
      saveMe({ intro: 1, seenAt: now() });
      jingle([392, 523, 659, 784]);
      onboard();
    };
    return;
  }
  if (recap.length) {
    showModal(
      `<h2>While you were away 💕</h2>${recap
        .slice(-6)
        .map((r) => `<div class="it">${esc(r)}</div>`)
        .join("")}<button id="gt" class="on">Back to the island</button>`,
    );
    $("#gt").onclick = () => {
      closeModal();
      recap = [];
      saveMe({ seenAt: now() });
    };
    return;
  }
  daily();
}
function startGame() {
  if (ready) return;
  ready = true;
  const m = me();
  me3.x = Object.keys(P).length > 1 ? 1.5 : 0;
  me3.z = 5;
  me3.vy = 0;
  me3.y = gh(me3.x, me3.z) + 0.05;
  me3.name = m.name || "You";
  me3.g.remove(me3.lab);
  me3.lab = label(me3.name);
  me3.lab.position.y = 2.55;
  me3.g.add(me3.lab);
  if (m.ci !== undefined) {
    me3.g.parent.remove(me3.g);
    const old = me3;
    Object.assign(me3, actor(m.ci, me3.name), {
      x: old.x,
      z: old.z,
      y: old.y,
      ry: old.ry,
    });
  }
  me3.g.userData.who = me3;
  const s0 = m.seenAt || 0;
  recap = [];
  const o = other();
  if (o)
    (P[o].ev || [])
      .filter((e) => e.t > s0)
      .forEach((e) => recap.push(nm(o) + " " + e.m));
  lastOffer = offerTs() || 1;
  lastChap = chap();
  if (!village.chStart) vup({ chStart: now(), chap: 0 });
  campaignSync();
  snapCam();
  window.__ready = true;
  hud();
  onboard();
}
function peerSync() {
  const o = other();
  if (o && P[o] && P[o].x !== undefined && P[o].name) {
    if (!partner) {
      partner = actor(P[o].ci === undefined ? 1 : P[o].ci, P[o].name);
      partner.x = P[o].x;
      partner.z = P[o].z;
      partner.ry = P[o].ry || 0;
      partner.g.userData.who = partner;
    }
  } else if (partner && !o) {
    scene.remove(partner.g);
    partner = null;
  }
  hud();
}
function localDB() {
  const K = "island_v36";
  let S = {};
  try {
    S = JSON.parse(localStorage.getItem(K) || "{}");
  } catch (e) {
    S = {};
  }
  const _t = { x: 0 },
    subs = [],
    cl = (x) => JSON.parse(JSON.stringify(x)),
    save = () => {
      clearTimeout(_t.x);
      _t.x = setTimeout(() => {
        try {
          localStorage.setItem(K, JSON.stringify(S));
        } catch (e) {}
      }, 700);
    },
    notify = () => subs.forEach((f) => f());
  const mg = (a, b) => {
    for (const k in b) {
      if (
        b[k] &&
        typeof b[k] === "object" &&
        !Array.isArray(b[k]) &&
        a[k] &&
        typeof a[k] === "object"
      )
        mg(a[k], b[k]);
      else a[k] = b[k];
    }
  };
  const snap = (c) => ({
    docs: Object.keys(S)
      .filter((k) => k.startsWith(c + "/"))
      .map((k) => ({ id: k.slice(c.length + 1), data: () => cl(S[k]) })),
  });
  return {
    collection: (c) => ({
      onSnapshot: (f) => {
        const r = () => f(snap(c));
        subs.push(r);
        setTimeout(r, 0);
      },
    }),
    doc: (p) => ({
      get: async () => ({ exists: p in S, data: () => cl(S[p]) }),
      set: async (d) => {
        S[p] = cl(d);
        save();
        notify();
      },
      update: async (d) => {
        S[p] = S[p] || {};
        mg(S[p], cl(d));
        save();
        notify();
      },
      delete: async () => {
        delete S[p];
        save();
        notify();
      },
      onSnapshot: (f) => {
        const r = () => f({ exists: p in S, data: () => cl(S[p]) });
        subs.push(r);
        setTimeout(r, 0);
      },
    }),
  };
}
(async () => {
  try {
    if (!window.__MP) {
      db = localDB();
      uid = "local";
      offline = true;
      setTimeout(() => toast("Your island is saved on this device 💾"), 1500);
    } else {
      db = window.__MP.db;
      uid = window.__MP.uid;
    }
    let a = false,
      b = false,
      c = false,
      d = false;
    const chk = () => {
      if (a && b && c && d) {
        startGame();
        peerSync();
        if (ready && !modalOpen && !me().name) onboard();
      }
    };
    db.collection("p7").onSnapshot(
      (s) => {
        s.docs.forEach((x) => {
          if (x.id === uid && pend > 0) return;
          P[x.id] = x.data();
        });
        a = true;
        chk();
        if (ready) {
          peerSync();
          const o = other();
          if (o) {
            const ts = offerTs();
            if (lastOffer && ts > lastOffer)
              toast("💌 " + nm(o) + " left an answer at the altar");
            lastOffer = Math.max(lastOffer, ts);
          }
        }
      },
      (e) => toast("Sync problem: " + e.code),
    );
    db.collection("blk7").onSnapshot(
      (s) => {
        BL = {};
        s.docs.forEach((x) => {
          const v = x.data();
          if (v && v.t) BL[x.id] = v;
        });
        rebuildBlocks();
        b = true;
        chk();
      },
      (e) => toast("Sync problem: " + e.code),
    );
    db.collection("pl7").onSnapshot(
      (s) => {
        PL = {};
        s.docs.forEach((x) => {
          const v = x.data();
          if (v && v.k) PL[x.id] = v;
        });
        syncPlants();
        c = true;
        chk();
      },
      (e) => toast("Sync problem: " + e.code),
    );
    db.doc("village/v7").onSnapshot(
      (s) => {
        village = s.exists ? s.data() : {};
        village.cleaned = Object.assign({}, village.cleaned, localCleaned);
        village.broken = Object.assign({}, village.broken, localBroken);
        d = true;
        if (ready) campaignSync();
        chk();
      },
      (e) => toast("Sync problem: " + e.code),
    );
  } catch (e) {
    $("#hint").textContent = "Couldn't load: " + (e.message || e);
  }
})();
// ===== v1.9 extras =====
let polB = 0,
  fT = null,
  levSurf = 0,
  levNext = 18,
  levUp = 0,
  cvNext = 14,
  hb = 0,
  trashLeft = 0,
  TR0 = 0;
const EXF = {},
  clamp = (v, a, b) => Math.max(a, Math.min(b, v)),
  hitM = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
const hitSph = (g, r, y) => {
  const h = new THREE.Mesh(new THREE.SphereGeometry(r, 6, 4), hitM);
  h.position.y = y || 0.3;
  g.add(h);
};
// trash
{
  const cols = [0xe8e8e8, 0x4aa8e6, 0xd04040, 0x7a7a7a, 0xe8c02a, 0x3a8a4a];
  for (let n = 0, tr = 0; n < 80 && tr < 1500; tr++) {
    const a = rnd() * 6.283,
      d = 3 + rnd() * 31,
      x = Math.cos(a) * d,
      z = Math.sin(a) * d;
    if (gh(x, z) < 0.75 || !free(x, z, 0.8)) continue;
    n++;
    const g = new THREE.Group(),
      k = n % 3;
    const m =
      k === 0
        ? new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.4), M(cols[n % 6]))
        : k === 1
          ? new THREE.Mesh(
              new THREE.CylinderGeometry(0.12, 0.12, 0.45, 8),
              M(cols[(n + 1) % 6]),
            )
          : new THREE.Mesh(
              new THREE.DodecahedronGeometry(0.28, 0),
              M(0xdcdcdc),
            );
    m.position.y = 0.2;
    m.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3);
    m.castShadow = true;
    g.add(m);
    hitSph(g, 0.7);
    addItem({
      id: "tz" + n,
      kind: "trash",
      x,
      z,
      r: 0,
      reach: 1.8,
      root: place(g, x, z),
      hint: "🗑️ Trash: tap to pick it up",
    });
    trashLeft++;
  }
  TR0 = trashLeft;
}
// crabs
const crabs = [];
for (let n = 0; n < 14; n++) {
  const sp = beachAt(rnd() * 6.283);
  if (!sp) continue;
  const g = new THREE.Group(),
    m = M(0xe0452e),
    b = new THREE.Mesh(G.crown, m);
  b.scale.set(0.2, 0.1, 0.15);
  b.position.y = 0.1;
  g.add(b);
  [-1, 1].forEach((s) => {
    const c = new THREE.Mesh(G.crown, m);
    c.scale.setScalar(0.07);
    c.position.set(s * 0.2, 0.13, 0.12);
    g.add(c);
    const e = new THREE.Mesh(G.crown, M(0x111111));
    e.scale.setScalar(0.03);
    e.position.set(s * 0.07, 0.22, 0.1);
    g.add(e);
  });
  hitSph(g, 0.5, 0.2);
  crabs.push(
    addItem({
      id: "cb" + n,
      kind: "crab",
      x: sp[0],
      z: sp[1],
      hx: sp[0],
      hz: sp[1],
      tx: sp[0],
      tz: sp[1],
      ct: 0,
      r: 0,
      reach: 1.5,
      root: place(g, sp[0], sp[1]),
      hint: "🦀 A little crab: tap to catch it",
    }),
  );
}
function crabTick(dt) {
  crabs.forEach((c) => {
    if (c.gone) return;
    c.ct -= dt;
    if (c.ct <= 0) {
      c.ct = 1 + Math.random() * 2.5;
      c.tx = c.hx + (Math.random() - 0.5) * 3;
      c.tz = c.hz + (Math.random() - 0.5) * 3;
      const h = gh(c.tx, c.tz);
      if (h < 0.5 || h > 0.85) {
        c.tx = c.x;
        c.tz = c.z;
      }
    }
    const dx = c.tx - c.x,
      dz = c.tz - c.z,
      d = Math.hypot(dx, dz);
    if (d > 0.05) {
      c.x += (dx / d) * 0.9 * dt;
      c.z += (dz / d) * 0.9 * dt;
      c.root.rotation.y = Math.atan2(dx, dz) + 1.57;
    }
    c.root.position.set(c.x, gh(c.x, c.z), c.z);
  });
}
// fishing station
const FS = beachAt(1.5) || beachAt(0.9) || [30, 10],
  fa = Math.atan2(FS[1], FS[0]),
  fg = new THREE.Group();
{
  const w = M(0xb5835a),
    p = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.14, 5), w);
  p.position.set(0, 0.55, 2.2);
  p.castShadow = true;
  fg.add(p);
  [
    [0.7, 0.5],
    [-0.7, 0.5],
    [0.7, 3.8],
    [-0.7, 3.8],
  ].forEach(([x, z]) => {
    const l = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1.4, 6),
      M(0x6e4a2e),
    );
    l.position.set(x, 0.1, z);
    fg.add(l);
  });
  const po = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 2, 6),
    M(0x8a5a3a),
  );
  po.position.set(0.6, 1.5, 3.9);
  po.rotation.z = -0.5;
  fg.add(po);
  const bk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.18, 0.3, 10),
    M(0x4aa8e6),
  );
  bk.position.set(-0.5, 0.78, 2.8);
  fg.add(bk);
  hitSph(fg, 1.6, 1);
}
fg.rotation.y = Math.atan2(Math.cos(fa), Math.sin(fa));
addItem({
  id: "fish",
  kind: "fish",
  x: FS[0] + Math.cos(fa) * 1.2,
  z: FS[1] + Math.sin(fa) * 1.2,
  r: 0,
  reach: 3.4,
  root: place(fg, FS[0], FS[1], 0.3),
  hint: "🎣 Fishing station: tap to fish",
});
function exFish() {
  let st = 0;
  showModal(
    `${X}<h2>🎣 Fishing station</h2><p id="fm">Tap Cast to throw your line.</p><button id="fc" class="on">Cast 🎣</button>`,
  );
  $("#x").onclick = () => {
    clearTimeout(fT);
    closeModal();
  };
  $("#fc").onclick = () => {
    if (st === 1) return;
    const fm = $("#fm"),
      fc = $("#fc");
    if (st === 0) {
      st = 1;
      fm.textContent = "Waiting for a bite… 🌊";
      fT = setTimeout(
        () => {
          if (!$("#fc")) return;
          st = 2;
          const big = Math.random() < 0.1;
          fm.textContent = big
            ? "😨 Something HUGE is pulling the line… REEL!"
            : "🐟 A bite! REEL!";
          fc.textContent = "Reel!";
          fc.dataset.big = big ? 1 : 0;
          fT = setTimeout(
            () => {
              if (!$("#fc")) return;
              st = 0;
              fm.textContent = "It got away… 😅";
              fc.textContent = "Cast again 🎣";
            },
            big ? 1000 : 1400,
          );
        },
        1500 + Math.random() * 3500,
      );
      return;
    }
    clearTimeout(fT);
    st = 0;
    fc.textContent = "Cast again 🎣";
    if (fc.dataset.big === "1") {
      levUp = 9;
      levNext = 60;
      fm.textContent =
        "The line snaps! A vast shadow glides under the pier… 😱";
      tone(60, 2, "sine", 0.2);
      return;
    }
    const F = [
        ["🐟 a fish", 6],
        ["🐠 a tropical fish", 10],
        ["🦑 a squid", 14],
        ["🥾 an old boot", 0],
      ],
      f = F[Math.floor(Math.random() * 4)];
    EXF.fish = 1;
    addInv({ fish: 1 });
    if (f[1]) award(f[1]);
    fm.textContent =
      "You caught " + f[0] + "!" + (f[1] ? " +" + f[1] + " 🪙" : "");
    tone(660, 0.15, "sine", 0.1);
  };
}
// leviathan
const levS = [],
  lm = new THREE.MeshBasicMaterial({
    color: 0x04101c,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  }),
  fm2 = M(0x0a1a28, { roughness: 0.5 });
for (let i = 0; i < 16; i++) {
  const g = new THREE.Group(),
    s = new THREE.Mesh(G.crown, lm),
    sc = i === 0 ? 1.5 : 1.4 - i * 0.07;
  s.scale.set(sc * 1.4, sc * 0.32, sc * 0.9);
  g.add(s);
  if (i % 3 === 1) {
    const f = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.9 * sc, 4), fm2);
    f.position.y = sc * 0.35;
    g.add(f);
  }
  scene.add(g);
  levS.push(g);
}
function levTick(dt, t) {
  levNext -= dt;
  if (levNext <= 0) {
    levNext = 45 + Math.random() * 50;
    levUp = 7;
    if (!inCave) {
      tone(70, 1.6, "sine", 0.1);
      if (Math.random() < 0.5)
        toast("🌊 Something enormous moves beneath the waves…");
    }
  }
  levUp -= dt;
  levSurf += ((levUp > 0 ? 1 : 0) - levSurf) * Math.min(1, dt * 0.8);
  lm.opacity = 0.5 + 0.4 * levSurf;
  levS.forEach((g, i) => {
    const a = t * 0.045 - i * 0.055,
      r = 40 + Math.sin(t * 0.2) * 2.5 + Math.sin(a * 3);
    g.position.set(
      Math.cos(a) * r,
      SEA -
        0.45 +
        levSurf * (0.1 + 0.65 * Math.max(0, Math.sin(i * 0.8 - t * 0.9))),
      Math.sin(a) * r,
    );
    g.rotation.y = -(a + Math.PI / 2);
  });
}
// scary cave
const cvL = caveG.children.find((c) => c.isPointLight),
  cvD = caveG.children.find(
    (c) => c.material && c.material.side === THREE.BackSide,
  );
cvD.material.color.setHex(0x0b060c);
cvL.color.setHex(0xa02a2a);
const skM = M(0xe6dfcf),
  eyeM = EM(0xff1a1a, 2.2),
  blk = M(0x050505),
  eyes = [];
for (let i = 0; i < 9; i++) {
  const a = i * 0.7 + 0.3,
    r = 1.8 + hs(i, 2, 2) * 3.4,
    g = new THREE.Group(),
    h = new THREE.Mesh(G.crown, skM);
  h.scale.set(0.17, 0.15, 0.16);
  h.position.y = 0.14;
  g.add(h);
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(G.crown, blk);
    e.scale.setScalar(0.04);
    e.position.set(s * 0.06, 0.17, 0.13);
    g.add(e);
  });
  const bn = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.5, 5),
    skM,
  );
  bn.rotation.z = 1.5;
  bn.position.set(0.3, 0.04, 0.1);
  g.add(bn);
  g.position.set(Math.cos(a) * r, 0.5, Math.sin(a) * r);
  g.rotation.y = i * 2;
  caveG.add(g);
}
for (let i = 0; i < 14; i++) {
  const a = (i / 14) * 6.283 + hs(i, 3, 3),
    g = new THREE.Group();
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(G.crown, eyeM);
    e.scale.setScalar(0.07);
    e.position.set(-Math.sin(a) * 0.12 * s, 0, Math.cos(a) * 0.12 * s);
    g.add(e);
  });
  g.position.set(Math.cos(a) * 5.4, 0.7 + hs(i, 4, 4) * 1.9, Math.sin(a) * 5.4);
  g.visible = false;
  g.userData.t = Math.random() * 4;
  caveG.add(g);
  eyes.push(g);
}
const fig = new THREE.Group();
{
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.4, 2.1, 8), blk),
    h = new THREE.Mesh(G.crown, blk);
  h.scale.set(0.28, 0.34, 0.28);
  h.position.y = 1.25;
  b.position.y = 0.05;
  fig.add(b, h);
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(G.crown, eyeM);
    e.scale.setScalar(0.06);
    e.position.set(s * 0.1, 1.3, 0.24);
    fig.add(e);
  });
}
fig.visible = false;
scene.add(fig);
const flE = document.createElement("div");
flE.style.cssText =
  "position:fixed;inset:0;background:#700;opacity:0;pointer-events:none;z-index:5";
document.body.appendChild(flE);
function scare() {
  const a = Math.random() * 6.283;
  fig.position.set(me3.x + Math.cos(a) * 2.4, 0.5, me3.z + Math.sin(a) * 2.4);
  fig.lookAt(me3.x, 1.8, me3.z);
  fig.visible = true;
  flE.style.transition = "none";
  flE.style.opacity = 0.7;
  setTimeout(() => {
    flE.style.transition = "opacity .9s";
    flE.style.opacity = 0;
  }, 60);
  setTimeout(() => {
    fig.visible = false;
  }, 900);
  tone(1100, 0.5, "sawtooth", 0.2);
  tone(80, 0.8, "square", 0.2);
  tone(1500, 0.3, "square", 0.1, 0.1);
}
function caveTick(dt, t) {
  scene.fog.far = inCave ? 13 : 140;
  if (!inCave) {
    fig.visible = false;
    return;
  }
  EXF.cave = 1;
  scene.fog.near = 1;
  hemi.intensity = 0.1;
  sun.intensity = 0;
  cvL.intensity =
    Math.random() < 0.04
      ? 0
      : 0.3 + Math.sin(t * 9) * 0.08 + Math.random() * 0.15;
  eyes.forEach((g) => {
    g.userData.t -= dt;
    if (g.userData.t <= 0) {
      g.visible = !g.visible && Math.random() < 0.5;
      g.userData.t = 0.6 + Math.random() * 3;
    }
  });
  cvNext -= dt;
  if (cvNext <= 0) {
    cvNext = 14 + Math.random() * 22;
    scare();
  }
  hb -= dt;
  if (hb <= 0) {
    hb = 1.1;
    tone(55, 0.14, "sine", 0.3);
    tone(50, 0.14, "sine", 0.25, 0.2);
  }
  if (Math.random() < dt * 0.5)
    tone(48 + Math.random() * 20, 2.2, "sawtooth", 0.05);
}
// love tree
heartTree.children.slice(0, 5).forEach((c) => heartTree.remove(c));
{
  const p1 = M(0xff6f9f, {
      roughness: 0.45,
      emissive: 0x8a1a44,
      emissiveIntensity: 0.25,
    }),
    p2 = M(0xc2185b, {
      roughness: 0.5,
      emissive: 0x5a0a2a,
      emissiveIntensity: 0.4,
    });
  [-1, 1].forEach((s) => {
    const l = new THREE.Mesh(G.crown, p1);
    l.scale.set(0.55, 1.9, 0.8);
    l.position.set(s * 0.52, 1.9, 0);
    l.rotation.z = -s * 0.08;
    l.castShadow = true;
    heartTree.add(l);
  });
  const c = new THREE.Mesh(G.crown, p2);
  c.scale.set(0.2, 1.45, 0.55);
  c.position.set(0, 1.85, 0.28);
  heartTree.add(c);
  const b = new THREE.Mesh(G.crown, p1);
  b.scale.setScalar(0.2);
  b.position.set(0, 3.65, 0.15);
  heartTree.add(b);
  const ba = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.8, 0.5, 12),
    M(0x9a6a5a),
  );
  ba.position.y = 0.25;
  heartTree.add(ba);
}
// waterfall + secret bed
const WX = ENT[0] + 5.5,
  WZ = ENT[1] + 1.2,
  WR = Math.atan2(-WX, -WZ),
  wf = new THREE.Group(),
  fade = [],
  rm = M(0x6f6a72),
  rmf = M(0x6f6a72, { transparent: true });
fade.push(rmf);
const rk = (x, y, z, a, b, c, m) => {
  const r = new THREE.Mesh(G.rock, m || rm);
  r.position.set(x, y, z);
  r.scale.set(a, b, c);
  r.castShadow = true;
  wf.add(r);
};
for (let i = 0; i < 7; i++) {
  rk(-3 + i, 1.1, -3.3, 0.9, 1.4 + hs(i, 1, 9) * 0.4, 0.9);
  rk(-3 + i, 3, -3.2, 0.9, 1.1, 0.9);
}
[-1, 1].forEach((s) =>
  [-2.4, -0.6, 1.2].forEach((z) =>
    [0.9, 2.4].forEach((y) => rk(s * 3.1, y, z, 0.9, 1.3, 0.9)),
  ),
);
rk(0, 3.7, -0.9, 3.4, 0.6, 2.5, rmf);
rk(0, 5.3, -1.4, 3.2, 1.3, 1.8, rmf);
rk(-2, 5, -0.2, 1.2, 1.1, 1.2, rmf);
rk(2, 5, -0.2, 1.2, 1.1, 1.2, rmf);
rk(0, 6.3, 0.9, 1.6, 0.5, 0.9);
const wc = document.createElement("canvas");
wc.width = 64;
wc.height = 256;
{
  const g = wc.getContext("2d");
  g.fillStyle = "#9fdcff";
  g.fillRect(0, 0, 64, 256);
  for (let i = 0; i < 40; i++) {
    g.fillStyle = "rgba(255,255,255," + (0.3 + Math.random() * 0.5) + ")";
    g.fillRect(
      Math.random() * 60,
      Math.random() * 256,
      2 + Math.random() * 3,
      20 + Math.random() * 60,
    );
  }
}
const wt = new THREE.CanvasTexture(wc);
wt.wrapS = wt.wrapT = THREE.RepeatWrapping;
wt.repeat.set(2, 2);
const fp = new THREE.Mesh(
  new THREE.PlaneGeometry(3.6, 6.1),
  new THREE.MeshBasicMaterial({
    map: wt,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false,
  }),
);
fp.position.set(0, 3.4, 1.5);
wf.add(fp);
const pool = new THREE.Mesh(
  new THREE.CylinderGeometry(2.4, 2.4, 0.08, 20),
  M(0x7fd4f0, { transparent: true, opacity: 0.7, roughness: 0.2 }),
);
pool.position.set(0, 0.12, 2.7);
wf.add(pool);
const bd = new THREE.Group();
bd.position.set(0, 0, -1.1);
wf.add(bd);
const bx2 = (w, h, d, c, x, y, z) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M(c));
  m.position.set(x, y, z);
  m.castShadow = true;
  bd.add(m);
};
bx2(1.9, 0.3, 2.4, 0x4a2a22, 0, 0.25, 0);
bx2(1.75, 0.24, 2.25, 0xfff0f4, 0, 0.5, 0);
bx2(1.78, 0.1, 1.35, 0xb0123c, 0, 0.67, 0.45);
bx2(0.7, 0.16, 0.4, 0xffffff, -0.4, 0.68, -0.85);
bx2(0.7, 0.16, 0.4, 0xffffff, 0.4, 0.68, -0.85);
bx2(2, 1.2, 0.14, 0x4a2a22, 0, 0.85, -1.25);
for (let i = 0; i < 36; i++) {
  const p = new THREE.Mesh(G.crown, M(0xff2a5a));
  p.scale.set(0.09, 0.02, 0.06);
  const on = i < 12,
    an = i * 2.4;
  p.position.set(
    on ? (hs(i, 5, 5) - 0.5) * 1.5 : Math.cos(an) * (1.4 + hs(i, 6, 6)),
    on ? 0.67 : 0.06,
    on ? (hs(i, 7, 7) - 0.5) * 2 : Math.sin(an) * (1.4 + hs(i, 6, 6)),
  );
  p.rotation.y = i;
  bd.add(p);
}
[
  [-1.4, -0.4],
  [1.4, -0.4],
  [-1.4, -1.9],
  [1.4, -1.9],
  [0, 0.6],
].forEach(([x, z]) => {
  const c = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.3, 8),
      M(0xfff4dc),
    ),
    f = new THREE.Mesh(G.crown, EM(0xffb84a, 2));
  c.position.set(x, 0.15, z);
  f.scale.set(0.05, 0.1, 0.05);
  f.position.set(x, 0.38, z);
  wf.add(c, f);
});
const wl = new THREE.PointLight(0xff8a70, 1.4, 9);
wl.position.set(0, 1.6, -1.2);
wf.add(wl);
hitSph(wf, 2.5, 1.5);
const bp = [WX - Math.sin(WR) * 1.1, WZ - Math.cos(WR) * 1.1];
items
  .filter(
    (i) =>
      (i.kind === "tree" || i.kind === "rock" || i.kind === "bush") &&
      Math.hypot(i.x - WX, i.z - WZ) < 5,
  )
  .forEach((i) => {
    IG.remove(i.root);
    items.splice(items.indexOf(i), 1);
  });
addItem({
  id: "bed",
  kind: "bed",
  x: bp[0],
  z: bp[1],
  r: 0,
  reach: 1.8,
  root: place(wf, WX, WZ, gh(bp[0], bp[1]) - 0.05),
  hint: "🛏️ A secret hideaway behind the waterfall…",
});
wf.rotation.y = WR;
const BEDL = [
  "Close your eyes. Tell me exactly where you want my hands first. 🕯️",
  "The waterfall hides us from the whole world. Whisper what you have been dying to say.",
  "Slowly undress me with your eyes, then tell me what you see.",
  "Take your time tonight. Kiss me like we have nowhere else to be. 💋",
  "Tell me your favorite thing I do to you.",
];
function exBed() {
  EXF.bed = 1;
  const l = BEDL[Math.floor(Math.random() * BEDL.length)];
  showModal(
    `${X}<h2>🕯️ The secret hideaway</h2><p>Candles flicker behind the curtain of water. Rose petals on red silk. The whole world is on the other side of the waterfall… and it is just the two of you.</p><p style="font-size:17px"><i>${l}</i></p><button id="lb" class="on">Lie down together 💞</button><button id="nx">Another whisper 💋</button>`,
  );
  $("#x").onclick = closeModal;
  $("#nx").onclick = exBed;
  $("#lb").onclick = () => {
    closeModal();
    burst(me3.x, 1.5, me3.z, 0xff5a8a, 30, 2, 3);
    jingle([392, 494, 587, 784]);
    toast("💞 You melt into the silk…");
  };
}
// converter
function exConv() {
  const i = inv();
  if ((i.trash || 0) < 3)
    return toast(
      "The converter needs 3 🗑️ trash (you have " + (i.trash || 0) + ")",
    );
  saveMe({ inv: give(pay(i, { trash: 3 }), { plastic: 1 }) });
  EXF.conv = 1;
  tone(180, 0.3, "sawtooth", 0.1);
  burst(me3.x, 1.5, me3.z, 0x3fa7e0, 14, 2, 3);
  toast("♻️ 3 🗑️ → 1 🔷 plastic block");
}
// interactions
function exInt(it) {
  const k = it.kind;
  if (k === "trash") {
    IG.remove(it.root);
    items.splice(items.indexOf(it), 1);
    trashLeft--;
    addInv({ trash: 1 }, "+1 🗑️ (" + trashLeft + " left)");
    burst(it.x, 0.6, it.z, 0xbbbbbb, 8, 1.5, 2);
    tone(300, 0.08, "square", 0.08);
    if (!trashLeft) toast("🎉 The island is trash-free!");
    return true;
  }
  if (k === "crab") {
    c0 = it;
    IG.remove(it.root);
    it.gone = true;
    it.r = 0;
    items.splice(items.indexOf(it), 1);
    setTimeout(() => {
      it.gone = false;
      IG.add(it.root);
      items.push(it);
    }, 20000);
    burst(it.x, 0.4, it.z, 0xe0452e, 8, 1.2, 2);
    addInv({ crab: 1 }, "+1 🦀 caught a crab!");
    tone(900, 0.08, "triangle", 0.08);
    return true;
  }
  if (k === "fish") {
    exFish();
    return true;
  }
  if (k === "bed") {
    exBed();
    return true;
  }
  return false;
}
let c0;
// tab log
function toggleTab() {
  if (!ready) return;
  if (modalOpen) {
    if ($("#tabroot")) closeModal();
    return;
  }
  openTab();
}
function openTab() {
  const d = new Date(now()),
    h = d.getHours() + d.getMinutes() / 60,
    hh =
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0"),
    ph =
      h < 5
        ? "🌙 Night"
        : h < 7
          ? "🌅 Dawn"
          : h < 17
            ? "☀️ Day"
            : h < 20
              ? "🌇 Dusk"
              : "🌙 Night",
    i = inv(),
    B = (k) => (blockIds[k] || []).length;
  const ob = [
    [`Pick up trash 🗑️ (${TR0 - trashLeft}/${TR0})`, !trashLeft],
    ["Build a Trash Converter 🏭", B("converter") > 0],
    ["Turn trash into a plastic block 🔷", !!EXF.conv],
    [
      "Build a Generator ⚡ and an Air Purifier ♻️",
      B("generator") > 0 && B("purifier") > 0,
    ],
    ["Catch a fish 🎣", !!EXF.fish],
    ["Brave the cave 🕳️", !!EXF.cave],
    [`Feed the Love Tree 💞 (${gave()}/3000 🪙)`, gave() >= 3000],
  ];
  showModal(`<div id="tabroot">${X}<h2>📋 Island Log</h2><div class="mute">🕒 ${hh} · ${ph} · Air quality ${Math.round((1 - pollution) * 100)}%</div><canvas id="mp" width="300" height="300" style="width:100%;max-width:300px;border-radius:16px;margin:8px 0"></canvas>
 <h3 style="margin:8px 0 2px">Objectives</h3>${ob.map((o) => `<div class="it">${o[1] ? "✅" : "⬜"} ${o[0]}</div>`).join("")}<div class="it mute">${esc(hintText())}</div>
 <h3 style="margin:12px 0 2px">Crafting</h3>${RC.map((r) => `<div class="it">${can(i, r[2]) && gold() >= r[4] ? "✅" : "⬜"} <b>${r[0]}</b> <span class="mute">${r[1]}</span></div>`).join("")}
 <h3 style="margin:12px 0 6px">Us 💕</h3><img src="data:image/jpeg;base64,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" style="width:100%;border-radius:10px;border:7px solid #fff;box-shadow:0 4px 14px rgba(0,0,0,.3)"></div>`);
  $("#x").onclick = closeModal;
  const c = $("#mp").getContext("2d"),
    S = 3.4,
    P2 = (x, z) => [150 + x * S, 150 + z * S];
  c.fillStyle = "#4aa8e6";
  c.fillRect(0, 0, 300, 300);
  [
    [33, "#f1d99a"],
    [28, "#7fd25c"],
  ].forEach(([r, col]) => {
    c.fillStyle = col;
    c.beginPath();
    c.arc(150, 150, r * S, 0, 6.283);
    c.fill();
  });
  c.font = "17px serif";
  c.textAlign = "center";
  c.textBaseline = "middle";
  [
    ["💗", 0, -10],
    ["🌸", 0, -1],
    ["🔨", -6, 5],
    ["✉️", 7, 6],
    ["💧", -11, 7],
    ["⛵", BOATP[0], BOATP[1]],
    ["🕳️", ENT[0], ENT[1]],
    ["💦", WX, WZ],
    ["🎣", FS[0], FS[1]],
  ].forEach(([e, x, z]) => {
    const p = P2(x, z);
    c.fillText(e, p[0], p[1]);
  });
  if (!inCave) {
    const p = P2(me3.x, me3.z);
    c.fillText("📍", p[0], p[1] - 8);
  } else {
    c.fillStyle = "#fff";
    c.font = "12px sans-serif";
    c.fillText("You are in the cave…", 150, 290);
  }
}
addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      toggleTab();
    }
  },
  true,
);
$("#tabb").addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  toggleTab();
});
// per-frame
window.exTick = function (dt, t) {
  if (!ready) return;
  if (!EXF.intro) {
    EXF.intro = 1;
    setTimeout(
      () =>
        toast(
          "🤢 The island is a dump and the air stinks… press Tab for your log",
        ),
      2500,
    );
  }
  const eff = Math.min(
    (blockIds.purifier || []).length,
    (blockIds.generator || []).length * 2,
  );
  pollution +=
    (clamp(1 - AIRV - WXR * 0.08, 0, 1) - pollution) * Math.min(1, dt * 0.6);
  terrain.material.color.setRGB(
    1 - 0.38 * pollution,
    1 - 0.42 * pollution,
    1 - 0.62 * pollution,
  );
  if (pollution > 0.25 && Math.random() < dt * 6)
    burst(
      me3.x + (Math.random() - 0.5) * 14,
      0.5,
      me3.z + (Math.random() - 0.5) * 8,
      0x8a9a3a,
      1,
      0.3,
      0.6,
    );
  crabTick(dt);
  levTick(dt, t);
  caveTick(dt, t);
  wt.offset.y -= dt * 1.2;
  const nr = !inCave && Math.hypot(me3.x - bp[0], me3.z - bp[1]) < 3.2;
  fade.forEach((m) => {
    m.opacity += ((nr ? 0.1 : 1) - m.opacity) * Math.min(1, dt * 6);
  });
  htItem.r = 1.1;
  htItem.reach = 3.6;
};

// ===== v2 =====
const exTick1 = window.exTick,
  PHOTO =
    "data:image/jpeg;base64,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";
function nGeo(r, det, amp, seed, moss) {
  const g = new THREE.IcosahedronGeometry(r, det),
    p = g.attributes.position,
    c = new Float32Array(p.count * 3),
    k = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      y = p.getY(i),
      z = p.getZ(i),
      n = vn(
        (x * 1.3) / r + (z * 0.9) / r,
        (y * 1.5) / r + (z * 0.6) / r,
        seed,
      ),
      s = 1 + (n - 0.5) * 2 * amp;
    p.setXYZ(i, x * s, y * s, z * s);
  }
  g.computeVertexNormals();
  const nm = g.attributes.normal;
  for (let i = 0; i < p.count; i++) {
    const v = hs(p.getX(i) * 3, p.getZ(i) * 3, seed + 5);
    k.setHex(v > 0.5 ? 0x7a747c : 0x6a656e).lerp(
      new THREE.Color(0x4a4650),
      hs(p.getY(i) * 2, v, seed) * 0.6,
    );
    if (moss && nm.getY(i) > 0.45) k.lerp(new THREE.Color(0x5d8a3c), 0.75);
    c.set([k.r, k.g, k.b], i * 3);
  }
  g.setAttribute("color", new THREE.BufferAttribute(c, 3));
  return g;
}
const RG = [1, 2, 3, 4].map((s) => nGeo(1, 2, 0.32, s * 7, true)),
  RK = M(0xffffff, { vertexColors: true, roughness: 0.95 });
const mkR = (par, x, y, z, sx, sy, sz, i, mat) => {
  const m = new THREE.Mesh(RG[i % 4], mat || RK);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.rotation.set(0.3 * Math.sin(i), i * 2.3, 0.3 * Math.cos(i));
  m.castShadow = m.receiveShadow = true;
  par.add(m);
  return m;
};
const near = (x, z, r) =>
  items
    .filter(
      (i) =>
        (i.kind === "tree" || i.kind === "rock" || i.kind === "bush") &&
        Math.hypot(i.x - x, i.z - z) < r,
    )
    .forEach((i) => {
      IG.remove(i.root);
      items.splice(items.indexOf(i), 1);
    });
near(AX, AZ, 11);
near(CX0, CZ0, 10);
const shoreOut = (a) => {
  for (let r = 62; r > 24; r -= 0.2) {
    const x = Math.cos(a) * r,
      z = Math.sin(a) * r;
    if (gh(x, z) > 0.62) return [x, z];
  }
  return null;
};
// ---- waterfall on the hill (v4)
{
  wf.children
    .filter((c) => c.geometry === G.rock || RG.includes(c.geometry))
    .forEach((c) => wf.remove(c));
  fade.length = 0;
  const rm2 = M(0xffffff, {
    vertexColors: true,
    roughness: 0.95,
    transparent: true,
  });
  fade.push(rm2);
  const og = nGeo(1, 4, 0.16, 77, true),
    op = og.attributes.position;
  for (let i = 0; i < op.count; i++) if (op.getY(i) < 0) op.setY(i, 0);
  og.computeVertexNormals();
  const roof = new THREE.Mesh(og, rm2);
  roof.scale.set(5.8, 2.9, 5.4);
  roof.position.set(0, 3.1, -3.4);
  roof.castShadow = roof.receiveShadow = true;
  wf.add(roof);
  for (let i = 0; i < 12; i++) {
    const a = hs(i, 3, 8) * Math.PI * 2,
      d = 3.6 + hs(i, 4, 8) * 2.2,
      s = 0.7 + hs(i, 5, 8) * 0.9;
    mkR(
      wf,
      Math.cos(a) * d,
      0.2 + s * 0.2,
      Math.sin(a) * d * 1.1 + 1.2,
      s * 1.2,
      s,
      s * 1.1,
      i,
    );
  }
  fp.geometry = new THREE.PlaneGeometry(4.2, 3.7);
  fp.position.set(0, 1.95, 2.1);
  fp.material.opacity = 0.97;
  wt.repeat.set(2, 3);
  pool.material.transparent = false;
  pool.material.opacity = 1;
  wf.position.set(AX, AF, AZ);
  wf.rotation.y = Math.atan2(AO[0], AO[1]);
  bp[0] = AX - AO[0] * 1.1;
  bp[1] = AZ - AO[1] * 1.1;
  const bi = items.find((i) => i.kind === "bed");
  bi.x = bp[0];
  bi.z = bp[1];
}
const wfC = new THREE.Vector3();
const wt2 = wt.clone();
wt2.needsUpdate = true;
wt2.repeat.set(1, 1);
const wMat = new THREE.MeshBasicMaterial({
  map: wt2,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 1,
});
function ribbon(pts, wid, yo) {
  const n = pts.length,
    pos = new Float32Array(n * 6),
    uv = new Float32Array(n * 4),
    idx = [];
  let sx = 1,
    sz = 0,
    len = 0;
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)],
      b = pts[Math.min(n - 1, i + 1)],
      dx = b[0] - a[0],
      dz = b[2] - a[2],
      l = Math.hypot(dx, dz);
    if (l > 0.05) {
      sx = -dz / l;
      sz = dx / l;
    }
    const w = Array.isArray(wid) ? wid[i] : wid;
    if (i)
      len += Math.hypot(
        pts[i][0] - pts[i - 1][0],
        pts[i][1] - pts[i - 1][1],
        pts[i][2] - pts[i - 1][2],
      );
    pos.set(
      [
        pts[i][0] + sx * w,
        pts[i][1] + yo,
        pts[i][2] + sz * w,
        pts[i][0] - sx * w,
        pts[i][1] + yo,
        pts[i][2] - sz * w,
      ],
      i * 6,
    );
    uv.set([0, len * 0.25, 1, len * 0.25], i * 4);
    if (i < n - 1)
      idx.push(i * 2, i * 2 + 1, i * 2 + 2, i * 2 + 1, i * 2 + 3, i * 2 + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  const m = new THREE.Mesh(g, wMat);
  m.frustumCulled = false;
  scene.add(m);
}
// one continuous stream: hill top -> over the roof -> down the fall -> across the pool -> river -> pond
{
  const dY = (zl) =>
      AF +
      3.1 +
      2.9 * Math.sqrt(Math.max(0, 1 - Math.pow((zl + 3.4) / 5.4, 2))),
    W = (zl, y) => [AX + AO[0] * zl, y, AZ + AO[1] * zl],
    P = [],
    WD = [];
  fp.visible = false;
  for (let k = 8; k >= -2; k -= 0.5) {
    const zl = -k,
      x = AX + AO[0] * zl,
      z = AZ + AO[1] * zl;
    P.push([x, Math.max(gh(x, z), dY(zl)) + 0.1, z]);
    WD.push(1);
  }
  for (let i = 1; i <= 8; i++) {
    const t = i / 8;
    P.push(W(2 + 0.95 * t * t, AF + 3.2 - 3 * t));
    WD.push(1 + 0.7 * t);
  }
  for (let zl = 3.2; zl <= 4.6; zl += 0.4) {
    P.push(W(zl, AF + 0.24));
    WD.push(1.7 - (zl - 3.2) * 0.3);
  }
  const P0 = [AX + AO[0] * 4.6, AZ + AO[1] * 4.6];
  for (let i = 1; i <= 26; i++) {
    const u = i / 26,
      x =
        P0[0] +
        (PNX - P0[0]) * u +
        Math.sin(u * 9) * 0.9 * Math.sin(u * Math.PI),
      z = P0[1] + (PNZ - P0[1]) * u;
    P.push([x, gh(x, z) + 0.14, z]);
    WD.push(0.8);
  }
  ribbon(P, WD, 0);
}

// ---- cave mouth in the hill (v4)
{
  const oc = items.find((i) => i.kind === "cave");
  IG.remove(oc.root);
  items.splice(items.indexOf(oc), 1);
  const cg = new THREE.Group(),
    BD = [0x7a746c, 0x8d8378, 0x6a655f];
  const ag = new THREE.TorusGeometry(3.2, 0.95, 16, 36, Math.PI),
    ap = ag.attributes.position;
  ag.computeVertexNormals();
  const an = ag.attributes.normal,
    ac = new Float32Array(ap.count * 3),
    kc = new THREE.Color();
  for (let i = 0; i < ap.count; i++) {
    const x = ap.getX(i),
      y = ap.getY(i),
      z = ap.getZ(i),
      n = (vn(x * 0.7 + z * 0.4, y * 0.8, 88) - 0.5) * 0.9;
    ap.setXYZ(i, x + an.getX(i) * n, y + an.getY(i) * n, z + an.getZ(i) * n);
    kc.setHex(BD[((Math.floor((y + CF) * 1.7) % 3) + 3) % 3]).lerp(
      new THREE.Color(0x4a4650),
      hs(x * 3, z * 3, 89) * 0.5,
    );
    if (an.getY(i) > 0.5) kc.lerp(new THREE.Color(0x5d8a3c), 0.7);
    ac.set([kc.r, kc.g, kc.b], i * 3);
  }
  ag.setAttribute("color", new THREE.BufferAttribute(ac, 3));
  ag.computeVertexNormals();
  const arch = new THREE.Mesh(ag, RK);
  arch.position.set(0, CF, -2.2);
  arch.castShadow = arch.receiveShadow = true;
  cg.add(arch);
  const bk = new THREE.Mesh(
    new THREE.CircleGeometry(1, 24, 0, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0, side: THREE.DoubleSide }),
  );
  bk.scale.set(2.4, 2.4, 1);
  bk.position.set(0, CF, -2.35);
  cg.add(bk);
  [
    [-3.6, 0.5, 1.2],
    [3.7, 0.6, 1.4],
    [-2.4, 0.3, 0.9],
    [2.5, 0.3, 1],
  ].forEach(([x, y, s], i) =>
    mkR(cg, x, CF + y, -1.4 - (i % 2), s * 1.2, s, s, i + 9),
  );
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(G.crown, eyeM);
    e.scale.setScalar(0.07);
    e.position.set(s * 0.25, CF + 1.2, -2.3);
    cg.add(e);
  });
  cg.position.set(CX0, 0, CZ0);
  cg.rotation.y = Math.atan2(CO[0], CO[1]);
  ENT[0] = CX0 + CO[0] * 2;
  ENT[1] = CZ0 + CO[1] * 2;
  addItem({
    id: "cave",
    kind: "cave",
    x: ENT[0],
    z: ENT[1],
    r: 0,
    reach: 3.5,
    root: cg,
    hint: "🕳️ A dark cave in the hill… walk in or tap",
  });
}

// ---- cave interior
{
  caveG.children
    .filter((c) => c.geometry === G.rock || c === cvD)
    .forEach((c) => caveG.remove(c));
  const dg = nGeo(9.5, 3, 0.1, 31, false),
    pp = dg.attributes.position;
  for (let i = 0; i < pp.count; i++) if (pp.getY(i) < 0) pp.setY(i, 0);
  dg.computeVertexNormals();
  const dome = new THREE.Mesh(
    dg,
    M(0xb0a8c0, { vertexColors: true, side: THREE.BackSide, roughness: 1 }),
  );
  dome.position.y = 0.3;
  caveG.add(dome);
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * 6.283,
      r = 6.8 + hs(i, 8, 8) * 0.6;
    mkR(
      caveG,
      Math.cos(a) * r,
      i % 2 ? 0.9 : 2.3,
      Math.sin(a) * r,
      1.5 + hs(i, 9, 9),
      1.2 + hs(i, 1, 3) * 0.8,
      1.5,
      i,
    );
  }
  const stM = M(0x6a656e, { roughness: 0.9 });
  for (let i = 0; i < 36; i++) {
    const a = hs(i, 20, 1) * 6.283,
      r = Math.sqrt(hs(i, 21, 2)) * 5.3,
      h = 0.8 + hs(i, 22, 3) * 1.8,
      c = new THREE.Mesh(
        new THREE.ConeGeometry(0.12 + hs(i, 23, 4) * 0.22, h, 6),
        stM,
      );
    c.rotation.x = Math.PI;
    c.position.set(
      Math.cos(a) * r,
      0.3 + Math.sqrt(Math.max(0, 90 - r * r)) - h / 2 - 0.2,
      Math.sin(a) * r,
    );
    caveG.add(c);
  }
  for (let i = 0; i < 7; i++) {
    const a = i * 0.9 + 1,
      r = 2 + hs(i, 30, 1) * 3;
    mkR(
      caveG,
      Math.cos(a) * r,
      0.5,
      Math.sin(a) * r,
      0.35,
      0.6 + hs(i, 31, 1) * 0.8,
      0.35,
      i + 2,
    );
  }
  for (let i = 0; i < 5; i++) {
    const p = new THREE.Mesh(
        new THREE.CircleGeometry(0.5 + hs(i, 40, 1) * 0.7, 16),
        M(0x0a1830, { roughness: 0.05, metalness: 0.4 }),
      ),
      a = i * 1.3 + 0.5,
      r = 1.5 + hs(i, 41, 1) * 3;
    p.rotation.x = -Math.PI / 2;
    p.position.set(Math.cos(a) * r, 0.52, Math.sin(a) * r);
    caveG.add(p);
  }
  eyes.forEach((g) => {
    const a = Math.atan2(g.position.z, g.position.x);
    g.position.x = Math.cos(a) * 5;
    g.position.z = Math.sin(a) * 5;
  });
}
// ---- filthy trash piles, plastic bits, flies
for (let i = items.length; i--;)
  if (items[i].kind === "trash") {
    IG.remove(items[i].root);
    items.splice(i, 1);
  }
const piles = [],
  bagM = [0x1c1c20, 0xe6e6ea, 0x2a6aa8, 0x3d4a32],
  botM = M(0x6aa86a, { transparent: true, opacity: 0.75, roughness: 0.2 }),
  canM = M(0x9a9aa0, { metalness: 0.5, roughness: 0.4 }),
  slud = M(0x3a3820, { roughness: 0.3, metalness: 0.1 });
trashLeft = 0;
function pileMesh(n) {
  const g = new THREE.Group(),
    sl = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.04, 16), slud);
  sl.scale.set(0.9 + rnd() * 0.5, 1, 0.9 + rnd() * 0.5);
  sl.position.y = 0.03;
  sl.receiveShadow = true;
  g.add(sl);
  for (let k = 0; k < 4 + (n % 3); k++) {
    const m = M(bagM[(n + k) % 4], { roughness: 0.5 }),
      b = new THREE.Mesh(G.crown, m);
    b.scale.set(0.32 + rnd() * 0.2, 0.22 + rnd() * 0.12, 0.3 + rnd() * 0.2);
    b.position.set(
      (rnd() - 0.5) * 0.9,
      0.18 + rnd() * 0.15,
      (rnd() - 0.5) * 0.9,
    );
    b.rotation.y = rnd() * 6;
    b.castShadow = true;
    g.add(b);
    const kn = new THREE.Mesh(G.crown, m);
    kn.scale.setScalar(0.06);
    kn.position.set(b.position.x, b.position.y + b.scale.y * 0.9, b.position.z);
    g.add(kn);
  }
  for (let k = 0; k < 3; k++) {
    const o = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.35, 8),
      k ? canM : botM,
    );
    o.position.set((rnd() - 0.5) * 1.2, 0.12, (rnd() - 0.5) * 1.2);
    o.rotation.set(1.57, rnd() * 6, 0);
    o.castShadow = true;
    g.add(o);
  }
  if (n % 4 === 0) {
    const t = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.12, 8, 14),
      M(0x1a1a1a),
    );
    t.rotation.x = 1.4;
    t.position.set(0.3, 0.2, -0.2);
    t.castShadow = true;
    g.add(t);
  }
  hitSph(g, 0.9, 0.4);
  return g;
}
let nj = 0;
const BXg = new THREE.BoxGeometry(1, 1, 1),
  CYg = new THREE.CylinderGeometry(1, 1, 1, 12),
  TRg = new THREE.TorusGeometry(1, 0.3, 8, 16),
  mm = (geo, mat, x, y, z, sx, sy, sz) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    m.castShadow = true;
    return m;
  };
const JM = {
  rust: M(0x8a4a2a, { roughness: 0.9 }),
  dark: M(0x1c1c1e),
  ooze: M(0x3f6a1a, {
    emissive: 0x2a5a10,
    emissiveIntensity: 0.5,
    roughness: 0.2,
  }),
  oil: M(0x08080c, { roughness: 0.05, metalness: 0.7 }),
  sheen: M(0x2a1a4a, {
    emissive: 0x301860,
    emissiveIntensity: 0.5,
    roughness: 0.1,
  }),
  fr: M(0xc8cbc6, { roughness: 0.6 }),
  tv: M(0x2a2a2e),
  scr: M(0x1a3a4a, { emissive: 0x0a2030, emissiveIntensity: 0.4 }),
  mat: M(0xcfc3a4),
  stain: M(0x6a5a30),
  fsh: M(0x9aa5a8, { roughness: 0.4 }),
  dead: M(0x4a3f38),
};
const JD = {
  pile: {
    n: "Filthy trash pile",
    h: 1,
    g: { trash: 2 },
    f: 1,
    b: () => pileMesh(nj),
  },
  tires: {
    n: "Tire stack",
    h: 2,
    g: { trash: 3 },
    b: () => {
      const g = new THREE.Group();
      for (let k = 0; k < 3; k++) {
        const t = mm(
          TRg,
          JM.dark,
          (rnd() - 0.5) * 0.1,
          0.18 + k * 0.3,
          (rnd() - 0.5) * 0.1,
          0.6,
          0.6,
          0.6,
        );
        t.rotation.x = Math.PI / 2;
        g.add(t);
      }
      hitSph(g, 0.9, 0.5);
      return g;
    },
  },
  barrel: {
    n: "Leaking toxic barrel",
    h: 2,
    g: { trash: 1 },
    gold: 8,
    f: 1,
    b: () => {
      const g = new THREE.Group();
      g.add(mm(CYg, JM.ooze, 0.4, 0.02, 0.2, 1.1, 0.02, 0.9));
      const b = mm(CYg, JM.rust, 0, 0.5, 0, 0.4, 0.5, 0.4);
      b.rotation.z = 0.15;
      g.add(b);
      [0.2, 0.8].forEach((y) =>
        g.add(mm(CYg, JM.dark, 0, y, 0, 0.42, 0.04, 0.42)),
      );
      hitSph(g, 0.8, 0.5);
      return g;
    },
  },
  oil: {
    n: "Oil slick",
    h: 3,
    gold: 10,
    b: () => {
      const g = new THREE.Group();
      g.add(
        mm(CYg, JM.oil, 0, 0.03, 0, 1.5, 0.02, 1.1),
        mm(CYg, JM.sheen, 0.2, 0.045, 0.1, 0.8, 0.01, 0.5),
      );
      hitSph(g, 1, 0.2);
      return g;
    },
  },
  fridge: {
    n: "Rotten fridge",
    h: 2,
    g: { brick: 2 },
    f: 1,
    b: () => {
      const g = new THREE.Group(),
        f = mm(BXg, JM.fr, 0, 0.85, 0, 0.8, 1.7, 0.8),
        lay = hs(nj, 1, 1) > 0.5;
      f.rotation.z = lay ? 1.45 : 0.12;
      if (lay) f.position.y = 0.4;
      g.add(f, mm(CYg, JM.stain, 0, 0.03, 0, 0.9, 0.02, 0.8));
      if (!lay) g.add(mm(BXg, JM.dark, 0.25, 0.95, 0.42, 0.05, 0.5, 0.05));
      hitSph(g, 1, 0.6);
      return g;
    },
  },
  tv: {
    n: "Broken TV",
    h: 2,
    g: { glass: 1, brick: 1 },
    b: () => {
      const g = new THREE.Group(),
        b = mm(BXg, JM.tv, 0, 0.4, 0, 0.9, 0.7, 0.7),
        s = mm(BXg, JM.scr, 0, 0.4, 0.36, 0.7, 0.5, 0.02);
      b.rotation.z = s.rotation.z = 0.18;
      g.add(b, s);
      [-0.2, 0.2].forEach((x) => {
        const a = mm(CYg, JM.dark, x, 0.95, 0, 0.02, 0.35, 0.02);
        a.rotation.z = x * 2;
        g.add(a);
      });
      hitSph(g, 0.9, 0.5);
      return g;
    },
  },
  mattress: {
    n: "Stained mattress",
    h: 2,
    g: { thatch: 2 },
    f: 1,
    b: () => {
      const g = new THREE.Group();
      g.add(
        mm(BXg, JM.mat, 0, 0.15, 0, 1.7, 0.24, 1),
        mm(CYg, JM.stain, 0.3, 0.29, 0.1, 0.3, 0.01, 0.25),
        mm(CYg, JM.stain, -0.4, 0.29, -0.2, 0.2, 0.01, 0.18),
      );
      hitSph(g, 1, 0.3);
      return g;
    },
  },
  fish: {
    n: "Dead fish",
    h: 1,
    gold: 3,
    f: 1,
    b: () => {
      const g = new THREE.Group(),
        t = mm(
          new THREE.ConeGeometry(0.1, 0.22, 3),
          JM.fsh,
          -0.42,
          0.08,
          0,
          1,
          1,
          1,
        );
      t.rotation.z = 1.57;
      g.add(
        mm(G.crown, JM.fsh, 0, 0.08, 0, 0.38, 0.09, 0.13),
        t,
        mm(G.crown, M(0xffffff), 0.28, 0.14, 0.07, 0.03, 0.03, 0.03),
      );
      hitSph(g, 0.5, 0.1);
      return g;
    },
  },
  deadtree: {
    n: "Dead tree",
    h: 3,
    g: { wood: 3 },
    b: () => {
      const g = new THREE.Group();
      g.add(
        mm(
          new THREE.CylinderGeometry(0.08, 0.22, 2.4, 7),
          JM.dead,
          0,
          1.2,
          0,
          1,
          1,
          1,
        ),
      );
      [
        [0.5, 1.8, 0.6],
        [-0.5, 1.5, -0.8],
        [0.2, 2.2, -0.5],
        [-0.3, 2, 0.9],
      ].forEach(([x, y, r], i) => {
        const b = mm(
          new THREE.CylinderGeometry(0.02, 0.06, 1, 5),
          JM.dead,
          x * 0.5,
          y,
          0,
          1,
          1,
          1,
        );
        b.rotation.z = r * (i % 2 ? 1 : -1);
        g.add(b);
      });
      hitSph(g, 1, 1);
      return g;
    },
  },
};
function addJunk(k, x, z, y) {
  const d = JD[k],
    g = d.b(),
    T = new THREE.Group(),
    R = new THREE.Group();
  T.add(g);
  R.add(T);
  grnd(g, T, R, x, z, y);
  const it = addItem({
    id: "jk" + nj,
    kind: "trash",
    pile: 1,
    junk: k,
    hp: d.h,
    x,
    z,
    r: 0,
    reach: 2,
    root: R,
    hint: "🗑️ " + d.n + ": tap to clear it",
  });
  nj++;
  trashLeft++;
  if (d.f) piles.push(it);
  return it;
}
function exInt3(it) {
  if (!it.junk) return false;
  const d = JD[it.junk];
  it.hp--;
  it.shake = 0.4;
  burst(it.x, 0.6, it.z, 0x6a6a40, 7, 1.3, 1.6);
  tone(240, 0.08, "square", 0.08);
  if (it.hp > 0) {
    toast("Clearing it… " + it.hp + " more");
    return true;
  }
  it.dead = 1;
  X6.clr.push(it.id);
  sv6();
  IG.remove(it.root);
  items.splice(items.indexOf(it), 1);
  trashLeft--;
  if (d.g)
    addInv(
      d.g,
      Object.entries(d.g)
        .map(([k, v]) => "+" + v + " " + NM[k])
        .join(" "),
    );
  if (d.gold) award(d.gold);
  jingle([440, 587]);
  if (!trashLeft) toast("🎉 The island is spotless!");
  return true;
}
const SITE = [
  "pile",
  "pile",
  "tires",
  "fridge",
  "tv",
  "mattress",
  "barrel",
  "oil",
  "pile",
];
for (let s = 0, tr = 0; s < 7 && tr < 400; tr++) {
  const a = rnd() * 6.283,
    d = 9 + rnd() * 28,
    cx = Math.cos(a) * d,
    cz = Math.sin(a) * d;
  if (gh(cx, cz) < 0.9 || Math.hypot(cx - HX, cz - HZ) < 14 || !free(cx, cz, 3))
    continue;
  s++;
  for (let k = 0, m = 5 + Math.floor(rnd() * 4); k < m; k++) {
    const x = cx + (rnd() - 0.5) * 7,
      z = cz + (rnd() - 0.5) * 7;
    if (gh(x, z) < 0.8 || Math.hypot(x - HX, z - HZ) < 12) continue;
    addJunk(SITE[Math.floor(rnd() * SITE.length)], x, z);
  }
}
for (let n = 0, tr = 0; n < 16 && tr < 600; tr++) {
  const a = rnd() * 6.283,
    d = 6 + rnd() * 32,
    x = Math.cos(a) * d,
    z = Math.sin(a) * d;
  if (gh(x, z) < 0.8 || !free(x, z, 1) || Math.hypot(x - HX, z - HZ) < 12)
    continue;
  n++;
  addJunk(["pile", "oil", "deadtree", "barrel"][n % 4], x, z);
}
for (let n = 0; n < 24; n++) {
  const a0 = rnd() * 6.283;
  if (Math.abs(a0 - 1.55) < 0.2) continue;
  const sp = shoreOut(a0);
  if (!sp) continue;
  const a = Math.atan2(sp[1], sp[0]),
    x = sp[0] - Math.cos(a) * (0.5 + rnd() * 1.5),
    z = sp[1] - Math.sin(a) * (0.5 + rnd() * 1.5);
  if (Math.hypot(x - HX, z - HZ) < 14) continue;
  addJunk(n % 3 ? "fish" : "pile", x, z, Math.max(gh(x, z), SEA) + 0.02);
}
TR0 = trashLeft;

const PLN = 360,
  plast = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.14, 0.04, 0.09),
    M(0xffffff),
    PLN,
  ),
  pmx = new THREE.Matrix4(),
  pq = new THREE.Quaternion(),
  pe = new THREE.Euler(),
  pc2 = new THREE.Color();
for (let i = 0, n = 0; i < 4000 && n < PLN; i++) {
  const a = hs(i, 50, 1) * 6.283,
    d = Math.sqrt(hs(i, 51, 2)) * 34,
    x = Math.cos(a) * d,
    z = Math.sin(a) * d,
    h = gh(x, z);
  if (h < 0.35 || Math.hypot(x - HX, z - HZ) < 6) continue;
  pe.set(0, hs(i, 52, 3) * 6, 0);
  pq.setFromEuler(pe);
  pmx.compose(
    new THREE.Vector3(x, h + 0.02, z),
    pq,
    new THREE.Vector3(1, 1, 1),
  );
  plast.setMatrixAt(n, pmx);
  pc2.setHex([0xe8e8e8, 0x4aa8e6, 0xd04040, 0xe8c02a, 0x3a8a4a][n % 5]);
  plast.setColorAt(n++, pc2);
}
plast.frustumCulled = false;
scene.add(plast);
const FL = 150,
  flp = new Float32Array(FL * 3),
  flg = new THREE.BufferGeometry();
flg.setAttribute("position", new THREE.BufferAttribute(flp, 3));
const flies = new THREE.Points(
  flg,
  new THREE.PointsMaterial({
    color: 0x151515,
    size: 0.13,
    map: new THREE.CanvasTexture(dotC),
    transparent: true,
    alphaTest: 0.3,
    depthWrite: false,
  }),
);
flies.frustumCulled = false;
scene.add(flies);
function flyTick(t) {
  const al = piles.filter((p) => !p.dead),
    n = al.length ? Math.floor(FL * clamp(pollution * 1.1, 0, 1)) : 0;
  for (let i = 0; i < n; i++) {
    const p = al[i % al.length];
    flp[i * 3] = p.x + Math.sin(t * (5 + (i % 4)) + i * 2.3) * 0.7;
    flp[i * 3 + 1] = 0.5 + Math.abs(Math.sin(t * (3 + (i % 3)) + i)) * 0.9;
    flp[i * 3 + 2] = p.z + Math.cos(t * (6 + (i % 3)) + i * 1.7) * 0.7;
  }
  flg.setDrawRange(0, n);
  flg.attributes.position.needsUpdate = true;
}
// ---- purifier parts
const PP = [
  [
    "filter",
    "🧽 Air filter",
    () => shoreOut(0.35) || [28, 8],
    "Washed up on the beach",
  ],
  ["fan", "🌀 Fan motor", () => [CVX - 2.4, CVZ - 2.2], "Deep in the cave"],
  [
    "circuit",
    "🔌 Circuit board",
    () => [BOATP[0] * 0.78 + 2, BOATP[1] * 0.78],
    "Near the wrecked boat",
  ],
];
PP.forEach(([k, nm, at, w]) => {
  const p = at(),
    g = new THREE.Group(),
    c = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), EM(0x6fe3c1, 1.4)),
    r = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.05, 8, 20),
      EM(0xfff2a0, 1.1),
    );
  c.position.y = 0.7;
  r.position.y = 0.7;
  r.rotation.x = Math.PI / 2;
  g.add(c, r);
  hitSph(g, 0.9, 0.6);
  addItem({
    id: "pp" + k,
    kind: "pp",
    k,
    nm,
    x: p[0],
    z: p[1],
    r: 0,
    reach: 2.2,
    root: place(
      g,
      p[0],
      p[1],
      p[0] > 200 ? 0.5 : Math.max(gh(p[0], p[1]), SEA) + 0.05,
    ),
    hint: "✨ " + nm + ": tap to pick up",
  });
});
{
  const pr = RC.find((r) => r[0] === "Purifier");
  pr[1] =
    "3🧱 + 2🪟 + 🧽 + 🌀 + 🔌 → 1♻️ (needs ⚡ and 3 parts found on the island)";
  pr[2] = { brick: 3, glass: 2, filter: 1, fan: 1, circuit: 1 };
}
Object.assign(NM, { filter: "🧽", fan: "🌀", circuit: "🔌" });
// ---- boat made easy
{
  const ms = [
    { plank: 3 },
    { plank: 2, thatch: 2 },
    { plank: 3, brick: 2 },
    { thatch: 3, plank: 2 },
    { glass: 2, plank: 2 },
    { plank: 4 },
    { lantern: 1, plank: 2 },
    { plank: 3, thatch: 2 },
  ];
  CHP.forEach((c, i) => {
    c.d = 0;
    c.r = {};
    c.m = ms[i];
  });
}
// ---- love tree
heartTree.children.slice(0, 5).forEach((c) => heartTree.remove(c));
{
  const o = M(0xf2a7a0, {
      roughness: 0.55,
      emissive: 0x8a2a30,
      emissiveIntensity: 0.15,
    }),
    i2 = M(0xe0607f, {
      roughness: 0.4,
      emissive: 0x8a1a44,
      emissiveIntensity: 0.3,
    }),
    dk = M(0x6a1030, { roughness: 0.6 }),
    add = (m, x, y, z, sx, sy, sz, rz) => {
      const e = new THREE.Mesh(G.crown, m);
      e.position.set(x, y, z);
      e.scale.set(sx, sy, sz);
      e.rotation.z = rz || 0;
      e.castShadow = true;
      heartTree.add(e);
    };
  add(dk, 0, 1.9, 0.25, 0.2, 1.5, 0.5);
  add(i2, -0.34, 1.9, 0.38, 0.24, 1.45, 0.42, -0.05);
  add(i2, 0.34, 1.9, 0.38, 0.24, 1.45, 0.42, 0.05);
  add(o, -0.62, 1.9, 0, 0.6, 2, 0.8, -0.13);
  add(o, 0.62, 1.9, 0, 0.6, 2, 0.8, 0.13);
  add(o, 0, 3.75, 0.25, 0.42, 0.38, 0.4);
  add(i2, 0, 3.38, 0.5, 0.12, 0.14, 0.14);
  add(M(0x7a6a52), 0, 0.3, 0, 1.3, 0.35, 1, 0);
}
// ---- fishing pier on the real sea
const sp0 = shoreOut(1.55) || shoreOut(1.2),
  DK = { x: sp0[0], z: sp0[1], fa: Math.atan2(sp0[1], sp0[0]) },
  dc = Math.cos(DK.fa),
  ds2 = Math.sin(DK.fa);
function exDock(x, z) {
  const a = (x - DK.x) * dc + (z - DK.z) * ds2,
    s = -(x - DK.x) * ds2 + (z - DK.z) * dc;
  return a > -0.3 && a < 7.7 && Math.abs(s) < 0.8;
}
{
  const oi = items.find((i) => i.id === "fish");
  IG.remove(oi.root);
  items.splice(items.indexOf(oi), 1);
  const g = new THREE.Group(),
    wd = [0xb5835a, 0xa87550, 0x9a6a48, 0xc4905f];
  for (let i = 0; i < 15; i++) {
    const p = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.09, 0.42),
      M(wd[i % 4]),
    );
    p.position.set((hs(i, 1, 1) - 0.5) * 0.04, 0.85, i * 0.5);
    p.rotation.y = (hs(i, 2, 2) - 0.5) * 0.04;
    p.castShadow = p.receiveShadow = true;
    g.add(p);
  }
  for (let i = 0; i < 5; i++)
    [-0.7, 0.7].forEach((x) => {
      const l = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.1, 2.3, 7),
        M(0x5a3d26),
      );
      l.position.set(x, -0.2, i * 1.65 + 0.3);
      l.castShadow = true;
      g.add(l);
    });
  [-1, 1].forEach((s) => {
    [0, 2.5, 5, 7].forEach((z) => {
      const r = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 6),
        M(0x6e4a2e),
      );
      r.position.set(s * 0.72, 1.3, z);
      g.add(r);
    });
    const rl = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 7),
      M(0x8a5a3a),
    );
    rl.position.set(s * 0.72, 1.6, 3.5);
    g.add(rl);
  });
  const bk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.17, 0.32, 10),
    M(0x3a78b8),
  );
  bk.position.set(-0.45, 1.05, 5.6);
  g.add(bk);
  const cr = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), M(0x9a6a40));
  cr.position.set(0.45, 1.1, 5.4);
  g.add(cr);
  const lp = new THREE.Mesh(G.crown, EM(0xffe6a0, 1));
  lp.scale.setScalar(0.14);
  lp.position.set(0.72, 2, 7);
  g.add(lp);
  hitSph(g, 2, 1.3);
  g.position.set(DK.x, 0, DK.z);
  g.rotation.y = Math.atan2(dc, ds2);
  addItem({
    id: "fish",
    kind: "fish",
    x: DK.x + dc * 6.3,
    z: DK.z + ds2 * 6.3,
    r: 0,
    reach: 2.6,
    root: g,
    hint: "🎣 Fishing pier: tap to fish",
  });
}
const bo = [DK.x + dc * 10.2, DK.z + ds2 * 10.2],
  tip = [DK.x + dc * 7, DK.z + ds2 * 7],
  bobber = new THREE.Group(),
  bline = new THREE.Line(
    new THREE.BufferGeometry().setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(6), 3),
    ),
    new THREE.LineBasicMaterial({ color: 0xffffff }),
  );
{
  const a = new THREE.Mesh(G.crown, M(0xe03030)),
    b = new THREE.Mesh(G.crown, M(0xffffff));
  a.scale.setScalar(0.13);
  b.scale.set(0.1, 0.07, 0.1);
  b.position.y = 0.1;
  bobber.add(a, b);
}
bobber.visible = bline.visible = false;
bline.frustumCulled = false;
scene.add(bobber, bline);
const fp2 = document.createElement("div");
fp2.style.cssText =
  "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(env(safe-area-inset-bottom,0px) + 84px);background:var(--glass);border-radius:18px;padding:12px 16px;box-shadow:0 4px 16px rgba(0,0,0,.25);display:none;text-align:center;z-index:4;font-weight:700;min-width:240px;color:var(--ink)";
document.body.appendChild(fp2);
let fst = 0,
  fOn = false;
function fpR(m, b) {
  fp2.innerHTML = `<div style="margin-bottom:8px">${m}</div><button id="fpb" style="font:inherit;font-weight:800;border:0;border-radius:14px;padding:10px 18px;background:var(--pink);color:#fff;cursor:pointer">${b}</button> <button id="fpx" style="font:inherit;border:2px solid var(--line);border-radius:14px;padding:8px 12px;background:var(--card);color:var(--ink);cursor:pointer">✕</button>`;
  $("#fpb").onclick = fishClick;
  $("#fpx").onclick = closeFish;
}
function closeFish() {
  fOn = false;
  fst = 0;
  clearTimeout(fT);
  fp2.style.display = "none";
}
function exFish() {
  fOn = true;
  fst = 0;
  fp2.style.display = "block";
  fpR("Tap Cast to throw your line into the sea.", "Cast 🎣");
}
function fishClick() {
  if (fst === 1) return;
  if (fst === 0) {
    fst = 1;
    fpR("Waiting… watch the bobber 🌊", "…");
    fT = setTimeout(
      () => {
        if (!fOn) return;
        fst = 2;
        EXF.casts = (EXF.casts || 0) + 1;
        const big = EXF.casts >= 5 || Math.random() < 0.1;
        if (big) EXF.casts = 0;
        fp2.dataset.big = big ? 1 : 0;
        burst(bo[0], SEA + 0.1, bo[1], 0xffffff, 10, 1.5, 2.5);
        fpR(
          big ? "😨 Something HUGE is pulling… REEL!" : "🐟 A bite! REEL!",
          "Reel!",
        );
        fT = setTimeout(
          () => {
            if (!fOn) return;
            fst = 0;
            fpR("It got away… 😅", "Cast again 🎣");
          },
          big ? 1000 : 1400,
        );
      },
      1500 + Math.random() * 3500,
    );
    return;
  }
  clearTimeout(fT);
  fst = 0;
  if (fp2.dataset.big === "1") {
    levEgg();
    return;
  }
  catchFish();
}
// ---- interactions
function exInt2(it) {
  if (it.kind === "trash" && it.pile && !it.junk) {
    it.dead = 1;
    IG.remove(it.root);
    items.splice(items.indexOf(it), 1);
    trashLeft--;
    addInv({ trash: 2 }, "+2 🗑️ (" + trashLeft + " piles left)");
    burst(it.x, 0.6, it.z, 0x6a6a40, 12, 1.5, 2);
    tone(260, 0.1, "square", 0.08);
    if (!trashLeft) toast("🎉 The island is trash-free!");
    return true;
  }
  if (it.kind === "pp") {
    IG.remove(it.root);
    items.splice(items.indexOf(it), 1);
    EXF["pp_" + it.k] = 1;
    addInv({ [it.k]: 1 }, "Found: " + it.nm + "!");
    jingle([523, 659, 784]);
    burst(it.x, 1, it.z, 0x6fe3c1, 16, 2, 3);
    return true;
  }
  return false;
}
// ---- Tab log
let tabSel = 0;
function drawMap() {
  const c = $("#mp").getContext("2d"),
    N = 200,
    im = c.createImageData(N, N),
    W = 136;
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const x = (i / N - 0.5) * W,
        z = (j / N - 0.5) * W,
        h = gh(x, z),
        s = (gh(x - 0.8, z - 0.8) - gh(x + 0.8, z + 0.8)) * 0.09;
      let r, g, b;
      if (h < SEA) {
        const d = clamp((SEA - h) / 1.2, 0, 1);
        r = 95 - 60 * d;
        g = 200 - 70 * d;
        b = 235 - 50 * d;
      } else if (h < 0.75) {
        r = 236;
        g = 216;
        b = 150;
      } else if (h < 2.2) {
        const k = clamp((h - 0.75) / 1.4, 0, 1);
        r = 120 - 20 * k;
        g = 205 - 45 * k;
        b = 95 - 20 * k;
      } else {
        const k = clamp((h - 2.2) / 6, 0, 1);
        r = 130 + 20 * k;
        g = 125 + 20 * k;
        b = 125 + 25 * k;
      }
      const o = (j * N + i) * 4;
      im.data[o] = clamp(r * (1 + s), 0, 255);
      im.data[o + 1] = clamp(g * (1 + s), 0, 255);
      im.data[o + 2] = clamp(b * (1 + s), 0, 255);
      im.data[o + 3] = 255;
    }
  const tc = document.createElement("canvas");
  tc.width = tc.height = N;
  tc.getContext("2d").putImageData(im, 0, 0);
  c.imageSmoothingEnabled = true;
  c.drawImage(tc, 0, 0, 560, 560);
  const mp = (x, z) => [(x / W + 0.5) * 560, (z / W + 0.5) * 560];
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.lineJoin = "round";
  [
    ["💗", "Love Altar", 0, -10],
    ["🌸", "Love Tree", 0, -1],
    ["🔨", "Workbench", -6, 5],
    ["✉️", "Mailbox", 7, 6],
    ["💧", "Pond", -11, 7],
    ["⛵", "Boat", BOATP[0], BOATP[1]],
    ["🕳️", "Cave", ENT[0], ENT[1]],
    ["💦", "Waterfall", AX, AZ],
    ["🎣", "Fishing pier", DK.x + dc * 6, DK.z + ds2 * 6],
  ].forEach(([e, l, x, z]) => {
    const p = mp(x, z);
    c.fillStyle = "#fff";
    c.beginPath();
    c.arc(p[0], p[1], 17, 0, 6.283);
    c.fill();
    c.strokeStyle = "#00000055";
    c.lineWidth = 2;
    c.stroke();
    c.font = "19px serif";
    c.fillStyle = "#000";
    c.fillText(e, p[0], p[1] + 1);
    c.font = "bold 15px system-ui,sans-serif";
    c.lineWidth = 4;
    c.strokeStyle = "#fff";
    c.strokeText(l, p[0], p[1] + 30);
    c.fillStyle = "#3a2a3a";
    c.fillText(l, p[0], p[1] + 30);
  });
  if (!inCave) {
    const p = mp(me3.x, me3.z);
    c.save();
    c.translate(p[0], p[1]);
    c.rotate(Math.PI - me3.ry);
    c.fillStyle = "#e8283c";
    c.strokeStyle = "#fff";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(0, -14);
    c.lineTo(10, 10);
    c.lineTo(0, 5);
    c.lineTo(-10, 10);
    c.closePath();
    c.stroke();
    c.fill();
    c.restore();
  }
  c.font = "bold 20px system-ui";
  c.lineWidth = 4;
  c.strokeStyle = "#fff";
  c.strokeText("N ↑", 30, 26);
  c.fillStyle = "#222";
  c.fillText("N ↑", 30, 26);
}
function openTab() {
  const d = new Date(now()),
    hr = d.getHours() + d.getMinutes() / 60,
    hh =
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0"),
    ph =
      hr < 5
        ? "🌙 Night"
        : hr < 7
          ? "🌅 Dawn"
          : hr < 17
            ? "☀️ Day"
            : hr < 20
              ? "🌇 Dusk"
              : "🌙 Night",
    aq = Math.round((1 - pollution) * 100),
    i = inv(),
    B = (k) => (blockIds[k] || []).length,
    np = PP.filter((p) => EXF["pp_" + p[0]]).length,
    ch = CHP[chap()];
  const ob = [
    [`Clear the trash piles (${TR0 - trashLeft}/${TR0})`, !trashLeft],
    [
      "Craft a Trash Converter 🏭 and make a plastic block 🔷",
      B("converter") > 0 && EXF.conv,
    ],
    [`Find the 3 purifier parts 🧽🌀🔌 (${np}/3)`, np === 3],
    [
      "Build a Generator ⚡ and an assembled Air Purifier ♻️",
      B("generator") > 0 && B("purifier") > 0,
    ],
    ["Catch a fish from the pier 🎣", EXF.fish],
    ["Brave the cave 🕳️", EXF.cave],
    ["Repair the boat ⛵ (just tap it)", chap() >= 8],
    [`Feed the Love Tree 🌸 (${gave()}/3000 🪙)`, gave() >= 3000],
  ];
  const tabs = ["🗺️ Map", "🎯 Goals", "🔨 Craft", "📸 Us"],
    cell =
      "border:2px solid var(--line);border-radius:14px;padding:10px 12px;margin:6px 0;background:var(--card)";
  let body = "";
  if (tabSel === 0)
    body = `<canvas id="mp" width="560" height="560" style="width:100%;border-radius:16px;border:2px solid var(--line);display:block"></canvas>`;
  if (tabSel === 1)
    body = ob
      .map(
        (o) =>
          `<div style="${cell};${o[1] ? "opacity:.6" : ""}">${o[1] ? "✅" : "⬜"} ${o[0]}</div>`,
      )
      .join("");
  if (tabSel === 2)
    body =
      RC.map((r) => {
        const ok = can(i, r[2]) && gold() >= r[4];
        return `<div style="${cell}">${ok ? "✅" : "⬜"} <b>${r[0]}</b><br><span class="mute" style="font-size:14px">${r[1]}</span><br><span style="font-size:14px">${Object.entries(
          r[2],
        )
          .map(([k, v]) => `${NM[k]} ${i[k] || 0}/${v}`)
          .join(" · ")}</span></div>`;
      }).join("") +
      `<div class="mute">Craft at the 🔨 workbench. Parts 🧽🌀🔌 are found around the island.</div>`;
  if (tabSel === 3)
    body = `<img src="${PHOTO}" style="width:100%;border-radius:12px;border:8px solid #fff;box-shadow:0 4px 16px rgba(0,0,0,.3);display:block"><div style="text-align:center;font-weight:800;margin-top:8px">Us 💕</div>`;
  showModal(`<div id="tabroot" style="font-size:16px;line-height:1.4"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div><b style="font-size:24px">${hh}</b> <span class="mute" style="font-size:15px">${ph}</span></div><div style="flex:1;max-width:170px"><div class="mute" style="font-size:13px">Air quality ${aq}%</div><div class="bar" style="margin:3px 0"><i style="width:${aq}%;background:${aq > 66 ? "#5fc454" : aq > 33 ? "#e8b83a" : "#c0503a"}"></i></div></div>${X}</div>
 <div style="display:flex;gap:6px;margin:10px 0">${tabs.map((t, k) => `<button data-tb="${k}" class="${k === tabSel ? "on" : ""}" style="flex:1;padding:9px 2px;margin:0;font-size:14px">${t}</button>`).join("")}</div>${body}</div>`);
  $("#modal .box").style.maxWidth = "580px";
  $("#x").onclick = closeModal;
  document.querySelectorAll("[data-tb]").forEach(
    (b) =>
      (b.onclick = () => {
        tabSel = +b.dataset.tb;
        openTab();
      }),
  );
  if (tabSel === 0) drawMap();
}
// ---- per-frame
window.exTick = function (dt, t) {
  exTick1(dt, t);
  if (!ready) return;
  flyTick(t);
  plast.count = Math.floor(PLN * clamp(TR0 ? trashLeft / TR0 : 0, 0, 1));
  heartTree.scale.setScalar(
    0.8 + Math.min(1, gave() / 3000) * 1.7 + Math.sin(t * 1.2) * 0.02,
  );
  wt2.offset.y -= dt * 0.9;
  if (!inCave && Math.random() < dt * 16)
    burst(
      AX + AO[0] * 1.7 + (Math.random() - 0.5) * 2,
      AF + 0.3,
      AZ + AO[1] * 1.7 + (Math.random() - 0.5) * 2,
      0xffffff,
      1,
      0.7,
      1.4,
    );
  if (fOn && fst > 0) {
    bobber.visible = bline.visible = true;
    const y =
      SEA +
      0.05 +
      Math.sin(t * 2) * 0.03 -
      (fst === 2 ? Math.abs(Math.sin(t * 22)) * 0.14 : 0);
    bobber.position.set(bo[0], y, bo[1]);
    const a = bline.geometry.attributes.position;
    a.setXYZ(0, tip[0], 1.9, tip[1]);
    a.setXYZ(1, bo[0], y, bo[1]);
    a.needsUpdate = true;
  } else bobber.visible = bline.visible = false;
  if (fOn && Math.hypot(me3.x - DK.x - dc * 6.3, me3.z - DK.z - ds2 * 6.3) > 6)
    closeFish();
  if (catItem && village.cat && !inCave) {
    const d = Math.hypot(me3.x - catItem.x, me3.z - catItem.z);
    catS.t = 1;
    catS.tx = d < 1.8 ? catItem.x : me3.x;
    catS.tz = d < 1.8 ? catItem.z : me3.z;
    if (d > 25) {
      catItem.x = me3.x - 1;
      catItem.z = me3.z - 1;
    } else if (d > 2) {
      catItem.x += ((me3.x - catItem.x) / d) * 2.4 * dt;
      catItem.z += ((me3.z - catItem.z) / d) * 2.4 * dt;
    }
  }
};

// ===== v3 =====
const exTick2 = window.exTick;
// terrain: rock on steep slopes, richer grass
{
  const p = tg.attributes.position,
    nm = tg.attributes.normal,
    c = tg.attributes.color,
    k = new THREE.Color(),
    r = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      z = p.getZ(i),
      h = p.getY(i),
      sl = 1 - nm.getY(i);
    k.setRGB(c.getX(i), c.getY(i), c.getZ(i));
    if (h > SEA + 0.4) {
      k.lerp(r.setHex(0x4f9a3c), vn(x / 6, z / 6, 41) * 0.35).lerp(
        r.setHex(0xa8d46a),
        vn(x / 1.3, z / 1.3, 40) * 0.25,
      );
      const rk = ss(0.16, 0.34, sl + (vn(x / 2, z / 2, 42) - 0.5) * 0.1);
      if (rk > 0)
        k.lerp(r.setHex(vn(x, z, 43) > 0.5 ? 0x86817f : 0x726c6c), rk);
      if (h > 6) k.lerp(r.setHex(0x9a9690), ss(6, 11, h) * 0.6);
    }
    c.setXYZ(i, k.r, k.g, k.b);
  }
  c.needsUpdate = true;
}
// Minecraft-style block textures (one atlas per type: side | top | bottom), one InstancedMesh per type
const Rc = (g, x, y, w, h, c) => {
    g.fillStyle = c;
    g.fillRect(x, y, w, h);
  },
  rgb = (c, d) =>
    `rgb(${clamp(c[0] + d, 0, 255) | 0},${clamp(c[1] + d, 0, 255) | 0},${clamp(c[2] + d, 0, 255) | 0})`,
  fillN = (g, c, a, s) => {
    for (let y = 0; y < 16; y++)
      for (let x = 0; x < 16; x++)
        Rc(g, x, y, 1, 1, rgb(c, (hs(x, y, s || 1) - 0.5) * a));
  };
const circ = (g, cx, cy, r, col, fill) => {
  for (let y = 0; y < 16; y++)
    for (let x = 0; x < 16; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (fill ? d <= r : Math.abs(d - r) < 0.6) Rc(g, x, y, 1, 1, col);
    }
};
function atlas(side, top, bot) {
  const c = document.createElement("canvas");
  c.width = 48;
  c.height = 16;
  const g = c.getContext("2d");
  [side, top || side, bot || side].forEach((f, i) => {
    g.save();
    g.translate(i * 16, 0);
    f(g);
    g.restore();
  });
  const t = new THREE.CanvasTexture(c);
  t.magFilter = t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  return t;
}
const metal = (c) => (g) => fillN(g, c, 10, 4);
const BTX = {
  plank: atlas((g) => {
    fillN(g, [186, 140, 84], 22, 2);
    for (let y = 0; y < 16; y += 5) Rc(g, 0, y, 16, 1, "#7a5430");
    for (let i = 0; i < 14; i++)
      Rc(
        g,
        (hs(i, 3, 3) * 14) | 0,
        (hs(i, 4, 4) * 15) | 0,
        3,
        1,
        "rgba(110,74,40,.5)",
      );
    [
      [2, 2],
      [13, 2],
      [2, 7],
      [13, 7],
      [2, 12],
      [13, 12],
    ].forEach(([x, y]) => Rc(g, x, y, 1, 1, "#4a3320"));
  }),
  brick: atlas((g) => {
    fillN(g, [178, 82, 62], 18, 3);
    for (let r = 0; r < 4; r++) {
      Rc(g, 0, r * 4, 16, 1, "#cbbfaa");
      (r % 2 ? [4, 12] : [0, 8]).forEach((x) =>
        Rc(g, x, r * 4 + 1, 1, 3, "#cbbfaa"),
      );
    }
  }),
  glass: atlas((g) => {
    Rc(g, 0, 0, 16, 16, "rgba(190,230,255,.3)");
    Rc(g, 0, 0, 16, 1, "#e8f8ff");
    Rc(g, 0, 15, 16, 1, "#e8f8ff");
    Rc(g, 0, 0, 1, 16, "#e8f8ff");
    Rc(g, 15, 0, 1, 16, "#e8f8ff");
    for (let i = 3; i < 7; i++) Rc(g, i, i, 1, 1, "#fff");
    for (let i = 9; i < 12; i++) Rc(g, i, i - 2, 1, 1, "rgba(255,255,255,.8)");
  }),
  thatch: atlas((g) => {
    fillN(g, [228, 202, 108], 22, 5);
    for (let y = 0; y < 16; y++)
      for (let x = 0; x < 16; x++)
        if ((x + y) % 4 === 0) Rc(g, x, y, 1, 1, "rgba(150,115,40,.55)");
  }),
  heart: atlas((g) => {
    fillN(g, [255, 158, 190], 10, 6);
    [
      "..XX.XX..",
      ".XXXXXXX.",
      ".XXXXXXX.",
      "..XXXXX..",
      "...XXX...",
      "....X....",
    ].forEach((row, y) =>
      [...row].forEach((ch, x) => {
        if (ch === "X") Rc(g, 3 + x, 4 + y, 1, 1, "#e0285a");
      }),
    );
  }),
  lantern: atlas((g) => {
    Rc(g, 0, 0, 16, 16, "#3a322c");
    Rc(g, 2, 2, 12, 12, "#ffc060");
    Rc(g, 4, 4, 8, 8, "#fff0b0");
    Rc(g, 7, 0, 2, 16, "#3a322c");
    Rc(g, 0, 7, 16, 2, "#3a322c");
  }),
  plastic: atlas((g) => {
    fillN(g, [58, 148, 214], 8, 7);
    Rc(g, 1, 1, 6, 1, "rgba(255,255,255,.55)");
    Rc(g, 1, 1, 1, 6, "rgba(255,255,255,.55)");
    [
      [2, 13],
      [13, 13],
      [13, 2],
    ].forEach(([x, y]) => Rc(g, x, y, 1, 1, "#1f5a8a"));
    Rc(g, 0, 15, 16, 1, "#1f5a8a");
    Rc(g, 15, 0, 1, 16, "#1f5a8a");
  }),
  generator: atlas(
    (g) => {
      fillN(g, [226, 164, 38], 10, 8);
      [3, 5, 7].forEach((y) => Rc(g, 3, y, 10, 1, "#3a2a10"));
      for (let y = 12; y < 16; y++)
        for (let x = 0; x < 16; x++)
          Rc(g, x, y, 1, 1, (x + y) % 4 < 2 ? "#161616" : "#e8c030");
      [
        [9, 8],
        [8, 9],
        [9, 9],
        [8, 10],
        [7, 11],
      ].forEach(([x, y]) => Rc(g, x, y, 1, 1, "#2a1a00"));
      Rc(g, 0, 0, 16, 1, "#8a5a10");
    },
    (g) => {
      fillN(g, [78, 80, 86], 8, 9);
      Rc(g, 4, 4, 8, 8, "#c23a2a");
      Rc(g, 5, 5, 6, 6, "#8a2a20");
      Rc(g, 7, 7, 2, 2, "#ddd");
      Rc(g, 12, 1, 3, 3, "#222");
    },
    metal([70, 70, 76]),
  ),
  converter: atlas(
    (g) => {
      fillN(g, [118, 124, 136], 10, 10);
      Rc(g, 0, 0, 16, 2, "#2a2e36");
      for (let a = 0; a < 6.28; a += 0.35)
        Rc(
          g,
          8 + Math.round(Math.cos(a) * 4),
          9 + Math.round(Math.sin(a) * 4),
          1,
          1,
          "#3ccf6e",
        );
      Rc(g, 11, 6, 2, 1, "#3ccf6e");
      Rc(g, 4, 12, 1, 2, "#3ccf6e");
      Rc(g, 3, 6, 1, 2, "#3ccf6e");
    },
    (g) => {
      fillN(g, [40, 44, 52], 6, 11);
      Rc(g, 3, 3, 10, 10, "#101216");
      circ(g, 8, 8, 3, "#303540", true);
      Rc(g, 7, 7, 2, 2, "#9aa0ac");
    },
    metal([90, 94, 104]),
  ),
  purifier: atlas(
    (g) => {
      fillN(g, [226, 240, 244], 6, 12);
      circ(g, 8, 7, 5, "#2f7f8c", true);
      circ(g, 8, 7, 5.2, "#9ad7e0");
      Rc(g, 7, 2, 2, 10, "#8fe0ea");
      Rc(g, 3, 6, 10, 2, "#8fe0ea");
      circ(g, 8, 7, 1, "#e8ffff", true);
      Rc(g, 13, 1, 1, 1, "#4dfdff");
      Rc(g, 3, 14, 10, 1, "#7aa6ae");
      Rc(g, 3, 12, 10, 1, "#b4d6dc");
    },
    (g) => {
      fillN(g, [40, 110, 120], 8, 13);
      for (let x = 1; x < 16; x += 2) Rc(g, x, 0, 1, 16, "#7ad0da");
    },
    metal([150, 170, 176]),
  ),
};
Object.keys(BTX).forEach((k) => {
  const im = blockMeshes[k],
    geo = new THREE.BoxGeometry(1, 1, 1),
    uv = geo.attributes.uv;
  for (let f = 0; f < 6; f++) {
    const col = f === 2 ? 1 : f === 3 ? 2 : 0;
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setX(i, (uv.getX(i) + col) / 3);
    }
  }
  im.geometry = geo;
  const o = { map: BTX[k], roughness: 0.85 };
  if (k === "glass") {
    o.transparent = true;
    o.roughness = 0.1;
  }
  const m = M(0xffffff, o);
  if (k === "lantern" || k === "purifier") {
    m.emissive = new THREE.Color(0xffffff);
    m.emissiveMap = BTX[k];
    m.emissiveIntensity = 0.45;
    glow.push(m);
  }
  im.material = m;
  im.receiveShadow = true;
});
// leviathan: shadow on the opaque water surface, back breaks the surface
function levTick(dt, t) {
  levNext -= dt;
  if (levNext <= 0) {
    levNext = 45 + Math.random() * 50;
    levUp = 7;
    if (!inCave) {
      tone(70, 1.6, "sine", 0.1);
      if (Math.random() < 0.5)
        toast("🌊 Something enormous moves beneath the waves…");
    }
  }
  levUp -= dt;
  levSurf += ((levUp > 0 ? 1 : 0) - levSurf) * Math.min(1, dt * 0.8);
  lm.opacity = 0.4 + 0.5 * levSurf;
  levS.forEach((g, i) => {
    const a = t * 0.04 - i * 0.05,
      r = 58 - 12 * WXK + Math.sin(t * 0.2) * 3 + Math.sin(a * 3);
    g.position.set(
      Math.cos(a) * r,
      SEA + 0.03 + levSurf * Math.max(0, Math.sin(i * 0.8 - t * 0.9)) * 0.7,
      Math.sin(a) * r,
    );
    g.rotation.y = -(a + Math.PI / 2);
    g.children[0].scale.y =
      (i === 0 ? 1.5 : 1.4 - i * 0.07) * (0.05 + 0.3 * levSurf);
  });
}
// better boat
function woodTex() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  for (let y = 0; y < 8; y++) {
    g.fillStyle = `rgb(${(150 + hs(y, 1, 1) * 40) | 0},${(100 + hs(y, 2, 2) * 30) | 0},${(58 + hs(y, 3, 3) * 20) | 0})`;
    g.fillRect(0, y * 16, 128, 16);
    g.fillStyle = "rgba(60,35,15,.7)";
    g.fillRect(0, y * 16, 128, 2);
    for (let i = 0; i < 14; i++) {
      g.fillStyle = "rgba(70,42,20,.25)";
      g.fillRect(
        hs(i, y, 5) * 128,
        y * 16 + 2 + hs(i, y, 6) * 12,
        10 + hs(i, y, 7) * 40,
        1,
      );
    }
    [20, 70, 110].forEach((x) => {
      g.fillStyle = "#2a1a0c";
      g.fillRect(x + hs(y, x, 9) * 6, y * 16 + 8, 2, 2);
    });
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
{
  boatG.children.slice().forEach((c) => boatG.remove(c));
  boatParts.length = 0;
  const wd = woodTex();
  wd.repeat.set(3, 1);
  const wm = M(0xffffff, { map: wd, side: THREE.DoubleSide, roughness: 0.85 }),
    hg = new THREE.SphereGeometry(
      1,
      32,
      10,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 2,
    ),
    pp = hg.attributes.position;
  for (let i = 0; i < pp.count; i++) {
    const z = pp.getZ(i),
      f = z > 0 ? 0.8 : 0.5;
    pp.setX(i, pp.getX(i) * 1.1 * (1 - f * Math.pow(Math.abs(z), 3)));
    pp.setZ(i, z * 3.2);
    pp.setY(i, pp.getY(i) * 0.8);
  }
  hg.computeVertexNormals();
  const hull = new THREE.Mesh(hg, wm);
  hull.position.y = 0.55;
  hull.castShadow = true;
  boatG.add(hull);
  const rim = [];
  for (let a = 0; a < 6.28; a += 0.2) {
    const z = Math.sin(a);
    rim.push(
      new THREE.Vector3(
        Math.cos(a) *
          1.1 *
          (1 - (z > 0 ? 0.8 : 0.5) * Math.pow(Math.abs(z), 3)),
        0.55,
        z * 3.2,
      ),
    );
  }
  boatG.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(rim, true),
        64,
        0.07,
        6,
        true,
      ),
      M(0x5a3a22),
    ),
  );
  const bxw = (w, h, d, x, y, z) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      M(0xffffff, { map: wd }),
    );
    m.position.set(x, y, z);
    m.castShadow = true;
    boatG.add(m);
  };
  bxw(2, 0.1, 0.4, 0, 0.85, -0.9);
  bxw(1.8, 0.1, 0.4, 0, 0.85, 1.6);
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.09, 3.8, 8),
    M(0x6a4a2c),
  );
  mast.position.set(0, 2.45, 0.5);
  mast.castShadow = true;
  boatG.add(mast);
  const sc = document.createElement("canvas");
  sc.width = 128;
  sc.height = 128;
  {
    const g = sc.getContext("2d");
    g.fillStyle = "#f4ead2";
    g.fillRect(0, 0, 128, 128);
    for (let x = 0; x < 128; x += 32) {
      g.fillStyle = "rgba(120,100,70,.35)";
      g.fillRect(x, 0, 2, 128);
    }
    g.fillStyle = "#d9677f";
    g.fillRect(20, 60, 30, 30);
    g.fillStyle = "#6a9ed0";
    g.fillRect(70, 30, 26, 26);
    g.strokeStyle = "#7a6a50";
    g.setLineDash([4, 4]);
    g.strokeRect(20, 60, 30, 30);
    g.strokeRect(70, 30, 26, 26);
  }
  const sh = new THREE.Shape();
  sh.moveTo(0, 0);
  sh.lineTo(0, 3.2);
  sh.lineTo(2, 0.3);
  sh.closePath();
  const sail = new THREE.Mesh(
    new THREE.ShapeGeometry(sh),
    new THREE.MeshStandardMaterial({
      map: new THREE.CanvasTexture(sc),
      side: THREE.DoubleSide,
      roughness: 1,
    }),
  );
  const su = sail.geometry.attributes.uv,
    sp = sail.geometry.attributes.position;
  for (let i = 0; i < su.count; i++)
    su.setXY(i, sp.getX(i) / 2, sp.getY(i) / 3.2);
  sail.rotation.y = -Math.PI / 2;
  sail.position.set(0, 1.1, 0.6);
  sail.castShadow = true;
  boatG.add(sail);
  const fl = new THREE.Mesh(
    new THREE.PlaneGeometry(0.6, 0.35),
    M(0xff7aa2, {
      side: THREE.DoubleSide,
      emissive: 0xff7aa2,
      emissiveIntensity: 0.3,
    }),
  );
  fl.rotation.y = Math.PI / 2;
  fl.position.set(0, 4.15, 0.8);
  boatG.add(fl);
  const lp = new THREE.Mesh(G.crown, EM(0xffc060, 1.3));
  lp.scale.setScalar(0.14);
  lp.position.set(0, 1.1, 2.9);
  boatG.add(lp);
  [-1, 1].forEach((s) => {
    const o = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 2.2, 6),
      M(0x8a5a3a),
    );
    o.rotation.z = s * 1.25;
    o.position.set(s * 1.3, 0.95, -0.1);
    boatG.add(o);
  });
}
boatItem.hint = "⛵ The boat: tap to repair it instantly";
function openBoat() {
  if (chap() >= 8) {
    showModal(
      `${X}<h2>⛵ The boat is ready</h2><p>Twombly is by your side. Go explore the island together! 🐱</p>`,
    );
    $("#x").onclick = closeModal;
    return;
  }
  village.chap = 8;
  village.cat = 1;
  village.chStart = now();
  vup({ chap: 8, cat: 1 });
  lastChap = 8;
  boatState();
  ensureCat();
  if (catItem) {
    catItem.x = me3.x - 1.5;
    catItem.z = me3.z;
  }
  jingle([392, 523, 659, 784, 1047]);
  burst(boatG.position.x, 2, boatG.position.z, 0xffd24a, 30, 3, 3);
  showModal(
    `<h2>🎉 The boat is fixed!</h2><p>Planks, sail and a little pink flag. Twombly hops out, runs to you, and from now on he follows you around the island. 🐱</p><button id="fin" class="on">Let's explore 💞</button>`,
  );
  $("#fin").onclick = closeModal;
}
// secret bed (fade to black)
let bedS = 0,
  lov = null,
  bedO = null,
  caveCD = 0,
  wasC = false;
const bf = document.createElement("div");
bf.style.cssText =
  "position:fixed;inset:0;background:#000;opacity:0;pointer-events:none;z-index:6;transition:opacity 1.4s;display:flex;align-items:center;justify-content:center;color:#ffd0dc;font:700 22px system-ui;text-align:center;padding:20px";
document.body.appendChild(bf);
function exBed() {
  showModal(
    `${X}<h2>🕯️ The secret hideaway</h2><p>Candles flicker behind the curtain of water. Rose petals on red silk. The whole world is on the other side of the waterfall… and it is just the two of you.</p><button id="lb" class="on">Lie down together 💞</button><button id="nx">Not now</button>`,
  );
  $("#x").onclick = $("#nx").onclick = closeModal;
  $("#lb").onclick = () => {
    closeModal();
    startBed();
  };
}
function startBed() {
  if (bedS) return;
  bedS = 0.01;
  EXF.bed = 1;
  lov = actor(1, "💞");
  lov.g.rotation.order = me3.g.rotation.order = "YXZ";
  goalPt = goalObj = null;
  jingle([330, 392, 494, 659]);
}
function bedTick(dt, t) {
  if (!bedS) return;
  bedS += dt;
  goalPt = goalObj = null;
  const v = new THREE.Vector3(),
    bob = bedS > 3 ? Math.sin(bedS * 3.4) * 0.05 : 0;
  [
    [me3, -0.42],
    [lov, 0.42],
  ].forEach(([a, lx]) => {
    wf.localToWorld(v.set(lx, 0.84 + bob, -0.05));
    a.g.position.copy(v);
    a.g.rotation.set(-Math.PI / 2, wf.rotation.y, 0);
    a.g.visible = true;
  });
  me3.x = me3.g.position.x;
  me3.z = me3.g.position.z;
  me3.y = me3.g.position.y;
  me3.vx = me3.vz = 0;
  bd.position.y = bedS > 3 ? Math.sin(bedS * 3.4) * 0.03 : 0;
  cam.position.copy(wf.localToWorld(new THREE.Vector3(-3.4, 3.4, 1.8)));
  cam.lookAt(wf.localToWorld(new THREE.Vector3(0, 0.9, -1.1)));
  if (Math.random() < dt * 3)
    burst(bp[0], AF + 1.4, bp[1], 0xff5a8a, 2, 0.8, 2.5);
  bf.style.opacity = bedS > 5 && bedS < 9 ? 1 : 0;
  bf.textContent =
    bedS > 5.8 && bedS < 8.6 ? "💞 …together under the waterfall… 💞" : "";
  if (bedS > 10.5) {
    bedS = 0;
    bd.position.y = 0;
    scene.remove(lov.g);
    lov = null;
    me3.g.rotation.set(0, 0, 0);
    me3.g.rotation.order = "XYZ";
    const p = wf.localToWorld(new THREE.Vector3(0, 0, 1.2));
    me3.x = p.x;
    me3.z = p.z;
    me3.y = gh(p.x, p.z) + 0.1;
    me3.vy = 0;
    snapCam();
    toast("💞");
  }
}
// per-frame
window.exTick = function (dt, t) {
  exTick2(dt, t);
  if (!ready) return;
  bedTick(dt, t);
  const nr = !inCave && Math.hypot(me3.x - bp[0], me3.z - bp[1]) < 3.4;
  fp.material.opacity +=
    ((nr ? 0.28 : 0.97) - fp.material.opacity) * Math.min(1, dt * 6);
  if (inCave !== wasC) {
    wasC = inCave;
    if (!inCave) caveCD = now() + 3500;
  }
  if (
    !inCave &&
    !bedS &&
    now() > caveCD &&
    Math.hypot(me3.x - (CX0 - CO[0] * 2.15), me3.z - (CZ0 - CO[1] * 2.15)) < 2.6
  ) {
    const c = items.find((i) => i.kind === "cave");
    if (c) doInteract(c);
  }
};

// ===== v4 =====
const exTick3 = window.exTick;
function slopeMul(dx, dz) {
  if (!dx && !dz) return 1;
  const l = Math.hypot(dx, dz) || 1,
    s =
      (hm(me3.x + (dx / l) * 0.7, me3.z + (dz / l) * 0.7) - hm(me3.x, me3.z)) /
      0.7;
  return 1 - clamp(s, 0, 1) * 0.45;
}
function camWant() {
  const cp = Math.cos(pitch),
    sx = Math.sin(yaw) * cp,
    sy = Math.sin(pitch),
    sz = Math.cos(yaw) * cp;
  let d = dist;
  if (!inCave)
    for (let k = 1; k <= 14; k++) {
      const t = (k / 14) * dist,
        x = me3.x + sx * t,
        y = me3.y + 1.2 + sy * t,
        z = me3.z + sz * t;
      if (y < hm(x, z) + 0.9) {
        d = Math.max(2.5, t - 1);
        break;
      }
    }
  return new THREE.Vector3(
    me3.x + sx * d,
    me3.y + 1.2 + sy * d,
    me3.z + sz * d,
  );
}
// rock strata on cliffs
{
  const p = tg.attributes.position,
    nm = tg.attributes.normal,
    c = tg.attributes.color,
    k = new THREE.Color(),
    r = new THREE.Color(),
    B = [0x7a746c, 0x8d8378, 0x6a655f];
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      z = p.getZ(i),
      h = p.getY(i),
      w = ss(0.14, 0.3, 1 - nm.getY(i));
    if (w > 0 && h > SEA + 0.4) {
      k.setRGB(c.getX(i), c.getY(i), c.getZ(i));
      k.lerp(
        r.setHex(
          B[((Math.floor(h * 1.7 + vn(x / 4, z / 4, 50) * 2.5) % 3) + 3) % 3],
        ),
        w * 0.65,
      );
      c.setXYZ(i, k.r, k.g, k.b);
    }
  }
  c.needsUpdate = true;
}
// ---- cave: lit, readable, still spooky
const cAmb = new THREE.AmbientLight(0x7a6a96, 0),
  cvLamp = new THREE.PointLight(0xffc890, 0, 16);
scene.add(cAmb, cvLamp);
{
  const mu = EM(0x4a8aff, 1.6);
  for (let i = 0; i < 7; i++) {
    const a = i * 0.9 + 0.4,
      r = 3.5 + hs(i, 60, 1) * 2;
    for (let k = 0; k < 3; k++) {
      const m = new THREE.Mesh(G.crown, mu);
      m.scale.set(0.12, 0.16, 0.12);
      m.position.set(
        Math.cos(a) * r + k * 0.15,
        0.55,
        Math.sin(a) * r + k * 0.12,
      );
      caveG.add(m);
    }
  }
}
function caveTick(dt, t) {
  scene.fog.far = inCave ? 38 : 220;
  if (!inCave) {
    cAmb.intensity = 0;
    cvLamp.intensity = 0;
    fig.visible = false;
    return;
  }
  EXF.cave = 1;
  scene.fog.near = 6;
  scene.fog.color.setHex(0x120c1a);
  scene.background.setHex(0x120c1a);
  hemi.intensity = 0.5;
  sun.intensity = 0;
  cAmb.intensity = 1.05;
  cvLamp.intensity = 1.8 + Math.sin(t * 7) * 0.1;
  cvLamp.position.set(me3.x, me3.y + 2.2, me3.z);
  cvL.intensity =
    Math.random() < 0.04
      ? 0.1
      : 0.9 + Math.sin(t * 9) * 0.2 + Math.random() * 0.2;
  eyes.forEach((g) => {
    g.userData.t -= dt;
    if (g.userData.t <= 0) {
      g.visible = !g.visible && Math.random() < 0.5;
      g.userData.t = 0.6 + Math.random() * 3;
    }
  });
  cvNext -= dt;
  if (cvNext <= 0) {
    cvNext = 14 + Math.random() * 22;
    scare();
  }
  hb -= dt;
  if (hb <= 0) {
    hb = 1.1;
    tone(55, 0.14, "sine", 0.3);
    tone(50, 0.14, "sine", 0.25, 0.2);
  }
  if (Math.random() < dt * 0.5)
    tone(48 + Math.random() * 20, 2.2, "sawtooth", 0.05);
}
// ---- purifier parts with real models
function partMesh(k) {
  const g = new THREE.Group(),
    cv = (f) => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      f(c.getContext("2d"));
      return new THREE.CanvasTexture(c);
    };
  if (k === "circuit") {
    const t = cv((x) => {
      x.fillStyle = "#1f6b3a";
      x.fillRect(0, 0, 128, 128);
      x.strokeStyle = "#c9a24a";
      x.lineWidth = 2;
      for (let i = 0; i < 16; i++) {
        let px = hs(i, 1, 70) * 128,
          py = hs(i, 2, 70) * 128;
        x.beginPath();
        x.moveTo(px, py);
        for (let s = 0; s < 3; s++) {
          px += (hs(i, s + 3, 71) - 0.5) * 70;
          x.lineTo(px, py);
          py += (hs(i, s + 9, 72) - 0.5) * 70;
          x.lineTo(px, py);
        }
        x.stroke();
      }
      x.fillStyle = "#d8b24a";
      for (let i = 0; i < 24; i++)
        x.fillRect(hs(i, 4, 73) * 120, hs(i, 5, 73) * 120, 5, 5);
    });
    g.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.05, 0.6),
        new THREE.MeshStandardMaterial({ map: t, roughness: 0.6 }),
      ),
    );
    [
      [-0.2, 0.25, 0.3, 0.12],
      [0.2, 0.2, 0.2, 0.1],
      [0.05, -0.2, 0.25, 0.1],
    ].forEach(([x, z, w, d]) => {
      const c = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, d), M(0x15161a));
      c.position.set(x, 0.055, z);
      g.add(c);
    });
    [-0.3, 0.3].forEach((x) => {
      const c = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.12, 8),
        M(0x2a5a9a),
      );
      c.position.set(x, 0.08, -0.2);
      g.add(c);
    });
  }
  if (k === "filter") {
    const t = cv((x) => {
      x.fillStyle = "#efe7c8";
      x.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 128; i += 8) {
        x.fillStyle = "#b8ad82";
        x.fillRect(i, 0, 3, 128);
        x.fillStyle = "#fff8dc";
        x.fillRect(i + 4, 0, 2, 128);
      }
    });
    g.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.14, 0.5),
        new THREE.MeshStandardMaterial({ map: t, roughness: 1 }),
      ),
    );
    [
      [0, 0.27, 0.7, 0.04],
      [0, -0.27, 0.7, 0.04],
    ].forEach(([x, z, w, d]) => {
      const f = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, d), M(0x5a6068));
      f.position.set(x, 0, z);
      g.add(f);
    });
    [-0.36, 0.36].forEach((x) => {
      const f = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.16, 0.5),
        M(0x5a6068),
      );
      f.position.set(x, 0, 0);
      g.add(f);
    });
  }
  if (k === "fan") {
    const dk = M(0x3a3f48, { metalness: 0.4, roughness: 0.5 }),
      ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.07, 8, 24), dk);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.1;
    g.add(ring);
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.12, 10),
      M(0xc23a2a),
    );
    hub.position.y = 0.1;
    g.add(hub);
    for (let i = 0; i < 7; i++) {
      const b = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.015, 0.14),
        M(0x9aa6b0, { metalness: 0.5, roughness: 0.4 }),
      );
      b.position.set(
        Math.cos(i * 0.897) * 0.28,
        0.1,
        Math.sin(i * 0.897) * 0.28,
      );
      b.rotation.set(0.3, -i * 0.897, 0);
      g.add(b);
    }
    [0, 1.57].forEach((r) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(1, 0.02, 0.03), dk);
      bar.rotation.y = r;
      bar.position.y = 0.1;
      g.add(bar);
    });
  }
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  return g;
}
items
  .filter((i) => i.kind === "pp")
  .forEach((i) => {
    IG.remove(i.root);
    items.splice(items.indexOf(i), 1);
  });
PP.forEach(([k, nm, at]) => {
  const p = at(),
    R = new THREE.Group(),
    T = new THREE.Group(),
    m = partMesh(k);
  T.add(m);
  R.add(T);
  hitSph(R, 0.9, 0.4);
  if (p[0] > 200) R.position.set(p[0], 0.55, p[1]);
  else grnd(m, T, R, p[0], p[1], SEA);
  addItem({
    id: "pp" + k,
    kind: "pp",
    k,
    nm,
    x: p[0],
    z: p[1],
    r: 0,
    reach: 2.2,
    root: R,
    hint: "🔧 " + nm + ": tap to pick up",
  });
});
// ---- the police island (Twombly is held here)
const CMP = [I2X + 1, I2Z - 1],
  LA = Math.atan2(-I2Z, -I2X),
  LAND2 = [I2X + Math.cos(LA) * 17.5, I2Z + Math.sin(LA) * 17.5];
let sailing_ = 0;
{
  const g2 = new THREE.PlaneGeometry(150, 150, 236, 236);
  g2.rotateX(-Math.PI / 2);
  const p = g2.attributes.position,
    c = new Float32Array(p.count * 3),
    k = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) + I2X,
      z = p.getZ(i) + I2Z,
      h = gh(x, z);
    p.setY(i, h);
    k.setHex(h < 0.55 ? 0xe9d79a : h < 1.3 ? 0x86c860 : 0x6fb050).lerp(
      new THREE.Color(0x4f9a3c),
      vn(x / 4, z / 4, 61) * 0.4,
    );
    if (h < -0.1) k.setHex(0x8a9a7a);
    c.set([k.r, k.g, k.b], i * 3);
  }
  g2.setAttribute("color", new THREE.BufferAttribute(c, 3));
  g2.computeVertexNormals();
  const m = new THREE.Mesh(g2, M(0xffffff, { vertexColors: true }));
  m.position.set(I2X, 0, I2Z);
  m.receiveShadow = true;
  scene.add(m);
}
function mkPalm(x, z) {
  const g = new THREE.Group(),
    tr = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.24, 3.4, 7),
      M(0x8a6a44),
    );
  tr.position.y = 1.7;
  tr.rotation.z = 0.18;
  tr.castShadow = true;
  g.add(tr);
  for (let i = 0; i < 7; i++) {
    const l = new THREE.Mesh(new THREE.ConeGeometry(0.35, 2.4, 4), M(0x3f8a3a));
    l.position.set(Math.cos(i * 0.9) * 0.9 + 0.6, 3.5, Math.sin(i * 0.9) * 0.9);
    l.rotation.set(Math.sin(i * 0.9) * 1.2, 0, -Math.cos(i * 0.9) * 1.2 - 0.3);
    l.scale.z = 0.35;
    g.add(l);
  }
  g.position.set(x, gh(x, z), z);
  scene.add(g);
}

function stripeTex(cols, vert) {
  const c = document.createElement("canvas");
  c.width = 96;
  c.height = 64;
  const g = c.getContext("2d");
  cols.forEach((col, i) => {
    g.fillStyle = col;
    if (vert) g.fillRect((i * 96) / cols.length, 0, 96 / cols.length + 1, 64);
    else g.fillRect(0, (i * 64) / cols.length, 96, 64 / cols.length + 1);
  });
  return new THREE.CanvasTexture(c);
}
const cageG = new THREE.Group(),
  kcat = new THREE.Group();
{
  const bar = M(0x2a2a30, { metalness: 0.6, roughness: 0.4 }),
    fl = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 1.8), bar),
    tp = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 1.8), bar);
  tp.position.y = 1.7;
  cageG.add(fl, tp);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * 6.283,
      b = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.7, 6), bar);
    b.position.set(Math.cos(a) * 0.88, 0.85, Math.sin(a) * 0.88);
    cageG.add(b);
  }
  const m = M(0xf2a65a),
    b = new THREE.Mesh(G.crown, m),
    h = new THREE.Mesh(G.crown, m),
    t = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), m);
  b.scale.set(0.3, 0.22, 0.2);
  b.position.y = 0.3;
  h.scale.set(0.17, 0.15, 0.15);
  h.position.set(0.3, 0.42, 0);
  t.rotation.z = 1;
  t.position.set(-0.3, 0.4, 0);
  kcat.add(b, h, t);
  [
    [0.08, 0.64],
    [0.08, 0.64],
  ].forEach(([x], i) => {
    const e = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 4), m);
    e.position.set(0.3, 0.58, i ? 0.08 : -0.08);
    kcat.add(e);
  });
  cageG.add(kcat);
  hitSph(cageG, 1.2, 0.8);
}
const cageIt = addItem({
  id: "cage",
  kind: "cage",
  hp: 3,
  x: CMP[0],
  z: CMP[1],
  r: 0,
  reach: 2.2,
  root: place(cageG, CMP[0], CMP[1]),
  hint: "🐱 Twombly is locked in a cage! Tap to pick the lock",
});
const GRD = [];
function mkGuard() {
  const g = new THREE.Group(),
    bl = M(0x1f3a8a),
    sk = M(0xf0c8a0),
    bk = M(0x111111),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  A(new THREE.CylinderGeometry(0.3, 0.34, 0.9, 10), bl, 0, 0.95, 0);
  A(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 10), bk, 0, 0.65, 0);
  A(G.crown, sk, 0, 1.65, 0).scale.setScalar(0.26);
  A(new THREE.CylinderGeometry(0.24, 0.28, 0.2, 12), bl, 0, 1.9, 0);
  A(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 12), bl, 0, 2.03, 0);
  A(new THREE.CylinderGeometry(0.29, 0.29, 0.05, 12), M(0xdddddd), 0, 1.82, 0);
  A(new THREE.BoxGeometry(0.22, 0.05, 0.05), bk, 0, 1.58, 0.24);
  [-0.14, 0.14].forEach((x) => {
    A(new THREE.CylinderGeometry(0.09, 0.09, 0.6, 8), bl, x, 0.3, 0);
    A(new THREE.CylinderGeometry(0.07, 0.07, 0.6, 8), bl, x * 2.1, 1, 0);
  });
  return g;
}

let alrt = 0,
  grace = 0,
  rescued = false;
function caught() {
  toast(
    ["Hon hon hon! Arrêtez!", "Zut alors! Intrus!", "Halte-là, citoyen!"][
      Math.floor(Math.random() * 3)
    ] + " 🚔",
  );
  me3.x = LAND2[0];
  me3.z = LAND2[1];
  me3.y = gh(LAND2[0], LAND2[1]) + 0.1;
  me3.vx = me3.vz = 0;
  goalPt = goalObj = null;
  grace = 4;
  alrt = 0;
  snapCam();
  tone(300, 0.3, "sawtooth", 0.15);
}
function guardTick(dt, t) {
  if (window.pCar) {
    const on = Math.floor(t * 4) % 2;
    pCar.userData.l1.visible = !!on;
    pCar.userData.l2.visible = !on;
  }
  kcat.position.y = Math.sin(t * 3) * 0.02;
  if (rescued) kcat.visible = false;
  const near = Math.hypot(me3.x - CMP[0], me3.z - CMP[1]) < 22 && !inCave;
  grace -= dt;
  alrt -= dt;
  GRD.forEach((G2) => {
    let x, z;
    if (alrt > 0 && near) {
      const dx = me3.x - G2.g.position.x,
        dz = me3.z - G2.g.position.z,
        d = Math.hypot(dx, dz) || 1;
      x = G2.g.position.x + (dx / d) * 3.1 * dt;
      z = G2.g.position.z + (dz / d) * 3.1 * dt;
      G2.g.rotation.y = Math.atan2(dx, dz);
      if (d < 1.4 && grace <= 0 && !sailing) caught();
    } else {
      G2.a += G2.w * dt;
      x = CMP[0] + Math.cos(G2.a) * G2.r;
      z = CMP[1] + Math.sin(G2.a) * G2.r;
      G2.g.rotation.y = Math.atan2(
        -Math.sin(G2.a) * Math.sign(G2.w),
        Math.cos(G2.a) * Math.sign(G2.w),
      );
    }
    G2.g.position.set(x, Math.max(gh(x, z), SEA) + 0, z);
    if (near && alrt <= 0 && grace <= 0 && !sailing) {
      const dx = me3.x - x,
        dz = me3.z - z,
        d = Math.hypot(dx, dz),
        fa = G2.g.rotation.y,
        ang = Math.abs(
          Math.atan2(
            Math.sin(Math.atan2(dx, dz) - fa),
            Math.cos(Math.atan2(dx, dz) - fa),
          ),
        ),
        moving = me3.spd > 0.5;
      if (d < 2.2 || (d < (moving ? 7 : 3.5) && ang < 0.95)) {
        alrt = 8;
        const e = emoteSprite("❗");
        e.position.y = 2.8;
        G2.g.add(e);
        setTimeout(() => G2.g.remove(e), 900);
        toast("🚨 A gendarme spotted you! Hide or run!");
        tone(700, 0.3, "square", 0.12);
      }
    }
  });
  if (
    alrt > 0 &&
    near &&
    alrt < 7.9 &&
    !rescued &&
    me3.spd < 0.5 &&
    Math.random() < dt * 0.5
  )
    alrt -= dt * 3;
}
// ---- sailing + boat story
boatItem.r = 0;
const sailS = { wet: 0, lw: null };
function openBoat() {
  if (chap() < 8) {
    village.chap = 8;
    vup({ chap: 8 });
    lastChap = 8;
    boatState();
    jingle([392, 523, 659, 784, 1047]);
    burst(boatG.position.x, 2, boatG.position.z, 0xffd24a, 30, 3, 3);
    showModal(
      `<h2>🎉 The boat is fixed!</h2><p>Planks, patched sail, a little pink flag. Far across the sea you spot a tiny island flying a <b>French flag</b>… that's where the French police are holding your cat <b>Twombly</b>.</p><p>Tap the boat again to set sail, sneak past the gendarmes, pick the lock of his cage and bring him home. 🐱</p><button id="fin" class="on">To the sea! ⛵</button>`,
    );
    $("#fin").onclick = closeModal;
    return;
  }
  if (sailing) return;
  sailing = true;
  sailS.wet = 0;
  sailS.lw = null;
  toast(
    "⛵ Sailing! Steer with WASD or the stick. Head for the island with the French flag.",
  );
}
function sailTick(dt, t) {
  if (!sailing) return;
  const g = gh(me3.x, me3.z);
  if (g < 0.15) sailS.wet = 1;
  if (g < 0.1) sailS.lw = { x: me3.x, z: me3.z };
  boatG.position.set(me3.x, SEA - 0.12 + Math.sin(t * 2) * 0.03, me3.z);
  boatG.rotation.set(0, me3.ry, Math.sin(t * 1.6) * 0.03);
  boatItem.x = me3.x;
  boatItem.z = me3.z;
  if (Math.random() < dt * 10)
    burst(
      me3.x - Math.sin(me3.ry) * 1.5,
      SEA + 0.05,
      me3.z - Math.cos(me3.ry) * 1.5,
      0xffffff,
      1,
      0.8,
      0.5,
    );
  if (sailS.wet && g > 0.45) {
    sailing = false;
    sailS.wet = 0;
    const w = sailS.lw || { x: me3.x, z: me3.z };
    boatG.position.set(w.x, Math.max(gh(w.x, w.z), SEA) - 0.05, w.z);
    boatItem.x = w.x;
    boatItem.z = w.z;
    toast("⚓ You landed. Tap the boat whenever you want to sail again.");
  }
}
boatItem.hint = "⛵ The boat: tap to sail";
// (removed: an older exInt4 lock-picking cage handler, never used because a later exInt4 overrides it)
// ---- leviathan easter egg
const LEV_SPEECH = [
  "Did I ever tell you about my theory on fishing?",
  "You throw the same line, into the same water, expecting a different fish. Every. Single. Time.",
  "Cast, wait, reel. Cast, wait, reel. I have been watching you for hours.",
  "And now look who finally bit. Surprise. It is me, little fisher.",
  "Maybe the next cast will be different. It will not. Hehehe.",
  "Go on. Cast again. I will be right here.",
];
const subE = document.createElement("div");
subE.style.cssText =
  "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(env(safe-area-inset-bottom,0px) + 150px);max-width:90vw;background:rgba(0,0,0,.7);color:#fff;font:700 18px system-ui;padding:10px 16px;border-radius:14px;text-align:center;display:none;z-index:5";
document.body.appendChild(subE);
let kS = null;
function mkKraken() {
  const g = new THREE.Group(),
    dk = M(0x0b0f14, { roughness: 0.5, metalness: 0.25 }),
    rg = M(0x151b23, { roughness: 0.45 }),
    gl = EM(0xcfe8ff, 1.2),
    pts = [];
  for (let i = 0; i <= 36; i++) {
    const u = i / 36,
      a = u * Math.PI * 2.6;
    pts.push(
      new THREE.Vector3(
        Math.cos(a) * (3 - u * 1.6),
        u * 9 - 3,
        Math.sin(a) * (3 - u * 1.6),
      ),
    );
  }
  const cv = new THREE.CatmullRomCurve3(pts);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(cv, 140, 1.05, 12, false), dk));
  for (let i = 2; i < 60; i++) {
    const u = i / 60,
      p = cv.getPoint(u),
      tn = cv.getTangent(u),
      rr = 1.1 * (1 - u * 0.35),
      r = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.14, 6, 14), rg);
    r.position.copy(p);
    r.lookAt(p.clone().add(tn));
    g.add(r);
    if (i % 2 === 0) {
      const d = new THREE.Mesh(G.crown, gl);
      d.scale.setScalar(0.09);
      d.position
        .copy(p)
        .addScaledVector(new THREE.Vector3(tn.z, 0, -tn.x).normalize(), rr);
      g.add(d);
    }
    if (i % 4 === 0) {
      const sp = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.1, 5), dk);
      sp.position.set(p.x, p.y + rr + 0.4, p.z);
      g.add(sp);
    }
  }
  const hp = cv.getPoint(1),
    hd = new THREE.Mesh(G.crown, dk);
  hd.scale.set(1.5, 1.2, 1.9);
  hd.position.set(hp.x, hp.y + 0.4, hp.z);
  g.add(hd);
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(G.crown, EM(0xffe070, 2.4));
    e.scale.setScalar(0.2);
    e.position.set(hp.x + s * 0.7, hp.y + 0.8, hp.z + 1.4);
    g.add(e);
  });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * 6.283,
      c2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(hp.x, hp.y, hp.z),
        new THREE.Vector3(
          hp.x + Math.cos(a) * 2,
          hp.y + 1.4,
          hp.z + Math.sin(a) * 2,
        ),
        new THREE.Vector3(
          hp.x + Math.cos(a) * 4.5,
          hp.y - 0.4,
          hp.z + Math.sin(a) * 4.5,
        ),
        new THREE.Vector3(
          hp.x + Math.cos(a) * 6.5,
          hp.y - 4,
          hp.z + Math.sin(a) * 6.5,
        ),
      ]);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(c2, 40, 0.22, 8, false), dk));
    const e = c2.getPoint(1),
      tn = c2.getTangent(1),
      sp = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.6, 6), dk);
    sp.position.copy(e).addScaledVector(tn, 0.7);
    sp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tn);
    g.add(sp);
  }
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  return g;
}
function levEgg() {
  closeFish();
  if (kS) return;
  const g = mkKraken();
  g.scale.setScalar(2.7);
  g.position.set(bo[0] + dc * 8, SEA - 14, bo[1] + ds2 * 8);
  g.rotation.y = Math.atan2(-dc, -ds2);
  scene.add(g);
  kS = { g, t: 0, end: 999 };
  tone(50, 3, "sine", 0.25);
  toast("🌊 The sea trembles…");
  subE.style.display = "block";
  subE.textContent = "";
  if (window.speechSynthesis) {
    speechSynthesis.cancel();
    setTimeout(() => {
      LEV_SPEECH.forEach((l, i) => {
        const u = new SpeechSynthesisUtterance(l);
        u.pitch = 2;
        u.rate = 0.8;
        u.onstart = () => {
          if (kS) subE.textContent = l;
        };
        if (i === LEV_SPEECH.length - 1)
          u.onend = () => {
            if (kS) kS.end = kS.t + 1.5;
          };
        speechSynthesis.speak(u);
      });
    }, 3000);
  } else
    LEV_SPEECH.forEach((l, i) =>
      setTimeout(
        () => {
          if (kS) subE.textContent = l;
          if (i === LEV_SPEECH.length - 1 && kS) kS.end = kS.t + 4;
        },
        3000 + i * 4500,
      ),
    );
}
function kTick(dt, t) {
  if (!kS) return;
  kS.t += dt;
  const T = kS.t,
    rise = clamp(T / 3, 0, 1),
    sink = clamp((T - kS.end) / 3, 0, 1);
  kS.g.position.y =
    SEA -
    14 +
    14 * (1 - Math.pow(1 - rise, 3)) -
    14 * sink +
    Math.sin(t * 1.3) * 0.25;
  kS.g.rotation.y += dt * 0.05;
  if (T < 3 && Math.random() < dt * 20)
    burst(
      kS.g.position.x + (Math.random() - 0.5) * 6,
      SEA + 0.1,
      kS.g.position.z + (Math.random() - 0.5) * 6,
      0xffffff,
      2,
      2,
      3,
    );
  if (T > 3 && T < kS.end && Math.random() < dt * 7)
    tone(220 + Math.random() * 260, 0.05, "sine", 0.05);
  if (T > 48 && kS.end > 900) kS.end = T;
  if (sink >= 1) {
    scene.remove(kS.g);
    kS = null;
    subE.style.display = "none";
    subE.textContent = "";
    if (window.speechSynthesis) speechSynthesis.cancel();
  }
}
// ---- Tab panel (own overlay, switchable pages)
const tabP = document.createElement("div");
tabP.style.cssText =
  "position:fixed;inset:0;background:rgba(0,0,0,.55);display:none;z-index:7;align-items:center;justify-content:center;padding:10px";
document.body.appendChild(tabP);
let tabOn = false;
tabP.addEventListener("pointerdown", (e) => {
  if (e.target === tabP) closeTab();
});
function toggleTab() {
  if (!ready) return;
  if (tabOn) closeTab();
  else if (!modalOpen) openTab();
}
function closeTab() {
  tabOn = false;
  tabP.style.display = "none";
  modalOpen = false;
}
function openTab() {
  tabOn = true;
  modalOpen = true;
  goalPt = goalObj = null;
  tabP.style.display = "flex";
  renderTab();
}
addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Escape" && tabOn) closeTab();
  },
  true,
);
function renderTab() {
  const d = new Date(now()),
    hr = d.getHours() + d.getMinutes() / 60,
    hh =
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0"),
    ph =
      hr < 5
        ? "🌙 Night"
        : hr < 7
          ? "🌅 Dawn"
          : hr < 17
            ? "☀️ Day"
            : hr < 20
              ? "🌇 Dusk"
              : "🌙 Night",
    aq = Math.round((1 - pollution) * 100),
    i = inv(),
    B = (k) => (blockIds[k] || []).length,
    np = PP.filter((p) => EXF["pp_" + p[0]]).length;
  const ob = [
    [`Clear the trash (${TR0 - trashLeft}/${TR0})`, !trashLeft],
    [
      "Craft a Trash Converter 🏭 and make a plastic block 🔷",
      B("converter") > 0 && EXF.conv,
    ],
    [`Find the 3 purifier parts 🧽🌀🔌 (${np}/3)`, np === 3],
    [
      "Build a Generator ⚡ and an assembled Air Purifier ♻️",
      B("generator") > 0 && B("purifier") > 0,
    ],
    ["Catch a fish from the pier 🎣", EXF.fish],
    ["Brave the cave in the hill 🕳️", EXF.cave],
    ["Repair the boat ⛵ (tap it)", chap() >= 8],
    ["Rescue Twombly from the French police 🐱🚔", !!village.cat],
    [`Feed the Love Tree 🌸 (${gave()}/3000 🪙)`, gave() >= 3000],
  ];
  const cell =
    "border:2px solid var(--line);border-radius:14px;padding:10px 12px;margin:6px 0;background:var(--card)";
  let body = "";
  if (tabSel === 0)
    body = `<canvas id="mp" width="560" height="560" style="width:100%;border-radius:16px;border:2px solid var(--line);display:block"></canvas>`;
  if (tabSel === 1)
    body = ob
      .map(
        (o) =>
          `<div style="${cell};${o[1] ? "opacity:.6" : ""}">${o[1] ? "✅" : "⬜"} ${o[0]}</div>`,
      )
      .join("");
  if (tabSel === 2)
    body =
      RC.map((r) => {
        const ok = can(i, r[2]) && gold() >= r[4];
        return `<div style="${cell}">${ok ? "✅" : "⬜"} <b>${r[0]}</b><br><span class="mute" style="font-size:14px">${r[1]}</span><br><span style="font-size:14px">${Object.entries(
          r[2],
        )
          .map(([k, v]) => `${NM[k]} ${i[k] || 0}/${v}`)
          .join(" · ")}</span></div>`;
      }).join("") +
      `<div class="mute" style="margin-top:6px">Craft at the 🔨 workbench. Purifier parts 🧽🌀🔌 are found around the island.</div>`;
  if (tabSel === 3)
    body = `<img src="${PHOTO}" style="width:100%;border-radius:12px;border:8px solid #fff;box-shadow:0 4px 16px rgba(0,0,0,.3);display:block"><div style="text-align:center;font-weight:800;margin-top:8px">Us 💕</div>`;
  const tabs = ["🗺️ Map", "🎯 Goals", "🔨 Craft", "📸 Us"];
  tabP.innerHTML = `<div style="background:var(--card);color:var(--ink);border-radius:20px;width:min(94vw,600px);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.4);font-size:16px"><div style="padding:12px 14px 6px"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div><b style="font-size:24px">${hh}</b> <span class="mute" style="font-size:15px">${ph}</span></div><div style="flex:1;max-width:170px"><div class="mute" style="font-size:13px">Air quality ${aq}%</div><div class="bar" style="margin:3px 0"><i style="width:${aq}%;background:${aq > 66 ? "#5fc454" : aq > 33 ? "#e8b83a" : "#c0503a"}"></i></div></div><button id="tabx" style="border:0;background:var(--line);color:var(--ink);border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer">✕</button></div>
 <div style="display:flex;gap:6px;margin-top:10px">${tabs.map((t, k) => `<button data-tb="${k}" style="flex:1;padding:9px 2px;font-size:14px;font-weight:800;border-radius:12px;cursor:pointer;border:2px solid ${k === tabSel ? "var(--pink)" : "var(--line)"};background:${k === tabSel ? "var(--pink)" : "var(--card)"};color:${k === tabSel ? "#fff" : "var(--ink)"}">${t}</button>`).join("")}</div></div><div style="overflow:auto;padding:6px 14px 14px;-webkit-overflow-scrolling:touch">${body}</div></div>`;
  $("#tabx").onclick = closeTab;
  tabP.querySelectorAll("[data-tb]").forEach(
    (b) =>
      (b.onclick = () => {
        tabSel = +b.dataset.tb;
        renderTab();
      }),
  );
  if (tabSel === 0) {
    drawMap();
    const c = $("#mp").getContext("2d"),
      a = Math.atan2(I2Z, I2X),
      px = 280 + Math.cos(a) * 255,
      py = 280 + Math.sin(a) * 255;
    c.textAlign = "center";
    c.font = "22px serif";
    c.fillText("🇫🇷", px, py);
    c.font = "bold 14px system-ui";
    c.lineWidth = 4;
    c.strokeStyle = "#fff";
    c.strokeText("Police island", px, py + 22);
    c.fillStyle = "#3a2a3a";
    c.fillText("Police island", px, py + 22);
  }
}
// ---- per-frame
window.exTick = function (dt, t) {
  exTick3(dt, t);
  if (!ready) return;
  sailTick(dt, t);
  guardTick(dt, t);
  kTick(dt, t);
  items.forEach((it) => {
    if (
      it.kind === "pp" &&
      Math.hypot(me3.x - it.x, me3.z - it.z) < 14 &&
      Math.random() < dt * 1.2
    )
      burst(it.x, 0.9, it.z, 0xfff2a0, 1, 0.3, 0.6);
  });
};

// ===== v2.3 =====
const exTick4 = window.exTick;
pollution = 1;
function softTex(r, g, b) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d"),
    gr = x.createRadialGradient(32, 32, 2, 32, 32, 32);
  gr.addColorStop(0, `rgba(${r},${g},${b},.6)`);
  gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = gr;
  x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
SMOG.setHex(0x7d8248);
// ---- sickly air: haze sprites + screen tint + more flies
const hazeM = new THREE.SpriteMaterial({
    map: softTex(150, 150, 70),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: false,
  }),
  haze = [];
for (let i = 0; i < 42; i++) {
  const s = new THREE.Sprite(hazeM);
  s.scale.setScalar(16 + hs(i, 80, 1) * 16);
  s.userData = {
    ox: (hs(i, 81, 1) - 0.5) * 70,
    oy: 2 + hs(i, 82, 1) * 9,
    oz: (hs(i, 83, 1) - 0.5) * 70,
  };
  scene.add(s);
  haze.push(s);
}
const smogE = document.createElement("div");
smogE.style.cssText =
  "position:fixed;inset:0;pointer-events:none;z-index:3;opacity:0;background:radial-gradient(ellipse at center,rgba(120,130,60,0) 25%,rgba(95,105,35,.6) 100%)";
document.body.appendChild(smogE);
const caveVig = document.createElement("div");
caveVig.style.cssText =
  "position:fixed;inset:0;pointer-events:none;z-index:3;opacity:0;transition:opacity 1.2s;background:radial-gradient(circle at center,rgba(0,0,0,0) 22%,rgba(0,0,0,.6) 88%)";
document.body.appendChild(caveVig);
scene.remove(flies);
const FL2 = 520,
  flp2 = new Float32Array(FL2 * 3),
  flg2 = new THREE.BufferGeometry();
flg2.setAttribute("position", new THREE.BufferAttribute(flp2, 3));
const flies2 = new THREE.Points(
  flg2,
  new THREE.PointsMaterial({
    color: 0x111111,
    size: 0.17,
    map: new THREE.CanvasTexture(dotC),
    transparent: true,
    alphaTest: 0.3,
    depthWrite: false,
  }),
);
flies2.frustumCulled = false;
scene.add(flies2);
function flyTick(t) {
  const al = piles.filter((p) => !p.dead),
    n = clamp(Math.floor(FL2 * clamp(pollution * 1.15, 0, 1)), 0, FL2),
    np = al.length ? Math.floor(n * 0.7) : 0;
  for (let i = 0; i < n; i++) {
    let cx,
      cz,
      r = 0.8;
    if (i < np) {
      const p = al[i % al.length];
      cx = p.x;
      cz = p.z;
    } else {
      cx = me3.x;
      cz = me3.z;
      r = 5;
    }
    const k = 5 + (i % 5);
    flp2[i * 3] = cx + Math.sin(t * k + i * 2.3) * r;
    flp2[i * 3 + 1] =
      (i < np ? 0.5 : 1.6) +
      Math.abs(Math.sin(t * (3 + (i % 3)) + i)) * (i < np ? 0.9 : 1.4);
    flp2[i * 3 + 2] = cz + Math.cos(t * (k + 1) + i * 1.7) * r;
  }
  flg2.setDrawRange(0, n);
  flg2.attributes.position.needsUpdate = true;
  if (al.length && Math.random() < 0.05) {
    const p = al.reduce((a, b) =>
      Math.hypot(a.x - me3.x, a.z - me3.z) <
      Math.hypot(b.x - me3.x, b.z - me3.z)
        ? a
        : b,
    );
    if (Math.hypot(p.x - me3.x, p.z - me3.z) < 8)
      tone(170 + Math.random() * 30, 0.12, "sawtooth", 0.014 * pollution);
  }
}
// ---- collisions: altar, waterfall boulders, cave arch, police camp
function altY(x, z) {
  const d = Math.hypot(x, z + 10);
  return d < 3.1 ? 1.66 : d < 4 ? 1.35 : 0;
}
items.find((i) => i.root === altar).r = 0.95;
wf.updateMatrixWorld(true);
wf.children
  .filter((c) => RG.includes(c.geometry) && c.position.y < 1.5)
  .forEach((c) => {
    const w = wf.localToWorld(c.position.clone());
    COLL.push({ x: w.x, z: w.z, r: Math.max(c.scale.x, c.scale.z) * 0.8 });
  });
{
  const cv = items.find((i) => i.kind === "cave").root;
  cv.updateMatrixWorld(true);
  cv.children
    .filter((c) => RG.includes(c.geometry) && Math.abs(c.position.x) > 3)
    .forEach((c) => {
      const w = cv.localToWorld(c.position.clone());
      COLL.push({ x: w.x, z: w.z, r: Math.max(c.scale.x, c.scale.z) * 0.8 });
    });
  [-3.15, 3.15].forEach((x) => {
    const w = cv.localToWorld(new THREE.Vector3(x, 0, -2.2));
    COLL.push({ x: w.x, z: w.z, r: 1 });
  });
}

// ---- cave: stalactites that actually touch the ceiling, smooth light, close-up camera
{
  caveG.updateMatrixWorld(true);
  const dome = caveG.children.find(
    (c) => c.material && c.material.side === THREE.BackSide,
  );
  caveG.children
    .filter(
      (c) =>
        c.geometry && c.geometry.type === "ConeGeometry" && c.rotation.x > 3,
    )
    .forEach((c) => caveG.remove(c));
  const rc = new THREE.Raycaster(),
    stM = M(0x6a656e, { roughness: 0.9 });
  for (let i = 0; i < 46; i++) {
    const a = hs(i, 20, 1) * 6.283,
      r = Math.sqrt(hs(i, 21, 2)) * 5.2,
      x = Math.cos(a) * r,
      z = Math.sin(a) * r;
    rc.set(
      new THREE.Vector3(CVX + x, 0.6, CVZ + z),
      new THREE.Vector3(0, 1, 0),
    );
    const h = rc.intersectObject(dome)[0];
    if (!h) continue;
    const L2 = 0.7 + hs(i, 22, 3) * 1.7,
      c = new THREE.Mesh(
        new THREE.ConeGeometry(0.12 + hs(i, 23, 4) * 0.22, L2, 6),
        stM,
      );
    c.rotation.x = Math.PI;
    c.position.set(x, h.point.y - L2 / 2 + 0.2, z);
    caveG.add(c);
  }
}
let camStore = null;
function camWant() {
  const cp = Math.cos(pitch),
    sx = Math.sin(yaw) * cp,
    sy = Math.sin(pitch),
    sz = Math.cos(yaw) * cp;
  let d = dist;
  if (!inCave)
    for (let k = 1; k <= 14; k++) {
      const t = (k / 14) * dist,
        x = me3.x + sx * t,
        y = me3.y + 1.2 + sy * t,
        z = me3.z + sz * t;
      if (y < hm(x, z) + 0.9) {
        d = Math.max(2.5, t - 1);
        break;
      }
    }
  let x = me3.x + sx * d,
    y = me3.y + 1.2 + sy * d,
    z = me3.z + sz * d;
  if (inCave) {
    const r = Math.hypot(x - CVX, z - CVZ);
    if (r > 8.2) {
      x = CVX + ((x - CVX) * 8.2) / r;
      z = CVZ + ((z - CVZ) * 8.2) / r;
    }
    y = Math.min(y, 5.5);
  }
  return new THREE.Vector3(x, y, z);
}
function caveTick(dt, t) {
  scene.fog.far = inCave ? 34 : 220;
  sun.castShadow = !inCave;
  caveVig.style.opacity = inCave ? 1 : 0;
  if (!inCave) {
    cAmb.intensity = 0;
    cvLamp.intensity = 0;
    fig.visible = false;
    if (camStore) {
      dist += (camStore.d - dist) * Math.min(1, dt * 3);
      pitch += (camStore.p - pitch) * Math.min(1, dt * 3);
      if (Math.abs(dist - camStore.d) < 0.05) {
        dist = camStore.d;
        pitch = camStore.p;
        camStore = null;
      }
    }
    return;
  }
  if (!camStore) camStore = { d: dist, p: pitch };
  dist += (5.2 - dist) * Math.min(1, dt * 2.5);
  pitch += (0.42 - pitch) * Math.min(1, dt * 2.5);
  EXF.cave = 1;
  scene.fog.near = 4;
  scene.fog.color.setHex(0x120c1a);
  scene.background.setHex(0x120c1a);
  hemi.intensity = 0.5;
  sun.intensity = 0;
  cAmb.intensity = 1.05;
  cvLamp.intensity = 1.8 + Math.sin(t * 3.1) * 0.12 + Math.sin(t * 7.3) * 0.06;
  cvLamp.position.set(me3.x, me3.y + 2.2, me3.z);
  cvL.intensity =
    Math.sin(t * 0.9) > 0.985 ? 0.15 : 0.9 + Math.sin(t * 2.3) * 0.15;
  eyes.forEach((g) => {
    g.userData.t -= dt;
    if (g.userData.t <= 0) {
      g.visible = !g.visible && Math.random() < 0.5;
      g.userData.t = 0.6 + Math.random() * 3;
    }
  });
  cvNext -= dt;
  if (cvNext <= 0) {
    cvNext = 14 + Math.random() * 22;
    scare();
  }
  hb -= dt;
  if (hb <= 0) {
    hb = 1.1;
    tone(55, 0.14, "sine", 0.3);
    tone(50, 0.14, "sine", 0.25, 0.2);
  }
  if (Math.random() < dt * 0.5)
    tone(48 + Math.random() * 20, 2.2, "sawtooth", 0.05);
}
// ---- boat: real deck, seated pilot
{
  const rim = [];
  for (let a = 0; a < 6.28; a += 0.2) {
    const z = Math.sin(a);
    rim.push([
      Math.cos(a) * 1.02 * (1 - (z > 0 ? 0.8 : 0.5) * Math.pow(Math.abs(z), 3)),
      z * 3.05,
    ]);
  }
  const sh = new THREE.Shape();
  rim.forEach(([x, z], i) => (i ? sh.lineTo(x, -z) : sh.moveTo(x, -z)));
  sh.closePath();
  const dg = new THREE.ShapeGeometry(sh),
    dp = dg.attributes.position,
    du = dg.attributes.uv;
  for (let i = 0; i < du.count; i++)
    du.setXY(i, (dp.getX(i) + 1.1) / 2.2, ((dp.getY(i) + 3.2) / 6.4) * 5);
  const dw = woodTex();
  dw.repeat.set(1, 1);
  const deck = new THREE.Mesh(
    dg,
    new THREE.MeshStandardMaterial({
      map: dw,
      side: THREE.DoubleSide,
      roughness: 0.9,
    }),
  );
  deck.rotation.x = -Math.PI / 2;
  deck.position.y = 0.34;
  deck.receiveShadow = true;
  boatG.add(deck);
  boatG.children.forEach((c) => {
    if (
      c.geometry &&
      c.geometry.type === "BoxGeometry" &&
      Math.abs(c.geometry.parameters.height - 0.1) < 0.001
    )
      c.position.y = 0.62;
  });
}
// ---- waterfall foam
const foam = [];
{
  const fm = new THREE.SpriteMaterial({
    map: softTex(255, 255, 255),
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  for (let i = 0; i < 7; i++) {
    const s = new THREE.Sprite(fm);
    const z = 2.6 + hs(i, 90, 1) * 1.2,
      x = (hs(i, 91, 1) - 0.5) * 2.4,
      w = wf.localToWorld(new THREE.Vector3(x, 0.5, z));
    s.position.copy(w);
    s.userData.b = w.y;
    s.scale.setScalar(1.6);
    scene.add(s);
    foam.push(s);
  }
}
// ---- Tab: cycle pages with Tab / Shift+Tab / arrows, click or tap the page buttons
function drawMap() {
  const c = $("#mp").getContext("2d"),
    N = 240,
    im = c.createImageData(N, N),
    W = 136;
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const x = (i / N - 0.5) * W,
        z = (j / N - 0.5) * W,
        h = gh(x, z),
        s = (gh(x - 0.8, z - 0.8) - gh(x + 0.8, z + 0.8)) * 0.09;
      let r, g, b;
      if (h < SEA) {
        const d = clamp((SEA - h) / 1.2, 0, 1);
        r = 95 - 60 * d;
        g = 200 - 70 * d;
        b = 235 - 50 * d;
      } else if (h < 0.75) {
        r = 236;
        g = 216;
        b = 150;
      } else if (h < 2.2) {
        const k = clamp((h - 0.75) / 1.4, 0, 1);
        r = 120 - 20 * k;
        g = 205 - 45 * k;
        b = 95 - 20 * k;
      } else {
        const k = clamp((h - 2.2) / 6, 0, 1);
        r = 130 + 20 * k;
        g = 125 + 20 * k;
        b = 125 + 25 * k;
      }
      const o = (j * N + i) * 4;
      im.data[o] = clamp(r * (1 + s), 0, 255);
      im.data[o + 1] = clamp(g * (1 + s), 0, 255);
      im.data[o + 2] = clamp(b * (1 + s), 0, 255);
      im.data[o + 3] = 255;
    }
  const tc = document.createElement("canvas");
  tc.width = tc.height = N;
  tc.getContext("2d").putImageData(im, 0, 0);
  c.imageSmoothingEnabled = true;
  c.drawImage(tc, 0, 0, 560, 560);
  const mp = (x, z) => [(x / W + 0.5) * 560, (z / W + 0.5) * 560],
    pill = (e, l, p) => {
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillStyle = "#fff";
      c.strokeStyle = "#3a2a3a";
      c.lineWidth = 3;
      c.beginPath();
      c.arc(p[0], p[1], 20, 0, 6.283);
      c.fill();
      c.stroke();
      c.font = "24px serif";
      c.fillStyle = "#000";
      c.fillText(e, p[0], p[1] + 1);
      c.font = "bold 16px system-ui,sans-serif";
      const w = c.measureText(l).width + 14;
      c.fillStyle = "rgba(255,255,255,.92)";
      c.beginPath();
      c.roundRect
        ? c.roundRect(p[0] - w / 2, p[1] + 24, w, 22, 8)
        : c.rect(p[0] - w / 2, p[1] + 24, w, 22);
      c.fill();
      c.fillStyle = "#3a2a3a";
      c.fillText(l, p[0], p[1] + 35);
    };
  pill("💗", "Love altar", mp(0, -10));
  pill("🕳️", "Cave", mp(ENT[0], ENT[1]));
  pill("🎣", "Fishing dock", mp(DK.x + dc * 6, DK.z + ds2 * 6));
  pill(
    "⛵",
    chap() >= 8 ? "Your boat" : "Shipwreck",
    mp(boatItem.x, boatItem.z),
  );
  if (chap() >= 8 && !village.cat) {
    const a = Math.atan2(I2Z, I2X);
    pill("🇫🇷", "Police island", [
      280 + Math.cos(a) * 215,
      280 + Math.sin(a) * 215,
    ]);
  }
  if (!inCave) {
    const p = mp(clamp(me3.x, -66, 66), clamp(me3.z, -66, 66));
    c.save();
    c.translate(p[0], p[1]);
    c.rotate(Math.PI - me3.ry);
    c.fillStyle = "#e8283c";
    c.strokeStyle = "#fff";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(0, -14);
    c.lineTo(10, 10);
    c.lineTo(0, 5);
    c.lineTo(-10, 10);
    c.closePath();
    c.stroke();
    c.fill();
    c.restore();
  }
  c.font = "bold 22px system-ui";
  c.lineWidth = 4;
  c.strokeStyle = "#fff";
  c.strokeText("N ↑", 34, 28);
  c.fillStyle = "#222";
  c.fillText("N ↑", 34, 28);
}
const PAGES = ["🗺️ Map", "🎯 Quests", "🔨 Craft", "📸 Us", "🎮 Controls"];
function cycleTab(d) {
  tabSel = (tabSel + d + PAGES.length) % PAGES.length;
  renderTab();
  tone(600 + tabSel * 40, 0.06, "sine", 0.05);
}
function toggleTab() {
  if (!ready) return;
  if (!tabOn) {
    if (!modalOpen) openTab();
    return;
  }
  cycleTab(window.event && window.event.shiftKey ? -1 : 1);
}
{
  const nb = $("#tabb").cloneNode(true);
  $("#tabb").replaceWith(nb);
  nb.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    if (!ready) return;
    if (tabOn) closeTab();
    else if (!modalOpen) openTab();
  });
}
addEventListener(
  "keydown",
  (e) => {
    if (tabOn && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      e.preventDefault();
      e.stopPropagation();
      cycleTab(e.key === "ArrowRight" ? 1 : -1);
    }
  },
  true,
);
tabP.addEventListener("click", (e) => {
  const b = e.target.closest("[data-tb]");
  if (b) {
    tabSel = +b.dataset.tb;
    renderTab();
    return;
  }
  const n = e.target.closest("[data-nav]");
  if (n) {
    cycleTab(+n.dataset.nav);
    return;
  }
  if (e.target.closest("#tabx") || e.target === tabP) closeTab();
});
function renderTab() {
  const d = new Date(now()),
    hr = d.getHours() + d.getMinutes() / 60,
    hh =
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0"),
    ph =
      hr < 5
        ? "🌙 Night"
        : hr < 7
          ? "🌅 Dawn"
          : hr < 17
            ? "☀️ Day"
            : hr < 20
              ? "🌇 Dusk"
              : "🌙 Night",
    aq = Math.round((1 - pollution) * 100),
    i = inv(),
    B = (k) => (blockIds[k] || []).length,
    np = PP.filter((p) => EXF["pp_" + p[0]]).length,
    pur = Math.min(B("purifier"), B("generator") * 2),
    cell =
      "border:2px solid var(--line);border-radius:14px;padding:10px 12px;margin:6px 0;background:var(--card)",
    bar = (v, m) =>
      `<div class="bar" style="margin:6px 0 0"><i style="width:${clamp(v / m, 0, 1) * 100}%"></i></div>`,
    q = (t, done, p) =>
      `<div style="${cell};${done ? "opacity:.55" : ""}">${done ? "✅" : "⬜"} ${t}${p ? bar(p[0], p[1]) : ""}</div>`,
    hd = (t) => `<div style="font-weight:800;margin:12px 0 2px">${t}</div>`;
  let body = "";
  if (tabSel === 0)
    body = `<canvas id="mp" width="560" height="560" style="width:100%;max-width:min(560px,56vh);margin:0 auto;display:block;border-radius:16px;border:3px solid var(--line)"></canvas>`;
  if (tabSel === 1)
    body =
      hd("⛵ Main story") +
      q("Repair the boat (tap it)", chap() >= 8) +
      q("Rescue Twombly from the French police 🐱🚔", !!village.cat) +
      hd("🧹 Clean the island") +
      q(`Clear the trash (${TR0 - trashLeft}/${TR0})`, !trashLeft, [
        TR0 - trashLeft,
        TR0,
      ]) +
      q(
        "Craft a Trash Converter 🏭 and make a plastic block 🔷",
        B("converter") > 0 && EXF.conv,
      ) +
      q(`Find the purifier parts 🧽🌀🔌 (${np}/3)`, np === 3, [np, 3]) +
      q(
        `Build a Generator ⚡ and 2 Air Purifiers ♻️ (${pur}/2)`,
        B("generator") > 0 && pur >= 2,
        [pur, 2],
      ) +
      q(`Air quality ${aq}%`, aq >= 90, [aq, 100]) +
      hd("🧭 Explore") +
      q("Catch a fish from the dock 🎣", EXF.fish) +
      q("Brave the cave in the hill 🕳️", EXF.cave) +
      hd("💞 Together") +
      q(`Feed the Love Tree 🌸 (${gave()}/3000 🪙)`, gave() >= 3000, [
        gave(),
        3000,
      ]);
  if (tabSel === 2)
    body =
      RC.map((r) => {
        const ok = can(i, r[2]) && gold() >= r[4];
        return `<div style="${cell}">${ok ? "✅" : "⬜"} <b>${r[0]}</b><br><span class="mute" style="font-size:14px">${r[1]}</span><br><span style="font-size:14px">${Object.entries(
          r[2],
        )
          .map(([k, v]) => `${NM[k]} ${i[k] || 0}/${v}`)
          .join(" · ")}</span></div>`;
      }).join("") +
      `<div class="mute" style="margin-top:6px">Craft at the 🔨 workbench.</div>`;
  if (tabSel === 3)
    body = `<img src="${PHOTO}" style="width:100%;border-radius:12px;border:8px solid #fff;box-shadow:0 4px 16px rgba(0,0,0,.3);display:block"><div style="text-align:center;font-weight:800;margin-top:8px">Us 💕</div>`;
  if (tabSel === 4)
    body = [
      "🚶 WASD / arrows or the stick: move",
      "👆 Tap the ground or an object: walk there / use it",
      "🔄 Q / E or drag: turn the camera",
      "➡️ Tab: next page · Shift+Tab: previous · Esc: close",
      "1-9: hotbar · tap a placed block with a tool to break it",
      "⛵ Tap the boat to sail · 🕯️ the cave zooms the camera in",
    ]
      .map((t) => `<div style="${cell}">${t}</div>`)
      .join("");
  tabP.innerHTML = `<div style="background:var(--card);color:var(--ink);border-radius:20px;width:min(94vw,600px);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.4);font-size:16px"><div style="padding:12px 14px 6px"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><button data-nav="-1" style="border:0;background:var(--line);color:var(--ink);border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer">‹</button><div style="flex:1"><b style="font-size:22px">${hh}</b> <span class="mute" style="font-size:15px">${ph}</span><div class="mute" style="font-size:12px">Air quality ${aq}%</div><div class="bar" style="margin:2px 0"><i style="width:${aq}%;background:${aq > 66 ? "#5fc454" : aq > 33 ? "#e8b83a" : "#c0503a"}"></i></div></div><button data-nav="1" style="border:0;background:var(--line);color:var(--ink);border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer">›</button><button id="tabx" style="border:0;background:var(--line);color:var(--ink);border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer">✕</button></div>
 <div style="display:flex;gap:5px;margin-top:10px;overflow-x:auto">${PAGES.map((t, k) => `<button data-tb="${k}" style="flex:1 0 auto;padding:9px 10px;font-size:14px;font-weight:800;border-radius:12px;cursor:pointer;border:2px solid ${k === tabSel ? "var(--pink)" : "var(--line)"};background:${k === tabSel ? "var(--pink)" : "var(--card)"};color:${k === tabSel ? "#fff" : "var(--ink)"}">${t}</button>`).join("")}</div></div><div style="overflow:auto;padding:6px 14px 14px;-webkit-overflow-scrolling:touch">${body}</div></div>`;
  if (tabSel === 0) drawMap();
}
// ---- per-frame
let fpsE = 60,
  prC = Math.min(devicePixelRatio || 1, 2),
  prT = 0,
  wob = 0;
window.exTick = function (dt, t) {
  exTick4(dt, t);
  if (!ready) return;
  if (!inCave) {
    scene.fog.near = 38 - 32 * pollution;
    scene.fog.far = 230 - 170 * pollution;
  }
  hazeM.opacity = pollution * 0.2;
  haze.forEach((s) => {
    const u = s.userData;
    u.ox += dt * 0.6;
    s.position.set(
      me3.x + (((u.ox % 70) + 105) % 70) - 35,
      u.oy,
      me3.z + u.oz * 0.5 + Math.sin(t * 0.1 + u.oy) * 8,
    );
  });
  smogE.style.opacity = clamp(pollution * 0.9, 0, 1);
  wMat.opacity +=
    (((Math.hypot(me3.x - bp[0], me3.z - bp[1]) < 2.2 ||
      Math.hypot(me3.x - (AX + AO[0] * 2.5), me3.z - (AZ + AO[1] * 2.5)) <
        2.6 ||
      cam.position.distanceTo(
        wfC.set(AX + AO[0] * 2.5, AF + 1.5, AZ + AO[1] * 2.5),
      ) < 4.2) &&
    !inCave
      ? 0.18
      : 1) -
      wMat.opacity) *
    Math.min(1, dt * 6);
  foam.forEach((s, i) => {
    s.position.y = s.userData.b + Math.sin(t * 3 + i) * 0.12;
    s.scale.setScalar(1.5 + Math.sin(t * 2 + i * 2) * 0.3);
  });
  if (sailing) {
    me3.g.position.y -= 0.3;
    const u = me3.u;
    u.lL.rotation.x = u.lR.rotation.x = -1.3;
    u.aL.rotation.x = u.aR.rotation.x = -0.8;
  }
  fpsE += (1 / Math.max(dt, 0.001) - fpsE) * 0.05;
  prT += dt;
  if (prT > 2.5) {
    prT = 0;
    let n = prC;
    const mx = Math.min(devicePixelRatio || 1, 2);
    if (fpsE < 42) n = Math.max(0.7, prC - 0.15);
    else if (fpsE > 56) n = Math.min(mx, prC + 0.1);
    if (n !== prC) {
      prC = n;
      R.setPixelRatio(n);
      resize();
    }
  }
};

// ===== v3.0: weather, wasteland, restoration =====
const exTick5 = window.exTick;
Object.assign(EXF, X6.flags);
const flashE = document.createElement("div");
flashE.style.cssText =
  "position:fixed;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:4";
document.body.appendChild(flashE);
const WT = {
    type: "clear",
    t: 0,
    next: 150,
    tk: 0,
    tr: 0,
    k: 0,
    r: 0,
    ltT: 6,
    fulg: [],
  },
  WTD = { clear: [0, 0], cloudy: [0.35, 0], rain: [0.7, 0.7], storm: [1, 1] };
function setWX(ty, quiet) {
  WT.type = ty;
  const d = WTD[ty];
  WT.tk = d[0];
  WT.tr = d[1];
  WT.t = 0;
  WT.next = 150 + Math.random() * 240;
  if (!quiet && (ty === "rain" || ty === "storm"))
    toast(
      ty === "storm"
        ? "⛈️ A storm is rolling in… the sea is getting angry"
        : "🌧️ It starts to rain… your plants drink, the fish get bolder",
    );
}
const RN = 900,
  rnp = new Float32Array(RN * 6),
  rng = new THREE.BufferGeometry();
rng.setAttribute("position", new THREE.BufferAttribute(rnp, 3));
const rainL = new THREE.LineSegments(
  rng,
  new THREE.LineBasicMaterial({
    color: 0xaec6e8,
    transparent: true,
    opacity: 0.5,
  }),
);
rainL.frustumCulled = false;
scene.add(rainL);
const rD = Array.from({ length: RN }, (_, i) => [
  hs(i, 1, 100) * 44 - 22,
  hs(i, 2, 100) * 24,
  hs(i, 3, 100) * 44 - 22,
  16 + hs(i, 4, 100) * 8,
]);
let rainNode = null;
function rainSound(on) {
  if (!ac) return;
  if (!rainNode) {
    const b = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate),
      d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = ac.createBufferSource();
    s.buffer = b;
    s.loop = true;
    const f = ac.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1400;
    const g = ac.createGain();
    g.gain.value = 0;
    s.connect(f);
    f.connect(g);
    g.connect(ac.destination);
    s.start();
    rainNode = { g };
  }
  const tg2 = on && sound ? 0.12 * WT.r : 0;
  rainNode.g.gain.value += (tg2 - rainNode.g.gain.value) * 0.05;
}
const bolt = new THREE.Line(
  new THREE.BufferGeometry().setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(36), 3),
  ),
  new THREE.LineBasicMaterial({ color: 0xe8f0ff }),
);
bolt.visible = false;
bolt.frustumCulled = false;
scene.add(bolt);
const ltL = new THREE.PointLight(0xcfe0ff, 0, 45);
scene.add(ltL);
let boltT = 0;
function mkFulg(x, z) {
  const g = new THREE.Group(),
    m = EM(0xaee8ff, 1.6);
  for (let i = 0; i < 4; i++) {
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.6 + i * 0.1, 5), m);
    c.position.set(Math.cos(i * 1.6) * 0.15, 0.3, Math.sin(i * 1.6) * 0.15);
    c.rotation.z = (i - 1.5) * 0.15;
    g.add(c);
  }
  hitSph(g, 0.8, 0.4);
  const it = addItem({
    id: "fu" + Date.now(),
    kind: "fulg",
    x,
    z,
    r: 0,
    reach: 2,
    root: place(g, x, z),
    hint: "🌩️ Fulgurite, glass made by lightning: tap to collect",
  });
  it.born = now();
  WT.fulg.push(it);
  burst(x, 0.8, z, 0xaee8ff, 20, 3, 3);
}
function strike() {
  const a = Math.random() * 6.283,
    d = 14 + Math.random() * 26,
    x = me3.x + Math.cos(a) * d,
    z = me3.z + Math.sin(a) * d,
    h = hm(x, z),
    P = bolt.geometry.attributes.position;
  for (let i = 0; i < 12; i++) {
    const u = i / 11,
      j = i && i < 11 ? 3 : 0;
    P.setXYZ(
      i,
      x + (Math.random() - 0.5) * j,
      60 * (1 - u) + h * u,
      z + (Math.random() - 0.5) * j,
    );
  }
  P.needsUpdate = true;
  bolt.visible = true;
  boltT = 0.18;
  ltL.position.set(x, h + 4, z);
  ltL.intensity = 7;
  flashE.style.transition = "none";
  flashE.style.opacity = 0.55;
  setTimeout(() => {
    flashE.style.transition = "opacity .35s";
    flashE.style.opacity = 0;
  }, 40);
  setTimeout(() => {
    tone(45, 1.6, "sine", 0.35);
    tone(90, 0.9, "sawtooth", 0.12, 0.1);
  }, d * 18);
  if (h > 0.7 && WT.fulg.length < 2 && Math.random() < 0.7) mkFulg(x, z);
  if (Math.random() < 0.5) levUp = Math.max(levUp, 5);
}
function weatherTick(dt, t) {
  if (inCave) {
    rainL.visible = false;
    rainSound(false);
    return;
  }
  WT.t += dt;
  if (WT.t > WT.next) {
    const r = Math.random();
    setWX(r < 0.4 ? "clear" : r < 0.65 ? "cloudy" : r < 0.9 ? "rain" : "storm");
  }
  WT.k += (WT.tk - WT.k) * Math.min(1, dt * 0.25);
  WT.r += (WT.tr - WT.r) * Math.min(1, dt * 0.3);
  WXK = WT.k;
  WXR = WT.r;
  clouds.forEach((g) =>
    g.children.forEach((s) => s.material.color.setScalar(1 - 0.55 * WXK)),
  );
  const n = Math.floor(RN * WT.r);
  rainL.visible = n > 5;
  if (n > 5) {
    const P = rng.attributes.position;
    for (let i = 0; i < n; i++) {
      const p = rD[i];
      p[1] -= p[3] * dt;
      if (p[1] < 0) p[1] += 24;
      const x = me3.x + p[0],
        y = me3.y + p[1],
        z = me3.z + p[2];
      P.setXYZ(i * 2, x, y, z);
      P.setXYZ(i * 2 + 1, x - 0.12, y + 0.9, z - 0.04);
    }
    rng.setDrawRange(0, n * 2);
    P.needsUpdate = true;
    if (Math.random() < dt * 20 * WT.r)
      burst(
        me3.x + (Math.random() - 0.5) * 20,
        hm(me3.x, me3.z) + 0.1,
        me3.z + (Math.random() - 0.5) * 20,
        0xcfe6ff,
        1,
        0.3,
        0.8,
      );
  }
  rainSound(WT.r > 0.05);
  if (WT.type === "storm") {
    WT.ltT -= dt;
    if (WT.ltT <= 0) {
      WT.ltT = 4 + Math.random() * 9;
      strike();
    }
    levNext -= dt * 0.8;
  }
  if (boltT > 0) {
    boltT -= dt;
    ltL.intensity = Math.max(0, ltL.intensity - dt * 40);
    if (boltT <= 0) bolt.visible = false;
  }
  if (WT.r > 0.3)
    Object.values(PL).forEach((p) => {
      p.w = Math.max(p.w || 0, now() + WET * 0.5);
    });
  WT.fulg = WT.fulg.filter((it) => {
    if (now() - it.born > 150000) {
      IG.remove(it.root);
      const i = items.indexOf(it);
      if (i >= 0) items.splice(i, 1);
      return false;
    }
    return true;
  });
}
// ---- wasteland: most trees are gone, mud everywhere, they come back as the island heals
const DORM = [],
  GROW = [];
items
  .filter((i) => i.kind === "tree" || i.kind === "bush")
  .forEach((it, n) => {
    if (hs(n, 200, 1) > 0.16) {
      IG.remove(it.root);
      items.splice(items.indexOf(it), 1);
      DORM.push(it);
    }
  });
let revN = 0;
function reveal(n) {
  while (revN < n && revN < DORM.length) {
    const it = DORM[revN++];
    it.root.scale.setScalar(0.01);
    IG.add(it.root);
    items.push(it);
    it.gro = 0;
    GROW.push(it);
    burst(it.x, 0.5, it.z, 0x6fd25c, 10, 2, 2);
  }
}
function growTick(dt) {
  for (let i = GROW.length; i--;) {
    const it = GROW[i];
    it.gro += dt;
    const k = Math.min(1, it.gro / 1.6);
    it.root.scale.setScalar(Math.max(0.01, it.s0 * (1 - Math.pow(1 - k, 3))));
    if (k >= 1) GROW.splice(i, 1);
  }
}
const tcA = new Float32Array(tg.attributes.color.array),
  tcB = new Float32Array(tcA.length);
{
  const p = tg.attributes.position,
    k = new THREE.Color(),
    m = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const r = tcA[i * 3],
      g = tcA[i * 3 + 1],
      b = tcA[i * 3 + 2],
      x = p.getX(i),
      z = p.getZ(i),
      h = p.getY(i),
      sat = Math.max(r, g, b) - Math.min(r, g, b);
    m.setHex(vn(x / 2, z / 2, 120) > 0.55 ? 0x4a3a28 : 0x5e4d38).lerp(
      k.setHex(0x3a3028),
      vn(x / 6, z / 6, 121) * 0.6,
    );
    if (h < SEA + 0.6) m.setHex(0x8a7d62);
    if (sat < 0.1) m.setRGB(r * 0.8, g * 0.8, b * 0.8);
    tcB.set([m.r, m.g, m.b], i * 3);
  }
}
let lastRest = -1;
function applyRest(r) {
  const c = tg.attributes.color,
    a = c.array;
  for (let i = 0; i < a.length; i++) a[i] = tcB[i] + (tcA[i] - tcB[i]) * r;
  c.needsUpdate = true;
}
const PUD = 90;
let pudN = 0;
const pud = new THREE.InstancedMesh(
    new THREE.CircleGeometry(1, 14),
    M(0x2e2418, { roughness: 0.1, metalness: 0.35 }),
    PUD,
  ),
  pm = new THREE.Matrix4(),
  pq6 = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-Math.PI / 2, 0, 0),
  );
for (let i = 0; i < 3000 && pudN < PUD; i++) {
  const a = hs(i, 130, 1) * 6.283,
    d = Math.sqrt(hs(i, 131, 1)) * 36,
    x = Math.cos(a) * d,
    z = Math.sin(a) * d,
    h = hm(x, z);
  if (h < 0.8 || Math.hypot(x - HX, z - HZ) < 13) continue;
  const s = 0.5 + hs(i, 132, 1) * 1.4;
  pm.compose(
    new THREE.Vector3(x, h + 0.03, z),
    pq6,
    new THREE.Vector3(s, s * (0.6 + hs(i, 133, 1) * 0.6), 1),
  );
  pud.setMatrixAt(pudN++, pm);
}
pud.frustumCulled = false;
scene.add(pud);
const wMesh = scene.children.find((c) => c.geometry === wg);
const birds = [];
{
  const bm = new THREE.MeshBasicMaterial({
    color: 0xf4f4f4,
    side: THREE.DoubleSide,
  });
  for (let i = 0; i < 14; i++) {
    const g = new THREE.Group(),
      w1 = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.28), bm),
      w2 = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.28), bm);
    w1.position.x = -0.35;
    w2.position.x = 0.35;
    const a = new THREE.Group(),
      b = new THREE.Group();
    a.add(w1);
    b.add(w2);
    g.add(a, b);
    g.userData = {
      a,
      b,
      r: 14 + hs(i, 140, 1) * 34,
      an: hs(i, 141, 1) * 6.283,
      s: 0.12 + hs(i, 142, 1) * 0.12,
      y: 12 + hs(i, 143, 1) * 10,
      ph: hs(i, 144, 1) * 6,
    };
    g.visible = false;
    scene.add(g);
    birds.push(g);
  }
}
const rbG = new THREE.Group(),
  rbM = [];
[0xff4040, 0xff9a30, 0xffe040, 0x50d060, 0x40a0ff, 0x7060e0, 0xb060e0].forEach(
  (c, i) => {
    const m = new THREE.MeshBasicMaterial({
      color: c,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });
    rbG.add(
      new THREE.Mesh(
        new THREE.TorusGeometry(9 - i * 0.3, 0.17, 6, 48, Math.PI),
        m,
      ),
    );
    rbM.push(m);
  },
);
wf.add(rbG);
rbG.position.set(0, 0, 6);
function restoreTick(dt, t) {
  const rest = clamp(LANDV * 0.75 + AIRV * 0.25, 0, 1),
    h = new Date(now() + timeOff).getHours();
  if (Math.abs(rest - lastRest) > 0.012) {
    lastRest = rest;
    applyRest(rest);
  }
  reveal(Math.floor(DORM.length * clamp((rest - 0.12) / 0.82, 0, 1)));
  growTick(dt);
  if (window.GRS)
    GRS.count = Math.floor(GRSn * (0.08 + 0.92 * Math.pow(rest, 1.2)));
  if (window.FLW) FLW[0].count = FLW[1].count = Math.floor(FLWn * rest * rest);
  pudUpdate(rest);
  wMesh.material.color.setRGB(
    0.62 + 0.38 * rest,
    0.58 + 0.42 * rest,
    0.38 + 0.62 * rest,
  );
  rbM.forEach((m) => {
    m.opacity =
      h >= 7 && h <= 19 && WXR < 0.5
        ? clamp((rest - 0.7) / 0.3, 0, 1) * 0.5
        : 0;
  });
  const n = Math.floor(14 * clamp((rest - 0.25) / 0.7, 0, 1));
  birds.forEach((g, i) => {
    g.visible = i < n && !inCave;
    if (!g.visible) return;
    const u = g.userData;
    u.an += u.s * dt;
    g.position.set(
      Math.cos(u.an) * u.r,
      u.y + Math.sin(t + u.ph) * 1.2,
      Math.sin(u.an) * u.r,
    );
    g.rotation.y = -u.an;
    const f = Math.sin(t * 9 + u.ph) * 0.7;
    u.a.rotation.z = f;
    u.b.rotation.z = -f;
  });
  if (n > 2 && !inCave && Math.random() < dt * 0.15)
    tone(1800 + Math.random() * 900, 0.07, "sine", 0.03);
}
// ---- persistence of cleared trash and found parts
X6.clr.forEach((id) => {
  const it = items.find((i) => i.id === id);
  if (it) {
    it.dead = 1;
    IG.remove(it.root);
    items.splice(items.indexOf(it), 1);
    trashLeft--;
  }
});
PP.forEach(([k]) => {
  if (EXF["pp_" + k]) {
    const it = items.find((i) => i.id === "pp" + k);
    if (it) {
      IG.remove(it.root);
      items.splice(items.indexOf(it), 1);
    }
  }
});
pollution = clamp(1, 0, 1);
let svT = 0;

// ===== v3.0: fish book, cat, aquarium =====
const TIERS = {
  common: ["Common", "#8a8f98", 4, 1],
  rare: ["Rare", "#3a8ae0", 12, 2],
  golden: ["Golden", "#e8b020", 40, 3],
  angelic: ["Angelic", "#8ac8ff", 100, 5],
  goated: ["GOATED", "#ff6a2a", 250, 8],
  god: ["GOD", "#d040c8", 1000, 15],
};
const FISH = [
  [
    "sardine",
    "Sardine",
    "common",
    "#b8c8d8",
    "#7a8aa0",
    "p",
    "Tiny, shiny, forgettable. The sea's loose change.",
  ],
  [
    "mackerel",
    "Mackerel",
    "common",
    "#4a8ab0",
    "#2a5a7a",
    "p",
    "Zebra-striped speed demon.",
  ],
  [
    "bass",
    "Sea Bass",
    "common",
    "#8a9aa0",
    "#5a6a70",
    "",
    "Reliable. Dinner, mostly.",
  ],
  [
    "clown",
    "Clownfish",
    "common",
    "#ff8a2a",
    "#e06010",
    "p",
    "Lives in anemones. Not hard to find.",
  ],
  [
    "puffer",
    "Pufferfish",
    "common",
    "#e8d890",
    "#b8a860",
    "sk",
    "Inflates when scared. Relatable.",
  ],
  [
    "lion",
    "Lionfish",
    "common",
    "#c04030",
    "#802020",
    "pk",
    "Beautiful and venomous. Do not hug.",
  ],
  [
    "frog",
    "Frogfish",
    "common",
    "#c89a50",
    "#8a6a30",
    "l",
    "Walks on the seafloor and fishes with its own built-in lure.",
  ],
  [
    "blob",
    "Blobfish",
    "rare",
    "#f0b0b8",
    "#d08090",
    "b",
    "Looks normal in the deep. The surface pressure is what ruins it.",
  ],
  [
    "angler",
    "Anglerfish",
    "rare",
    "#3a3040",
    "#201828",
    "lt",
    "A glowing lantern on its head. Deep-sea nightlight.",
  ],
  [
    "mola",
    "Mola Mola",
    "rare",
    "#a8b8c0",
    "#7a8a92",
    "f",
    "The giant sunfish. Basically a swimming head.",
  ],
  [
    "fang",
    "Fangtooth",
    "rare",
    "#403828",
    "#201810",
    "te",
    "Biggest teeth of any fish for its size. It has sockets in its mouth roof to fit them.",
  ],
  [
    "barrel",
    "Barreleye",
    "rare",
    "#5a7a6a",
    "#3a5a4a",
    "xe",
    "Transparent head. Its green barrel eyes swivel inside.",
  ],
  [
    "wolf",
    "Wolf Eel",
    "rare",
    "#6a7a5a",
    "#4a5a3a",
    "tw",
    "Not an eel. Has a face only a mother could love.",
  ],
  [
    "pacu",
    "Pacu",
    "rare",
    "#c8a870",
    "#a08050",
    "t",
    "Piranha cousin with disturbingly human-looking teeth.",
  ],
  [
    "koi",
    "Golden Koi",
    "golden",
    "#ffd24a",
    "#e0a020",
    "gs",
    "Said to bring luck to whoever hooks it.",
  ],
  [
    "midas",
    "Midas Tuna",
    "golden",
    "#ffc830",
    "#c89010",
    "gp",
    "Everything it touches turns slightly shinier.",
  ],
  [
    "arowana",
    "Golden Arowana",
    "golden",
    "#ffe070",
    "#d0a030",
    "gw",
    "A dragon-fish of legend (and of very fancy aquariums).",
  ],
  [
    "gilded",
    "Gilded Carp",
    "golden",
    "#f0d060",
    "#b08820",
    "gz",
    "Scales like tiny coins. Do not spend.",
  ],
  [
    "halo",
    "Halo Angelfish",
    "angelic",
    "#f8f8ff",
    "#c8d8f8",
    "ga",
    "Glows softly. Probably judges your fishing.",
  ],
  [
    "oar",
    "Celestial Oarfish",
    "angelic",
    "#e8f0ff",
    "#a8c0ff",
    "rga",
    "Real oarfish are the longest bony fish alive, and inspired sea-serpent legends.",
  ],
  [
    "seraph",
    "Seraph Ray",
    "angelic",
    "#fff0f8",
    "#e8b8d8",
    "gaz",
    "Six shimmering wings. Fishing rules say it counts.",
  ],
  [
    "goat",
    "The G.O.A.T. Tuna",
    "goated",
    "#6a7a8a",
    "#3a4a5a",
    "hmg",
    "Greatest Of All Tuna. Horns, shades, attitude.",
  ],
  [
    "goatfish",
    "Goatfish Supreme",
    "goated",
    "#e87a5a",
    "#b04a3a",
    "wcg",
    "A real goatfish, with a crown. Whiskers of royalty.",
  ],
  [
    "marlin",
    "Gigachad Marlin",
    "goated",
    "#2a60b0",
    "#1a3a80",
    "kmg",
    "Jawline made of spear.",
  ],
  [
    "god",
    "The God Fish",
    "god",
    "#ff7ac8",
    "#c0309a",
    "W",
    "It hums. It glows. It is, undeniably, a very large vibrating wand. The sea has questions.",
  ],
];
const FIDX = {};
FISH.forEach((f, i) => (FIDX[f[0]] = i));
const fiCache = {};
function drawFish(g, W, H, s, sil) {
  const f = s[5],
    has = (c) => f.includes(c),
    c1 = sil ? "#2a2a30" : s[3],
    c2 = sil ? "#222228" : s[4];
  g.clearRect(0, 0, W, H);
  if (has("W")) {
    const cx = W / 2,
      cy = H / 2;
    if (!sil) {
      const gr = g.createRadialGradient(cx, cy, 10, cx, cy, W * 0.55);
      gr.addColorStop(0, "rgba(255,200,240,.7)");
      gr.addColorStop(1, "rgba(255,200,240,0)");
      g.fillStyle = gr;
      g.fillRect(0, 0, W, H);
      g.strokeStyle = "rgba(255,255,255,.8)";
      g.lineWidth = 3;
      for (let i = 1; i < 4; i++) {
        g.beginPath();
        g.arc(cx, cy, W * 0.3 + i * 10, -0.4, 0.4);
        g.stroke();
        g.beginPath();
        g.arc(cx, cy, W * 0.3 + i * 10, Math.PI - 0.4, Math.PI + 0.4);
        g.stroke();
      }
    }
    const gr2 = g.createLinearGradient(0, cy - H * 0.2, 0, cy + H * 0.2);
    gr2.addColorStop(0, sil ? "#2a2a30" : "#ffb0e6");
    gr2.addColorStop(1, sil ? "#2a2a30" : "#b02a8a");
    g.fillStyle = gr2;
    g.beginPath();
    g.moveTo(W * 0.12, cy);
    g.quadraticCurveTo(W * 0.12, cy - H * 0.17, W * 0.3, cy - H * 0.17);
    g.lineTo(W * 0.7, cy - H * 0.14);
    g.quadraticCurveTo(W * 0.9, cy - H * 0.14, W * 0.9, cy);
    g.quadraticCurveTo(W * 0.9, cy + H * 0.14, W * 0.7, cy + H * 0.14);
    g.lineTo(W * 0.3, cy + H * 0.17);
    g.quadraticCurveTo(W * 0.12, cy + H * 0.17, W * 0.12, cy);
    g.fill();
    if (!sil) {
      g.fillStyle = "#8a1a6a";
      g.fillRect(W * 0.62, cy - H * 0.15, W * 0.05, H * 0.3);
      g.fillStyle = "#fff";
      [
        [0.26, -0.06],
        [0.34, -0.06],
      ].forEach(([x, y]) => {
        g.beginPath();
        g.arc(W * x, cy + H * y, H * 0.045, 0, 6.283);
        g.fill();
      });
      g.fillStyle = "#000";
      [
        [0.265, -0.06],
        [0.345, -0.06],
      ].forEach(([x, y]) => {
        g.beginPath();
        g.arc(W * x, cy + H * y, H * 0.02, 0, 6.283);
        g.fill();
      });
      g.strokeStyle = "#6a0a4a";
      g.lineWidth = 3;
      g.beginPath();
      g.arc(W * 0.3, cy + H * 0.02, H * 0.05, 0.2, Math.PI - 0.2);
      g.stroke();
      g.strokeStyle = "#ffd24a";
      g.lineWidth = 3;
      g.beginPath();
      g.ellipse(W * 0.3, cy - H * 0.3, W * 0.1, H * 0.04, 0, 0, 6.283);
      g.stroke();
    }
    return;
  }
  const cx = W * 0.45,
    cy = H * 0.52,
    bw = W * 0.3,
    bh = H * (has("f") ? 0.34 : has("r") ? 0.1 : 0.18) * (has("b") ? 1.25 : 1),
    bwL = has("r") ? W * 0.38 : bw;
  if (has("g") && !sil) {
    const gr = g.createRadialGradient(cx, cy, 5, cx, cy, W * 0.5);
    gr.addColorStop(0, "rgba(255,240,150,.55)");
    gr.addColorStop(1, "rgba(255,240,150,0)");
    g.fillStyle = gr;
    g.fillRect(0, 0, W, H);
  }
  g.fillStyle = c2;
  g.beginPath();
  const tx = cx + bwL * 0.85;
  g.moveTo(tx, cy);
  g.lineTo(tx + W * 0.2, cy - bh * 1.2);
  g.lineTo(tx + W * 0.15, cy);
  g.lineTo(tx + W * 0.2, cy + bh * 1.2);
  g.closePath();
  g.fill();
  g.beginPath();
  g.moveTo(cx - bwL * 0.3, cy - bh * 0.8);
  g.quadraticCurveTo(cx, cy - bh * 1.9, cx + bwL * 0.4, cy - bh * 0.7);
  g.fill();
  g.fillStyle = c1;
  g.beginPath();
  g.ellipse(cx, cy, bwL, bh, 0, 0, 6.283);
  g.fill();
  g.save();
  g.beginPath();
  g.ellipse(cx, cy, bwL, bh, 0, 0, 6.283);
  g.clip();
  if (!sil) {
    g.fillStyle = "rgba(255,255,255,.22)";
    g.fillRect(cx - bwL, cy + bh * 0.2, bwL * 2, bh);
    if (has("p")) {
      g.fillStyle = "rgba(0,0,0,.26)";
      for (let i = 0; i < 4; i++)
        g.fillRect(
          cx - bwL * 0.5 + i * bwL * 0.35,
          cy - bh,
          bwL * 0.12,
          bh * 2,
        );
    }
    if (has("s")) {
      g.fillStyle = "rgba(255,255,255,.55)";
      for (let i = 0; i < 7; i++) {
        g.beginPath();
        g.arc(
          cx - bwL * 0.5 + hs(i, 1, 7) * bwL * 1.2,
          cy - bh * 0.5 + hs(i, 2, 7) * bh,
          3 + hs(i, 3, 7) * 3,
          0,
          6.283,
        );
        g.fill();
      }
    }
  }
  g.restore();
  if (has("k")) {
    g.fillStyle = c2;
    for (let i = 0; i < 6; i++) {
      g.beginPath();
      g.moveTo(cx - bwL * 0.7 + i * bwL * 0.28, cy - bh * 0.95);
      g.lineTo(cx - bwL * 0.6 + i * bwL * 0.28, cy - bh * 1.6);
      g.lineTo(cx - bwL * 0.5 + i * bwL * 0.28, cy - bh * 0.95);
      g.fill();
    }
  }
  const ex = cx - bwL * 0.62,
    ey = cy - bh * 0.25,
    er = has("e") ? bh * 0.42 : bh * 0.2;
  if (has("x") && !sil) {
    g.fillStyle = "rgba(190,235,255,.55)";
    g.beginPath();
    g.ellipse(ex + er * 0.6, ey - er * 0.4, er * 2.2, er * 2, 0, 0, 6.283);
    g.fill();
  }
  g.fillStyle = sil ? "#2a2a30" : has("x") ? "#6aff9a" : "#fff";
  g.beginPath();
  g.arc(ex, ey, er, 0, 6.283);
  g.fill();
  if (!sil) {
    g.fillStyle = "#000";
    g.beginPath();
    g.arc(ex - er * 0.15, ey, er * 0.5, 0, 6.283);
    g.fill();
  }
  const mx = cx - bwL * 0.95,
    my = cy + bh * 0.2;
  if (!sil) {
    g.strokeStyle = "rgba(0,0,0,.6)";
    g.lineWidth = 2;
    g.beginPath();
    if (has("b")) {
      g.moveTo(mx, my + 4);
      g.quadraticCurveTo(mx + bwL * 0.25, my - 8, mx + bwL * 0.5, my + 6);
    } else {
      g.moveTo(mx, my);
      g.lineTo(mx + bwL * 0.35, my + 2);
    }
    g.stroke();
  }
  if (has("t") && !sil) {
    g.fillStyle = "#fff";
    for (let i = 0; i < 5; i++) {
      g.beginPath();
      g.moveTo(mx + i * bwL * 0.08, my);
      g.lineTo(mx + i * bwL * 0.08 + 3, my + bh * 0.35);
      g.lineTo(mx + i * bwL * 0.08 + 6, my);
      g.fill();
    }
  }
  if (has("l")) {
    g.strokeStyle = sil ? "#2a2a30" : "#444";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(cx - bwL * 0.7, cy - bh * 0.8);
    g.quadraticCurveTo(
      cx - bwL * 1.1,
      cy - bh * 2.4,
      cx - bwL * 0.5,
      cy - bh * 2,
    );
    g.stroke();
    g.fillStyle = sil ? "#2a2a30" : "#ffe36a";
    g.beginPath();
    g.arc(cx - bwL * 0.5, cy - bh * 2, 7, 0, 6.283);
    g.fill();
  }
  if (has("w") && !sil) {
    g.strokeStyle = "#fff";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(mx, my + 3);
    g.lineTo(mx - 14, my + 12);
    g.moveTo(mx + 4, my + 3);
    g.lineTo(mx - 8, my + 16);
    g.stroke();
  }
  if (has("h")) {
    g.fillStyle = sil ? "#2a2a30" : "#f4ecd0";
    [-1, 1].forEach((s, i) => {
      g.beginPath();
      g.moveTo(cx - bwL * 0.5 + i * 14, cy - bh * 0.8);
      g.quadraticCurveTo(
        cx - bwL * 0.5 + i * 14 - 8 + s * 10,
        cy - bh * 2.4,
        cx - bwL * 0.5 + i * 14 + s * 22,
        cy - bh * 2.2,
      );
      g.quadraticCurveTo(
        cx - bwL * 0.5 + i * 14 + s * 8,
        cy - bh * 1.5,
        cx - bwL * 0.5 + i * 14 + 8,
        cy - bh * 0.8,
      );
      g.fill();
    });
  }
  if (has("m") && !sil) {
    g.fillStyle = "#000";
    g.fillRect(ex - er * 1.4, ey - er * 0.9, er * 2.8, er * 1.6);
  }
  if (has("a")) {
    g.strokeStyle = sil ? "#2a2a30" : "#ffe36a";
    g.lineWidth = 4;
    g.beginPath();
    g.ellipse(
      cx - bwL * 0.5,
      cy - bh * 1.9,
      bwL * 0.28,
      bh * 0.18,
      0,
      0,
      6.283,
    );
    g.stroke();
  }
  if (has("c") && !sil) {
    g.fillStyle = "#ffd24a";
    g.beginPath();
    const bx = cx - bwL * 0.5,
      by = cy - bh * 0.85;
    g.moveTo(bx - 16, by);
    g.lineTo(bx - 16, by - 18);
    g.lineTo(bx - 8, by - 8);
    g.lineTo(bx, by - 22);
    g.lineTo(bx + 8, by - 8);
    g.lineTo(bx + 16, by - 18);
    g.lineTo(bx + 16, by);
    g.fill();
  }
  if (has("z") && !sil) {
    g.fillStyle = "#fff";
    [
      [0.1, 0.2],
      [0.85, 0.25],
      [0.25, 0.85],
      [0.8, 0.8],
    ].forEach(([x, y]) => {
      const X2 = W * x,
        Y2 = H * y;
      g.beginPath();
      g.moveTo(X2, Y2 - 8);
      g.lineTo(X2 + 2, Y2 - 2);
      g.lineTo(X2 + 8, Y2);
      g.lineTo(X2 + 2, Y2 + 2);
      g.lineTo(X2, Y2 + 8);
      g.lineTo(X2 - 2, Y2 + 2);
      g.lineTo(X2 - 8, Y2);
      g.lineTo(X2 - 2, Y2 - 2);
      g.fill();
    });
  }
}
function fishIcon(id, sil, w) {
  const key = id + (sil ? "s" : "") + (w || 160),
    i = FIDX[id];
  if (fiCache[key]) return fiCache[key];
  const c = document.createElement("canvas");
  c.width = w || 160;
  c.height = Math.round((w || 160) * 0.62);
  drawFish(c.getContext("2d"), c.width, c.height, FISH[i], sil);
  return (fiCache[key] = c.toDataURL());
}
// ---- catching
function catchFish() {
  const wx = WT.type,
    h = new Date(now() + timeOff).getHours(),
    night = h >= 20 || h < 6,
    rod = X6.cave.rod ? 2 : 1,
    w = { common: 60, rare: 26, golden: 8, angelic: 3, goated: 1.2, god: 0 };
  if (wx === "rain") {
    w.rare *= 1.6;
    w.golden *= 1.5;
    w.angelic *= 2;
  }
  if (wx === "storm") {
    w.rare *= 2;
    w.golden *= 2;
    w.angelic *= 3;
    w.goated *= 3;
    if (night) w.god = 0.5;
  }
  w.golden *= rod;
  w.angelic *= rod;
  w.goated *= rod;
  if (w.god) w.god *= rod;
  if (Math.random() < 0.08) {
    const junk = Math.random() < 0.5;
    fpR(
      junk ? "You reeled in an old boot 🥾" : "A rusty can! +1 🗑️",
      "Cast again 🎣",
    );
    if (!junk) addInv({ trash: 1 });
    return;
  }
  let r = Math.random() * Object.values(w).reduce((a, b) => a + b, 0),
    tier = "common";
  for (const k in w) {
    if (r < w[k]) {
      tier = k;
      break;
    }
    r -= w[k];
  }
  const pool = FISH.filter((f) => f[2] === tier),
    f = pool[Math.floor(Math.random() * pool.length)],
    T = TIERS[tier],
    first = !X6.fb[f[0]];
  X6.fb[f[0]] = (X6.fb[f[0]] || 0) + 1;
  EXF.fish = 1;
  sv6();
  award(first ? T[2] : Math.ceil(T[2] / 4));
  if (first || tier !== "common") {
    fpR(`${first ? "NEW SPECIES! " : ""}${f[1]} (${T[0]})`, "Cast again 🎣");
    setTimeout(() => fishCard(f[0], true), 400);
  } else
    fpR(
      "You caught a " + f[1] + " 🐟 +" + Math.ceil(T[2] / 4) + " 🪙",
      "Cast again 🎣",
    );
  if (tier === "god") {
    jingle([262, 330, 392, 523, 659, 784, 1047, 1319]);
    burst(me3.x, 2, me3.z, 0xff7ac8, 60, 4, 4);
  } else if (tier === "goated" || tier === "angelic")
    jingle([523, 659, 784, 1047]);
  tone(660, 0.15, "sine", 0.1);
}
function fishCard(id, fresh) {
  const f = FISH[FIDX[id]],
    T = TIERS[f[2]];
  showModal(
    `${X}<div style="text-align:center"><div class="mute">${fresh ? "🎉 Fish book updated" : "Fish book"}</div><h2 style="margin:4px 0">${f[1]}</h2><div style="display:inline-block;padding:2px 12px;border-radius:12px;background:${T[1]};color:#fff;font-weight:800;font-size:13px">${T[0]}</div><img src="${fishIcon(id, false, 300)}" style="width:100%;max-width:300px;display:block;margin:8px auto"><p>${f[6]}</p><div class="mute">Caught: ${X6.fb[id] || 0} · Worth ${T[2]} 🪙</div></div>`,
  );
  $("#x").onclick = closeModal;
}
// ---- Twombly: feed fish, affection, gifts
function exCat() {
  const aff = X6.cat.aff,
    lv = Math.floor(aff / 3),
    own = FISH.filter((f) => X6.fb[f[0]] > 0);
  showModal(
    `${X}<h2>🐱 Twombly</h2><div class="mute">Bond ${aff} · Level ${lv} ${lv >= 2 ? "· digs up coins for you" : "· feed him fish to bond"}</div><p>Tap a fish to feed him:</p>${own.length ? own.map((f) => `<button data-feed="${f[0]}">${f[1]} ×${X6.fb[f[0]]}</button>`).join("") : "<p class='mute'>You have no fish yet. Try the dock! 🎣</p>"}<br><button id="pt">Just pet him</button>`,
  );
  $("#x").onclick = closeModal;
  document.querySelectorAll("[data-feed]").forEach(
    (b) =>
      (b.onclick = () => {
        const id = b.dataset.feed,
          f = FISH[FIDX[id]];
        if (!(X6.fb[id] > 0)) return;
        X6.fb[id]--;
        const pts = TIERS[f[2]][3];
        X6.cat.aff += pts;
        sv6();
        burst(catItem.x, 1, catItem.z, 0xff7aa2, 14, 1.5, 3);
        tone(880, 0.3, "sine", 0.1);
        closeModal();
        toast(
          id === "god"
            ? "Twombly stares at it. He is concerned. Bond +" + pts
            : "Nom nom! Twombly loves it. Bond +" + pts,
        );
        if (Math.floor(X6.cat.aff / 3) > lv)
          setTimeout(
            () =>
              toast(
                "💕 Twombly reached level " + Math.floor(X6.cat.aff / 3) + "!",
              ),
            1800,
          );
      }),
  );
  $("#pt").onclick = () => {
    closeModal();
    burst(catItem.x, 1, catItem.z, 0xff7aa2, 10, 1.2, 3);
    tone(880, 0.3, "sine", 0.08);
    toast("Purr…");
  };
}
function catTick() {
  if (!village.cat || !catItem || inCave) return;
  const lv = Math.floor(X6.cat.aff / 3);
  if (lv >= 2 && now() - X6.cat.gift > 180000) {
    X6.cat.gift = now();
    sv6();
    burst(catItem.x, 1, catItem.z, 0xffd24a, 16, 2, 3);
    award(6 * lv);
    toast("🐱 Twombly dug up a coin for you!");
  }
}
// ---- aquarium (furniture)
const AQ = [];
function mkAquarium(d) {
  const g = new THREE.Group(),
    wd = M(0x8a5a3a),
    gl = new THREE.MeshStandardMaterial({
      color: 0x9fe6ff,
      transparent: true,
      opacity: 0.28,
      roughness: 0.05,
    }),
    wt3 = new THREE.MeshStandardMaterial({
      color: 0x4aa8e6,
      transparent: true,
      opacity: 0.35,
      emissive: 0x1a5a9a,
      emissiveIntensity: 0.3,
    });
  const b = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 1.1), wd);
  b.position.y = 0.25;
  b.castShadow = true;
  g.add(b);
  const w2 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.95, 0.9), wt3);
  w2.position.y = 1;
  g.add(w2);
  const sd = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.1, 0.9), M(0xe9d79a));
  sd.position.y = 0.55;
  g.add(sd);
  const gx = new THREE.Mesh(new THREE.BoxGeometry(1.75, 1, 0.95), gl);
  gx.position.y = 1;
  g.add(gx);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.1, 1.1), wd);
  lid.position.y = 1.55;
  g.add(lid);
  for (let i = 0; i < 3; i++) {
    const p = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.45, 5),
      M(0x3fae5a),
    );
    p.position.set(-0.6 + i * 0.25, 0.82, -0.25 + (i % 2) * 0.2);
    g.add(p);
  }
  const fl = new THREE.Group();
  g.add(fl);
  g.userData.fl = fl;
  g.userData.fish = [];
  hitSph(g, 1.1, 0.8);
  return g;
}
function aqRefresh(a) {
  const g = a.root,
    fl = g.userData.fl;
  fl.children.slice().forEach((c) => fl.remove(c));
  a.fm = [];
  (a.d.fish || []).forEach((id, i) => {
    const f = FISH[FIDX[id]],
      m = M(new THREE.Color(f[3]).getHex()),
      fg = new THREE.Group(),
      bd = new THREE.Mesh(G.crown, m),
      tl = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.2, 4),
        M(new THREE.Color(f[4]).getHex()),
      );
    bd.scale.set(0.2, 0.1, 0.08);
    tl.rotation.z = 1.57;
    tl.position.x = -0.22;
    fg.add(bd, tl);
    fg.userData = { ph: i * 1.7, sp: 0.5 + i * 0.12, y: 0.95 + (i % 2) * 0.18 };
    fl.add(fg);
    a.fm.push(fg);
  });
}
function addAquarium(d, fresh) {
  const g = mkAquarium(d),
    a = addItem({
      id: "aq" + Math.random().toString(36).slice(2),
      kind: "decor",
      d,
      x: d.x,
      z: d.z,
      r: 0.9,
      reach: 2.4,
      root: place(g, d.x, d.z, d.y),
      hint: "🐠 Aquarium: tap to manage",
    });
  g.rotation.y = d.ry || 0;
  AQ.push(a);
  aqRefresh(a);
  return a;
}
function aqTick(t) {
  AQ.forEach((a) =>
    a.fm.forEach((f) => {
      const u = f.userData,
        x = Math.sin(t * u.sp + u.ph) * 0.65;
      f.position.set(
        x,
        u.y + Math.sin(t * 1.3 + u.ph) * 0.05,
        Math.sin(t * u.sp * 0.7 + u.ph) * 0.25,
      );
      f.rotation.y = Math.cos(t * u.sp + u.ph) > 0 ? 0 : Math.PI;
    }),
  );
}
function aqMenu(a) {
  const own = FISH.filter((f) => X6.fb[f[0]] > 0),
    cur = a.d.fish || [];
  showModal(
    `${X}<h2>🐠 Aquarium</h2><div class="mute">${cur.length}/4 fish swimming</div>${cur.map((id, i) => `<button data-rm="${i}">Remove ${FISH[FIDX[id]][1]}</button>`).join("")}<p>Add a fish from your collection:</p>${own.length ? own.map((f) => `<button data-add="${f[0]}">${f[1]} ×${X6.fb[f[0]]}</button>`).join("") : "<p class='mute'>Catch fish first 🎣</p>"}<br><button id="pk">📦 Pick the aquarium up</button>`,
  );
  $("#x").onclick = closeModal;
  document.querySelectorAll("[data-add]").forEach(
    (b) =>
      (b.onclick = () => {
        if ((a.d.fish || []).length >= 4) return toast("The tank is full");
        const id = b.dataset.add;
        if (!(X6.fb[id] > 0)) return;
        X6.fb[id]--;
        a.d.fish = (a.d.fish || []).concat(id);
        aqRefresh(a);
        sv6();
        closeModal();
        toast("Splash! 🐟");
      }),
  );
  document.querySelectorAll("[data-rm]").forEach(
    (b) =>
      (b.onclick = () => {
        const id = a.d.fish.splice(+b.dataset.rm, 1)[0];
        X6.fb[id] = (X6.fb[id] || 0) + 1;
        aqRefresh(a);
        sv6();
        closeModal();
      }),
  );
  $("#pk").onclick = () => {
    (a.d.fish || []).forEach((id) => (X6.fb[id] = (X6.fb[id] || 0) + 1));
    IG.remove(a.root);
    items.splice(items.indexOf(a), 1);
    AQ.splice(AQ.indexOf(a), 1);
    X6.dec.splice(X6.dec.indexOf(a.d), 1);
    addInv({ aquarium: 1 }, "📦 Aquarium picked up");
    sv6();
    closeModal();
  };
}
function placeAquarium() {
  const i = inv();
  if (!(i.aquarium > 0))
    return toast("Craft an aquarium at the workbench first");
  const x = me3.x + Math.sin(me3.ry) * 2.2,
    z = me3.z + Math.cos(me3.ry) * 2.2;
  if (hm(x, z) < 0.6 || inCave || sailing)
    return toast("Find solid ground to place it");
  saveMe({ inv: pay(i, { aquarium: 1 }) });
  const d = { t: "aquarium", x, z, y: hm(x, z), ry: me3.ry, fish: [] };
  X6.dec.push(d);
  addAquarium(d);
  sv6();
  toast("🐠 Aquarium placed. Tap it to add fish.");
  burst(x, 1, z, 0x4aa8e6, 16, 2, 2);
}
X6.dec.forEach((d) => addAquarium(d));
{
  const wn = RC.find((r) => r[0] === "Purifier");
  RC.push([
    "Aquarium",
    "6🪟 + 4🟫 + 2🔷 → 1🐠",
    { glass: 6, plank: 4, plastic: 2 },
    { aquarium: 1 },
    0,
  ]);
}
Object.assign(NM, { aquarium: "🐠" });

// ===== v3.0: blocks, tab pages, map, settings, photo mode =====
BTX.door = atlas(
  (g) => {
    fillN(g, [150, 100, 56], 14, 21);
    for (let x = 0; x < 16; x += 4) Rc(g, x, 0, 1, 16, "rgba(60,36,16,.35)");
    Rc(g, 2, 1, 5, 6, "#7a5230");
    Rc(g, 9, 1, 5, 6, "#7a5230");
    Rc(g, 2, 9, 5, 6, "#7a5230");
    Rc(g, 9, 9, 5, 6, "#7a5230");
    Rc(g, 3, 2, 3, 4, "#a4743e");
    Rc(g, 10, 2, 3, 4, "#a4743e");
    Rc(g, 3, 10, 3, 4, "#a4743e");
    Rc(g, 10, 10, 3, 4, "#a4743e");
    Rc(g, 12, 8, 2, 2, "#f0c040");
    Rc(g, 0, 0, 16, 1, "#4a3016");
    Rc(g, 0, 15, 16, 1, "#4a3016");
  },
  (g) => fillN(g, [130, 88, 50], 12, 22),
);
BTX.window = atlas(
  (g) => {
    Rc(g, 0, 0, 16, 16, "#7a5230");
    g.clearRect(2, 2, 12, 12);
    Rc(g, 2, 2, 12, 12, "rgba(190,230,255,.38)");
    Rc(g, 7, 2, 2, 12, "#7a5230");
    Rc(g, 2, 7, 12, 2, "#7a5230");
    for (let i = 3; i < 6; i++) Rc(g, i, i, 1, 1, "rgba(255,255,255,.9)");
    Rc(g, 0, 0, 16, 1, "#4a3016");
    Rc(g, 0, 15, 16, 1, "#4a3016");
  },
  (g) => fillN(g, [130, 88, 50], 12, 23),
);
BTX.roof = atlas(
  (g) => {
    Rc(g, 0, 0, 16, 16, "#6a2a1c");
    for (let r = 0; r < 4; r++)
      for (let k = -1; k < 3; k++) {
        const x = k * 6 + (r % 2 ? 3 : 0) + 1,
          y = r * 4;
        Rc(g, x, y, 6, 3, rgb([192, 84, 56], (hs(k, r, 24) - 0.5) * 26));
        Rc(g, x, y + 3, 6, 1, "#4a1c10");
        Rc(g, x + 5, y, 1, 3, "#8a3a26");
      }
  },
  (g) => {
    for (let r = 0; r < 4; r++)
      for (let k = -1; k < 3; k++) {
        const x = k * 6 + (r % 2 ? 3 : 0) + 1,
          y = r * 4;
        Rc(g, x, y, 6, 3, rgb([200, 92, 60], (hs(k, r, 25) - 0.5) * 26));
      }
    Rc(g, 0, 0, 16, 1, "#4a1c10");
  },
  (g) => fillN(g, [130, 88, 50], 12, 26),
);
BTX.bed = atlas(
  (g) => {
    fillN(g, [240, 236, 230], 8, 27);
    Rc(g, 0, 4, 16, 6, "#b8324a");
    Rc(g, 0, 4, 16, 1, "#d8586c");
    Rc(g, 0, 10, 16, 6, "#7a5230");
    Rc(g, 0, 10, 16, 1, "#4a3016");
    Rc(g, 1, 12, 2, 4, "#4a3016");
    Rc(g, 13, 12, 2, 4, "#4a3016");
  },
  (g) => {
    Rc(g, 0, 0, 16, 16, "#b8324a");
    for (let i = 0; i < 16; i += 3) Rc(g, 0, i, 16, 1, "rgba(120,20,40,.35)");
    Rc(g, 3, 1, 10, 5, "#f4f0ea");
    Rc(g, 3, 1, 10, 1, "#fff");
    Rc(g, 3, 5, 10, 1, "#c8c2b8");
    Rc(g, 0, 0, 16, 1, "#8a2236");
    Rc(g, 0, 15, 16, 1, "#8a2236");
  },
  (g) => fillN(g, [110, 76, 44], 12, 28),
);
Object.assign(NM, { door: "🚪", window: "🖼️", roof: "🏠", bed: "🛏️" });
RC.push(
  ["Door", "3🟫 → 1🚪", { plank: 3 }, { door: 1 }, 0],
  ["Window", "1🪟 + 2🟫 → 2🖼️", { glass: 1, plank: 2 }, { window: 2 }, 0],
  ["Roof tile", "2🧱 + 1🟫 → 4🏠", { brick: 2, plank: 1 }, { roof: 4 }, 0],
  ["Bed", "3🟫 + 2🟨 → 1🛏️", { plank: 3, thatch: 2 }, { bed: 1 }, 0],
);
["door", "window", "roof", "bed"].forEach((k) => {
  const im = blockMeshes[k],
    geo = new THREE.BoxGeometry(1, 1, 1),
    uv = geo.attributes.uv;
  for (let f = 0; f < 6; f++) {
    const col = f === 2 ? 1 : f === 3 ? 2 : 0;
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setX(i, (uv.getX(i) + col) / 3);
    }
  }
  im.geometry = geo;
  const o = { map: BTX[k], roughness: 0.85 };
  if (k === "window") {
    o.transparent = true;
    o.roughness = 0.1;
  }
  im.material = M(0xffffff, o);
  im.receiveShadow = true;
});
rebuildBlocks();
const BIC = {};
function bIcon(k) {
  if (BIC[k]) return BIC[k];
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = false;
  g.drawImage(BTX[k].image, 0, 0, 16, 16, 0, 0, 64, 64);
  return (BIC[k] = c.toDataURL());
}
const BLK = [
    [
      "🏠 Building",
      ["plank", "brick", "thatch", "roof", "door", "window", "glass", "bed"],
    ],
    ["💡 Decor", ["heart", "lantern"]],
    ["⚙️ Machines", ["generator", "converter", "purifier", "plastic"]],
  ],
  BNM = {
    plank: "Planks",
    brick: "Bricks",
    glass: "Glass",
    thatch: "Thatch",
    heart: "Heart block",
    lantern: "Lantern",
    purifier: "Air purifier",
    generator: "Generator",
    converter: "Trash converter",
    plastic: "Plastic block",
    door: "Door",
    window: "Window",
    roof: "Roof tile",
    bed: "Bed",
  },
  BDS = {
    plank: "Floors and walls",
    brick: "Strong walls",
    thatch: "Cozy and rustic",
    roof: "Red tile roofing",
    door: "Walk straight through it",
    window: "Light for your home",
    glass: "Clear panes",
    bed: "Tap it to sleep until morning",
    heart: "A glowing love block",
    lantern: "Warm light at night",
    generator: "Powers 2 purifiers anywhere. Tap it for status",
    converter: "Tap to turn 3 trash into 1 plastic",
    purifier: "Cleans the air. Needs a generator ⚡ + 3 parts you can craft",
    plastic: "Recycled plastic",
  };
SL.length = 6;
SL[5] = ["plank", "🟫"];
function useBlock(k) {
  SL[5] = [k, NM[k]];
  slot = 5;
  hud();
  closeTab();
  toast("Placing " + BNM[k] + " blocks 🧱");
}
function exSleep() {
  showModal(
    `${X}<h2>🛏️ Sleep?</h2><p>Rest until morning. The weather clears and a new day begins.</p><button id="sl" class="on">Sleep 💤</button><button id="nx2">Not now</button>`,
  );
  $("#x").onclick = $("#nx2").onclick = closeModal;
  $("#sl").onclick = () => {
    closeModal();
    bf.style.opacity = 1;
    bf.textContent = "💤";
    setTimeout(() => {
      const d = new Date(now() + timeOff),
        h = d.getHours() + d.getMinutes() / 60;
      skipToMorning();
      setWX("clear", true);
      toast(
        "☀️ Good morning!" +
          (LASTSLEEP && (LASTSLEEP.a > 0.0005 || LASTSLEEP.l > 0.0005)
            ? " Overnight: air +" +
              (LASTSLEEP.a * 100).toFixed(1) +
              "%, land +" +
              (LASTSLEEP.l * 100).toFixed(1) +
              "%"
            : ""),
      );
      bf.textContent = "";
      bf.style.opacity = 0;
    }, 2600);
  };
}
// ---- interactions
function exInt5(it) {
  if (it.kind === "cat") {
    exCat();
    return true;
  }
  if (it.kind === "decor") {
    aqMenu(it);
    return true;
  }
  if (it.kind === "fulg") {
    IG.remove(it.root);
    items.splice(items.indexOf(it), 1);
    WT.fulg = WT.fulg.filter((x) => x !== it);
    EXF.fulg = 1;
    award(40);
    burst(it.x, 1, it.z, 0xaee8ff, 24, 3, 3);
    toast("🌩️ Fulgurite collected!");
    return true;
  }
  return caveInt(it);
}
// ---- maps
let mapBase = null;
function getMapBase() {
  if (mapBase) return mapBase;
  const N = 240,
    W = 136,
    c = document.createElement("canvas");
  c.width = c.height = N;
  const g = c.getContext("2d"),
    im = g.createImageData(N, N);
  for (let j = 0; j < N; j++)
    for (let i = 0; i < N; i++) {
      const x = (i / N - 0.5) * W,
        z = (j / N - 0.5) * W,
        h = gh(x, z),
        s = (gh(x - 0.8, z - 0.8) - gh(x + 0.8, z + 0.8)) * 0.09;
      let r, gg, b;
      if (h < SEA) {
        const d = clamp((SEA - h) / 1.2, 0, 1);
        r = 95 - 60 * d;
        gg = 200 - 70 * d;
        b = 235 - 50 * d;
      } else if (h < 0.75) {
        r = 236;
        gg = 216;
        b = 150;
      } else if (h < 2.2) {
        const k = clamp((h - 0.75) / 1.4, 0, 1);
        r = 120 - 20 * k;
        gg = 205 - 45 * k;
        b = 95 - 20 * k;
      } else {
        const k = clamp((h - 2.2) / 6, 0, 1);
        r = 130 + 20 * k;
        gg = 125 + 20 * k;
        b = 125 + 25 * k;
      }
      const o = (j * N + i) * 4;
      im.data[o] = clamp(r * (1 + s), 0, 255);
      im.data[o + 1] = clamp(gg * (1 + s), 0, 255);
      im.data[o + 2] = clamp(b * (1 + s), 0, 255);
      im.data[o + 3] = 255;
    }
  g.putImageData(im, 0, 0);
  return (mapBase = c);
}
function pois() {
  const a = [
    ["💗", "Love altar", 0, -10],
    ["🕳️", "Cave", ENT[0], ENT[1]],
    ["🎣", "Fishing dock", DK.x + dc * 6, DK.z + ds2 * 6],
    ["⛵", chap() >= 8 ? "Your boat" : "Shipwreck", boatItem.x, boatItem.z],
  ];
  return a;
}
function drawWorld(c, cw, mini) {
  const W = 136,
    b = getMapBase(),
    sc = cw / 560,
    mp = (x, z) => [(x / W + 0.5) * cw, (z / W + 0.5) * cw];
  c.clearRect(0, 0, cw, cw);
  c.imageSmoothingEnabled = true;
  if (mini) {
    const span = (72 / W) * 240,
      cx = (me3.x / W + 0.5) * 240,
      cz = (me3.z / W + 0.5) * 240;
    c.fillStyle = "#4a98d8";
    c.fillRect(0, 0, cw, cw);
    c.drawImage(b, cx - span / 2, cz - span / 2, span, span, 0, 0, cw, cw);
    const k = cw / 72;
    pois().forEach(([e, l, x, z]) => {
      const px = cw / 2 + (x - me3.x) * k,
        pz = cw / 2 + (z - me3.z) * k;
      if (px < 6 || pz < 6 || px > cw - 6 || pz > cw - 6) return;
      c.font = Math.round(cw * 0.16) + "px serif";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(e, px, pz);
    });
    c.save();
    c.translate(cw / 2, cw / 2);
    c.rotate(Math.PI - me3.ry);
    c.fillStyle = "#e8283c";
    c.strokeStyle = "#fff";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(0, -8);
    c.lineTo(6, 6);
    c.lineTo(0, 3);
    c.lineTo(-6, 6);
    c.closePath();
    c.stroke();
    c.fill();
    c.restore();
    return;
  }
  c.drawImage(b, 0, 0, cw, cw);
  const pill = (e, l, p) => {
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillStyle = "#fff";
    c.strokeStyle = "#3a2a3a";
    c.lineWidth = 3 * sc;
    c.beginPath();
    c.arc(p[0], p[1], 20 * sc, 0, 6.283);
    c.fill();
    c.stroke();
    c.font = 24 * sc + "px serif";
    c.fillStyle = "#000";
    c.fillText(e, p[0], p[1] + sc);
    c.font = "bold " + 16 * sc + "px system-ui,sans-serif";
    const w = c.measureText(l).width + 14 * sc;
    c.fillStyle = "rgba(255,255,255,.92)";
    c.fillRect(p[0] - w / 2, p[1] + 24 * sc, w, 22 * sc);
    c.fillStyle = "#3a2a3a";
    c.fillText(l, p[0], p[1] + 35 * sc);
  };
  pois().forEach(([e, l, x, z]) => pill(e, l, mp(x, z)));
  if (chap() >= 8 && !village.cat) {
    const a = Math.atan2(I2Z, I2X);
    pill("🇫🇷", "Police island", [
      cw / 2 + Math.cos(a) * cw * 0.38,
      cw / 2 + Math.sin(a) * cw * 0.38,
    ]);
  }
  const p = mp(clamp(me3.x, -66, 66), clamp(me3.z, -66, 66));
  c.save();
  c.translate(p[0], p[1]);
  c.rotate(Math.PI - me3.ry);
  c.fillStyle = "#e8283c";
  c.strokeStyle = "#fff";
  c.lineWidth = 3 * sc;
  c.beginPath();
  c.moveTo(0, -14 * sc);
  c.lineTo(10 * sc, 10 * sc);
  c.lineTo(0, 5 * sc);
  c.lineTo(-10 * sc, 10 * sc);
  c.closePath();
  c.stroke();
  c.fill();
  c.restore();
  c.font = "bold " + 22 * sc + "px system-ui";
  c.lineWidth = 4 * sc;
  c.strokeStyle = "#fff";
  c.fillStyle = "#222";
  c.textAlign = "center";
  c.strokeText("N ↑", 34 * sc, 28 * sc);
  c.fillText("N ↑", 34 * sc, 28 * sc);
}
function drawMap() {
  const cv = $("#mp"),
    c = cv.getContext("2d");
  if (inCave) drawCaveMap(c, 560, 560);
  else drawWorld(c, 560, false);
}
const miniC = document.createElement("canvas");
miniC.width = miniC.height = 110;
miniC.id = "mini";
miniC.style.cssText =
  "position:fixed;top:calc(env(safe-area-inset-top,0px) + 54px);right:12px;width:110px;height:110px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.35);z-index:2;cursor:pointer";
document.body.appendChild(miniC);
const mapO = document.createElement("div");
mapO.style.cssText =
  "position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;z-index:8;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer";
mapO.innerHTML =
  '<canvas id="mapBig" style="border-radius:18px;border:4px solid #fff;box-shadow:0 10px 40px rgba(0,0,0,.5)"></canvas><div style="color:#fff;font-weight:800;text-shadow:0 1px 4px #000">Tap anywhere or press M to close</div>';
document.body.appendChild(mapO);
let mapOn = false;
function toggleMap() {
  if (mapOn) {
    mapOn = false;
    mapO.style.display = "none";
    modalOpen = false;
    return;
  }
  if (!ready || modalOpen || photoOn) return;
  mapOn = true;
  modalOpen = true;
  goalPt = goalObj = null;
  const s = Math.round(Math.min(innerWidth * 0.92, innerHeight * 0.84)),
    cv = $("#mapBig");
  cv.width = cv.height = s;
  cv.style.width = cv.style.height = s + "px";
  mapO.style.display = "flex";
  mapDraw();
}
function mapDraw() {
  const cv = $("#mapBig"),
    c = cv.getContext("2d");
  if (inCave) drawCaveMap(c, cv.width, cv.width);
  else drawWorld(c, cv.width, false);
}
mapO.addEventListener("click", toggleMap);
miniC.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  toggleMap();
});
addEventListener(
  "keydown",
  (e) => {
    if (
      e.target &&
      (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
    )
      return;
    if (
      (e.key === "m" || e.key === "M") &&
      !photoOn &&
      !tabOn &&
      (!modalOpen || mapOn)
    ) {
      e.preventDefault();
      toggleMap();
    }
    if (e.key === "Escape" && mapOn) toggleMap();
  },
  true,
);
// ---- Tab pages
const PG6 = [
  "🧱 Blocks",
  "🗺️ Map",
  "🎯 Quests",
  "⚙️ Settings",
  "🐟 Fish book",
  "📸 Us",
];
let fbSel = null,
  phView = -1,
  resetArm = 0,
  QM = "auto";
function cycleTab(d) {
  tabSel = (tabSel + d + PG6.length) % PG6.length;
  renderTab();
  tone(600 + tabSel * 40, 0.06, "sine", 0.05);
}
function renderTab() {
  const d = new Date(now() + timeOff),
    hr = d.getHours() + d.getMinutes() / 60,
    hh =
      String(d.getHours()).padStart(2, "0") +
      ":" +
      String(d.getMinutes()).padStart(2, "0"),
    ph =
      hr < 5
        ? "🌙 Night"
        : hr < 7
          ? "🌅 Dawn"
          : hr < 17
            ? "☀️ Day"
            : hr < 20
              ? "🌇 Dusk"
              : "🌙 Night",
    aq = Math.round((1 - pollution) * 100),
    i = inv(),
    B = (k) => (blockIds[k] || []).length,
    np = PP.filter((p) => EXF["pp_" + p[0]]).length,
    pur = Math.min(B("purifier"), B("generator") * 2),
    cell =
      "border:2px solid var(--line);border-radius:14px;padding:10px 12px;margin:6px 0;background:var(--card)",
    bar = (v, m) =>
      `<div class="bar" style="margin:6px 0 0"><i style="width:${clamp(v / m, 0, 1) * 100}%"></i></div>`,
    q = (t, done, p) =>
      `<div style="${cell};${done ? "opacity:.55" : ""}">${done ? "✅" : "⬜"} ${t}${p ? bar(p[0], p[1]) : ""}</div>`,
    hd = (t) => `<div style="font-weight:800;margin:12px 0 2px">${t}</div>`,
    btn = (a, t, on) =>
      `<button ${a} style="flex:1 0 auto;padding:9px 12px;margin:3px;font-weight:800;border-radius:12px;cursor:pointer;border:2px solid ${on ? "var(--pink)" : "var(--line)"};background:${on ? "var(--pink)" : "var(--card)"};color:${on ? "#fff" : "var(--ink)"};font-size:14px">${t}</button>`;
  let body = "";
  if (tabSel === 0) {
    body =
      BLK.map(
        ([t, ks]) =>
          hd(t) +
          ks
            .map((k) => {
              const r = RC.find((r) => r[3][k]);
              return `<div style="${cell};display:flex;gap:10px;align-items:center"><img src="${bIcon(k)}" style="width:52px;height:52px;image-rendering:pixelated;border-radius:8px;border:2px solid var(--line)"><div style="flex:1"><b>${BNM[k]}</b> <span class="mute">×${i[k] || 0}</span><div class="mute" style="font-size:13px">${BDS[k]}</div>${r ? `<div style="font-size:12px">${r[1]}</div>` : ""}</div>${btn(`data-use="${k}"`, "Use", SL[5][0] === k)}</div>`;
            })
            .join(""),
      ).join("") +
      hd("🪑 Furniture") +
      `<div style="${cell};display:flex;gap:10px;align-items:center"><div style="font-size:40px">🐠</div><div style="flex:1"><b>Aquarium</b> <span class="mute">×${i.aquarium || 0}</span><div class="mute" style="font-size:13px">Keep your caught fish. Place, then tap it.</div><div style="font-size:12px">6🪟 + 4🟫 + 2🔷</div></div>${btn('data-place="aquarium"', "Place", false)}</div><div class="mute" style="margin-top:8px">Craft at the 🔨 workbench. Your home is saved on this device 💾</div>`;
  }
  if (tabSel === 1)
    body = `<canvas id="mp" width="560" height="560" style="width:100%;max-width:min(560px,56vh);margin:0 auto;display:block;border-radius:16px;border:3px solid var(--line)"></canvas>`;
  if (tabSel === 2)
    body =
      hd("⛵ Main story") +
      q("Repair the boat (tap it)", chap() >= 8) +
      q("Rescue Twombly from the French police 🐱🚔", !!village.cat) +
      hd("🌱 Restore the island") +
      q(`Clear the trash (${TR0 - trashLeft}/${TR0})`, !trashLeft, [
        TR0 - trashLeft,
        TR0,
      ]) +
      q(`Find the purifier parts 🧽🌀🔌 (${np}/3)`, np === 3, [np, 3]) +
      q(
        "Craft a Trash Converter 🏭 and make a plastic block 🔷",
        B("converter") > 0 && EXF.conv,
      ) +
      q(
        `Build a Generator ⚡ and 2 Air Purifiers ♻️ (${pur}/2)`,
        B("generator") > 0 && pur >= 2,
        [pur, 2],
      ) +
      `<div class="mute" style="font-size:13px;margin:0 0 6px 4px">⚡ 1 generator powers 2 purifiers anywhere on the island. Tap a generator for its status. Parts 🧽🌀🔌 can be crafted at the workbench with plastic.</div>` +
      q(
        `Island health ${aq}% (trees, flowers, birds and a rainbow return)`,
        aq >= 90,
        [aq, 100],
      ) +
      hd("🏠 Build a home") +
      q(
        "Place a door, window, roof and bed",
        B("door") > 0 && B("window") > 0 && B("roof") > 0 && B("bed") > 0,
        [["door", "window", "roof", "bed"].filter((k) => B(k) > 0).length, 4],
      ) +
      q("Place an aquarium 🐠", AQ.length > 0) +
      hd("🎣 Fishing") +
      q(
        `Fish book ${FISH.filter((f) => X6.fb[f[0]]).length}/25 (or more caught: ${Object.values(X6.fb).reduce((a, b) => a + b, 0)})`,
        FISH.every((f) => X6.fb[f[0]]),
        [FISH.filter((f) => X6.fb[f[0]]).length, 25],
      ) +
      q("Collect fulgurite after a lightning strike 🌩️", !!EXF.fulg) +
      q(
        `Bond with Twombly (level ${Math.floor(X6.cat.aff / 3)})`,
        X6.cat.aff >= 9,
        [X6.cat.aff, 9],
      ) +
      hd("🕳️ The cave") +
      q("Brave the cave in the hill", EXF.cave) +
      q(
        `Find the 3 crystals 💠 (${Object.keys(X6.cave.cr).length}/3)`,
        Object.keys(X6.cave.cr).length === 3,
        [Object.keys(X6.cave.cr).length, 3],
      ) +
      q("Open the vault and claim the Mythic Rod 🎣✨", !!X6.cave.rod) +
      hd("💞 Together") +
      q(`Feed the Love Tree 🌸 (${gave()}/3000 🪙)`, gave() >= 3000, [
        gave(),
        3000,
      ]);
  if (tabSel === 3)
    body =
      hd("🔊 Sound") +
      btn('data-set="snd"', sound ? "Sound on" : "Sound off", sound) +
      hd("🎮 Graphics") +
      btn('data-set="q:auto"', "Auto", QM === "auto") +
      btn('data-set="q:low"', "Smooth", QM === "low") +
      btn('data-set="q:high"', "Sharp", QM === "high") +
      hd("📸 Photo mode") +
      btn('data-set="photo"', "Open photo mode", false) +
      hd("🌦️ Weather (test it!)") +
      btn('data-wx="clear"', "☀️ Clear", WT.type === "clear") +
      btn('data-wx="cloudy"', "☁️ Cloudy", WT.type === "cloudy") +
      btn('data-wx="rain"', "🌧️ Rain", WT.type === "rain") +
      btn('data-wx="storm"', "⛈️ Storm", WT.type === "storm") +
      `<div class="mute" style="font-size:13px;margin-top:6px">Rain waters plants, washes the smog, boosts rare fish and wakes the leviathan. Storms bring lightning: look for glowing fulgurite.</div>` +
      hd("💾 Save") +
      `<div class="mute" style="font-size:13px">Your blocks, inventory, fish book and home are saved on this device.</div>` +
      btn(
        'data-set="reset"',
        resetArm ? "Tap again to ERASE everything" : "Erase save",
        !!resetArm,
      ) +
      hd("⌨️ Controls") +
      [
        "WASD / arrows / stick: move",
        "Tap ground or objects: walk and use",
        "Q / E or drag: turn the camera",
        "Tab: next page · Shift+Tab: back · Esc: close",
        "M or the round minimap: big map",
        "F or ⚔️ in the cave: attack",
      ]
        .map(
          (t) =>
            `<div style="${cell};padding:6px 12px;font-size:14px">${t}</div>`,
        )
        .join("");
  if (tabSel === 4) {
    const got = FISH.filter((f) => X6.fb[f[0]]).length;
    body =
      `<div class="mute">Discovered ${got}/25</div>` +
      `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:8px 0">${FISH.map(
        (f) => {
          const have = X6.fb[f[0]] > 0,
            seen = have || X6.fb[f[0]] === 0;
          return `<div data-fish="${f[0]}" style="border:2px solid ${fbSel === f[0] ? "var(--pink)" : TIERS[f[2]][1]};border-radius:10px;padding:2px;background:var(--card);cursor:pointer;text-align:center"><img src="${fishIcon(f[0], !seen, 100)}" style="width:100%;display:block"><div style="font-size:10px;font-weight:700">${seen ? f[1] : "???"}</div></div>`;
        },
      ).join("")}</div>`;
    if (fbSel) {
      const f = FISH[FIDX[fbSel]],
        T = TIERS[f[2]],
        n = X6.fb[fbSel] || 0;
      body += `<div style="${cell}"><div style="display:flex;justify-content:space-between"><b>${n >= 0 && X6.fb[fbSel] !== undefined ? f[1] : "???"}</b><span style="color:#fff;background:${T[1]};border-radius:10px;padding:0 10px;font-size:12px;font-weight:800;line-height:22px">${T[0]}</span></div>${n > 0 || X6.fb[fbSel] === 0 ? `<img src="${fishIcon(fbSel, false, 260)}" style="width:100%;max-width:260px;display:block;margin:6px auto"><div>${f[6]}</div><div class="mute">In stock: ${n} · Worth ${T[2]} 🪙</div>${n > 0 && village.cat ? btn(`data-fcat="${fbSel}"`, "🐱 Feed Twombly", false) : ""}${n > 0 && AQ.length ? btn(`data-faq="${fbSel}"`, "🐠 To aquarium", false) : ""}` : "<div class='mute'>Not discovered yet. Keep fishing! (rain and storms help)</div>"}</div>`;
    }
  }
  if (tabSel === 5) {
    if (phView >= 0 && ALB[phView]) {
      body = `<img src="${ALB[phView]}" style="width:100%;border-radius:12px;display:block"><div style="display:flex;gap:6px;margin-top:8px"><a href="${ALB[phView]}" download="our-island-${phView + 1}.jpg" style="${cell};flex:1;text-align:center;text-decoration:none;color:var(--ink);font-weight:800">⬇️ Save</a>${btn('data-phdel="1"', "🗑️ Delete", false)}${btn('data-phback="1"', "‹ Back", false)}</div>`;
    } else
      body = `<img src="${PHOTO}" style="width:100%;border-radius:12px;border:8px solid #fff;box-shadow:0 4px 16px rgba(0,0,0,.3);display:block"><div style="text-align:center;font-weight:800;margin:8px 0">Us 💕</div>${hd("📷 Album (" + ALB.length + ")")}${ALB.length ? `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">${ALB.map((a, k) => `<img data-ph="${k}" src="${a}" style="width:100%;border-radius:8px;cursor:pointer;display:block">`).join("")}</div>` : `<div class="mute">No photos yet. Open photo mode from Settings (or press P).</div>`}${btn('data-set="photo"', "📷 Open photo mode", false)}`;
  }
  tabP.innerHTML = `<div style="background:var(--card);color:var(--ink);border-radius:20px;width:min(94vw,600px);max-height:92vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.4);font-size:16px"><div style="padding:12px 14px 6px"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><button data-nav="-1" style="border:0;background:var(--line);color:var(--ink);border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer">‹</button><div style="flex:1"><b style="font-size:22px">${hh}</b> <span class="mute" style="font-size:15px">${ph}${WT.type !== "clear" ? " · " + { cloudy: "☁️", rain: "🌧️", storm: "⛈️" }[WT.type] : ""}</span><div class="mute" style="font-size:12px">Air quality ${aq}%</div><div class="bar" style="margin:2px 0"><i style="width:${aq}%;background:${aq > 66 ? "#5fc454" : aq > 33 ? "#e8b83a" : "#c0503a"}"></i></div></div><button data-nav="1" style="border:0;background:var(--line);color:var(--ink);border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer">›</button><button id="tabx" style="border:0;background:var(--line);color:var(--ink);border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer">✕</button></div>
 <div style="display:flex;gap:5px;margin-top:10px;overflow-x:auto">${PG6.map((t, k) => `<button data-tb="${k}" style="flex:1 0 auto;padding:9px 10px;font-size:14px;font-weight:800;border-radius:12px;cursor:pointer;border:2px solid ${k === tabSel ? "var(--pink)" : "var(--line)"};background:${k === tabSel ? "var(--pink)" : "var(--card)"};color:${k === tabSel ? "#fff" : "var(--ink)"}">${t}</button>`).join("")}</div></div><div style="overflow:auto;padding:6px 14px 14px;-webkit-overflow-scrolling:touch">${body}</div></div>`;
  if (tabSel === 1) drawMap();
}
tabP.addEventListener("click", (e) => {
  const t = e.target.closest(
    "[data-use],[data-place],[data-fish],[data-set],[data-wx],[data-ph],[data-phdel],[data-phback],[data-fcat],[data-faq]",
  );
  if (!t) return;
  const d = t.dataset;
  if (d.use) return useBlock(d.use);
  if (d.place) {
    closeTab();
    return placeAquarium();
  }
  if (d.fish) {
    fbSel = d.fish;
    return renderTab();
  }
  if (d.wx) {
    setWX(d.wx);
    return renderTab();
  }
  if (d.fcat) {
    const id = d.fcat;
    if (X6.fb[id] > 0 && catItem) {
      closeTab();
      X6.fb[id]--;
      X6.cat.aff += TIERS[FISH[FIDX[id]][2]][3];
      sv6();
      burst(catItem.x, 1, catItem.z, 0xff7aa2, 14, 1.5, 3);
      toast("Nom nom! Twombly loves it 🐱");
    }
    return;
  }
  if (d.faq) {
    const a = AQ[0],
      id = d.faq;
    if (a && (a.d.fish || []).length < 4 && X6.fb[id] > 0) {
      X6.fb[id]--;
      a.d.fish = (a.d.fish || []).concat(id);
      aqRefresh(a);
      sv6();
      toast("Splash! 🐟");
      renderTab();
    } else toast("The tank is full");
    return;
  }
  if (d.ph !== undefined) {
    phView = +d.ph;
    return renderTab();
  }
  if (d.phback) {
    phView = -1;
    return renderTab();
  }
  if (d.phdel) {
    ALB.splice(phView, 1);
    saveAlb();
    phView = -1;
    return renderTab();
  }
  if (d.set === "snd") {
    $("#snd").click();
    return renderTab();
  }
  if (d.set && d.set.startsWith("q:")) {
    QM = d.set.slice(2);
    return renderTab();
  }
  if (d.set === "photo") {
    closeTab();
    return openPhoto();
  }
  if (d.set === "reset") {
    if (!resetArm) {
      resetArm = 1;
      setTimeout(() => {
        resetArm = 0;
        if (tabOn && tabSel === 3) renderTab();
      }, 4000);
      return renderTab();
    }
    ["island_v36", "island_x36", "island_photos36"].forEach((k) =>
      localStorage.removeItem(k),
    );
    location.reload();
  }
});
// ---- photo mode
const FCSS = [
    "",
    "sepia(.25) saturate(1.25)",
    "hue-rotate(12deg) saturate(1.1) brightness(1.05)",
    "grayscale(1) contrast(1.25)",
    "sepia(.6) contrast(.9) brightness(1.05)",
    "blur(1px) brightness(1.1) saturate(1.2)",
  ],
  FN = ["None", "Warm", "Cool", "Noir", "Vintage", "Dreamy"],
  FRN = ["None", "Polaroid", "Hearts", "Film", "Postcard"];
let ALB = [];
try {
  ALB = JSON.parse(localStorage.getItem("island_photos36") || "[]");
} catch (e) {}
function saveAlb() {
  while (true) {
    try {
      localStorage.setItem("island_photos36", JSON.stringify(ALB));
      return;
    } catch (e) {
      if (!ALB.length) return;
      ALB.pop();
    }
  }
}
let photoOn = false;
const pho = {
  x: 0,
  y: 0,
  z: 0,
  yaw: 0,
  pitch: -0.4,
  fov: 50,
  f: 0,
  fr: 0,
  k: {},
  fov0: 50,
  hid: [],
};
const phP = document.createElement("div");
phP.style.cssText =
  "position:fixed;inset:0;z-index:6;display:none;touch-action:none";
document.body.appendChild(phP);
const phFr = document.createElement("div");
phFr.style.cssText =
  "position:fixed;inset:0;pointer-events:none;z-index:5;display:none";
document.body.appendChild(phFr);
function phUI() {
  const b = (a, t, on) =>
      `<button ${a} style="padding:7px 10px;margin:2px;border-radius:12px;border:2px solid ${on ? "var(--pink)" : "rgba(255,255,255,.5)"};background:${on ? "var(--pink)" : "rgba(0,0,0,.45)"};color:#fff;font-weight:800;font-size:13px;cursor:pointer">${t}</button>`,
    hb = (k, t) =>
      `<button data-hold="${k}" style="width:46px;height:46px;margin:2px;border-radius:12px;border:2px solid rgba(255,255,255,.5);background:rgba(0,0,0,.45);color:#fff;font-size:18px;touch-action:none">${t}</button>`;
  phP.innerHTML = `<div style="position:absolute;left:0;right:0;bottom:calc(env(safe-area-inset-bottom,0px) + 8px);text-align:center"><div>${FN.map((n, i) => b(`data-pf="${i}"`, n, pho.f === i)).join("")}</div><div>${FRN.map((n, i) => b(`data-pr="${i}"`, n, pho.fr === i)).join("")}</div><button data-shoot="1" style="width:68px;height:68px;border-radius:50%;border:5px solid #fff;background:#ff4f80;font-size:26px;margin:4px 14px;cursor:pointer">📸</button><button data-pclose="1" style="width:46px;height:46px;border-radius:50%;border:2px solid #fff;background:rgba(0,0,0,.5);color:#fff;font-size:18px;cursor:pointer">✕</button></div><div style="position:absolute;left:8px;bottom:calc(env(safe-area-inset-bottom,0px) + 150px)">${hb("a", "◀")}${hb("w", "⬆")}${hb("s", "⬇")}${hb("d", "▶")}</div><div style="position:absolute;right:8px;bottom:calc(env(safe-area-inset-bottom,0px) + 150px)">${hb("e", "▲")}${hb("q", "▼")}</div><div style="position:absolute;top:10px;left:0;right:0;text-align:center;color:#fff;font-weight:800;text-shadow:0 1px 4px #000;font-size:13px">Drag to look · WASD move · Space/Q E up/down · wheel zoom · P to leave</div>`;
  phFrame();
}
function phFrame() {
  const f = pho.fr;
  phFr.style.display = f ? "block" : "none";
  phFr.style.border =
    f === 2
      ? "26px solid #ff9ec0"
      : f === 4
        ? "20px solid #f4ecd8"
        : f === 1
          ? "20px solid #fff"
          : "0";
  phFr.style.borderBottomWidth = f === 1 ? "70px" : "";
  phFr.style.borderTop = f === 3 ? "40px solid #000" : phFr.style.borderTop;
  phFr.style.borderBottom =
    f === 3 ? "40px solid #000" : phFr.style.borderBottom;
  R.domElement.style.filter = FCSS[pho.f];
}
function openPhoto() {
  if (!ready || photoOn || inCave || sailing || bedS) return;
  photoOn = true;
  modalOpen = true;
  goalPt = goalObj = null;
  pho.x = cam.position.x;
  pho.y = cam.position.y;
  pho.z = cam.position.z;
  pho.yaw = yaw;
  pho.pitch = -pitch * 0.85;
  pho.fov0 = cam.fov;
  pho.fov = cam.fov;
  pho.hid = [
    "coin",
    "who",
    "snd",
    "jmp",
    "home",
    "tabb",
    "hint",
    "hot",
    "toast",
    "mini",
    "cashE",
    "atkb",
    "phb",
    "hpE",
    "gunb",
    "bagb",
    "sailE",
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  pho.hid.forEach((e) => {
    e._d = e.style.display;
    e.style.display = "none";
  });
  phP.style.display = "block";
  phUI();
}
function closePhoto() {
  photoOn = false;
  modalOpen = false;
  phP.style.display = "none";
  phFr.style.display = "none";
  R.domElement.style.filter = "";
  pho.hid.forEach((e) => (e.style.display = e._d || ""));
  cam.fov = pho.fov0;
  cam.updateProjectionMatrix();
  snapCam();
}
function snap() {
  R.render(scene, cam);
  const src = R.domElement,
    W = 1280,
    H = 720,
    c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d"),
    sr = src.width / src.height,
    tr = W / H;
  let sw = src.width,
    sh = src.height,
    sx = 0,
    sy = 0;
  if (sr > tr) {
    sw = sh * tr;
    sx = (src.width - sw) / 2;
  } else {
    sh = sw / tr;
    sy = (src.height - sh) / 2;
  }
  g.drawImage(src, sx, sy, sw, sh, 0, 0, W, H);
  if (pho.f) {
    const id = g.getImageData(0, 0, W, H),
      d = id.data,
      f = pho.f;
    for (let i = 0; i < d.length; i += 4) {
      let r = d[i],
        gg = d[i + 1],
        b = d[i + 2];
      if (f === 1) {
        r *= 1.1;
        gg *= 1.03;
        b *= 0.86;
      } else if (f === 2) {
        r *= 0.88;
        b *= 1.14;
      } else if (f === 3) {
        const l = 0.3 * r + 0.59 * gg + 0.11 * b,
          v = (l - 128) * 1.25 + 128;
        r = gg = b = v;
      } else if (f === 4) {
        const nr = 0.393 * r + 0.769 * gg + 0.189 * b,
          ng = 0.349 * r + 0.686 * gg + 0.168 * b,
          nb = 0.272 * r + 0.534 * gg + 0.131 * b;
        r = nr * 0.9 + 22;
        gg = ng * 0.9 + 18;
        b = nb * 0.9 + 14;
      } else if (f === 5) {
        r = r * 1.08 + 14;
        gg = gg * 1.06 + 10;
        b = b * 1.08 + 18;
      }
      d[i] = r;
      d[i + 1] = gg;
      d[i + 2] = b;
    }
    g.putImageData(id, 0, 0);
    const vg = g.createRadialGradient(
      W / 2,
      H / 2,
      H * 0.35,
      W / 2,
      H / 2,
      H * 0.9,
    );
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(0,0,0,.4)");
    g.fillStyle = vg;
    g.fillRect(0, 0, W, H);
  }
  let out = c;
  const fr = pho.fr,
    date = new Date().toLocaleDateString();
  if (fr) {
    const P =
        fr === 1
          ? [80, 80, 80, 200]
          : fr === 2
            ? [70, 70, 70, 70]
            : fr === 3
              ? [40, 90, 40, 90]
              : [60, 60, 60, 60],
      o = document.createElement("canvas");
    o.width = W + P[0] + P[2];
    o.height = H + P[1] + P[3];
    const x = o.getContext("2d");
    x.fillStyle =
      fr === 1
        ? "#f8f4ec"
        : fr === 2
          ? "#ff9ec0"
          : fr === 3
            ? "#111"
            : "#f4ecd8";
    x.fillRect(0, 0, o.width, o.height);
    x.drawImage(c, P[0], P[1]);
    x.textAlign = "center";
    x.textBaseline = "middle";
    if (fr === 1) {
      x.fillStyle = "#3a2a3a";
      x.font = "bold 56px cursive, system-ui";
      x.fillText("Us 💕", o.width / 2, H + P[1] + 80);
      x.font = "26px system-ui";
      x.fillStyle = "#8a7a8a";
      x.fillText(date, o.width / 2, H + P[1] + 142);
    }
    if (fr === 2) {
      x.font = "38px serif";
      for (let i = 0; i < o.width; i += 84) {
        x.fillText("💗", i + 40, 35);
        x.fillText("💗", i + 40, o.height - 35);
      }
      for (let i = 0; i < o.height; i += 84) {
        x.fillText("💗", 35, i + 40);
        x.fillText("💗", o.width - 35, i + 40);
      }
    }
    if (fr === 3) {
      x.fillStyle = "#f4f4f4";
      for (let i = 14; i < o.width; i += 46) {
        x.fillRect(i, 12, 22, 16);
        x.fillRect(i, o.height - 28, 22, 16);
      }
    }
    if (fr === 4) {
      x.fillStyle = "rgba(255,255,255,.85)";
      x.fillRect(P[0], H + P[1] - 70, W, 70);
      x.fillStyle = "#3a2a3a";
      x.font = "bold 38px system-ui";
      x.fillText("Greetings from Our Island ☀️", o.width / 2, H + P[1] - 35);
      x.strokeStyle = "#b84a4a";
      x.lineWidth = 4;
      x.strokeRect(o.width - 190, P[1] + 10, 150, 110);
      x.font = "54px serif";
      x.fillText("💌", o.width - 115, P[1] + 65);
    }
    out = o;
  }
  ALB.unshift(out.toDataURL("image/jpeg", 0.86));
  if (ALB.length > 14) ALB.length = 14;
  saveAlb();
  flashE.style.transition = "none";
  flashE.style.opacity = 0.9;
  setTimeout(() => {
    flashE.style.transition = "opacity .5s";
    flashE.style.opacity = 0;
  }, 40);
  tone(1200, 0.05, "square", 0.1);
  tone(800, 0.08, "square", 0.08, 0.06);
  toast("📸 Saved to Us › Album");
}
phP.addEventListener("pointerdown", (e) => {
  const t = e.target.closest(
    "[data-pf],[data-pr],[data-shoot],[data-pclose],[data-hold]",
  );
  if (t) {
    e.stopPropagation();
    const d = t.dataset;
    if (d.pf !== undefined) {
      pho.f = +d.pf;
      phUI();
    } else if (d.pr !== undefined) {
      pho.fr = +d.pr;
      phUI();
    } else if (d.shoot) snap();
    else if (d.pclose) closePhoto();
    else if (d.hold) {
      pho.k[d.hold] = 1;
      const up = () => {
        pho.k[d.hold] = 0;
        removeEventListener("pointerup", up);
      };
      addEventListener("pointerup", up);
    }
    return;
  }
  pho.drag = { x: e.clientX, y: e.clientY };
  phP.setPointerCapture(e.pointerId);
});
phP.addEventListener("pointermove", (e) => {
  if (!pho.drag) return;
  pho.yaw -= (e.clientX - pho.drag.x) * 0.005;
  pho.pitch = clamp(pho.pitch - (e.clientY - pho.drag.y) * 0.005, -1.4, 1.4);
  pho.drag = { x: e.clientX, y: e.clientY };
});
phP.addEventListener("pointerup", () => (pho.drag = null));
phP.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    pho.fov = clamp(pho.fov + e.deltaY * 0.03, 20, 85);
  },
  { passive: false },
);
addEventListener(
  "keydown",
  (e) => {
    if (
      e.target &&
      (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
    )
      return;
    const k = e.key.toLowerCase();
    if (k === "p" && !photoOn && !modalOpen && ready) {
      e.preventDefault();
      return openPhoto();
    }
    if (!photoOn) return;
    if (k === "p" || k === "escape") {
      e.preventDefault();
      e.stopPropagation();
      return closePhoto();
    }
    const m = {
      w: "w",
      a: "a",
      s: "s",
      d: "d",
      " ": "e",
      e: "e",
      q: "q",
      shift: "q",
    }[k];
    if (m) {
      pho.k[m] = 1;
      e.preventDefault();
      e.stopPropagation();
    }
  },
  true,
);
addEventListener(
  "keyup",
  (e) => {
    if (!photoOn) return;
    const k = e.key.toLowerCase(),
      m = {
        w: "w",
        a: "a",
        s: "s",
        d: "d",
        " ": "e",
        e: "e",
        q: "q",
        shift: "q",
      }[k];
    if (m) pho.k[m] = 0;
  },
  true,
);
function photoTick(dt) {
  if (!photoOn) return;
  const sp = (pho.k.shift ? 12 : 6) * dt,
    cp = Math.cos(pho.pitch),
    sy = Math.sin(pho.yaw),
    cy = Math.cos(pho.yaw),
    fx = -sy * cp,
    fy = Math.sin(pho.pitch),
    fz = -cy * cp,
    rx = cy,
    rz = -sy;
  if (pho.k.w) {
    pho.x += fx * sp;
    pho.y += fy * sp;
    pho.z += fz * sp;
  }
  if (pho.k.s) {
    pho.x -= fx * sp;
    pho.y -= fy * sp;
    pho.z -= fz * sp;
  }
  if (pho.k.a) {
    pho.x -= rx * sp;
    pho.z -= rz * sp;
  }
  if (pho.k.d) {
    pho.x += rx * sp;
    pho.z += rz * sp;
  }
  if (pho.k.e) pho.y += sp;
  if (pho.k.q) pho.y -= sp;
  pho.x = clamp(pho.x, -140, 140);
  pho.z = clamp(pho.z, -140, 140);
  pho.y = clamp(pho.y, Math.max(hm(pho.x, pho.z), SEA) + 0.5, 70);
  cam.position.set(pho.x, pho.y, pho.z);
  cam.rotation.set(pho.pitch, pho.yaw, 0, "YXZ");
  if (Math.abs(cam.fov - pho.fov) > 0.01) {
    cam.fov = pho.fov;
    cam.updateProjectionMatrix();
  }
}
const photoB = document.createElement("button");
photoB.id = "phb";
photoB.className = "pill";
photoB.textContent = "📷";
photoB.style.cssText =
  "top:calc(env(safe-area-inset-top,0px) + 94px);left:12px;pointer-events:auto";
document.body.appendChild(photoB);
photoB.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  openPhoto();
});

// ===== v3.1: cave expedition (big rooms, catacombs, pistol, headcrabs, 200 HP) =====
const CROOMS = [
    { x: CVX, z: CVZ, r: 11 },
    { x: CVX + 36, z: CVZ, r: 15 },
    { x: CVX + 72, z: CVZ - 12, r: 11 },
  ],
  CSEG = [
    [CVX + 9, CVZ, CVX + 23, CVZ, 1.7],
    [CVX + 48, CVZ, CVX + 64, CVZ - 12, 1.7],
    [CVX + 12, CVZ, CVX + 12, CVZ + 10.8, 1.4],
    [CVX - 1.6, CVZ + 9, CVX - 2, CVZ + 13.4, 1.4],
    [CVX + 33, CVZ - 12.5, CVX + 30.2, CVZ - 16.8, 1.4],
    [CVX + 43, CVZ - 12.2, CVX + 47.2, CVZ - 18, 1.4],
  ],
  CALC = [
    { x: CVX - 2, z: CVZ + 13.4, r: 3.2 },
    { x: CVX + 12, z: CVZ + 10.8, r: 3.2 },
    { x: CVX + 30, z: CVZ - 16.8, r: 3.3 },
    { x: CVX + 49, z: CVZ - 22, r: 5.6 },
  ],
  CDOOR = [
    { id: "d1", x: CVX + 16, z: CVZ, cost: 500, open: false, dx: 1, dz: 0 },
    {
      id: "d2",
      x: CVX + 56,
      z: CVZ - 6,
      cost: 1000,
      open: false,
      dx: 16,
      dz: -12,
    },
  ],
  CEIL = [5.6, 7, 4.8];
const adif = (a, b) => {
  let d = a - b;
  while (d > Math.PI) d -= 6.2832;
  while (d < -Math.PI) d += 6.2832;
  return d;
};
const nearSeg = (x, z, c) =>
  CSEG.some((q) => sgd(x, z, q[0], q[1], q[2], q[3]) < c);
function roomOf(x, z, pad) {
  for (let i = 0; i < 3; i++) {
    const r = CROOMS[i];
    if (Math.hypot(x - r.x, z - r.z) < r.r + (pad || 0)) return i;
  }
  return -1;
}
function caveOK(x, z, pad) {
  pad = pad || 0;
  let ok = roomOf(x, z, pad) >= 0;
  if (!ok)
    for (const s of CSEG)
      if (sgd(x, z, s[0], s[1], s[2], s[3]) < s[4] + pad) {
        ok = true;
        break;
      }
  if (!ok) return false;
  if (!pad)
    for (const d of CDOOR)
      if (!d.open && Math.hypot(x - d.x, z - d.z) < 0.95) return false;
  return true;
}
caveG.children
  .filter(
    (c) =>
      (c.material && c.material.side === THREE.BackSide) ||
      (c.geometry &&
        (c.geometry.type === "ConeGeometry" ||
          c.geometry.type === "CircleGeometry" ||
          RG.includes(c.geometry))),
  )
  .forEach((c) => caveG.remove(c));

const cRoot = new THREE.Group();
scene.add(cRoot);
const stM2 = M(0x6a655f, { roughness: 0.9 }),
  BONE = M(0xe6dfcb, { roughness: 0.9 });
function skullTex() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 64;
  const g = c.getContext("2d");
  g.fillStyle = "#e3dcc8";
  g.fillRect(0, 0, 128, 64);
  for (let i = 0; i < 90; i++) {
    g.fillStyle = "rgba(120,100,70,.12)";
    g.fillRect(hs(i, 1, 170) * 128, hs(i, 2, 170) * 64, 6, 3);
  }
  g.fillStyle = "#1a1410";
  g.beginPath();
  g.ellipse(52, 26, 9, 8, 0, 0, 6.283);
  g.fill();
  g.beginPath();
  g.ellipse(76, 26, 9, 8, 0, 0, 6.283);
  g.fill();
  g.beginPath();
  g.moveTo(64, 34);
  g.lineTo(59, 44);
  g.lineTo(69, 44);
  g.fill();
  g.fillRect(52, 50, 24, 3);
  for (let x = 54; x < 76; x += 4) g.fillRect(x, 48, 1, 7);
  return new THREE.CanvasTexture(c);
}
const SKT = skullTex();
function rayCones(g, rm, dome, n, seed) {
  const rc = new THREE.Raycaster();
  for (let i = 0; i < n; i++) {
    const a = hs(i, 153, seed) * 6.283,
      r = Math.sqrt(hs(i, 154, seed)) * (rm.r - 0.5),
      x = Math.cos(a) * r,
      z = Math.sin(a) * r;
    rc.set(
      new THREE.Vector3(rm.x + x, 0.6, rm.z + z),
      new THREE.Vector3(0, 1, 0),
    );
    const h = rc.intersectObject(dome)[0];
    if (!h) continue;
    const L2 = 0.6 + hs(i, 155, seed) * 1.4,
      c = new THREE.Mesh(
        new THREE.ConeGeometry(0.1 + hs(i, 156, seed) * 0.2, L2, 6),
        stM2,
      );
    c.rotation.x = Math.PI;
    c.position.set(x, h.point.y - L2 / 2 + 0.2, z);
    g.add(c);
  }
}
function buildRoom(rm, seed, gaps, cat, ci) {
  const g = new THREE.Group();
  g.position.set(rm.x, 0, rm.z);
  const rr = rm.r * 1.5,
    dg = nGeo(rr, 3, 0.1, seed, false),
    pp = dg.attributes.position,
    ys = CEIL[ci] / rr;
  for (let i = 0; i < pp.count; i++)
    pp.setY(i, pp.getY(i) < 0 ? 0 : pp.getY(i) * ys);
  dg.computeVertexNormals();
  const dome = new THREE.Mesh(
    dg,
    M(cat ? 0xd8c8a8 : 0xb0a8c0, {
      vertexColors: true,
      side: THREE.BackSide,
      roughness: 1,
    }),
  );
  dome.position.y = 0.3;
  g.add(dome);
  const fl = new THREE.Mesh(
    new THREE.CircleGeometry(rm.r + 1.6, 40),
    M(cat ? 0x3a342a : 0x2a2630, { roughness: 1 }),
  );
  fl.rotation.x = -Math.PI / 2;
  fl.position.y = 0.5;
  g.add(fl);
  if (!cat)
    for (let i = 0, n = Math.round(rm.r * 3.4); i < n; i++) {
      const a = (i / n) * 6.283,
        r = rm.r + 1.3 + hs(i, 150, seed) * 0.6;
      if (
        gaps.some(
          (q) =>
            Math.abs(Math.sin(adif(a, q)) * r) < 2.4 &&
            Math.abs(adif(a, q)) < 1.2,
        ) ||
        nearSeg(rm.x + Math.cos(a) * r, rm.z + Math.sin(a) * r, 4.6)
      )
        continue;
      mkR(
        g,
        Math.cos(a) * r,
        i % 2 ? 0.9 : 2.2,
        Math.sin(a) * r,
        1.4 + hs(i, 151, seed),
        1.2 + hs(i, 152, seed) * 0.8,
        1.4,
        i + seed,
      );
    }
  g.updateMatrixWorld(true);
  rayCones(g, rm, dome, Math.round(rm.r * 2.4), seed);
  for (let i = 0; i < Math.round(rm.r * 0.5); i++) {
    const a = i * 1.3 + seed,
      r = rm.r * (0.3 + hs(i, 157, seed) * 0.5);
    if (nearSeg(rm.x + Math.cos(a) * r, rm.z + Math.sin(a) * r, 2.2)) continue;
    mkR(
      g,
      Math.cos(a) * r,
      0.5,
      Math.sin(a) * r,
      0.3,
      0.7 + hs(i, 158, seed) * 0.7,
      0.3,
      i + seed,
    );
  }
  const mu = EM(0x4a8aff, 1.6);
  for (let i = 0; i < 5; i++) {
    const a = i * 1.3 + 0.7,
      r = rm.r * 0.85;
    for (let k = 0; k < 3; k++) {
      const m = new THREE.Mesh(G.crown, mu);
      m.scale.set(0.12, 0.16, 0.12);
      m.position.set(
        Math.cos(a) * r + k * 0.15,
        0.55,
        Math.sin(a) * r + k * 0.1,
      );
      g.add(m);
    }
  }
  for (let i = 0; i < 4; i++) {
    const p = new THREE.Mesh(
        new THREE.CircleGeometry(0.6 + hs(i, 159, seed) * 0.9, 16),
        M(0x0a1830, { roughness: 0.05, metalness: 0.4 }),
      ),
      a = i * 1.7 + seed,
      r = rm.r * 0.5;
    p.rotation.x = -Math.PI / 2;
    p.position.set(Math.cos(a) * r, 0.52, Math.sin(a) * r);
    g.add(p);
  }
  cRoot.add(g);
  return g;
}
// Paris-catacombs hall: walls of stacked skulls and femurs
function buildCat(rm, gaps) {
  const g = buildRoom(rm, 7, gaps, true, 2),
    sk = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.21, 8, 6),
      M(0xffffff, { map: SKT, roughness: 0.9 }),
      1600,
    ),
    bn = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.9, 5),
      BONE,
      1600,
    ),
    mt = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e = new THREE.Euler(),
    Y = new THREE.Vector3(0, 1, 0),
    one = new THREE.Vector3(1, 1, 1);
  let ns = 0,
    nb = 0;
  for (let row = 0; row < 9; row++) {
    const y = 0.75 + row * 0.46,
      rad = rm.r + 0.45,
      cnt = Math.floor((6.283 * rad) / 0.46);
    for (let k = 0; k < cnt; k++) {
      const a = (k / cnt) * 6.283 + row * 0.17;
      if (
        gaps.some(
          (q2) =>
            Math.abs(Math.sin(adif(a, q2)) * rad) < 2.4 &&
            Math.abs(adif(a, q2)) < 1.2,
        ) ||
        nearSeg(rm.x + Math.cos(a) * rad, rm.z + Math.sin(a) * rad, 2.6)
      )
        continue;
      const p = new THREE.Vector3(Math.cos(a) * rad, y, Math.sin(a) * rad);
      if ((k + row) % 2 === 0 && ns < 1600) {
        e.set(0, Math.PI - a, 0);
        q.setFromEuler(e);
        mt.compose(p, q, one);
        sk.setMatrixAt(ns++, mt);
      } else if (nb < 1600) {
        q.setFromUnitVectors(
          Y,
          new THREE.Vector3(-Math.sin(a), 0, Math.cos(a)),
        );
        mt.compose(p, q, one);
        bn.setMatrixAt(nb++, mt);
      }
    }
  }
  sk.count = ns;
  bn.count = nb;
  sk.frustumCulled = bn.frustumCulled = false;
  g.add(sk, bn);
  for (let i = 0; i < 70; i++) {
    const a = hs(i, 171, 9) * 6.283,
      r = Math.sqrt(hs(i, 172, 9)) * (rm.r - 1.2),
      s = new THREE.Mesh(G.crown, M(0xe3dcc8, { roughness: 0.9 }));
    s.scale.setScalar(0.2);
    s.position.set(Math.cos(a) * r, 0.62, Math.sin(a) * r);
    g.add(s);
  }
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2,
      pl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.65, 3.9, 12),
        M(0xcdbf9c, { roughness: 1 }),
      );
    pl.position.set(Math.cos(a) * 5.8, 2.3, Math.sin(a) * 5.8);
    pl.castShadow = true;
    g.add(pl);
    for (let k = 0; k < 8; k++) {
      const s = new THREE.Mesh(G.crown, M(0xe3dcc8));
      s.scale.setScalar(0.2);
      s.position.set(
        Math.cos(a) * 5.8 + Math.cos(k * 0.785) * 0.62,
        0.9 + (k % 3) * 0.5,
        Math.sin(a) * 5.8 + Math.sin(k * 0.785) * 0.62,
      );
      g.add(s);
    }
  }
  const fm = EM(0xffb84a, 2.2);
  for (let i = 0; i < 14; i++) {
    const a = i * 0.45 + 0.2,
      r = rm.r * (0.45 + hs(i, 173, 9) * 0.45),
      c = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.28, 8),
        M(0xfff4dc),
      ),
      f = new THREE.Mesh(G.crown, fm);
    c.position.set(Math.cos(a) * r, 0.64, Math.sin(a) * r);
    f.scale.set(0.05, 0.1, 0.05);
    f.position.set(c.position.x, 0.84, c.position.z);
    g.add(c, f);
  }
  const cl = new THREE.PointLight(0xff9a50, 1.1, 18);
  cl.position.set(0, 3, 0);
  g.add(cl);
  const sc = document.createElement("canvas");
  sc.width = 512;
  sc.height = 160;
  {
    const x = sc.getContext("2d");
    x.fillStyle = "rgba(20,14,10,.9)";
    x.fillRect(0, 0, 512, 160);
    x.strokeStyle = "#cdbf9c";
    x.lineWidth = 6;
    x.strokeRect(6, 6, 500, 148);
    x.fillStyle = "#e3dcc8";
    x.font = "bold 40px serif";
    x.textAlign = "center";
    x.fillText("ARRÊTE !", 256, 62);
    x.font = "bold 28px serif";
    x.fillText("C'EST ICI L'EMPIRE DE LA MORT", 256, 112);
  }
  const sp = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(sc), fog: false }),
  );
  sp.scale.set(5, 1.56, 1);
  sp.position.set(-rm.r + 1.2, 3.1, 0);
  g.add(sp);
  return g;
}
// Le Tribun: a fictional loud skeleton in a red scarf
function mkTribun() {
  const g = new THREE.Group(),
    st = M(0x8a8478, { roughness: 1 }),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  A(new THREE.BoxGeometry(1.3, 0.5, 1.1), st, 0, 0.25, 0);
  A(new THREE.BoxGeometry(1.3, 1.8, 0.2), st, 0, 1.1, -0.5);
  A(G.crown, BONE, 0, 0.65, -0.05).scale.set(0.3, 0.14, 0.2);
  A(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6), BONE, 0, 1.05, -0.1);
  for (let i = 0; i < 5; i++) {
    const r = A(
      new THREE.TorusGeometry(0.2 - i * 0.01, 0.022, 6, 12, Math.PI * 1.6),
      BONE,
      0,
      0.9 + i * 0.13,
      -0.08,
    );
    r.rotation.set(Math.PI / 2, 0, Math.PI * 0.7);
  }
  const sk = A(
    G.crown,
    new THREE.MeshStandardMaterial({ map: SKT, roughness: 0.9 }),
    0,
    1.65,
    -0.05,
  );
  sk.scale.setScalar(0.22);
  sk.rotation.y = -Math.PI / 2;
  A(G.crown, BONE, 0, 1.5, 0.08).scale.set(0.12, 0.06, 0.1);
  const sc2 = A(
    new THREE.TorusGeometry(0.15, 0.05, 6, 12),
    M(0xd02a2a),
    0,
    1.46,
    -0.05,
  );
  sc2.rotation.x = Math.PI / 2;
  A(new THREE.BoxGeometry(0.1, 0.5, 0.02), M(0xd02a2a), 0.1, 1.2, 0.1);
  [-1, 1].forEach((s) => {
    A(
      new THREE.CylinderGeometry(0.04, 0.04, 0.55, 6),
      BONE,
      s * 0.2,
      1.12,
      0.08,
    ).rotation.x = -0.4;
    A(
      new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6),
      BONE,
      s * 0.18,
      0.62,
      0.5,
    ).rotation.x = 1.45;
    A(
      new THREE.CylinderGeometry(0.04, 0.04, 0.55, 6),
      BONE,
      s * 0.18,
      0.3,
      0.85,
    );
  });
  const mg = A(
    new THREE.ConeGeometry(0.2, 0.5, 10, 1, true),
    M(0xd0d0d0, { metalness: 0.5, side: THREE.DoubleSide }),
    0.3,
    1.45,
    0.45,
  );
  mg.rotation.z = -1.2;
  mg.rotation.x = 1.2;
  return g;
}
const tribG = new THREE.Group();
tribG.add(mkTribun());

function buildTunnel(s) {
  const len = Math.hypot(s[2] - s[0], s[3] - s[1]),
    dir = new THREE.Vector3(s[2] - s[0], 0, s[3] - s[1]).normalize(),
    cg = new THREE.CylinderGeometry(
      1.15,
      1.15,
      len,
      14,
      Math.ceil(len / 1.3),
      true,
    ),
    p = cg.attributes.position,
    col = new Float32Array(p.count * 3),
    k = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      y = p.getY(i),
      z = p.getZ(i),
      r = Math.hypot(x, z) || 1,
      n = (vn(y * 0.6 + i * 0.01, Math.atan2(z, x) * 2, 140) - 0.5) * 0.3,
      sc = (r + n) / r;
    p.setXYZ(i, x * sc, y, z * sc);
    k.setHex(0x5a5560).lerp(new THREE.Color(0x3a3640), hs(i, y, 141));
    col.set([k.r, k.g, k.b], i * 3);
  }
  cg.setAttribute("color", new THREE.BufferAttribute(col, 3));
  cg.computeVertexNormals();
  const m = new THREE.Mesh(
    cg,
    M(0xb0a8c0, { vertexColors: true, side: THREE.BackSide, roughness: 1 }),
  );
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  m.position.set((s[0] + s[2]) / 2, 0.55, (s[1] + s[3]) / 2);
  cRoot.add(m);
  const fg = new THREE.Group();
  fg.position.set((s[0] + s[2]) / 2, 0.5, (s[1] + s[3]) / 2);
  fg.rotation.y = -Math.atan2(s[3] - s[1], s[2] - s[0]);
  const fl = new THREE.Mesh(
    new THREE.PlaneGeometry(len + 1, 2.4),
    M(0x2a2630, { roughness: 1 }),
  );
  fl.rotation.x = -Math.PI / 2;
  fg.add(fl);
  for (let i = 0; i < len / 1.7; i++) {
    const c = new THREE.Mesh(
      new THREE.ConeGeometry(
        0.08 + hs(i, 160, len | 0) * 0.08,
        0.4 + hs(i, 161, len | 0) * 0.4,
        5,
      ),
      stM2,
    );
    c.rotation.x = Math.PI;
    c.position.set(
      -len / 2 + i * 1.7 + 0.5,
      1.45,
      (hs(i, 162, len | 0) - 0.5) * 1.1,
    );
    fg.add(c);
  }
  cRoot.add(fg);
}

// spawn mounds
const SPAWN = [
  [0, 1, 2, 3, 4].map((i) => ({
    x: CVX + Math.cos(i * 1.25 + 0.4) * 6.6,
    z: CVZ + Math.sin(i * 1.25 + 0.4) * 6.6,
  })),
  [0, 1, 2, 3, 4, 5, 6].map((i) => ({
    x: CVX + 36 + Math.cos(i * 0.9) * 10.5,
    z: CVZ + Math.sin(i * 0.9) * 10.5,
  })),
  [0, 1, 2, 3, 4, 5].map((i) => ({
    x: CVX + 72 + Math.cos(i * 1.05 + 0.5) * 6.8,
    z: CVZ - 12 + Math.sin(i * 1.05 + 0.5) * 6.8,
  })),
];

function signTex(t) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 96;
  const g = c.getContext("2d");
  g.fillStyle = "rgba(20,16,24,.85)";
  g.fillRect(0, 0, 256, 96);
  g.strokeStyle = "#ffd24a";
  g.lineWidth = 5;
  g.strokeRect(4, 4, 248, 88);
  g.fillStyle = "#ffd24a";
  g.font = "bold 46px system-ui";
  g.textAlign = "center";
  g.fillText(t, 128, 64);
  return new THREE.CanvasTexture(c);
}

// crystals, gun crate, pedestals, chest, skeleton
const CRY = [
  ["pink", 0xff4fa0, CVX - 2, CVZ + 13.4],
  ["cyan", 0x4fe0ff, CVX + 12, CVZ + 10.9],
  ["green", 0x6fff7a, CVX + 30, CVZ - 16.9],
];

function spawnGunCrate() {
  const g = new THREE.Group(),
    bx = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 0.7), M(0x5a4a34));
  bx.position.y = 0.35;
  g.add(bx);
  const dk = M(0x1c1c20, { metalness: 0.5, roughness: 0.4 }),
    b1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.1), dk),
    b2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.1), dk);
  b1.position.set(0, 0.78, 0);
  b2.position.set(-0.18, 0.65, 0);
  g.add(b1, b2);
  hitSph(g, 0.9, 0.6);
  const gx = CVX + 25,
    gz = CVZ - 6;
  if (!X6.cave.pistol)
    GUNIT = addItem({
      id: "gun",
      kind: "gun",
      x: gx,
      z: gz,
      r: 0,
      reach: 2.2,
      root: place(g, gx, gz, 0.5),
      hint: "🔫 A pistol on a crate! Press to take it",
    });
}
const C3 = CROOMS[2],
  COLS = ["pink", "cyan", "green"],
  PED = [
    ["pink", 0xff4fa0, C3.x + 3, C3.z + 1.5],
    ["cyan", 0x4fe0ff, C3.x - 3, C3.z + 1.5],
    ["green", 0x6fff7a, C3.x, C3.z + 4],
  ].map(([col, hex, x, z]) => {
    const g = new THREE.Group(),
      b = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.45, 0.9, 10),
        M(0xcdbf9c, { roughness: 1 }),
      ),
      gm = EM(hex, 0.15),
      m = new THREE.Mesh(new THREE.OctahedronGeometry(0.2, 0), gm);
    b.position.y = 0.45;
    m.position.y = 1.3;
    g.add(b, m);
    hitSph(g, 0.8, 0.8);
    return addItem({
      id: "pd" + col,
      kind: "ped",
      col,
      hex,
      gm,
      lit: false,
      x,
      z,
      r: 0.4,
      reach: 2.2,
      root: place(g, x, z, 0.5),
      hint: "🗿 A pedestal… it wants the " + col + " crystal",
    });
  });
{
  const hc = document.createElement("canvas");
  hc.width = 256;
  hc.height = 96;
  const g = hc.getContext("2d");
  g.fillStyle = "rgba(20,16,24,.8)";
  g.fillRect(0, 0, 256, 96);
  [
    [0xff4fa0, 60],
    [0x4fe0ff, 128],
    [0x6fff7a, 196],
  ].forEach(([h, x]) => {
    g.fillStyle = "#" + h.toString(16).padStart(6, "0");
    g.beginPath();
    g.arc(x, 48, 22, 0, 6.283);
    g.fill();
  });
  g.fillStyle = "#fff";
  g.font = "30px system-ui";
  g.fillText("→", 92, 58);
  g.fillText("→", 160, 58);
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(hc), fog: false }),
  );
  s.scale.set(2.6, 1, 1);
  s.position.set(C3.x, 2.4, C3.z - 8.2);
  cRoot.add(s);
}
const chestG = new THREE.Group(),
  chLid = new THREE.Group();
{
  const bd = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 0.8), M(0x6a4a2a)),
    lid = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.8), M(0x7a5a3a)),
    gl = new THREE.Mesh(G.crown, EM(0xffd24a, 2));
  bd.position.y = 0.3;
  lid.position.set(0, 0.15, 0.4);
  chLid.position.set(0, 0.6, -0.4);
  chLid.add(lid);
  gl.scale.setScalar(0.25);
  gl.position.y = 0.7;
  chestG.add(bd, chLid, gl);
  chestG.userData.gl = gl;
  gl.visible = false;
  hitSph(chestG, 1, 0.5);
}
const chestIt = addItem({
  id: "chest",
  kind: "chest",
  x: C3.x,
  z: C3.z - 5.6,
  r: 0.6,
  reach: 2.2,
  root: place(chestG, C3.x, C3.z - 5.6, 0.5),
  hint: "🧰 A sealed chest…",
});
{
  tribG.rotation.y = Math.atan2(-4.5, 5.5);
  const it = addItem({
    id: "tribun",
    kind: "skel",
    x: C3.x + 4.5,
    z: C3.z - 5.5,
    r: 0.8,
    reach: 2.6,
    root: place(tribG, C3.x + 4.5, C3.z - 5.5, 0.5),
    hint: "💀 Le Tribun, a very loud skeleton",
  });
}
let pedNext = 0,
  vaultOpen = false,
  vaultDone = false;
function pedestal(it) {
  if (vaultOpen) {
    toast("The vault is already open 🧰");
    return true;
  }
  if (!X6.cave.cr[it.col]) {
    toast(
      "The pedestal needs the " + it.col + " crystal 💠. Explore the tunnels!",
    );
    return true;
  }
  if (it.col === COLS[pedNext]) {
    it.lit = true;
    it.gm.emissiveIntensity = 2.2;
    jingle([523 + pedNext * 130]);
    burst(it.x, 1.3, it.z, it.hex, 16, 2, 3);
    pedNext++;
    if (pedNext === 3) {
      vaultOpen = true;
      chLid.rotation.x = -1.1;
      chestG.userData.gl.visible = true;
      chestIt.hint = "🧰 The chest is open! Tap to claim";
      jingle([392, 494, 587, 784, 988]);
      toast("🔓 The vault opens!");
    }
  } else {
    pedNext = 0;
    PED.forEach((p) => {
      p.lit = false;
      p.gm.emissiveIntensity = 0.15;
    });
    tone(100, 0.7, "sawtooth", 0.2);
    toast(
      "❌ Wrong order! Follow the glowing dots on the wall. The dead stir…",
    );
    for (let i = 0; i < 3; i++) spawnEnemy();
  }
  return true;
}
function chestClaim(it) {
  if (!vaultOpen) {
    toast("The chest is sealed… solve the pedestals first");
    return true;
  }
  if (vaultDone) {
    toast("Empty now. Come back for another run!");
    return true;
  }
  vaultDone = true;
  award(500);
  chestG.userData.gl.visible = false;
  if (!X6.cave.rod) {
    X6.cave.rod = 1;
    sv6();
    award(300 + Math.floor(RUN.cash / 10));
    showModal(
      `${X}<div style="text-align:center"><h2>🎣✨ Mythic Rod!</h2><p style="font-size:44px;margin:0">🎣</p><p>Rare drop acquired! Golden, Angelic and GOATED fish now bite twice as often, and the God Fish becomes reachable in a night storm.</p></div>`,
    );
    $("#x").onclick = closeModal;
    jingle([523, 659, 784, 1047, 1319, 1568]);
  } else {
    award(150 + Math.floor(RUN.cash / 10));
    toast("The vault gave up its treasure again: coins!");
  }
  return true;
}
// ---- health, ammo, run state, HUD
const PH = { v: 200, max: 200, last: 0 },
  GUN = { owned: !!X6.cave.pistol, mag: 8, ammo: 24, rel: 0, last: 0 },
  RUN = { cash: 0, kills: 0, t: 0, sp: 5 },
  ENEMY = [];
let atkT = 0,
  wasCave2 = false,
  dead = 0;
const hud$ = (id, css) => {
  const d = document.createElement("div");
  d.id = id;
  d.style.cssText =
    "position:fixed;display:none;z-index:2;pointer-events:none;" + css;
  document.body.appendChild(d);
  return d;
};
const cashE = hud$(
  "cashE",
  "top:calc(env(safe-area-inset-top,0px) + 46px);left:50%;transform:translateX(-50%);background:var(--glass);border-radius:16px;padding:6px 14px;font-weight:800;font-size:16px",
);
const hpE = hud$(
  "hpE",
  "top:calc(env(safe-area-inset-top,0px) + 82px);left:50%;transform:translateX(-50%);width:min(260px,60vw)",
);
hpE.innerHTML =
  '<div style="height:20px;border-radius:10px;background:rgba(0,0,0,.55);border:2px solid #fff;overflow:hidden;position:relative"><div id="hpf" style="height:100%;width:100%;background:linear-gradient(#ff6a6a,#c02030)"></div><div id="hpt" style="position:absolute;inset:0;text-align:center;font:900 13px/16px system-ui;color:#fff;text-shadow:0 1px 2px #000">200 / 200</div></div><div id="ammot" style="text-align:center;font:800 14px system-ui;color:#fff;text-shadow:0 1px 3px #000;margin-top:3px"></div>';
const mkBtn = (id, t, bot) => {
  const b = document.createElement("button");
  b.id = id;
  b.className = "pill";
  b.textContent = t;
  b.style.cssText = `top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + ${bot}px);right:12px;pointer-events:auto;width:54px;height:54px;border-radius:27px;font-size:22px;padding:0;display:none`;
  document.body.appendChild(b);
  return b;
};
const atkB = mkBtn("atkb", "⚔️", 214),
  gunB = mkBtn("gunb", "🔫", 280);
function cashUp() {
  cashE.textContent = "💰 " + RUN.cash + " pts";
}
function hudUp() {
  const f = document.getElementById("hpf"),
    t = document.getElementById("hpt"),
    a = document.getElementById("ammot");
  if (f) f.style.width = (PH.v / PH.max) * 100 + "%";
  if (t) t.textContent = Math.ceil(PH.v) + " / " + PH.max;
  if (a)
    a.textContent = GUN.owned
      ? GUN.rel > 0
        ? "🔫 reloading…"
        : "🔫 " + GUN.mag + "/8 · " + GUN.ammo
      : "⚔️ melee · find the pistol in the big hall";
}
// ---- damage numbers (simple Fortnite-style pop-ups)
const dmgs = [],
  dmgBox = document.createElement("div");
dmgBox.style.cssText =
  "position:fixed;inset:0;pointer-events:none;z-index:3;overflow:hidden";
document.body.appendChild(dmgBox);
function dmgNum(x, y, z, txt, kind) {
  const el = document.createElement("div"),
    big = kind === "kill",
    pl = kind === "hurt",
    pts = kind === "pts";
  el.textContent = txt;
  el.style.cssText = `position:absolute;left:0;top:0;font:900 ${big ? 36 : pts ? 16 : 26}px system-ui;color:${pl ? "#ff4a4a" : big ? "#ffd24a" : pts ? "#8affb0" : "#fff"};-webkit-text-stroke:${big ? "3px" : "2.5px"} #1a1020;paint-order:stroke fill;text-shadow:0 3px 0 #1a1020;white-space:nowrap`;
  dmgBox.appendChild(el);
  dmgs.push({
    el,
    x: x + (Math.random() - 0.5) * 0.5,
    y,
    z: z + (Math.random() - 0.5) * 0.5,
    t: 0,
    vx: (Math.random() - 0.5) * 1.4,
  });
}
function dmgTick(dt) {
  const v = new THREE.Vector3();
  for (let i = dmgs.length; i--;) {
    const d = dmgs[i];
    d.t += dt;
    if (d.t > 1) {
      d.el.remove();
      dmgs.splice(i, 1);
      continue;
    }
    v.set(d.x + d.vx * d.t, d.y + d.t * 1.3 - d.t * d.t * 0.8, d.z).project(
      cam,
    );
    if (v.z > 1) {
      d.el.style.display = "none";
      continue;
    }
    d.el.style.display = "block";
    const pop = d.t < 0.12 ? 1 + (0.12 - d.t) * 5 : 1;
    d.el.style.transform = `translate(${(v.x * 0.5 + 0.5) * innerWidth}px,${(-v.y * 0.5 + 0.5) * innerHeight}px) translate(-50%,-50%) scale(${pop})`;
    d.el.style.opacity = d.t > 0.7 ? (1 - d.t) / 0.3 : 1;
  }
}
// ---- enemies: walker, runner, brute, headcrab
const ETY = {
  walker: { hp: 300, sp: 1.55, kill: 100, cd: 1.05 },
  runner: { hp: 200, sp: 3.2, kill: 100, cd: 0.9 },
  brute: { hp: 700, sp: 1.15, kill: 250, cd: 1.3 },
  crab: { hp: 110, sp: 2.5, kill: 50, cd: 1.4 },
};
function mkHuman(type) {
  const g = new THREE.Group(),
    skc = type === "runner" ? 0xb09a7a : type === "brute" ? 0x7a9a78 : 0x8ab08a,
    sk = new THREE.MeshStandardMaterial({ color: skc, roughness: 0.9 }),
    cc = [0x3a4a44, 0x4a3a3a, 0x3a3a50][Math.floor(Math.random() * 3)],
    cl = M(type === "brute" ? 0x2a2a2e : cc, { roughness: 1 }),
    dk = M(0x2a2a30),
    bl = M(0x7a1a1a),
    A = (geo, mat, x, y, z, p) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      (p || g).add(m);
      return m;
    },
    w = type === "brute" ? 1.5 : type === "runner" ? 0.82 : 1;
  A(new THREE.BoxGeometry(0.5 * w, 0.75, 0.28 * w), cl, 0, 1, 0);
  A(new THREE.BoxGeometry(0.52 * w, 0.2, 0.3 * w), bl, 0, 0.82, 0.02);
  const hd = A(G.crown, sk, 0, 1.62, 0.05);
  hd.scale.set(0.24, 0.26, 0.24);
  hd.rotation.z = 0.2;
  A(new THREE.BoxGeometry(0.16, 0.07, 0.05), dk, 0, 1.53, 0.22);
  [-1, 1].forEach((s) => {
    A(G.crown, EM(0xff2020, 2.4), s * 0.09, 1.66, 0.2).scale.setScalar(0.045);
  });
  const aL = new THREE.Group(),
    aR = new THREE.Group();
  aL.position.set(-0.34 * w, 1.3, 0);
  aR.position.set(0.34 * w, 1.3, 0);
  g.add(aL, aR);
  [aL, aR].forEach((a) => {
    const m = A(
      new THREE.CylinderGeometry(0.07 * w, 0.06 * w, 0.62, 7),
      sk,
      0,
      -0.3,
      0.0,
      a,
    );
    a.rotation.x = -1.4;
  });
  const lL = new THREE.Group(),
    lR = new THREE.Group();
  lL.position.set(-0.13, 0.65, 0);
  lR.position.set(0.13, 0.65, 0);
  g.add(lL, lR);
  A(
    new THREE.CylinderGeometry(0.09 * w, 0.08 * w, 0.65, 7),
    cl,
    0,
    -0.32,
    0,
    lL,
  );
  A(
    new THREE.CylinderGeometry(0.09 * w, 0.08 * w, 0.65, 7),
    cl,
    0,
    -0.32,
    0,
    lR,
  );
  if (type === "brute") {
    [-1, 1].forEach((s) => {
      A(
        new THREE.ConeGeometry(0.1, 0.4, 5),
        BONE,
        s * 0.38,
        1.55,
        -0.05,
      ).rotation.z = -s * 0.7;
    });
    A(
      new THREE.TorusGeometry(0.3, 0.04, 6, 12),
      M(0x555a60, { metalness: 0.7 }),
      0,
      1.1,
      0.16,
    );
  }
  if (type === "runner")
    A(new THREE.BoxGeometry(0.4, 0.06, 0.06), M(0x2a2a2a), 0, 1.2, 0.17);
  g.userData = { lL, lR, aL, aR, mat: sk, hd };
  g.scale.setScalar(type === "brute" ? 1.35 : 1.02);
  return g;
}
function mkCrab() {
  const g = new THREE.Group(),
    sk = new THREE.MeshStandardMaterial({ color: 0xd2a679, roughness: 0.6 }),
    dk = M(0x8a5a3a),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  A(G.crown, sk, 0, 0.28, 0).scale.set(0.34, 0.2, 0.3);
  for (let i = 0; i < 4; i++)
    A(G.crown, dk, -0.12 + i * 0.08, 0.42, 0).scale.set(0.07, 0.05, 0.22);
  const mo = A(G.crown, M(0x7a1a22), 0, 0.14, 0.22);
  mo.scale.set(0.2, 0.08, 0.14);
  for (let i = 0; i < 4; i++)
    A(
      new THREE.ConeGeometry(0.025, 0.09, 4),
      BONE,
      -0.09 + i * 0.06,
      0.1,
      0.3,
    ).rotation.x = Math.PI;
  [-1, 1].forEach((s) =>
    A(G.crown, EM(0xffe070, 1.4), s * 0.1, 0.36, 0.2).scale.setScalar(0.035),
  );
  const legs = [];
  for (let i = 0; i < 4; i++)
    [-1, 1].forEach((s) => {
      const l = new THREE.Group();
      l.position.set(s * 0.22, 0.2, -0.15 + i * 0.1);
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.012, 0.34, 5),
        dk,
      );
      m.position.set(s * 0.12, -0.04, 0);
      m.rotation.z = -s * 0.9;
      l.add(m);
      g.add(l);
      legs.push(l);
    });
  g.userData = { legs, mat: sk };
  return g;
}
function spawnEnemy(forceType) {
  const ri = Math.max(0, roomOf(me3.x, me3.z, 0)),
    open = [true, CDOOR[0].open, CDOOR[1].open];
  let list = [];
  [ri, ri - 1, ri + 1].forEach((r) => {
    if (r >= 0 && r < 3 && open[r])
      list = list.concat(SPAWN[r].map((p) => ({ p, r })));
  });
  list = list.filter((o) => Math.hypot(o.p.x - me3.x, o.p.z - me3.z) > 6);
  if (!list.length) return;
  const o = list[Math.floor(Math.random() * list.length)],
    rn = Math.random();
  let type = forceType;
  if (!type) {
    if (o.r === 0) type = rn < 0.8 || RUN.kills < 3 ? "walker" : "crab";
    else if (o.r === 1)
      type = rn < 0.4 ? "walker" : rn < 0.65 ? "runner" : "crab";
    else
      type =
        rn < 0.35
          ? "walker"
          : rn < 0.55
            ? "runner"
            : rn < 0.8
              ? "crab"
              : ENEMY.some((e) => e.type === "brute" && !e.dead)
                ? "walker"
                : "brute";
  }
  const d = ETY[type],
    g = type === "crab" ? mkCrab() : mkHuman(type);
  cRoot.add(g);
  ENEMY.push({
    g,
    type,
    x: o.p.x,
    z: o.p.z,
    hp: d.hp,
    max: d.hp,
    sp: d.sp + RUN.kills * 0.008,
    cd: 0.6,
    wind: 0,
    rise: 1.4,
    dead: 0,
    hit: 0,
    stag: 0,
    ph: Math.random() * 6,
    leap: null,
  });
  g.position.set(o.p.x, -0.7, o.p.z);
  g.scale.multiplyScalar(0.2);
  burst(o.p.x, 0.6, o.p.z, 0x5a4a30, 10, 1.5, 2);
  tone(
    type === "crab" ? 900 : 60,
    0.5,
    type === "crab" ? "square" : "sawtooth",
    0.08,
  );
}
function hurt(n) {
  if (dead || modalOpen || HIT.inv > 0) return;
  PH.v = Math.max(0, PH.v - n);
  PH.last = 0;
  flE.style.transition = "none";
  flE.style.opacity = 0.45;
  setTimeout(() => {
    flE.style.transition = "opacity .5s";
    flE.style.opacity = 0;
  }, 60);
  dmgNum(me3.x, me3.y + 2.2, me3.z, "-" + n, "hurt");
  tone(160, 0.25, "sawtooth", 0.16);
  hudUp();
  if (PH.v <= 0) die();
}
function die() {
  dead = 2.2;
  flE.style.transition = "none";
  flE.style.opacity = 0.9;
  setTimeout(() => {
    flE.style.transition = "opacity 1.4s";
    flE.style.opacity = 0;
  }, 60);
  tone(90, 1, "sawtooth", 0.25);
  toast(
    "💀 You died! Back to the entrance. Doors relocked, points lost. Crystals and the pistol are kept.",
  );
  resetRun();
  me3.x = CVX;
  me3.z = CVZ + 3.2;
  me3.y = 0.5;
  me3.vx = me3.vz = 0;
  goalPt = goalObj = null;
  snapCam();
}
function resetRun() {
  RUN.cash = 0;
  RUN.kills = 0;
  RUN.t = 0;
  RUN.sp = 5;
  PH.v = PH.max;
  GUN.mag = 8;
  GUN.ammo = 24;
  GUN.rel = 0;
  CDOOR.forEach((d) => {
    d.open = false;
    d.g.position.y = 0.5;
    d.it.hint = "🔒 Door: " + d.cost + " points (earn them by fighting)";
  });
  ENEMY.forEach((z) => cRoot.remove(z.g));
  ENEMY.length = 0;
  pedNext = 0;
  vaultOpen = vaultDone = false;
  PED.forEach((p) => {
    p.lit = false;
    p.gm.emissiveIntensity = 0.15;
  });
  chLid.rotation.x = 0;
  chestG.userData.gl.visible = false;
  chestIt.hint = "🧰 A sealed chest…";
  cashUp();
  hudUp();
}
function reward(z, melee) {
  const d = ETY[z.type];
  RUN.cash += 10;
  dmgNum(z.x + 0.3, 1.4, z.z, "+10", "pts");
  if (z.hp <= 0 && !z.dead) {
    z.dead = 0.01;
    RUN.cash += d.kill;
    RUN.kills++;
    dmgNum(z.x, 2.1, z.z, "KILL +" + d.kill, "kill");
    tone(150, 0.3, "square", 0.12);
    if (Math.random() < 0.3) spawnAmmo(z.x, z.z);
  }
  cashUp();
}
function dealDamage(z, n, kx, kz) {
  z.hp -= n;
  z.hit = 0.15;
  z.stag = z.type === "brute" ? 0.1 : 0.3;
  dmgNum(z.x, 1.8, z.z, String(n), "dmg");
  burst(z.x, 1.1, z.z, z.type === "crab" ? 0xd8c060 : 0x7aff7a, 7, 1.6, 1.6);
  if (caveOK(z.x + kx * 0.7, z.z + kz * 0.7)) {
    z.x += kx * 0.7;
    z.z += kz * 0.7;
  }
  reward(z);
}
function attack() {
  if (!inCave || dead || now() - atkT < 420 || modalOpen) return;
  atkT = now();
  swing();
  tone(300, 0.08, "sawtooth", 0.08);
  const fx = Math.sin(me3.ry),
    fz = Math.cos(me3.ry);
  ENEMY.forEach((z) => {
    if (z.dead || z.rise > 0) return;
    const dx = z.x - me3.x,
      dz = z.z - me3.z,
      d = Math.hypot(dx, dz) || 1;
    if (d > 2.5) return;
    if ((dx * fx + dz * fz) / d < 0.25 && d > 1.3) return;
    dealDamage(z, 50, dx / d, dz / d);
  });
}
function shoot() {
  if (
    !inCave ||
    dead ||
    !GUN.owned ||
    modalOpen ||
    GUN.rel > 0 ||
    now() - GUN.last < 260
  )
    return;
  if (GUN.mag <= 0) {
    if (GUN.ammo > 0) reload();
    else toast("Out of ammo! Melee with F");
    return;
  }
  GUN.last = now();
  GUN.mag--;
  const fx = Math.sin(me3.ry),
    fz = Math.cos(me3.ry);
  let best = null,
    bd = 99;
  ENEMY.forEach((z) => {
    if (z.dead || z.rise > 0) return;
    const dx = z.x - me3.x,
      dz = z.z - me3.z,
      d = Math.hypot(dx, dz) || 1;
    if (d > 22 || Math.abs(adif(Math.atan2(dx, dz), me3.ry)) > 0.4) return;
    let los = true;
    for (let k = 1; k <= Math.floor(d / 0.6); k++) {
      if (!caveOK(me3.x + (dx / d) * k * 0.6, me3.z + (dz / d) * k * 0.6)) {
        los = false;
        break;
      }
    }
    if (los && d < bd) {
      bd = d;
      best = z;
    }
  });
  const tx = best ? best.x : me3.x + fx * 18,
    tz = best ? best.z : me3.z + fz * 18,
    P = bolt.geometry.attributes.position;
  P.setXYZ(0, me3.x + fx * 0.5, me3.y + 1.1, me3.z + fz * 0.5);
  for (let i = 1; i < 12; i++) P.setXYZ(i, tx, me3.y + 1.1, tz);
  P.needsUpdate = true;
  bolt.visible = true;
  boltT = 0.06;
  tone(700, 0.07, "square", 0.16);
  tone(200, 0.12, "sawtooth", 0.12, 0.02);
  burst(me3.x + fx * 0.7, me3.y + 1.2, me3.z + fz * 0.7, 0xffd24a, 5, 1, 1);
  if (best) {
    const dx = best.x - me3.x,
      dz = best.z - me3.z,
      d = Math.hypot(dx, dz) || 1;
    dealDamage(best, 60, dx / d, dz / d);
  }
  if (GUN.mag <= 0 && GUN.ammo > 0) reload();
  hudUp();
}
function reload() {
  if (GUN.rel > 0 || GUN.mag >= 8 || GUN.ammo <= 0) return;
  GUN.rel = 1.2;
  tone(400, 0.1, "square", 0.08);
  hudUp();
}
function spawnAmmo(x, z) {
  const g = new THREE.Group(),
    b = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.25), M(0xc8a030));
  b.position.y = 0.2;
  g.add(b);
  hitSph(g, 0.7, 0.3);
  addItem({
    id: "am" + Date.now() + Math.random(),
    kind: "ammo",
    x,
    z,
    r: 0,
    reach: 1.8,
    root: place(g, x, z, 0.5),
    hint: "📦 Ammo (+8)",
  });
}
addEventListener(
  "keydown",
  (e) => {
    if (!inCave || (e.target && e.target.tagName === "INPUT")) return;
    const k = e.key.toLowerCase();
    if (k === "f") {
      e.preventDefault();
      attack();
    } else if (k === "g") {
      e.preventDefault();
      shoot();
    } else if (k === "r") {
      e.preventDefault();
      reload();
    }
  },
  true,
);
atkB.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  attack();
});
gunB.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  shoot();
});
function caveInt(it) {
  if (it.kind === "cdoor") {
    const d = it.door;
    if (d.open) return true;
    if (RUN.cash < d.cost) {
      toast(
        "Not enough points 💰 (need " +
          d.cost +
          ", you have " +
          RUN.cash +
          "). Fight to earn them!",
      );
      tone(150, 0.2, "square", 0.1);
      return true;
    }
    RUN.cash -= d.cost;
    d.open = true;
    cashUp();
    tone(70, 1.2, "sawtooth", 0.2);
    burst(d.x, 1.5, d.z, 0xaaa090, 24, 2, 3);
    toast("🔓 Door opened! Stronger enemies ahead…");
    it.hint = "🔓 Open";
    return true;
  }
  if (it.kind === "crys") {
    X6.cave.cr[it.col] = 1;
    sv6();
    IG.remove(it.root);
    items.splice(items.indexOf(it), 1);
    jingle([659, 784, 988, 1319]);
    burst(it.x, 1, it.z, it.hex, 24, 3, 3);
    toast("💠 Crystal found! (" + Object.keys(X6.cave.cr).length + "/3)");
    return true;
  }
  if (it.kind === "gun") {
    X6.cave.pistol = 1;
    GUN.owned = true;
    GUN.mag = 8;
    GUN.ammo = 24;
    sv6();
    IG.remove(it.root);
    items.splice(items.indexOf(it), 1);
    jingle([392, 523, 659]);
    toast(
      "🔫 Pistol! Aim with the crosshair. Click or G to shoot, R to reload, F or right-click to melee.",
    );
    gunB.style.display = "block";
    hudUp();
    return true;
  }
  if (it.kind === "ammo") {
    GUN.ammo += 8;
    IG.remove(it.root);
    items.splice(items.indexOf(it), 1);
    tone(600, 0.1, "square", 0.08);
    toast("📦 +8 ammo");
    hudUp();
    return true;
  }
  if (it.kind === "skel") {
    showModal(
      `${X}<h2>💀 Le Tribun</h2><p>A skeleton in a red scarf, clutching a megaphone. He has been shouting at the dust since before the Revolution. The dust never listens.</p><p class="mute">(Fictional, and he is very loud.)</p>`,
    );
    $("#x").onclick = closeModal;
    return true;
  }
  if (it.kind === "ped") return pedestal(it);
  if (it.kind === "chest") return chestClaim(it);
  return false;
}
// ---- enemy brain
function enemyTick(dt, t) {
  if (!inCave) return;
  if (dead > 0) {
    dead -= dt;
    deathTick(dt);
    return;
  }
  RUN.t += dt;
  RUN.sp -= dt;
  PH.last += dt;
  if (PH.last > 9 && PH.v < PH.max) {
    PH.v = Math.min(PH.max, PH.v + 8 * dt);
    hudUp();
  }
  if (GUN.rel > 0) {
    GUN.rel -= dt;
    if (GUN.rel <= 0) {
      const n = Math.min(8 - GUN.mag, GUN.ammo);
      GUN.mag += n;
      GUN.ammo -= n;
      hudUp();
    }
  }
  const cap = 5 + (CDOOR[0].open ? 3 : 0) + (CDOOR[1].open ? 3 : 0);
  if (
    RUN.sp <= 0 &&
    !modalOpen &&
    !photoOn &&
    ENEMY.filter((z) => !z.dead).length < cap
  ) {
    spawnEnemy();
    RUN.sp = Math.max(1.6, 5 - RUN.kills * 0.1 - RUN.t * 0.008);
  }
  let near = 99;
  for (let i = ENEMY.length; i--;) {
    const z = ENEMY[i],
      d0 = ETY[z.type];
    if (z.dead) {
      z.dead += dt;
      z.g.rotation.x = -Math.min(1.5, z.dead * 4);
      z.g.position.y = 0.5 - Math.min(0.5, z.dead * 0.6);
      if (z.dead > 1.2) {
        cRoot.remove(z.g);
        ENEMY.splice(i, 1);
      }
      continue;
    }
    const sc0 = z.type === "brute" ? 1.35 : z.type === "crab" ? 1 : 1.02;
    if (z.rise > 0) {
      z.rise -= dt;
      const k = 1 - z.rise / 1.4;
      z.g.scale.setScalar(sc0 * (0.2 + 0.8 * k));
      z.g.position.set(z.x, 0.5 - (1 - k) * 1.2, z.z);
      continue;
    }
    const dx = me3.x - z.x,
      dz = me3.z - z.z,
      d = Math.hypot(dx, dz) || 1;
    near = Math.min(near, d);
    const u = z.g.userData;
    if (z.hit > 0) {
      z.hit -= dt;
      u.mat.emissive.setRGB(z.hit * 6, 0, 0);
    } else u.mat.emissive.setRGB(0, 0, 0);
    if (z.stag > 0) {
      z.stag -= dt;
      continue;
    }
    z.cd -= dt;
    if (z.type === "crab") {
      if (z.leap) {
        const L = z.leap;
        L.t += dt;
        const k = Math.min(1, L.t / 0.55);
        z.x = L.sx + (L.tx - L.sx) * k;
        z.z = L.sz + (L.tz - L.sz) * k;
        z.g.position.set(z.x, 0.5 + Math.sin(k * Math.PI) * 1.3, z.z);
        z.g.rotation.y = Math.atan2(L.tx - L.sx, L.tz - L.sz);
        if (k >= 1) {
          z.leap = null;
          z.cd = ETY.crab.cd + Math.random() * 0.8;
          if (Math.hypot(me3.x - z.x, me3.z - z.z) < 1.3) hurt(50);
        }
        continue;
      }
      if (d < 6 && d > 1.6 && z.cd <= 0) {
        const tx = me3.x,
          tz = me3.z;
        if (caveOK(tx, tz, 0)) {
          z.leap = { t: 0, sx: z.x, sz: z.z, tx, tz };
          tone(1100, 0.12, "square", 0.08);
          continue;
        }
      }
      const hop = Math.abs(Math.sin(t * 9 + z.ph));
      let nx = z.x + (dx / d) * z.sp * dt,
        nz = z.z + (dz / d) * z.sp * dt;
      if (!caveOK(nx, nz)) {
        if (caveOK(nx, z.z)) nz = z.z;
        else if (caveOK(z.x, nz)) nx = z.x;
        else {
          nx = z.x;
          nz = z.z;
        }
      }
      z.x = nx;
      z.z = nz;
      z.g.position.set(z.x, 0.5 + hop * 0.18, z.z);
      z.g.rotation.y = Math.atan2(dx, dz);
      u.legs.forEach((l, k) => (l.rotation.x = Math.sin(t * 14 + k) * 0.5));
      if (d < 1.2 && z.cd <= 0) {
        z.cd = ETY.crab.cd;
        hurt(50);
      }
      continue;
    }
    if (z.wind > 0) {
      z.wind -= dt;
      u.aL.rotation.x = u.aR.rotation.x = -1.9;
      if (z.wind <= 0) {
        if (d < 1.9) hurt(50);
        z.cd = d0.cd;
        u.aL.rotation.x = u.aR.rotation.x = -1.4;
      }
      continue;
    }
    if (d < 1.45 && z.cd <= 0) {
      z.wind = 0.35;
      tone(90, 0.3, "sawtooth", 0.1);
      continue;
    }
    let nx = z.x + (dx / d) * z.sp * dt,
      nz = z.z + (dz / d) * z.sp * dt;
    if (!caveOK(nx, nz)) {
      if (caveOK(nx, z.z)) nz = z.z;
      else if (caveOK(z.x, nz)) nx = z.x;
      else {
        nx = z.x;
        nz = z.z;
      }
    }
    z.x = nx;
    z.z = nz;
    const sw = Math.sin(t * (z.type === "runner" ? 9 : 5) + z.ph);
    z.g.position.set(z.x, 0.5 + Math.abs(sw) * 0.06, z.z);
    z.g.rotation.y = Math.atan2(dx, dz);
    u.lL.rotation.x = sw * 0.8;
    u.lR.rotation.x = -sw * 0.8;
    u.aL.rotation.x = -1.4 + sw * 0.12;
    u.aR.rotation.x = -1.4 - sw * 0.12;
    u.hd.rotation.z = 0.2 + Math.sin(t * 2 + z.ph) * 0.15;
  }
  if (near < 10 && Math.random() < dt * 0.7)
    tone(70 + Math.random() * 30, 0.5, "sawtooth", 0.07 * (1 - near / 10));
  hudUp();
}
function doorAnim(dt) {
  CDOOR.forEach((d) => {
    const ty = d.open ? -2.2 : 0.5;
    d.g.position.y += (ty - d.g.position.y) * Math.min(1, dt * 3);
  });
}
// ---- tunnel map
function drawCaveMap(c, w, h) {
  const x0 = CVX - 12,
    x1 = CVX + 86,
    z0 = CVZ - 25,
    z1 = CVZ + 16,
    sc = Math.min(w / (x1 - x0), h / (z1 - z0)),
    ox = (w - (x1 - x0) * sc) / 2,
    oz = (h - (z1 - z0) * sc) / 2,
    P = (x, z) => [ox + (x - x0) * sc, oz + (z - z0) * sc];
  c.clearRect(0, 0, w, h);
  c.fillStyle = "#120c1a";
  c.fillRect(0, 0, w, h);
  c.strokeStyle = "#3a3446";
  c.lineCap = "round";
  CSEG.forEach((s) => {
    c.lineWidth = s[4] * 2 * sc;
    const a = P(s[0], s[1]),
      b = P(s[2], s[3]);
    c.beginPath();
    c.moveTo(a[0], a[1]);
    c.lineTo(b[0], b[1]);
    c.stroke();
  });
  CROOMS.forEach((r, i) => {
    const p = P(r.x, r.z);
    c.fillStyle = i === 2 ? "#4a3a2a" : "#3a3446";
    c.beginPath();
    c.arc(p[0], p[1], r.r * sc, 0, 6.283);
    c.fill();
  });
  const fs = Math.max(10, sc * 2);
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillStyle = "#fff";
  [
    ["⬆️ Entrance", 0],
    ["Big hall 🔫", 1],
    ["💀 Catacombs", 2],
  ].forEach(([l, i]) => {
    const r = CROOMS[i],
      p = P(r.x, r.z);
    c.font = "bold " + fs + "px system-ui";
    c.fillText(l, p[0], p[1] - r.r * sc * 0.45);
  });
  CDOOR.forEach((d) => {
    const p = P(d.x, d.z);
    c.fillStyle = d.open ? "#5fc454" : "#e0503a";
    c.fillRect(p[0] - sc * 0.5, p[1] - sc * 1.2, sc, sc * 2.4);
    c.fillStyle = "#fff";
    c.font = fs * 0.8 + "px system-ui";
    c.fillText(d.open ? "open" : "" + d.cost, p[0], p[1] + sc * 2.6);
  });
  CRY.forEach(([col, hex, x, z]) => {
    const p = P(x, z),
      got = X6.cave.cr[col];
    c.font = fs * 1.2 + "px serif";
    c.globalAlpha = got ? 1 : 0.4;
    c.fillText("💠", p[0], p[1]);
    c.globalAlpha = 1;
  });
  ENEMY.forEach((z) => {
    if (z.dead) return;
    const p = P(z.x, z.z);
    c.fillStyle = z.type === "crab" ? "#ffb030" : "#ff3030";
    c.beginPath();
    c.arc(p[0], p[1], Math.max(2, sc * 0.5), 0, 6.283);
    c.fill();
  });
  const p = P(me3.x, me3.z);
  c.fillStyle = "#fff";
  c.strokeStyle = "#e8283c";
  c.lineWidth = 3;
  c.beginPath();
  c.arc(p[0], p[1], Math.max(4, sc * 0.8), 0, 6.283);
  c.fill();
  c.stroke();
  c.fillStyle = "#ffd24a";
  c.font = "bold " + fs * 0.9 + "px system-ui";
  c.textAlign = "left";
  c.fillText("Tunnel map · 💰 " + RUN.cash, 8, fs);
}
// ---- camera: very close in the tunnels, free in the halls
function camWant() {
  if (inCave) return caveCamData().pos;
  if (sailing) return sailCamPos();
  if (TPS && !photoOn) return tpsData().pos;
  const cp = Math.cos(pitch),
    sx = Math.sin(yaw) * cp,
    sy = Math.sin(pitch),
    sz = Math.cos(yaw) * cp;
  let d = dist,
    ri = -1;
  if (!inCave) {
    for (let k = 1; k <= 14; k++) {
      const t = (k / 14) * dist,
        x = me3.x + sx * t,
        y = me3.y + 1.2 + sy * t,
        z = me3.z + sz * t;
      if (y < hm(x, z) + 0.9) {
        d = Math.max(2.5, t - 1);
        break;
      }
    }
  } else {
    ri = roomOf(me3.x, me3.z, 0);
    d = Math.min(dist, ri >= 0 ? 5.8 : 3.2);
    const pad = ri >= 0 ? 1.4 : 0.25;
    for (let k = 0; k < 16; k++) {
      if (caveOK(me3.x + sx * d, me3.z + sz * d, pad)) break;
      d -= 0.35;
      if (d < 1.6) {
        d = 1.6;
        break;
      }
    }
  }
  let y = me3.y + 1.2 + sy * d;
  if (inCave) y = Math.min(y, ri >= 0 ? CEIL[ri] - 1 : 1.45);
  return new THREE.Vector3(me3.x + sx * d, y, me3.z + sz * d);
}

// ===== v3.1: power system (generator -> purifiers) =====
RC.push(
  [
    "Air filter",
    "2🟨 + 1🔷 → 1🧽",
    { thatch: 2, plastic: 1 },
    { filter: 1 },
    0,
  ],
  ["Fan motor", "2🧱 + 1🔷 → 1🌀", { brick: 2, plastic: 1 }, { fan: 1 }, 0],
  [
    "Circuit board",
    "1🪟 + 1🧱 + 1🔷 → 1🔌",
    { glass: 1, brick: 1, plastic: 1 },
    { circuit: 1 },
    0,
  ],
);
Object.assign(NM, { baguette: "🥖" });
const PWR = { gen: 0, pur: 0, on: 0, g: [], pw: [], un: [] },
  pwL = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: 0x6af0ff }),
  );
pwL.frustumCulled = false;
scene.add(pwL);
const nopTex = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    g.font = "44px serif";
    g.textAlign = "center";
    g.fillText("🔌", 26, 46);
    g.fillText("❌", 44, 30);
    return new THREE.CanvasTexture(c);
  })(),
  nopS = [];
const bpos = (k) => {
  const p = k.split("_");
  return [+p[0] + 0.5, 1 + +p[1] + 0.5, +p[2] + 0.5];
};
let pwT = 0;
function powerTick(dt, t) {
  if (Math.random() < dt * 4) {
    const g = PWR.g[Math.floor(Math.random() * PWR.g.length)];
    if (g) burst(g[0], g[1] + 0.7, g[2], 0xffd24a, 1, 0.6, 1.4);
    const p = PWR.pw[Math.floor(Math.random() * PWR.pw.length)];
    if (p) burst(p[0], p[1] + 0.6, p[2], 0x9ad7e0, 1, 0.4, 1.2);
  }
  pwT -= dt;
  if (pwT > 0) return;
  pwT = 1;
  const G2 = (blockIds.generator || []).map(bpos),
    P2 = (blockIds.purifier || []).map(bpos),
    cap = G2.map(() => 2),
    links = [],
    un = [];
  P2.map((p) => ({
    p,
    d: G2.length
      ? Math.min(...G2.map((g) => Math.hypot(g[0] - p[0], g[2] - p[2])))
      : 1e9,
  }))
    .sort((a, b) => a.d - b.d)
    .forEach((o) => {
      let bi = -1,
        bd = 1e9;
      G2.forEach((g, i) => {
        if (cap[i] > 0) {
          const d = Math.hypot(g[0] - o.p[0], g[2] - o.p[2]);
          if (d < bd) {
            bd = d;
            bi = i;
          }
        }
      });
      if (bi >= 0) {
        cap[bi]--;
        links.push([G2[bi], o.p]);
      } else un.push(o.p);
    });
  PWR.gen = G2.length;
  PWR.pur = P2.length;
  PWR.on = links.length;
  PWR.g = G2;
  PWR.pw = links.map((l) => l[1]);
  PWR.un = un;
  const arr = new Float32Array(links.length * 6);
  links.forEach((l, i) =>
    arr.set(
      [l[0][0], l[0][1] + 0.4, l[0][2], l[1][0], l[1][1] + 0.4, l[1][2]],
      i * 6,
    ),
  );
  pwL.geometry.dispose();
  pwL.geometry = new THREE.BufferGeometry();
  pwL.geometry.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  while (nopS.length < un.length) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: nopTex, depthWrite: false }),
    );
    s.scale.set(0.9, 0.9, 1);
    scene.add(s);
    nopS.push(s);
  }
  nopS.forEach((s, i) => {
    s.visible = i < un.length;
    if (i < un.length) s.position.set(un[i][0], un[i][1] + 1.1, un[i][2]);
  });
  if (G2.length && !EXF.genTip) {
    EXF.genTip = 1;
    toast(
      "⚡ Generator placed! It powers 2 purifiers anywhere on the island. Tap it for details.",
    );
  }
  if (P2.length && !G2.length && !EXF.purTip) {
    EXF.purTip = 1;
    toast(
      "♻️ A purifier needs power: craft a Generator ⚡ (1 generator = 2 purifiers).",
    );
  }
}
function exPow(kind) {
  const s = PWR;
  powerTick(0, 0);
  pwT = 0;
  showModal(
    `${X}<h2>${kind === "gen" ? "⚡ Generator" : "♻️ Air purifier"}</h2><p>${kind === "gen" ? "A generator powers up to <b>2 air purifiers</b> anywhere on the island. No wires or fuel: just place it. Glowing blue lines show which purifiers it feeds." : "Cleans the air a bit more when powered. It needs a generator somewhere on the island: <b>1 generator = 2 purifiers</b>."}</p><div style="border:2px solid var(--line);border-radius:14px;padding:10px 12px;margin:8px 0">⚡ Generators <b>${s.gen}</b> · ♻️ Purifiers <b>${s.pur}</b> · ✅ Powered <b>${s.on}</b></div><p>${s.pur > s.on ? "❌ " + (s.pur - s.on) + " purifier(s) have no power. Craft another ⚡ Generator (4🧱 + 2🪨) at the workbench." : s.pur === 0 ? "Next: craft an Air purifier ♻️ (3🧱 + 2🪟 + 🧽 + 🌀 + 🔌). You can craft the three parts at the workbench with plastic 🔷 from the Trash converter." : "✅ Everything is powered. Air quality is " + Math.round((1 - pollution) * 100) + "%. Keep clearing trash!"}</p>`,
  );
  $("#x").onclick = closeModal;
}
function exGen() {
  exPow("gen");
}
function exPur() {
  exPow("pur");
}

// ===== v3.1: boat physics (heading, speed, wind, waves, grounding) =====
const BO = {
    h: 0,
    v: 0,
    w: 0,
    wv: 0,
    vx: 0,
    vz: 0,
    bump: 0,
    lx: 0,
    lz: 0,
    roll: 0,
    pitch: 0,
    dx: 0,
    dz: 0,
    wet: 0,
    lw: null,
  },
  BOAT0 = [boatItem.x, boatItem.z],
  sailE = document.createElement("div");
sailE.className = "pill";
sailE.style.cssText =
  "top:calc(env(safe-area-inset-top,0px) + 46px);left:50%;transform:translateX(-50%);display:none;font-weight:800;pointer-events:none";
document.body.appendChild(sailE);
let windA = 0.9;
boatG.rotation.order = "YXZ";
const sailM = boatG.children.find(
    (c) =>
      c.geometry &&
      c.geometry.type === "ShapeGeometry" &&
      Math.abs(c.position.y - 1.1) < 0.01,
  ),
  flagM = boatG.children.find(
    (c) =>
      c.geometry && c.geometry.type === "PlaneGeometry" && c.position.y > 4,
  ),
  tillG = new THREE.Group();
tillG.position.set(0, 0.8, -2.4);
{
  const tl = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 1), M(0x5a3a22));
  tl.position.z = -0.5;
  tillG.add(tl);
  boatG.add(tillG);
}
const waveH = (x, z, t) =>
  SEA +
  (Math.sin(x * 0.55 + t * 1.3) * 0.035 + Math.cos(z * 0.45 + t * 1.1) * 0.03) *
    (1 + WXK * 5);
function sailMove(dx, dz, dt) {
  BO.dx = dx;
  BO.dz = dz;
  me3.spd = BO.v;
}
function openBoat() {
  if (chap() < 8) {
    village.chap = 8;
    vup({ chap: 8 });
    lastChap = 8;
    boatState();
    jingle([392, 523, 659, 784, 1047]);
    burst(boatG.position.x, 2, boatG.position.z, 0xffd24a, 30, 3, 3);
    showModal(
      `<h2>🎉 The boat is fixed!</h2><p>Planks, patched sail, a little pink flag. Far across the sea you spot a tiny island flying a <b>French flag</b>… the Gendarmerie is holding your cat <b>Twombly</b> there.</p><p>Tap the boat again to set sail. Steer with <b>WASD</b> or the stick: the boat glides, drifts a little in turns and picks up speed fast. A tailwind gives a small boost.</p><button id="fin" class="on">To the sea! ⛵</button>`,
    );
    $("#fin").onclick = closeModal;
    return;
  }
  if (sailing) return;
  sailing = true;
  BO.h = Math.atan2(boatItem.x, boatItem.z);
  BO.v = BO.vx = BO.vz = BO.wv = BO.bump = 0;
  BO.wet = 0;
  BO.lw = null;
  BO.dx = BO.dz = 0;
  me3.x = boatG.position.x;
  me3.z = boatG.position.z;
  toast(
    "⛵ Casting off! Steer with WASD or the stick. Push toward the shore to land.",
  );
}
function disembark(t) {
  sailing = false;
  BO.wet = 0;
  BO.v = BO.vx = BO.vz = BO.wv = BO.bump = 0;
  const dx = Math.sin(BO.h),
    dz = Math.cos(BO.h);
  let px = me3.x,
    pz = me3.z;
  for (let k = 1; k <= 8; k++) {
    const x = me3.x + dx * k * 0.8,
      z = me3.z + dz * k * 0.8;
    if (hm(x, z) > 0.5) {
      px = x;
      pz = z;
      break;
    }
  }
  boatItem.x = me3.x;
  boatItem.z = me3.z;
  me3.x = px;
  me3.z = pz;
  me3.y = hm(px, pz) + 0.1;
  me3.vy = 0;
  boatG.rotation.set(0, BO.h, 0, "YXZ");
  sailE.style.display = "none";
  toast("⚓ Landed. Tap the boat whenever you want to sail again.");
}
function sailTick(dt, t) {
  if (!sailing) {
    sailE.style.display = "none";
    return;
  }
  dt = Math.min(dt, 0.05);
  const mag = Math.min(1, Math.hypot(BO.dx, BO.dz));
  windA += Math.sin(t * 0.05) * dt * 0.04;
  if (hm(me3.x, me3.z) < SEA - 0.3) BO.wet = 1;
  const tail = Math.cos(adif(windA, BO.h)),
    vmax = 8.2 * (1 + 0.12 * tail) * (1 - WXK * 0.1);
  // steering: smoothed angular velocity so the boat banks and swings instead of snapping
  let diff = 0,
    tw = 0,
    brake = false;
  if (mag > 0.1) {
    diff = adif(Math.atan2(BO.dx, BO.dz), BO.h);
    if (Math.abs(diff) > 2.45) brake = true;
    else tw = clamp(diff * 3.2, -1.7, 1.7);
  }
  BO.wv += (tw - BO.wv) * Math.min(1, dt * 7);
  BO.h += BO.wv * dt;
  BO.w = clamp(BO.wv / 1.7, -1, 1);
  // throttle: fast acceleration, slight slide in turns, gentle coast when you let go
  const hx = Math.sin(BO.h),
    hz = Math.cos(BO.h),
    tv =
      mag > 0.1 && !brake
        ? vmax * mag * (0.5 + 0.5 * Math.max(0, Math.cos(diff)))
        : 0,
    k = Math.min(1, dt * (tv > 0 ? 2.8 : brake ? 2.4 : 1.1));
  BO.vx += (hx * tv - BO.vx) * k;
  BO.vz += (hz * tv - BO.vz) * k;
  const drift = (0.1 + 0.2 * WXK) * dt;
  let nx = me3.x + BO.vx * dt + Math.sin(windA) * drift,
    nz = me3.z + BO.vz * dt + Math.cos(windA) * drift;
  // shoreline: slide along the coast instead of stopping dead; push into the beach to land
  const hit = (x, z) => BO.wet && hm(x, z) > SEA - 0.1;
  if (hit(nx, nz)) {
    if (!hit(nx, me3.z)) {
      nz = me3.z;
      BO.vz *= 0.35;
    } else if (!hit(me3.x, nz)) {
      nx = me3.x;
      BO.vx *= 0.35;
    } else {
      nx = me3.x;
      nz = me3.z;
      BO.vx *= 0.3;
      BO.vz *= 0.3;
    }
    if (mag > 0.1 && Math.hypot(BO.vx, BO.vz) < 1.4) BO.bump += dt;
    else BO.bump = Math.max(0, BO.bump - dt);
  } else BO.bump = Math.max(0, BO.bump - dt * 2);
  const rr = Math.hypot(nx, nz);
  if (rr > 380) {
    nx *= 380 / rr;
    nz *= 380 / rr;
    BO.vx *= 0.5;
    BO.vz *= 0.5;
  }
  me3.x = nx;
  me3.z = nz;
  BO.v = Math.hypot(BO.vx, BO.vz);
  if (BO.bump > 0.5) {
    BO.bump = 0;
    disembark(t);
    return;
  }
  const dirx = hx,
    dirz = hz,
    yc = waveH(me3.x, me3.z, t),
    yb = waveH(me3.x + dirx * 2.4, me3.z + dirz * 2.4, t),
    ys = waveH(me3.x - dirx * 2.4, me3.z - dirz * 2.4, t),
    yp = waveH(me3.x + dirz, me3.z - dirx, t),
    yq = waveH(me3.x - dirz, me3.z + dirx, t),
    pit = -Math.atan2(yb - ys, 4.8) * 1.6,
    rol = Math.atan2(yp - yq, 2) * 1.6 - BO.w * BO.v * 0.022;
  BO.pitch += (pit - BO.pitch) * Math.min(1, dt * 3);
  BO.roll += (rol - BO.roll) * Math.min(1, dt * 4);
  boatG.position.set(
    me3.x,
    Math.max(yc, hm(me3.x, me3.z)) - 0.12 + Math.sin(t * 2.1) * 0.015,
    me3.z,
  );
  boatG.rotation.set(BO.pitch + Math.sin(t * 1.3) * 0.01, BO.h, BO.roll, "YXZ");
  me3.ry = BO.h;
  me3.y = boatG.position.y + 0.4;
  me3.vy = 0;
  me3.spd = BO.v;
  boatItem.x = me3.x;
  boatItem.z = me3.z;
  if (sailM)
    sailM.rotation.y =
      -Math.PI / 2 + clamp(adif(windA, BO.h), -1.3, 1.3) * 0.55;
  if (flagM) flagM.rotation.y = Math.PI / 2 + adif(windA, BO.h) * 0.6;
  tillG.rotation.y = -BO.w * 0.5;
  if (BO.v > 1 && Math.random() < dt * Math.min(40, BO.v * 7))
    burst(
      me3.x - dirx * 2.2 + (Math.random() - 0.5) * 0.8,
      SEA + 0.05,
      me3.z - dirz * 2.2,
      0xffffff,
      1,
      0.5,
      0.3,
    );
  if (BO.v > 5.5 && Math.random() < dt * 18)
    burst(
      me3.x + dirx * 2.6,
      SEA + 0.1,
      me3.z + dirz * 2.6,
      0xdff4ff,
      1,
      1,
      1.2,
    );
  const rel = adif(windA, BO.h),
    arr = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"][
      ((Math.round(rel / (Math.PI / 4)) % 8) + 8) % 8
    ];
  sailE.style.display = photoOn ? "none" : "block";
  sailE.textContent =
    "⛵ " +
    (BO.v * 1.94).toFixed(1) +
    " kn · 💨 " +
    arr +
    (tail > 0.5 ? " tailwind boost" : tail < -0.5 ? " headwind" : " crosswind");
}

// ===== v3.1: Île de la Gendarmerie (full rebuild) =====
// ---- v3.1 final per-frame
let miniT = 0;
const mc = miniC.getContext("2d");
sailE.id = "sailE";
window.exTick = function (dt, t) {
  exTick5(dt, t);
  if (!ready) return;
  if (inCave && !wasCave2) {
    wasCave2 = true;
    resetRun();
  }
  if (!inCave) wasCave2 = false;
  const sh = inCave && !photoOn;
  cashE.style.display = sh ? "block" : "none";
  hpE.style.display = sh ? "block" : "none";
  atkB.style.display = sh ? "block" : "none";
  gunB.style.display = sh && GUN.owned ? "block" : "none";
  weatherTick(dt, t);
  restoreTick(dt, t);
  flyTick(t);
  aqTick(t);
  catTick();
  enemyTick(dt, t);
  doorAnim(dt);
  dmgTick(dt);
  powerTick(dt, t);
  copTick(dt, t);
  photoTick(dt);
  if (inCave && boltT > 0) {
    boltT -= dt;
    if (boltT <= 0) bolt.visible = false;
  }
  CRY.forEach(([c]) => {
    const it = items.find((i) => i.id === "cr" + c);
    if (it && it.m) it.m.rotation.y += dt * 1.5;
  });
  if (QM !== "auto") fpsE = QM === "low" ? 20 : 90;
  miniT -= dt;
  if (miniT <= 0 && !photoOn) {
    miniT = 0.25;
    if (inCave) drawCaveMap(mc, 110, 110);
    else drawWorld(mc, 110, true);
  }
  if (mapOn && miniT > 0.2) mapDraw();
  svT -= dt;
  if (svT <= 0) {
    svT = 5;
    X6.flags = Object.assign({}, EXF);
    delete X6.flags.intro;
    delete X6.flags.casts;
    sv6();
  }
};

requestAnimationFrame(frame);

// ---------- v3.5 extras: inputs, boat camera, ladder recipe
cv.addEventListener("mousedown", (e) => {
  if (!inCave || dead > 0 || modalOpen) return;
  if (document.pointerLockElement === cv) {
    e.preventDefault();
    if (e.button === 0) {
      FIRE.down = true;
      GUN.owned ? shoot() : attack();
    } else if (e.button === 2) attack();
  }
});
addEventListener("mouseup", (e) => {
  if (e.button === 0) FIRE.down = false;
});
cv.addEventListener("contextmenu", (e) => {
  if (inCave) e.preventDefault();
});
cv.addEventListener("click", (e) => {
  if (
    inCave &&
    !modalOpen &&
    dead <= 0 &&
    e.pointerType !== "touch" &&
    matchMedia("(pointer:fine)").matches &&
    !document.pointerLockElement
  ) {
    try {
      const p = cv.requestPointerLock();
      if (p && p.catch) p.catch(() => {});
    } catch (_) {}
  }
});
addEventListener(
  "keydown",
  (e) => {
    if (!inCave || (e.target && e.target.tagName === "INPUT") || modalOpen)
      return;
    if (e.key.toLowerCase() === "e" && useIt) {
      e.preventDefault();
      doInteract(useIt);
    }
  },
  true,
);
function sailCamPos() {
  const pe = Math.max(pitch, 0.46),
    dd = clamp(dist * 1.15 + 3 + BO.v * 0.35, 15, 30),
    cp = Math.cos(pe);
  return new THREE.Vector3(
    me3.x + BO.lx * 0.4 + Math.sin(yaw) * cp * dd,
    me3.y + 1.2 + Math.sin(pe) * dd,
    me3.z + BO.lz * 0.4 + Math.cos(yaw) * cp * dd,
  );
}
function sailCamTick(dt) {
  if (!window.lastDragT || performance.now() - window.lastDragT > 1500) {
    if (BO.v > 0.6 || Math.abs(BO.wv) > 0.2)
      yaw += adif(BO.h + Math.PI, yaw) * Math.min(1, dt * (1.1 + BO.v * 0.12));
  }
  const f0 = cam.userData.f0 || (cam.userData.f0 = cam.fov),
    tf = f0 + Math.min(9, BO.v * 1.1);
  if (Math.abs(cam.fov - tf) > 0.03) {
    cam.fov += (tf - cam.fov) * Math.min(1, dt * 2.5);
    cam.updateProjectionMatrix();
  }
}
RC.push([
  "Long ladder",
  "8 planks + 4 thatch = 1 long ladder (to climb the prison wall)",
  { plank: 8, thatch: 4 },
  { ladder: 1 },
  0,
]);
NM.ladder = "🪜";
// ===================================================================
// v3.5 CAVE REBUILD: one signed-distance shape drives walls, floor, ceiling, collision, camera
// ===================================================================
var GUNIT = null,
  QC = [],
  cpit = 0.14,
  HIT = { t: 0, sh: 0, kick: 0 },
  FIRE = { down: false },
  DIE = { t: 0 },
  MEL = { last: 0, combo: 0, lunge: 0, lx: 0, lz: 0 },
  TORCH = [],
  AIM = { sp: 0 };
CDOOR.forEach((d) => {
  const l = Math.hypot(d.dx, d.dz);
  d.ux = d.dx / l;
  d.uz = d.dz / l;
});
function cBase(x, z) {
  let d = 1e9,
    v;
  for (const r of CROOMS) {
    v = Math.hypot(x - r.x, z - r.z) - r.r;
    if (v < d) d = v;
  }
  for (const a of CALC) {
    v = Math.hypot(x - a.x, z - a.z) - a.r;
    if (v < d) d = v;
  }
  for (const s of CSEG) {
    v = sgd(x, z, s[0], s[1], s[2], s[3]) - s[4];
    if (v < d) d = v;
  }
  return d;
}
const csd = (x, z) => cBase(x, z) + (vn(x * 0.42, z * 0.42, 141) - 0.5) * 0.6;
function cCeil(x, z) {
  let h = 3.1;
  for (let i = 0; i < 3; i++) {
    const r = CROOMS[i],
      u = Math.min(1.25, Math.hypot(x - r.x, z - r.z) / (r.r + 1.2)),
      v = CEIL[i] * (1 - 0.5 * u * u);
    if (v > h) h = v;
  }
  for (const a of CALC) {
    const u = Math.min(1.25, Math.hypot(x - a.x, z - a.z) / (a.r + 0.8)),
      v = 3.9 * (1 - 0.3 * u * u);
    if (v > h) h = v;
  }
  return h + (vn(x * 0.3, z * 0.3, 143) - 0.5) * 0.35;
}
const CPROPS = [];
function doorHit(x, z, pad) {
  for (const d of CDOOR) {
    if (d.open) continue;
    const rx = x - d.x,
      rz = z - d.z,
      al = rx * d.ux + rz * d.uz,
      la = Math.abs(-rx * d.uz + rz * d.ux);
    if (Math.abs(al) < 0.55 + pad && la < 2.6) return true;
  }
  return false;
}
function caveOK(x, z, pad) {
  if (csd(x, z) >= -0.28) return false;
  if (pad) return true;
  if (doorHit(x, z, 0)) return false;
  for (const p of CPROPS) if (Math.hypot(x - p.x, z - p.z) < p.r) return false;
  return true;
}
const nearSegW = (x, z, c) =>
  CSEG.some((q) => sgd(x, z, q[0], q[1], q[2], q[3]) < c);
// ---------- textures
const HALO = (() => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d"),
    gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, "rgba(255,255,255,1)");
  gr.addColorStop(0.35, "rgba(255,255,255,.35)");
  gr.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
const BRICK = (() => {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = "#3c3834";
  g.fillRect(0, 0, 128, 128);
  for (let r = 0; r < 8; r++) {
    const off = r % 2 ? 16 : 0;
    for (let k = -1; k < 5; k++) {
      const sh = hs(k, r, 171);
      g.fillStyle = `rgb(${(100 + sh * 38) | 0},${(94 + sh * 34) | 0},${(86 + sh * 30) | 0})`;
      g.fillRect(k * 32 + off + 1, r * 16 + 1, 30, 14);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1, 2);
  return t;
})();
function doorTex(cost) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 320;
  const g = c.getContext("2d");
  g.fillStyle = "#5a3b22";
  g.fillRect(0, 0, 256, 320);
  for (let i = 0; i < 8; i++) {
    g.fillStyle = i % 2 ? "#4f321c" : "#684428";
    g.fillRect(i * 32, 0, 31, 320);
    g.fillStyle = "rgba(0,0,0,.25)";
    g.fillRect(i * 32 + 30, 0, 2, 320);
  }
  g.fillStyle = "#2a2a30";
  [40, 250].forEach((y) => g.fillRect(0, y, 256, 22));
  for (let i = 0; i < 8; i++)
    [51, 261].forEach((y) => {
      g.fillStyle = "#8a8a94";
      g.beginPath();
      g.arc(16 + i * 32, y, 4, 0, 6.283);
      g.fill();
    });
  g.fillStyle = "#1c1c22";
  g.fillRect(36, 112, 184, 88);
  g.strokeStyle = "#ffd24a";
  g.lineWidth = 5;
  g.strokeRect(36, 112, 184, 88);
  g.fillStyle = "#ffd24a";
  g.font = "bold 56px system-ui";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("🔒 " + cost, 128, 158);
  return new THREE.CanvasTexture(c);
}
// ---------- the cave shell (marching squares on the signed distance field)
const TINT = [
  new THREE.Color(0x7a7290),
  new THREE.Color(0x66758a),
  new THREE.Color(0xb0a07e),
  new THREE.Color(0x625c70),
];
const roomTint = (x, z) => {
  for (let i = 0; i < 3; i++) {
    const r = CROOMS[i];
    if (Math.hypot(x - r.x, z - r.z) < r.r + 2.5) return i;
  }
  return 3;
};
(function buildShell() {
  const GX0 = CVX - 16,
    GZ0 = CVZ - 27,
    G = 0.5,
    NX = 214,
    NZ = 92,
    S = [];
  for (let j = 0; j <= NZ; j++) {
    const row = new Float32Array(NX + 1);
    for (let i = 0; i <= NX; i++) row[i] = csd(GX0 + i * G, GZ0 + j * G);
    S.push(row);
  }
  const wp = [],
    wc = [],
    fp = [],
    fc = [],
    cp = [],
    cc = [],
    oss = [],
    col = new THREE.Color();
  const ept = (i0, j0, i1, j1) => {
    const v0 = S[j0][i0],
      v1 = S[j1][i1],
      t = v0 / (v0 - v1);
    return [GX0 + (i0 + (i1 - i0) * t) * G, GZ0 + (j0 + (j1 - j0) * t) * G];
  };
  const pc = (arr, p, k) => {
    const t = TINT[roomTint(p[0], p[2])];
    const n = vn(p[0] * 0.8 + k, p[2] * 0.8 + p[1] * 0.5, 160),
      s = (0.62 + n * 0.55) * (p[1] < 1.2 ? 0.8 : 1);
    col.copy(t).multiplyScalar(s);
    arr.push(col.r, col.g, col.b);
  };
  const wallQuad = (A, B) => {
    const hA = cCeil(A[0], A[1]),
      hB = cCeil(B[0], B[1]);
    const P = (p, h, k) => {
      let y =
          k === 0
            ? 0.3
            : k === 3
              ? 0.5 + h + 0.3
              : 0.5 + h * (k === 1 ? 0.34 : 0.68),
        x = p[0],
        z = p[1];
      if (k === 1 || k === 2) {
        const gx = csd(x + 0.15, z) - csd(x - 0.15, z),
          gz = csd(x, z + 0.15) - csd(x, z - 0.15),
          l = Math.hypot(gx, gz) || 1,
          o = (vn(x * 1.3 + k * 7, z * 1.3, 150) - 0.5) * 0.5;
        x += (gx / l) * o;
        z += (gz / l) * o;
      }
      return [x, y, z];
    };
    for (let k = 0; k < 3; k++) {
      const a0 = P(A, hA, k),
        b0 = P(B, hB, k),
        a1 = P(A, hA, k + 1),
        b1 = P(B, hB, k + 1);
      wp.push(...a0, ...b0, ...a1, ...b0, ...b1, ...a1);
      [a0, b0, a1, b0, b1, a1].forEach((v) => pc(wc, v, k));
    }
    if (roomTint(A[0], A[1]) === 2 && roomTint(B[0], B[1]) === 2) {
      const gx = csd(A[0] + 0.15, A[1]) - csd(A[0] - 0.15, A[1]),
        gz = csd(A[0], A[1] + 0.15) - csd(A[0], A[1] - 0.15),
        l = Math.hypot(gx, gz) || 1;
      oss.push([A, B, -gx / l, -gz / l]);
    }
  };
  const T = {
    1: [[3, 0]],
    2: [[0, 1]],
    3: [[3, 1]],
    4: [[1, 2]],
    5: [
      [3, 0],
      [1, 2],
    ],
    6: [[0, 2]],
    7: [[3, 2]],
    8: [[2, 3]],
    9: [[0, 2]],
    10: [
      [0, 1],
      [2, 3],
    ],
    11: [[1, 2]],
    12: [[1, 3]],
    13: [[0, 1]],
    14: [[3, 0]],
  };
  for (let j = 0; j < NZ; j++)
    for (let i = 0; i < NX; i++) {
      const a = S[j][i],
        b = S[j][i + 1],
        c = S[j + 1][i + 1],
        d = S[j + 1][i],
        idx =
          (a < 0 ? 1 : 0) | (b < 0 ? 2 : 0) | (c < 0 ? 4 : 0) | (d < 0 ? 8 : 0);
      if (!idx) continue;
      if (Math.min(a, b, c, d) < 0) {
        const x0 = GX0 + i * G,
          z0 = GZ0 + j * G,
          x1 = x0 + G,
          z1 = z0 + G,
          Q = [
            [x0, z0],
            [x1, z0],
            [x1, z1],
            [x0, z1],
          ];
        const fv = Q.map((q) => [q[0], 0.5, q[1]]),
          cv = Q.map((q) => [q[0], 0.5 + cCeil(q[0], q[1]), q[1]]);
        [
          [0, 1, 2],
          [0, 2, 3],
        ].forEach((tr) =>
          tr.forEach((k) => {
            fp.push(...fv[k]);
            cp.push(...cv[k]);
            const t = TINT[roomTint(Q[k][0], Q[k][1])],
              n = vn(Q[k][0] * 0.9, Q[k][1] * 0.9, 162);
            col.copy(t).multiplyScalar(0.36 + 0.2 * n);
            fc.push(col.r, col.g, col.b);
            col.copy(t).multiplyScalar(0.3 + 0.12 * n);
            cc.push(col.r, col.g, col.b);
          }),
        );
      }
      if (idx === 15) continue;
      const E = [
        () => ept(i, j, i + 1, j),
        () => ept(i + 1, j, i + 1, j + 1),
        () => ept(i, j + 1, i + 1, j + 1),
        () => ept(i, j, i, j + 1),
      ];
      T[idx].forEach(([e0, e1]) => wallQuad(E[e0](), E[e1]()));
    }
  const mk = (pos, colr, rough) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(colr, 3));
    g.computeVertexNormals();
    const m = new THREE.Mesh(
      g,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: rough,
        metalness: 0,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
    );
    m.frustumCulled = false;
    cRoot.add(m);
    return m;
  };
  mk(wp, wc, 1);
  mk(fp, fc, 0.95);
  mk(cp, cc, 1);
  // ossuary: skulls and bones stacked along the catacomb walls
  const MAXI = 1900,
    sk = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.2, 8, 6),
      M(0xffffff, { map: SKT, roughness: 0.9 }),
      MAXI,
    ),
    bn = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.85, 5),
      BONE,
      MAXI,
    ),
    mt = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e = new THREE.Euler(),
    Y = new THREE.Vector3(0, 1, 0),
    one = new THREE.Vector3(1, 1, 1);
  let ns = 0,
    nb = 0;
  oss.forEach(([A, B, nx, nz]) => {
    const L = Math.hypot(B[0] - A[0], B[1] - A[1]),
      n = Math.max(1, Math.round(L / 0.42)),
      tx = (B[0] - A[0]) / L,
      tz = (B[1] - A[1]) / L;
    for (let k = 0; k < n; k++) {
      const u = (k + 0.5) / n;
      for (let row = 0; row < 6; row++) {
        const p = new THREE.Vector3(
          A[0] + (B[0] - A[0]) * u + nx * 0.12,
          0.82 + row * 0.44,
          A[1] + (B[1] - A[1]) * u + nz * 0.12,
        );
        if (p.y > 0.5 + cCeil(p.x, p.z) - 0.5) continue;
        if ((k + row) % 2 === 0 && ns < MAXI) {
          e.set(0, Math.atan2(nx, nz), 0);
          q.setFromEuler(e);
          mt.compose(p, q, one);
          sk.setMatrixAt(ns++, mt);
        } else if (nb < MAXI) {
          q.setFromUnitVectors(Y, new THREE.Vector3(tx, 0, tz));
          mt.compose(p, q, one);
          bn.setMatrixAt(nb++, mt);
        }
      }
    }
  });
  sk.count = ns;
  bn.count = nb;
  sk.frustumCulled = bn.frustumCulled = false;
  cRoot.add(sk, bn);
})();
// ---------- clean props: rocks hugging walls, stalactites, glowing mushrooms, torches, catacomb details
(function props() {
  const r3 = CROOMS,
    inRoom = (x, z) => roomTint(x, z) < 3 && csd(x, z) < 0;
  for (let ri = 0; ri < 3; ri++) {
    const rm = r3[ri];
    let n = 0;
    for (let i = 0; i < 90 && n < (ri === 1 ? 9 : 6); i++) {
      const a = hs(i, 181, ri) * 6.283,
        rr = rm.r - 0.4 - hs(i, 182, ri) * 1.1,
        x = rm.x + Math.cos(a) * rr,
        z = rm.z + Math.sin(a) * rr,
        s = csd(x, z);
      if (s > -0.6 || s < -1.6 || nearSegW(x, z, 4.2)) continue;
      const sx = 0.55 + hs(i, 183, ri) * 0.55,
        sy = 0.5 + hs(i, 184, ri) * 0.45;
      mkR(cRoot, x, 0.5 + sy * 0.35, z, sx, sy, sx * 0.9, i + ri * 9);
      CPROPS.push({ x, z, r: sx * 0.95 + 0.1 });
      n++;
    }
    n = 0;
    for (let i = 0; i < 120 && n < (ri === 1 ? 18 : 11); i++) {
      const a = hs(i, 185, ri) * 6.283,
        rr = Math.sqrt(hs(i, 186, ri)) * (rm.r - 2.4),
        x = rm.x + Math.cos(a) * rr,
        z = rm.z + Math.sin(a) * rr;
      if (csd(x, z) > -3 || nearSegW(x, z, 3.4)) continue;
      const L = 0.5 + hs(i, 187, ri) * 0.9,
        top = 0.5 + cCeil(x, z) + 0.15,
        c = new THREE.Mesh(
          new THREE.ConeGeometry(0.1 + hs(i, 188, ri) * 0.16, L, 6),
          stM2,
        );
      c.rotation.x = Math.PI;
      c.position.set(x, top - L / 2, z);
      cRoot.add(c);
      n++;
    }
    if (ri < 2) {
      const mu = new THREE.MeshBasicMaterial({ color: 0x4a8aff });
      let m = 0;
      for (let i = 0; i < 80 && m < 4; i++) {
        const a = hs(i, 189, ri) * 6.283,
          rr = rm.r - 0.3,
          x = rm.x + Math.cos(a) * rr,
          z = rm.z + Math.sin(a) * rr;
        if (csd(x, z) > -0.35 || csd(x, z) < -1 || nearSegW(x, z, 4)) continue;
        for (let k = 0; k < 3; k++) {
          const b = new THREE.Mesh(G.crown, mu);
          b.scale.set(0.1, 0.14, 0.1);
          b.position.set(
            x + Math.cos(k * 2) * 0.2,
            0.55 + k * 0.04,
            z + Math.sin(k * 2) * 0.2,
          );
          cRoot.add(b);
        }
        m++;
      }
    }
  }
  // catacomb pillars and candles
  const C3 = CROOMS[2];
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2 + 0.2,
      x = C3.x + Math.cos(a) * 4.4,
      z = C3.z + Math.sin(a) * 4.4,
      pl = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.62, 3.6, 12),
        M(0xcdbf9c, { roughness: 1 }),
      );
    pl.position.set(x, 2.3, z);
    pl.castShadow = true;
    cRoot.add(pl);
    CPROPS.push({ x, z, r: 0.85 });
  }
  const fm = new THREE.MeshBasicMaterial({ color: 0xffb84a });
  for (let i = 0; i < 12; i++) {
    const a = i * 0.55 + 0.2,
      r = C3.r * (0.45 + hs(i, 173, 9) * 0.35),
      x = C3.x + Math.cos(a) * r,
      z = C3.z + Math.sin(a) * r;
    if (csd(x, z) > -1.2 || Math.hypot(x - C3.x - 4.5, z - C3.z + 5.5) < 1.6)
      continue;
    const c = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.28, 8),
        M(0xfff4dc),
      ),
      f = new THREE.Mesh(G.crown, fm);
    c.position.set(x, 0.64, z);
    f.scale.set(0.05, 0.1, 0.05);
    f.position.set(x, 0.84, z);
    cRoot.add(c, f);
  }
  const cl = new THREE.PointLight(0xff9a50, 1.1, 20);
  cl.position.set(C3.x, 3, C3.z);
  cRoot.add(cl);
  const sc = document.createElement("canvas");
  sc.width = 512;
  sc.height = 160;
  {
    const x = sc.getContext("2d");
    x.fillStyle = "rgba(20,14,10,.9)";
    x.fillRect(0, 0, 512, 160);
    x.strokeStyle = "#cdbf9c";
    x.lineWidth = 6;
    x.strokeRect(6, 6, 500, 148);
    x.fillStyle = "#e3dcc8";
    x.font = "bold 40px serif";
    x.textAlign = "center";
    x.fillText("ARRÊTE !", 256, 62);
    x.font = "bold 28px serif";
    x.fillText("C'EST ICI L'EMPIRE DE LA MORT", 256, 112);
  }
  const sp = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(sc), fog: false }),
  );
  sp.scale.set(5, 1.56, 1);
  sp.position.set(C3.x - 7.4, 2.9, C3.z - 3.4);
  cRoot.add(sp);
})();
function mkTorch(x, z, y) {
  const g = new THREE.Group(),
    br = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.1), M(0x2a2420)),
    fl = new THREE.Mesh(
      new THREE.ConeGeometry(0.13, 0.36, 6),
      new THREE.MeshBasicMaterial({ color: 0xffa030 }),
    ),
    ha = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0xff9a40,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      }),
    );
  br.position.y = -0.1;
  fl.position.y = 0.3;
  ha.position.y = 0.32;
  ha.scale.set(2, 2, 1);
  g.add(br, fl, ha);
  g.position.set(x, y, z);
  g.userData = { fl, ha, ph: Math.random() * 6 };
  cRoot.add(g);
  TORCH.push(g);
}
// ---------- doors: stone frame + planked leaf that sinks into the floor
function buildDoors() {
  CDOOR.forEach((d) => {
    const hw = 1.7,
      H = 3.5,
      rot = -Math.atan2(d.dz, d.dx),
      stone = M(0xffffff, { map: BRICK, roughness: 1 }),
      fr = new THREE.Group();
    [-1, 1].forEach((s) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(1, H + 0.6, 0.9), stone);
      p.position.set(0, (H + 0.6) / 2, s * (hw + 0.1));
      fr.add(p);
    });
    const lin = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.7, hw * 2 + 1.1),
      stone,
    );
    lin.position.set(0, H + 0.15, 0);
    fr.add(lin);
    fr.position.set(d.x, 0.5, d.z);
    fr.rotation.y = rot;
    cRoot.add(fr);
    const g = new THREE.Group(),
      wood = M(0x4f321c, { roughness: 1 }),
      face = new THREE.MeshStandardMaterial({
        map: doorTex(d.cost),
        roughness: 0.9,
      }),
      leaf = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, H - 0.15, hw * 2 + 0.05),
        [face, face, wood, wood, wood, wood],
      );
    leaf.position.y = (H - 0.15) / 2;
    g.add(leaf);
    const sg = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: signTex("🔒 " + d.cost), fog: false }),
    );
    sg.scale.set(1.9, 0.72, 1);
    sg.position.y = H + 1.25;
    g.add(sg);
    hitSph(g, 2.2, 1.6);
    g.position.set(d.x, 0.5, d.z);
    g.rotation.y = rot;
    d.g = g;
    d.it = addItem({
      id: d.id,
      kind: "cdoor",
      door: d,
      x: d.x,
      z: d.z,
      r: 0,
      reach: 3,
      root: g,
      hint: "🔒 Door: " + d.cost + " points (earn points by fighting)",
    });
    [-1, 1].forEach((a) =>
      [-1, 1].forEach((b) =>
        mkTorch(
          d.x + d.ux * a * 2.1 - d.uz * b * 1.5,
          d.z + d.uz * a * 2.1 + d.ux * b * 1.5,
          2.4,
        ),
      ),
    );
  });
}
function doorAnim(dt) {
  CDOOR.forEach((d) => {
    const ty = d.open ? -4.2 : 0.5;
    d.g.position.y += (ty - d.g.position.y) * Math.min(1, dt * 2.6);
  });
}
// ---------- quest crystals: tall glowing clusters with a light beam
function mkQCrystal(hex) {
  const g = new THREE.Group(),
    mat = new THREE.MeshStandardMaterial({
      color: hex,
      emissive: hex,
      emissiveIntensity: 1.9,
      roughness: 0.25,
      flatShading: true,
    }),
    base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 1.2, 0.4, 8),
      M(0x4a4450, { roughness: 1 }),
    );
  base.position.y = 0.2;
  g.add(base);
  [
    [0, 0, 1.75, 0.23, 0],
    [0.5, 0.12, 1.15, 0.17, 0.3],
    [-0.45, 0.18, 1.3, 0.18, -0.35],
    [0.18, -0.5, 0.95, 0.15, 0.22],
    [-0.25, 0.45, 0.85, 0.14, -0.2],
    [0.55, -0.32, 0.65, 0.12, 0.35],
  ].forEach(([x, z, h, r, tilt]) => {
    const c = new THREE.Group(),
      b = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.85, r, h, 6), mat),
      t = new THREE.Mesh(new THREE.ConeGeometry(r * 0.85, h * 0.35, 6), mat);
    b.position.y = 0.4 + h / 2;
    t.position.y = 0.4 + h + h * 0.175;
    c.add(b, t);
    c.position.set(x, 0, z);
    c.rotation.set(tilt * 0.4, 0, tilt);
    g.add(c);
  });
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.95, 2.9, 14, 1, true),
    new THREE.MeshBasicMaterial({
      color: hex,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      fog: false,
    }),
  );
  beam.position.y = 1.95;
  g.add(beam);
  const ha = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: hex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      opacity: 0.9,
    }),
  );
  ha.scale.set(5.2, 5.2, 1);
  ha.position.y = 1.2;
  g.add(ha);
  g.userData = { beam, ha, mat };
  hitSph(g, 1.3, 1);
  return g;
}
function spawnQuestCrystals() {
  CRY.forEach(([col, hex, x, z]) => {
    if (X6.cave.cr[col]) return;
    const g = mkQCrystal(hex),
      it = addItem({
        id: "cr" + col,
        kind: "crys",
        col,
        hex,
        x,
        z,
        r: 0,
        reach: 2.6,
        root: place(g, x, z, 0.5),
        hint: "💠 A glowing crystal! Press to take it",
      });
    it.m = g;
    QC.push(it);
  });
}
// ---------- spawn decals (flat, no spikes) and wall torches
SPAWN.forEach((l, ri) =>
  l.forEach((p) => {
    const d = new THREE.Mesh(
        new THREE.CircleGeometry(0.85, 12),
        new THREE.MeshBasicMaterial({ color: ri === 2 ? 0x2a2418 : 0x1a1618 }),
      ),
      r = new THREE.Mesh(
        new THREE.RingGeometry(0.85, 1.1, 12),
        new THREE.MeshBasicMaterial({ color: ri === 2 ? 0xb8aa88 : 0x3a3238 }),
      );
    [d, r].forEach((m, i) => {
      m.rotation.x = -Math.PI / 2;
      m.position.set(p.x, 0.515 + i * 0.002, p.z);
      cRoot.add(m);
    });
  }),
);
// ---------- exit archway with daylight, relocated to the west wall of the entrance hall
(function exitArch() {
  const it = items.find((i) => i.id === "exit");
  if (!it) return;
  const g = it.root;
  g.clear();
  const ex = CVX - 10.3,
    ez = CVZ,
    st = M(0xffffff, { map: BRICK, roughness: 1 });
  [-1, 1].forEach((s) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.6, 0.9), st);
    p.position.set(0, 1.8, s * 1.7);
    g.add(p);
  });
  const li = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 4.5), st);
  li.position.set(0, 3.55, 0);
  g.add(li);
  const day = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3.2),
    new THREE.MeshBasicMaterial({
      color: 0xfff2c8,
      side: THREE.DoubleSide,
      fog: false,
    }),
  );
  day.rotation.y = Math.PI / 2;
  day.position.set(-0.45, 1.7, 0);
  g.add(day);
  const ha = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xfff0b0,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  ha.scale.set(7, 7, 1);
  ha.position.set(0.6, 1.8, 0);
  g.add(ha);
  const sg = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: signTex("↩ EXIT"), fog: false }),
  );
  sg.scale.set(1.9, 0.72, 1);
  sg.position.set(0.1, 4.35, 0);
  g.add(sg);
  hitSph(g, 2.2, 1.4);
  g.position.set(ex, 0.5, ez);
  g.rotation.y = Math.PI / 2;
  it.x = ex + 1.4;
  it.z = ez;
  it.reach = 3.2;
  it.hint = "↩ Leave the cave";
  mkTorch(ex + 1.3, ez - 2.6, 2.3);
  mkTorch(ex + 1.3, ez + 2.6, 2.3);
})();
// ---------- clear the old cave decorations, put the watching eyes on the new walls
(function cleanOld() {
  caveG.children.slice().forEach((c) => {
    if (!c.isPointLight && !eyes.includes(c)) caveG.remove(c);
  });
  eyes.forEach((g, i) => {
    g.userData.t = 1e9;
    g.visible = false;
    for (let k = 0; k < 12; k++) {
      const rm = CROOMS[(i + k) % 2],
        a = hs(i, k, 191) * 6.283,
        x = rm.x + Math.cos(a) * (rm.r - 0.45),
        z = rm.z + Math.sin(a) * (rm.r - 0.45);
      if (csd(x, z) > -0.2 || csd(x, z) < -0.9 || nearSegW(x, z, 3.6)) continue;
      g.position.set(x - CVX, 0.9 + hs(i, 3, 192) * 1.8, z - CVZ);
      g.children.forEach((e, c) =>
        e.position.set(
          -Math.sin(a) * 0.12 * (c ? 1 : -1),
          0,
          Math.cos(a) * 0.12 * (c ? 1 : -1),
        ),
      );
      g.userData.t = Math.random() * 4;
      break;
    }
  });
})();
buildDoors();
spawnQuestCrystals();
spawnGunCrate();
// ---------- held items (pistol / crowbar) for the cave
function mkCaveHeld(k) {
  const g = new THREE.Group(),
    dk = M(0x1c1c22, { metalness: 0.6, roughness: 0.35 }),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      g.add(m);
      return m;
    };
  if (k === "pistol") {
    A(new THREE.BoxGeometry(0.07, 0.36, 0.1), dk, 0, -0.14, 0);
    A(new THREE.BoxGeometry(0.06, 0.1, 0.17), M(0x3a2a1a), 0, 0.03, -0.09);
    A(new THREE.CylinderGeometry(0.022, 0.022, 0.14, 6), dk, 0, -0.36, 0.01);
  } else {
    A(
      new THREE.CylinderGeometry(0.028, 0.028, 0.78, 6),
      M(0x8a2a22, { metalness: 0.5, roughness: 0.5 }),
      0,
      -0.18,
      0,
    );
    const h = A(
      new THREE.TorusGeometry(0.07, 0.026, 6, 10, Math.PI * 1.3),
      M(0x8a2a22, { metalness: 0.5 }),
      0,
      -0.58,
      0.05,
    );
    h.rotation.y = Math.PI / 2;
  }
  return g;
}
// ---------- aim camera (third person shooter, cave only)
function caveCamData() {
  const p = dead > 0 ? Math.min(1, DIE.t / 3) : 0,
    fx = -Math.sin(yaw),
    fz = -Math.cos(yaw),
    rx = Math.cos(yaw),
    rz = -Math.sin(yaw),
    pa = clamp(cpit + HIT.kick, -0.5, 0.85) * 0.8,
    cs = Math.cos(pa),
    f3 = new THREE.Vector3(fx * cs, -Math.sin(pa), fz * cs),
    px = me3.x,
    py = me3.y + 1.5,
    pz = me3.z;
  let D = dead > 0 ? 2.8 + p * 3.2 : 2.8,
    S = dead > 0 ? 0 : 0.95,
    x = 0,
    y = 0,
    z = 0;
  for (let k = 0; k < 16; k++) {
    x = px - f3.x * D + rx * S;
    y = py - f3.y * D + (dead > 0 ? p * 2.6 : 0);
    z = pz - f3.z * D + rz * S;
    if (csd(x, z) < -0.4 && y < 0.5 + cCeil(x, z) - 0.3 && y > 0.85) break;
    D -= 0.2;
    S = Math.max(0, S - 0.08);
    if (D < 0.5) {
      D = 0.5;
      x = px - f3.x * D;
      y = Math.min(py, 0.5 + cCeil(px, pz) - 0.3);
      z = pz - f3.z * D;
      break;
    }
  }
  return { pos: new THREE.Vector3(x, y, z), f3, fx, fz, rx, rz };
}
function caveCamApply(dt) {
  const c = caveCamData();
  if (dead > 0) cam.position.lerp(c.pos, Math.min(1, dt * 3));
  else cam.position.copy(c.pos);
  const sh = HIT.sh;
  if (sh > 0) {
    HIT.sh = Math.max(0, sh - dt * 1.8);
    cam.position.x += (Math.random() - 0.5) * sh * 0.3;
    cam.position.y += (Math.random() - 0.5) * sh * 0.2;
    cam.position.z += (Math.random() - 0.5) * sh * 0.3;
  }
  HIT.kick *= Math.max(0, 1 - dt * 8);
  cam.lookAt(
    dead > 0
      ? new THREE.Vector3(me3.x, me3.y + 0.7, me3.z)
      : c.pos.clone().add(c.f3.clone().multiplyScalar(12)),
  );
  cam.updateMatrixWorld(true);
}
// ---------- HUD: crosshair, hit marker, objective, use prompt, death screen
const xh = document.createElement("div");
xh.style.cssText =
  "position:fixed;left:50%;top:50%;width:0;height:0;z-index:2;pointer-events:none;display:none;--sp:14px";
xh.innerHTML =
  '<div style="position:absolute;left:-2px;top:-2px;width:4px;height:4px;border-radius:2px;background:#fff;box-shadow:0 0 0 1.5px rgba(0,0,0,.6)"></div>' +
  [0, 90, 180, 270]
    .map(
      (a) =>
        `<div style="position:absolute;left:-1.5px;top:-1.5px;width:3px;height:10px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.55);transform:rotate(${a}deg) translateY(calc(var(--sp) * -1));transform-origin:1.5px 1.5px"></div>`,
    )
    .join("");
document.body.appendChild(xh);
const hmk = document.createElement("div");
hmk.style.cssText =
  "position:fixed;left:50%;top:50%;width:0;height:0;z-index:2;pointer-events:none;opacity:0;transition:opacity .25s";
hmk.innerHTML = [45, -45]
  .map(
    (a) =>
      `<div style="position:absolute;left:-1.5px;top:-11px;width:3px;height:22px;background:currentColor;box-shadow:0 0 0 1px #000;transform:rotate(${a}deg)"></div>`,
  )
  .join("");
document.body.appendChild(hmk);
function hitMark(kill) {
  hmk.style.color = kill ? "#ff3a3a" : "#fff";
  hmk.style.transition = "none";
  hmk.style.opacity = 1;
  requestAnimationFrame(() => {
    hmk.style.transition = "opacity .3s";
    hmk.style.opacity = 0;
  });
}
const goalE = hud$(
  "goalE",
  "top:calc(env(safe-area-inset-top,0px) + 124px);left:50%;transform:translateX(-50%);background:var(--glass);border-radius:14px;padding:5px 12px;font-weight:700;font-size:13px;text-align:center;max-width:88vw",
);
const useE = document.createElement("button");
useE.className = "pill";
useE.style.cssText =
  "top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 150px);left:50%;transform:translateX(-50%);display:none;pointer-events:auto;font-weight:800;font-size:16px;padding:10px 18px;z-index:4;max-width:92vw";
document.body.appendChild(useE);
let useIt = null;
const CUSE = new Set([
  "cdoor",
  "crys",
  "gun",
  "ammo",
  "skel",
  "ped",
  "chest",
  "exit",
  "crystal",
]);
useE.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  e.preventDefault();
  if (useIt) {
    if (useIt.kind === "takedown") exInt36(useIt);
    else doInteract(useIt);
  }
});
const deathE = document.createElement("div");
deathE.style.cssText =
  "position:fixed;inset:0;z-index:8;display:none;pointer-events:none;background:radial-gradient(circle at center,rgba(50,0,0,.55),rgba(0,0,0,.93));flex-direction:column;align-items:center;justify-content:center;text-align:center;opacity:0;transition:opacity .9s";
deathE.innerHTML =
  '<div style="font:900 clamp(44px,13vw,112px)/1 Georgia,serif;letter-spacing:.14em;color:#b3121c;text-shadow:0 0 30px #600,0 4px 0 #200;margin-bottom:18px">YOU DIED</div><div id="deS" style="font:700 17px/1.7 system-ui;color:#e8d8d8;text-shadow:0 2px 4px #000;padding:0 18px"></div>';
document.body.appendChild(deathE);
// ---------- death: a proper screen, then a FULL reset
function fullReset() {
  resetRun();
  GUN.owned = false;
  X6.cave.pistol = 0;
  X6.cave.cr = {};
  sv6();
  gunB.style.display = "none";
  if (GUNIT) {
    IG.remove(GUNIT.root);
    const i = items.indexOf(GUNIT);
    if (i >= 0) items.splice(i, 1);
    GUNIT = null;
  }
  spawnGunCrate();
  QC.forEach((it) => {
    IG.remove(it.root);
    const i = items.indexOf(it);
    if (i >= 0) items.splice(i, 1);
  });
  QC.length = 0;
  spawnQuestCrystals();
  items
    .filter((i) => i.kind === "ammo")
    .forEach((i) => {
      IG.remove(i.root);
      items.splice(items.indexOf(i), 1);
    });
  hudUp();
  cashUp();
}
function die() {
  if (dead > 0) return;
  dead = 3.6;
  DIE.t = 0;
  me3.g.rotation.order = "YXZ";
  const tm = Math.floor(RUN.t);
  document.getElementById("deS").innerHTML =
    `Kills ${RUN.kills} · Points ${RUN.cash} · Survived ${Math.floor(tm / 60)}:${String(tm % 60).padStart(2, "0")}<br><span style="opacity:.8;font-size:15px">The cave resets: doors relocked · points lost · pistol back on its crate · crystals back in place</span>`;
  deathE.style.display = "flex";
  requestAnimationFrame(() => (deathE.style.opacity = 1));
  R.domElement.style.filter = "grayscale(.9) contrast(1.15)";
  tone(90, 1.5, "sawtooth", 0.25);
  tone(55, 2.2, "sine", 0.3, 0.15);
  FIRE.down = false;
}
function deathTick(dt) {
  DIE.t += dt;
  me3.g.rotation.x = -1.5 * Math.min(1, DIE.t / 0.7) ** 2;
  if (dead <= 0) {
    dead = 0;
    fullReset();
    me3.g.rotation.x = 0;
    me3.g.rotation.order = "XYZ";
    me3.x = CVX - 6.8;
    me3.z = CVZ;
    me3.y = 0.5;
    me3.vx = me3.vz = 0;
    me3.ry = Math.PI / 2;
    yaw = -Math.PI / 2;
    cpit = 0.14;
    PH.v = PH.max;
    PH.last = 0;
    hudUp();
    R.domElement.style.filter = "";
    deathE.style.opacity = 0;
    setTimeout(() => {
      if (!dead) deathE.style.display = "none";
    }, 950);
    toast("You wake at the entrance. The cave has reset.");
    snapCam();
  }
}
// ---------- combat: melee that hits, a pistol you aim with the crosshair
function dealDamage(z, n, kx, kz, kb) {
  z.hp -= n;
  z.hit = 0.18;
  z.stag = z.type === "brute" ? 0.15 : 0.4;
  dmgNum(z.x, 1.8, z.z, String(n), "dmg");
  burst(z.x, 1.1, z.z, z.type === "crab" ? 0xd8c060 : 0x7aff7a, 9, 1.8, 1.8);
  const k = kb === undefined ? 0.7 : kb;
  for (const f of [1, 0.5]) {
    if (caveOK(z.x + kx * k * f, z.z + kz * k * f)) {
      z.x += kx * k * f;
      z.z += kz * k * f;
      break;
    }
  }
  reward(z);
  if (z.hp <= 0) hitMark(true);
}
const slashM = new THREE.Mesh(
  new THREE.RingGeometry(0.9, 1.9, 20, 1, -1.05, 2.1),
  new THREE.MeshBasicMaterial({
    color: 0xfff0b0,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
  }),
);
slashM.rotation.order = "YXZ";
slashM.visible = false;
scene.add(slashM);
let slashT = 0;
const trc = new THREE.Line(
  new THREE.BufferGeometry().setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(6), 3),
  ),
  new THREE.LineBasicMaterial({
    color: 0xffe9a0,
    transparent: true,
    opacity: 0.9,
  }),
);
trc.visible = false;
trc.frustumCulled = false;
scene.add(trc);
let trcT = 0;
const mzf = new THREE.Sprite(
  new THREE.SpriteMaterial({
    map: HALO,
    color: 0xffd070,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    fog: false,
  }),
);
mzf.scale.set(1.6, 1.6, 1);
mzf.visible = false;
scene.add(mzf);
let mzT = 0;
function attack() {
  if (!inCave || dead > 0 || modalOpen) return;
  const tn = now();
  if (tn - MEL.last < 320) return;
  MEL.combo = tn - MEL.last < 800 ? (MEL.combo + 1) % 3 : 0;
  MEL.last = tn;
  const c = caveCamData(),
    fx = c.fx,
    fz = c.fz,
    dmg = [50, 50, 80][MEL.combo];
  me3.act = 0.5;
  MEL.lunge = 0.13;
  MEL.lx = fx;
  MEL.lz = fz;
  slashM.visible = true;
  slashM.position.set(
    me3.x + fx * 0.4,
    me3.y + 1.0 + MEL.combo * 0.12,
    me3.z + fz * 0.4,
  );
  slashM.rotation.set(
    -Math.PI / 2 + (MEL.combo === 1 ? 0.5 : -0.35),
    Math.atan2(-fz, fx),
    MEL.combo === 1 ? 0.6 : 0,
  );
  slashM.scale.setScalar(0.6);
  slashM.material.opacity = 0.85;
  slashT = 0.2;
  let hit = 0;
  ENEMY.forEach((z) => {
    if (z.dead || z.rise > 0) return;
    const dx = z.x - me3.x,
      dz = z.z - me3.z,
      d = Math.hypot(dx, dz) || 1;
    if (d > (z.type === "brute" ? 3.3 : 2.9)) return;
    if ((dx * fx + dz * fz) / d < 0.3 && d > 1.2) return;
    hit++;
    dealDamage(z, dmg, dx / d, dz / d, 1.2 + MEL.combo * 0.35);
  });
  if (hit) {
    HIT.t = 0.06 + 0.025 * MEL.combo;
    HIT.sh = 0.45 + 0.25 * MEL.combo;
    hitMark(false);
    tone(120, 0.16, "square", 0.2);
    tone(72, 0.22, "sawtooth", 0.16, 0.02);
    tone(900, 0.05, "square", 0.08);
  } else {
    tone(330, 0.1, "sawtooth", 0.06);
    tone(220, 0.12, "sawtooth", 0.05, 0.04);
  }
}
function shoot() {
  if (
    !inCave ||
    dead > 0 ||
    !GUN.owned ||
    modalOpen ||
    GUN.rel > 0 ||
    now() - GUN.last < 230
  )
    return;
  if (GUN.mag <= 0) {
    GUN.last = now();
    if (GUN.ammo > 0) reload();
    else toast("Out of ammo! Melee with F / ⚔️");
    return;
  }
  GUN.last = now();
  GUN.mag--;
  const c = caveCamData(),
    ox = c.pos.x,
    oz = c.pos.z,
    fx = c.fx,
    fz = c.fz;
  let wt = 45;
  for (let t = 0.6; t < 45; t += 0.4) {
    const x = ox + fx * t,
      z = oz + fz * t;
    if (csd(x, z) > -0.05 || doorHit(x, z, 0)) {
      wt = t;
      break;
    }
  }
  let best = null,
    bt = wt;
  ENEMY.forEach((z) => {
    if (z.dead || z.rise > 0) return;
    const rx = z.x - ox,
      rz = z.z - oz,
      t = rx * fx + rz * fz;
    if (t < 0.8 || t > bt) return;
    const lat = Math.abs(rx * fz - rz * fx),
      rad =
        (z.type === "brute" ? 0.85 : z.type === "crab" ? 0.55 : 0.6) +
        0.12 +
        t * 0.006;
    if (lat < rad) {
      best = z;
      bt = t;
    }
  });
  const hx = Math.hypot(c.f3.x, c.f3.z) || 1,
    tx = ox + fx * bt,
    tz = oz + fz * bt,
    ty = best ? me3.y + 1.0 : Math.max(0.6, c.pos.y + (c.f3.y / hx) * bt),
    mx = me3.x + fx * 0.7 + c.rx * 0.28,
    mz = me3.z + fz * 0.7 + c.rz * 0.28,
    my = me3.y + 1.02,
    P = trc.geometry.attributes.position;
  P.setXYZ(0, mx, my, mz);
  P.setXYZ(1, tx, ty, tz);
  P.needsUpdate = true;
  trc.visible = true;
  trcT = 0.06;
  mzf.position.set(mx, my, mz);
  mzf.visible = true;
  mzT = 0.05;
  if (best) {
    const dx = best.x - me3.x,
      dz = best.z - me3.z,
      d = Math.hypot(dx, dz) || 1;
    dealDamage(best, 60, dx / d, dz / d, 0.5);
    hitMark(false);
    HIT.t = 0.025;
  } else {
    burst(tx, ty, tz, 0xffd24a, 7, 2.2, 2);
    tone(1500, 0.04, "square", 0.05);
  }
  HIT.kick += 0.06;
  HIT.sh = Math.max(HIT.sh, 0.16);
  AIM.sp = Math.min(1, AIM.sp + 0.4);
  tone(720, 0.07, "square", 0.16);
  tone(180, 0.14, "sawtooth", 0.13, 0.015);
  burst(mx, my, mz, 0xffd24a, 5, 1, 1);
  if (GUN.mag <= 0 && GUN.ammo > 0) reload();
  hudUp();
}
function reload() {
  if (GUN.rel > 0 || GUN.mag >= 8 || GUN.ammo <= 0) return;
  GUN.rel = 1.1;
  tone(420, 0.08, "square", 0.08);
  tone(300, 0.1, "square", 0.08, 0.5);
  hudUp();
}
// ---------- per-frame cave logic
function cave35Tick(dt, t) {
  cRoot.visible = inCave;
  if (slashT > 0) {
    slashT -= dt;
    const k = 1 - slashT / 0.2;
    slashM.scale.setScalar(0.6 + k * 0.7);
    slashM.material.opacity = 0.85 * (1 - k);
    if (slashT <= 0) slashM.visible = false;
  }
  if (trcT > 0) {
    trcT -= dt;
    if (trcT <= 0) trc.visible = false;
  }
  if (mzT > 0) {
    mzT -= dt;
    if (mzT <= 0) mzf.visible = false;
  }
  TORCH.forEach((g, i) => {
    const u = g.userData;
    u.fl.scale.set(1, 1 + Math.sin(t * 13 + u.ph) * 0.22, 1);
    u.ha.material.opacity = 0.55 + Math.sin(t * 9 + u.ph) * 0.15;
  });
  QC.forEach((it) => {
    const u = it.m.userData;
    u.beam.material.opacity = 0.13 + Math.sin(t * 2 + it.x) * 0.05;
    u.ha.scale.setScalar(5 + Math.sin(t * 2.4 + it.x) * 0.6);
    it.m.rotation.y = t * 0.4;
  });
  const show = inCave && dead <= 0 && !modalOpen;
  xh.style.display = show ? "block" : "none";
  if (show) {
    AIM.sp = Math.max(0, AIM.sp - dt * 2.5);
    xh.style.setProperty(
      "--sp",
      12 + (me3.spd > 0.5 ? 6 : 0) + AIM.sp * 16 + "px",
    );
    if (MEL.lunge > 0) {
      MEL.lunge -= dt;
      const nx = me3.x + MEL.lx * 7 * dt,
        nz = me3.z + MEL.lz * 7 * dt;
      if (
        caveOK(nx, nz) &&
        !ENEMY.some((z) => !z.dead && Math.hypot(z.x - nx, z.z - nz) < 0.9)
      ) {
        me3.x = nx;
        me3.z = nz;
      }
    }
    if (FIRE.down && GUN.owned) shoot();
    let best = null,
      bd = 99;
    for (const it of items) {
      if (!CUSE.has(it.kind)) continue;
      const d = Math.hypot(it.x - me3.x, it.z - me3.z);
      if (d < (it.reach || 2) + 0.3 && d < bd) {
        bd = d;
        best = it;
      }
    }
    useIt = best;
    if (best) {
      useE.style.display = "block";
      useE.textContent =
        (matchMedia("(pointer:fine)").matches ? "[E] " : "") +
        (best.hint || "Use").replace(/\btap to\b/i, "");
    } else useE.style.display = "none";
    const cr = Object.keys(X6.cave.cr).length,
      d1 = CDOOR[0].open,
      d2 = CDOOR[1].open;
    goalE.style.display = "block";
    goalE.textContent = !GUN.owned
      ? d1
        ? "🔫 Find the pistol crate in the big hall"
        : "💰 Kill zombies for " + CDOOR[0].cost + " pts, then open the door ➜"
      : !d2
        ? "💠 Crystals " +
          cr +
          "/3 · 💰 " +
          CDOOR[1].cost +
          " pts opens the next door"
        : "💀 Reach the catacombs and light the pedestals · 💠 " + cr + "/3";
  } else {
    useE.style.display = "none";
    goalE.style.display = "none";
    useIt = null;
  }
}
const exTick6 = window.exTick;
window.exTick = function (dt, t) {
  exTick6(dt, t);
  if (!ready) return;
  cave35Tick(dt, t);
  if (typeof prison35Tick === "function") prison35Tick(dt, t);
};

// ===================================================================
// v3.5 ÎLE D'IF: stealth prison island (ladder -> sneak -> key -> rescue -> escape)
// ===================================================================
const PS = 1.6,
  cI = Math.cos(LA),
  sI = Math.sin(LA),
  FACE = Math.atan2(cI, sI),
  P2L = (lx, lz) => [
    CMP[0] + (lx * cI - lz * sI) * PS,
    CMP[1] + (lx * sI + lz * cI) * PS,
  ],
  LOCL = (wx, wz) => {
    const dx = (wx - CMP[0]) / PS,
      dz = (wz - CMP[1]) / PS;
    return [dx * cI + dz * sI, -dx * sI + dz * cI];
  },
  WH = (lx, lz) => Math.atan2(lx * cI - lz * sI, lx * sI + lz * cI);
var DET = 0,
  CLIMB = { on: false, t: 0 };
const PRIS = {
    off: false,
    key: false,
    ladder: false,
    climbed: false,
    alarm: false,
    escaped: false,
    gate: false,
    busted: 0,
    dh: 0,
    onI: false,
    cs: null,
    gT: 0,
  },
  GD = [],
  BAGS = [],
  COVER = [],
  LOSC = [],
  TOW = [],
  FADE = [],
  BLD = [],
  GCOL = [];
function P2put(g, lx, lz, ry, y0) {
  const w = P2L(lx, lz);
  g.position.set(w[0], y0 === undefined ? hm(w[0], w[1]) : y0, w[1]);
  g.rotation.y = -LA + (ry || 0);
  scene.add(g);
  return w;
}
const PLY = hm(CMP[0], CMP[1]);
let shoreX = 44;
for (let x = 54; x > 8; x -= 0.5) {
  const w = P2L(x, 0);
  if (hm(w[0], w[1]) > 0.55) {
    shoreX = x;
    break;
  }
}
const PG = new THREE.Group();
PG.position.set(CMP[0], PLY, CMP[1]);
PG.rotation.y = -LA;
PG.scale.setScalar(PS);
scene.add(PG);
function colAdd(lx, lz, r, los, tag) {
  const w = P2L(lx, lz),
    c = { x: w[0], z: w[1], r: r * PS };
  COLL.push(c);
  if (tag) tag.push(c);
  if (los) LOSC.push({ x: w[0], z: w[1], r: Math.max(r, 0.45) * PS });
  return c;
}
function chain(a, b, r, step, los, tag) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]),
    n = Math.max(1, Math.ceil(L / step));
  for (let i = 0; i <= n; i++)
    colAdd(
      a[0] + ((b[0] - a[0]) * i) / n,
      a[1] + ((b[1] - a[1]) * i) / n,
      r,
      los && i % 2 === 0,
      tag,
    );
}
const cov = (lx, lz, r) => {
  const w = P2L(lx, lz);
  COVER.push({ x: w[0], z: w[1], r: r * PS });
};
// ---------- terrain colours: rock, gravel, paved yard, road to the gate
{
  const t2 = scene.children.find(
    (c) =>
      c.isMesh &&
      c.geometry.type === "PlaneGeometry" &&
      Math.abs(c.position.x - I2X) < 0.1 &&
      Math.abs(c.position.z - I2Z) < 0.1 &&
      c.geometry.attributes.color,
  );
  if (t2) {
    const p = t2.geometry.attributes.position,
      c = t2.geometry.attributes.color,
      k = new THREE.Color(),
      k2 = new THREE.Color(),
      k3 = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      const wx = p.getX(i) + I2X,
        wz = p.getZ(i) + I2Z,
        h = p.getY(i),
        l = LOCL(wx, wz),
        n = vn(wx * 0.6, wz * 0.6, 181);
      if (h < 0.42) k.setHex(0xd8c89a);
      else if (h < 1.55) k.setHex(0x857d70).lerp(k2.setHex(0x625c52), n);
      else k.setHex(0x8c887e).lerp(k2.setHex(0x726e64), n * 0.7);
      if (Math.abs(l[0] - 1) < 15.5 && Math.abs(l[1]) < 14)
        k.setHex(0x7a766f).lerp(
          k2.setHex(0x66625c),
          vn(wx * 2, wz * 2, 182) * 0.6,
        );
      if (l[0] > 14 && l[0] < shoreX && Math.abs(l[1]) < 2.1 && h > 0.6)
        k.setHex(0xb0a898).lerp(k2.setHex(0x8a8272), n * 0.5);
      {
        let td = 1e9;
        for (const t of TRN)
          td = Math.min(td, sgd(l[0], l[1], t[0], t[1], t[2], t[3]));
        if (td < 3)
          k.lerp(
            k2.setHex(0x4a3f33).lerp(k3.setHex(0x2e2820), n),
            1 - ss(1.1, 2.9, td),
          );
      }
      c.setXYZ(i, k.r, k.g, k.b);
    }
    c.needsUpdate = true;
  }
}
// ---------- textures and wall helper
const CTC = {};
function concTex(rep, win, dark) {
  const key = Math.round(rep * 2) + "|" + (win ? 1 : 0) + (dark ? 1 : 0);
  if (CTC[key]) return CTC[key];
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = dark ? "#827f78" : "#9d9b93";
  g.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 240; i++) {
    g.fillStyle =
      hs(i, 1, 200) > 0.5 ? "rgba(60,56,50,.06)" : "rgba(220,215,205,.06)";
    g.fillRect(hs(i, 4, 200) * 256, hs(i, 5, 200) * 128, 14, 6);
  }
  for (let i = 0; i < 26; i++) {
    g.fillStyle = "rgba(60,50,40,.09)";
    g.fillRect(hs(i, 6, 200) * 256, 0, 3 + hs(i, 7, 200) * 7, 128);
  }
  g.fillStyle = "rgba(0,0,0,.2)";
  g.fillRect(0, 0, 3, 128);
  g.fillRect(126, 0, 2, 128);
  if (win)
    for (let k = 0; k < 2; k++) {
      const x = 22 + k * 128;
      g.fillStyle = "#1d2430";
      g.fillRect(x, 28, 84, 64);
      g.fillStyle = "#7f93a6";
      g.fillRect(x + 4, 32, 76, 56);
      g.fillStyle = "#26262c";
      for (let b = 0; b <= 7; b++) g.fillRect(x + 4 + b * 11, 32, 3, 56);
      g.fillRect(x + 4, 58, 76, 3);
      g.fillStyle = "#6a665e";
      g.fillRect(x - 4, 92, 92, 6);
    }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rep, 1);
  t.anisotropy = 4;
  CTC[key] = t;
  return t;
}
var WSN = 0;
function wseg(a, b, h, th, o) {
  o = o || {};
  h = h + (WSN++ % 9) * 0.012;
  th = th + (WSN % 3) * 0.012;
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]),
    end = M(o.col || 0x8a8880, { roughness: 1 }),
    face = new THREE.MeshStandardMaterial({
      map: concTex(Math.max(1, L / 8), o.win, o.dark),
      roughness: 1,
    }),
    mats = [end, end, end, end, face, face],
    m = new THREE.Mesh(new THREE.BoxGeometry(L, h, th), mats);
  m.position.set((a[0] + b[0]) / 2, h / 2 + (o.y || 0), (a[1] + b[1]) / 2);
  m.rotation.y = -Math.atan2(b[1] - a[1], b[0] - a[0]);
  m.castShadow = m.receiveShadow = true;
  m.userData.nocol = 1;
  PG.add(m);
  if (o.coll !== false) chain(a, b, 0.2, 0.35, true, o.tag);
  FADE.push({ a, b, mats: [face, end], bld: o.bld });
  return m;
}
function wire(a, b, y) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]),
    n = Math.ceil(L / 0.5),
    pos = [];
  for (let i = 0; i < n; i++) {
    const u0 = i / n,
      u1 = (i + 1) / n,
      x0 = a[0] + (b[0] - a[0]) * u0,
      z0 = a[1] + (b[1] - a[1]) * u0,
      x1 = a[0] + (b[0] - a[0]) * u1,
      z1 = a[1] + (b[1] - a[1]) * u1;
    pos.push(x0, y, z0, x1, y + 0.28, z1, x0, y + 0.28, z0, x1, y, z1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  const l = new THREE.LineSegments(
    g,
    new THREE.LineBasicMaterial({ color: 0x8a9098 }),
  );
  l.frustumCulled = false;
  PG.add(l);
}
// ---------- perimeter wall with barbed wire, steel gate, ladder spot
const W = [
  [-13, -12.5],
  [15, -12.5],
  [15, 12.5],
  [-13, 12.5],
];
wseg(W[0], W[1], 4.4, 0.8);
wseg(W[1], [15, -1.9], 4.4, 0.8);
wseg([15, 1.9], W[2], 4.4, 0.8);
wseg(W[2], W[3], 4.4, 0.8);
wseg(W[3], W[0], 4.4, 0.8);
[
  [W[0], W[1]],
  [W[1], [15, -1.9]],
  [[15, 1.9], W[2]],
  [W[2], W[3]],
  [W[3], W[0]],
].forEach(([a, b]) => {
  wire(a, b, 4.45);
});
const gateG = new THREE.Group(),
  steel = M(0x2a2e36, { metalness: 0.6, roughness: 0.45 }),
  leaves = [];
{
  [-1, 1].forEach((s) => {
    const p = new THREE.Mesh(
      new THREE.BoxGeometry(1, 5, 0.9),
      M(0x6a665e, { roughness: 1 }),
    );
    p.position.set(0, 2.5, s * 2.3);
    gateG.add(p);
    const lf = new THREE.Group();
    lf.position.set(0, 0, s * 1.9);
    for (let i = 0; i < 9; i++) {
      const b = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 3.4, 5),
        steel,
      );
      b.position.set(0, 1.9, -s * i * 0.2);
      lf.add(b);
    }
    [0.3, 1.9, 3.5].forEach((y) => {
      const r = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 1.7), steel);
      r.position.set(0, y, -s * 0.85);
      lf.add(r);
    });
    gateG.add(lf);
    leaves.push({ lf, s });
  });
  const sg = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: signTex("🔒 PRISON"), fog: false }),
  );
  sg.scale.set(2.6, 1, 1);
  sg.position.set(0, 5.9, 0);
  gateG.add(sg);
  gateG.position.set(15, 0, 0);
  PG.add(gateG);
  chain([15, -1.9], [15, 1.9], 0.2, 0.35, true, GCOL);
}
// ---------- Cellhouse (Alcatraz block): barred windows, cells, Twombly in cell 7
const CH = { x0: -12, x1: -3, z0: -8, z1: 6, h: 3.8 };
BLD.push({ x0: CH.x0, x1: CH.x1, z0: CH.z0, z1: CH.z1, roof: null });
{
  const o = { win: true, bld: 0, col: 0x8a8880 },
    a = [CH.x0, CH.z0],
    b = [CH.x1, CH.z0],
    c = [CH.x1, CH.z1],
    d = [CH.x0, CH.z1];
  wseg(a, b, CH.h, 0.7, o);
  wseg(d, c, CH.h, 0.7, o);
  wseg(a, d, CH.h, 0.7, o);
  wseg(b, [CH.x1, 0], CH.h, 0.7, o);
  wseg([CH.x1, 2.4], c, CH.h, 0.7, o);
  const lin = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 2.4), M(0x6a665e));
  lin.position.set(CH.x1, CH.h - 0.25, 1.2);
  PG.add(lin);
  const fl = new THREE.Mesh(
    new THREE.BoxGeometry(CH.x1 - CH.x0 - 0.4, 0.1, CH.z1 - CH.z0 - 0.4),
    M(0x5a5852, { roughness: 1 }),
  );
  fl.position.set((CH.x0 + CH.x1) / 2, 0.05, (CH.z0 + CH.z1) / 2);
  PG.add(fl);
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(CH.x1 - CH.x0 + 1, 0.4, CH.z1 - CH.z0 + 1),
    M(0x6e6a62, { roughness: 1 }),
  );
  roof.position.set((CH.x0 + CH.x1) / 2, CH.h + 0.2, (CH.z0 + CH.z1) / 2);
  roof.castShadow = true;
  PG.add(roof);
  BLD[0].roof = roof;
  for (let i = 0; i < 3; i++) {
    const v = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 1.2), M(0x55524c));
    v.position.set(-9 + i * 3, CH.h + 0.65, -1);
    roof.add(v);
    v.position.set(
      -9 + i * 3 - (CH.x0 + CH.x1) / 2,
      0.45,
      -1 - (CH.z0 + CH.z1) / 2,
    );
  }
  // cells on the west side
  const bars = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.03, 0.03, 3.2, 5),
      steel,
      60,
    ),
    mt = new THREE.Matrix4();
  let nb = 0;
  for (let z = CH.z0 + 0.2; z <= CH.z1 - 0.1; z += 0.3) {
    mt.makeTranslation(-9.6, 1.6, z);
    bars.setMatrixAt(nb++, mt);
  }
  bars.count = nb;
  bars.frustumCulled = false;
  PG.add(bars);
  [0.3, 1.6, 3].forEach((y) => {
    const r = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, CH.z1 - CH.z0),
      steel,
    );
    r.position.set(-9.6, y, (CH.z0 + CH.z1) / 2);
    PG.add(r);
  });
  chain([-9.6, CH.z0], [-9.6, CH.z1], 0.2, 0.35, true);
  for (let k = 0; k < 5; k++) {
    const z0 = CH.z0 + k * 2.8;
    if (k > 0) {
      const pw = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 3.2, 0.2),
        M(0x8a8880, { roughness: 1 }),
      );
      pw.position.set(-10.8, 1.6, z0);
      PG.add(pw);
      chain([-12, z0], [-9.6, z0], 0.2, 0.4, true);
    }
    if (k !== 2) {
      const bk = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.4, 0.8),
        M(0x6a5a44),
      );
      bk.position.set(-11.1, 0.5, z0 + 0.7);
      PG.add(bk);
    }
  }
  const tag = document.createElement("canvas");
  tag.width = 256;
  tag.height = 96;
  {
    const g = tag.getContext("2d");
    g.fillStyle = "#1c1c22";
    g.fillRect(0, 0, 256, 96);
    g.strokeStyle = "#ffd24a";
    g.lineWidth = 5;
    g.strokeRect(4, 4, 248, 88);
    g.fillStyle = "#ffd24a";
    g.font = "bold 40px system-ui";
    g.textAlign = "center";
    g.fillText("CELLULE 7", 128, 62);
  }
  const ts = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(tag), fog: false }),
  );
  ts.scale.set(1.8, 0.68, 1);
  ts.position.set(-9.2, 2.6, -1);
  PG.add(ts);
  for (let i = 0; i < 4; i++) {
    const lp = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.08, 0.3),
      new THREE.MeshBasicMaterial({ color: 0xfff2c8 }),
    );
    lp.position.set(-6.3, CH.h - 0.1, -6 + i * 3.6);
    PG.add(lp);
  }
  cov(-6, -5, 1.6);
}
// ---------- Guardhouse with the key on the desk
const GH = { x0: 6, x1: 12.2, z0: -10.5, z1: -5, h: 3.2 };
BLD.push({ x0: GH.x0, x1: GH.x1, z0: GH.z0, z1: GH.z1, roof: null });
{
  const o = { win: true, bld: 1, col: 0x9a9890, dark: true };
  wseg([GH.x0, GH.z0], [GH.x1, GH.z0], GH.h, 0.5, o);
  wseg([GH.x1, GH.z0], [GH.x1, GH.z1], GH.h, 0.5, o);
  wseg([GH.x0, GH.z0], [GH.x0, GH.z1], GH.h, 0.5, o);
  wseg([GH.x0, GH.z1], [8.2, GH.z1], GH.h, 0.5, o);
  wseg([10, GH.z1], [GH.x1, GH.z1], GH.h, 0.5, o);
  const fl = new THREE.Mesh(
    new THREE.BoxGeometry(GH.x1 - GH.x0 - 0.3, 0.1, GH.z1 - GH.z0 - 0.3),
    M(0x6a5a44, { roughness: 1 }),
  );
  fl.position.set((GH.x0 + GH.x1) / 2, 0.05, (GH.z0 + GH.z1) / 2);
  PG.add(fl);
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(GH.x1 - GH.x0 + 0.8, 0.35, GH.z1 - GH.z0 + 0.8),
    M(0x7a3a2a, { roughness: 1 }),
  );
  roof.position.set((GH.x0 + GH.x1) / 2, GH.h + 0.17, (GH.z0 + GH.z1) / 2);
  roof.castShadow = true;
  PG.add(roof);
  BLD[1].roof = roof;
  const A = (geo, mat, x, y, z) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    PG.add(m);
    return m;
  };
  A(new THREE.BoxGeometry(2.4, 0.9, 1), M(0x6a4a2a), 9, 0.45, -9.6);
  A(new THREE.BoxGeometry(0.7, 0.9, 0.7), M(0x3a3a42), 9, 0.45, -8.5);
  A(
    new THREE.BoxGeometry(0.9, 1.9, 0.55),
    M(0x55606a, { metalness: 0.4 }),
    6.8,
    0.95,
    -10.1,
  );
  A(new THREE.BoxGeometry(0.6, 0.05, 0.4), M(0xe8e0c8), 8.3, 0.93, -9.6);
  A(new THREE.BoxGeometry(1.3, 0.9, 0.05), M(0x4a6a8a), 11.9, 2.1, -8);
  colAdd(9, -9.6, 1.1, false);
  colAdd(6.8, -10.1, 0.5, false);
  cov(9, -4, 1.5);
}
// ---------- watchtowers with searchlights
function mkTower(lx, lz, cx, cz, R, spd, ph) {
  const g = new THREE.Group(),
    wd = M(0x5a5a62, { metalness: 0.3, roughness: 0.6 }),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].forEach(([a, b]) =>
    A(new THREE.CylinderGeometry(0.14, 0.18, 5, 6), wd, a, 2.5, b),
  );
  A(new THREE.BoxGeometry(2.8, 0.2, 2.8), wd, 0, 5, 0);
  A(new THREE.BoxGeometry(2.3, 1.6, 2.3), M(0xc8c6bc), 0, 5.9, 0);
  A(new THREE.BoxGeometry(2.4, 0.5, 0.05), M(0x7f93a6), 0, 6.1, 1.17);
  A(new THREE.ConeGeometry(2, 1, 4), M(0x2a3a5a), 0, 7.2, 0).rotation.y =
    Math.PI / 4;
  A(
    G.crown,
    new THREE.MeshBasicMaterial({ color: 0xfff2b0 }),
    0,
    6.7,
    0,
  ).scale.setScalar(0.24);
  g.position.set(lx, 0, lz);
  PG.add(g);
  const w = P2L(lx, lz),
    cone = new THREE.Mesh(
      new THREE.ConeGeometry(1, 1, 18, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xfff2b0,
        transparent: true,
        opacity: 0.13,
        side: THREE.DoubleSide,
        depthWrite: false,
        fog: false,
      }),
    ),
    disc = new THREE.Mesh(
      new THREE.CircleGeometry(4.6, 24),
      new THREE.MeshBasicMaterial({
        color: 0xfff2b0,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      }),
    );
  disc.rotation.x = -Math.PI / 2;
  cone.frustumCulled = disc.frustumCulled = false;
  scene.add(cone, disc);
  TOW.push({
    top: [w[0], PLY + 6.6 * PS, w[1]],
    cone,
    disc,
    cx,
    cz,
    R,
    spd,
    ph,
    tx: 0,
    tz: 0,
  });
  colAdd(lx, lz, 1.5, true);
}
mkTower(16.5, 13.8, 24, 3, 8, 0.5, 0);
mkTower(16.5, -13.8, 24, -6, 7, -0.42, 2);
mkTower(-14.5, 13.8, 3, 0, 9, 0.38, 1);
mkTower(-14.5, -13.8, 2, 2, 9.5, -0.33, 4);
// ---------- props: crates, barrels, concrete blocks (cover), dock, lighthouse, signs
function mkCrate() {
  const g = new THREE.Group(),
    m = M(0x9a7a4a, { roughness: 1 }),
    bd = M(0x5a3a1e);
  for (let k = 0; k < 3; k++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), m);
    b.position.set(
      k === 2 ? 0.55 : k * 1.15,
      0.55 + (k === 2 ? 1.1 : 0),
      k === 2 ? 0.2 : 0,
    );
    b.castShadow = true;
    g.add(b);
    const bn = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.12, 1.14), bd);
    bn.position.copy(b.position);
    g.add(bn);
  }
  return g;
}
function mkBarrel(c) {
  const b = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, 0.95, 12),
    M(c, { roughness: 0.6, metalness: 0.3 }),
  );
  b.position.y = 0.48;
  b.castShadow = true;
  const g = new THREE.Group();
  g.add(b);
  [0.2, 0.75].forEach((y) => {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(0.42, 0.03, 5, 14),
      M(0x222226),
    );
    r.rotation.x = Math.PI / 2;
    r.position.y = y;
    g.add(r);
  });
  return g;
}
[
  [11, 9.5, 0.3],
  [0.5, -4.8, 1.2],
  [26, 6, 0],
  [24, -11, 0.5],
  [-6, 9.6, 0],
].forEach(([lx, lz, r]) => {
  const g = mkCrate();
  g.position.set(lx, 0, lz);
  g.rotation.y = r;
  PG.add(g);
  colAdd(lx + 0.5, lz, 1.3, false);
  cov(lx + 0.5, lz, 2.1);
});
[
  [14, -5.6, 0x5a6a8a],
  [14.1, -6.7, 0x8a3a2a],
  [-1, -10.4, 0x4a6a4a],
  [24, -3.5, 0x8a3a2a],
  [24.9, -2.8, 0x5a6a8a],
].forEach(([lx, lz, c]) => {
  const g = mkBarrel(c);
  g.position.set(lx, 0, lz);
  PG.add(g);
  colAdd(lx, lz, 0.5, false);
  cov(lx, lz, 1.5);
});
{
  const dk = new THREE.Group(),
    pl = M(0x7a5a38, { roughness: 1 }),
    x0 = shoreX - 4;
  for (let i = 0; i < 14; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 3), pl);
    b.position.set(x0 + i * 0.95, 0, 0);
    dk.add(b);
  }
  for (let i = 0; i < 8; i++)
    [-1, 1].forEach((s) => {
      const p = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.15, 2.6, 6),
        M(0x4a3420),
      );
      p.position.set(x0 + i * 1.85, -0.8, s * 1.55);
      dk.add(p);
    });
  P2put(dk, 0, 0, 0, SEA + 0.42);
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 200;
  const g = c.getContext("2d");
  g.fillStyle = "#2a2e3a";
  g.fillRect(0, 0, 512, 200);
  g.strokeStyle = "#e8e0c8";
  g.lineWidth = 8;
  g.strokeRect(4, 4, 504, 192);
  g.fillStyle = "#fff4d8";
  g.font = "bold 42px serif";
  g.textAlign = "center";
  g.fillText("ÎLE D'IF · PRISON D'ÉTAT", 256, 82);
  g.fillStyle = "#ff8a7a";
  g.font = "bold 34px system-ui";
  g.fillText("ACCÈS INTERDIT", 256, 146);
  const sg = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 1.33),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(c),
        side: THREE.DoubleSide,
      }),
    ),
    po = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 2.8, 6),
      M(0x4a3a2a),
    ),
    g2 = new THREE.Group();
  po.position.y = 1.4;
  sg.position.y = 2.6;
  sg.rotation.y = Math.PI / 2;
  g2.add(po, sg);
  const sw = P2L(shoreX - 5.5, 2.8);
  g2.position.set(sw[0], Math.max(hm(sw[0], sw[1]), SEA), sw[1]);
  g2.rotation.y = -LA;
  scene.add(g2);
}
const LH = new THREE.Group();
{
  const body = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.8, 10, 14),
      M(0xf0ece0, { roughness: 0.8 }),
    ),
    band = new THREE.Mesh(
      new THREE.CylinderGeometry(1.45, 1.6, 2, 14),
      M(0xc0332a),
    ),
    lan = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 1.4, 10),
      new THREE.MeshBasicMaterial({ color: 0xfff2b0 }),
    ),
    cap = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.2, 10), M(0x2a2a30));
  body.position.y = 5;
  band.position.y = 3;
  lan.position.y = 10.7;
  cap.position.y = 12;
  LH.add(body, band, lan, cap);
  const bm = new THREE.Mesh(
    new THREE.ConeGeometry(2.2, 16, 12, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xfff2b0,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    }),
  );
  bm.geometry.translate(0, -8, 0);
  bm.geometry.rotateZ(-Math.PI / 2);
  bm.position.y = 10.7;
  LH.userData.bm = bm;
  LH.add(bm);
  LH.position.set(-23, 0, 0);
  PG.add(LH);
  colAdd(-23, 0, 1.8, true);
}
// ---------- the ladder (hidden until you place it) and wall interaction spots
const LADG = new THREE.Group();
{
  const wd = M(0x9a7040, { roughness: 1 }),
    mk = (x0, y0, z0, x1, y1, z1) => {
      const L = Math.hypot(x1 - x0, y1 - y0, z1 - z0),
        r = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, L), wd);
      r.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
      r.lookAt(x1 + CMP[0] * 0, y1, z1);
      r.rotation.set(0, 0, 0);
      return r;
    };
  const side = (zs, dir) => {
    const g = new THREE.Group();
    [-0.4, 0.4].forEach((dx) => {
      const r = new THREE.Mesh(new THREE.BoxGeometry(0.1, 5.4, 0.1), wd);
      r.position.set(dx, 2.7, 0);
      g.add(r);
    });
    for (let i = 0; i < 10; i++) {
      const rg = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.08), wd);
      rg.position.set(0, 0.4 + i * 0.52, 0);
      g.add(rg);
    }
    g.rotation.x = dir * 0.28;
    g.position.set(6, 0, zs);
    return g;
  };
  LADG.add(side(14.2, -1), side(10.8, 1));
  LADG.visible = false;
  PG.add(LADG);
  window.LADG2 = new THREE.Group();
  LADG2.add(side(-14.2, 1), side(-10.8, -1));
  LADG2.visible = false;
  PG.add(LADG2);
}
const plO = P2L(6, 14.7),
  plI = P2L(6, 10.3),
  gtW = P2L(14.2, 0),
  gH = (r) => {
    const g = new THREE.Group();
    hitSph(g, r, 1);
    return g;
  };
const ladOut = addItem({
    id: "ladOut",
    kind: "plad",
    side: 1,
    x: plO[0],
    z: plO[1],
    r: 0,
    reach: 2.4,
    root: place(gH(1.2), plO[0], plO[1]),
    hint: "🪜 North wall: place a long ladder here",
  }),
  ladIn = addItem({
    id: "ladIn",
    kind: "plad",
    side: -1,
    x: plI[0],
    z: plI[1],
    r: 0,
    reach: 2.4,
    root: place(gH(1.2), plI[0], plI[1]),
    hint: "🪜 Wall (inside): place a long ladder here",
  }),
  gateIt = addItem({
    id: "pgate",
    kind: "pgate",
    x: gtW[0],
    z: gtW[1],
    r: 0,
    reach: 3.2,
    root: place(gH(1.8), gtW[0], gtW[1]),
    hint: "🔒 Steel gate: needs the key",
  });
{
  const o2 = P2L(6, -14.7),
    i2 = P2L(6, -10.3),
    mk2 = (id, s, w, hn) =>
      addItem({
        id,
        kind: "plad",
        side: s,
        sp: 1,
        x: w[0],
        z: w[1],
        r: 0,
        reach: 2.6,
        root: place(gH(1.2), w[0], w[1]),
        hint: hn,
      }),
    a = mk2("ladOut2", 1, o2, "🪜 South wall: place a long ladder here"),
    b = mk2("ladIn2", -1, i2, "🪜 Wall (inside): place a long ladder here"),
    top2 = P2L(6, -12.4),
    top1 = P2L(6, 12.4);
  ladOut.sp = ladIn.sp = 0;
  ladOut.po = ladIn.po = plO;
  ladOut.pi_ = ladIn.pi_ = plI;
  ladOut.pt = ladIn.pt = top1;
  a.po = b.po = o2;
  a.pi_ = b.pi_ = i2;
  a.pt = b.pt = top2;
}
// ---------- Twombly's cell, the key, baguettes
{
  const cw = P2L(-10.9, -1);
  cageG.position.set(cw[0], PLY, cw[1]);
  cageG.rotation.y = -LA;
  cageIt.x = cw[0];
  cageIt.z = cw[1];
  cageIt.reach = 3.2;
  cageIt.hint = "😿 Twombly is locked in Cellule 7! Press to open the cell";
}
const keyG = new THREE.Group();
{
  const gm = new THREE.MeshStandardMaterial({
      color: 0xffd24a,
      emissive: 0xffb020,
      emissiveIntensity: 1.3,
      metalness: 0.7,
      roughness: 0.3,
    }),
    r = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.045, 8, 14), gm),
    sh = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.42, 0.045), gm);
  sh.position.y = -0.3;
  const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.045, 0.045), gm),
    t2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.045, 0.045), gm);
  t1.position.set(0.07, -0.42, 0);
  t2.position.set(0.05, -0.33, 0);
  r.position.y = 0.12;
  const ha = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xffd060,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  ha.scale.set(2.2, 2.2, 1);
  keyG.add(r, sh, t1, t2, ha);
  hitSph(keyG, 0.9, 0);
}
const kw = P2L(9.9, -9.6);
keyG.position.set(kw[0], PLY + 1.35, kw[1]);
const keyIt = addItem({
  id: "pkey",
  kind: "pkey",
  x: kw[0],
  z: kw[1],
  r: 0,
  reach: 2.3,
  root: keyG,
  hint: "🗝️ The cell key! Grab it",
});
function mkBag() {
  const g = new THREE.Group(),
    b = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.95, 8),
      M(0xd8a85a, { roughness: 0.8 }),
    );
  b.rotation.z = Math.PI / 2;
  b.position.y = 0.1;
  g.add(b);
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.02, 0.16),
      M(0xa87a3a),
    );
    s.position.set(-0.3 + i * 0.2, 0.17, 0);
    s.rotation.y = 0.5;
    g.add(s);
  }
  return g;
}
[
  [27, -8],
  [-16, 6],
  [10, 2.5],
  [1.5, -10.5],
].forEach(([lx, lz], i) => {
  const g = mkBag();
  hitSph(g, 0.7, 0.2);
  const w = P2L(lx, lz);
  addItem({
    id: "bag" + i,
    kind: "bag",
    x: w[0],
    z: w[1],
    r: 0,
    reach: 1.8,
    root: place(g, w[0], w[1]),
    hint: "🥖 A baguette! (B throws it to distract guards)",
  });
});
function setItemOn(it, on) {
  const i = items.indexOf(it);
  if (on) {
    if (i < 0) {
      items.push(it);
      IG.add(it.root);
    }
  } else if (i >= 0) {
    items.splice(i, 1);
    IG.remove(it.root);
  }
}
// ---------- guards (proper uniforms, flat vision sectors), dog
function mkGuard3() {
  const g = new THREE.Group(),
    navy = M(0x1b2a4a, { roughness: 0.9 }),
    skin = M(0xf0c8a0),
    blk = M(0x14141a),
    wh = M(0xe8e8ec),
    gold = M(0xd4b030, { metalness: 0.6, roughness: 0.4 }),
    A = (geo, mat, x, y, z, p) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      (p || g).add(m);
      return m;
    };
  const lL = new THREE.Group(),
    lR = new THREE.Group(),
    aL = new THREE.Group(),
    aR = new THREE.Group();
  lL.position.set(-0.15, 0.95, 0);
  lR.position.set(0.15, 0.95, 0);
  aL.position.set(-0.37, 1.6, 0);
  aR.position.set(0.37, 1.6, 0);
  g.add(lL, lR, aL, aR);
  [lL, lR].forEach((l) => {
    A(new THREE.CylinderGeometry(0.11, 0.095, 0.64, 8), navy, 0, -0.3, 0, l);
    A(new THREE.BoxGeometry(0.2, 0.17, 0.36), blk, 0, -0.7, 0.06, l);
  });
  [aL, aR].forEach((a, i) => {
    A(new THREE.CylinderGeometry(0.085, 0.07, 0.62, 8), navy, 0, -0.3, 0, a);
    A(G.crown, skin, 0, -0.66, 0, a).scale.setScalar(0.075);
  });
  A(new THREE.CylinderGeometry(0.3, 0.25, 0.74, 10), navy, 0, 1.3, 0);
  A(new THREE.CylinderGeometry(0.29, 0.29, 0.07, 10), blk, 0, 0.98, 0);
  A(new THREE.BoxGeometry(0.1, 0.09, 0.04), gold, 0, 0.98, 0.28);
  A(new THREE.BoxGeometry(0.07, 0.07, 0.02), gold, 0.14, 1.5, 0.26);
  A(new THREE.BoxGeometry(0.58, 0.13, 0.34), navy, 0, 1.64, 0);
  A(new THREE.BoxGeometry(0.05, 0.05, 0.05), wh, -0.14, 1.5, 0.26);
  A(new THREE.CylinderGeometry(0.06, 0.06, 0.26, 6), skin, 0, 1.76, 0);
  const hd = new THREE.Group();
  g.add(hd);
  A(G.crown, skin, 0, 1.92, 0, hd).scale.setScalar(0.2);
  A(new THREE.CylinderGeometry(0.22, 0.25, 0.14, 12), navy, 0, 2.1, 0, hd);
  A(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 12), wh, 0, 2.04, 0, hd);
  A(new THREE.BoxGeometry(0.3, 0.03, 0.2), blk, 0, 2.0, 0.2, hd);
  A(new THREE.BoxGeometry(0.26, 0.05, 0.05), blk, 0, 1.9, 0.19, hd);
  A(
    new THREE.CylinderGeometry(0.035, 0.035, 0.34, 6),
    blk,
    0.33,
    0.8,
    0.05,
  ).rotation.z = 0.15;
  const fl = A(
    new THREE.CylinderGeometry(0.045, 0.04, 0.22, 8),
    blk,
    0,
    -0.66,
    0.1,
    aR,
  );
  fl.rotation.x = 1.5;
  A(
    new THREE.CylinderGeometry(0.05, 0.05, 0.03, 8),
    new THREE.MeshBasicMaterial({ color: 0xfff2b0 }),
    0,
    -0.66,
    0.22,
    aR,
  ).rotation.x = 1.5;
  const sec = new THREE.Mesh(
    (() => {
      const gm = new THREE.CircleGeometry(1, 26, -Math.PI / 2 - 0.95, 1.9);
      gm.rotateX(-Math.PI / 2);
      return gm;
    })(),
    new THREE.MeshBasicMaterial({
      color: 0xffe070,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
      fog: false,
    }),
  );
  sec.position.y = 0.07;
  sec.frustumCulled = false;
  g.add(sec);
  g.scale.setScalar(0.95);
  g.userData = { lL, lR, aL, aR, sec, hd };
  return g;
}
function mkDog() {
  const g = new THREE.Group(),
    bw = M(0x6a4a2a),
    bk = M(0x1a1a1a),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  A(new THREE.BoxGeometry(0.4, 0.38, 0.9), bw, 0, 0.55, 0);
  A(new THREE.BoxGeometry(0.42, 0.2, 0.45), bk, 0, 0.76, 0);
  A(new THREE.BoxGeometry(0.3, 0.28, 0.36), bw, 0, 0.78, 0.62);
  A(new THREE.BoxGeometry(0.14, 0.12, 0.22), bk, 0, 0.7, 0.84);
  [-1, 1].forEach((s) =>
    A(new THREE.BoxGeometry(0.08, 0.2, 0.1), bk, s * 0.12, 0.98, 0.58),
  );
  const legs = [];
  [
    [-0.15, 0.3],
    [0.15, 0.3],
    [-0.15, -0.3],
    [0.15, -0.3],
  ].forEach(([x, z]) =>
    legs.push(A(new THREE.CylinderGeometry(0.05, 0.04, 0.4, 6), bw, x, 0.2, z)),
  );
  A(
    new THREE.CylinderGeometry(0.04, 0.02, 0.4, 5),
    bw,
    0,
    0.8,
    -0.55,
  ).rotation.x = -0.8;
  g.userData = { legs };
  return g;
}
function addGuard(path, o) {
  const g = mkGuard3();
  scene.add(g);
  const w = P2L(path[0][0], path[0][1]),
    G0 = Object.assign(
      {
        g,
        path: path.map((p) => ({ lx: p[0], lz: p[1], dw: p[2] || 0 })),
        pi: 0,
        x: w[0],
        z: w[1],
        ry: FACE,
        sp: 1.05,
        st: "patrol",
        tm: 0,
        rng: 9,
        sweep: null,
        lure: null,
        bw: 0,
        ls: null,
        home: [w[0], w[1]],
      },
      o || {},
    );
  G0.home = [w[0], w[1]];
  G0.rng *= 1.2;
  G0.g.userData.sec.scale.set(G0.rng, 1, G0.rng);
  GD.push(G0);
  return G0;
}
addGuard(
  [
    [21, -3],
    [21, 17.5],
    [2, 17.8],
    [-17, 17.5],
    [-17, -17.5],
    [2, -17.8],
    [21, -17.5],
  ],
  { sp: 1.15, rng: 10 },
);
addGuard(
  [
    [-1.2, 7.5],
    [8, 7.5],
    [13, 5],
    [13, -2],
    [4.5, -2],
    [4.5, -8.8],
    [-1.2, -8.8],
  ],
  { sp: 1.05, rng: 9 },
);
addGuard([[8.9, -7.2]], { sweep: { b: WH(0, -1), a: 2.0, r: 0.55 }, rng: 5.5 });
addGuard(
  [
    [18.5, -4, 2.5],
    [18.5, 4, 2.5],
  ],
  { sp: 1, rng: 8 },
);
const handler = addGuard(
    [
      [9, 5],
      [13, 7],
      [9.5, 8.6],
      [5, 4],
    ],
    { sp: 1, rng: 8 },
  ),
  DOG = { g: mkDog(), x: 0, z: 0, st: "roam", tm: 0, lure: null, bw: 0 };
scene.add(DOG.g);
{
  const w = P2L(9, 5);
  DOG.x = w[0];
  DOG.z = w[1];
}
function pushOut(x, z, rad) {
  for (const c of COLL) {
    if (c.r < 0.15) continue;
    const dx = x - c.x,
      dz = z - c.z,
      m = c.r + rad;
    if (dx * dx + dz * dz >= m * m) continue;
    const d = Math.hypot(dx, dz);
    if (d < m && d > 1e-4) {
      x = c.x + (dx / d) * m;
      z = c.z + (dz / d) * m;
    }
  }
  return [x, z];
}
function losClear(ax, az, bx, bz) {
  if (wallBlock(ax, az, bx, bz)) return false;
  const d = Math.hypot(bx - ax, bz - az),
    n = Math.floor(d / 0.8);
  for (let k = 1; k < n; k++) {
    const x = ax + ((bx - ax) * k) / n,
      z = az + ((bz - az) * k) / n;
    for (const c of LOSC) if (Math.hypot(x - c.x, z - c.z) < c.r) return false;
  }
  return true;
}
function inCover() {
  return COVER.some((c) => Math.hypot(me3.x - c.x, me3.z - c.z) < c.r);
}
function seen(o) {
  if (o.morph) return 0;
  if (wallBlock(o.x, o.z, me3.x, me3.z)) return 0;
  if (TW.up && Math.hypot(me3.x - o.x, me3.z - o.z) > 8) return 0;
  const dx = me3.x - o.x,
    dz = me3.z - o.z,
    d = Math.hypot(dx, dz),
    still = me3.spd < 0.5,
    rng =
      o.rng *
      (ALR.t > 0 ? 1.1 : 1) *
      (still ? 0.6 : 1) *
      (inCover() && still ? 0.6 : 1) *
      (PRIS.off ? 0.7 : 1) *
      (1 - NIGHTK * 0.15);
  if (d < 1.5) {
    const bk = Math.abs(adif(Math.atan2(dx, dz), o.ry));
    return bk < 2.2 ? 1.4 : d < 1.1 && me3.spd > 2.5 ? 0.9 : 0;
  }
  if (d > rng) return 0;
  if (Math.abs(adif(Math.atan2(dx, dz), o.ry)) > 0.95) return 0;
  if (!losClear(o.x, o.z, me3.x, me3.z)) return 0;
  return 0.45 + 0.95 * (1 - d / rng);
}
// ---------- baguette distraction
function throwBag() {
  const i = inv();
  if (!(i.baguette > 0) || inCave || sailing)
    return toast("You have no baguette 🥖");
  if (Math.hypot(me3.x - CMP[0], me3.z - CMP[1]) > 76) return;
  saveMe({ inv: pay(i, { baguette: 1 }) });
  let d = 7;
  while (
    d > 2 &&
    hm(me3.x + Math.sin(me3.ry) * d, me3.z + Math.cos(me3.ry) * d) < 0.8
  )
    d -= 1;
  const x = me3.x + Math.sin(me3.ry) * d,
    z = me3.z + Math.cos(me3.ry) * d,
    m = mkBag();
  m.position.set(x, hm(x, z) + 0.05, z);
  scene.add(m);
  const b = { x, z, t: 9, m };
  BAGS.push(b);
  tone(500, 0.15, "triangle", 0.1);
  toast("🥖 Thrown! Nearby guards are tempted…");
  GD.forEach((o) => {
    if (o.st !== "eat" && Math.hypot(o.x - x, o.z - z) < 22) {
      o.st = "lure";
      o.lure = b;
    }
  });
  if (Math.hypot(DOG.x - x, DOG.z - z) < 24) {
    DOG.st = "lure";
    DOG.lure = b;
  }
}
addEventListener(
  "keydown",
  (e) => {
    if (
      (e.key === "b" || e.key === "B") &&
      !(e.target && e.target.tagName === "INPUT") &&
      !modalOpen &&
      !inCave
    ) {
      e.preventDefault();
      throwBag();
    }
  },
  true,
);
const bagB = document.createElement("button");
bagB.id = "bagb";
bagB.className = "pill";
bagB.textContent = "🥖";
bagB.style.cssText =
  "top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 346px);right:12px;pointer-events:auto;width:54px;height:54px;border-radius:27px;font-size:22px;padding:0;display:none";
document.body.appendChild(bagB);
bagB.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  throwBag();
});
// ---------- HUD: detection bar, objectives, vignette, busted screen
const detE = hud$(
  "detE",
  "top:calc(env(safe-area-inset-top,0px) + 46px);left:50%;transform:translateX(-50%);width:min(240px,64vw)",
);
detE.innerHTML =
  '<div style="font:800 12px system-ui;color:#fff;text-shadow:0 1px 3px #000;text-align:center;letter-spacing:.14em;margin-bottom:3px">👁️ DETECTED</div><div style="height:14px;border-radius:7px;background:rgba(0,0,0,.6);border:2px solid #fff;overflow:hidden"><div id="detF" style="height:100%;width:0%"></div></div>';
const pgE = hud$(
  "pgE",
  "top:calc(env(safe-area-inset-top,0px) + 92px);left:10px;background:var(--glass);border-radius:14px;padding:7px 11px;font-weight:700;font-size:12.5px;line-height:1.55;max-width:60vw",
);
const prisVig = document.createElement("div");
prisVig.style.cssText =
  "position:fixed;inset:0;pointer-events:none;z-index:3;opacity:0;transition:opacity 1.2s;background:radial-gradient(circle at center,rgba(0,0,0,0) 40%,rgba(10,16,40,.28) 100%)";
document.body.appendChild(prisVig);
const bustE = document.createElement("div");
bustE.style.cssText =
  "position:fixed;inset:0;z-index:8;display:none;pointer-events:none;background:radial-gradient(circle at center,rgba(10,20,60,.6),rgba(0,0,0,.93));flex-direction:column;align-items:center;justify-content:center;text-align:center;opacity:0;transition:opacity .7s";
bustE.innerHTML =
  '<div style="font:900 clamp(44px,13vw,110px)/1 Georgia,serif;letter-spacing:.14em;color:#3a6ae0;text-shadow:0 0 30px #124,0 4px 0 #012;margin-bottom:16px">BUSTED</div><div style="font:700 17px/1.7 system-ui;color:#dfe6f4;text-shadow:0 2px 4px #000;padding:0 18px">The guards sent you home.<br><span style="opacity:.8;font-size:15px">Your boat was towed back · the prison resets · you get your ladder back</span></div>';
document.body.appendChild(bustE);
// ---------- climbing the wall
function startClimb(side, it) {
  if (CLIMB.on || PRIS.busted > 0) return;
  const a = side > 0 ? it.po : it.pi_,
    b = side > 0 ? it.pi_ : it.po,
    top = it.pt;
  CLIMB.on = true;
  CLIMB.t = 0;
  CLIMB.p = [a, top, b];
  CLIMB.y0 = hm(a[0], a[1]);
  CLIMB.y1 = hm(b[0], b[1]);
  CLIMB.top = PLY + 7.6;
  CLIMB.side = side;
  goalPt = goalObj = null;
  tone(300, 0.1, "triangle", 0.08);
}
function climbTick(dt) {
  CLIMB.t += dt;
  const u = CLIMB.t / 2.6,
    p = CLIMB.p;
  if (u >= 1) {
    CLIMB.on = false;
    me3.x = p[2][0];
    me3.z = p[2][1];
    me3.y = CLIMB.y1 + 0.05;
    me3.vy = 0;
    me3.vx = me3.vz = 0;
    if (CLIMB.side > 0 && !PRIS.climbed) {
      PRIS.climbed = true;
      toast(
        "🧗 You're inside! Stay out of the guards' light and find the key.",
      );
    }
    return;
  }
  const k = u < 0.5 ? u * 2 : (u - 0.5) * 2,
    a = u < 0.5 ? p[0] : p[1],
    b = u < 0.5 ? p[1] : p[2],
    e = k * k * (3 - 2 * k);
  me3.x = a[0] + (b[0] - a[0]) * e;
  me3.z = a[1] + (b[1] - a[1]) * e;
  me3.y =
    u < 0.5
      ? CLIMB.y0 + (CLIMB.top - CLIMB.y0) * e
      : CLIMB.top + (CLIMB.y1 - CLIMB.top) * e;
  me3.ry = Math.atan2(b[0] - a[0], b[1] - a[1]);
  me3.vy = 0;
  me3.spd = 1.4;
  me3.vx = me3.vz = 0;
}
function setLadHints() {
  items
    .filter((i) => i.kind === "plad")
    .forEach((i) => {
      i.hint = PRIS.ladder
        ? PRIS.sp === i.sp
          ? "🪜 Climb over the wall"
          : "🪜 Move the ladder here"
        : "🪜 Wall: place a long ladder here";
    });
}
// ---------- interactions
function exInt6(it) {
  if (exInt36(it)) return true;
  switch (it.kind) {
    case "bag":
      IG.remove(it.root);
      items.splice(items.indexOf(it), 1);
      addInv(
        { baguette: 1 },
        "🥖 Baguette! Press B (or 🥖) to throw it and distract guards.",
      );
      jingle([523, 659]);
      return true;
    case "pkey":
      PRIS.key = true;
      setItemOn(it, false);
      jingle([659, 784, 988, 1319]);
      burst(it.x, PLY + 1.4, it.z, 0xffd24a, 22, 2, 3);
      toast(
        "🗝️ Got the key! Cellule 7 holds Twombly, and the key also opens the steel gate.",
      );
      return true;
    case "pgate":
      if (!PRIS.key) {
        toast("🔒 Heavy steel gate. It needs the key from the guardhouse.");
        tone(180, 0.2, "square", 0.1);
        return true;
      }
      if (PRIS.gate) {
        toast("The gate is already open!");
        return true;
      }
      PRIS.gate = true;
      GCOL.forEach((c) => {
        const i = COLL.indexOf(c);
        if (i >= 0) COLL.splice(i, 1);
      });
      gateIt.hint = "🚪 The gate is open";
      tone(90, 1, "sawtooth", 0.15);
      toast("🔓 Gate unlocked! Run for the boat!");
      return true;
    case "plad":
      if (!PRIS.ladder) {
        const i = inv();
        if (!(i.ladder > 0)) {
          toast(
            "🪜 You need a long ladder. Craft one at the workbench (planks + thatch).",
          );
          return true;
        }
        saveMe({ inv: pay(i, { ladder: 1 }) });
        PRIS.ladder = true;
        PRIS.sp = it.sp;
        LADG.visible = it.sp === 0;
        LADG2.visible = it.sp === 1;
        setLadHints();
        jingle([392, 523, 659]);
        toast(
          "🪜 Ladder in place! Tap it again to climb over. Mind the guards!",
        );
        return true;
      }
      if (PRIS.sp !== it.sp) {
        PRIS.sp = it.sp;
        LADG.visible = it.sp === 0;
        LADG2.visible = it.sp === 1;
        setLadHints();
        jingle([392, 523]);
        toast("🪜 You moved the ladder to this wall.");
        return true;
      }
      startClimb(it.side, it);
      return true;
  }
  return false;
}
function exInt4(it) {
  if (it.kind !== "cage") return false;
  if (rescued) {
    toast("Twombly is already free 😺");
    return true;
  }
  if (!PRIS.key) {
    toast("🔒 Cellule 7 is locked. The key must be in the guardhouse…");
    tone(180, 0.2, "square", 0.1);
    return true;
  }
  rescued = true;
  EXF.twombly = 1;
  village.cat = 1;
  vup({ cat: 1 });
  ensureCat();
  if (catItem) {
    catItem.x = me3.x - 1;
    catItem.z = me3.z;
  }
  PRIS.alarm = true;
  DET = Math.max(DET, 0.3);
  jingle([523, 659, 784, 1047, 1319]);
  burst(me3.x, 1.5, me3.z, 0xffd24a, 30, 3, 3);
  showModal(
    `<h2>😺 Twombly is free!</h2><p>He leaps into your arms... and an <b>alarm</b> starts ringing! Guards are alert and the searchlights are faster. <b>Escape</b>: open the steel gate or climb back over the wall, then sail home.</p><button id="fin" class="on">Run! 🏃</button>`,
  );
  $("#fin").onclick = closeModal;
  return true;
}
// ---------- busted: full reset including the boat
function resetPrison() {
  window.PRreset && PRreset();
  PRIS.off = false;
  GD.forEach((o) => {
    if (o.st === "down") {
      o.g.rotation.set(0, o.ry, 0);
    }
  });
  PRIS.key = false;
  PRIS.alarm = false;
  PRIS.climbed = false;
  DET = 0;
  setItemOn(keyIt, true);
  if (PRIS.ladder) {
    PRIS.ladder = false;
    LADG.visible = false;
    LADG2.visible = false;
    saveMe({ inv: give(inv(), { ladder: 1 }) });
  }
  setLadHints();
  if (PRIS.gate) {
    PRIS.gate = false;
    GCOL.forEach((c) => {
      if (!COLL.includes(c)) COLL.push(c);
    });
  }
  gateIt.hint = "🔒 Steel gate: needs the key";
  GD.forEach((o) => {
    o.x = o.home[0];
    o.z = o.home[1];
    o.pi = 0;
    o.st = "patrol";
    o.lure = null;
    o.tm = 0;
    o.found = 0;
    o.sq = null;
    o.cl = 0;
  });
  DOG.st = "roam";
  DOG.lure = null;
  BAGS.forEach((b) => scene.remove(b.m));
  BAGS.length = 0;
  const w = P2L(9, 5);
  DOG.x = w[0];
  DOG.z = w[1];
}
function caught() {
  if (PRIS.busted > 0) return;
  PRIS.busted = 2.8;
  bustE.style.display = "flex";
  requestAnimationFrame(() => (bustE.style.opacity = 1));
  CLIMB.on = false;
  goalPt = goalObj = null;
  tone(250, 0.9, "sawtooth", 0.2);
  tone(180, 1.2, "sawtooth", 0.2, 0.3);
}
function endBusted() {
  bustE.style.opacity = 0;
  setTimeout(() => {
    if (PRIS.busted <= 0) bustE.style.display = "none";
  }, 800);
  resetPrison();
  sailing = false;
  BO.v = BO.vx = BO.vz = BO.wv = BO.bump = 0;
  BO.wet = 0;
  sailE.style.display = "none";
  boatG.position.set(
    BOAT0[0],
    Math.max(hm(BOAT0[0], BOAT0[1]), SEA) - 0.05,
    BOAT0[1],
  );
  boatG.rotation.set(0, 0, 0);
  boatItem.x = BOAT0[0];
  boatItem.z = BOAT0[1];
  const k = 2 / Math.hypot(BOAT0[0], BOAT0[1]);
  me3.x = BOAT0[0] - BOAT0[0] * k;
  me3.z = BOAT0[1] - BOAT0[1] * k;
  me3.y = hm(me3.x, me3.z) + 0.1;
  me3.vy = 0;
  me3.vx = me3.vz = 0;
  snapCam();
  toast(
    "🚔 Busted! You're back home, the boat is back too, and the prison has reset.",
  );
}
// ---------- the per-frame prison brain
const segX = (p, q, a, b) => {
  const d = (q[0] - p[0]) * (b[1] - a[1]) - (q[1] - p[1]) * (b[0] - a[0]);
  if (Math.abs(d) < 1e-6) return false;
  const t = ((a[0] - p[0]) * (b[1] - a[1]) - (a[1] - p[1]) * (b[0] - a[0])) / d,
    u = ((a[0] - p[0]) * (q[1] - p[1]) - (a[1] - p[1]) * (q[0] - p[0])) / d;
  return t > 0 && t < 1 && u > 0 && u < 1;
};
const inB = (b, l, m) =>
  l[0] > b.x0 - 0.2 &&
  l[0] < b.x1 + 0.2 &&
  l[1] > b.z0 - 0.2 &&
  l[1] < b.z1 + 0.2;
let goalT = 0;
function prison35Tick(dt, t) {
  if (inCave) return;
  const dI = Math.hypot(me3.x - CMP[0], me3.z - CMP[1]),
    onI = dI < 74 && !sailing;
  PRIS.onI = onI;
  if (PRIS.busted > 0) {
    PRIS.busted -= dt;
    if (PRIS.busted <= 0) {
      PRIS.busted = 0;
      endBusted();
    }
  }
  if (CLIMB.on) climbTick(dt);
  if (PRIS.alarm && sailing && dI > 112) {
    PRIS.alarm = false;
    PRIS.escaped = true;
    toast("🎉 You escaped with Twombly! The guards lost you.");
    jingle([523, 659, 784, 1047, 1319]);
  }
  // stealth camera + mood
  if (onI) {
    if (!PRIS.cs) PRIS.cs = { d: dist, p: pitch };
    dist += (13.5 - dist) * Math.min(1, dt * 2.5);
    pitch += (0.5 - pitch) * Math.min(1, dt * 2.5);
  } else if (PRIS.cs) {
    dist += (PRIS.cs.d - dist) * Math.min(1, dt * 2.5);
    pitch += (PRIS.cs.p - pitch) * Math.min(1, dt * 2.5);
    if (Math.abs(dist - PRIS.cs.d) < 0.1) {
      dist = PRIS.cs.d;
      pitch = PRIS.cs.p;
      PRIS.cs = null;
    }
  }
  prisVig.style.opacity = onI ? 1 : 0;
  prisVig.style.background = PRIS.alarm
    ? `radial-gradient(circle at center,rgba(0,0,0,0) 35%,rgba(${(120 + Math.sin(t * 6) * 70) | 0},10,10,.55) 100%)`
    : "radial-gradient(circle at center,rgba(0,0,0,0) 40%,rgba(10,16,40,.5) 100%)";
  const show = onI && !photoOn && PRIS.busted <= 0;
  detE.style.display = show ? "block" : "none";
  pgE.style.display = show ? "block" : "none";
  bagB.style.display = "none";
  if (show) {
    const f = document.getElementById("detF");
    if (f) {
      f.style.width = Math.round(DET * 100) + "%";
      f.style.background = `hsl(${52 - 52 * DET},92%,52%)`;
    }
    detE.style.transform = `translateX(-50%) translate(${DET > 0.7 ? Math.sin(t * 50) * 2 : 0}px,0)`;
    goalT -= dt;
    if (goalT <= 0) {
      goalT = 0.4;
      const i = inv(),
        ck = (b) => (b ? "✅" : "⬜");
      pgE.innerHTML = `${ck(PRIS.ladder || i.ladder > 0 || PRIS.climbed || rescued)} 🪜 Long ladder (workbench)<br>${ck(PRIS.climbed || rescued)} 🧗 Get over the wall (ladder N/S or drain pipe)<br>${ck(SN.have)} 🎯 Sniper rifle (top of the outpost tower)<br>${ck(PRIS.key || rescued)} 🗝️ Key in the guardhouse<br>${ck(rescued)} 😺 Free Twombly (Cellule 7)<br>${ck(PRIS.escaped)} 🚤 Escape by boat`;
    }
  }
  if (!onI && !PRIS.alarm && DET <= 0) return;
  const lp = LOCL(me3.x, me3.z),
    cl = LOCL(cam.position.x, cam.position.z);
  // keys, flags, lighthouse, gate leaves
  keyG.rotation.y = t * 1.6;
  keyG.position.y = PLY + 1.35 + Math.sin(t * 2.4) * 0.06;
  LH.userData.bm.rotation.y = t * 0.6;
  leaves.forEach((l) => {
    const tr = PRIS.gate ? l.s * -1.45 : 0;
    l.lf.rotation.y += (tr - l.lf.rotation.y) * Math.min(1, dt * 2);
  });
  // buildings: roofs vanish and walls fade when you are inside; walls fade when they block the camera
  BLD.forEach((b) => {
    if (b.roof) b.roof.visible = !inB(b, lp);
  });
  FADE.forEach((f) => {
    const inside = f.bld !== undefined && inB(BLD[f.bld], lp),
      block = segX(cl, lp, f.a, f.b),
      o = block ? 0.2 : 1;
    f.mats.forEach((m) => {
      m.opacity += (o - m.opacity) * Math.min(1, dt * 8);
      const tr = m.opacity < 0.985;
      if (m.transparent !== tr) {
        m.transparent = tr;
        m.depthWrite = !tr;
      }
    });
  });
  for (let i = BAGS.length; i--;) {
    const b = BAGS[i];
    b.t -= dt;
    if (b.t <= 0) {
      scene.remove(b.m);
      BAGS.splice(i, 1);
      GD.forEach((o) => {
        if (o.lure === b) {
          o.lure = null;
          if (o.st === "lure" || o.st === "eat") o.st = "patrol";
        }
      });
      if (DOG.lure === b) {
        DOG.lure = null;
        DOG.st = "roam";
      }
    }
  }
  let gain = 0;
  const moving = me3.spd > 0.5,
    aMul = PRIS.alarm ? 1.5 : 1,
    inAny = BLD.some((b) => inB(b, lp)),
    still = !moving;
  TOW.forEach((w) => {
    if (PRIS.off) {
      w.cone.visible = w.disc.visible = false;
      return;
    }
    w.cone.visible = w.disc.visible = true;
    w.tx0 = w.tx;
    const a = t * w.spd * (PRIS.alarm ? 1.8 : 1) + w.ph,
      wl = P2L(w.cx + Math.cos(a) * w.R, w.cz + Math.sin(a) * w.R),
      ty = hm(wl[0], wl[1]) + 0.05,
      dir = new THREE.Vector3(
        w.top[0] - wl[0],
        w.top[1] - ty,
        w.top[2] - wl[1],
      ),
      len = dir.length();
    dir.normalize();
    w.cone.position.set(
      (w.top[0] + wl[0]) / 2,
      (w.top[1] + ty) / 2,
      (w.top[2] + wl[1]) / 2,
    );
    w.cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    w.cone.scale.set(3.2, len, 3.2);
    w.disc.position.set(wl[0], ty + 0.04, wl[1]);
    w.disc.material.color.setHex(PRIS.alarm ? 0xff9a9a : 0xfff2b0);
    w.cone.material.color.setHex(PRIS.alarm ? 0xff9a9a : 0xfff2b0);
    const hid = BLD.some((b) => inB(b, LOCL(wl[0], wl[1])));
    w.cone.visible = w.disc.visible = !hid;
    if (
      !hid &&
      onI &&
      !inAny &&
      !CLIMB.on &&
      Math.hypot(me3.x - wl[0], me3.z - wl[1]) < 4.6
    )
      gain = Math.max(gain, (still ? 0.75 : 1) * aMul);
  });
  gain = Math.max(gain, guardsTick(dt, t, onI, moving, aMul));
  {
    const D = DOG,
      hw = handler;
    let tx = hw.x + Math.cos(t * 0.7) * 3,
      tz = hw.z + Math.sin(t * 0.7) * 3,
      spd = 2.4;
    if (D.st === "lure" && D.lure) {
      tx = D.lure.x;
      tz = D.lure.z;
      spd = 3;
      if (Math.hypot(D.x - tx, D.z - tz) < 0.8) {
        D.st = "eat";
        D.bw = 5;
      }
    } else if (D.st === "eat") {
      D.bw -= dt;
      tx = null;
      if (D.bw <= 0) D.st = "roam";
    } else if (onI && !DOG.dead && !TW.up && !DOG.morph) {
      const dd = Math.hypot(me3.x - D.x, me3.z - D.z),
        lc = dd < 20 && losClear(D.x, D.z, me3.x, me3.z);
      if (D.st === "chase") {
        D.ct -= dt;
        if ((!lc && dd > 6) || D.ct <= 0 || dd > 20) D.st = "roam";
        else {
          tx = me3.x;
          tz = me3.z;
          spd = 3.4;
        }
      } else if (lc && dd < 7 && !DOG.morph && (moving || dd < 3.5)) {
        D.st = "chase";
        D.ct = 5;
        const e = emoteSprite("🐕");
        e.position.y = 1.8;
        D.g.add(e);
        setTimeout(() => D.g.remove(e), 1200);
        tone(240, 0.3, "square", 0.1);
        toast("🐕 The dog caught your scent!");
        callCops(D.x, D.z, 16, null, null);
      }
    }
    if (tx !== null) {
      const dx = tx - D.x,
        dz = tz - D.z,
        d = Math.hypot(dx, dz) || 1;
      if (d > 0.3) {
        let nx = D.x + (dx / d) * spd * dt,
          nz = D.z + (dz / d) * spd * dt;
        [nx, nz] = pushOut(nx, nz, 0.3);
        D.x = nx;
        D.z = nz;
        D.g.rotation.y +=
          adif(Math.atan2(dx, dz), D.g.rotation.y) * Math.min(1, dt * 8);
      }
    }
    D.g.position.set(D.x, Math.max(hm(D.x, D.z), SEA), D.z);
    D.g.userData.legs.forEach(
      (l, i) => (l.rotation.x = Math.sin(t * spd * 4 + i * 2) * 0.6),
    );
    if (onI && D.st !== "eat" && !TW.up && !DOG.morph) {
      const d = Math.hypot(me3.x - D.x, me3.z - D.z);
      if (d < (moving ? 5 : 2.6) && losClear(D.x, D.z, me3.x, me3.z))
        gain = Math.max(gain, 0.8 * aMul);
    }
  }
  if (PRIS.busted > 0) return;
  if (gain > 0) {
    DET = Math.min(1, DET + gain * dt * 0.62);
    PRIS.dh = 1.1;
    if (Math.random() < dt * 3) tone(300 + DET * 500, 0.05, "square", 0.04);
  } else {
    PRIS.dh -= dt;
    if (PRIS.dh <= 0) DET = Math.max(0, DET - 0.2 * dt);
  }
  if (PRIS.alarm && onI && Math.floor(t * 1.3) !== Math.floor((t - dt) * 1.3))
    tone(Math.floor(t) % 2 ? 620 : 820, 0.4, "square", 0.07);
  if (DET >= 1) caught();
}
function copTick(dt, t) {}

// ===================================================================
// v3.6 A: game clock (5-min days, night = 1/5), island health, puddles, love tree, waves, stars, fireflies, butterflies
// ===================================================================
["island_v30", "island_x6", "island_photos"].forEach((k) => {
  try {
    localStorage.removeItem(k);
  } catch (e) {}
});
const DAYLEN = 300;
var AIRV = 0,
  LANDV = 0,
  WK = null,
  WB = null,
  NIGHTK = 0;
function gameHour() {
  const u = (((X6.gt % DAYLEN) + DAYLEN) % DAYLEN) / DAYLEN;
  return (u < 0.8 ? 5 + (u / 0.8) * 15.6 : 20.6 + ((u - 0.8) / 0.2) * 8.4) % 24;
}
function dayNo() {
  return Math.floor(X6.gt / DAYLEN) + 1;
}
var LASTSLEEP = null;
function skipToMorning() {
  const g0 = X6.gt;
  X6.gt = (Math.floor(X6.gt / DAYLEN) + 1) * DAYLEN + 12;
  const a0 = AIRV,
    l0 = LANDV;
  try {
    stepRec((X6.gt - g0) / DAYLEN);
  } catch (e) {}
  LASTSLEEP = { a: AIRV - a0, l: LANDV - l0 };
  sv6();
}
function nightAmount(h) {
  return h >= 20.6 || h < 5
    ? 1
    : h < 6.6
      ? 1 - (h - 5) / 1.6
      : h >= 18.8
        ? (h - 18.8) / 1.8
        : 0;
}
const clk = hud$(
  "clk",
  "top:calc(env(safe-area-inset-top,0px) + 10px);left:50%;transform:translateX(-50%);background:var(--glass);border-radius:20px;padding:5px 12px;font-weight:800;font-size:13px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.14);white-space:nowrap;line-height:1.35",
);
let clkT = 0,
  gtSave = 0;
function clockTick(dt) {
  X6.gt += dt;
  gtSave += dt;
  if (gtSave > 6) {
    gtSave = 0;
    sv6();
  }
  const H = gameHour(),
    d = new Date(now()),
    cur =
      d.getHours() * 36e5 +
      d.getMinutes() * 6e4 +
      d.getSeconds() * 1e3 +
      d.getMilliseconds();
  timeOff = H * 36e5 - cur;
  NIGHTK = nightAmount(H);
  clkT -= dt;
  if (clkT <= 0) {
    clkT = 0.4;
    const hh = Math.floor(H),
      mm = Math.floor((H % 1) * 60),
      ic = NIGHTK > 0.6 ? "🌙" : H < 7.5 ? "🌅" : H > 18.8 ? "🌇" : "☀️",
      hl = Math.round((0.5 * AIRV + 0.5 * LANDV) * 100);
    clk.innerHTML = `${ic}${window.moonE ? window.moonE() : ""} Day ${dayNo()} · ${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}<br><span style="font-size:11.5px;opacity:.85">🌿 Island ${hl}% · 💨 Air ${Math.round(AIRV * 100)}%→${Math.round(AIRT * 100)}% · 🌱 Land ${Math.round(LANDV * 100)}%→${Math.round(LANDT * 100)}%</span>`;
  }
  clk.style.display = inCave || photoOn || modalOpen ? "none" : "block";
}
function healthTick() {
  const eff = Math.min(
    (blockIds.purifier || []).length,
    (blockIds.generator || []).length * 2,
  );
  AIRV = 1 - Math.exp(-eff * 0.5);
  LANDV = TR0 ? clamp(1 - trashLeft / TR0, 0, 1) : 0;
  const pr = RC.find((r) => r[0] === "Purifier");
  if (pr) {
    const all = EXF.pp_filter && EXF.pp_fan && EXF.pp_circuit;
    if (all) {
      pr[2] = { brick: 3, glass: 2 };
      pr[1] =
        "3🧱 + 2🪟 → 1 purifier. You own the blueprint, so build as many as you like!";
    } else {
      pr[2] = { brick: 3, glass: 2, filter: 1, fan: 1, circuit: 1 };
      pr[1] =
        "3🧱 + 2🪟 + the 3 parts found on the island (after that: unlimited)";
    }
  }
}
function exPow(kind) {
  const s = PWR;
  powerTick(0, 0);
  pwT = 0;
  const eff = Math.min(
      (blockIds.purifier || []).length,
      (blockIds.generator || []).length * 2,
    ),
    h = Math.round((0.5 * AIRV + 0.5 * LANDV) * 100);
  showModal(`${X}<h2>${kind === "gen" ? "⚡ Generator" : "🌀 Air purifier"}</h2><p>${kind === "gen" ? "One generator powers <b>2 purifiers</b> anywhere on the island. No wires: just place them." : "A purifier cleans the air only when a generator powers it (1 generator = 2 purifiers)."}</p>
 <div style="border:2px solid var(--line);border-radius:14px;padding:10px 12px;margin:8px 0;line-height:1.7">⚡ Generators <b>${s.gen}</b> · 🌀 Purifiers <b>${s.pur}</b> · ✅ Powered <b>${eff}</b><br>💨 Air cleaned <b>${Math.round(AIRV * 100)}%</b> <span class="mute">(each powered purifier clears less smog and fewer flies)</span><br>🗑️ Trash cleared <b>${Math.round(LANDV * 100)}%</b> <span class="mute">(trees grow back, puddles turn blue)</span><br>🌿 Island health <b>${h}%</b> <span class="mute">= half air, half trash</span></div>
 <p>${s.pur > s.on ? "⚠️ " + (s.pur - s.on) + " purifier(s) have no power: craft another ⚡ Generator." : s.pur === 0 ? "Next: find the 3 purifier parts, then craft purifiers. After the parts, you can build as many as you want!" : "Keep building purifiers and clearing trash!"}</p>`);
  $("#x").onclick = closeModal;
}
// ---------- puddles that hug the ground and turn from mud to clear blue water as the island heals
var pudMesh = null,
  pudCount = 0,
  pudIdx = 0;
(function () {
  scene.remove(pud);
  const sp = [],
    ring = 16;
  for (let i = 0; i < 4000 && sp.length < 80; i++) {
    const a = hs(i, 230, 1) * 6.283,
      d = Math.sqrt(hs(i, 231, 1)) * 38,
      x = Math.cos(a) * d,
      z = Math.sin(a) * d,
      h = gh(x, z),
      s = 0.7 + hs(i, 232, 1) * 1.2;
    if (
      h < 0.9 ||
      Math.hypot(x - HX, z - HZ) < 16 ||
      Math.hypot(x - 0, z + 10) < 7
    )
      continue;
    let mn = 9,
      mx = -9;
    for (let k = 0; k < 8; k++) {
      const q = gh(
        x + Math.cos(k * 0.785) * s * 1.5,
        z + Math.sin(k * 0.785) * s * 1.5,
      );
      mn = Math.min(mn, q);
      mx = Math.max(mx, q);
    }
    if (mx - mn > 0.2 || mn < SEA + 0.25) continue;
    sp.push({ x, z, s, e: 0.6 + hs(i, 233, 1) * 0.5, r: hs(i, 234, 1) * 3.14 });
  }
  piles.forEach((p, i) => {
    if (p.x !== undefined)
      sp.push({ x: p.x, z: p.z, s: 1.15, e: 1, r: i * 0.9, pile: 1 });
  });
  const pos = [],
    col = [],
    idx = [];
  sp.forEach((p) => {
    const b = pos.length / 3,
      rings = [0, 0.55, 1, 1.22];
    pos.push(p.x, gh(p.x, p.z) + 0.04, p.z);
    col.push(1.3, 1.3, 1.3);
    for (let r = 1; r < rings.length; r++)
      for (let k = 0; k < ring; k++) {
        const a = (k / ring) * 6.283 + p.r,
          wob = 1 + (vn(p.x * 3 + k, p.z * 3, 235) - 0.5) * 0.28,
          x = p.x + Math.cos(a) * p.s * rings[r] * wob,
          z = p.z + Math.sin(a) * p.s * rings[r] * p.e * wob * (r > 2 ? 1 : 1);
        pos.push(
          x,
          Math.max(gh(x, z), SEA + 0.02) + 0.04 + (r === 3 ? -0.012 : 0),
          z,
        );
        const c = r === 1 ? 1.12 : r === 2 ? 0.9 : 0.55;
        col.push(c, c, c);
      }
    for (let k = 0; k < ring; k++) {
      const k2 = (k + 1) % ring;
      idx.push(b, b + 1 + k, b + 1 + k2);
      for (let r = 0; r < 2; r++) {
        const a0 = b + 1 + r * ring;
        idx.push(
          a0 + k,
          a0 + ring + k,
          a0 + k2,
          a0 + k2,
          a0 + ring + k,
          a0 + ring + k2,
        );
      }
    }
  });
  // rings loop above builds triangles between ring r and r+1 for r=0,1,2 (ring index 0 = first ring)
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  pudMesh = new THREE.Mesh(
    g,
    new THREE.MeshStandardMaterial({
      color: 0x4a3a26,
      vertexColors: true,
      roughness: 0.12,
      metalness: 0.25,
      transparent: true,
      opacity: 0.94,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  pudMesh.frustumCulled = false;
  pudMesh.receiveShadow = true;
  scene.add(pudMesh);
  pudCount = sp.length;
  pudIdx = idx.length / pudCount;
  scene.traverse((o) => {
    if (o.isMesh && o.material === slud) o.visible = false;
  });
})();
const MUD = new THREE.Color(0x4a3a26),
  MURK = new THREE.Color(0x5c6a4a),
  CLEAR = new THREE.Color(0x39a0e6);
function pudUpdate(rest) {
  if (!pudMesh) return;
  const c = pudMesh.material.color;
  if (rest < 0.5) c.copy(MUD).lerp(MURK, rest / 0.5);
  else c.copy(MURK).lerp(CLEAR, clamp((rest - 0.5) / 0.4, 0, 1));
  pudMesh.material.roughness = 0.12 - 0.07 * rest;
  pudMesh.geometry.setDrawRange(
    0,
    Math.floor(pudCount * (1 - 0.55 * clamp((rest - 0.6) / 0.4, 0, 1))) *
      pudIdx,
  );
}
// ---------- the love tree, rebuilt cleanly (no stray pieces, no hat-shaped blobs)
(function () {
  heartTree.children.slice().forEach((c) => heartTree.remove(c));
  const outer = M(0xf2a7a0, {
      roughness: 0.55,
      emissive: 0x8a2a30,
      emissiveIntensity: 0.15,
    }),
    inner = M(0xe0607f, {
      roughness: 0.4,
      emissive: 0x8a1a44,
      emissiveIntensity: 0.3,
    }),
    core = M(0x6a1030, { roughness: 0.6 }),
    bark = M(0x7a6a52, { roughness: 1 }),
    leaf = M(0x6fd25c, { roughness: 0.8 }),
    add = (m, x, y, z, sx, sy, sz, rz) => {
      const e = new THREE.Mesh(G.crown, m);
      e.position.set(x, y, z);
      e.scale.set(sx, sy, sz);
      e.rotation.z = rz || 0;
      e.castShadow = true;
      heartTree.add(e);
      return e;
    };
  add(bark, 0, 0.25, 0, 1.5, 0.3, 1.5);
  add(core, 0, 1.9, 0.2, 0.2, 1.5, 0.45);
  add(inner, -0.34, 1.85, 0.34, 0.24, 1.4, 0.4, -0.05);
  add(inner, 0.34, 1.85, 0.34, 0.24, 1.4, 0.4, 0.05);
  add(outer, -0.62, 1.9, 0, 0.6, 2, 0.8, -0.13);
  add(outer, 0.62, 1.9, 0, 0.6, 2, 0.8, 0.13);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * 6.283;
    add(leaf, Math.cos(a) * 1.35, 0.3, Math.sin(a) * 1.35, 0.22, 0.1, 0.32, a);
  }
})();
// ---------- shoreline-safe waves
(function () {
  WK = new Float32Array(wp.count);
  WB = new Float32Array(wp.count);
  for (let i = 0; i < wp.count; i++) {
    const dp = SEA - gh(wp.getX(i), wp.getZ(i));
    WK[i] = ss(0.15, 1.2, dp);
    WB[i] = -0.26 * (1 - ss(-0.2, 0.9, dp));
  }
})();
// ---------- night: stars, fireflies; day: butterflies (both grow with island health)
const STARS = (() => {
  const n = 520,
    p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const a = hs(i, 240, 1) * 6.283,
      b = 0.12 + hs(i, 241, 1) * 1.35,
      r = 330;
    p[i * 3] = Math.cos(a) * Math.cos(b) * r;
    p[i * 3 + 1] = Math.sin(b) * r;
    p[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(p, 3));
  const m = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2.2,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    fog: false,
  });
  const o = new THREE.Points(g, m);
  o.frustumCulled = false;
  scene.add(o);
  return o;
})();
const FFN = 70,
  FIREF = [];
for (let i = 0; i < FFN; i++) {
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xd8ff6a,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      opacity: 0,
    }),
  );
  s.scale.setScalar(0.5);
  s.userData = {
    ox: hs(i, 250, 1) * 44 - 22,
    oz: hs(i, 251, 1) * 44 - 22,
    ph: hs(i, 252, 1) * 6.28,
    sp: 0.3 + hs(i, 253, 1) * 0.5,
  };
  s.visible = false;
  scene.add(s);
  FIREF.push(s);
}
const BFN = 26,
  BF = [],
  bfM = [0xffa640, 0xff6fa0, 0x6ab0ff, 0xfff070, 0xb68cff].map(
    (c) => new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }),
  );
for (let i = 0; i < BFN; i++) {
  const g = new THREE.Group(),
    w1 = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.26), bfM[i % 5]),
    w2 = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.26), bfM[i % 5]),
    a = new THREE.Group(),
    b = new THREE.Group();
  w1.position.x = -0.17;
  w2.position.x = 0.17;
  a.add(w1);
  b.add(w2);
  g.add(a, b);
  g.userData = {
    a,
    b,
    ox: hs(i, 260, 1) * 40 - 20,
    oz: hs(i, 261, 1) * 40 - 20,
    ph: hs(i, 262, 1) * 6.28,
    sp: 0.4 + hs(i, 263, 1) * 0.5,
  };
  g.visible = false;
  scene.add(g);
  BF.push(g);
}
function wildTick(dt, t) {
  const rest = clamp(LANDV * 0.75 + AIRV * 0.25, 0, 1),
    nk = NIGHTK;
  STARS.position.copy(cam.position);
  STARS.material.opacity = inCave ? 0 : nk * (1 - pollution * 0.7) * 0.95;
  const nf = inCave
      ? 0
      : Math.floor(FFN * nk * clamp((rest - 0.2) / 0.6, 0, 1)),
    nb = inCave
      ? 0
      : Math.floor(BFN * (1 - nk) * clamp((rest - 0.25) / 0.6, 0, 1)) *
        (WXR < 0.3 ? 1 : 0);
  for (let i = 0; i < FFN; i++) {
    const s = FIREF[i],
      u = s.userData,
      on = i < nf;
    s.visible = on;
    if (!on) continue;
    const x = me3.x + ((u.ox + Math.sin(t * u.sp + u.ph) * 3 + 60) % 44) - 22,
      z = me3.z + ((u.oz + Math.cos(t * u.sp * 0.8 + u.ph) * 3 + 60) % 44) - 22;
    s.position.set(
      x,
      Math.max(gh(x, z), SEA) + 1 + Math.sin(t * 1.3 + u.ph) * 0.5,
      z,
    );
    s.material.opacity = 0.4 + 0.6 * Math.max(0, Math.sin(t * 2.4 + u.ph));
  }
  for (let i = 0; i < BFN; i++) {
    const g = BF[i],
      u = g.userData,
      on = i < nb;
    g.visible = on;
    if (!on) continue;
    const x = me3.x + ((u.ox + Math.sin(t * u.sp + u.ph) * 4 + 60) % 40) - 20,
      z = me3.z + ((u.oz + Math.cos(t * u.sp * 0.9 + u.ph) * 4 + 60) % 40) - 20;
    g.position.set(
      x,
      Math.max(gh(x, z), SEA) + 0.9 + Math.sin(t * 2 + u.ph) * 0.35,
      z,
    );
    g.rotation.y = t * u.sp + u.ph;
    const f = Math.sin(t * 14 + u.ph) * 0.9;
    u.a.rotation.z = f;
    u.b.rotation.z = -f;
  }
}
// ---------- the fixed tick
const exTick7 = window.exTick;
window.exTick = function (dt, t) {
  if (ready) {
    healthTick(dt);
    clockTick(dt);
    wildTick(dt, t);
  }
  exTick7(dt, t);
};

// ===================================================================
// v3.6 B: cave upgrades (two-handed bat, bigger gun, smooth camera, barrels, power-ups, combo, forge, dodge, perf)
// ===================================================================
var BAT = { p: new THREE.Group(), t: 0, attached: false, kind: 0 },
  GUNK = { k: 0 },
  CAMS = { D: 2.8, S: 0.95 },
  LASTC = null,
  PU = { dbl: 0, insta: 0 },
  COMBO = { n: 0, t: 0 },
  UP = { lvl: 0 },
  DODGE = { t: 0, cd: 0, dx: 0, dz: 0 },
  BARR = [],
  PUS = [],
  FORGE = null;
HIT.inv = 0;
// ---- two-handed massive bat
(function () {
  const g = new THREE.Group(),
    wood = M(0x9a6a36, { roughness: 0.85 }),
    dk = M(0x2a1a0c, { roughness: 1 }),
    iron = M(0x7c7c86, { metalness: 0.7, roughness: 0.4 }),
    tape = M(0x1c1c22, { roughness: 0.9 }),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  A(new THREE.CylinderGeometry(0.055, 0.06, 0.62, 10), tape, 0, 0.12, 0);
  A(new THREE.SphereGeometry(0.1, 10, 8), wood, 0, -0.2, 0);
  const bl = A(
    new THREE.CylinderGeometry(0.19, 0.07, 1.35, 12),
    wood,
    0,
    1.0,
    0,
  );
  BAT.barrel = bl;
  A(new THREE.CylinderGeometry(0.19, 0.19, 0.1, 12), dk, 0, 1.67, 0);
  A(new THREE.SphereGeometry(0.19, 12, 8), wood, 0, 1.72, 0);
  [0.7, 1.15, 1.55].forEach(
    (y) =>
      (A(
        new THREE.TorusGeometry(0.13 + (y - 0.7) * 0.06, 0.022, 6, 14),
        iron,
        0,
        y,
        0,
      ).rotation.x = Math.PI / 2),
  );
  for (let i = 0; i < 9; i++) {
    const a = i * 0.7,
      y = 0.9 + (i % 3) * 0.28,
      r = 0.15 + (y - 0.7) * 0.045,
      n = A(
        new THREE.ConeGeometry(0.028, 0.15, 5),
        iron,
        Math.cos(a) * r,
        y,
        Math.sin(a) * r,
      );
    n.rotation.z = -Math.cos(a) * 1.4;
    n.rotation.x = Math.sin(a) * 1.4;
  }
  BAT.p.add(g);
  BAT.p.rotation.order = "YXZ";
})();
function batOut() {
  return !GUN.owned || BAT.t > 0;
}
function caveHeld() {
  return GUN.owned && !batOut() ? "pistol" : "";
}
const EASE = (x) => 1 - Math.pow(1 - x, 3);
function cavePose(a, dt) {
  const u = a.u;
  if (!BAT.attached && a.g) {
    a.g.add(BAT.p);
    BAT.attached = true;
  }
  if (BAT.t > 0) BAT.t = Math.max(0, BAT.t - dt);
  GUNK.k *= Math.max(0, 1 - dt * 10);
  if (batOut()) {
    const sw = BAT.t > 0,
      p = sw ? 1 - BAT.t / 0.34 : 0,
      c = BAT.kind;
    u.aR.rotation.set(-1.25, 0, -0.5);
    u.aL.rotation.set(-1.25, 0, 0.5);
    BAT.p.position.set(0, 0.98, 0.55);
    BAT.p.scale.setScalar(1);
    let ry, rx;
    if (!sw) {
      ry = -0.35 + Math.sin(a.ph * 2) * 0.05;
      rx = Math.PI / 2 - 1.0;
    } else if (c === 2) {
      const k = EASE(clamp((p - 0.15) / 0.5, 0, 1));
      ry = 0;
      rx = Math.PI / 2 + 1.1 - k * 2.5;
      u.aR.rotation.x = u.aL.rotation.x = -1.6 + k * 0.7;
    } else {
      const k = EASE(clamp((p - 0.12) / 0.55, 0, 1));
      ry = c === 1 ? 1.5 - k * 2.9 : -1.5 + k * 2.9;
      rx = Math.PI / 2 - 0.3;
      if (p < 0.12) ry += c === 1 ? (0.25 * p) / 0.12 : (-0.25 * p) / 0.12;
    }
    BAT.p.rotation.set(rx, ry, 0);
  } else {
    BAT.p.position.set(0, 1.25, -0.32);
    BAT.p.rotation.set(0.15, 0, 0.9);
    BAT.p.scale.setScalar(0.7);
    if (GUN.owned) {
      u.aR.rotation.set(-1.5 + GUNK.k * 0.35, 0, 0.08);
      u.aL.rotation.set(-1.3, 0, 0.42);
    }
  }
  if (UP.lvl > 0 && BAT.barrel)
    ((BAT.barrel.material.emissive =
      BAT.barrel.material.emissive || new THREE.Color(0)),
      BAT.barrel.material.emissive.setHex(0xff5a10),
      (BAT.barrel.material.emissiveIntensity = 0.6));
}
// ---- bigger, heavier pistol
function mkCaveHeld(k) {
  const g = new THREE.Group(),
    dk = M(0x1c1c22, { metalness: 0.7, roughness: 0.3 }),
    sil = M(0x9aa0aa, { metalness: 0.8, roughness: 0.25 }),
    gl = new THREE.MeshBasicMaterial({ color: 0x6fe8ff }),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  if (k !== "pistol") return g;
  A(new THREE.BoxGeometry(0.13, 0.62, 0.15), sil, 0, -0.26, 0);
  A(new THREE.BoxGeometry(0.11, 0.58, 0.1), dk, 0, -0.26, 0.07);
  A(
    new THREE.BoxGeometry(0.1, 0.2, 0.28),
    M(0x3a2a1a, { roughness: 0.8 }),
    0,
    0.04,
    -0.15,
  );
  A(new THREE.CylinderGeometry(0.045, 0.045, 0.34, 8), dk, 0, -0.66, 0.02);
  A(new THREE.BoxGeometry(0.05, 0.05, 0.1), dk, 0, -0.55, 0.14);
  A(new THREE.BoxGeometry(0.03, 0.14, 0.03), gl, 0.07, -0.28, 0.08);
  A(new THREE.BoxGeometry(0.045, 0.08, 0.05), dk, 0, -0.06, 0.08);
  return g;
}
// ---- smooth shoulder camera (collision snaps in, eases out)
function caveCamData(smooth) {
  const dd = smooth ? 0 : 1,
    p = dead > 0 ? Math.min(1, DIE.t / 3) : 0,
    fx = -Math.sin(yaw),
    fz = -Math.cos(yaw),
    rx = Math.cos(yaw),
    rz = -Math.sin(yaw),
    pa = clamp(cpit + HIT.kick, -0.5, 0.85) * 0.8,
    cs = Math.cos(pa),
    f3 = new THREE.Vector3(fx * cs, -Math.sin(pa), fz * cs),
    px = me3.x,
    py = me3.y + 1.5,
    pz = me3.z;
  let D = dead > 0 ? 2.8 + p * 3.2 : 2.9,
    S = dead > 0 ? 0 : 1,
    x = 0,
    y = 0,
    z = 0;
  for (let k = 0; k < 16; k++) {
    x = px - f3.x * D + rx * S;
    y = py - f3.y * D + (dead > 0 ? p * 2.6 : 0);
    z = pz - f3.z * D + rz * S;
    if (csd(x, z) < -0.4 && y < 0.5 + cCeil(x, z) - 0.3 && y > 0.85) break;
    D -= 0.2;
    S = Math.max(0, S - 0.08);
    if (D < 0.5) {
      D = 0.5;
      S = 0;
      break;
    }
  }
  if (smooth) {
    if (D < CAMS.D) {
      CAMS.D = D;
      CAMS.S = S;
    } else {
      CAMS.D += (D - CAMS.D) * Math.min(1, smooth * 4);
      CAMS.S += (S - CAMS.S) * Math.min(1, smooth * 4);
    }
    D = CAMS.D;
    S = CAMS.S;
    x = px - f3.x * D + rx * S;
    y = py - f3.y * D + (dead > 0 ? p * 2.6 : 0);
    z = pz - f3.z * D + rz * S;
  }
  return { pos: new THREE.Vector3(x, y, z), f3, fx, fz, rx, rz };
}
function caveCamApply(dt) {
  const c = caveCamData(dt);
  LASTC = c;
  cam.position.copy(c.pos);
  const sh = HIT.sh;
  if (sh > 0) {
    HIT.sh = Math.max(0, sh - dt * 2);
    cam.position.x += (Math.random() - 0.5) * sh * 0.22;
    cam.position.y += (Math.random() - 0.5) * sh * 0.16;
    cam.position.z += (Math.random() - 0.5) * sh * 0.22;
  }
  HIT.kick *= Math.max(0, 1 - dt * 8);
  HIT.inv = Math.max(0, HIT.inv - dt);
  const tf = cam.userData.f0 || (cam.userData.f0 = cam.fov),
    want = tf + (DODGE.t > 0 ? 8 : 0) + (me3.spd > 3 ? 2 : 0);
  if (Math.abs(cam.fov - want) > 0.05) {
    cam.fov += (want - cam.fov) * Math.min(1, dt * 8);
    cam.updateProjectionMatrix();
  }
  cam.lookAt(
    dead > 0
      ? new THREE.Vector3(me3.x, me3.y + 0.7, me3.z)
      : c.pos.clone().add(c.f3.clone().multiplyScalar(12)),
  );
  cam.updateMatrixWorld(true);
}
// ---- combat: delayed bat hit with swing arcs, explosive barrels, combo and power-ups
const MPEND = { t: -1, c: 0, dmg: 0 };
function attack() {
  if (!inCave || dead > 0 || modalOpen) return;
  const tn = now();
  if (tn - MEL.last < 360) return;
  MEL.combo = tn - MEL.last < 900 ? (MEL.combo + 1) % 3 : 0;
  MEL.last = tn;
  BAT.kind = MEL.combo;
  BAT.t = 0.34;
  const c = LASTC || caveCamData(),
    fx = c.fx,
    fz = c.fz;
  MEL.lunge = 0.14;
  MEL.lx = fx;
  MEL.lz = fz;
  MPEND.t = 0.11;
  MPEND.c = MEL.combo;
  MPEND.dmg = [75, 75, 120][MEL.combo] * (1 + UP.lvl * 0.5);
  slashM.visible = true;
  slashM.position.set(
    me3.x + fx * 0.5,
    me3.y + 1.0 + (MEL.combo === 2 ? 0.4 : 0),
    me3.z + fz * 0.5,
  );
  slashM.rotation.set(
    -Math.PI / 2 + (MEL.combo === 2 ? 1.1 : 0),
    Math.atan2(-fz, fx),
    MEL.combo === 1 ? 0.5 : 0,
  );
  slashM.scale.setScalar(0.7);
  slashM.material.opacity = 0.9;
  slashT = 0.24;
  tone(260, 0.12, "sawtooth", 0.07);
  tone(180, 0.14, "sawtooth", 0.06, 0.05);
}
function meleeHit() {
  const c = LASTC || caveCamData(),
    fx = c.fx,
    fz = c.fz,
    dmg = MPEND.dmg * (PU.insta > 0 ? 9 : 1);
  let hit = 0;
  ENEMY.forEach((z) => {
    if (z.dead || z.rise > 0) return;
    const dx = z.x - me3.x,
      dz = z.z - me3.z,
      d = Math.hypot(dx, dz) || 1;
    if (d > (z.type === "brute" ? 3.6 : 3.3)) return;
    if ((dx * fx + dz * fz) / d < 0.2 && d > 1.3) return;
    hit++;
    dealDamage(z, dmg, dx / d, dz / d, 0.9 + MPEND.c * 0.3);
  });
  BARR.forEach((b) => {
    if (
      !b.dead &&
      Math.hypot(b.x - me3.x, b.z - me3.z) < 2.8 &&
      (b.x - me3.x) * fx + (b.z - me3.z) * fz > 0
    ) {
      hit++;
      blowBarrel(b);
    }
  });
  if (plugTry(fx, fz, 3.4)) hit++;
  if (hit) {
    HIT.t = 0.05 + 0.02 * MPEND.c;
    HIT.sh = 0.5 + 0.2 * MPEND.c;
    hitMark(false);
    tone(120, 0.18, "square", 0.22);
    tone(70, 0.24, "sawtooth", 0.17, 0.02);
    tone(950, 0.05, "square", 0.08);
  } else tone(330, 0.08, "sawtooth", 0.05);
}
function dealDamage(z, n, kx, kz, kb) {
  n = Math.round(
    n * (PU.insta > 0 ? 9 : 1) * (UP.lvl && kb < 0.8 ? 1 + UP.lvl * 0.5 : 1),
  );
  z.hp -= n;
  z.hit = 0.15;
  z.stag = kb > 0.8 && z.type !== "brute" ? 0.1 : 0;
  dmgNum(z.x, 1.8, z.z, String(n), "dmg");
  burst(z.x, 1.1, z.z, z.type === "crab" ? 0xd8c060 : 0x7aff7a, 9, 1.8, 1.8);
  const k = kb === undefined ? 0.35 : kb * 0.8;
  for (const f of [1, 0.5]) {
    if (caveOK(z.x + kx * k * f, z.z + kz * k * f)) {
      z.x += kx * k * f;
      z.z += kz * k * f;
      break;
    }
  }
  reward(z, kb > 0.8);
  if (z.hp <= 0) hitMark(true);
}
function reward(z, melee) {
  const d = ETY[z.type],
    m = Math.min(5, 1 + Math.floor(COMBO.n / 2)) * (PU.dbl > 0 ? 2 : 1);
  RUN.cash += 10 * m;
  dmgNum(z.x + 0.3, 1.4, z.z, "+" + 10 * m, "pts");
  if (z.hp <= 0 && !z.dead) {
    z.dead = 0.01;
    COMBO.n++;
    COMBO.t = 4;
    const mk = Math.min(5, 1 + Math.floor(COMBO.n / 2)) * (PU.dbl > 0 ? 2 : 1);
    RUN.cash += d.kill * mk;
    RUN.kills++;
    dmgNum(z.x, 2.1, z.z, "KILL +" + d.kill * mk, "kill");
    tone(150, 0.3, "square", 0.12);
    if (Math.random() < 0.3) spawnAmmo(z.x, z.z);
    if (Math.random() < 0.1) spawnPU(z.x, z.z);
  }
  cashUp();
}
function shoot() {
  if (
    !inCave ||
    dead > 0 ||
    !GUN.owned ||
    modalOpen ||
    GUN.rel > 0 ||
    now() - GUN.last < 200
  )
    return;
  if (GUN.mag <= 0) {
    GUN.last = now();
    if (GUN.ammo > 0) reload();
    else toast("Out of ammo! Swing the bat with F / ⚔️");
    return;
  }
  GUN.last = now();
  GUN.mag--;
  const c = LASTC || caveCamData(),
    ox = c.pos.x,
    oz = c.pos.z,
    fx = c.fx,
    fz = c.fz;
  let wt = 45;
  for (let t = 0.6; t < 45; t += 0.4) {
    const x = ox + fx * t,
      z = oz + fz * t;
    if (csd(x, z) > -0.05 || doorHit(x, z, 0)) {
      wt = t;
      break;
    }
  }
  let best = null,
    bb = null,
    bt = wt;
  ENEMY.forEach((z) => {
    if (z.dead || z.rise > 0) return;
    const rx = z.x - ox,
      rz = z.z - oz,
      t = rx * fx + rz * fz;
    if (t < 0.8 || t > bt) return;
    const lat = Math.abs(rx * fz - rz * fx),
      rad =
        (z.type === "brute" ? 0.9 : z.type === "crab" ? 0.6 : 0.65) +
        0.12 +
        t * 0.006;
    if (lat < rad) {
      best = z;
      bb = null;
      bt = t;
    }
  });
  BARR.forEach((b) => {
    if (b.dead) return;
    const rx = b.x - ox,
      rz = b.z - oz,
      t = rx * fx + rz * fz;
    if (t < 0.8 || t > bt) return;
    if (Math.abs(rx * fz - rz * fx) < 0.7) {
      best = null;
      bb = b;
      bt = t;
    }
  });
  const pg = plugRay(ox, oz, fx, fz, bt);
  if (pg) {
    best = null;
    bb = null;
    bt = pg;
    PLUGHIT = 1;
  }
  const hx = Math.hypot(c.f3.x, c.f3.z) || 1,
    tx = ox + fx * bt,
    tz = oz + fz * bt,
    ty = best ? me3.y + 1.0 : Math.max(0.6, c.pos.y + (c.f3.y / hx) * bt),
    mx = me3.x + fx * 0.9 + c.rx * 0.3,
    mz = me3.z + fz * 0.9 + c.rz * 0.3,
    my = me3.y + 1.15,
    P = trc.geometry.attributes.position;
  P.setXYZ(0, mx, my, mz);
  P.setXYZ(1, tx, ty, tz);
  P.needsUpdate = true;
  trc.visible = true;
  trcT = 0.07;
  mzf.position.set(mx, my, mz);
  mzf.scale.setScalar(2.4);
  mzf.visible = true;
  mzT = 0.06;
  if (best) {
    const dx = best.x - me3.x,
      dz = best.z - me3.z,
      d = Math.hypot(dx, dz) || 1;
    dealDamage(best, 60, dx / d, dz / d, 0.3);
    hitMark(false);
    HIT.t = 0.02;
  } else if (bb) {
    blowBarrel(bb);
  } else if (PLUGHIT) {
    PLUGHIT = 0;
    hitPlug();
  } else {
    burst(tx, ty, tz, 0xffd24a, 8, 2.4, 2);
    tone(1500, 0.04, "square", 0.05);
  }
  HIT.kick += 0.05;
  HIT.sh = Math.max(HIT.sh, 0.18);
  AIM.sp = Math.min(1, AIM.sp + 0.4);
  GUNK.k = 1;
  tone(680, 0.08, "square", 0.18);
  tone(160, 0.16, "sawtooth", 0.16, 0.01);
  tone(90, 0.2, "sine", 0.14, 0.01);
  burst(mx, my, mz, 0xffd24a, 6, 1.2, 1);
  burst(mx + c.rx * 0.2, my, mz + c.rz * 0.2, 0xe0b040, 2, 2.4, 1.2);
  if (GUN.mag <= 0 && GUN.ammo > 0) reload();
  hudUp();
}
// ---- explosive barrels
function mkBarrel36() {
  const g = new THREE.Group(),
    b = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1.1, 14),
      M(0xc0302a, { roughness: 0.55, metalness: 0.3 }),
    );
  b.position.y = 0.55;
  b.castShadow = true;
  g.add(b);
  [0.15, 0.55, 0.95].forEach((y) => {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.035, 6, 16),
      M(0xffd24a),
    );
    r.rotation.x = Math.PI / 2;
    r.position.y = y;
    g.add(r);
  });
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: signTex("💥"), fog: false }),
  );
  s.scale.set(0.9, 0.35, 1);
  s.position.y = 1.5;
  g.add(s);
  return g;
}
function spawnBarrels() {
  BARR.forEach((b) => {
    cRoot.remove(b.g);
    const i = CPROPS.indexOf(b.cp);
    if (i >= 0) CPROPS.splice(i, 1);
  });
  BARR.length = 0;
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
  ].forEach(([ri, k], n) => {
    const rm = CROOMS[ri];
    for (let i = 0; i < 80; i++) {
      const a = hs(i + n * 7, 270, ri) * 6.283,
        r = rm.r * (0.45 + hs(i, 271, n) * 0.4),
        x = rm.x + Math.cos(a) * r,
        z = rm.z + Math.sin(a) * r;
      if (
        csd(x, z) > -2.2 ||
        nearSegW(x, z, 3.6) ||
        CPROPS.some((p) => Math.hypot(p.x - x, p.z - z) < p.r + 1.1) ||
        BARR.some((q) => Math.hypot(q.x - x, q.z - z) < 4)
      )
        continue;
      const g = mkBarrel36();
      g.position.set(x, 0.5, z);
      cRoot.add(g);
      const cp = { x, z, r: 0.62 };
      CPROPS.push(cp);
      BARR.push({ x, z, g, cp, dead: false });
      break;
    }
  });
}
function blowBarrel(b) {
  if (b.dead) return;
  b.dead = true;
  cRoot.remove(b.g);
  const i = CPROPS.indexOf(b.cp);
  if (i >= 0) CPROPS.splice(i, 1);
  burst(b.x, 1, b.z, 0xff8a20, 46, 5, 3);
  burst(b.x, 1, b.z, 0xffe070, 26, 3, 2);
  burst(b.x, 1.2, b.z, 0x3a3a3a, 18, 2, 3);
  tone(60, 0.7, "sawtooth", 0.3);
  tone(120, 0.5, "square", 0.25, 0.02);
  HIT.sh = Math.max(HIT.sh, 0.9);
  HIT.t = Math.max(HIT.t, 0.05);
  ENEMY.forEach((z) => {
    if (z.dead) return;
    const dx = z.x - b.x,
      dz = z.z - b.z,
      d = Math.hypot(dx, dz);
    if (d < 4.6) {
      z.rise = 0;
      dealDamage(z, 200, dx / (d || 1), dz / (d || 1), 2.2);
    }
  });
  if (Math.hypot(me3.x - b.x, me3.z - b.z) < 3.2) hurt(50);
  BARR.forEach((q) => {
    if (!q.dead && Math.hypot(q.x - b.x, q.z - b.z) < 3.4)
      setTimeout(() => blowBarrel(q), 220);
  });
}
// ---- power-ups
function puTex(txt, col) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = "rgba(10,10,20,.75)";
  g.beginPath();
  g.arc(64, 64, 58, 0, 6.283);
  g.fill();
  g.strokeStyle = col;
  g.lineWidth = 7;
  g.stroke();
  g.font = "64px system-ui";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(txt, 64, 70);
  return new THREE.CanvasTexture(c);
}
const PUT = {
  ammo: ["🔫", "#6fe8ff", "MAX AMMO"],
  dbl: ["💰", "#ffd24a", "DOUBLE POINTS"],
  insta: ["💀", "#ff4a4a", "INSTA-KILL"],
};
function spawnPU(x, z) {
  const k = ["ammo", "dbl", "insta"][Math.floor(Math.random() * 3)],
    d = PUT[k],
    g = new THREE.Group(),
    sp = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: puTex(d[0], d[1]), fog: false }),
    ),
    ha = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: new THREE.Color(d[1]),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      }),
    );
  sp.scale.set(1.1, 1.1, 1);
  ha.scale.set(3.4, 3.4, 1);
  g.add(ha, sp);
  g.position.set(x, 1.4, z);
  cRoot.add(g);
  PUS.push({ x, z, k, g, t: 22 });
}
function takePU(p) {
  cRoot.remove(p.g);
  const d = PUT[p.k];
  if (p.k === "ammo") {
    GUN.mag = 8;
    GUN.ammo = Math.max(GUN.ammo, 48);
    hudUp();
  } else PU[p.k] = 20;
  tone(880, 0.1, "sine", 0.12);
  tone(1320, 0.2, "sine", 0.12, 0.08);
  toast(d[0] + " " + d[2] + "!");
  burst(p.x, 1.2, p.z, 0xffffff, 20, 2, 2);
}
// ---- forge: spend points to upgrade bat + gun, resets when you die
function buildForge() {
  if (FORGE) {
    IG.remove(FORGE.root);
    const i = items.indexOf(FORGE);
    if (i >= 0) items.splice(i, 1);
  }
  const g = new THREE.Group(),
    st = M(0x55555e, { metalness: 0.5, roughness: 0.6 }),
    fire = new THREE.MeshBasicMaterial({ color: 0xff7a20 }),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  A(new THREE.BoxGeometry(1.6, 0.5, 1.1), st, 0, 0.25, 0);
  A(
    new THREE.BoxGeometry(1.1, 0.35, 0.7),
    M(0x30303a, { metalness: 0.7, roughness: 0.35 }),
    0,
    0.75,
    0,
  );
  A(
    new THREE.BoxGeometry(0.5, 0.25, 0.5),
    M(0x30303a, { metalness: 0.7, roughness: 0.35 }),
    1.0,
    0.62,
    0,
  );
  A(new THREE.BoxGeometry(1.4, 1.7, 1), st, -1.8, 0.85, 0);
  A(new THREE.BoxGeometry(1, 0.7, 0.1), fire, -1.8, 0.9, 0.52);
  const ha = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xff8a30,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  ha.scale.set(5, 5, 1);
  ha.position.set(-1.8, 1, 0.9);
  g.add(ha);
  const sg = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: signTex("🔨 FORGE"), fog: false }),
  );
  sg.scale.set(2.2, 0.85, 1);
  sg.position.set(-0.6, 2.7, 0);
  g.add(sg);
  hitSph(g, 2.4, 1.4);
  const fx = CVX + 36,
    fz = CVZ + 11.8;
  g.position.set(fx, 0.5, fz);
  g.rotation.y = Math.PI;
  FORGE = addItem({
    id: "forge",
    kind: "forge",
    x: fx,
    z: fz - 0.6,
    r: 0,
    reach: 3.2,
    root: g,
    hint: "🔨 Forge: upgrade your bat and gun (+50% damage) for 1500 pts",
  });
  if (!CPROPS.some((p) => p.forge))
    CPROPS.push({ x: fx, z: fz, r: 1.5, forge: 1 });
  CUSE.add("forge");
}
// ---- dodge roll
function dodge() {
  if (!inCave || dead > 0 || modalOpen || DODGE.cd > 0) return;
  const fx = -Math.sin(yaw),
    fz = -Math.cos(yaw),
    rx = Math.cos(yaw),
    rz = -Math.sin(yaw);
  let dx = 0,
    dz = 0;
  if (keys.w || keys.arrowup) {
    dx += fx;
    dz += fz;
  }
  if (keys.s || keys.arrowdown) {
    dx -= fx;
    dz -= fz;
  }
  if (keys.a || keys.arrowleft) {
    dx -= rx;
    dz -= rz;
  }
  if (keys.d || keys.arrowright) {
    dx += rx;
    dz += rz;
  }
  if (!dx && !dz) {
    dx = -fx;
    dz = -fz;
  }
  const l = Math.hypot(dx, dz);
  DODGE.dx = dx / l;
  DODGE.dz = dz / l;
  DODGE.t = 0.24;
  DODGE.cd = 1.1;
  HIT.inv = 0.34;
  tone(240, 0.14, "sine", 0.08);
  burst(me3.x, 0.7, me3.z, 0xb8a890, 8, 1.6, 1);
}
addEventListener(
  "keydown",
  (e) => {
    if (e.key === "Shift" && inCave && !e.repeat) dodge();
  },
  true,
);
const dgB = document.createElement("button");
dgB.className = "pill";
dgB.textContent = "🌀";
dgB.style.cssText =
  "top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 214px);right:12px;pointer-events:auto;width:54px;height:54px;border-radius:27px;font-size:22px;padding:0;display:none";
document.body.appendChild(dgB);
dgB.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  dodge();
});
const puE = hud$(
  "puE",
  "top:calc(env(safe-area-inset-top,0px) + 160px);left:50%;transform:translateX(-50%);font-weight:900;font-size:15px;text-align:center;text-shadow:0 2px 4px #000;color:#fff;max-width:92vw",
);
// ---- cave per-frame extras
let perfInCave = false;
function cave36Tick(dt, t) {
  BAT.p.visible = inCave;
  tpsB.style.display = inCave || photoOn ? "none" : "block";
  const show = inCave && dead <= 0 && !modalOpen;
  dgB.style.display = show ? "block" : "none";
  if (inCave !== perfInCave) {
    perfInCave = inCave;
    try {
      R.setPixelRatio(Math.min(devicePixelRatio || 1, inCave ? 1.5 : 2));
    } catch (e) {}
  }
  if (!inCave) {
    puE.style.display = "none";
    return;
  }
  if (MPEND.t >= 0) {
    MPEND.t -= dt;
    if (MPEND.t < 0) meleeHit();
  }
  if (DODGE.cd > 0) DODGE.cd -= dt;
  if (DODGE.t > 0) {
    DODGE.t -= dt;
    const nx = me3.x + DODGE.dx * 13 * dt,
      nz = me3.z + DODGE.dz * 13 * dt;
    if (caveOK(nx, nz)) {
      me3.x = nx;
      me3.z = nz;
    }
  }
  COMBO.t -= dt;
  if (COMBO.t <= 0) COMBO.n = 0;
  PU.dbl = Math.max(0, PU.dbl - dt);
  PU.insta = Math.max(0, PU.insta - dt);
  for (let i = PUS.length; i--;) {
    const p = PUS[i];
    p.t -= dt;
    p.g.position.y = 1.4 + Math.sin(t * 3 + i) * 0.18;
    p.g.scale.setScalar(p.t < 4 ? (Math.floor(t * 6) % 2 ? 0.2 : 1) : 1);
    if (p.t <= 0) {
      cRoot.remove(p.g);
      PUS.splice(i, 1);
    } else if (dead <= 0 && Math.hypot(p.x - me3.x, p.z - me3.z) < 1.7) {
      PUS.splice(i, 1);
      takePU(p);
    }
  }
  const m = Math.min(5, 1 + Math.floor(COMBO.n / 2)),
    parts = [];
  if (COMBO.n > 1) parts.push(`🔥 COMBO ×${m}`);
  if (PU.dbl > 0) parts.push(`💰 ×2 ${Math.ceil(PU.dbl)}s`);
  if (PU.insta > 0) parts.push(`💀 INSTA-KILL ${Math.ceil(PU.insta)}s`);
  if (UP.lvl) parts.push("🔨 UPGRADED");
  puE.style.display = parts.length && show ? "block" : "none";
  puE.textContent = parts.join("  ·  ");
}
function exInt36(it) {
  if (exInt37(it)) return true;
  switch (it.kind) {
    case "forge":
      if (UP.lvl) {
        toast("🔨 Already forged! Your weapons are glowing.");
        return true;
      }
      if (RUN.cash < 1500) {
        toast("🔨 You need 1500 points to forge (you have " + RUN.cash + ")");
        tone(180, 0.2, "square", 0.1);
        return true;
      }
      RUN.cash -= 1500;
      UP.lvl = 1;
      cashUp();
      HIT.sh = 0.6;
      tone(200, 0.3, "square", 0.2);
      tone(500, 0.4, "sine", 0.15, 0.15);
      burst(it.x, 1, it.z, 0xff8a20, 40, 4, 3);
      toast("🔨 FORGED! Bat and pistol hit 50% harder.");
      return true;
    case "takedown": {
      const o = it.guard;
      if (o.st === "down") return true;
      killGuard(o, false);
      return true;
    }
    case "psn":
      snPick();
      return true;
    case "pgen":
      if (PRIS.off) {
        toast("⚡ The power is already cut.");
        return true;
      }
      PRIS.off = true;
      it.hint = "⚡ Power cut: searchlights are dead";
      tone(80, 1, "sawtooth", 0.2);
      burst(it.x, 1.6, it.z, 0xfff070, 26, 3, 2);
      toast("⚡ POWER CUT! Searchlights are dead and guards see less.");
      return true;
    case "proute":
      it.run();
      return true;
  }
  return false;
}
const _fullReset0 = fullReset;
function fullReset() {
  resetRun();
  GUN.owned = false;
  X6.cave.pistol = 0;
  X6.cave.cr = {};
  sv6();
  gunB.style.display = "none";
  if (GUNIT) {
    IG.remove(GUNIT.root);
    const i = items.indexOf(GUNIT);
    if (i >= 0) items.splice(i, 1);
    GUNIT = null;
  }
  spawnGunCrate();
  QC.forEach((it) => {
    IG.remove(it.root);
    const i = items.indexOf(it);
    if (i >= 0) items.splice(i, 1);
  });
  QC.length = 0;
  spawnQuestCrystals();
  items
    .filter((i) => i.kind === "ammo")
    .forEach((i) => {
      IG.remove(i.root);
      items.splice(items.indexOf(i), 1);
    });
  PUS.forEach((p) => cRoot.remove(p.g));
  PUS.length = 0;
  UP.lvl = 0;
  COMBO.n = 0;
  PU.dbl = PU.insta = 0;
  spawnBarrels();
  buildForge();
  resetSecret();
  BAT.t = 0;
  hudUp();
  cashUp();
}
// ---- one-off cave setup + static-object optimisation
spawnBarrels();
buildForge();
(function freezeStatic() {
  const skip = new Set(TORCH);
  cRoot.children.forEach((o) => {
    if (skip.has(o) || o.isSprite || o.isLight) return;
    if (BARR.some((b) => b.g === o)) return;
    o.matrixAutoUpdate = false;
    o.updateMatrix();
  });
})();

// ===================================================================
// v3.6 C: island shoulder camera, close boat camera, Leviathan, Far Cry style outpost
// ===================================================================
var TPS = X6.tps !== 0,
  opit = 0.3,
  TC = { D: 5.2, S: 0.8 };
function tpsData(smooth) {
  const fx = -Math.sin(yaw),
    fz = -Math.cos(yaw),
    rx = Math.cos(yaw),
    rz = -Math.sin(yaw),
    pa = clamp(opit, -0.2, 0.85) * 0.8,
    cs = Math.cos(pa),
    f3 = new THREE.Vector3(fx * cs, -Math.sin(pa), fz * cs),
    px = me3.x,
    py = me3.y + (PRIS.onI && !inCave ? 2.3 : 1.5),
    pz = me3.z,
    far =
      window.__scope === 2
        ? 1.1
        : window.__scope
          ? 3.2
          : PRIS.onI && !inCave
            ? 10.5
            : 5.2;
  let D = far,
    S = 0.8,
    x = 0,
    y = 0,
    z = 0;
  for (let k = 0; k < 14; k++) {
    x = px - f3.x * D + rx * S;
    y = py - f3.y * D;
    z = pz - f3.z * D + rz * S;
    if (y > Math.max(gh(x, z), SEA) + 0.8) break;
    D -= 0.35;
    S = Math.max(0, S - 0.06);
    if (D < 0.8) {
      D = 0.8;
      S = 0;
      break;
    }
  }
  if (smooth) {
    if (D < TC.D) {
      TC.D = D;
      TC.S = S;
    } else {
      TC.D += (D - TC.D) * Math.min(1, smooth * 3);
      TC.S += (S - TC.S) * Math.min(1, smooth * 3);
    }
    D = TC.D;
    S = TC.S;
    x = px - f3.x * D + rx * S;
    y = py - f3.y * D;
    z = pz - f3.z * D + rz * S;
  }
  return { pos: new THREE.Vector3(x, y, z), f3 };
}
function tpsApply(dt) {
  const c = tpsData(dt);
  cam.position.copy(c.pos);
  const base = cam.userData.f0 || (cam.userData.f0 = cam.fov),
    f0 =
      window.__scope === 2
        ? 4.5
        : window.__scope
          ? 20
          : base + (PRIS.onI && !inCave ? 14 : 0);
  if (Math.abs(cam.fov - f0) > 0.05) {
    cam.fov += (f0 - cam.fov) * Math.min(1, dt * (window.__scope ? 8 : 3));
    cam.updateProjectionMatrix();
  }
  cam.lookAt(c.pos.clone().add(c.f3.clone().multiplyScalar(14)));
  cam.updateMatrixWorld(true);
}
const tpsB = document.createElement("button");
tpsB.className = "pill";
tpsB.textContent = "🎥";
tpsB.title = "Camera: shoulder / classic (V)";
tpsB.style.cssText =
  "top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 214px);right:12px;pointer-events:auto;width:54px;height:54px;border-radius:27px;font-size:22px;padding:0";
document.body.appendChild(tpsB);
function toggleTPS() {
  TPS = !TPS;
  X6.tps = TPS ? 1 : 0;
  sv6();
  toast(TPS ? "🎥 Shoulder camera (drag to look around)" : "🎥 Classic camera");
}
tpsB.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  toggleTPS();
});
addEventListener(
  "keydown",
  (e) => {
    if (
      (e.key === "v" || e.key === "V") &&
      !(e.target && e.target.tagName === "INPUT") &&
      !modalOpen &&
      !inCave
    )
      toggleTPS();
  },
  true,
);
// ---------- boat camera: close and behind
function sailCamPos() {
  const pe = Math.max(pitch * 0.6, 0.28),
    dd = clamp(dist * 0.5 + 2.5 + BO.v * 0.2, 8, 13.5),
    cp = Math.cos(pe);
  return new THREE.Vector3(
    me3.x + BO.lx * 0.25 + Math.sin(yaw) * cp * dd,
    me3.y + 1.3 + Math.sin(pe) * dd,
    me3.z + BO.lz * 0.25 + Math.cos(yaw) * cp * dd,
  );
}
function sailCamTick(dt) {
  if (!window.lastDragT || performance.now() - window.lastDragT > 1200) {
    if (BO.v > 0.5 || Math.abs(BO.wv) > 0.2)
      yaw += adif(BO.h + Math.PI, yaw) * Math.min(1, dt * (2 + BO.v * 0.18));
  }
  const f0 = cam.userData.f0 || (cam.userData.f0 = cam.fov),
    tf = f0 + Math.min(6, BO.v * 0.8);
  if (Math.abs(cam.fov - tf) > 0.03) {
    cam.fov += (tf - cam.fov) * Math.min(1, dt * 2.5);
    cam.updateProjectionMatrix();
  }
}
// ---------- the Leviathan: terrifying outside, a softie inside
LEV_SPEECH.unshift("YOU. HAVE. WOKEN. ME.");
LEV_SPEECH.push(
  "...Boo. Did I scare you? Sorry. Everyone runs.",
  "I am very soft on the inside. Look, I made a little living room.",
  "Take these pearls. Thank you for talking to me, little fisher.",
);
const NICE = LEV_SPEECH.slice(-3);
function mkKraken() {
  const g = new THREE.Group(),
    dk = M(0x0b0f14, { roughness: 0.5, metalness: 0.25 }),
    rg = M(0x151b23, { roughness: 0.45 }),
    gl = EM(0xcfe8ff, 1.2),
    bone = M(0xe8e0c4, { roughness: 0.6 }),
    pts = [];
  for (let i = 0; i <= 34; i++) {
    const u = i / 34,
      a = u * Math.PI * 2.4;
    pts.push(
      new THREE.Vector3(
        Math.cos(a) * (3.4 - u * 2.2),
        u * 10 - 3,
        Math.sin(a) * (3.4 - u * 2.2),
      ),
    );
  }
  const cv = new THREE.CatmullRomCurve3(pts);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(cv, 150, 1.15, 12, false), dk));
  for (let i = 2; i < 62; i++) {
    const u = i / 62,
      p = cv.getPoint(u),
      tn = cv.getTangent(u),
      rr = 1.2 * (1 - u * 0.3),
      r = new THREE.Mesh(new THREE.TorusGeometry(rr, 0.15, 6, 14), rg);
    r.position.copy(p);
    r.lookAt(p.clone().add(tn));
    g.add(r);
    if (i % 2 === 0) {
      const d = new THREE.Mesh(G.crown, gl);
      d.scale.setScalar(0.1);
      d.position
        .copy(p)
        .addScaledVector(new THREE.Vector3(tn.z, 0, -tn.x).normalize(), rr);
      g.add(d);
    }
    if (i % 3 === 0) {
      const sp = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.5, 5), dk);
      sp.position.set(p.x, p.y + rr + 0.5, p.z);
      sp.rotation.z = i % 2 ? 0.3 : -0.3;
      g.add(sp);
    }
  }
  const hp = cv.getPoint(1),
    hg = new THREE.Group();
  hg.position.set(hp.x, hp.y + 0.2, hp.z);
  g.add(hg);
  const sk = new THREE.Mesh(G.crown, dk);
  sk.scale.set(1.9, 1.35, 2.5);
  sk.position.set(0, 0.2, 0.2);
  hg.add(sk);
  const roof = new THREE.Mesh(
    new THREE.SphereGeometry(1, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2),
    dk,
  );
  roof.scale.set(1.75, 1, 3);
  roof.position.set(0, 0.05, 1.3);
  hg.add(roof);
  const floor = new THREE.Mesh(
    new THREE.SphereGeometry(1, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2),
    M(0x3a0e12, { roughness: 0.8 }),
  );
  floor.scale.set(1.6, 0.9, 2.8);
  floor.rotation.x = Math.PI;
  floor.position.set(0, 0.02, 1.3);
  hg.add(floor);
  const jaw = new THREE.Group();
  jaw.position.set(0, -0.1, -0.55);
  hg.add(jaw);
  const lj = new THREE.Mesh(
    new THREE.SphereGeometry(1, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2),
    dk,
  );
  lj.scale.set(1.65, 0.95, 3.1);
  lj.rotation.x = Math.PI;
  lj.position.set(0, -0.15, 1.9);
  jaw.add(lj);
  const TT = 22,
    tg = new THREE.ConeGeometry(0.12, 0.72, 5),
    upT = new THREE.InstancedMesh(tg, bone, TT),
    loT = new THREE.InstancedMesh(tg, bone, TT),
    m4 = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e = new THREE.Euler(),
    one = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < TT; i++) {
    const a = -1.2 + (i / (TT - 1)) * 2.4 + (i % 2 ? 0.04 : -0.04),
      ex = Math.sin(a) * 1.6,
      ez = 1.3 + Math.cos(a) * 3.0 * (a > -9 ? 1 : 1),
      sc = new THREE.Vector3(
        1,
        (0.7 + ((i * 7) % 5) * 0.18) * (Math.abs(a) < 0.5 ? 1.5 : 1),
        1,
      );
    e.set(Math.PI, 0, 0);
    q.setFromEuler(e);
    m4.compose(new THREE.Vector3(ex, 0.0, ez - 0.2), q, sc);
    upT.setMatrixAt(i, m4);
    e.set(0, 0, 0);
    q.setFromEuler(e);
    m4.compose(
      new THREE.Vector3(
        Math.sin(a) * 1.45,
        -0.1,
        1.9 + Math.cos(a) * 2.9 + 0.55,
      ),
      q,
      new THREE.Vector3(1, 0.8 + ((i * 5) % 4) * 0.2, 1),
    );
    loT.setMatrixAt(i, m4);
  }
  hg.add(upT);
  jaw.add(loT);
  const cozy = new THREE.Group();
  {
    const wm = M(0xb07a3a, { roughness: 0.8 }),
      A = (geo, mat, x, y, z) => {
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x, y, z);
        cozy.add(m);
        return m;
      };
    A(
      new THREE.BoxGeometry(0.7, 0.45, 0.6),
      M(0xc0392b, { roughness: 0.9 }),
      -0.5,
      0.1,
      2.2,
    );
    A(
      new THREE.BoxGeometry(0.7, 0.55, 0.15),
      M(0xc0392b, { roughness: 0.9 }),
      -0.5,
      0.5,
      1.95,
    );
    A(
      new THREE.CylinderGeometry(0.18, 0.14, 0.28, 8),
      M(0xf4f4f4),
      0.45,
      0.15,
      2.3,
    );
    A(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 6), wm, 0.1, 0.35, 2.9);
    A(new THREE.ConeGeometry(0.28, 0.3, 8), M(0xffe28a), 0.1, 0.8, 2.9);
    const lamp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0xffc060,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      }),
    );
    lamp.scale.set(5, 5, 1);
    lamp.position.set(0.1, 0.9, 2.9);
    cozy.add(lamp);
    A(new THREE.SphereGeometry(0.22, 8, 6), M(0x3a8a3a), 0.8, 0.25, 1.9);
    cozy.visible = false;
    cozy.position.y = -0.1;
    jaw.add(cozy);
  }
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x300000,
    emissive: 0xff1a0a,
    emissiveIntensity: 2.6,
    roughness: 0.3,
  });
  [-1, 1].forEach((s) => {
    const ey = new THREE.Mesh(G.crown, eyeMat);
    ey.scale.set(0.42, 0.42, 0.3);
    ey.position.set(s * 1.15, 0.85, 1.35);
    hg.add(ey);
    const pu = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.55, 0.05),
      M(0x000000),
    );
    pu.position.set(s * 1.15, 0.85, 1.62);
    hg.add(pu);
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.2), dk);
    br.position.set(s * 1.1, 1.35, 1.3);
    br.rotation.z = -s * 0.45;
    hg.add(br);
  });
  const stalk = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.5, 0.8),
    new THREE.Vector3(0, 3.2, 1.8),
    new THREE.Vector3(0, 3.6, 4.2),
  ]);
  hg.add(new THREE.Mesh(new THREE.TubeGeometry(stalk, 16, 0.05, 6, false), dk));
  const bulb = new THREE.Mesh(G.crown, EM(0x9ff4ff, 3));
  bulb.scale.setScalar(0.32);
  bulb.position.set(0, 3.6, 4.2);
  hg.add(bulb);
  const bh = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0x7fe8ff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  bh.scale.set(7, 7, 1);
  bh.position.copy(bulb.position);
  hg.add(bh);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * 6.283,
      c2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(hp.x, hp.y - 0.5, hp.z),
        new THREE.Vector3(
          hp.x + Math.cos(a) * 2.4,
          hp.y + 1,
          hp.z + Math.sin(a) * 2.4,
        ),
        new THREE.Vector3(
          hp.x + Math.cos(a) * 5.2,
          hp.y - 0.8,
          hp.z + Math.sin(a) * 5.2,
        ),
        new THREE.Vector3(
          hp.x + Math.cos(a) * 7.8,
          hp.y - 5.5,
          hp.z + Math.sin(a) * 7.8,
        ),
      ]);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(c2, 40, 0.26, 8, false), dk));
    const en = c2.getPoint(1),
      tn = c2.getTangent(1),
      sp = new THREE.Mesh(new THREE.ConeGeometry(0.26, 1.8, 6), dk);
    sp.position.copy(en).addScaledVector(tn, 0.8);
    sp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tn);
    g.add(sp);
  }
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });
  g.userData = { jaw, eyeMat, bulb, bh, cozy, kv: 0 };
  return g;
}
function kTick(dt, t) {
  if (!kS) return;
  kS.t += dt;
  const T = kS.t,
    rise = clamp(T / 3.4, 0, 1),
    sink = clamp((T - kS.end) / 3, 0, 1),
    u = kS.g.userData;
  kS.g.position.y =
    SEA -
    17 +
    17 * (1 - Math.pow(1 - rise, 3)) -
    17 * sink +
    Math.sin(t * 1.3) * 0.25;
  const want = Math.atan2(me3.x - kS.g.position.x, me3.z - kS.g.position.z);
  let d = want - kS.g.rotation.y;
  d = Math.atan2(Math.sin(d), Math.cos(d));
  kS.g.rotation.y += d * Math.min(1, dt * 1.2);
  if (T < 3.6) {
    shake_ = Math.max(shake_ || 0, 0.55 * (1 - T / 3.6));
    if (Math.random() < dt * 26)
      burst(
        kS.g.position.x + (Math.random() - 0.5) * 8,
        SEA + 0.1,
        kS.g.position.z + (Math.random() - 0.5) * 8,
        0xffffff,
        3,
        3,
        3,
      );
    if (T < 2.8 && Math.floor(T * 8) !== Math.floor((T - dt) * 8))
      tone(40 + Math.random() * 30, 0.5, "sawtooth", 0.2);
  }
  const txt = subE.textContent;
  if (!kS.kind && NICE.includes(txt)) {
    kS.kind = 1;
    if (!kS.gift) {
      kS.gift = 1;
      addInv(
        { gem: 3, heart: 2 },
        "🫧 The Leviathan gave you pearls and hearts!",
      );
      jingle([523, 659, 784, 1047]);
    }
  }
  u.kv += ((kS.kind ? 1 : 0) - u.kv) * Math.min(1, dt * 1.3);
  const kv = u.kv;
  u.eyeMat.emissive.setRGB(1 - 0.7 * kv, 0.1 + 0.55 * kv, 0.04 + 0.95 * kv);
  u.eyeMat.emissiveIntensity = 2.6 - 1.2 * kv;
  const speaking = T > 3.6 && T < kS.end,
    open =
      T < 3.6
        ? clamp((T - 2) / 1.4, 0, 1) * 1.05
        : kS.kind
          ? 0.8
          : 0.22 +
            (speaking ? Math.max(0, Math.sin(t * 9)) * 0.3 : 0) +
            (Math.sin(t * 0.7) > 0.88 ? 0.45 : 0);
  u.jaw.rotation.x += (open - u.jaw.rotation.x) * Math.min(1, dt * 6);
  u.cozy.visible = kv > 0.35;
  u.bulb.scale.setScalar(0.32 + Math.sin(t * 3) * 0.05);
  u.bh.material.opacity = 0.7 + Math.sin(t * 3) * 0.25;
  if (T > 3.6 && T < kS.end && !kS.kind && Math.random() < dt * 6)
    tone(60 + Math.random() * 60, 0.25, "sawtooth", 0.05);
  if (T > 3.6 && T < kS.end && Math.random() < dt * 6)
    tone(
      kS.kind ? 330 + Math.random() * 180 : 220 + Math.random() * 120,
      0.06,
      "sine",
      0.05,
    );
  if (T > 70 && kS.end > 900) kS.end = T;
  if (sink >= 1) {
    scene.remove(kS.g);
    kS = null;
    subE.style.display = "none";
    subE.textContent = "";
    if (window.speechSynthesis) speechSynthesis.cancel();
  }
}
// ---------- Île d'If as a Far Cry style outpost: many ways in, silent takedowns, power sabotage
var RT = { on: false, t: 0, i: 0, pts: [], dur: [], after: null };
function startRoute(pts, dur, after) {
  if (RT.on || CLIMB.on || PRIS.busted > 0 || sailing) return;
  RT.on = true;
  RT.t = 0;
  RT.i = 0;
  RT.pts = pts;
  RT.dur = dur;
  RT.after = after;
  goalPt = goalObj = null;
  tone(320, 0.1, "triangle", 0.07);
}
function routeTick(dt) {
  RT.t += dt;
  while (RT.on && RT.t >= RT.dur[RT.i]) {
    RT.t -= RT.dur[RT.i];
    RT.i++;
    if (RT.i >= RT.pts.length - 1) {
      const e = RT.pts[RT.pts.length - 1];
      me3.x = e[0];
      me3.y = e[1] + 0.05;
      me3.z = e[2];
      me3.vy = 0;
      me3.vx = me3.vz = 0;
      RT.on = false;
      if (RT.after) RT.after();
      return;
    }
  }
  if (!RT.on) return;
  const a = RT.pts[RT.i],
    b = RT.pts[RT.i + 1],
    k = clamp(RT.t / RT.dur[RT.i], 0, 1),
    e = k * k * (3 - 2 * k);
  me3.x = a[0] + (b[0] - a[0]) * e;
  me3.y = a[1] + (b[1] - a[1]) * e;
  me3.z = a[2] + (b[2] - a[2]) * e;
  me3.ry = Math.atan2(b[0] - a[0], b[2] - a[2]);
  me3.vy = 0;
  me3.vx = me3.vz = 0;
  me3.spd = 1.2;
}
function routeItem(id, lx, lz, hint, run) {
  const w = P2L(lx, lz);
  return addItem({
    id,
    kind: "proute",
    x: w[0],
    z: w[1],
    r: 0,
    reach: 2.4,
    root: place(gH(1.2), w[0], w[1]),
    hint,
    run,
  });
}
const P3 = (lx, lz, dy) => {
  const w = P2L(lx, lz);
  return [w[0], hm(w[0], w[1]) + (dy || 0), w[1]];
};
// route 2: drain pipe on the south side, crawl under the wall into the maintenance alley
{
  const dr = new THREE.Group(),
    pm = M(0x3a3e46, { metalness: 0.6, roughness: 0.5 }),
    pipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.75, 1.6, 14, 1, true),
      M(0x3a3e46, { metalness: 0.5, roughness: 0.6, side: THREE.DoubleSide }),
    );
  pipe.rotation.x = Math.PI / 2;
  pipe.position.set(0, 0.75, 0);
  dr.add(pipe);
  for (let i = -3; i <= 3; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 0.05), pm);
    b.position.set(i * 0.2, 0.75, -0.8);
    dr.add(b);
  }
  const dk = new THREE.Mesh(
    new THREE.CircleGeometry(0.7, 14),
    new THREE.MeshBasicMaterial({ color: 0x050608 }),
  );
  dk.position.set(0, 0.75, 0.1);
  dr.add(dk);
  const gl = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xffe090,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      opacity: 0.5,
    }),
  );
  gl.scale.set(3, 3, 1);
  gl.position.set(0, 1.4, 0);
  dr.add(gl);
  const w = P2L(-8, -13.7);
  dr.position.set(w[0], hm(w[0], w[1]), w[1]);
  dr.rotation.y = -LA - Math.PI / 2;
  dr.scale.setScalar(PS);
  scene.add(dr);
  colAdd(-8, -14.3, 0.7, false);
}
routeItem("sewOut", -8, -15.2, "🕳️ A drain pipe… crawl under the wall", () =>
  startRoute(
    [P3(-8, -15.2), P3(-8, -13.4, -1.4), P3(-8, -11.4, -1.4), P3(-8, -10.2)],
    [0.7, 1.3, 0.7],
    () =>
      toast(
        "🕳️ You crawled out in the maintenance alley, behind the cellhouse.",
      ),
  ),
);
routeItem("sewIn", -8, -10.2, "🕳️ Back through the drain", () =>
  startRoute(
    [P3(-8, -10.2), P3(-8, -11.4, -1.4), P3(-8, -13.4, -1.4), P3(-8, -15.2)],
    [0.7, 1.3, 0.7],
    null,
  ),
);
// route 3: climb the lighthouse and ride the zipline onto the cellhouse roof, drop in through the hatch
// camp dressing: tents, campfire, jeep, generator shed (cut the power!)
{
  const tent = (lx, lz, ry, col) => {
    const g = new THREE.Group(),
      t = new THREE.Mesh(
        new THREE.ConeGeometry(2, 1.9, 4),
        M(col, { roughness: 0.95 }),
      );
    t.rotation.y = Math.PI / 4;
    t.position.y = 0.95;
    t.castShadow = true;
    g.add(t);
    P2put(g, lx, lz, ry);
    colAdd(lx, lz, 1.5, false);
    cov(lx, lz, 2.6);
  };
  tent(29, -4.8, 0.3, 0x6a7a4a);
  tent(30.5, 1.6, -0.4, 0x7a6a4a);
  tent(27.5, -9.4, 0.8, 0x6a7a4a);
  const fire = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const lg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.7, 6),
      M(0x4a2e18),
    );
    lg.rotation.set(1.3, i * 1.26, 0);
    lg.position.y = 0.12;
    fire.add(lg);
  }
  const fl = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.8, 7),
    new THREE.MeshBasicMaterial({ color: 0xff9a30 }),
  );
  fl.position.y = 0.55;
  fire.add(fl);
  const fh = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xff9040,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  fh.scale.set(5, 5, 1);
  fh.position.y = 0.8;
  fire.add(fh);
  P2put(fire, 28, -1.5, 0);
  window.CAMPF = { fl, fh };
  const jeep = new THREE.Group(),
    jm = M(0x58633a, { roughness: 0.8 }),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      jeep.add(m);
      return m;
    };
  A(new THREE.BoxGeometry(3.1, 0.8, 1.7), jm, 0, 0.75, 0);
  A(new THREE.BoxGeometry(1.4, 0.8, 1.5), jm, -0.2, 1.45, 0);
  A(
    new THREE.BoxGeometry(1.2, 0.6, 1.5),
    new THREE.MeshBasicMaterial({ color: 0x7f93a6 }),
    0.55,
    1.4,
    0,
  );
  [
    [-1.1, 0.7],
    [1.1, 0.7],
    [-1.1, -0.7],
    [1.1, -0.7],
  ].forEach(([x, z]) => {
    const w = A(
      new THREE.CylinderGeometry(0.42, 0.42, 0.3, 12),
      M(0x1a1a1e),
      x,
      0.42,
      z * 1.0,
    );
    w.rotation.x = Math.PI / 2;
  });
  P2put(jeep, 32, -8, 0.6);
  colAdd(32, -8, 1.8, false);
  cov(32, -8, 2.8);
  const gs = new THREE.Group(),
    gb = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 2, 2.2),
      M(0x6a6e58, { roughness: 0.9 }),
    );
  gb.position.y = 1;
  gb.castShadow = true;
  gs.add(gb);
  const gr = new THREE.Mesh(new THREE.BoxGeometry(3, 0.3, 2.6), M(0x3a3e30));
  gr.position.y = 2.1;
  gs.add(gr);
  const ex = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 1.2, 8),
    M(0x222226),
  );
  ex.position.set(0.9, 2.6, 0.5);
  gs.add(ex);
  const lm = new THREE.Mesh(
    G.crown,
    new THREE.MeshBasicMaterial({ color: 0xffe070 }),
  );
  lm.scale.setScalar(0.2);
  lm.position.set(0, 1.7, 1.15);
  gs.add(lm);
  window.GENL = lm;
  const sg = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: signTex("⚡ POWER"), fog: false }),
  );
  sg.scale.set(1.8, 0.7, 1);
  sg.position.set(0, 3.1, 0);
  gs.add(sg);
  P2put(gs, 25, -7.2, 0);
  colAdd(25, -7.2, 1.9, true);
  const gw = P2L(25, -5.4);
  const gi = addItem({
    id: "pgen",
    kind: "pgen",
    x: gw[0],
    z: gw[1],
    r: 0,
    reach: 2.8,
    root: place(gH(1.4), gw[0], gw[1]),
    hint: "⚡ Generator shed: cut the power (searchlights die)",
  });
  window.GENIT = gi;
}
// ---------- v5.2: trenches, sandbag lips, outposts, rounds outside the wall, dead trees
{
  const LY = (lx, lz) => {
      const w = P2L(lx, lz);
      return (hm(w[0], w[1]) - PLY) / PS;
    },
    sbM = M(0x8a7a52, { roughness: 1 }),
    NB = 420,
    sbI = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.9, 0.42, 0.5),
      sbM,
      NB,
    ),
    m4 = new THREE.Matrix4(),
    qq = new THREE.Quaternion(),
    one = new THREE.Vector3(1, 1, 1),
    eu = new THREE.Euler();
  let nb = 0;
  TRN.forEach((t) => {
    const L = Math.hypot(t[2] - t[0], t[3] - t[1]),
      ux = (t[2] - t[0]) / L,
      uz = (t[3] - t[1]) / L;
    eu.set(0, -Math.atan2(uz, ux), 0);
    qq.setFromEuler(eu);
    for (let s = -1; s <= 1; s += 2)
      for (let d = 0; d < L && nb < NB; d += 0.95) {
        const lx = t[0] + ux * d - uz * s * 2.5,
          lz = t[1] + uz * d + ux * s * 2.5;
        if (
          TRN.some((o) => o !== t && sgd(lx, lz, o[0], o[1], o[2], o[3]) < 2.9)
        )
          continue;
        m4.compose(new THREE.Vector3(lx, LY(lx, lz) + 0.18, lz), qq, one);
        sbI.setMatrixAt(nb++, m4);
      }
    for (let d = 1; d < L; d += 4.5) cov(t[0] + ux * d, t[1] + uz * d, 2.7);
  });
  sbI.count = nb;
  sbI.frustumCulled = false;
  PG.add(sbI);
  const wood = M(0x4a3420, { roughness: 1 }),
    A = (g, geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  function outpost(lx, lz, face, sw) {
    const g = new THREE.Group(),
      y0 = LY(lx, lz);
    A(g, new THREE.BoxGeometry(5, 0.2, 4), wood, 0, 0.1, 0);
    [
      [0, -1.9, 5, 0.2],
      [-2.4, 0, 0.2, 3.6],
      [2.4, 0, 0.2, 3.6],
    ].forEach(([x, z, w, d]) =>
      A(
        g,
        new THREE.BoxGeometry(w, 2.6, d),
        M(0x5a5a48, { roughness: 1 }),
        x,
        1.4,
        z,
      ),
    );
    A(
      g,
      new THREE.BoxGeometry(5.8, 0.3, 4.8),
      M(0x3a3a30, { roughness: 1 }),
      0,
      2.9,
      0,
    );
    A(g, new THREE.CylinderGeometry(0.07, 0.07, 6, 6), wood, 2.8, 6, -2.2);
    [0x2a3f8a, 0xececec, 0xc8323c].forEach((c, i) =>
      A(
        g,
        new THREE.BoxGeometry(0.8, 1.5, 0.05),
        new THREE.MeshBasicMaterial({ color: c, fog: false }),
        3.2 + i * 0.8,
        8.2,
        -2.2,
      ),
    );
    const bl = A(
      g,
      G.crown,
      new THREE.MeshBasicMaterial({ color: 0xff2a2a }),
      0,
      3.35,
      0,
    );
    bl.scale.setScalar(0.14);
    (window.BLINK = window.BLINK || []).push(bl);
    g.position.set(lx, y0, lz);
    g.rotation.y = face;
    PG.add(g);
    colAdd(lx, lz, 2.6, true);
    cov(lx, lz, 4.2);
    [
      [-3.4, 2.8],
      [3.4, 2.8],
    ].forEach(([x, z]) => {
      const c = mkCrate();
      c.position.set(lx + x, LY(lx + x, lz + z), lz + z);
      PG.add(c);
      colAdd(lx + x + 0.5, lz + z, 1.3, false);
      cov(lx + x + 0.5, lz + z, 2.2);
    });
    const f = mkBarrel(0x8a3a2a);
    f.position.set(lx + 3.4, LY(lx + 3.4, lz - 3), lz - 3);
    PG.add(f);
    colAdd(lx + 3.4, lz - 3, 0.5, false);
    addGuard([[lx, lz + (face ? -3.5 : 3.5)]], {
      sweep: {
        b: WH(Math.sin(face + Math.PI), Math.cos(face + Math.PI)),
        a: 1.3,
        r: 0.45,
      },
      rng: 6.5,
    });
  }
  outpost(10, -31, 0, 0);
  outpost(-14, 31, Math.PI, 0);
  outpost(31, 14, Math.PI / 2, 0);
  // hay bales: sight-blocking hiding places on the outer ring
  [
    [-27, -8],
    [-27, 9],
    [-9, -25],
    [8, 25],
    [26, -12],
    [24, 24],
    [-18, -26],
    [0, -24],
  ].forEach(([lx, lz]) => {
    const b = A(
      PG,
      new THREE.CylinderGeometry(0.9, 0.9, 1.3, 10),
      M(0xc9a85a, { roughness: 1 }),
      lx,
      LY(lx, lz) + 0.65,
      lz,
    );
    b.rotation.z = Math.PI / 2;
    b.rotation.y = lx;
    colAdd(lx, lz, 1.1, true);
    cov(lx, lz, 2.4);
  });
  // dead trees
  const tG = new THREE.CylinderGeometry(0.1, 0.26, 4, 6),
    bG = new THREE.CylinderGeometry(0.05, 0.1, 1.9, 5),
    NT = 22,
    tI = new THREE.InstancedMesh(tG, wood, NT),
    bI = new THREE.InstancedMesh(bG, wood, NT * 2);
  let nbr = 0;
  for (let i = 0; i < NT; i++) {
    const a = hs(i, 3, 31) * 6.283,
      r = 30 + hs(i, 4, 31) * 7,
      lx = Math.cos(a) * r * 1.05,
      lz = Math.sin(a) * r;
    if ((Math.abs(lz) < 5 && lx > 12) || Math.hypot(lx + 12, lz + 32) < 8)
      continue;
    const y = LY(lx, lz),
      s = 0.8 + hs(i, 5, 31) * 0.9;
    eu.set(0, 0, (hs(i, 6, 31) - 0.5) * 0.2);
    qq.setFromEuler(eu);
    m4.compose(
      new THREE.Vector3(lx, y + 2 * s, lz),
      qq,
      new THREE.Vector3(s, s, s),
    );
    tI.setMatrixAt(i, m4);
    for (let k = 0; k < 2; k++) {
      eu.set(
        0,
        hs(i, 7 + k, 31) * 6.283,
        (k ? -1 : 1) * (0.9 + hs(i, 9, 31) * 0.3),
      );
      qq.setFromEuler(eu);
      m4.compose(
        new THREE.Vector3(lx, y + (2.6 + k * 0.8) * s, lz),
        qq,
        new THREE.Vector3(s, s, s),
      );
      bI.setMatrixAt(nbr++, m4);
    }
  }
  tI.frustumCulled = bI.frustumCulled = false;
  PG.add(tI, bI);
  // rounds: outer ring, corridor between wall and trench, west trench runner
  addGuard(
    [
      [26, -14],
      [26, -26],
      [-2, -34],
      [-26, -26],
      [-34, 0],
      [-26, 26],
      [-2, 34],
      [26, 26],
      [26, 14],
    ],
    { sp: 1.1, rng: 10 },
  );
  addGuard(
    [
      [-20, -17.5, 2],
      [20, -17.5, 2],
      [20, 17.5, 2],
      [-20, 17.5, 2],
    ],
    { sp: 1, rng: 9 },
  );
  addGuard(
    [
      [-24, -17, 3],
      [-24, 17, 3],
    ],
    { sp: 0.95, rng: 7 },
  );
  const bl = A(
    PG,
    G.crown,
    new THREE.MeshBasicMaterial({ color: 0xff2a2a }),
    -23,
    13.4,
    0,
  );
  bl.scale.setScalar(0.2);
  (window.BLINK = window.BLINK || []).push(bl);
}
// ---------- v5.2: it is always raining and gloomy on Ile d'If
{
  const gl = document.createElement("div");
  gl.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:2;background:#0a121a;opacity:0";
  document.body.appendChild(gl);
  const DK = new THREE.Color(0x242b33);
  let on = 0,
    f = 0;
  const ex9 = window.exTick;
  window.exTick = function (dt, t) {
    ex9(dt, t);
    if (!ready) return;
    (window.BLINK || []).forEach((b, i) =>
      b.scale.setScalar(0.12 + 0.08 * Math.sin(t * 1.6 + i)),
    );
    if (inCave) {
      gl.style.opacity = 0;
      return;
    }
    const d = Math.hypot(me3.x - CMP[0], me3.z - CMP[1]),
      near = (on ? d < 135 : d < 105) && !photoOn;
    if (near) {
      const hr = new Date(now() + timeOff).getHours(),
        want = "rain";
      if (
        WT.type === "clear" ||
        WT.type === "cloudy" ||
        (want === "storm" && WT.type === "rain")
      )
        setWX(want, true);
      WT.next = 1e9;
      on = 1;
    } else if (on) {
      on = 0;
      setWX("clear", true);
    }
    const tgt = near ? clamp((135 - d) / 45, 0, 1) : 0;
    f += (tgt - f) * Math.min(1, dt * 1.2);
    gl.style.opacity = (f * 0.16).toFixed(3);
    if (f > 0.01) {
      scene.fog.color.lerp(DK, 0.4 * f);
      if (scene.background && scene.background.isColor)
        scene.background.lerp(DK, 0.7 * f);
    }
  };
}
// ---------- v5.3: walls block sight, beheadings, sniper nest
function wallBlock(ax, az, bx, bz, bOnly) {
  const p = LOCL(ax, az),
    q = LOCL(bx, bz);
  for (let i = 0; i < FADE.length; i++) {
    const f = FADE[i];
    if (bOnly && f.bld === undefined) continue;
    if (segX(p, q, f.a, f.b)) return true;
  }
  return false;
}
const HEADS = [],
  POOLS = [],
  SN = { have: false, ammo: 0, sc: false, cd: 0, z: 1 };
let snIt = null,
  snRifle = null;
function killGuard(o, sn) {
  o.st = "down";
  o.dt = 1e9;
  o.dead = 1;
  const hd = o.g.userData.hd;
  if (hd && !o.hdOff) {
    const wp = new THREE.Vector3();
    hd.getWorldPosition(wp);
    scene.attach(hd);
    hd.position.copy(wp);
    o.hdOff = 1;
    HEADS.push({
      m: hd,
      o,
      vx: (Math.random() - 0.5) * 4,
      vy: 3.5 + Math.random() * 2.5,
      vz: (Math.random() - 0.5) * 4,
      t: 0,
    });
  }
  const y = hm(o.x, o.z) + 1.7;
  burst(o.x, y, o.z, 0xb01018, 32, 3.6, 3.5);
  burst(o.x, y - 0.5, o.z, 0x7a0a10, 18, 2, 1.6);
  tone(170, 0.2, "sawtooth", 0.18);
  tone(60, 0.4, "square", 0.16);
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 14),
    new THREE.MeshBasicMaterial({
      color: 0x5a0a10,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(o.x, Math.max(hm(o.x, o.z), SEA) + 0.06, o.z);
  scene.add(pool);
  POOLS.push({ m: pool, t: 0 });
  toast(sn ? "🎯 Headshot!" : "🗡️ Beheaded!");
}
function snPick() {
  if (SN.have) return;
  if (!TW.up) {
    toast("🪜 Climb the sniper tower first");
    return;
  }
  SN.have = true;
  SN.ammo = 5;
  setItemOn(snIt, false);
  snRifle.visible = false;
  tone(520, 0.1, "triangle", 0.1);
  toast(
    "🎯 Sniper rifle! 5 rounds. Q scope · Z / scroll zoom ×3 ↔ ×12 · F fire. Shots are LOUD: cops will come.",
  );
}
function PRreset() {
  HEADS.forEach((x) => {
    x.o.g.add(x.m);
    x.m.position.set(0, 0, 0);
    x.m.rotation.set(0, 0, 0);
    x.o.hdOff = 0;
    x.o.dead = 0;
  });
  HEADS.length = 0;
  POOLS.forEach((x) => scene.remove(x.m));
  POOLS.length = 0;
  SN.have = false;
  SN.ammo = 0;
  SN.sc = false;
  window.__scope = 0;
  ALR.t = 0;
  TW.up = false;
  railsOff();
  if (snIt) {
    setItemOn(snIt, true);
    snRifle.visible = true;
  }
  DOG.dead = 0;
  DOG.g.rotation.z = 0;
}
function snFire() {
  if (!SN.sc || SN.ammo <= 0 || SN.cd > 0) return;
  SN.ammo--;
  SN.cd = 0.9;
  callCops(me3.x, me3.z, 38, null, "Gunshot! Cops are heading for the tower");
  tone(70, 0.35, "sawtooth", 0.3);
  tone(1500, 0.07, "square", 0.1);
  const f = new THREE.Vector3();
  cam.getWorldDirection(f);
  let best = null,
    ba = 9;
  const cand = GD.filter((o) => o.st !== "down").map((o) => ({
    o,
    x: o.x,
    z: o.z,
    y: hm(o.x, o.z) + 1.7,
  }));
  if (!DOG.dead)
    cand.push({
      o: DOG,
      x: DOG.x,
      z: DOG.z,
      y: hm(DOG.x, DOG.z) + 0.6,
      dog: 1,
    });
  cand.forEach((c) => {
    const v = new THREE.Vector3(
      c.x - cam.position.x,
      c.y - cam.position.y,
      c.z - cam.position.z,
    );
    const dl = v.length();
    if (dl > (SN.z === 2 ? 320 : 140)) return;
    v.normalize();
    const a = Math.acos(clamp(v.dot(f), -1, 1)),
      tol = SN.z === 2 ? Math.max(0.012, Math.atan(1 / dl)) : 0.07;
    if (a < tol && a < ba && !wallBlock(me3.x, me3.z, c.x, c.z, true)) {
      ba = a;
      best = c;
    }
  });
  if (!best) toast("💨 Missed! " + SN.ammo + " left");
  else if (best.dog) {
    DOG.dead = 1;
    DOG.st = "eat";
    DOG.bw = 1e9;
    burst(best.x, best.y, best.z, 0xb01018, 22, 3, 2.5);
    toast("🎯 Dog down! " + SN.ammo + " left");
  } else {
    killGuard(best.o, true);
  }
  if (SN.ammo <= 0) {
    SN.sc = false;
    window.__scope = 0;
  }
}
{
  const css =
      "position:fixed;top:auto;right:14px;z-index:6;font-size:22px;padding:10px 14px;display:none;",
    sb = document.createElement("button"),
    fb = document.createElement("button"),
    zb = document.createElement("button"),
    ov = document.createElement("div"),
    ch = document.createElement("div");
  sb.className = fb.className = zb.className = "pill";
  zb.style.cssText = css + "bottom:280px";
  zb.textContent = "🔍";
  ov.style.cssText =
    "position:fixed;inset:0;z-index:5;pointer-events:none;display:none;background:radial-gradient(circle at 50% 50%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 30vmin,rgba(0,0,0,.93) 31vmin)";
  ov.innerHTML =
    '<div style="position:absolute;left:calc(50% - 31vmin);right:calc(50% - 31vmin);top:50%;height:2px;background:rgba(0,0,0,.8)"></div><div style="position:absolute;top:calc(50% - 31vmin);bottom:calc(50% - 31vmin);left:50%;width:2px;background:rgba(0,0,0,.8)"></div><div style="position:absolute;left:50%;top:50%;width:7px;height:7px;margin:-3.5px;border-radius:50%;background:#e33"></div><div style="position:absolute;left:50%;bottom:calc(50% - 40vmin);transform:translateX(-50%);font:800 13px system-ui;color:#fff;letter-spacing:.12em;text-shadow:0 1px 3px #000;white-space:nowrap">×12 · Z / scroll = back to ×3</div>';
  sb.style.cssText = css + "bottom:150px";
  fb.style.cssText = css + "bottom:215px";
  fb.textContent = "💥";
  ch.style.cssText =
    "position:fixed;left:50%;top:50%;width:64px;height:64px;margin:-32px 0 0 -32px;border:2px solid rgba(255,255,255,.75);border-radius:50%;z-index:6;pointer-events:none;display:none;background:linear-gradient(#fff,#fff) center/2px 100% no-repeat,linear-gradient(#fff,#fff) center/100% 2px no-repeat";
  document.body.append(sb, fb, zb, ov, ch);
  const tg = () => {
    if (!SN.have || SN.ammo <= 0 || !PRIS.onI || inCave) return;
    SN.sc = !SN.sc;
    window.__scope = SN.sc ? SN.z : 0;
    if (SN.sc && !TPS) {
      TPS = true;
      X6.tps = 1;
    }
  };
  window.snToggle = tg;
  const zm = () => {
    if (!SN.sc) return;
    SN.z = SN.z === 2 ? 1 : 2;
    window.__scope = SN.z;
    tone(900, 0.05, "square", 0.05);
  };
  window.snZoom = zm;
  sb.onclick = tg;
  fb.onclick = snFire;
  zb.onclick = zm;
  cv.addEventListener(
    "wheel",
    (e) => {
      if (SN.sc && PRIS.onI) {
        e.stopImmediatePropagation();
        e.preventDefault();
        if (e.deltaY < 0 !== (SN.z === 2)) zm();
      }
    },
    { passive: false, capture: true },
  );
  addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.key === "q" || e.key === "Q") tg();
    if (
      (e.key === "z" || e.key === "Z" || e.key === "x" || e.key === "X") &&
      SN.sc
    )
      zm();
    if ((e.key === "f" || e.key === "F") && SN.sc) snFire();
  });
  const ex10 = window.exTick;
  window.exTick = function (dt, t) {
    ex10(dt, t);
    if (!ready) return;
    SN.cd = Math.max(0, SN.cd - dt);
    const on = SN.have && PRIS.onI && !inCave && !sailing;
    sb.style.display = "none";
    fb.style.display = on && SN.sc ? "block" : "none";
    zb.style.display = on && SN.sc ? "block" : "none";
    zb.textContent = SN.z === 2 ? "🔍×12" : "🔍×3";
    ch.style.display = on && SN.sc && SN.z === 1 ? "block" : "none";
    ov.style.display = on && SN.sc && SN.z === 2 ? "block" : "none";
    if (!on && SN.sc) {
      SN.sc = false;
      window.__scope = 0;
    }
    for (let i = HEADS.length; i--;) {
      const x = HEADS[i],
        m = x.m;
      x.t += dt;
      x.vy -= 11 * dt;
      m.position.x += x.vx * dt;
      m.position.y += x.vy * dt;
      m.position.z += x.vz * dt;
      m.rotation.x += dt * 6;
      m.rotation.z += dt * 4;
      const gy = Math.max(hm(m.position.x, m.position.z), SEA) + 0.2;
      if (m.position.y < gy) {
        m.position.y = gy;
        x.vy *= -0.3;
        x.vx *= 0.55;
        x.vz *= 0.55;
        if (Math.abs(x.vy) < 0.6) x.vy = 0;
      }
    }
    POOLS.forEach((x) => {
      x.t += dt;
      x.m.scale.setScalar(Math.min(2.6, 1 + x.t * 1.2));
    });
    if (DOG.dead) {
      DOG.g.rotation.z = 1.4;
      DOG.g.position.y = Math.max(hm(DOG.x, DOG.z), SEA) + 0.12;
    }
  };
}
// ---------- v5.5: the sniper outpost tower (replaces the old cliff nest)
const TW = {
  up: false,
  lx: -12,
  lz: -31,
  H: 9.4,
  hw: 2.6,
  col: [],
  roof: null,
  y: 0,
  flag: null,
  glow: null,
  upIt: null,
  dnIt: null,
};
function railsOn() {
  if (TW.col.length) return;
  const hw = TW.hw - 0.3,
    n = Math.round((hw * 2) / 0.55);
  for (let i = 0; i <= n; i++) {
    const u = -hw + i * ((2 * hw) / n);
    [
      [u, -hw],
      [u, hw],
      [-hw, u],
      [hw, u],
    ].forEach(([a, b]) => {
      if (a === hw && Math.abs(b) < 0.95) return;
      TW.col.push(colAdd(TW.lx + a, TW.lz + b, 0.36, false));
    });
  }
}
function railsOff() {
  TW.col.forEach((c) => {
    const i = COLL.indexOf(c);
    if (i >= 0) COLL.splice(i, 1);
  });
  TW.col.length = 0;
}
{
  const LY = (lx, lz) => {
      const w = P2L(lx, lz);
      return (hm(w[0], w[1]) - PLY) / PS;
    },
    wood = M(0x5a4228, { roughness: 1 }),
    dark = M(0x3a2a18, { roughness: 1 }),
    plank = M(0x7a5a38, { roughness: 1 }),
    sand = M(0x8a7a52, { roughness: 1 }),
    steel = M(0x23262b, { metalness: 0.6, roughness: 0.5 }),
    A = (g, geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.userData.nocol = 1;
      g.add(m);
      return m;
    },
    V3 = THREE.Vector3,
    beam = (g, a, b, r, mat) => {
      const d = new V3().subVectors(b, a),
        L = d.length(),
        m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 6), mat);
      m.position.copy(a).add(b).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(new V3(0, 1, 0), d.normalize());
      m.castShadow = true;
      m.userData.nocol = 1;
      g.add(m);
      return m;
    };
  const H = TW.hw > 0 ? TW.H : 9,
    hw = TW.hw,
    gw = P2L(TW.lx, TW.lz);
  TW.y = hm(gw[0], gw[1]) + (H + 0.14) * PS;
  const tg = new THREE.Group();
  tg.position.set(TW.lx, LY(TW.lx, TW.lz), TW.lz);
  PG.add(tg);
  // legs + cross bracing
  const C = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ],
    B0 = 2.75,
    T0 = 2.25,
    Y0 = -1.3,
    lp = (i, y) => {
      const s = (y - Y0) / (H - Y0),
        r = B0 + (T0 - B0) * s;
      return new V3(C[i][0] * r, y, C[i][1] * r);
    };
  for (let i = 0; i < 4; i++) {
    beam(tg, lp(i, Y0), lp(i, H), 0.21, wood);
    const w = P2L(TW.lx + C[i][0] * 2.7, TW.lz + C[i][1] * 2.7);
    colAdd(TW.lx + C[i][0] * 2.7, TW.lz + C[i][1] * 2.7, 0.5, false).keep = 1;
  }
  const LV = [0.3, 3.4, 6.4, H - 0.15];
  for (let k = 0; k < 3; k++)
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4;
      beam(tg, lp(i, LV[k]), lp(j, LV[k + 1]), 0.07, dark);
      beam(tg, lp(j, LV[k]), lp(i, LV[k + 1]), 0.07, dark);
      beam(tg, lp(i, LV[k + 1]), lp(j, LV[k + 1]), 0.09, wood);
    }
  // deck
  A(
    tg,
    new THREE.BoxGeometry(hw * 2 + 0.5, 0.28, hw * 2 + 0.5),
    plank,
    0,
    H,
    0,
  );
  A(
    tg,
    new THREE.BoxGeometry(hw * 2 + 0.7, 0.16, hw * 2 + 0.7),
    dark,
    0,
    H - 0.2,
    0,
  );
  // sandbag parapet: two courses on three sides, one low course on the firing side (north, toward the prison)
  const bag = (x, y, z, ry) => {
    const m = A(tg, new THREE.BoxGeometry(0.95, 0.4, 0.5), sand, x, y, z);
    m.rotation.y = ry + Math.sin(x * 9 + z * 7) * 0.05;
  };
  for (let k = 0; k < 2; k++)
    for (let u = -hw + 0.45 + (k ? 0.45 : 0); u <= hw - 0.4; u += 0.95) {
      const y = H + 0.14 + 0.2 + k * 0.4;
      bag(u, y, -hw + 0.2, 0);
      if (Math.abs(u) > 1.1 || true) {
      }
    }
  for (let k = 0; k < 2; k++)
    for (let u = -hw + 0.45 + (k ? 0.45 : 0); u <= hw - 0.4; u += 0.95) {
      const y = H + 0.14 + 0.2 + k * 0.4;
      bag(-hw + 0.2, y, u, Math.PI / 2);
      if (Math.abs(u) > 1.0) bag(hw - 0.2, y, u, Math.PI / 2);
    }
  for (let u = -hw + 0.45; u <= hw - 0.4; u += 0.95)
    bag(u, H + 0.14 + 0.2, hw - 0.2, 0);
  // roof on four posts (hides itself when you are up there so it never blocks the view)
  [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ].forEach(([a, b]) =>
    A(
      tg,
      new THREE.BoxGeometry(0.2, 3.3, 0.2),
      wood,
      a * (hw - 0.15),
      H + 0.14 + 1.65,
      b * (hw - 0.15),
    ),
  );
  const roof = new THREE.Group();
  roof.position.y = H + 3.5;
  tg.add(roof);
  A(
    roof,
    new THREE.BoxGeometry(hw * 2 + 1.2, 0.22, hw * 2 + 1.2),
    M(0x3e4a30, { roughness: 1 }),
    0,
    0,
    0,
  );
  const cone = A(
    roof,
    new THREE.ConeGeometry(hw * 1.95, 1.3, 4),
    M(0x2e3a26, { roughness: 1 }),
    0,
    0.75,
    0,
  );
  cone.rotation.y = Math.PI / 4;
  TW.roof = roof;
  const bl = A(
    tg,
    G.crown,
    new THREE.MeshBasicMaterial({ color: 0xff2a2a }),
    0,
    H + 5.3,
    0,
  );
  bl.scale.setScalar(0.16);
  (window.BLINK = window.BLINK || []).push(bl);
  A(tg, new THREE.CylinderGeometry(0.05, 0.05, 1.4, 5), steel, 0, H + 4.7, 0);
  // a French flag on a pole at the corner of the roof
  {
    const pl = A(
        tg,
        new THREE.CylinderGeometry(0.05, 0.06, 3.4, 6),
        steel,
        -hw + 0.2,
        H + 5.1,
        hw - 0.2,
      ),
      fm = new THREE.Mesh(
        new THREE.PlaneGeometry(2.6, 1.7),
        new THREE.MeshBasicMaterial({
          map: stripeTex(["#2a3f8a", "#ececec", "#c8323c"], true),
          side: THREE.DoubleSide,
          fog: false,
        }),
      );
    fm.position.set(-hw + 1.5, H + 5.9, hw - 0.2);
    fm.userData.nocol = 1;
    tg.add(fm);
    TW.flag = fm;
  }
  // table, rifle, ammo box, lantern
  const tb = new THREE.Group();
  A(tb, new THREE.BoxGeometry(1.8, 0.12, 0.9), wood, 0, 0.85, 0);
  [
    [-0.8, -0.35],
    [0.8, -0.35],
    [-0.8, 0.35],
    [0.8, 0.35],
  ].forEach(([x, z]) =>
    A(tb, new THREE.BoxGeometry(0.1, 0.85, 0.1), wood, x, 0.42, z),
  );
  tb.position.set(-1.3, H + 0.14, 1.2);
  tg.add(tb);
  A(
    tg,
    new THREE.BoxGeometry(0.7, 0.4, 0.5),
    M(0x4a5a3a, { roughness: 0.9 }),
    -1.9,
    H + 0.14 + 0.2,
    -0.6,
  );
  const lam = A(
    tg,
    new THREE.BoxGeometry(0.18, 0.28, 0.18),
    new THREE.MeshBasicMaterial({ color: 0xffd890 }),
    hw - 0.5,
    H + 3.0,
    -hw + 0.5,
  );
  const lh = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xffc060,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      opacity: 0.6,
    }),
  );
  lh.scale.set(3, 3, 1);
  lh.position.copy(lam.position);
  tg.add(lh);
  snRifle = new THREE.Group();
  A(snRifle, new THREE.BoxGeometry(0.14, 0.16, 1), steel, 0, 0, 0);
  const br = A(
    snRifle,
    new THREE.CylinderGeometry(0.04, 0.04, 1.7, 8),
    steel,
    0,
    0.02,
    1.2,
  );
  br.rotation.x = Math.PI / 2;
  const sc = A(
    snRifle,
    new THREE.CylinderGeometry(0.07, 0.07, 0.5, 10),
    steel,
    0,
    0.17,
    0.1,
  );
  sc.rotation.x = Math.PI / 2;
  A(snRifle, new THREE.BoxGeometry(0.12, 0.2, 0.5), wood, 0, -0.05, -0.7);
  snRifle.position.set(-1.3, H + 0.14 + 0.98, 1.2);
  snRifle.rotation.y = 1.2;
  tg.add(snRifle);
  const gl = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xffd060,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  gl.scale.set(2.6, 2.6, 1);
  gl.position.set(-1.3, H + 0.14 + 1.1, 1.2);
  tg.add(gl);
  TW.glow = gl;
  // ladder up the east face
  {
    const top = H + 0.24,
      dx = 1.5,
      L = Math.hypot(top, dx),
      lad = new THREE.Group();
    [-0.45, 0.45].forEach((z) =>
      A(lad, new THREE.BoxGeometry(0.11, L, 0.11), wood, 0, 0, z),
    );
    for (let s = -L / 2 + 0.3; s < L / 2; s += 0.5)
      A(lad, new THREE.BoxGeometry(0.07, 0.07, 0.9), wood, 0, s, 0);
    lad.rotation.z = Math.atan2(dx, top);
    lad.position.set(hw + 1.4 - dx / 2, top / 2, 0);
    tg.add(lad);
  }
  {
    const sg = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: signTex("🎯 SNIPER TOWER"), fog: false }),
    );
    sg.scale.set(2.8, 1.05, 1);
    sg.position.set(hw + 1.7, 3.4, 1.9);
    tg.add(sg);
  }
  // sandbags, crates and a barrel round the foot
  {
    const c = mkCrate();
    c.position.set(TW.lx + 4.2, LY(TW.lx + 4.2, TW.lz + 2.8), TW.lz + 2.8);
    c.rotation.y = 0.4;
    PG.add(c);
    const f = mkBarrel(0x5a6a8a);
    f.position.set(TW.lx - 4, LY(TW.lx - 4, TW.lz + 2.5), TW.lz + 2.5);
    PG.add(f);
    colAdd(TW.lx - 4, TW.lz + 2.5, 0.5, false);
    cov(TW.lx, TW.lz, 5);
  }
  // interactions
  const bx = TW.lx + hw + 1.4,
    tpx = TW.lx + hw - 0.9,
    tpw = P2L(tpx, TW.lz),
    climbUp = () => {
      if (TW.up || RT.on) return;
      startRoute([P3(bx, TW.lz), [tpw[0], TW.y, tpw[1]]], [4.2], () => {
        TW.up = true;
        railsOn();
        toast(
          "🎯 You made it! The whole prison is below you. The rifle is on the table.",
        );
      });
    },
    climbDn = () => {
      if (!TW.up || RT.on) return;
      TW.up = false;
      railsOff();
      startRoute([[tpw[0], TW.y, tpw[1]], P3(bx, TW.lz)], [3.4], null);
    };
  TW.upIt = routeItem(
    "snUp",
    bx + 0.4,
    TW.lz,
    "🪜 Climb the sniper tower",
    climbUp,
  );
  const dw = P2L(TW.lx + hw - 1.5, TW.lz);
  TW.dnIt = addItem({
    id: "snDn",
    kind: "proute",
    x: dw[0],
    z: dw[1],
    r: 0,
    reach: 2.4,
    root: place(gH(1.5), dw[0], dw[1], TW.y + 0.8),
    hint: "",
    run: climbDn,
  });
  const rw = P2L(TW.lx - 1.3, TW.lz + 1.2);
  snIt = addItem({
    id: "snp",
    kind: "psn",
    x: rw[0],
    z: rw[1],
    r: 0,
    reach: 2.8,
    root: place(gH(1.5), rw[0], rw[1], TW.y + 1),
    hint: "",
  });
  LH.traverse((o) => {
    if (o.material) {
      o.material = o.material.clone();
      o.material.fog = false;
    }
  });
}
// stand on the tower deck
const altY0 = altY;
altY = function (x, z) {
  if (TW.up) {
    const l = LOCL(x, z);
    if (
      Math.abs(l[0] - TW.lx) < TW.hw + 0.1 &&
      Math.abs(l[1] - TW.lz) < TW.hw + 0.1
    )
      return TW.y;
  }
  return altY0(x, z);
};
// ---------- v5.5: smarter cops (radio, bodies, search patterns, hearing, obstacle steering, dog chase)
const ALR = { t: 0, bt: 0 };
function ping(o, e, ms) {
  const s = emoteSprite(e);
  s.position.y = 2.9;
  o.g.add(s);
  setTimeout(() => o.g.remove(s), ms || 1000);
}
function callCops(x, z, rad, from, why) {
  let n = 0;
  GD.forEach((o) => {
    if (o === from || o.st === "down" || o.st === "eat" || o.dead) return;
    if (Math.hypot(o.x - x, o.z - z) > rad) return;
    if (o.st === "lure") return;
    o.ls = [x, z];
    if (o.st !== "invest") {
      o.st = "invest";
      o.tm = 8;
      o.sq = null;
      ping(o, "❗");
      n++;
    } else o.tm = Math.max(o.tm, 6);
  });
  if (n && why && ALR.t <= 0) toast("🚨 " + why + "!");
  if (n) ALR.t = Math.max(ALR.t, 14);
  return n;
}
function mkSearch(o) {
  const ls = o.ls || [o.x, o.z],
    d = (c) => Math.hypot(c.x - ls[0], c.z - ls[1]),
    pts = COVER.filter((c) => d(c) < 16)
      .sort((a, b) => d(a) - d(b))
      .slice(0, 1)
      .map((c) => [
        c.x + (Math.random() - 0.5) * 2,
        c.z + (Math.random() - 0.5) * 2,
      ]),
    a = Math.random() * 6.28,
    r = 4 + Math.random() * 4;
  pts.push([ls[0] + Math.cos(a) * r, ls[1] + Math.sin(a) * r]);
  return pts.filter(
    (p) =>
      hm(p[0], p[1]) > 0.5 &&
      !BLD.some((b) => inB(b, LOCL(p[0], p[1]))) &&
      !wallBlock(ls[0], ls[1], p[0], p[1]),
  );
}
function gStep(o, tx, tz, spd, dt) {
  const base = Math.atan2(tx - o.x, tz - o.z),
    st = spd * dt;
  o.sk = (o.sk || 0) - dt;
  const tr =
    o.sk > 0
      ? [o.sa, 0, -o.sa, o.sa * 2]
      : [0, 0.6, -0.6, 1.2, -1.2, 1.9, -1.9];
  for (const a of tr) {
    const ax = base + a,
      r = pushOut(o.x + Math.sin(ax) * st, o.z + Math.cos(ax) * st, 0.4);
    if (Math.hypot(r[0] - o.x, r[1] - o.z) > st * 0.5 && hm(r[0], r[1]) > 0.3) {
      o.x = r[0];
      o.z = r[1];
      o.ry += adif(ax, o.ry) * Math.min(1, dt * 6);
      if (a !== 0 && o.sk <= 0) {
        o.sa = a;
        o.sk = 0.9;
      }
      return true;
    }
  }
  o.sk = 0;
  return false;
}
function guardsTick(dt, t, onI, moving, aMul) {
  let gain = 0;
  ALR.t = Math.max(0, ALR.t - dt);
  ALR.bt -= dt;
  const al = ALR.t > 0 ? 1.08 : 1;
  if (onI && ALR.bt <= 0) {
    ALR.bt = 0.3;
    GD.forEach((o) => {
      if (o.st === "down" || o.st === "eat" || o.dead) return;
      GD.forEach((b) => {
        if (b.st !== "down" || b.found) return;
        const dx = b.x - o.x,
          dz = b.z - o.z;
        if (
          Math.hypot(dx, dz) > 13 ||
          Math.abs(adif(Math.atan2(dx, dz), o.ry)) > 1.1
        )
          return;
        if (wallBlock(o.x, o.z, b.x, b.z) || !losClear(o.x, o.z, b.x, b.z))
          return;
        b.found = 1;
        if (!b.dead) b.dt = Math.min(b.dt, 0.8);
        o.st = "invest";
        o.ls = [b.x, b.z];
        o.tm = 7;
        o.sq = null;
        ping(o, "❗");
        tone(520, 0.3, "square", 0.09);
        toast(
          b.dead
            ? "🚨 A cop found a body! The whole island is on alert."
            : "🚨 A cop found his knocked-out buddy!",
        );
        callCops(b.x, b.z, 26, o, null);
        ALR.t = Math.max(ALR.t, b.dead ? 26 : 16);
      });
    });
  }
  GD.forEach((o) => {
    const u = o.g.userData;
    let tx = null,
      tz = null,
      spd = o.sp * 1.35 * al,
      anim = true;
    if (o.st === "down") {
      o.dt -= dt;
      o.g.rotation.order = "YXZ";
      o.g.position.set(o.x, Math.max(hm(o.x, o.z), SEA) + 0.3, o.z);
      o.g.rotation.set(-1.45, o.ry, 0);
      u.sec.visible = false;
      if (o.dt <= 0) {
        o.st = "patrol";
        o.tm = 0;
        o.found = 0;
        o.g.rotation.set(0, o.ry, 0);
      }
      return;
    }
    if (o.st === "eat") {
      o.bw -= dt;
      anim = false;
      if (o.bw <= 0) {
        o.st = "patrol";
        o.tm = 0;
        o.lure = null;
      }
    } else if (o.st === "lure" && o.lure) {
      tx = o.lure.x;
      tz = o.lure.z;
      spd = 1.8 * al;
      if (Math.hypot(o.x - tx, o.z - tz) < 0.9) {
        o.st = "eat";
        o.bw = 5;
        ping(o, "😋", 1200);
        tone(400, 0.2, "triangle", 0.08);
      }
    } else if (o.st === "invest") {
      tx = o.ls[0];
      tz = o.ls[1];
      spd = (1.5 + DET * 0.4) * aMul * al;
      o.tm -= dt;
      if (Math.hypot(o.x - tx, o.z - tz) < 1.2 || o.tm <= 0) {
        o.st = "look";
        o.tm = 2.2;
        o.sq = mkSearch(o);
      }
    } else if (o.st === "look") {
      anim = false;
      o.tm -= dt;
      o.ry += Math.sin(t * 2.2 + o.home[0]) * dt * 1.8;
      if (o.tm <= 0) {
        if (o.sq && o.sq.length) {
          o.st = "search";
          o.stm = 7;
        } else {
          o.st = "patrol";
          o.tm = 0;
        }
      }
    } else if (o.st === "search") {
      const q = o.sq && o.sq[0];
      if (!q) {
        o.st = "patrol";
        o.tm = 0;
      } else {
        tx = q[0];
        tz = q[1];
        spd = 1.5 * aMul * al;
        o.stm -= dt;
        if (Math.hypot(o.x - tx, o.z - tz) < 1 || o.stm <= 0) {
          o.sq.shift();
          o.st = "look";
          o.tm = 1.6;
        }
      }
    } else if (o.sweep) {
      if (Math.hypot(o.x - o.home[0], o.z - o.home[1]) > 0.8) {
        tx = o.home[0];
        tz = o.home[1];
        spd = 1.3 * al;
      } else {
        anim = false;
        o.ry = o.sweep.b + Math.sin(t * o.sweep.r) * o.sweep.a;
      }
    } else {
      const p = o.path[o.pi],
        w = P2L(p.lx, p.lz);
      if (Math.hypot(o.x - w[0], o.z - w[1]) < 0.45) {
        o.tm += dt;
        anim = false;
        if (p.dw >= 2) o.ry += Math.sin(t * 1.5 + o.home[1]) * dt * 0.9;
        if (o.tm >= p.dw) {
          o.tm = 0;
          if (o.rand && o.path.length > 1) {
            let k;
            do {
              k = Math.floor(Math.random() * o.path.length);
            } while (k === o.pi);
            o.pi = k;
          } else o.pi = (o.pi + 1) % o.path.length;
        }
      } else {
        tx = w[0];
        tz = w[1];
      }
    }
    if (tx !== null) gStep(o, tx, tz, spd, dt);
    o.g.position.set(o.x, Math.max(hm(o.x, o.z), SEA), o.z);
    o.g.rotation.y = o.ry;
    const sw = anim && tx !== null ? Math.sin(t * spd * 5) : 0;
    u.lL.rotation.x = sw * 0.7;
    u.lR.rotation.x = -sw * 0.7;
    u.aL.rotation.x = -sw * 0.5;
    u.aR.rotation.x = sw * 0.5 + (o.st === "invest" ? -0.3 : 0);
    u.sec.visible = onI && o.st !== "eat";
    u.sec.material.color.setHex(
      PRIS.alarm
        ? 0xff4a4a
        : o.st === "invest" || o.st === "search"
          ? 0xffa040
          : ALR.t > 0
            ? 0xffc060
            : 0xffe070,
    );
    if (onI) {
      const g = o.st === "eat" ? 0 : seen(o);
      if (g > 0) {
        gain = Math.max(gain, g * (moving ? 1 : 0.75) * aMul);
        if (o.st !== "invest" && o.st !== "lure") {
          o.st = "invest";
          o.tm = 4.5;
          o.sq = null;
          ping(o, "❓");
          tone(700, 0.25, "square", 0.1);
        }
        o.ls = [me3.x, me3.z];
        o.ry +=
          adif(Math.atan2(me3.x - o.x, me3.z - o.z), o.ry) *
          Math.min(1, dt * 4);
        if (DET > 0.5) {
          o.cl = (o.cl || 0) - dt;
          if (o.cl <= 0) {
            o.cl = 4.5;
            callCops(
              me3.x,
              me3.z,
              16,
              o,
              DET > 0.8 ? "A cop radioed your position" : null,
            );
          }
        }
      } else if ((o.st === "patrol" || o.st === "look") && moving && !TW.up) {
        const dd = Math.hypot(me3.x - o.x, me3.z - o.z);
        if (dd < 4.5 && !wallBlock(o.x, o.z, me3.x, me3.z)) {
          o.st = "invest";
          o.ls = [me3.x, me3.z];
          o.tm = 5;
          o.sq = null;
          ping(o, "❓");
          tone(600, 0.15, "square", 0.07);
        }
      }
    }
  });
  return gain;
}
// more cops
addGuard(
  [
    [-18, -22, 1.5],
    [18, -22, 1.5],
  ],
  { sp: 0.9, rng: 8 },
);
addGuard(
  [
    [18, 22, 1.5],
    [-18, 22, 1.5],
  ],
  { sp: 0.9, rng: 8 },
);
addGuard(
  [
    [-11, 9.5, 2],
    [2, 9.5, 2],
  ],
  { sp: 0.95, rng: 7.5 },
);
addGuard(
  [
    [1, -3],
    [12, -1],
    [13, 9],
    [1, 10.5],
    [3, -10.5],
    [13.5, -9],
  ],
  { sp: 1.05, rng: 9, rand: true },
);
addGuard(
  [
    [26, 14],
    [26, 26],
    [-2, 34],
    [-26, 26],
    [-34, 0],
    [-26, -26],
    [-2, -34],
    [26, -26],
    [26, -14],
  ],
  { sp: 1.05, rng: 10 },
);
addGuard(
  [
    [8, -26, 2.5],
    [-6, -26, 2.5],
  ],
  { sp: 0.9, rng: 8 },
);
addGuard(
  [
    [30, -1.5, 5],
    [26.5, 2, 4],
    [25, -6, 3],
  ],
  { sp: 0.9, rng: 8, rand: true },
);
addGuard(
  [
    [shoreX - 9, 7, 3],
    [shoreX - 9, -7, 3],
  ],
  { sp: 0.9, rng: 9 },
);
// hotbar on the island: lure baguettes + the sniper rifle, nothing else
{
  const hud0 = hud,
    pick0 = pick;
  hud = function () {
    hud0();
    if (!PRIS.onI || inCave) return;
    const i = inv(),
      h = $("#hot"),
      bag = i.baguette || 0;
    let s = `<div class="slot ${bag ? "" : "dim"}" data-i="bag" title="Throw a baguette (B)">🥖<b>${bag}</b></div>`;
    if (SN.have)
      s += `<div class="slot ${SN.sc ? "on" : ""} ${SN.ammo ? "" : "dim"}" data-i="sn" title="Scope (Q)">🎯<b>${SN.ammo}</b></div>`;
    h.innerHTML = s;
    h.querySelectorAll("[data-i]").forEach(
      (e) =>
        (e.onclick = (ev) => {
          ev.stopPropagation();
          if (e.dataset.i === "bag") throwBag();
          else if (window.snToggle) window.snToggle();
        }),
    );
  };
  pick = function (n) {
    if (PRIS.onI && !inCave) {
      if (n === 0) throwBag();
      else if (n === 1 && SN.have && window.snToggle) window.snToggle();
      return;
    }
    pick0(n);
  };
}
let _hs = "";
function towerTick(dt, t) {
  if (!ready) return;
  const on = PRIS.onI && !inCave;
  if (TW.upIt) {
    TW.upIt.hint =
      TW.up || RT.on ? "" : "🪜 Climb the sniper tower (the rifle is on top)";
    TW.dnIt.hint = TW.up && !RT.on ? "🪜 Climb down" : "";
    snIt.hint = TW.up && !SN.have ? "🎯 Take the sniper rifle (5 rounds)" : "";
  }
  if (TW.roof) TW.roof.visible = !TW.up;
  if (TW.glow) TW.glow.visible = !SN.have;
  if (TW.flag) TW.flag.rotation.y = Math.sin(t * 1.3) * 0.35;
  if (TW.up) {
    const l = LOCL(me3.x, me3.z);
    if (
      Math.abs(l[0] - TW.lx) > TW.hw + 0.3 ||
      Math.abs(l[1] - TW.lz) > TW.hw + 0.3
    ) {
      TW.up = false;
      railsOff();
      toast("You dropped off the tower!");
    }
  }
  if (on) {
    if (slot !== 0) {
      slot = 0;
      me3.held = "";
    }
  }
  const sg =
    on +
    "|" +
    (inv().baguette || 0) +
    "|" +
    SN.have +
    "|" +
    SN.ammo +
    "|" +
    SN.sc +
    "|" +
    (window.__scope || 0);
  if (sg !== _hs) {
    _hs = sg;
    hud();
  }
  if (on && !sailing) {
    let nf = 0,
      ff = 0;
    if (TW.up) {
      nf = 60;
      ff = 190;
    }
    if (SN.sc) {
      nf = 90;
      ff = SN.z === 2 ? 430 : 280;
    }
    if (ff) {
      scene.fog.near = Math.max(scene.fog.near, nf);
      scene.fog.far = Math.max(scene.fog.far, ff);
    }
  }
}

// ---------- tick
let tdE = null;
function v36Tick(dt, t) {
  cave36Tick(dt, t);
  if (RT.on) routeTick(dt);
  if (window.CAMPF) {
    CAMPF.fl.scale.set(1, 1 + Math.sin(t * 14) * 0.2, 1);
    CAMPF.fh.material.opacity = 0.7 + Math.sin(t * 9) * 0.2;
  }
  if (window.GENL) GENL.material.color.setHex(PRIS.off ? 0x333333 : 0xffe070);
  if (window.GENIT && !PRIS.off)
    GENIT.hint = "⚡ Generator shed: cut the power (searchlights die)";
  if (
    !inCave &&
    PRIS.onI &&
    !CLIMB.on &&
    !RT.on &&
    PRIS.busted <= 0 &&
    !modalOpen
  ) {
    let td = null,
      tb = 9;
    GD.forEach((o) => {
      if (o.st === "down") return;
      const dx = me3.x - o.x,
        dz = me3.z - o.z,
        d = Math.hypot(dx, dz);
      if (d > 2.5 || d >= tb) return;
      if (Math.abs(adif(Math.atan2(dx, dz), o.ry)) > 2.0) {
        td = o;
        tb = d;
      }
    });
    if (td) {
      useIt = { kind: "takedown", guard: td, x: td.x, z: td.z };
      useE.style.display = "block";
      useE.textContent =
        (matchMedia("(pointer:fine)").matches ? "[E] " : "") +
        "🤫 Silent takedown (he can't see you)";
    }
  }
}
addEventListener(
  "keydown",
  (e) => {
    if (inCave || modalOpen || (e.target && e.target.tagName === "INPUT"))
      return;
    if (e.key.toLowerCase() === "e" && useIt && useIt.kind === "takedown") {
      e.preventDefault();
      exInt36(useIt);
    }
  },
  true,
);
const exTick8 = window.exTick;
window.exTick = function (dt, t) {
  exTick8(dt, t);
  if (!ready) return;
  v36Tick(dt, t);
};

// ===================================================================
// v3.7 A: slow weeks-long recovery, always-visible smog, harder trash, hidden waterfall bed, haunted swamp forest
// ===================================================================
var AIRT = 0,
  LANDT = 0,
  PLUGHIT = 0;
if (!X6.rec || typeof X6.rec !== "object")
  X6.rec = { a: 0, l: 0, t: Date.now() };
if (!X6.dump) X6.dump = 1;
// ---------- recovery takes weeks: purifiers and clean-up set a TARGET, the island slowly heals toward it (even while you are away)
let recInit = false,
  recSave = 0;
function stepRec(d) {
  const n = Math.max(1, Math.ceil(d / 0.25)),
    h = d / n;
  for (let i = 0; i < n; i++) {
    if (AIRV < AIRT) {
      AIRV = Math.min(
        AIRT,
        AIRV + AIRT * (AIRV / AIRT < 0.5 ? 0.05 : 0.0125) * h,
      );
    } else AIRV = Math.max(AIRT, AIRV - 0.015 * h);
    if (LANDV < LANDT) {
      LANDV = Math.min(
        LANDT,
        LANDV + LANDT * (LANDV / LANDT < 0.3 ? 0.03 : 0.00875) * h,
      );
    } else LANDV = Math.max(LANDT, LANDV - 0.02 * h);
  }
}
function airRate() {
  return AIRV < AIRT ? AIRT * (AIRV / AIRT < 0.5 ? 0.05 : 0.0125) : 0;
}
function landRate() {
  return LANDV < LANDT ? LANDT * (LANDV / LANDT < 0.3 ? 0.03 : 0.00875) : 0;
}
function healthTick(dt) {
  dt = dt || 0;
  const eff = Math.min(
    (blockIds.purifier || []).length,
    (blockIds.generator || []).length * 2,
  );
  AIRT = clamp((1 - Math.exp(-eff * 0.5)) / (1 - Math.exp(-2)), 0, 1);
  LANDT = TR0 ? clamp(1 - trashLeft / TR0, 0, 1) : 0;
  if (!recInit) {
    recInit = true;
    AIRV = X6.rec.a || 0;
    LANDV = X6.rec.l || 0;
    stepRec(
      clamp((Date.now() - (X6.rec.t || Date.now())) / (DAYLEN * 1e3), 0, 120),
    );
  }
  stepRec(dt / DAYLEN);
  recSave += dt;
  if (recSave > 5) {
    recSave = 0;
    X6.rec.a = AIRV;
    X6.rec.l = LANDV;
    X6.rec.t = Date.now();
    sv6();
  }
  const pr = RC.find((r) => r[0] === "Purifier");
  if (pr) {
    const all = EXF.pp_filter && EXF.pp_fan && EXF.pp_circuit;
    if (all) {
      pr[2] = { brick: 3, glass: 2 };
      pr[1] =
        "3🧱 + 2🪟 → 1 purifier. You own the blueprint, so build as many as you like!";
    } else {
      pr[2] = { brick: 3, glass: 2, filter: 1, fan: 1, circuit: 1 };
      pr[1] =
        "3🧱 + 2🪟 + the 3 parts found on the island (after that: unlimited)";
    }
  }
}
function exPow(kind) {
  const s = PWR;
  powerTick(0, 0);
  pwT = 0;
  const eff = Math.min(
      (blockIds.purifier || []).length,
      (blockIds.generator || []).length * 2,
    ),
    h = Math.round((0.5 * AIRV + 0.5 * LANDV) * 100),
    ra = Math.round(airRate() * 1000) / 10,
    rl = Math.round(landRate() * 1000) / 10;
  showModal(`${X}<h2>${kind === "gen" ? "⚡ Generator" : "🌀 Air purifier"}</h2><p>${kind === "gen" ? "One generator powers <b>2 purifiers</b> anywhere on the island. No wires: just place them." : "A purifier cleans the air only when a generator powers it (1 generator = 2 purifiers)."}</p>
 <div style="border:2px solid var(--line);border-radius:14px;padding:10px 12px;margin:8px 0;line-height:1.7">⚡ Generators <b>${s.gen}</b> · 🌀 Purifiers <b>${s.pur}</b> · ✅ Powered <b>${eff}</b><br>💨 Air: <b>${Math.round(AIRV * 100)}%</b> clean, heading to <b>${Math.round(AIRT * 100)}%</b> (about +${ra}% per game day)<br>🌱 Land: <b>${Math.round(LANDV * 100)}%</b> healed, heading to <b>${Math.round(LANDT * 100)}%</b> (about +${rl}% per game day)<br>🌿 Island health <b>${h}%</b> <span class="mute">= half air, half land</span></div>
 <p class="mute">Nature heals over <b>game days</b> (one day = 5 minutes): with full power the air is about 50% clean after 10 days and fully clean by day 50; with all the trash cleared the land is about 30% healed after 10 days and fully back by day 90. More purifiers raise the air target, clearing trash raises the land target, and the island keeps healing while you are away.</p>
 <p>${s.pur > s.on ? "⚠️ " + (s.pur - s.on) + " purifier(s) have no power: craft another ⚡ Generator." : s.pur === 0 ? "Next: find the 3 purifier parts, then craft purifiers (unlimited afterwards)!" : "Keep building and clearing!"}</p>`);
  $("#x").onclick = closeModal;
}
// ---------- the air is ALWAYS visibly dirty until it is pure: veil dome + ground haze + fog + screen tint, all driven by pollution
const hazeDome = new THREE.Mesh(
  new THREE.SphereGeometry(240, 20, 14),
  new THREE.MeshBasicMaterial({
    color: 0x8a9a4a,
    transparent: true,
    opacity: 0,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  }),
);
hazeDome.frustumCulled = false;
hazeDome.renderOrder = -1;
scene.add(hazeDome);
const lowHaze = [];
for (let i = 0; i < 34; i++) {
  const s = new THREE.Sprite(hazeM);
  s.scale.setScalar(11 + hs(i, 300, 1) * 10);
  s.userData = {
    ox: (hs(i, 301, 1) - 0.5) * 60,
    oy: 0.8 + hs(i, 302, 1) * 2.6,
    oz: (hs(i, 303, 1) - 0.5) * 60,
    sp: 0.15 + hs(i, 304, 1) * 0.3,
  };
  scene.add(s);
  lowHaze.push(s);
}
function smogTick(dt, t) {
  const p = pollution,
    s = p > 0.015 ? clamp(0.22 + 0.78 * p, 0, 1) : 0,
    day = 1 - NIGHTK * 0.72;
  hazeDome.visible = s > 0 && !inCave;
  hazeDome.position.copy(cam.position);
  hazeDome.material.color.setRGB(
    0.5 * day + 0.05,
    0.58 * day + 0.05,
    0.26 * day + 0.04,
  );
  hazeDome.material.opacity = s * 0.3;
  hazeM.opacity = s * 0.36;
  hazeM.color.setRGB(0.66 * day + 0.2, 0.72 * day + 0.2, 0.42 * day + 0.1);
  smogE.style.opacity = inCave ? 0 : clamp(s * 0.9, 0, 1);
  lowHaze.forEach((h) => {
    const u = h.userData;
    h.visible = s > 0 && !inCave;
    u.ox += dt * u.sp;
    h.position.set(
      me3.x + (((u.ox % 60) + 90) % 60) - 30,
      u.oy,
      me3.z + u.oz * 0.5 + Math.sin(t * 0.12 + u.oy * 3) * 6,
    );
  });
  if (!inCave) {
    scene.fog.near = Math.min(scene.fog.near, 38 - 30 * p);
    scene.fog.far = Math.min(scene.fog.far, 230 - 160 * p);
  }
}
// ---------- trash is harder: more hits per piece, and Baron Smogsworth's ship dumps new rubbish every day
for (const k in JD) {
  JD[k].h = Math.ceil(JD[k].h * 2) + (JD[k].h >= 2 ? 1 : 0);
}
items.forEach((it) => {
  if (it.kind === "trash" && it.junk) it.hp = JD[it.junk].h;
});
function dumpTick() {
  const d = dayNo();
  if (d <= X6.dump || modalOpen) return;
  X6.dump = d;
  if (trashLeft >= TR0 * 1.25) return;
  const n = 2 + Math.floor(Math.random() * 3);
  let made = 0;
  for (let i = 0; i < 60 && made < n; i++) {
    const a = Math.random() * 6.283,
      r = 8 + Math.random() * 34,
      x = Math.cos(a) * r,
      z = Math.sin(a) * r;
    if (
      gh(x, z) < 0.85 ||
      !free(x, z, 1.5) ||
      Math.hypot(x - HX, z - HZ) < 14 ||
      inHaunt(x, z)
    )
      continue;
    addJunk(["pile", "pile", "oil", "barrel", "tires"][made % 5], x, z);
    made++;
  }
  if (made) {
    toast(
      "🚢 Baron Smogsworth's ship dumped " +
        made +
        " new piles of rubbish overnight!",
    );
    tone(120, 0.5, "sawtooth", 0.12);
  }
}
// new interactions (called from exInt36): cursed chest, gallery pictures, heart chest
function exInt37(it) {
  switch (it.kind) {
    case "cursed":
      if (X6.curse === dayNo()) {
        toast("The chest is empty… for today. Come back tomorrow.");
        return true;
      }
      X6.curse = dayNo();
      sv6();
      award(250);
      addInv({ gem: 2 }, "💎 2 gems from the cursed chest");
      ghostScare();
      hfChest.ha.material.color.setHex(0xff6a6a);
      setTimeout(() => hfChest.ha.material.color.setHex(0x7dffb0), 3000);
      return true;
    case "htree":
      return chopHaunt(it);
    case "pic":
      toast(it.cap);
      tone(500 + Math.random() * 300, 0.1, "sine", 0.08);
      return true;
    case "sechest":
      if (SEC.chest) {
        toast("💋 The chest is empty. Naughty, naughty!");
        return true;
      }
      SEC.chest = true;
      RUN.cash += 1000;
      cashUp();
      burst(it.x, 1.2, it.z, 0xff6a9a, 30, 3, 3);
      jingle([523, 659, 784, 1047]);
      toast("💋 A kiss and a thank-you: +1000 points!");
      return true;
  }
  return false;
}

// ===================================================================
// v3.7 B: cave secret gallery (4 hits to open), catacomb exit, exit arch fix, ticks
// ===================================================================
const SEC = { x: CVX + 49, z: CVZ - 22, r: 5.6, chest: false },
  PLUG = {
    x: CVX + 45.1,
    z: CVZ - 15.1,
    ux: 0.587,
    uz: -0.81,
    hp: 4,
    open: false,
    g: null,
    tex: null,
    cv: null,
    last: 0,
  };
function drawPlug(stage) {
  const c = PLUG.cv || (PLUG.cv = document.createElement("canvas"));
  c.width = c.height = 256;
  const g = c.getContext("2d");
  g.fillStyle = "#5a5560";
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 500; i++) {
    const v = hs(i, 400, 1);
    g.fillStyle = `rgba(${v > 0.5 ? 160 : 30},${v > 0.5 ? 150 : 28},${v > 0.5 ? 150 : 34},.1)`;
    g.fillRect(hs(i, 401, 1) * 256, hs(i, 402, 1) * 256, 6 + v * 14, 4 + v * 9);
  }
  g.strokeStyle = "#1e1a22";
  g.lineWidth = 3;
  g.lineCap = "round";
  for (let i = 0; i < 4; i++) {
    g.beginPath();
    g.moveTo(92 + i * 16, 86);
    g.lineTo(92 + i * 16, 118);
  }
  g.moveTo(84, 106);
  g.lineTo(150, 96);
  g.stroke();
  g.fillStyle = "#7a2a46";
  g.beginPath();
  g.moveTo(190, 92);
  g.bezierCurveTo(176, 76, 160, 92, 190, 112);
  g.bezierCurveTo(220, 92, 204, 76, 190, 92);
  g.fill();
  g.strokeStyle = "#0e0c10";
  const cr = [
    [
      [128, 10],
      [120, 60],
      [136, 110],
      [118, 170],
      [128, 250],
    ],
    [
      [60, 30],
      [90, 80],
      [84, 130],
      [104, 200],
    ],
    [
      [210, 30],
      [176, 90],
      [190, 150],
      [160, 226],
    ],
    [
      [20, 140],
      [70, 150],
      [110, 140],
      [170, 160],
      [246, 150],
    ],
  ];
  for (let s = 0; s < stage; s++) {
    g.lineWidth = 2 + s * 1.6;
    cr[s % 4].forEach((p, i) => {
      if (i) g.lineTo(p[0], p[1]);
      else {
        g.beginPath();
        g.moveTo(p[0], p[1]);
      }
    });
    g.stroke();
  }
  if (PLUG.tex) PLUG.tex.needsUpdate = true;
}
function buildPlug() {
  if (PLUG.g) cRoot.remove(PLUG.g);
  drawPlug(0);
  if (!PLUG.tex) {
    PLUG.tex = new THREE.CanvasTexture(PLUG.cv);
  }
  const face = new THREE.MeshStandardMaterial({ map: PLUG.tex, roughness: 1 }),
    rock = M(0x4a464e, { roughness: 1 }),
    g = new THREE.Group(),
    b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.6, 3.7), [
      face,
      face,
      rock,
      rock,
      rock,
      rock,
    ]);
  b.position.y = 1.8;
  g.add(b);
  g.position.set(PLUG.x, 0.45, PLUG.z);
  g.rotation.y = -Math.atan2(PLUG.uz, PLUG.ux);
  cRoot.add(g);
  PLUG.g = g;
  PLUG.hp = 4;
  PLUG.open = false;
  PLUG.cp = PLUG.cp || { x: PLUG.x, z: PLUG.z, r: 1.9, plug: 1 };
  if (!CPROPS.includes(PLUG.cp)) CPROPS.push(PLUG.cp);
  PLUG.tex.needsUpdate = true;
}
function hitPlug() {
  const tn = performance.now();
  if (PLUG.open || tn - PLUG.last < 220) return;
  PLUG.last = tn;
  PLUG.hp--;
  drawPlug(4 - PLUG.hp);
  HIT.sh = Math.max(HIT.sh, 0.55);
  burst(PLUG.x, 1.6, PLUG.z, 0x8a8490, 18, 2.5, 2);
  tone(90, 0.3, "square", 0.18);
  tone(60, 0.4, "sawtooth", 0.12, 0.02);
  if (PLUG.hp === 3) toast("🪨 The wall sounds hollow…");
  if (PLUG.hp <= 0) {
    PLUG.open = true;
    cRoot.remove(PLUG.g);
    const i = CPROPS.indexOf(PLUG.cp);
    if (i >= 0) CPROPS.splice(i, 1);
    burst(PLUG.x, 1.6, PLUG.z, 0xa09aa6, 60, 5, 3);
    HIT.sh = 1;
    tone(50, 1, "sawtooth", 0.25);
    jingle([392, 523, 659, 784]);
    toast("🔓 A hidden passage opens… something pink glows inside!");
  }
}
function plugTry(fx, fz, reach) {
  if (PLUG.open) return false;
  const dx = PLUG.x - me3.x,
    dz = PLUG.z - me3.z,
    d = Math.hypot(dx, dz);
  if (d > reach + 0.8 || (dx * fx + dz * fz) / (d || 1) < 0.35) return false;
  hitPlug();
  return true;
}
function plugRay(ox, oz, fx, fz, bt) {
  if (PLUG.open) return 0;
  const rx = PLUG.x - ox,
    rz = PLUG.z - oz,
    t = rx * fx + rz * fz;
  if (t < 0.8 || t > bt + 0.1) return 0;
  return Math.abs(rx * fz - rz * fx) < 1.7 ? t - 0.5 : 0;
}
function resetSecret() {
  SEC.chest = false;
  buildPlug();
}
// ---- the gallery of cheeky pin-up posters (stylised silhouettes, cartoon fruit, vintage captions)
function sil(g, cx, cy, s, col) {
  g.fillStyle = col;
  g.beginPath();
  g.arc(cx, cy - 92 * s, 15 * s, 0, 6.283);
  g.fill();
  g.beginPath();
  g.moveTo(cx - 10 * s, cy - 76 * s);
  g.bezierCurveTo(
    cx - 28 * s,
    cy - 58 * s,
    cx - 22 * s,
    cy - 36 * s,
    cx - 14 * s,
    cy - 20 * s,
  );
  g.bezierCurveTo(
    cx - 36 * s,
    cy + 2 * s,
    cx - 36 * s,
    cy + 16 * s,
    cx - 20 * s,
    cy + 34 * s,
  );
  g.lineTo(cx - 18 * s, cy + 104 * s);
  g.lineTo(cx - 8 * s, cy + 104 * s);
  g.lineTo(cx - 4 * s, cy + 42 * s);
  g.lineTo(cx + 4 * s, cy + 42 * s);
  g.lineTo(cx + 8 * s, cy + 104 * s);
  g.lineTo(cx + 18 * s, cy + 104 * s);
  g.lineTo(cx + 20 * s, cy + 34 * s);
  g.bezierCurveTo(
    cx + 36 * s,
    cy + 16 * s,
    cx + 36 * s,
    cy + 2 * s,
    cx + 14 * s,
    cy - 20 * s,
  );
  g.bezierCurveTo(
    cx + 22 * s,
    cy - 36 * s,
    cx + 28 * s,
    cy - 58 * s,
    cx + 10 * s,
    cy - 76 * s,
  );
  g.closePath();
  g.fill();
}
const PICS = [
  [
    "OH LÀ LÀ",
    "#b3122a",
    "#ffcf5a",
    (g) => {
      sil(g, 128, 150, 1.1, "#16060a");
      g.font = "52px serif";
      g.textAlign = "center";
      g.fillText("💋", 205, 70);
    },
  ],
  [
    "FRUITS DÉFENDUS",
    "#ff9a5a",
    "#7a1030",
    (g) => {
      g.font = "96px serif";
      g.textAlign = "center";
      g.fillText("🍑", 90, 170);
      g.fillText("🍒", 176, 150);
      g.font = "72px serif";
      g.fillText("🍌", 128, 250);
    },
  ],
  [
    "CHAUD DEVANT !",
    "#2a0f3a",
    "#ff6a3a",
    (g) => {
      sil(g, 128, 170, 1, "#0a0410");
      g.font = "70px serif";
      g.fillText("🔥", 64, 100);
      g.fillText("🔥", 192, 100);
    },
  ],
  [
    "MAMIE EN 1962",
    "#7ac0d8",
    "#fff4d8",
    (g) => {
      for (let i = 0; i < 30; i++) {
        g.fillStyle = "rgba(255,255,255,.55)";
        g.beginPath();
        g.arc(hs(i, 410, 1) * 256, hs(i, 411, 1) * 270, 8, 0, 6.283);
        g.fill();
      }
      sil(g, 128, 160, 1.05, "#1a2a3a");
    },
  ],
  [
    "BAISER VOLÉ",
    "#e0185a",
    "#ffe9f0",
    (g) => {
      g.fillStyle = "#ff2a5a";
      g.beginPath();
      g.moveTo(40, 150);
      g.bezierCurveTo(70, 90, 110, 110, 128, 128);
      g.bezierCurveTo(146, 110, 186, 90, 216, 150);
      g.bezierCurveTo(186, 218, 70, 218, 40, 150);
      g.fill();
      g.fillStyle = "#9a0a30";
      g.fillRect(44, 148, 168, 6);
      g.fillStyle = "#fff";
      g.beginPath();
      g.ellipse(100, 134, 16, 5, -0.4, 0, 6.283);
      g.fill();
    },
  ],
  [
    "NUIT DE PARIS",
    "#1a1a4a",
    "#ffd98a",
    (g) => {
      g.fillStyle = "#ffd98a";
      for (let i = 0; i < 40; i++)
        g.fillRect(hs(i, 420, 1) * 256, hs(i, 421, 1) * 140, 2, 2);
      g.fillStyle = "#0a0a1a";
      g.beginPath();
      g.moveTo(128, 50);
      g.lineTo(150, 220);
      g.lineTo(106, 220);
      g.closePath();
      g.fill();
      sil(g, 70, 200, 0.5, "#000");
      sil(g, 186, 200, 0.5, "#000");
      g.font = "50px serif";
      g.textAlign = "center";
      g.fillText("💞", 128, 150);
    },
  ],
  [
    "COUCOU TOI",
    "#ffb0c8",
    "#7a0a3a",
    (g) => {
      g.font = "150px serif";
      g.textAlign = "center";
      g.fillText("😉", 128, 170);
      g.font = "44px serif";
      g.fillText("💗", 50, 60);
      g.fillText("💗", 210, 230);
    },
  ],
  [
    "SUR LE DIVAN",
    "#5a0a1a",
    "#ffd0a0",
    (g) => {
      g.fillStyle = "#2a0508";
      g.fillRect(20, 170, 216, 64);
      g.fillRect(20, 140, 40, 40);
      g.fillStyle = "#0a0204";
      g.beginPath();
      g.ellipse(128, 162, 80, 20, 0, 0, 6.283);
      g.fill();
      g.beginPath();
      g.arc(66, 148, 14, 0, 6.283);
      g.fill();
      g.beginPath();
      g.moveTo(80, 150);
      g.bezierCurveTo(110, 120, 140, 190, 200, 170);
      g.lineTo(200, 182);
      g.bezierCurveTo(140, 200, 110, 140, 80, 164);
      g.fill();
    },
  ],
  [
    "ENCORE !",
    "#3a9a6a",
    "#fff0b0",
    (g) => {
      g.font = "96px serif";
      g.textAlign = "center";
      g.fillText("🍆", 100, 170);
      g.fillText("🍑", 170, 190);
      g.font = "50px serif";
      g.fillText("😏", 128, 80);
    },
  ],
];
const CAPS = [
  "😳 Oh là là… who hung THAT here?",
  "🍑 A still life. Very still. Very… life.",
  "🔥 It's getting hot in here.",
  "👵 Grandma had a past.",
  "💋 Someone was here before you.",
  "🗼 Paris, the city of love. And lamps.",
  "😉 The eyes follow you.",
  "🛋️ That sofa has seen things.",
  "🍆 The artist was… enthusiastic.",
];
function posterTex(i) {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 340;
  const g = c.getContext("2d"),
    p = PICS[i],
    gr = g.createLinearGradient(0, 0, 0, 340);
  gr.addColorStop(0, p[1]);
  gr.addColorStop(1, "#000");
  g.fillStyle = gr;
  g.fillRect(0, 0, 256, 340);
  g.textBaseline = "alphabetic";
  p[3](g);
  g.fillStyle = p[2];
  g.font = "bold 28px Georgia,serif";
  g.textAlign = "center";
  g.fillText(p[0], 128, 318);
  g.strokeStyle = p[2];
  g.lineWidth = 4;
  g.strokeRect(8, 8, 240, 324);
  return new THREE.CanvasTexture(c);
}
function buildGallery() {
  const cx = SEC.x,
    cz = SEC.z,
    a0 = Math.atan2(CVZ - 12.2 - cz, CVX + 43 - cx) + Math.PI,
    sh = M(0x7a1020, { roughness: 0.9 });
  const car = new THREE.Mesh(new THREE.CircleGeometry(4.7, 36), sh);
  car.rotation.x = -Math.PI / 2;
  car.position.set(cx, 0.52, cz);
  cRoot.add(car);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(4.5, 4.75, 36),
    new THREE.MeshBasicMaterial({ color: 0xd4a437, side: THREE.DoubleSide }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(cx, 0.53, cz);
  cRoot.add(ring);
  for (let k = -4; k <= 4; k++) {
    const a = a0 + k * 0.5,
      i = k + 4,
      x = cx + Math.cos(a) * 5.1,
      z = cz + Math.sin(a) * 5.1,
      g = new THREE.Group(),
      fr = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 2.0, 0.1),
        M(0xd4a437, { metalness: 0.7, roughness: 0.35 }),
      ),
      pl = new THREE.Mesh(
        new THREE.PlaneGeometry(1.3, 1.75),
        new THREE.MeshBasicMaterial({ map: posterTex(i) }),
      );
    pl.position.z = 0.06;
    g.add(fr, pl);
    const lamp = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.06, 0.14),
      new THREE.MeshBasicMaterial({ color: 0xffe0b0 }),
    );
    lamp.position.set(0, 1.1, 0.12);
    g.add(lamp);
    const ha = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0xff8ab0,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
        opacity: 0.5,
      }),
    );
    ha.scale.set(2.8, 2.8, 1);
    ha.position.set(0, 0.2, 0.3);
    g.add(ha);
    hitSph(g, 1.3, 1);
    g.position.set(x, 1.95, z);
    g.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a));
    const fx = cx + Math.cos(a) * 3.8,
      fz = cz + Math.sin(a) * 3.8;
    addItem({
      id: "pic" + i,
      kind: "pic",
      x: fx,
      z: fz,
      r: 0,
      reach: 2.6,
      root: g,
      cap: CAPS[i],
      hint: "🖼️ Admire the artwork",
    });
  }
  const sg = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: signTex("♥ GALERIE COQUINE ♥"),
      fog: false,
    }),
  );
  sg.scale.set(4.6, 1.2, 1);
  sg.position.set(
    cx + Math.cos(a0 + Math.PI) * 4.4,
    3.3,
    cz + Math.sin(a0 + Math.PI) * 4.4,
  );
  cRoot.add(sg);
  const sofa = new THREE.Group(),
    sm = M(0xa8123c, { roughness: 0.8 }),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      sofa.add(m);
    };
  A(new THREE.BoxGeometry(2.2, 0.5, 0.9), sm, 0, 0.25, 0);
  A(new THREE.BoxGeometry(2.2, 0.7, 0.25), sm, 0, 0.75, -0.4);
  A(new THREE.BoxGeometry(0.25, 0.6, 0.9), sm, -1.1, 0.5, 0);
  A(new THREE.BoxGeometry(0.25, 0.6, 0.9), sm, 1.1, 0.5, 0);
  sofa.position.set(cx + Math.cos(a0) * 2.6, 0.5, cz + Math.sin(a0) * 2.6);
  sofa.rotation.y = Math.atan2(-Math.cos(a0), -Math.sin(a0)) + Math.PI / 2;
  cRoot.add(sofa);
  CPROPS.push({ x: sofa.position.x, z: sofa.position.z, r: 1.2 });
  const cg = new THREE.Group(),
    cm = M(0xff6a9a, { roughness: 0.5, metalness: 0.2 });
  const cb = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.6), cm);
  cb.position.y = 0.25;
  cg.add(cb);
  const hl = new THREE.Mesh(
    G.crown,
    new THREE.MeshBasicMaterial({ color: 0xffe0ee }),
  );
  hl.scale.set(0.2, 0.12, 0.12);
  hl.position.set(0, 0.6, 0.3);
  cg.add(hl);
  hitSph(cg, 0.9, 0.5);
  cg.position.set(cx, 0.5, cz);
  cRoot.add(cg);
  SEC.it = addItem({
    id: "sechest",
    kind: "sechest",
    x: cx,
    z: cz,
    r: 0,
    reach: 2.3,
    root: cg,
    hint: "💝 A little chest with a heart on it",
  });
  CPROPS.push({ x: cx, z: cz, r: 0.6 });
  for (let i = 0; i < 8; i++) {
    const a = i * 0.78,
      ha = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: HALO,
          color: i % 2 ? 0xff4a8a : 0xffb0d0,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
          opacity: 0.35,
        }),
      );
    ha.scale.set(5, 5, 1);
    ha.position.set(cx + Math.cos(a) * 3, 2.8, cz + Math.sin(a) * 3);
    cRoot.add(ha);
  }
}
buildGallery();
buildPlug();
CUSE.add("pic");
CUSE.add("sechest");
// ---- exit arches: fix the west one (it faced the wrong way) and add a second exit in the catacombs
function mkExitGroup() {
  const g = new THREE.Group(),
    st = M(0xffffff, { map: BRICK, roughness: 1 });
  [-1, 1].forEach((s) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.6, 0.9), st);
    p.position.set(0, 1.8, s * 1.7);
    g.add(p);
  });
  const li = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 4.5), st);
  li.position.set(0, 3.55, 0);
  g.add(li);
  const day = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3.2),
    new THREE.MeshBasicMaterial({
      color: 0xfff2c8,
      side: THREE.DoubleSide,
      fog: false,
    }),
  );
  day.rotation.y = Math.PI / 2;
  day.position.set(0, 1.7, 0);
  g.add(day);
  const ha = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xfff0b0,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  ha.scale.set(7, 7, 1);
  ha.position.set(0, 1.8, 0);
  g.add(ha);
  const sg = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: signTex("↩ EXIT"), fog: false }),
  );
  sg.scale.set(1.9, 0.72, 1);
  sg.position.set(0, 4.35, 0);
  g.add(sg);
  hitSph(g, 2.2, 1.4);
  return g;
}
{
  const it = items.find((i) => i.id === "exit");
  if (it) {
    const g = mkExitGroup();
    IG.remove(it.root);
    it.root = g;
    IG.add(g);
    g.position.set(CVX - 10.3, 0.5, CVZ);
    g.rotation.y = 0;
    it.x = CVX - 8.9;
    it.z = CVZ;
  }
  const C3 = CROOMS[2],
    ex = C3.x + 10.2,
    g2 = mkExitGroup();
  g2.position.set(ex, 0.5, C3.z);
  addItem({
    id: "exit2",
    kind: "exit",
    x: ex - 1.5,
    z: C3.z,
    r: 0,
    reach: 3.4,
    root: g2,
    hint: "↩ Leave the catacombs (back to the island)",
  });
  mkTorch(ex - 1.2, C3.z - 2.6, 2.3);
  mkTorch(ex - 1.2, C3.z + 2.6, 2.3);
  CPROPS.push(
    { x: ex, z: C3.z - 1.9, r: 0.6 },
    { x: ex, z: C3.z + 1.9, r: 0.6 },
  );
}
// ---- map: haunted forest (the secret bed is deliberately NOT listed)
function pois() {
  return [
    ["💗", "Love altar", 0, -10],
    ["🕳️", "Cave", ENT[0], ENT[1]],
    ["🎣", "Fishing dock", DK.x + dc * 6, DK.z + ds2 * 6],
    ["🚢", chap() >= 8 ? "Your boat" : "Shipwreck", boatItem.x, boatItem.z],
    ["🌲", "Haunted forest", HAUNT.x, HAUNT.z],
  ];
}
// ---- tick
let dumpT = 0;
function v37Tick(dt, t) {
  smogTick(dt, t);
  hauntTick(dt, t);
  dumpT -= dt;
  if (dumpT <= 0) {
    dumpT = 1.5;
    dumpTick();
  }
  if (window.BEDGLOW)
    BEDGLOW.material.opacity =
      0.4 + 0.15 * Math.sin(t * 2.6) + 0.1 * Math.sin(t * 7.3);
}
const exTick9 = window.exTick;
window.exTick = function (dt, t) {
  exTick9(dt, t);
  if (!ready) return;
  v37Tick(dt, t);
};

// ===================================================================
// v3.8 A: classic full-width waterfall, bigger haunted forest (breakable trees, enchanted glade, solid house), gift
// ===================================================================
// sprites never write depth (fixes props popping in and out behind smog/labels)
(function () {
  const SM = THREE.SpriteMaterial;
  THREE.SpriteMaterial = class extends SM {
    constructor(p) {
      super(Object.assign({ depthWrite: false }, p || {}));
    }
  };
  scene.traverse((o) => {
    if (o.isSprite && o.material) o.material.depthWrite = false;
  });
  hazeM.depthWrite = false;
})();
// ---------- generic collider generator: builds solid collision from the real meshes (boxes by outline, cylinders by circumference)
const ACDONE = new WeakSet();
function autoCollide(root, o) {
  o = o || {};
  const made = [],
    v = new THREE.Vector3(),
    vs = new THREE.Vector3(),
    stp = o.step || 0.22,
    rr = o.r || 0.1;
  root.updateMatrixWorld(true);
  const add = (x, z) => {
    for (const c of made)
      if (Math.abs(c.x - x) < 0.1 && Math.abs(c.z - z) < 0.1) return;
    const c = { x, z, r: rr };
    made.push(c);
    COLL.push(c);
  };
  root.traverse((m) => {
    if (
      !m.isMesh ||
      m.isInstancedMesh ||
      m.userData.nocol ||
      (m.material && m.material.wireframe) ||
      ACDONE.has(m)
    )
      return;
    ACDONE.add(m);
    const g = m.geometry;
    if (!g.boundingBox) g.computeBoundingBox();
    const bb = g.boundingBox;
    let y0 = 1e9,
      y1 = -1e9;
    for (const y of [bb.min.y, bb.max.y])
      for (const x of [bb.min.x, bb.max.x])
        for (const z of [bb.min.z, bb.max.z]) {
          v.set(x, y, z).applyMatrix4(m.matrixWorld);
          y0 = Math.min(y0, v.y);
          y1 = Math.max(y1, v.y);
        }
    m.getWorldScale(vs);
    const cx = (bb.min.x + bb.max.x) / 2,
      cz = (bb.min.z + bb.max.z) / 2;
    v.set(cx, 0, cz).applyMatrix4(m.matrixWorld);
    const gy = hm(v.x, v.z);
    if (y1 - gy < 0.6 || y0 - gy > 2.3) return;
    const wx = (bb.max.x - bb.min.x) * Math.abs(vs.x),
      wz = (bb.max.z - bb.min.z) * Math.abs(vs.z);
    if (wx < 0.15 && wz < 0.15) return;
    const tp = g.type,
      L2W = (x, z) => {
        v.set(x, (bb.min.y + bb.max.y) / 2, z).applyMatrix4(m.matrixWorld);
        add(v.x, v.z);
      };
    if (
      tp === "CylinderGeometry" ||
      tp === "ConeGeometry" ||
      tp === "SphereGeometry" ||
      tp === "IcosahedronGeometry"
    ) {
      const ra = Math.max(bb.max.x - bb.min.x, bb.max.z - bb.min.z) / 2,
        n = Math.max(
          8,
          Math.ceil(
            (2 * Math.PI * ra * Math.max(Math.abs(vs.x), Math.abs(vs.z))) / stp,
          ),
        );
      for (let i = 0; i < n; i++) {
        const a = (i / n) * 6.283;
        L2W(
          cx + Math.cos(a) * ra,
          cz +
            Math.sin(a) *
              ((ra * (bb.max.z - bb.min.z)) /
                Math.max(0.001, bb.max.x - bb.min.x)),
        );
      }
      if (ra * Math.abs(vs.x) > 1.2) L2W(cx, cz);
    } else {
      const ex = (a, b, n) => {
          for (let i = 0; i <= n; i++) {
            const t = i / n;
            L2W(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t);
          }
        },
        nx = Math.max(1, Math.ceil(wx / stp)),
        nz = Math.max(1, Math.ceil(wz / stp)),
        mn = [bb.min.x, bb.min.z],
        mx = [bb.max.x, bb.max.z];
      ex([mn[0], mn[1]], [mx[0], mn[1]], nx);
      ex([mn[0], mx[1]], [mx[0], mx[1]], nx);
      ex([mn[0], mn[1]], [mn[0], mx[1]], nz);
      ex([mx[0], mn[1]], [mx[0], mx[1]], nz);
      if (wx > 1.3 && wz > 1.3 && o.fill !== false) L2W(cx, cz);
    }
  });
  return made;
}
// ---------- the classic waterfall again: the sheet covers the WHOLE entrance, no windows, no glow, no hints
(function () {
  for (let i = scene.children.length; i--;) {
    const c = scene.children[i];
    if (c.isMesh && c.material === wMat && c.geometry.attributes.uv) {
      scene.remove(c);
      c.geometry.dispose();
    }
  }
  if (window.BEDGLOW) wf.remove(window.BEDGLOW);
  window.BEDGLOW = null;
  const dY = (zl) =>
      AF +
      3.1 +
      2.9 * Math.sqrt(Math.max(0, 1 - Math.pow((zl + 3.4) / 5.4, 2))),
    W = (zl, y) => [AX + AO[0] * zl, y, AZ + AO[1] * zl],
    P = [],
    WD = [];
  for (let k = 8; k >= -2; k -= 0.5) {
    const zl = -k,
      x = AX + AO[0] * zl,
      z = AZ + AO[1] * zl;
    P.push([x, Math.max(gh(x, z), dY(zl)) + 0.1, z]);
    WD.push(1.5);
  }
  for (let i = 1; i <= 8; i++) {
    const t = i / 8;
    P.push(W(2 + 0.95 * t * t, AF + 3.2 - 3 * t));
    WD.push(2.1 + 0.4 * t);
  }
  for (let zl = 3.2; zl <= 4.8; zl += 0.4) {
    P.push(W(zl, AF + 0.24));
    WD.push(2.4 - (zl - 3.2) * 0.2);
  }
  const P0 = [AX + AO[0] * 4.8, AZ + AO[1] * 4.8];
  for (let i = 1; i <= 26; i++) {
    const u = i / 26,
      x =
        P0[0] +
        (PNX - P0[0]) * u +
        Math.sin(u * 9) * 0.9 * Math.sin(u * Math.PI),
      z = P0[1] + (PNZ - P0[1]) * u;
    P.push([x, gh(x, z) + 0.14, z]);
    WD.push(1.3 - 0.4 * u);
  }
  ribbon(P, WD, 0);
  // seal both sides with boulders so the only way in is through the water
  wf.children
    .filter((o) => o.isMesh && o.userData.sealRock)
    .forEach((o) => wf.remove(o));
  [
    [-2.9, 0.9, 1.5, 1.2, 1.5, 1.2],
    [-3.3, 0.8, 2.9, 1.2, 1.2, 1.1],
    [-2.7, 0.8, 4.0, 1.0, 1.0, 1.0],
    [-2.6, 2.1, 2.3, 1.0, 1.2, 1.0],
    [-2.5, 2.0, 0.2, 1.1, 1.3, 1.2],
    [-3.1, 1.4, 0.6, 1.3, 1.6, 1.2],
    [2.9, 0.9, 1.5, 1.2, 1.5, 1.2],
    [3.3, 0.8, 2.9, 1.2, 1.2, 1.1],
    [2.7, 0.8, 4.0, 1.0, 1.0, 1.0],
    [2.6, 2.1, 2.3, 1.0, 1.2, 1.0],
    [2.5, 2.0, 0.2, 1.1, 1.3, 1.2],
    [3.1, 1.4, 0.6, 1.3, 1.6, 1.2],
  ].forEach(([x, y, z, sx, sy, sz], i) => {
    const n = wf.children.length;
    mkR(wf, x, y, z, sx, sy, sz, 70 + i);
    const r = wf.children[wf.children.length - 1];
    if (wf.children.length > n) r.userData.sealRock = 1;
  });
  scene.updateMatrixWorld(true);
  wf.children
    .filter((o) => o.userData.sealRock)
    .forEach((o) => autoCollide(o, { r: 0.12 }));
  const bi = items.find((i) => i.kind === "bed");
  if (bi) bi.hint = "🛏️ A cosy bed";
})();
// ---------- haunted forest (bigger, spreads north and south)
const HAUNT = { x: 33, z: -1.5, R: 16, hz: 30 };
const inHaunt = (x, z) =>
  Math.abs(x - HAUNT.x) < HAUNT.R && Math.abs(z - HAUNT.z) < HAUNT.hz;
const farFromPlaces = (x, z) =>
  Math.hypot(x - HX, z - HZ) > 26 &&
  Math.hypot(x, z + 10) > 16 &&
  Math.hypot(x - DK.x, z - DK.z) > 14 &&
  Math.hypot(x - boatItem.x, z - boatItem.z) > 16 &&
  Math.hypot(x - ENT[0], z - ENT[1]) > 16;
const hauntLand = (x, z) =>
  gh(x, z) > 0.9 &&
  gh(x + 2.5, z) > 0.8 &&
  gh(x - 2.5, z) > 0.8 &&
  gh(x, z + 2.5) > 0.8 &&
  gh(x, z - 2.5) > 0.8;
function conform(spots, rings, seg, colAt, mat, lift) {
  const pos = [],
    col = [],
    idx = [],
    N = rings.length;
  spots.forEach((p) => {
    const b = pos.length / 3,
      c0 = colAt(p, 0, 0);
    pos.push(p.x, gh(p.x, p.z) + lift, p.z);
    col.push(c0[0], c0[1], c0[2]);
    for (let r = 0; r < N; r++)
      for (let k = 0; k < seg; k++) {
        const a = (k / seg) * 6.283 + (p.r || 0),
          wob =
            1 +
            (vn(p.x * 3 + k, p.z * 3, 235) - 0.5) *
              (p.wob === undefined ? 0.28 : p.wob),
          x = p.x + Math.cos(a) * p.s * rings[r] * wob,
          z = p.z + Math.sin(a) * p.s * rings[r] * (p.e || 1) * wob,
          c = colAt(p, r + 1, k);
        pos.push(x, Math.max(gh(x, z), SEA + 0.02) + lift, z);
        col.push(c[0], c[1], c[2]);
      }
    for (let k = 0; k < seg; k++) {
      const k2 = (k + 1) % seg;
      idx.push(b, b + 1 + k, b + 1 + k2);
      for (let r = 0; r < N - 1; r++) {
        const a0 = b + 1 + r * seg;
        idx.push(
          a0 + k,
          a0 + seg + k,
          a0 + k2,
          a0 + k2,
          a0 + seg + k,
          a0 + seg + k2,
        );
      }
    }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.frustumCulled = false;
  scene.add(m);
  return m;
}
const HFG = new THREE.Group();
scene.add(HFG);
var hfWisps = [],
  hfMist = [],
  hfChest = null,
  hfGhost = null,
  hfOwl = 3,
  hfTrees = [],
  hfFelled = [],
  hfMotes = [],
  hfStones = [],
  hfRune = null,
  hfHeart = null,
  hfRock = null,
  hfMush = [];
const HEART = { x: HAUNT.x, z: HAUNT.z };
(function buildHaunt() {
  let found = false;
  {
    let best = -1;
    for (let gx = HAUNT.x - HAUNT.R + 4; gx <= HAUNT.x + HAUNT.R - 1; gx += 1)
      for (
        let gz = HAUNT.z - HAUNT.hz + 6;
        gz <= HAUNT.z + HAUNT.hz - 6;
        gz += 1
      ) {
        if (!hauntLand(gx, gz) || !farFromPlaces(gx, gz)) continue;
        let ok = true,
          cnt = 0;
        for (let k = 0; k < 12 && ok; k++) {
          const an = (k / 12) * 6.283;
          if (!hauntLand(gx + Math.cos(an) * 4.5, gz + Math.sin(an) * 4.5))
            ok = false;
          else if (hauntLand(gx + Math.cos(an) * 6.8, gz + Math.sin(an) * 6.8))
            cnt++;
        }
        if (!ok || cnt < 8) continue;
        let sd = 40;
        for (let k = 0; k < 16 && sd > 0; k++) {
          const an = (k / 16) * 6.283;
          for (let r = 4; r < 30; r += 2) {
            if (gh(gx + Math.cos(an) * r, gz + Math.sin(an) * r) < SEA + 0.05) {
              sd = Math.min(sd, r);
              break;
            }
          }
        }
        const sc = 100 - sd * 3 + gx * 0.05;
        if (sc > best) {
          best = sc;
          HEART.x = gx;
          HEART.z = gz;
          found = true;
        }
      }
  }
  for (let r = 0; r < 16 && !found; r += 1.5)
    for (let a = 0; a < 6.283 && !found; a += 0.6) {
      const x = HAUNT.x + Math.cos(a) * r,
        z = HAUNT.z + Math.sin(a) * r;
      if (hauntLand(x, z) && farFromPlaces(x, z)) {
        HEART.x = x;
        HEART.z = z;
        found = true;
      }
    }
  const cx = HEART.x,
    cz = HEART.z;
  items
    .filter(
      (i) =>
        (i.kind === "tree" || i.kind === "rock" || i.kind === "bush") &&
        inHaunt(i.x, i.z),
    )
    .forEach((i) => {
      IG.remove(i.root);
      items.splice(items.indexOf(i), 1);
    });
  // boggy ground made of overlapping discs that follow the terrain, teal near the glade
  const discs = [];
  for (let gx = HAUNT.x - HAUNT.R; gx <= HAUNT.x + HAUNT.R; gx += 4.2)
    for (let gz = HAUNT.z - HAUNT.hz; gz <= HAUNT.z + HAUNT.hz; gz += 4.2) {
      const x = gx + (hs(gx, gz, 500) - 0.5) * 2,
        z = gz + (hs(gx, gz, 501) - 0.5) * 2;
      if (hauntLand(x, z) && farFromPlaces(x, z))
        discs.push({ x, z, s: 4.6, e: 1, wob: 0.12, r: hs(gx, gz, 502) * 6 });
    }
  conform(
    discs,
    [0.4, 0.75, 1],
    18,
    (p, r, k) => {
      const f = r / 3,
        n = vn(p.x * 0.5 + k, p.z * 0.5, 280),
        dc = Math.hypot(p.x - cx, p.z - cz),
        ench = 1 - ss(3, 9, dc),
        dk = 1 - f * f;
      return [
        0.17 + 0.27 * (1 - dk) + n * 0.07 - ench * 0.07 * dk,
        0.21 + 0.32 * (1 - dk) + n * 0.09 + ench * 0.08 * dk,
        0.13 + 0.19 * (1 - dk) + n * 0.05 + ench * 0.14 * dk,
      ];
    },
    M(0xffffff, {
      vertexColors: true,
      roughness: 1,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
    0.15,
  );
  const pools = [];
  for (let i = 0; i < 500 && pools.length < 9; i++) {
    const x = HAUNT.x + (hs(i, 310, 1) - 0.5) * HAUNT.R * 1.8,
      z = HAUNT.z + (hs(i, 311, 1) - 0.5) * HAUNT.hz * 1.9;
    if (
      !hauntLand(x, z) ||
      !farFromPlaces(x, z) ||
      Math.hypot(x - cx, z - cz) < 8 ||
      pools.some((q) => Math.hypot(q.x - x, q.z - z) < q.s + 4)
    )
      continue;
    pools.push({
      x,
      z,
      s: 1.6 + hs(i, 312, 1) * 1.8,
      e: 0.7 + hs(i, 313, 1) * 0.4,
      r: i,
      wob: 0.4,
    });
  }
  conform(
    pools,
    [0.55, 1, 1.2],
    18,
    (p, r) => {
      const c = r === 0 ? 1 : r === 1 ? 0.9 : r === 2 ? 0.7 : 0.4;
      return [0.1 * c + 0.04, 0.24 * c + 0.05, 0.2 * c + 0.04];
    },
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      roughness: 0.08,
      metalness: 0.35,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
    }),
    0.19,
  );
  // abandoned house (north-east of the glade); every wall and prop gets real colliders
  let hxp = cx + 9,
    hzp = cz - 8;
  for (let r = 8; r < 18; r += 1.5) {
    let ok = false;
    for (let a = 0; a < 6.283 && !ok; a += 0.5) {
      const x = cx + Math.cos(a) * r,
        z = cz + Math.sin(a) * r;
      if (
        hauntLand(x, z) &&
        gh(x + 3, z) > 1 &&
        gh(x - 3, z) > 1 &&
        gh(x, z + 3) > 1 &&
        gh(x, z - 3) > 1 &&
        Math.abs(gh(x + 3, z) - gh(x - 3, z)) < 0.5
      ) {
        hxp = x;
        hzp = z;
        ok = true;
      }
    }
    if (ok) break;
  }
  window.HOUSE = { x: hxp, z: hzp };
  {
    const g = new THREE.Group(),
      wd = M(0x3a2e24, { roughness: 1 }),
      A = (geo, mat, x, y, z, ry, rz) => {
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x, y, z);
        m.rotation.set(0, ry || 0, rz || 0);
        m.castShadow = true;
        g.add(m);
        return m;
      };
    A(
      new THREE.BoxGeometry(5.4, 0.25, 4.4),
      M(0x2a2018, { roughness: 1 }),
      0,
      0.12,
      0,
    );
    A(new THREE.BoxGeometry(5, 3, 0.22), wd, 0, 1.6, -2);
    A(new THREE.BoxGeometry(0.22, 3, 4), wd, -2.5, 1.6, 0);
    A(new THREE.BoxGeometry(0.22, 3, 2.2), wd, 2.5, 1.6, -0.9);
    A(new THREE.BoxGeometry(0.22, 1.1, 1.6), wd, 2.5, 0.65, 1.2);
    A(new THREE.BoxGeometry(2.2, 0.2, 3.2), wd, -1.2, 3.3, -0.3, 0, 0.3);
    A(new THREE.BoxGeometry(1.8, 0.2, 3.4), wd, 1.5, 3.4, -0.2, 0, -0.45);
    A(new THREE.BoxGeometry(0.9, 2, 0.12), M(0x241c16), 1.45, 1, 2.3, 0.9);
    A(new THREE.BoxGeometry(1.6, 0.9, 0.9), M(0x4a3626), -1.2, 0.55, -1.1);
    A(new THREE.BoxGeometry(0.8, 0.1, 0.8), M(0x4a3626), 0.8, 0.85, -1.2);
    [
      [0.5, -1.6],
      [1.1, -1.6],
      [0.5, -0.8],
      [1.1, -0.8],
    ].forEach(([x, z]) =>
      A(new THREE.BoxGeometry(0.08, 0.8, 0.08), M(0x4a3626), x, 0.45, z),
    );
    const lm = new THREE.Mesh(
      G.crown,
      new THREE.MeshBasicMaterial({ color: 0x8dffb0 }),
    );
    lm.scale.setScalar(0.16);
    lm.position.set(-1.6, 1.9, -1.5);
    g.add(lm);
    const lh = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0x6dffa0,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.6,
        fog: false,
      }),
    );
    lh.scale.set(5, 5, 1);
    lh.position.copy(lm.position);
    g.add(lh);
    window.HOUSE.lh = lh;
    const rk = new THREE.Group(),
      rs = M(0x5a4430);
    [
      [-0.4, 0],
      [0.4, 0],
    ].forEach(([x]) => {
      const l = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 0.9), rs);
      l.position.set(x, 0.45, 0);
      rk.add(l);
    });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.7), rs);
    seat.position.y = 0.5;
    rk.add(seat);
    const bk = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.08), rs);
    bk.position.set(0, 1, -0.34);
    rk.add(bk);
    rk.position.set(1.4, 0, -0.3);
    rk.userData.nocol = 0;
    g.add(rk);
    window.HOUSE.rock = rk;
    g.position.set(hxp, gh(hxp, hzp) - 0.05, hzp);
    g.rotation.y = 0.5;
    HFG.add(g);
    autoCollide(g);
    window.HOUSE.g = g;
  }
  // trees: tall, twisted, BREAKABLE (no hanging cones this time)
  const spots = [],
    isNear = (x, z, d) => spots.some((q) => Math.hypot(q.x - x, q.z - z) < d);
  for (let i = 0; i < 9000 && spots.length < 200; i++) {
    const x = HAUNT.x + (hs(i, 320, 1) - 0.5) * 2 * HAUNT.R,
      z = HAUNT.z + (hs(i, 321, 1) - 0.5) * 2 * HAUNT.hz;
    if (
      !hauntLand(x, z) ||
      !farFromPlaces(x, z) ||
      isNear(x, z, 2.3) ||
      Math.hypot(x - cx, z - cz) < 7.2 ||
      Math.hypot(x - hxp, z - hzp) < 5.6 ||
      pools.some((q) => Math.hypot(q.x - x, q.z - z) < q.s * 1.3 + 0.7)
    )
      continue;
    spots.push({
      x,
      z,
      h: 6 + hs(i, 322, 1) * 6.5,
      r: 0.26 + hs(i, 323, 1) * 0.16,
      a: hs(i, 324, 1) * 6.283,
    });
  }
  const NT = spots.length,
    tg = new THREE.CylinderGeometry(0.5, 1, 1, 7).translate(0, 0.5, 0),
    tm = M(0xffffff, { roughness: 1 }),
    trunk = new THREE.InstancedMesh(tg, tm, NT),
    br = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.5, 1, 1, 5).translate(0, 0.5, 0),
      M(0xffffff, { roughness: 1 }),
      NT * 3,
    ),
    can = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(1, 0),
      M(0xffffff, { roughness: 1, flatShading: true }),
      NT * 2,
    );
  const m4 = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e = new THREE.Euler(),
    sc = new THREE.Vector3(),
    ps = new THREE.Vector3(),
    col = new THREE.Color();
  let nb = 0,
    nc = 0;
  spots.forEach((s, i) => {
    const gy = gh(s.x, s.z) - 0.2,
      lean = (hs(i, 330, 1) - 0.5) * 0.22;
    e.set(lean, s.a, (hs(i, 331, 1) - 0.5) * 0.2);
    q.setFromEuler(e);
    m4.compose(ps.set(s.x, gy, s.z), q, sc.set(s.r * 2, s.h, s.r * 2));
    trunk.setMatrixAt(i, m4);
    trunk.setColorAt(i, col.setHex([0x2a2420, 0x1f1c1a, 0x30281f][i % 3]));
    const bi = [],
      ci = [];
    for (let k = 0; k < 3; k++) {
      const hh = 0.5 + k * 0.17 + hs(i, 332 + k, 1) * 0.1,
        ang = s.a + k * 2.1 + hs(i, 335, 1),
        L = 2 + hs(i, 336 + k, 1) * 2.4;
      e.set(
        (hs(i, 340 + k, 1) - 0.5) * 0.4,
        ang,
        1.0 + hs(i, 343 + k, 1) * 0.5,
      );
      q.setFromEuler(e);
      m4.compose(
        ps.set(s.x, gy + s.h * hh, s.z),
        q,
        sc.set(s.r * 0.7, L, s.r * 0.7),
      );
      br.setMatrixAt(nb, m4);
      br.setColorAt(nb, col.setHex(0x241f1b));
      bi.push(nb++);
    }
    for (let k = 0; k < 2; k++) {
      e.set(0, hs(i, 360 + k, 1) * 6, 0);
      q.setFromEuler(e);
      m4.compose(
        ps.set(
          s.x + (k ? 0.8 : -0.5),
          gy + s.h - 0.2 + k * 0.4,
          s.z + (k ? -0.4 : 0.5),
        ),
        q,
        sc.set(2.2 + k * 0.5, 1.1, 2.2 + k * 0.4),
      );
      can.setMatrixAt(nc, m4);
      can.setColorAt(
        nc,
        col.setHex([0x1c2a22, 0x2a2036, 0x223a2c][(i + k) % 3]),
      );
      ci.push(nc++);
    }
    const cl = { x: s.x, z: s.z, r: s.r * 1.9 + 0.06 };
    COLL.push(cl);
    const g = new THREE.Group();
    hitSph(g, 1.3, 3.2);
    const it = addItem({
      id: "ht" + i,
      kind: "htree",
      x: s.x,
      z: s.z,
      r: 0,
      reach: 2.6,
      root: place(g, s.x, s.z),
      hp: 4,
      hint: "🪓 Tap to chop",
    });
    it.tr = { i, s, bi, ci, cl, gy, dead: false };
    hfTrees.push(it);
  });
  trunk.count = NT;
  br.count = nb;
  can.count = nc;
  [trunk, br, can].forEach((o) => {
    o.instanceMatrix.needsUpdate = true;
    if (o.instanceColor) o.instanceColor.needsUpdate = true;
    o.frustumCulled = false;
    HFG.add(o);
  });
  window.HFI = { trunk, br, can, tg, tm };
  // reeds + graves
  const reeds = new THREE.InstancedMesh(
    new THREE.ConeGeometry(0.05, 1.3, 4).translate(0, 0.65, 0),
    M(0x6a7a3a, { roughness: 1 }),
    420,
  );
  let nr = 0;
  pools.forEach((p, pi) => {
    for (let k = 0; k < 44 && nr < 420; k++) {
      const a = hs(k, 370 + pi, 1) * 6.283,
        d = p.s * (1.15 + hs(k, 371, 1) * 0.35),
        x = p.x + Math.cos(a) * d,
        z = p.z + Math.sin(a) * d * p.e;
      m4.compose(
        ps.set(x, gh(x, z), z),
        q.setFromEuler(
          e.set((hs(k, 372, 1) - 0.5) * 0.3, 0, (hs(k, 373, 1) - 0.5) * 0.3),
        ),
        sc.set(1, 0.7 + hs(k, 374, 1) * 0.9, 1),
      );
      reeds.setMatrixAt(nr++, m4);
    }
  });
  reeds.count = nr;
  reeds.frustumCulled = false;
  HFG.add(reeds);
  const stone = M(0x6a6e66, { roughness: 1 });
  for (let i = 0; i < 14; i++) {
    const x = HAUNT.x + (hs(i, 380, 1) - 0.5) * HAUNT.R * 1.8,
      z = HAUNT.z + (hs(i, 381, 1) - 0.5) * HAUNT.hz * 1.8;
    if (
      !hauntLand(x, z) ||
      !farFromPlaces(x, z) ||
      Math.hypot(x - cx, z - cz) < 8 ||
      Math.hypot(x - hxp, z - hzp) < 5 ||
      pools.some((p) => Math.hypot(p.x - x, p.z - z) < p.s * 1.4) ||
      spots.some((s) => Math.hypot(s.x - x, s.z - z) < 1.6)
    )
      continue;
    const g = new THREE.Group(),
      sl = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1, 0.2), stone);
    sl.position.y = 0.5;
    g.add(sl);
    const tp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.2, 10, 1, false, 0, Math.PI),
      stone,
    );
    tp.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    tp.position.y = 1;
    g.add(tp);
    g.position.set(x, gh(x, z), z);
    g.rotation.set(
      (hs(i, 382, 1) - 0.5) * 0.3,
      hs(i, 383, 1) * 6,
      (hs(i, 384, 1) - 0.5) * 0.3,
    );
    g.castShadow = true;
    HFG.add(g);
    autoCollide(g, { r: 0.08 });
  }
  // ===== the enchanted glade in the middle =====
  const glow = (c, i) =>
      new THREE.MeshStandardMaterial({
        color: c,
        emissive: c,
        emissiveIntensity: i,
        roughness: 0.3,
        flatShading: true,
      }),
    gy0 = gh(cx, cz);
  {
    const g = new THREE.Group(),
      bark = M(0xb8c0d8, {
        roughness: 0.6,
        emissive: 0x2a2a6a,
        emissiveIntensity: 0.35,
      });
    const tk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 1.3, 12, 9),
      bark,
    );
    tk.position.y = 6;
    tk.castShadow = true;
    g.add(tk);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * 6.283,
        rt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.45, 3.4, 5),
          bark,
        );
      rt.position.set(Math.cos(a) * 1.3, 0.8, Math.sin(a) * 1.3);
      rt.rotation.set(Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9);
      g.add(rt);
    }
    const cm = [0x7a5cff, 0x4affd0, 0xff7ae0, 0x6ab0ff];
    for (let i = 0; i < 16; i++) {
      const a = i * 2.4,
        rr = 1.5 + hs(i, 510, 1) * 3.4,
        b = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.2 + hs(i, 511, 1) * 1.1, 0),
          glow(cm[i % 4], 0.9),
        );
      b.position.set(
        Math.cos(a) * rr,
        10 + hs(i, 512, 1) * 3.4,
        Math.sin(a) * rr,
      );
      b.userData.ph = i;
      g.add(b);
      hfMotes.push(b);
    }
    for (let i = 0; i < 46; i++) {
      const a = hs(i, 513, 1) * 6.283,
        rr = 1 + hs(i, 514, 1) * 5,
        l = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 6, 5),
          new THREE.MeshBasicMaterial({
            color: [0x9ff4ff, 0xffc8ff, 0xfff0a0][i % 3],
          }),
        );
      l.position.set(Math.cos(a) * rr, 7 + hs(i, 515, 1) * 5, Math.sin(a) * rr);
      g.add(l);
    }
    const hg = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0x8a7aff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        fog: false,
        opacity: 0.55,
      }),
    );
    hg.scale.set(22, 22, 1);
    hg.position.y = 11;
    g.add(hg);
    hfHeart = { g, hg };
    for (let i = 0; i < 4; i++) {
      const bm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 3, 12, 12, 1, true),
        new THREE.MeshBasicMaterial({
          color: i % 2 ? 0x7a5cff : 0x4affd0,
          transparent: true,
          opacity: 0.08,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          fog: false,
        }),
      );
      bm.position.set(Math.cos(i * 1.57) * 2.2, 6, Math.sin(i * 1.57) * 2.2);
      g.add(bm);
    }
    g.position.set(cx, gy0 - 0.1, cz);
    HFG.add(g);
    COLL.push({ x: cx, z: cz, r: 1.9 });
  }
  // rune circle on the ground + eight carved standing stones
  {
    const c = document.createElement("canvas");
    c.width = c.height = 512;
    const g = c.getContext("2d");
    g.translate(256, 256);
    g.strokeStyle = "#8affea";
    g.fillStyle = "#8affea";
    g.lineWidth = 5;
    g.shadowColor = "#4affd0";
    g.shadowBlur = 16;
    [240, 196, 120].forEach((r) => {
      g.beginPath();
      g.arc(0, 0, r, 0, 6.283);
      g.stroke();
    });
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * 6.283;
      g.save();
      g.rotate(a);
      g.translate(0, -218);
      g.font = "bold 30px serif";
      g.textAlign = "center";
      g.fillText("ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ"[i], 0, 0);
      g.restore();
    }
    g.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * 6.283 - 1.57;
      g.lineTo(Math.cos(a) * 150, Math.sin(a) * 150);
    }
    g.closePath();
    g.stroke();
    g.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * 6.283 + 1.57;
      g.lineTo(Math.cos(a) * 150, Math.sin(a) * 150);
    }
    g.closePath();
    g.stroke();
    hfRune = new THREE.Mesh(
      new THREE.CircleGeometry(6.2, 48),
      new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(c),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.75,
        fog: false,
        polygonOffset: true,
        polygonOffsetFactor: -6,
        polygonOffsetUnits: -6,
      }),
    );
    hfRune.rotation.x = -Math.PI / 2;
    hfRune.position.set(cx, gy0 + 0.2, cz);
    HFG.add(hfRune);
    const st = M(0x59606e, { roughness: 0.9 }),
      rn = document.createElement("canvas");
    rn.width = 64;
    rn.height = 128;
    {
      const r = rn.getContext("2d");
      r.fillStyle = "#59606e";
      r.fillRect(0, 0, 64, 128);
      r.strokeStyle = "#6affe0";
      r.shadowColor = "#4affd0";
      r.shadowBlur = 8;
      r.lineWidth = 4;
      r.beginPath();
      r.moveTo(32, 20);
      r.lineTo(32, 100);
      r.moveTo(32, 40);
      r.lineTo(14, 24);
      r.moveTo(32, 60);
      r.lineTo(50, 44);
      r.moveTo(20, 100);
      r.lineTo(44, 80);
      r.stroke();
    }
    const rm = new THREE.MeshStandardMaterial({
      map: new THREE.CanvasTexture(rn),
      emissive: 0x2affd0,
      emissiveMap: null,
      emissiveIntensity: 0.0,
      roughness: 0.9,
    });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * 6.283 + 0.2,
        x = cx + Math.cos(a) * 5.4,
        z = cz + Math.sin(a) * 5.4;
      if (!hauntLand(x, z)) continue;
      const sg = new THREE.Group(),
        bx = new THREE.Mesh(new THREE.BoxGeometry(0.9, 2.6, 0.55), [
          st,
          st,
          st,
          st,
          rm,
          st,
        ]);
      bx.position.y = 1.3;
      bx.castShadow = true;
      sg.add(bx);
      const ha = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: HALO,
          color: 0x4affd0,
          transparent: true,
          blending: THREE.AdditiveBlending,
          opacity: 0.5,
          fog: false,
        }),
      );
      ha.scale.set(3, 3, 1);
      ha.position.set(0, 1.5, 0.6);
      sg.add(ha);
      sg.position.set(x, gh(x, z) - 0.1, z);
      sg.rotation.set(
        (hs(i, 520, 1) - 0.5) * 0.12,
        Math.atan2(-Math.cos(a), -Math.sin(a)),
        (hs(i, 521, 1) - 0.5) * 0.12,
      );
      HFG.add(sg);
      hfStones.push(ha);
      autoCollide(sg, { r: 0.1 });
    }
  }
  // glowing mushrooms in rings
  {
    const cap = new THREE.InstancedMesh(
        new THREE.SphereGeometry(0.5, 10, 6, 0, 6.283, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 0.9,
          roughness: 0.4,
        }),
        60,
      ),
      stem = new THREE.InstancedMesh(
        new THREE.CylinderGeometry(0.09, 0.12, 0.5, 6).translate(0, 0.25, 0),
        M(0xe8e4d8, { roughness: 0.8 }),
        60,
      );
    let n = 0;
    for (let ring = 0; ring < 2; ring++)
      for (let i = 0; i < 30 && n < 60; i++) {
        const a = (i / 30) * 6.283 + ring * 0.1,
          d = ring ? 3.6 : 7.4,
          x = cx + Math.cos(a) * d + (hs(i, 530 + ring, 1) - 0.5) * 0.7,
          z = cz + Math.sin(a) * d + (hs(i, 531 + ring, 1) - 0.5) * 0.7,
          s = 0.5 + hs(i, 532, 1) * 1.1;
        if (!hauntLand(x, z)) continue;
        m4.compose(
          ps.set(x, gh(x, z) + 0.15, z),
          q.identity(),
          sc.set(s, s, s),
        );
        stem.setMatrixAt(n, m4);
        m4.compose(
          ps.set(x, gh(x, z) + 0.15 + 0.5 * s, z),
          q.identity(),
          sc.set(s, s * 0.8, s),
        );
        cap.setMatrixAt(n, m4);
        cap.setColorAt(
          n,
          col.setHex([0x4affd0, 0xff7ae0, 0x8a7aff, 0x7affb0][i % 4]),
        );
        n++;
      }
    cap.count = stem.count = n;
    cap.instanceMatrix.needsUpdate = stem.instanceMatrix.needsUpdate = true;
    if (cap.instanceColor) cap.instanceColor.needsUpdate = true;
    cap.frustumCulled = stem.frustumCulled = false;
    HFG.add(cap, stem);
    hfMush = cap;
  }
  // floating motes rise from the glade
  for (let i = 0; i < 70; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: [0x9ff4ff, 0xffc8ff, 0xc8b0ff][i % 3],
        transparent: true,
        blending: THREE.AdditiveBlending,
        fog: false,
        opacity: 0.8,
      }),
    );
    s.scale.setScalar(0.45 + hs(i, 540, 1) * 0.5);
    s.userData = {
      a: hs(i, 541, 1) * 6.283,
      d: 0.5 + hs(i, 542, 1) * 6,
      y: hs(i, 543, 1) * 9,
      sp: 0.4 + hs(i, 544, 1) * 0.6,
      ph: i,
    };
    HFG.add(s);
    hfMist.push(s);
  }
  // mist + wisps spread over the whole forest
  for (let i = 0; i < 60; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0x9ab8a8,
        transparent: true,
        fog: false,
        opacity: 0.15,
      }),
    );
    s.scale.setScalar(7 + hs(i, 390, 1) * 8);
    s.userData = {
      x: HAUNT.x + (hs(i, 391, 1) - 0.5) * HAUNT.R * 2,
      z: HAUNT.z + (hs(i, 392, 1) - 0.5) * HAUNT.hz * 2,
      sp: 0.03 + hs(i, 393, 1) * 0.05,
      y: 0.5 + hs(i, 394, 1) * 1.5,
      ph: i,
      mist: 1,
    };
    if (!hauntLand(s.userData.x, s.userData.z)) {
      s.userData.x = cx;
      s.userData.z = cz;
    }
    HFG.add(s);
    hfMist.push(s);
  }
  for (let i = 0; i < 16; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: i % 2 ? 0x8fb0ff : 0x7dffd0,
        transparent: true,
        blending: THREE.AdditiveBlending,
        fog: false,
        opacity: 0.9,
      }),
    );
    s.scale.setScalar(1.3);
    s.userData = {
      a: hs(i, 395, 1) * 6.283,
      d: 2 + hs(i, 396, 1) * (i < 8 ? 7 : 18),
      sp: 0.18 + hs(i, 397, 1) * 0.2,
      ph: i,
      zs: i < 8 ? 0 : 1,
    };
    HFG.add(s);
    hfWisps.push(s);
  }
  // the cursed chest sits inside the stone circle
  {
    const g = new THREE.Group(),
      A = (geo, mat, x, y, z) => {
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x, y, z);
        m.castShadow = true;
        g.add(m);
        return m;
      },
      wd = M(0x3a2a1c, { roughness: 1 }),
      gm = new THREE.MeshBasicMaterial({ color: 0x7dffb0 });
    A(new THREE.BoxGeometry(1.5, 0.8, 0.95), wd, 0, 0.4, 0);
    const lid = A(
      new THREE.CylinderGeometry(0.48, 0.48, 1.5, 10, 1, false, 0, Math.PI),
      wd,
      0,
      0.82,
      0,
    );
    lid.rotation.z = Math.PI / 2;
    lid.rotation.y = Math.PI / 2;
    A(new THREE.BoxGeometry(0.16, 0.2, 0.1), gm, 0, 0.7, 0.5);
    [-0.55, 0.55].forEach((x) =>
      A(
        new THREE.BoxGeometry(0.1, 0.84, 1),
        M(0x6a6a72, { metalness: 0.6 }),
        x,
        0.42,
        0,
      ),
    );
    const ha = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0x7dffb0,
        transparent: true,
        blending: THREE.AdditiveBlending,
        fog: false,
      }),
    );
    ha.scale.set(4, 4, 1);
    ha.position.y = 0.9;
    g.add(ha);
    hitSph(g, 1.2, 0.8);
    const px = cx + 3.1,
      pz = cz + 0.6;
    hfChest = addItem({
      id: "cursedChest",
      kind: "cursed",
      x: px,
      z: pz,
      r: 0,
      reach: 2.4,
      root: place(g, px, pz),
      hint: "🧰 A mossy chest... it is whispering your name",
    });
    hfChest.ha = ha;
    autoCollide(g, { r: 0.1 });
  }
  {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 192;
    const g = c.getContext("2d"),
      gr = g.createLinearGradient(0, 0, 0, 192);
    gr.addColorStop(0, "rgba(235,245,255,.95)");
    gr.addColorStop(1, "rgba(235,245,255,.0)");
    g.fillStyle = gr;
    g.beginPath();
    g.moveTo(64, 10);
    g.bezierCurveTo(118, 10, 122, 90, 118, 150);
    for (let i = 0; i < 5; i++)
      g.quadraticCurveTo(110 - i * 22, 190 - (i % 2) * 18, 98 - i * 22, 150);
    g.bezierCurveTo(6, 90, 10, 10, 64, 10);
    g.fill();
    g.fillStyle = "#000";
    g.beginPath();
    g.ellipse(44, 64, 10, 15, 0, 0, 6.283);
    g.ellipse(84, 64, 10, 15, 0, 0, 6.283);
    g.fill();
    g.beginPath();
    g.ellipse(64, 104, 10, 18, 0, 0, 6.283);
    g.fill();
    hfGhost = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(c),
        transparent: true,
        opacity: 0,
        fog: false,
      }),
    );
    hfGhost.scale.set(3.4, 5, 1);
    hfGhost.visible = false;
    scene.add(hfGhost);
    hfGhost.userData = { t: 0 };
  }
  HAUNT.cx = cx;
  HAUNT.cz = cz;
})();
function ghostScare() {
  const u = hfGhost.userData;
  u.t = 0.01;
  hfGhost.visible = true;
  tone(70, 1.2, "sawtooth", 0.18);
  tone(300, 0.9, "sine", 0.1, 0.2);
  tone(210, 1.1, "sine", 0.1, 0.6);
}
// ---------- chopping a haunted tree
function chopHaunt(it) {
  const tr = it.tr;
  if (!tr || tr.dead) return true;
  const t = now();
  if (t < (it.cd || 0)) return true;
  it.cd = t + 420;
  it.hp--;
  tone(150 + Math.random() * 40, 0.12, "square", 0.1);
  burst(it.x, 1.4, it.z, 0x8a6a44, 10, 2, 1.4);
  HIT.sh = Math.max(HIT.sh, 0.15);
  if (it.hp > 0) {
    it.hint = "🪓 Chop (" + it.hp + " more)";
    return true;
  }
  tr.dead = true;
  const I = HFI,
    z4 = new THREE.Matrix4().makeScale(0, 0, 0);
  I.trunk.setMatrixAt(tr.i, z4);
  tr.bi.forEach((k) => I.br.setMatrixAt(k, z4));
  tr.ci.forEach((k) => I.can.setMatrixAt(k, z4));
  I.trunk.instanceMatrix.needsUpdate =
    I.br.instanceMatrix.needsUpdate =
    I.can.instanceMatrix.needsUpdate =
      true;
  const fg = new THREE.Group(),
    tk = new THREE.Mesh(I.tg, M(0x2a2420, { roughness: 1 }));
  tk.scale.set(tr.s.r * 2, tr.s.h, tr.s.r * 2);
  fg.add(tk);
  [0, 1].forEach((k) => {
    const c = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 0),
      M(0x223a2c, { roughness: 1, flatShading: true }),
    );
    c.scale.set(2.2 + k * 0.5, 1.1, 2.2);
    c.position.set(k ? 0.8 : -0.5, tr.s.h - 0.2 + k * 0.4, k ? -0.4 : 0.5);
    fg.add(c);
  });
  fg.position.set(it.x, tr.gy, it.z);
  scene.add(fg);
  const dx = it.x - me3.x,
    dz = it.z - me3.z,
    l = Math.hypot(dx, dz) || 1;
  hfFelled.push({ g: fg, t: 0, ax: new THREE.Vector3(dz / l, 0, -dx / l) });
  tone(90, 0.8, "sawtooth", 0.15);
  tone(60, 1, "sine", 0.18, 0.2);
  HIT.sh = Math.max(HIT.sh, 0.4);
  const ci = COLL.indexOf(tr.cl);
  if (ci >= 0) COLL.splice(ci, 1);
  IG.remove(it.root);
  const ii = items.indexOf(it);
  if (ii >= 0) items.splice(ii, 1);
  addInv({ wood: 5, fiber: 2 }, "🪵 Timber! +5 wood, +2 fiber");
  if (Math.random() < 0.5) addInv({ seed: 1 });
  if (Math.random() < 0.08)
    addInv({ gem: 1 }, "💎 A gem fell out of the hollow!");
  return true;
}
function hauntTick(dt, t) {
  const cx = HEART.x,
    cz = HEART.z,
    d = Math.hypot(me3.x - cx, me3.z - cz),
    inside =
      Math.abs(me3.x - HAUNT.x) < HAUNT.R + 6 &&
      Math.abs(me3.z - HAUNT.z) < HAUNT.hz + 6,
    f = inCave
      ? 0
      : inside
        ? 1 -
          ss(
            HAUNT.R - 2,
            HAUNT.R + 6,
            Math.max(
              Math.abs(me3.x - HAUNT.x) * (HAUNT.R / HAUNT.R),
              Math.abs(me3.z - HAUNT.z) * (HAUNT.R / HAUNT.hz),
            ),
          )
        : 0,
    g = gh(cx, cz),
    ench = inCave ? 0 : 1 - ss(5, 12, d);
  hfWisps.forEach((s) => {
    const u = s.userData;
    u.a += dt * u.sp;
    const r = u.zs ? u.d : u.d * 0.8;
    s.position.set(
      u.zs ? HAUNT.x + Math.cos(u.a) * r * 0.8 : cx + Math.cos(u.a) * r,
      Math.max(g, 1) + 1.1 + Math.sin(t * 1.4 + u.ph) * 0.5,
      u.zs
        ? HAUNT.z + Math.sin(u.a * 1.3) * Math.min(r, HAUNT.hz - 3)
        : cz + Math.sin(u.a * 1.3) * r,
    );
    s.material.opacity =
      (0.35 + 0.45 * Math.sin(t * 2.2 + u.ph)) * clamp(0.4 + f + ench, 0, 1);
  });
  hfMist.forEach((s) => {
    const u = s.userData;
    if (u.mist) {
      s.position.set(
        u.x + Math.sin(t * u.sp + u.ph) * 3,
        gh(u.x, u.z) + u.y,
        u.z + Math.cos(t * u.sp * 0.8 + u.ph) * 3,
      );
      s.material.opacity = 0.1 + 0.08 * Math.sin(t * 0.4 + u.ph);
    } else {
      u.y += dt * u.sp;
      if (u.y > 10) u.y = 0;
      u.a += dt * 0.3;
      s.position.set(
        cx + Math.cos(u.a) * u.d,
        g + u.y,
        cz + Math.sin(u.a) * u.d,
      );
      s.material.opacity = 0.8 * Math.sin(Math.min(1, u.y / 10) * Math.PI);
    }
  });
  hfMotes.forEach((b) => {
    b.position.y += Math.sin(t * 0.8 + b.userData.ph) * dt * 0.15;
    b.material.emissiveIntensity =
      0.7 + 0.4 * Math.sin(t * 1.6 + b.userData.ph);
  });
  if (hfHeart) hfHeart.hg.material.opacity = 0.45 + 0.15 * Math.sin(t * 1.2);
  if (hfRune) hfRune.rotation.z += dt * 0.08;
  hfStones.forEach(
    (h, i) => (h.material.opacity = 0.35 + 0.25 * Math.sin(t * 1.8 + i)),
  );
  if (hfMush && hfMush.material)
    hfMush.material.emissiveIntensity = 0.7 + 0.3 * Math.sin(t * 2);
  if (window.HOUSE) {
    HOUSE.lh.material.opacity = 0.45 + 0.2 * Math.sin(t * 3);
    if (HOUSE.rock)
      HOUSE.rock.rotation.x =
        Math.sin(t * 0.9) * 0.12 * Math.max(0, 0.4 + Math.sin(t * 0.2));
  }
  if (hfChest) hfChest.ha.material.opacity = 0.6 + 0.3 * Math.sin(t * 3.2);
  for (let i = hfFelled.length; i--;) {
    const o = hfFelled[i];
    o.t += dt;
    const ang = Math.min(Math.PI / 2.05, 0.15 * o.t * o.t * 14 + 0.02);
    o.g.quaternion.setFromAxisAngle(o.ax, ang);
    if (o.t > 2.4) o.g.scale.multiplyScalar(Math.max(0, 1 - dt * 1.6));
    if (o.t > 3.6) {
      scene.remove(o.g);
      hfFelled.splice(i, 1);
    }
  }
  if (f > 0.01) {
    scene.fog.color.lerp(new THREE.Color(0.1, 0.17, 0.14), f * 0.55);
    scene.background.lerp(new THREE.Color(0.1, 0.17, 0.14), f * 0.5);
    scene.fog.near = Math.max(4, scene.fog.near * (1 - f * 0.6));
    scene.fog.far = scene.fog.far * (1 - f * 0.5);
    hfOwl -= dt;
    if (hfOwl <= 0) {
      hfOwl = 7 + Math.random() * 9;
      tone(330, 0.35, "sine", 0.05);
      tone(290, 0.5, "sine", 0.05, 0.4);
      if (Math.random() < 0.4)
        tone(95 + Math.random() * 30, 0.9, "sawtooth", 0.025);
    }
  }
  if (ench > 0.05 && !inCave) {
    scene.fog.color.lerp(new THREE.Color(0.16, 0.14, 0.3), ench * 0.3);
    scene.background.lerp(new THREE.Color(0.16, 0.14, 0.3), ench * 0.25);
    if (Math.random() < dt * 0.35)
      tone(900 + Math.random() * 700, 0.5, "sine", 0.02);
  }
  const u = hfGhost.userData;
  if (u.t > 0) {
    u.t += dt;
    const p = u.t / 2.8;
    hfGhost.position
      .set(me3.x, me3.y + 2.4 + p * 1.6, me3.z)
      .addScaledVector(
        new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)),
        4.2 - p * 1.4,
      );
    hfGhost.material.opacity = Math.sin(Math.min(1, p) * Math.PI) * 0.9;
    if (u.t > 2.8) {
      u.t = 0;
      hfGhost.visible = false;
    }
  }
}
// ---------- one-off gift: a million gold and 99 of every resource
function giftTick() {
  if (X6.gift37 || !ready) return;
  X6.gift37 = 1;
  sv6();
  award(1000000);
  const inv0 = Object.assign({}, inv());
  Object.keys(NM).forEach((k) => {
    inv0[k] = Math.max(inv0[k] || 0, 99);
  });
  inv0.baguette = Math.max(inv0.baguette || 0, 99);
  inv0.ladder = Math.max(inv0.ladder || 0, 99);
  saveMe({ inv: inv0 });
  toast("🎁 Gift: 1,000,000 gold and 99 of every resource!");
}

// ===================================================================
// v3.8 B: Île d'If: solid collision from real meshes, proper ladder, visible zipline, lots of character
// ===================================================================
var PROPS_READY = false;
(function () {
  for (let i = COLL.length; i--;) {
    const c = COLL[i];
    if (c.r > 0.25 && Math.hypot(c.x - CMP[0], c.z - CMP[1]) < 62 && !c.keep)
      COLL.splice(i, 1);
  }
})();
// ---------- the ladders: chunky wooden rails, 13 rungs, iron hooks, plus a ghost outline that shows where it goes
function mkLadder(z0, dir, ghost) {
  const g = new THREE.Group(),
    wd = ghost
      ? new THREE.MeshBasicMaterial({
          color: 0x8affea,
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
        })
      : M(0xa9783f, { roughness: 0.9 }),
    dk = ghost ? wd : M(0x5a3a1e, { roughness: 1 }),
    fe = ghost ? wd : M(0x4a4e58, { metalness: 0.7, roughness: 0.4 });
  [-0.5, 0.5].forEach((x) => {
    const r = new THREE.Mesh(new THREE.BoxGeometry(0.16, 5.8, 0.12), wd);
    r.position.set(x, 2.9, 0);
    r.castShadow = !ghost;
    g.add(r);
  });
  for (let i = 0; i < 13; i++) {
    const rg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.0, 7),
      dk,
    );
    rg.rotation.z = Math.PI / 2;
    rg.position.set(0, 0.35 + i * 0.43, 0.02);
    rg.castShadow = !ghost;
    g.add(rg);
  }
  [-0.5, 0.5].forEach((x) => {
    const h = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.5), fe);
    h.position.set(x, 5.78, dir * 0.22);
    g.add(h);
    const ft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.3), fe);
    ft.position.set(x, 0.05, 0);
    g.add(ft);
  });
  g.rotation.x = dir * 0.28;
  g.position.set(6, 0, z0);
  g.traverse((o) => {
    o.userData.nocol = 1;
  });
  return g;
}
LADG.children.slice().forEach((c) => LADG.remove(c));
LADG.add(mkLadder(14.2, -1), mkLadder(10.8, 1));
const LADGHOST = new THREE.Group();
LADGHOST.add(mkLadder(14.2, -1, true), mkLadder(10.8, 1, true));
PG.add(LADGHOST);
// ---------- lighthouse climb + a real, visible zipline cable to the cellhouse roof
{
  const zA = P3(-22.4, 0.8, 10.4),
    zB = P3(-9.5, -2, 4.4),
    V = THREE.Vector3,
    cv = new THREE.CatmullRomCurve3([
      new V(...zA),
      new V(
        (zA[0] + zB[0]) / 2,
        (zA[1] + zB[1]) / 2 - 0.9,
        (zA[2] + zB[2]) / 2,
      ),
      new V(...zB),
    ]),
    steel = M(0xd0d4dc, { metalness: 0.7, roughness: 0.35 }),
    red = new THREE.MeshBasicMaterial({ color: 0xff3a2a });
  const cable = new THREE.Mesh(
    new THREE.TubeGeometry(cv, 40, 0.07, 6, false),
    steel,
  );
  cable.userData.nocol = 1;
  scene.add(cable);
  for (let i = 1; i < 9; i++) {
    const p = cv.getPoint(i / 9),
      f = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.03), red);
    f.position.copy(p);
    f.position.y -= 0.18;
    f.userData.nocol = 1;
    scene.add(f);
  }
  const handle = new THREE.Group(),
    w1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.08, 10),
      steel,
    );
  w1.rotation.x = Math.PI / 2;
  handle.add(w1);
  const bar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.9, 6),
    M(0x2a2a30),
  );
  bar.position.y = -0.5;
  handle.add(bar);
  const gr = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6),
    M(0x2a2a30),
  );
  gr.rotation.z = Math.PI / 2;
  gr.position.y = -0.95;
  handle.add(gr);
  handle.position.set(zA[0], zA[1] - 0.05, zA[2]);
  handle.traverse((o) => (o.userData.nocol = 1));
  scene.add(handle);
  const plat = new THREE.Mesh(
    new THREE.CylinderGeometry(2.4, 2.4, 0.2, 16),
    M(0x6a4a2a, { roughness: 1 }),
  );
  plat.position.set(-23, 10.1, 0);
  PG.add(plat);
  const rail = new THREE.Mesh(
    new THREE.TorusGeometry(2.3, 0.05, 5, 24),
    M(0x2a2a30),
  );
  rail.rotation.x = Math.PI / 2;
  rail.position.set(-23, 11.1, 0);
  PG.add(rail);
  for (let i = 0; i < 12; i++) {
    const p = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1, 5),
      M(0x2a2a30),
    );
    const a = (i / 12) * 6.283;
    p.position.set(-23 + Math.cos(a) * 2.3, 10.6, Math.sin(a) * 2.3);
    PG.add(p);
  }
  const wd = M(0x9a7040, { roughness: 1 }),
    ang = Math.atan2(3, 1.8),
    lx = -23 + Math.cos(ang) * 1.55,
    lz = Math.sin(ang) * 1.55,
    lg = new THREE.Group();
  [-0.4, 0.4].forEach((x) => {
    const r = new THREE.Mesh(new THREE.BoxGeometry(0.12, 10, 0.1), wd);
    r.position.set(x, 5, 0);
    lg.add(r);
  });
  for (let i = 0; i < 21; i++) {
    const rg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6),
      wd,
    );
    rg.rotation.z = Math.PI / 2;
    rg.position.set(0, 0.4 + i * 0.47, 0.03);
    lg.add(rg);
  }
  lg.position.set(lx, 0, lz);
  lg.rotation.y = -ang + Math.PI / 2;
  lg.traverse((o) => (o.userData.nocol = 1));
  PG.add(lg);
  const hatch = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.12, 1.3),
    M(0x5a3a1e, { roughness: 1 }),
  );
  hatch.position.set(-9.5, 4.3, -2);
  PG.add(hatch);
  const hh = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 5, 10), steel);
  hh.position.set(-9.5, 4.4, -2);
  hh.rotation.x = Math.PI / 2;
  PG.add(hh);
  const post = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 1.6, 0.22),
    M(0x4a3a2a, { roughness: 1 }),
  );
  post.position.set(-9.2, 5, -2.4);
  PG.add(post);
  const sg = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: signTex("🪂 ZIPLINE"), fog: false }),
  );
  sg.scale.set(2.2, 0.85, 1);
  sg.position.set(-21.4, 3.6, 3.4);
  PG.add(sg);
}
// ---------- autoCollide: the real shape of every prop, wall piece and building (replaces the old guessed circles)
const PROPSG = [];
scene.children
  .filter(
    (o) =>
      o.isGroup &&
      o !== PG &&
      Math.hypot(o.position.x - CMP[0], o.position.z - CMP[1]) < 62 &&
      !GD.some((g) => g.g === o) &&
      o !== DOG.g &&
      o !== LH,
  )
  .forEach((o) => PROPSG.push(o));
const COLMADE = [autoCollide(PG, { r: 0.1 })];
PROPSG.forEach((g) => COLMADE.push(autoCollide(g, { r: 0.1 })));
PROPS_READY = true;
// ---------- character: a prison with a past
function canvasTex(w, h, fn) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  fn(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 4;
  return t;
}
function poster(lx, lz, y, ry, w, h, tex) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({
      map: tex,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  m.position.set(lx, y, lz);
  m.rotation.y = ry;
  m.userData.nocol = 1;
  PG.add(m);
  return m;
}
const WANTED = canvasTex(256, 340, (g) => {
  g.fillStyle = "#d8c79a";
  g.fillRect(0, 0, 256, 340);
  for (let i = 0; i < 120; i++) {
    g.fillStyle = `rgba(90,60,30,${hs(i, 600, 1) * 0.12})`;
    g.fillRect(hs(i, 601, 1) * 256, hs(i, 602, 1) * 340, 18, 6);
  }
  g.fillStyle = "#2a1a10";
  g.font = "bold 46px Georgia";
  g.textAlign = "center";
  g.fillText("WANTED", 128, 56);
  g.fillStyle = "#f0b060";
  g.beginPath();
  g.arc(128, 160, 58, 0, 6.283);
  g.fill();
  g.fillStyle = "#f0b060";
  [
    [-44, -46],
    [44, -46],
  ].forEach(([x, y]) => {
    g.beginPath();
    g.moveTo(128 + x * 0.55, 160 + y * 0.6);
    g.lineTo(128 + x * 1.1, 160 + y * 1.5);
    g.lineTo(128 + x * 1.55, 160 + y * 0.4);
    g.fill();
  });
  g.fillStyle = "#2a1a10";
  g.beginPath();
  g.ellipse(106, 150, 8, 11, 0, 0, 6.283);
  g.ellipse(150, 150, 8, 11, 0, 0, 6.283);
  g.fill();
  g.fillRect(124, 166, 8, 6);
  g.strokeStyle = "#2a1a10";
  g.lineWidth = 3;
  [
    [-1, 0],
    [-1, 10],
    [1, 0],
    [1, 10],
  ].forEach(([s, o]) => {
    g.beginPath();
    g.moveTo(128 + s * 20, 172 + o * 0.3);
    g.lineTo(128 + s * 72, 164 + o);
    g.stroke();
  });
  g.font = "bold 26px Georgia";
  g.fillText("TWOMBLY", 128, 250);
  g.font = "16px Georgia";
  g.fillText("Crime: being far too cute", 128, 278);
  g.fillText("Reward: one (1) fish", 128, 300);
  g.strokeStyle = "#2a1a10";
  g.lineWidth = 5;
  g.strokeRect(6, 6, 244, 328);
});
const SCRATCH = canvasTex(256, 128, (g) => {
  g.fillStyle = "rgba(0,0,0,0)";
  g.clearRect(0, 0, 256, 128);
  g.strokeStyle = "rgba(30,26,24,.85)";
  g.lineWidth = 3;
  g.font = "bold 22px Georgia";
  g.fillStyle = "rgba(30,26,24,.85)";
  g.textAlign = "left";
  g.fillText("E.D. 1815", 14, 30);
  g.font = "16px Georgia";
  g.fillText("liberté — un jour", 14, 56);
  for (let k = 0; k < 4; k++)
    for (let i = 0; i < 4; i++) {
      g.beginPath();
      g.moveTo(14 + k * 34 + i * 6, 76);
      g.lineTo(14 + k * 34 + i * 6, 106);
      g.stroke();
    }
});
poster(-2.6, -5, 1.9, Math.PI / 2, 1.1, 1.5, WANTED);
poster(12.4, -7.6, 1.8, -Math.PI / 2, 1.1, 1.5, WANTED);
poster(14.6, -7, 1.9, -Math.PI / 2, 1.1, 1.5, WANTED);
poster(-6, -12.05, 2.0, 0, 2.4, 1.2, SCRATCH);
poster(4, 12.05, 2.0, Math.PI, 2.4, 1.2, SCRATCH);
// flag, laundry, hoop, bench, yardLamps, burning barrel, sandbags
const flagPole = new THREE.Mesh(
  new THREE.CylinderGeometry(0.13, 0.17, 17, 8),
  M(0x9a9aa2, { metalness: 0.5 }),
);
flagPole.position.set(9.5, 8.5, 2.4);
PG.add(flagPole);
const flagTex = canvasTex(128, 80, (g) => {
  g.fillStyle = "#2a3f8a";
  g.fillRect(0, 0, 43, 80);
  g.fillStyle = "#cfcfcf";
  g.fillRect(43, 0, 42, 80);
  g.fillStyle = "#9a2a30";
  g.fillRect(85, 0, 43, 80);
  for (let i = 0; i < 90; i++) {
    g.fillStyle = `rgba(40,36,30,${hs(i, 610, 1) * 0.25})`;
    g.fillRect(hs(i, 611, 1) * 128, hs(i, 612, 1) * 80, 12, 3);
  }
});
const flagG = new THREE.PlaneGeometry(8.4, 5.6, 30, 8),
  flag = new THREE.Mesh(
    flagG,
    new THREE.MeshBasicMaterial({
      map: flagTex,
      side: THREE.DoubleSide,
      fog: false,
    }),
  );
flag.position.set(13.85, 13.9, 2.4);
flag.rotation.y = 0;
flag.userData.nocol = 1;
PG.add(flag);
const fp0 = Float32Array.from(flagG.attributes.position.array);
const jumps = [],
  jm = [0xe07a1a, 0xd86a10, 0xe89030, 0xc85a10];
[
  [1.6, 5.6],
  [3.2, 5.6],
  [4.9, 5.6],
  [6.6, 5.6],
].forEach(([x, z], i) => {
  const g = new THREE.Group(),
    b = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.9, 0.08),
      M(jm[i], { roughness: 1 }),
    );
  b.position.y = -0.55;
  g.add(b);
  [-0.4, 0.4].forEach((s) => {
    const a = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.6, 0.07),
      M(jm[i], { roughness: 1 }),
    );
    a.position.set(s, -0.4, 0);
    a.rotation.z = s * 0.5;
    g.add(a);
  });
  g.position.set(x, 2.5, z);
  g.userData.ph = i;
  PG.add(g);
  jumps.push(g);
});
[
  [0.4, 5.6],
  [7.6, 5.6],
].forEach(([x, z]) => {
  const p = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 2.8, 6),
    M(0x4a3a2a),
  );
  p.position.set(x, 1.4, z);
  PG.add(p);
});
{
  const ln = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0.4, 2.7, 5.6),
    new THREE.Vector3(4, 2.45, 5.6),
    new THREE.Vector3(7.6, 2.7, 5.6),
  ]);
  const l = new THREE.Line(
    ln,
    new THREE.LineBasicMaterial({ color: 0x8a8470 }),
  );
  l.frustumCulled = false;
  PG.add(l);
}
{
  const g = new THREE.Group(),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  A(new THREE.CylinderGeometry(0.07, 0.09, 3.1, 6), M(0x55555e), 0, 1.55, 0);
  A(new THREE.BoxGeometry(0.08, 0.9, 1.6), M(0xe8e8ee), 0, 3.4, 0.1);
  const ring = A(
    new THREE.TorusGeometry(0.32, 0.025, 5, 14),
    M(0xe05a1a),
    0.35,
    3.1,
    0.1,
  );
  ring.rotation.y = Math.PI / 2;
  ring.rotation.x = Math.PI / 2;
  ring.rotation.set(Math.PI / 2, 0, 0);
  ring.position.set(0.4, 3.1, 0.1);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 6.283,
      n = A(
        new THREE.CylinderGeometry(0.015, 0.015, 0.4, 3),
        M(0xdcdcdc),
        0.4 + Math.cos(a) * 0.28,
        2.9,
        0.1 + Math.sin(a) * 0.28,
      );
  }
  g.position.set(12.5, 0, 9.5);
  g.rotation.y = -1.57;
  PG.add(g);
}
{
  const g = new THREE.Group(),
    A = (geo, mat, x, y, z) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      g.add(m);
      return m;
    };
  A(new THREE.BoxGeometry(2, 0.12, 0.6), M(0x6a5a44), 0, 0.5, 0);
  [-0.8, 0.8].forEach((x) =>
    A(new THREE.BoxGeometry(0.1, 0.5, 0.5), M(0x3a3a42), x, 0.25, 0),
  );
  A(new THREE.BoxGeometry(2.2, 0.08, 0.1), M(0x2a2a30), 0, 1.05, 0.9);
  const wm = M(0x1a1a20, { metalness: 0.7, roughness: 0.4 });
  [-1, 1].forEach((s) => {
    const d = A(
      new THREE.CylinderGeometry(0.28, 0.28, 0.12, 10),
      wm,
      s * 0.95,
      1.05,
      0.9,
    );
    d.rotation.z = Math.PI / 2;
  });
  g.position.set(3.2, 0, 10.6);
  PG.add(g);
}
const yardLamps = [];
[
  [13.6, -4],
  [2, 4],
  [14, 11],
  [-1.5, -9.8],
  [8, -1.2],
  [3.4, -5.5],
].forEach(([x, z], i) => {
  const g = new THREE.Group(),
    pm = M(0x3a3a42, { metalness: 0.5, roughness: 0.6 });
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 4.6, 6), pm);
  p.position.y = 2.3;
  g.add(p);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1, 0.08, 0.1), pm);
  arm.position.set(0.4, 4.6, 0);
  g.add(arm);
  const hd = new THREE.Mesh(
    new THREE.ConeGeometry(0.4, 0.3, 8, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x2a2a30, side: THREE.DoubleSide }),
  );
  hd.position.set(0.9, 4.5, 0);
  g.add(hd);
  const bulb = new THREE.Mesh(
    G.crown,
    new THREE.MeshBasicMaterial({ color: 0xffb050 }),
  );
  bulb.scale.setScalar(0.15);
  bulb.position.set(0.9, 4.38, 0);
  g.add(bulb);
  const ha = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xff9a40,
      transparent: true,
      blending: THREE.AdditiveBlending,
      fog: false,
      opacity: 0.6,
    }),
  );
  ha.scale.set(6, 6, 1);
  ha.position.set(0.9, 4.2, 0);
  g.add(ha);
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(2.6, 4.3, 14, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xffa850,
      transparent: true,
      opacity: 0.05,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      fog: false,
    }),
  );
  cone.userData.nocol = 1;
  cone.position.set(0.9, 2.2, 0);
  g.add(cone);
  g.position.set(x, 0, z);
  g.rotation.y = i * 1.3;
  PG.add(g);
  yardLamps.push({ ha, cone, bulb, i });
});
const fireB = new THREE.Group();
{
  const b = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.4, 1, 10),
    M(0x7a3a1a, { metalness: 0.5, roughness: 0.7 }),
  );
  b.position.y = 0.5;
  fireB.add(b);
  const fl = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.9, 7),
    new THREE.MeshBasicMaterial({ color: 0xff9a30 }),
  );
  fl.position.y = 1.35;
  fireB.add(fl);
  const ha = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xff9040,
      transparent: true,
      blending: THREE.AdditiveBlending,
      fog: false,
    }),
  );
  ha.scale.set(7, 7, 1);
  ha.position.y = 1.6;
  fireB.add(ha);
  fireB.userData = { fl, ha };
  fireB.position.set(13.2, 0, 3.4);
  PG.add(fireB);
}
{
  const sb = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.8, 0.35, 0.45),
      M(0xb8a878, { roughness: 1 }),
      20,
    ),
    m4 = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e = new THREE.Euler();
  let n = 0;
  for (let r = 0; r < 3; r++)
    for (let i = 0; i < 7 - r; i++) {
      e.set(0, (hs(i, 620 + r, 1) - 0.5) * 0.2, 0);
      q.setFromEuler(e);
      m4.compose(
        new THREE.Vector3(3.2 + i * 0.82 + r * 0.4, 0.18 + r * 0.35, -3.6),
        q,
        new THREE.Vector3(1, 1, 1),
      );
      sb.setMatrixAt(n++, m4);
    }
  sb.count = n;
  sb.castShadow = true;
  PG.add(sb);
  sb.userData.nocol = 0;
  const bx = new THREE.Mesh(
    new THREE.BoxGeometry(6.2, 1.1, 0.5),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  bx.position.set(5.9, 0.55, -3.6);
  PG.add(bx);
  autoCollide(bx, { r: 0.1 });
}
// crows on the walls and gulls over the sea
const crows = [];
[
  [-6, 12.5],
  [3, 12.5],
  [11, 12.5],
  [-13, 4],
  [-13, -6],
  [15, -8],
  [0, -12.5],
  [8, -12.5],
].forEach(([x, z], i) => {
  const g = new THREE.Group(),
    b = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.5), M(0x0a0a0e));
  b.position.y = 0.12;
  g.add(b);
  const h = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.14, 0.16),
    M(0x0a0a0e),
  );
  h.position.set(0, 0.26, 0.24);
  g.add(h);
  const bk = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 4), M(0xd8a030));
  bk.position.set(0, 0.24, 0.38);
  bk.rotation.x = Math.PI / 2;
  g.add(bk);
  g.position.set(x, 4.45, z);
  g.rotation.y = hs(i, 630, 1) * 6.28;
  g.userData = { ph: i, fly: 0 };
  PG.add(g);
  crows.push(g);
});
const gulls = [];
for (let i = 0; i < 5; i++) {
  const g = new THREE.Group(),
    b = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.5), M(0xf0f0f4));
  g.add(b);
  const w = [-1, 1].map((s) => {
    const wg = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.03, 0.22),
      M(0xf0f0f4),
    );
    wg.position.set(s * 0.4, 0, 0);
    const pv = new THREE.Group();
    pv.add(wg);
    g.add(pv);
    return pv;
  });
  g.userData = {
    a: i * 1.3,
    r: 24 + i * 5,
    h: 15 + i * 2.5,
    sp: 0.18 + i * 0.03,
    w,
  };
  scene.add(g);
  gulls.push(g);
}
// rusty pipes with steam along the cellhouse wall
const steam = [];
{
  const pm = M(0x6a4a30, { metalness: 0.6, roughness: 0.8 });
  [0.5, 1.4].forEach((y) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 12, 7), pm);
    p.rotation.x = Math.PI / 2;
    p.position.set(-2.55, y + 1, 0);
    p.userData.nocol = 1;
    PG.add(p);
  });
  for (let i = 0; i < 3; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0xd8d8d8,
        transparent: true,
        fog: false,
        opacity: 0.3,
      }),
    );
    s.scale.set(1.6, 1.6, 1);
    s.userData = { z: -4 + i * 3.6, t: i * 0.9 };
    PG.add(s);
    steam.push(s);
  }
}
function flickerPattern(t, i) {
  return i === 2
    ? Math.sin(t * 37) > 0.55 && Math.sin(t * 5.3) > 0
      ? 0.15
      : 1
    : 0.85 + 0.15 * Math.sin(t * 3 + i);
}
let bellT = 25;
function char38Tick(dt, t) {
  if (!PROPS_READY) return;
  const near = Math.hypot(me3.x - CMP[0], me3.z - CMP[1]) < 95;
  if (!near) return;
  const pa = flagG.attributes.position;
  for (let i = 0; i < pa.count; i++) {
    const x = fp0[i * 3],
      w = (x + 4.2) / 8.4;
    pa.setZ(
      i,
      Math.sin(t * 2.2 + x * 0.9) * 0.75 * w +
        Math.sin(t * 4.1 + x * 1.6) * 0.16 * w,
    );
    pa.setY(i, fp0[i * 3 + 1] - w * w * 0.35);
  }
  pa.needsUpdate = true;
  jumps.forEach((g) => {
    g.rotation.z =
      Math.sin(t * 1.7 + g.userData.ph) * 0.14 * (1 + 0.4 * Math.sin(t * 0.3));
    g.rotation.x = Math.sin(t * 1.3 + g.userData.ph * 2) * 0.06;
  });
  yardLamps.forEach((l) => {
    const f = flickerPattern(t, l.i) * (0.5 + 0.5 * Math.max(NIGHTK, 0.45));
    l.ha.material.opacity = 0.6 * f;
    l.cone.material.opacity = 0.05 * f;
    l.bulb.material.color.setRGB(1, 0.7 * f + 0.1, 0.3);
  });
  const fu = fireB.userData;
  fu.fl.scale.set(
    1 + Math.sin(t * 13) * 0.1,
    1 + Math.sin(t * 17) * 0.22,
    1 + Math.sin(t * 11) * 0.1,
  );
  fu.ha.material.opacity = 0.6 + 0.25 * Math.sin(t * 9);
  steam.forEach((s) => {
    const u = s.userData;
    u.t = (u.t + dt * 0.5) % 1;
    s.position.set(-2.4, 1.6 + u.t * 2.2, u.z);
    s.material.opacity = 0.3 * Math.sin(u.t * Math.PI);
    s.scale.setScalar(1 + u.t * 1.6);
  });
  crows.forEach((c, i) => {
    const u = c.userData;
    if (u.fly > 0) {
      u.fly -= dt;
      c.position.y += dt * 4;
      c.position.x += Math.sin(i) * dt * 3;
      if (u.fly <= 0) {
        c.visible = false;
        u.back = 22;
      }
      return;
    }
    if (!c.visible) {
      u.back -= dt;
      if (u.back <= 0) {
        const p = c.userData;
        c.position.y = 4.45;
        c.position.x -= Math.sin(i) * 3 * 2;
        c.visible = true;
      }
      return;
    }
    c.position.y = 4.45 + Math.max(0, Math.sin(t * 2 + i * 3) - 0.97) * 2;
    const w = P2L(c.position.x, c.position.z);
    if (Math.hypot(me3.x - w[0], me3.z - w[1]) < 4.5) {
      u.fly = 2.2;
      tone(520 + i * 30, 0.12, "square", 0.04);
      tone(430, 0.14, "square", 0.04, 0.12);
    }
  });
  gulls.forEach((g, i) => {
    const u = g.userData;
    u.a += dt * u.sp;
    const w = P2L(Math.cos(u.a) * u.r, Math.sin(u.a) * u.r);
    g.position.set(w[0], u.h + Math.sin(t * 0.7 + i) * 1.5, w[1]);
    g.rotation.y = -u.a - Math.PI / 2 + LA * 0;
    const f = Math.sin(t * 6 + i) * 0.5;
    u.w[0].rotation.z = f;
    u.w[1].rotation.z = -f;
    if (Math.random() < dt * 0.04)
      tone(900 + Math.random() * 300, 0.25, "sine", 0.015);
  });
  bellT -= dt;
  if (bellT <= 0) {
    bellT = 40 + Math.random() * 30;
    if (PRIS.onI) {
      tone(110, 1.4, "sine", 0.1);
      tone(165, 1.2, "sine", 0.05, 0.05);
    }
  }
}
autoCollide(PG, { r: 0.1 });
const exTick10 = window.exTick;
window.exTick = function (dt, t) {
  exTick10(dt, t);
  if (!ready) return;
  giftTick();
  char38Tick(dt, t);
  LADGHOST.visible = !PRIS.ladder;
}; // ===================================================================

// v3.9 forest upgrade: richer trees, undergrowth, light shafts, spores, magical glade at the sea side
// ===================================================================
(function forestUp() {
  const FOLL = (window.FOLL = window.FOLL || []);
  const I = HFI,
    col = new THREE.Color(),
    m4 = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e = new THREE.Euler(),
    sc = new THREE.Vector3(),
    ps = new THREE.Vector3(),
    Z0 = new THREE.Matrix4().makeScale(0, 0, 0);
  const R = (i, a, b) => hs(i, a, b || 1);
  // ---- jewel-tone trees: warm/violet bark, emerald / teal / indigo canopies, soft self-glow so nothing is pitch black
  const TC = [0x5a4640, 0x463a52, 0x634a36, 0x384a46],
    CC = [0x1f7a52, 0x2a9a7a, 0x4f35a0, 0x1a6a80, 0x3a8a3a, 0x7a3fb0, 0x1f8a66];
  I.trunk.material.emissive.setHex(0x1a0f22);
  I.trunk.material.emissiveIntensity = 0.55;
  I.can.material.emissive.setHex(0x0c3a2e);
  I.can.material.emissiveIntensity = 0.75;
  I.br.material.emissive.setHex(0x120a18);
  I.br.material.emissiveIntensity = 0.5;
  hfTrees.forEach((it, k) => {
    const tr = it.tr;
    I.trunk.setColorAt(tr.i, col.setHex(TC[k % 4]));
    tr.ci.forEach((c, j) =>
      I.can.setColorAt(c, col.setHex(CC[(k * 3 + j * 2 + (k >> 2)) % 7])),
    );
    tr.bi.forEach((b) => I.br.setColorAt(b, col.setHex(TC[(k + 1) % 4])));
  });
  I.trunk.instanceColor.needsUpdate =
    I.can.instanceColor.needsUpdate =
    I.br.instanceColor.needsUpdate =
      true;
  // ---- per-tree add-ons: root flares, hanging vines, glowing bracket fungi
  const N = hfTrees.length,
    rootM = new THREE.InstancedMesh(
      new THREE.ConeGeometry(0.34, 1.5, 5).translate(0, 0.75, 0),
      M(0xffffff, { roughness: 1, emissive: 0x120a18, emissiveIntensity: 0.5 }),
      N * 5,
    ),
    vineM = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.018, 0.05, 1, 4).translate(0, -0.5, 0),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.9,
        emissive: 0x1a6a3a,
        emissiveIntensity: 0.8,
      }),
      N * 5,
    ),
    fungM = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.34, 8, 5, 0, 6.283, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      N * 3,
    );
  let nr = 0,
    nv = 0,
    nf = 0;
  const FC = [0x4affd0, 0xff7ae0, 0x8a7aff, 0x7affb0, 0xffd36a];
  hfTrees.forEach((it, k) => {
    const tr = it.tr,
      s = tr.s,
      gy = tr.gy;
    tr.up = { r: [], v: [], f: [] };
    for (let j = 0; j < 5; j++) {
      const a = s.a + j * 1.257 + R(k, 600 + j) * 0.5;
      e.set(0, a, -1.15 - R(k, 610 + j) * 0.25);
      q.setFromEuler(e);
      m4.compose(
        ps.set(s.x, gy + 0.1, s.z),
        q,
        sc.set(s.r * 2.2, 1 + R(k, 620 + j) * 1.1, s.r * 2.2),
      );
      rootM.setMatrixAt(nr, m4);
      rootM.setColorAt(nr, col.setHex(TC[k % 4]));
      tr.up.r.push(nr++);
    }
    for (let j = 0; j < 5; j++) {
      const a = R(k, 630 + j) * 6.283,
        rr = 1.1 + R(k, 640 + j) * 1.4,
        L = 1.6 + R(k, 650 + j) * 3.2;
      m4.compose(
        ps.set(
          s.x + Math.cos(a) * rr,
          gy + s.h - 0.9 - R(k, 660 + j) * 0.7,
          s.z + Math.sin(a) * rr,
        ),
        q.identity(),
        sc.set(1, L, 1),
      );
      vineM.setMatrixAt(nv, m4);
      vineM.setColorAt(nv, col.setHex([0x2f8a4a, 0x3fae6a, 0x6a4aa8][j % 3]));
      tr.up.v.push(nv++);
    }
    for (let j = 0; j < 3; j++) {
      const a = R(k, 670 + j) * 6.283,
        f = 0.14 + R(k, 680 + j) * 0.5,
        rad = s.r * 2 * (1 - 0.5 * f) * 1.02;
      e.set(0, a, -Math.PI / 2);
      q.setFromEuler(e);
      m4.compose(
        ps.set(s.x + Math.cos(a) * rad, gy + s.h * f, s.z - Math.sin(a) * rad),
        q,
        sc.set(s.r * 3.2, s.r * 3, s.r * 3.2),
      );
      fungM.setMatrixAt(nf, m4);
      fungM.setColorAt(nf, col.setHex(FC[(k + j) % 5]));
      tr.up.f.push(nf++);
    }
  });
  [rootM, vineM, fungM].forEach((o) => {
    o.count = o === rootM ? nr : o === vineM ? nv : nf;
    o.instanceMatrix.needsUpdate = true;
    if (o.instanceColor) o.instanceColor.needsUpdate = true;
    o.frustumCulled = false;
    HFG.add(o);
  });
  rootM.castShadow = true;
  // ---- undergrowth: ferns, grass tufts, glowing flowers, mossy boulders, fallen logs
  function frond(nf2, len, wid, droop, h) {
    const pos = [],
      idx = [];
    for (let f = 0; f < nf2; f++) {
      const a = (f / nf2) * 6.283 + (f % 2) * 0.35,
        ca = Math.cos(a),
        sa = Math.sin(a),
        b = pos.length / 3;
      for (let s = 0; s <= 3; s++) {
        const u = s / 3,
          r = len * u,
          y = h * Math.sin(u * 1.45) - droop * u * u,
          w = wid * (1 - u * 0.85) * (s ? 1 : 0.4),
          px = ca * r,
          pz = sa * r;
        pos.push(px + sa * w, y, pz - ca * w, px - sa * w, y, pz + ca * w);
      }
      for (let s = 0; s < 3; s++) {
        const j = b + s * 2;
        idx.push(j, j + 1, j + 2, j + 1, j + 3, j + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
  }
  const cell = new Map(),
    ck = (x, z) => Math.floor(x / 3) + "," + Math.floor(z / 3);
  hfTrees.forEach((it) => {
    const k = ck(it.tr.s.x, it.tr.s.z);
    if (!cell.has(k)) cell.set(k, []);
    cell.get(k).push(it.tr.s);
  });
  const nearTree = (x, z, d) => {
    const cx = Math.floor(x / 3),
      cz = Math.floor(z / 3);
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++) {
        const a = cell.get(cx + i + "," + (cz + j));
        if (a)
          for (const s of a)
            if (Math.hypot(s.x - x, s.z - z) < s.r * 2 + d) return true;
      }
    return false;
  };
  const gx = () => HEART.x,
    gz = () => HEART.z,
    dg = (x, z) => Math.hypot(x - gx(), z - gz());
  const spot = (i, seed, pad, rune) => {
    for (let t = 0; t < 12; t++) {
      const x = HAUNT.x + (R(i * 13 + t, seed) - 0.5) * 2 * HAUNT.R,
        z = HAUNT.z + (R(i * 13 + t, seed + 1) - 0.5) * 2 * HAUNT.hz;
      if (gh(x, z) < 0.95 || !hauntLand(x, z)) continue;
      if (rune && dg(x, z) < 6.6) continue;
      if (window.HOUSE && Math.hypot(x - HOUSE.x, z - HOUSE.z) < 4) continue;
      if (nearTree(x, z, pad)) continue;
      return [x, z];
    }
    return null;
  };
  const mats = (c) =>
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      side: THREE.DoubleSide,
      emissive: c,
      emissiveIntensity: 0.6,
    });
  const fern = new THREE.InstancedMesh(
      frond(7, 1.15, 0.16, 0.55, 0.55),
      mats(0x0a2a1a),
      560,
    ),
    grass = new THREE.InstancedMesh(
      frond(9, 0.28, 0.05, 0.08, 0.8),
      mats(0x0c2a14),
      1200,
    );
  const FG = [0x2f9a5a, 0x3fba6a, 0x1f7a58, 0x5a4aa8, 0x2a8a8a],
    GG = [0x3faa4a, 0x5acb5a, 0x2f8a3a, 0x7ac85a, 0x2faa7a];
  let nF = 0,
    nG = 0;
  for (let i = 0; i < 900 && nF < 560; i++) {
    const p = spot(i, 700, 0.5, true);
    if (!p) continue;
    e.set(0, R(i, 702) * 6.283, 0);
    q.setFromEuler(e);
    const s = 0.7 + R(i, 703) * 0.9;
    m4.compose(
      ps.set(p[0], gh(p[0], p[1]) - 0.02, p[1]),
      q,
      sc.set(s, s * (0.8 + R(i, 704) * 0.5), s),
    );
    fern.setMatrixAt(nF, m4);
    fern.setColorAt(nF, col.setHex(FG[i % 5]));
    nF++;
  }
  for (let i = 0; i < 2600 && nG < 1200; i++) {
    const p = spot(i, 710, 0.35, true);
    if (!p) continue;
    e.set(0, R(i, 712) * 6.283, 0);
    q.setFromEuler(e);
    const s = 0.6 + R(i, 713) * 0.6;
    m4.compose(
      ps.set(p[0], gh(p[0], p[1]) - 0.02, p[1]),
      q,
      sc.set(s, s * (0.45 + R(i, 714) * 0.5), s),
    );
    grass.setMatrixAt(nG, m4);
    grass.setColorAt(nG, col.setHex(GG[i % 5]));
    nG++;
  }
  fern.userData.fol = { k: "fern", m: fern };
  grass.userData.fol = { k: "grass", m: grass };
  FOLL.push(fern, grass);
  [
    [fern, nF],
    [grass, nG],
  ].forEach(([o, n]) => {
    o.count = n;
    o.instanceMatrix.needsUpdate = true;
    o.instanceColor.needsUpdate = true;
    o.frustumCulled = false;
    HFG.add(o);
  });
  // glowing flowers (stem + bloom)
  const stemM = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.015, 0.03, 1, 4).translate(0, 0.5, 0),
      new THREE.MeshStandardMaterial({ color: 0x2a7a3a, roughness: 1 }),
      260,
    ),
    bloomM = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.13, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      260,
    ),
    FL = [0x4affd0, 0xff7ae0, 0xa58aff, 0xffe27a, 0x7affb0];
  let nB = 0;
  for (let i = 0; i < 700 && nB < 260; i++) {
    const p = spot(i, 720, 0.4, false);
    if (!p) continue;
    const h = 0.35 + R(i, 722) * 0.55,
      y = gh(p[0], p[1]);
    m4.compose(ps.set(p[0], y, p[1]), q.identity(), sc.set(1, h, 1));
    stemM.setMatrixAt(nB, m4);
    m4.compose(
      ps.set(p[0], y + h, p[1]),
      q.identity(),
      sc.set(1 + R(i, 723) * 0.7, 1, 1 + R(i, 723) * 0.7),
    );
    bloomM.setMatrixAt(nB, m4);
    bloomM.setColorAt(nB, col.setHex(FL[i % 5]));
    nB++;
  }
  stemM.count = bloomM.count = nB;
  stemM.instanceMatrix.needsUpdate =
    bloomM.instanceMatrix.needsUpdate =
    bloomM.instanceColor.needsUpdate =
      true;
  stemM.frustumCulled = bloomM.frustumCulled = false;
  HFG.add(stemM, bloomM);
  stemM.userData.fol = bloomM.userData.fol = {
    k: "flower",
    m: bloomM,
    s: stemM,
  };
  FOLL.push(stemM, bloomM);
  // mossy boulders (solid) and fallen logs
  const bGeo = new THREE.IcosahedronGeometry(1, 1),
    bMat = M(0xffffff, {
      roughness: 1,
      flatShading: true,
      emissive: 0x0a1a14,
      emissiveIntensity: 0.5,
    });
  for (let i = 0; i < 34; i++) {
    const p = spot(i, 730, 1.2, true);
    if (!p) continue;
    const s = 0.6 + R(i, 731) * 1.1,
      b = new THREE.Mesh(bGeo, bMat.clone());
    b.material.color.setHex([0x5a6a58, 0x4a5a4e, 0x6a7060, 0x55644a][i % 4]);
    b.scale.set(s * 1.2, s * 0.75, s);
    b.position.set(p[0], gh(p[0], p[1]) + s * 0.15, p[1]);
    b.rotation.set(R(i, 732) * 0.4, R(i, 733) * 6, R(i, 734) * 0.4);
    b.castShadow = true;
    HFG.add(b);
    const cap = new THREE.Mesh(
      bGeo,
      new THREE.MeshStandardMaterial({
        color: 0x3a8a4a,
        roughness: 1,
        flatShading: true,
        emissive: 0x0a3a1a,
        emissiveIntensity: 0.5,
      }),
    );
    cap.scale.set(s * 1.05, s * 0.32, s * 0.9);
    cap.position.set(p[0], gh(p[0], p[1]) + s * 0.62, p[1]);
    cap.rotation.copy(b.rotation);
    HFG.add(cap);
    const cl2 = { x: p[0], z: p[1], r: s * 0.95 };
    COLL.push(cl2);
    b.userData.fol = cap.userData.fol = {
      k: "boulder",
      o: [b, cap],
      c: cl2,
      hp: 4,
      id: "b" + i,
    };
    FOLL.push(b, cap);
  }
  const logM = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.34, 0.42, 3.4, 8),
    M(0xffffff, { roughness: 1, emissive: 0x120a14, emissiveIntensity: 0.5 }),
    16,
  );
  let nL = 0;
  for (let i = 0; i < 60 && nL < 16; i++) {
    const p = spot(i, 740, 1.6, true);
    if (!p) continue;
    e.set(0, R(i, 742) * 6.283, Math.PI / 2);
    q.setFromEuler(e);
    m4.compose(
      ps.set(p[0], gh(p[0], p[1]) + 0.3, p[1]),
      q,
      sc.set(1, 0.7 + R(i, 743) * 0.8, 1),
    );
    logM.setMatrixAt(nL, m4);
    logM.setColorAt(nL, col.setHex([0x4a3a32, 0x3c3040, 0x5a4630][i % 3]));
    nL++;
  }
  logM.count = nL;
  logM.instanceMatrix.needsUpdate = logM.instanceColor.needsUpdate = true;
  logM.frustumCulled = false;
  logM.castShadow = true;
  HFG.add(logM);
  logM.userData.fol = { k: "log", m: logM };
  FOLL.push(logM);
  // ---- light shafts through the canopy
  const shafts = [];
  for (let i = 0; i < 20; i++) {
    const p = spot(i, 750, 0, false) || [HAUNT.x, HAUNT.z],
      m = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 3.4, 26, 10, 1, true),
        new THREE.MeshBasicMaterial({
          color: 0xfff0b8,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          fog: false,
        }),
      );
    m.position.set(p[0], gh(p[0], p[1]) + 11, p[1]);
    m.rotation.set(0.1 + R(i, 751) * 0.1, R(i, 752) * 6, 0.32);
    m.userData = { ph: i * 1.7, b: 0.03 + R(i, 753) * 0.035 };
    HFG.add(m);
    shafts.push(m);
  }
  // ---- drifting spores / fireflies around the player while in the forest
  const SP = 460,
    spPos = new Float32Array(SP * 3),
    spCol = new Float32Array(SP * 3),
    spB = [];
  for (let i = 0; i < SP; i++) {
    spB.push([
      R(i, 760) * 40,
      R(i, 761) * 40,
      R(i, 762) * 40,
      0.3 + R(i, 763) * 0.6,
      R(i, 764) * 6.283,
    ]);
    col.setHex([0x9ff4ff, 0xffe27a, 0xffc8ff, 0xb8ffd0][i % 4]);
    spCol[i * 3] = col.r;
    spCol[i * 3 + 1] = col.g;
    spCol[i * 3 + 2] = col.b;
  }
  const spG = new THREE.BufferGeometry();
  spG.setAttribute("position", new THREE.BufferAttribute(spPos, 3));
  spG.setAttribute("color", new THREE.BufferAttribute(spCol, 3));
  const spM = new THREE.PointsMaterial({
      size: 0.26,
      map: new THREE.CanvasTexture(dotC),
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    }),
    spores = new THREE.Points(spG, spM);
  spores.frustumCulled = false;
  spores.visible = false;
  scene.add(spores);
  // ---- the glade by the sea: giant blossoms, rising lanterns
  const gl = new THREE.Group(),
    GY = gh(gx(), gz()),
    blooms = [],
    lant = [];
  gl.position.set(gx(), GY, gz());
  HFG.add(gl);
  const petal = new THREE.SphereGeometry(1, 8, 6);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * 6.283 + 0.3,
      d = 5.2 + R(i, 770) * 3.4,
      x = gx() + Math.cos(a) * d,
      z = gz() + Math.sin(a) * d;
    if (!hauntLand(x, z)) continue;
    const g = new THREE.Group(),
      h = 1.6 + R(i, 771) * 1.6,
      c = [0xff7ae0, 0x4affd0, 0xa58aff, 0xffe27a][i % 4];
    const st = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.09, h, 6).translate(0, h / 2, 0),
      new THREE.MeshStandardMaterial({
        color: 0x2f8a4a,
        roughness: 1,
        emissive: 0x0a3a1a,
        emissiveIntensity: 0.6,
      }),
    );
    g.add(st);
    const hd = new THREE.Group();
    hd.position.y = h;
    hd.rotation.x = 0.35;
    g.add(hd);
    for (let k = 0; k < 9; k++) {
      const p = new THREE.Mesh(
        petal,
        new THREE.MeshStandardMaterial({
          color: c,
          emissive: c,
          emissiveIntensity: 0.8,
          roughness: 0.4,
          flatShading: true,
        }),
      );
      p.scale.set(0.5, 0.08, 0.2);
      const pa = (k / 9) * 6.283;
      p.position.set(Math.cos(pa) * 0.5, 0.08, Math.sin(pa) * 0.5);
      p.rotation.set(0, -pa, 0.25);
      hd.add(p);
    }
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xfff6c0 }),
    );
    core.position.y = 0.12;
    hd.add(core);
    const ha = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: c,
        transparent: true,
        blending: THREE.AdditiveBlending,
        fog: false,
        opacity: 0.5,
      }),
    );
    ha.scale.set(3.6, 3.6, 1);
    ha.position.y = 0.2;
    hd.add(ha);
    g.position.set(x - gx(), gh(x, z) - GY, z - gz());
    g.rotation.y = a;
    gl.add(g);
    blooms.push({ g: hd, ha, ph: i });
  }
  for (let i = 0; i < 16; i++) {
    const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 8, 6),
        new THREE.MeshBasicMaterial({
          color: [0xffd89a, 0xffb0d8, 0xa8ffe8][i % 3],
        }),
      ),
      ha = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: HALO,
          color: [0xffc87a, 0xff8ac8, 0x7affd8][i % 3],
          transparent: true,
          blending: THREE.AdditiveBlending,
          fog: false,
          opacity: 0.65,
        }),
      );
    ha.scale.set(1.5, 1.5, 1);
    m.add(ha);
    m.userData = {
      a: R(i, 780) * 6.283,
      d: 3 + R(i, 781) * 8,
      sp: 0.35 + R(i, 782) * 0.3,
      ph: R(i, 783) * 10,
      sw: R(i, 784),
    };
    gl.add(m);
    lant.push(m);
  }
  window.FUP = {
    fern,
    grass,
    stemM,
    bloomM,
    rootM,
    vineM,
    fungM,
    spM,
    shafts,
    blooms,
    lant,
    spores,
    logM,
    petalMat: null,
  };
  // ---- per-frame
  let chk = 0;
  const _ht = hauntTick;
  hauntTick = function (dt, t) {
    _ht(dt, t);
    const inF =
        !inCave &&
        Math.abs(me3.x - HAUNT.x) < HAUNT.R + 8 &&
        Math.abs(me3.z - HAUNT.z) < HAUNT.hz + 8,
      nk = NIGHTK || 0;
    spores.visible = inF;
    shafts.forEach((m) => {
      m.visible = inF;
      if (inF) {
        m.material.color.setHex(nk > 0.5 ? 0xa8c4ff : 0xfff0b8);
        m.material.opacity =
          m.userData.b *
          (nk > 0.5 ? 0.55 : 1) *
          (0.6 + 0.4 * Math.sin(t * 0.35 + m.userData.ph));
      }
    });
    if (inF) {
      spM.opacity = 0.35 + 0.5 * nk;
      for (let i = 0; i < SP; i++) {
        const b = spB[i];
        let x =
            ((((b[0] + t * b[3] * 0.8 + Math.sin(t * 0.5 + b[4]) * 1.5) % 40) +
              40) %
              40) -
            20,
          z =
            ((((b[2] + t * b[3] * 0.5 + Math.cos(t * 0.4 + b[4]) * 1.5) % 40) +
              40) %
              40) -
            20;
        spPos[i * 3] = me3.x + x;
        spPos[i * 3 + 2] = me3.z + z;
        spPos[i * 3 + 1] =
          gh(me3.x + x, me3.z + z) +
          0.4 +
          ((b[1] * 0.15 + t * b[3] * 0.25) % 3.2) +
          Math.sin(t * 1.2 + b[4]) * 0.3;
      }
      spG.attributes.position.needsUpdate = true;
    }
    blooms.forEach((b) => {
      b.g.rotation.y += dt * 0.15;
      b.ha.material.opacity = 0.4 + 0.2 * Math.sin(t * 1.7 + b.ph);
    });
    lant.forEach((m) => {
      const u = m.userData;
      u.ph += dt * u.sp;
      const y = u.ph % 12;
      m.position.set(
        Math.cos(u.a + u.ph * 0.1) * u.d + Math.sin(t * 0.7 + u.sw * 6) * 0.5,
        0.6 + y,
        Math.sin(u.a + u.ph * 0.1) * u.d,
      );
      m.children[0].material.opacity =
        0.65 * Math.sin(Math.min(1, y / 12) * Math.PI);
    });
    chk -= dt;
    if (chk <= 0) {
      chk = 0.5;
      hfTrees.forEach((it) => {
        const tr = it.tr;
        if (tr && tr.dead && tr.up && !tr.up.done) {
          tr.up.done = 1;
          tr.up.r.forEach((i) => rootM.setMatrixAt(i, Z0));
          tr.up.v.forEach((i) => vineM.setMatrixAt(i, Z0));
          tr.up.f.forEach((i) => fungM.setMatrixAt(i, Z0));
          rootM.instanceMatrix.needsUpdate =
            vineM.instanceMatrix.needsUpdate =
            fungM.instanceMatrix.needsUpdate =
              true;
        }
      });
    }
  };
})();

(function () {
  const _x = window.exTick;
  window.exTick = function (dt, t) {
    _x(dt, t);
    if (!ready) return;
    const c = inCave;
    flies2.visible = !c;
    ff.visible = !c;
    haze.forEach((h) => (h.visible = !c));
    if (c) {
      hazeM.opacity = 0;
      smogE.style.opacity = 0;
      lowHaze.forEach((h) => (h.visible = false));
      hazeDome.visible = false;
    }
  };
})();

// ===================================================================
// v3.10 forest sandbox: everything in the forest can be built on, broken, harvested (persisted)
// ===================================================================
(function forestSandbox() {
  const Z0 = new THREE.Matrix4().makeScale(0, 0, 0),
    FB = X6.fbk,
    FOLL = window.FOLL,
    orig = new Map(),
    hp = {};
  const day = () => dayNo();
  const mk = (m) => {
    if (!orig.has(m)) orig.set(m, new Float32Array(m.instanceMatrix.array));
  };
  [...FOLL].forEach((m) => {
    if (m.isInstancedMesh) mk(m);
  });
  const zero = (m, i) => {
    mk(m);
    m.setMatrixAt(i, Z0);
    m.instanceMatrix.needsUpdate = true;
  };
  const restore = (m, i) => {
    const o = orig.get(m);
    if (!o) return;
    m.instanceMatrix.array.set(o.subarray(i * 16, i * 16 + 16), i * 16);
    m.instanceMatrix.needsUpdate = true;
  };
  // mushrooms + stems
  if (typeof hfMush !== "undefined" && hfMush) {
    const stem = HFG.children.find(
      (o) =>
        o.isInstancedMesh &&
        o !== hfMush &&
        o.count === hfMush.count &&
        o.geometry.type === "CylinderGeometry",
    );
    mk(hfMush);
    if (stem) mk(stem);
    hfMush.userData.fol = { k: "mush", m: hfMush, s: stem };
    if (stem) stem.userData.fol = hfMush.userData.fol;
    FOLL.push(hfMush);
    if (stem) FOLL.push(stem);
  }
  // gravestones, rune stones, the hut
  let gi = 0,
    si = 0;
  const gone = (o) => {
    const bb = new THREE.Box3().setFromObject(o).expandByScalar(0.35);
    for (let i = COLL.length; i--;) {
      const c = COLL[i];
      if (
        c.x >= bb.min.x &&
        c.x <= bb.max.x &&
        c.z >= bb.min.z &&
        c.z <= bb.max.z
      )
        COLL.splice(i, 1);
    }
  };
  const reg = [];
  HFG.children.forEach((o) => {
    if (!o.isGroup) return;
    const c0 = o.children[0];
    if (!c0 || !c0.geometry) return;
    const gp = c0.geometry.parameters || {};
    if (o.children.length === 2 && gp.width === 0.7 && gp.height === 1) {
      o.userData.fol = { k: "grave", o, hp: 3, id: "g" + gi++ };
      FOLL.push(o);
      reg.push(o);
    } else if (
      c0.geometry.type === "BoxGeometry" &&
      gp.width === 0.9 &&
      gp.height === 2.6
    ) {
      o.userData.fol = { k: "rune", o, hp: 5, id: "s" + si++ };
      FOLL.push(o);
      reg.push(o);
    }
  });
  if (window.HOUSE && HOUSE.g) {
    HOUSE.g.userData.fol = { k: "hut", o: HOUSE.g, hp: 12, id: "hut" };
    FOLL.push(HOUSE.g);
    reg.push(HOUSE.g);
  }
  const take = (f) => {
    if (f.o) {
      const arr = f.o;
      (Array.isArray(arr) ? arr : [arr]).forEach((x) => {
        x.parent && x.parent.remove(x);
        FOLL.splice(FOLL.indexOf(x), 1);
      });
      if (f.c) {
        const i = COLL.indexOf(f.c);
        if (i >= 0) COLL.splice(i, 1);
      } else (Array.isArray(f.o) ? f.o : [f.o]).forEach(gone);
    }
  };
  // silently apply saved state (broken things stay broken)
  reg
    .concat(
      FOLL.filter((o) => o.userData.fol && o.userData.fol.k === "boulder"),
    )
    .forEach((o) => {
      const f = o.userData.fol;
      if (f.id && FB[f.id]) {
        take(f);
        FB[f.id] = FB[f.id];
      }
    });
  Object.keys(FB).forEach((k) => {
    const m = k.match(/^(grass|fern|flower|mush):(\d+)$/);
    if (!m) return;
    const f = FOLL.find(
      (o) => o.userData.fol && o.userData.fol.k === m[1] && o.isInstancedMesh,
    );
    if (!f) return;
    const i = +m[2],
      u = f.userData.fol;
    if (i >= f.count) return;
    zero(u.m || f, i);
    if (u.s) zero(u.s, i);
  });
  hfTrees.forEach((it) => {
    const tr = it.tr;
    if (tr && FB["t" + tr.i] && !tr.dead) {
      tr.dead = true;
      const I = HFI;
      I.trunk.setMatrixAt(tr.i, Z0);
      tr.bi.forEach((k) => I.br.setMatrixAt(k, Z0));
      tr.ci.forEach((k) => I.can.setMatrixAt(k, Z0));
      I.trunk.instanceMatrix.needsUpdate =
        I.br.instanceMatrix.needsUpdate =
        I.can.instanceMatrix.needsUpdate =
          true;
      const ci = COLL.indexOf(tr.cl);
      if (ci >= 0) COLL.splice(ci, 1);
      IG.remove(it.root);
      const ii = items.indexOf(it);
      if (ii >= 0) items.splice(ii, 1);
    }
  });
  // ---- generous ground picking: tap near a plant and you break/pick it (only plants close to you)
  window.folNear = function (x, z, r, reach) {
    let best = null,
      bd = 1e9;
    const pr = { flower: 0, mush: 0, fern: 0.25, grass: 0.5 };
    FOLL.forEach((m) => {
      if (!m.isInstancedMesh) return;
      const u = m.userData.fol;
      if (!u || !(u.k in pr) || (u.k === "flower" && m !== u.m)) return;
      const a = m.instanceMatrix.array;
      for (let i = 0; i < m.count; i++) {
        const o = i * 16,
          sx = a[o];
        if (sx === 0 && a[o + 5] === 0) continue;
        const px = a[o + 12],
          pz = a[o + 14],
          d = Math.hypot(px - x, pz - z) + pr[u.k];
        if (
          d < bd &&
          Math.hypot(px - x, pz - z) < r &&
          Math.hypot(px - me3.x, pz - me3.z) < reach
        ) {
          bd = d;
          best = { f: u, m, i, x: px, y: a[o + 13], z: pz };
        }
      }
    });
    return best;
  };
  // ---- tapping
  const give = (c, msg) => addInv(c, msg),
    hit3 = (f, need, toolName) => {
      if (window.__ftool !== need && need === "pick") {
        toast("⛏️ Use the pickaxe on " + toolName);
        return false;
      }
      return true;
    };
  window.folTap = function (f, h, tool) {
    if (BT[tool]) {
      const p = h.point;
      placeBlock(
        Math.floor(p.x),
        Math.max(0, Math.round(p.y - 1)),
        Math.floor(p.z),
        tool,
      );
      return;
    }
    const px = h.point.x,
      pz = h.point.z;
    if (Math.hypot(me3.x - px, me3.z - pz) > 9) return toast("Too far away");
    swing && swing();
    const k = f.k;
    if (k === "grass" || k === "fern" || k === "flower" || k === "mush") {
      const m = h.object,
        i = h.instanceId;
      if (i === undefined) return;
      const u = m.userData.fol,
        key = k + ":" + i;
      if (FB[key]) return;
      FB[key] = day();
      sv6();
      if (u.m) zero(u.m, i);
      if (u.s) zero(u.s, i);
      if (m !== u.m && !u.m) zero(m, i);
      burst(
        px,
        0.5,
        pz,
        k === "flower" ? 0xff9ae0 : k === "mush" ? 0x9affd8 : 0x6acb6a,
        8,
        1.6,
        1.8,
      );
      tone(520 + Math.random() * 200, 0.07, "triangle", 0.07);
      if (k === "grass")
        (give({ fiber: 1 }, Math.random() < 0.12 ? "🌿 +1 fiber" : undefined),
          Math.random() < 0.1 && give({ seed: 1 }, "🥕 A seed!"));
      else if (k === "fern") give({ fiber: 2 }, "🌿 +2 fiber");
      else if (k === "flower")
        give({ seed: 1 }, "🌸 Picked a glowing flower, +1 seed");
      else give({ fiber: 1 }, "🍄 Glow cap picked");
      return;
    }
    const key = f.id || "log:" + h.instanceId;
    if (k === "log") {
      const i = h.instanceId;
      if (i === undefined || FB["log:" + i]) return;
      const kk = "log:" + i;
      hp[kk] = (hp[kk] || 3) - 1;
      burst(px, 0.6, pz, 0x8a6a44, 10, 2, 1.5);
      tone(140 + Math.random() * 40, 0.12, "square", 0.1);
      HIT.sh = Math.max(HIT.sh, 0.1);
      if (hp[kk] > 0) return toast("🪓 Chop (" + hp[kk] + " more)");
      FB[kk] = day();
      sv6();
      zero(f.m, i);
      give({ wood: 3, fiber: 1 }, "🪵 +3 wood");
      return;
    }
    if (SL[slot][0] !== "pick")
      return toast(
        "⛏️ Use the pickaxe on " +
          (k === "boulder" ? "boulders" : k === "hut" ? "the hut" : "stones"),
      );
    hp[key] = (hp[key] === undefined ? f.hp : hp[key]) - 1;
    burst(px, 1, pz, 0x9a9a9a, 10, 2, 1.5);
    tone(200 + Math.random() * 60, 0.1, "square", 0.1);
    HIT.sh = Math.max(HIT.sh, k === "hut" ? 0.2 : 0.12);
    if (hp[key] > 0)
      return toast(
        "⛏️ " +
          (k === "hut" ? "Dismantle" : "Break") +
          " (" +
          hp[key] +
          " more)",
      );
    FB[key] = day();
    sv6();
    take(f);
    HIT.sh = Math.max(HIT.sh, 0.35);
    tone(90, 0.5, "sawtooth", 0.15);
    if (k === "boulder") {
      give({ stone: 3 }, "🪨 +3 stone");
      if (Math.random() < 0.12) give({ gem: 1 }, "💎 A gem inside!");
    } else if (k === "grave") {
      give({ stone: 2 }, "🪦 +2 stone");
      if (Math.random() < 0.3) {
        give({ gem: 1 }, "💎 Something was buried here…");
        if (window.ghostScare && Math.random() < 0.5) ghostScare();
      }
    } else if (k === "rune") {
      give({ stone: 4, gem: 1 }, "🪨 The rune stone crumbles… +4 stone +1 gem");
    } else if (k === "hut") {
      give(
        { wood: 14, plank: 8, brick: 6, stone: 4 },
        "🏚️ Hut dismantled: +14 wood, 8 planks, 6 bricks, 4 stone",
      );
    }
  };
  // ---- day change: foliage grows back after 3 game days
  let last = -1,
    chk = 0;
  const _ht = hauntTick;
  hauntTick = function (dt, t) {
    _ht(dt, t);
    chk -= dt;
    if (chk > 0) return;
    chk = 0.6;
    hfTrees.forEach((it) => {
      const tr = it.tr;
      if (tr && tr.dead && !FB["t" + tr.i]) {
        FB["t" + tr.i] = day();
        sv6();
      }
    });
    const d = day();
    if (d === last) return;
    last = d;
    let ch = 0;
    Object.keys(FB).forEach((k) => {
      const m = k.match(/^(grass|fern|flower|mush|log):(\d+)$/);
      if (!m || d - FB[k] < 3) return;
      const f = FOLL.find(
        (o) => o.userData.fol && o.userData.fol.k === m[1] && o.isInstancedMesh,
      );
      if (!f) return;
      const u = f.userData.fol,
        i = +m[2];
      restore(u.m || f, i);
      if (u.s) restore(u.s, i);
      delete FB[k];
      ch = 1;
    });
    if (ch) sv6();
  };
})();

// ===================================================================
// v3.11 the forest changes with the island: HAUNTED while polluted, MYSTICAL when the air is clean.
// Moon phases + the forest god who walks out of the sea every full moon.
// ===================================================================
(function forestSpirit() {
  const F = window.FUP,
    I = HFI,
    col = new THREE.Color(),
    m4 = new THREE.Matrix4(),
    q = new THREE.Quaternion(),
    e = new THREE.Euler(),
    sc = new THREE.Vector3(),
    ps = new THREE.Vector3();
  const L = (a, b, t) => a + (b - a) * t,
    R = (i, a) => hs(i, a, 1),
    smooth = (a, b, x) => ss(a, b, x);
  window.HK = 1;
  let HK = 1;
  // ---------------------------------------------------------------- haunted <-> mystical
  const tint = (mat, mc, hc, k) => mat.color.copy(mc).lerp(hc, k);
  const WH = new THREE.Color(1, 1, 1);
  const dead = {
    can: new THREE.Color(0.34, 0.38, 0.36),
    tr: new THREE.Color(0.5, 0.45, 0.5),
    gr: new THREE.Color(0.72, 0.6, 0.36),
    fl: new THREE.Color(0.22, 0.22, 0.24),
    vn: new THREE.Color(0.25, 0.28, 0.25),
    fg: new THREE.Color(0.18, 0.2, 0.2),
  };
  const baseEm = {
    can: I.can.material.emissiveIntensity,
    tr: I.trunk.material.emissiveIntensity,
    br: I.br.material.emissiveIntensity,
    grass: F.grass.material.emissiveIntensity,
    vine: F.vineM.material.emissiveIntensity,
  };
  const canEm0 = I.can.material.emissive.clone(),
    canEmH = new THREE.Color(0.12, 0.04, 0.04);
  // pale watchers (only when haunted)
  const wm = hfGhost.material.map,
    watchers = [];
  for (let i = 0; i < 10; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: wm,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        fog: false,
      }),
    );
    s.scale.set(3.2, 4.8, 1);
    s.visible = false;
    s.userData = { ph: i * 1.9, x: HAUNT.x, z: HAUNT.z, t: 0 };
    scene.add(s);
    watchers.push(s);
  }
  const sprinkle = (w, i) => {
    for (let k = 0; k < 30; k++) {
      const x =
          HAUNT.x +
          (R(i * 31 + k, 901 + Math.floor(now() / 9000)) - 0.5) *
            2 *
            HAUNT.R *
            0.9,
        z =
          HAUNT.z +
          (R(i * 31 + k, 902 + Math.floor(now() / 9000)) - 0.5) *
            2 *
            HAUNT.hz *
            0.9;
      if (
        hauntLand(x, z) &&
        Math.hypot(x - me3.x, z - me3.z) > 13 &&
        Math.hypot(x - me3.x, z - me3.z) < 26
      ) {
        w.userData.x = x;
        w.userData.z = z;
        return;
      }
    }
    w.userData.x = me3.x + (Math.random() - 0.5) * 40;
    w.userData.z = me3.z + (Math.random() - 0.5) * 40;
  };
  watchers.forEach((w, i) => sprinkle(w, i));
  const fogs = [];
  for (let i = 0; i < 26; i++) {
    const s = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0x7a9a8a,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        fog: false,
      }),
    );
    s.scale.setScalar(9 + R(i, 910) * 8);
    s.userData = {
      x: HAUNT.x + (R(i, 911) - 0.5) * HAUNT.R * 2,
      z: HAUNT.z + (R(i, 912) - 0.5) * HAUNT.hz * 2,
      ph: i,
    };
    s.visible = false;
    scene.add(s);
    fogs.push(s);
  }
  let whisper = 6,
    scare = 40 + Math.random() * 40;
  function hauntBlend(dt, t, inF, f2) {
    const tgt = smooth(0.12, 0.5, pollution);
    HK += (tgt - HK) * Math.min(1, dt * 0.45);
    if (window.HKfix !== undefined) HK = window.HKfix;
    window.HK = HK;
    const k = HK;
    tint(I.can.material, WH, dead.can, k);
    I.can.material.emissiveIntensity = L(baseEm.can, 0.08, k);
    I.can.material.emissive.copy(canEm0).lerp(canEmH, k);
    tint(I.trunk.material, WH, dead.tr, k);
    I.trunk.material.emissiveIntensity = L(baseEm.tr, 0.1, k);
    I.br.material.color.copy(WH).lerp(dead.tr, k);
    I.br.material.emissiveIntensity = L(baseEm.br, 0.05, k);
    F.fern.material.color.copy(WH).lerp(dead.gr, k);
    F.grass.material.color.copy(WH).lerp(dead.gr, k);
    F.fern.material.emissiveIntensity = F.grass.material.emissiveIntensity = L(
      baseEm.grass,
      0.03,
      k,
    );
    F.bloomM.material.color.copy(WH).lerp(dead.fl, k);
    F.bloomM.visible = k < 0.75;
    F.fungM.material.color.copy(WH).lerp(dead.fg, k);
    F.vineM.material.color.copy(WH).lerp(dead.vn, k);
    F.vineM.material.emissiveIntensity = L(baseEm.vine, 0.02, k);
    F.rootM.material.color.copy(WH).lerp(dead.tr, k);
    F.shafts.forEach((m) => {
      if (m.visible) m.material.opacity *= 1 - k * 0.92;
    });
    if (F.spores.visible) {
      F.spM.color.setRGB(1, L(1, 0.45, k), L(1, 0.4, k));
      F.spM.opacity *= 1 - k * 0.45;
    }
    F.blooms.forEach((b) => {
      b.g.rotation.x = 0.35 + k * 1.15;
      b.ha.material.opacity *= 1 - k * 0.8;
    });
    F.lant.forEach((m) => {
      m.children[0].material.color.setRGB(
        L(1, 0.55, k),
        L(1, 0.65, k),
        L(1, 0.9, k),
      );
    });
    if (hfHeart) {
      hfHeart.hg.material.color.setRGB(
        L(0.54, 0.8, k),
        L(0.48, 0.08, k),
        L(1, 0.12, k),
      );
    }
    if (hfRune)
      hfRune.material.color.setRGB(
        L(0.54, 1, k),
        L(1, 0.18, k),
        L(0.92, 0.16, k),
      );
    hfStones.forEach((h) =>
      h.material.color.setRGB(L(0.29, 1, k), L(1, 0.2, k), L(0.82, 0.2, k)),
    );
    if (hfMush && hfMush.material)
      hfMush.material.emissiveIntensity *= 1 - k * 0.8;
    hfWisps.forEach((s) =>
      s.material.color.setRGB(
        L(s.material.color.r, 0.9, k * 0.05),
        L(s.material.color.g, 0.92, k * 0.05),
        L(s.material.color.b, 1, k * 0.05),
      ),
    );
    // sicker fog in the forest
    if (f2 > 0.01 && k > 0.01) {
      scene.fog.color.lerp(new THREE.Color(0.1, 0.13, 0.12), f2 * k * 0.55);
      scene.fog.near = Math.max(3, scene.fog.near * (1 - f2 * k * 0.45));
      scene.fog.far = scene.fog.far * (1 - f2 * k * 0.35);
    }
    // watchers + low mist + whispers
    const vis = inF && k > 0.4;
    watchers.forEach((w, i) => {
      const u = w.userData,
        d = Math.hypot(u.x - me3.x, u.z - me3.z);
      if (!vis) {
        w.visible = false;
        return;
      }
      w.visible = true;
      u.ph += dt * 0.6;
      const near = smooth(5, 9, d),
        far = 1 - smooth(22, 30, d);
      w.position.set(u.x, gh(u.x, u.z) + 2.5, u.z);
      w.material.opacity =
        (k - 0.35) *
        0.9 *
        near *
        far *
        (0.5 + 0.3 * Math.sin(u.ph * 2.1) + 0.2 * Math.sin(u.ph * 7.3));
      if (d < 6) {
        u.t += dt;
        if (u.t > 0.4) {
          u.t = 0;
          sprinkle(w, i + Math.floor(t));
        }
      }
    });
    fogs.forEach((s) => {
      const u = s.userData;
      s.visible = inF && k > 0.25;
      if (!s.visible) return;
      s.position.set(
        u.x + Math.sin(t * 0.07 + u.ph) * 4,
        gh(u.x, u.z) + 1.1,
        u.z + Math.cos(t * 0.06 + u.ph) * 4,
      );
      s.material.opacity = 0.2 * k * (0.7 + 0.3 * Math.sin(t * 0.3 + u.ph));
    });
    if (inF && k > 0.5) {
      whisper -= dt;
      if (whisper <= 0) {
        whisper = 6 + Math.random() * 9;
        tone(150 + Math.random() * 60, 1.1, "sine", 0.025);
        tone(222 + Math.random() * 30, 0.9, "triangle", 0.012, 0.3);
      }
      scare -= dt;
      if (scare <= 0) {
        scare = 50 + Math.random() * 70;
        if (me3.y !== undefined && !inCave) ghostScare();
      }
    }
  }
  // ---------------------------------------------------------------- moon
  const PH = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"],
    phase = () => (dayNo() - 1) % 8;
  window.moonE = () => PH[phase()];
  const mc = document.createElement("canvas");
  mc.width = mc.height = 256;
  const mg = mc.getContext("2d");
  function drawMoon(p) {
    mg.clearRect(0, 0, 256, 256);
    const R0 = 100,
      cx = 128,
      cy = 128,
      a = (p / 8) * Math.PI * 2,
      k = Math.cos(a),
      wax = p < 4;
    mg.save();
    mg.beginPath();
    mg.arc(cx, cy, R0, 0, 7);
    mg.clip();
    mg.fillStyle = "#232a3c";
    mg.fillRect(0, 0, 256, 256);
    const lit = mg.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, R0);
    lit.addColorStop(0, "#fffbe8");
    lit.addColorStop(1, "#dcdcc8");
    mg.fillStyle = lit;
    mg.beginPath();
    mg.arc(
      cx,
      cy,
      R0,
      wax ? -Math.PI / 2 : Math.PI / 2,
      wax ? Math.PI / 2 : Math.PI * 1.5,
    );
    mg.closePath();
    mg.fill();
    mg.beginPath();
    mg.ellipse(cx, cy, Math.abs(k) * R0, R0, 0, 0, 7);
    mg.fillStyle = k > 0 ? "#232a3c" : lit;
    mg.fill();
    mg.globalAlpha = 0.16;
    mg.fillStyle = "#7a7a6a";
    [
      [-30, -20, 22],
      [24, -34, 14],
      [30, 30, 26],
      [-34, 36, 12],
      [0, 8, 16],
    ].forEach(([x, y, r]) => {
      mg.beginPath();
      mg.arc(cx + x, cy + y, r, 0, 7);
      mg.fill();
    });
    mg.restore();
  }
  const mtex = new THREE.CanvasTexture(mc),
    moon = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: mtex,
        transparent: true,
        depthWrite: false,
        fog: false,
        opacity: 0,
      }),
    ),
    mhalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: 0xcfe0ff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
        opacity: 0,
      }),
    );
  moon.scale.set(46, 46, 1);
  mhalo.scale.set(150, 150, 1);
  moon.renderOrder = -2;
  mhalo.renderOrder = -3;
  scene.add(moon, mhalo);
  let lastP = -1;
  function moonTick() {
    const p = phase();
    if (p !== lastP) {
      lastP = p;
      drawMoon(p);
      mtex.needsUpdate = true;
    }
    const u = (((X6.gt % DAYLEN) + DAYLEN) % DAYLEN) / DAYLEN,
      s = u < 0.12 ? u + 1 : u,
      m = (s - 0.7) / 0.42,
      on = m > 0 && m < 1 && !inCave;
    moon.visible = mhalo.visible = on;
    if (!on) return;
    const el = Math.sin(m * Math.PI) * 0.62 + 0.1,
      az = -Math.cos(m * Math.PI),
      dx = az * 0.9,
      dz = -0.45,
      dl = Math.hypot(dx, el, dz);
    const fade = smooth(0, 0.12, m) * (1 - smooth(0.88, 1, m)),
      f = (1 - Math.cos((p / 8) * Math.PI * 2)) / 2;
    moon.position.set(
      cam.position.x + (dx / dl) * 240,
      cam.position.y + (el / dl) * 240,
      cam.position.z + (dz / dl) * 240,
    );
    mhalo.position.copy(moon.position);
    moon.material.opacity = fade * (1 - pollution * 0.35);
    mhalo.material.opacity =
      fade * (0.12 + 0.5 * f * f) * (1 - pollution * 0.4);
    mhalo.material.color.setHex(p === 4 ? 0xfff0c0 : 0xcfe0ff);
    const sk = p === 4 ? 1.35 : 1;
    moon.scale.set(46 * sk, 46 * sk, 1);
    mhalo.scale.set(150 * sk, 150 * sk, 1);
  }
  // ---------------------------------------------------------------- the forest god
  const MS = (c, o) =>
    new THREE.MeshStandardMaterial(
      Object.assign({ color: c, roughness: 0.7, flatShading: true }, o || {}),
    );
  const bodyM = MS(0xdcc9a0, {
      emissive: 0x3a2c10,
      emissiveIntensity: 0.35,
      transparent: true,
    }),
    darkM = MS(0x9a7a46, {
      emissive: 0x2a1c08,
      emissiveIntensity: 0.3,
      transparent: true,
    }),
    maskM = MS(0xf3ead8, {
      emissive: 0x8a8470,
      emissiveIntensity: 0.85,
      transparent: true,
    }),
    antM = MS(0xece4d0, {
      emissive: 0x1a6a5a,
      emissiveIntensity: 0.5,
      transparent: true,
    }),
    hoofM = MS(0x2a2018, { transparent: true }),
    eyeM = new THREE.MeshBasicMaterial({ color: 0xffe27a, transparent: true }),
    tipM = new THREE.MeshBasicMaterial({ color: 0x7affd8, transparent: true });
  const GOD = new THREE.Group(),
    rig = new THREE.Group();
  GOD.add(rig);
  const mesh = (g, m, x, y, z, sx, sy, sz, par) => {
    const o = new THREE.Mesh(g, m);
    o.position.set(x, y, z);
    o.scale.set(sx || 1, sy || 1, sz || 1);
    o.castShadow = false;
    (par || rig).add(o);
    return o;
  };
  const SPH = new THREE.SphereGeometry(1, 14, 10),
    CYL = new THREE.CylinderGeometry(1, 1, 1, 9).translate(0, -0.5, 0),
    CONE = new THREE.ConeGeometry(1, 1, 7).translate(0, 0.5, 0);
  // torso
  const torso = new THREE.Group();
  torso.position.y = 1.65;
  rig.add(torso);
  mesh(SPH, bodyM, 0, 0, 0.55, 0.62, 0.62, 0.72, torso);
  mesh(SPH, bodyM, 0, -0.02, -0.55, 0.58, 0.6, 0.7, torso);
  const belly = mesh(CYL, bodyM, 0, 0, 0.55, 0.52, 1.15, 0.52, torso);
  belly.rotation.x = Math.PI / 2;
  belly.position.set(0, -0.03, 0.6);
  belly.scale.set(0.5, 1.2, 0.5);
  mesh(SPH, darkM, 0, -0.38, 0.1, 0.5, 0.2, 0.9, torso);
  // neck + head
  const neck = new THREE.Group();
  neck.position.set(0, 0.28, 1.05);
  neck.rotation.x = 0.85;
  torso.add(neck);
  const nk = mesh(CYL, bodyM, 0, 0, 0, 0.26, 1.1, 0.26, neck);
  nk.scale.y = -1.1;
  mesh(SPH, bodyM, 0, 0.05, 0, 0.3, 0.34, 0.3, neck);
  const head = new THREE.Group();
  head.position.y = 1.1;
  head.rotation.x = -0.55;
  neck.add(head);
  mesh(SPH, bodyM, 0, 0.04, 0.12, 0.3, 0.32, 0.5, head);
  mesh(SPH, bodyM, 0, -0.08, 0.58, 0.2, 0.2, 0.3, head);
  // serene human-like face on a pale mask
  const mask = new THREE.Group();
  mask.position.set(0, -0.02, 0.42);
  mask.rotation.x = -0.18;
  head.add(mask);
  mesh(SPH, maskM, 0, 0, 0, 0.31, 0.39, 0.17, mask);
  [
    [0, 0.27, 0.13, 0.05, 0.1],
    [-0.09, 0.24, 0.13, 0.03, 0.07],
    [0.09, 0.24, 0.13, 0.03, 0.07],
  ].forEach(([x, y, z, w, h]) =>
    mesh(new THREE.BoxGeometry(1, 1, 1), tipM, x, y, z, w, h, 0.01, mask),
  );
  mesh(SPH, maskM, 0, -0.04, 0.1, 0.07, 0.1, 0.06, mask);
  const eyes = [-1, 1].map((s) => {
    const g = new THREE.Group();
    g.position.set(s * 0.115, 0.07, 0.1);
    mask.add(g);
    mesh(
      SPH,
      new THREE.MeshBasicMaterial({ color: 0x1a1410, transparent: true }),
      0,
      0,
      0,
      0.065,
      0.034,
      0.03,
      g,
    );
    const ir = mesh(SPH, eyeM, 0, 0, 0.012, 0.048, 0.044, 0.03, g);
    const br = mesh(
      new THREE.BoxGeometry(1, 1, 1),
      darkM,
      s * 0.005,
      0.075,
      0.01,
      0.11,
      0.014,
      0.02,
      g,
    );
    br.rotation.z = -s * 0.12;
    return { g, ir };
  });
  mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x6a4a3a, transparent: true }),
    0,
    -0.17,
    0.12,
    0.07,
    0.012,
    0.02,
    mask,
  );
  // ears
  const ears = [-1, 1].map((s) => {
    const g = new THREE.Group();
    g.position.set(s * 0.2, 0.2, 0);
    g.rotation.set(-0.2, 0, -s * 0.9);
    head.add(g);
    const c = mesh(CONE, bodyM, 0, 0, 0, 0.09, 0.4, 0.05, g);
    return g;
  });
  // antlers (recursive, tips bloom)
  const tips = [],
    ant = [],
    petals = [];
  function branch(par, len, rad, depth, sd) {
    const g = new THREE.Group();
    par.add(g);
    const b = mesh(CYL, antM, 0, 0, 0, rad, len, rad, g);
    b.scale.y = -len;
    g.userData.len = len;
    if (depth > 0) {
      const n = depth > 2 ? 3 : 2;
      for (let i = 0; i < n; i++) {
        const c = new THREE.Group();
        c.position.y = len * (0.55 + i * 0.2);
        c.rotation.set(
          (R(sd + i, 930) - 0.5) * 0.9,
          R(sd + i, 931) * 6.283,
          0.55 + R(sd + i, 932) * 0.5,
        );
        g.add(c);
        branch(c, len * 0.7, rad * 0.68, depth - 1, sd * 3 + i + 1);
      }
    } else {
      const t = mesh(SPH, tipM, 0, len, 0, 0.07, 0.07, 0.07, g);
      tips.push(t);
      const f = mesh(
        SPH,
        MS([0xff9ae0, 0xa58aff, 0xffe27a, 0x7affd8][tips.length % 4], {
          emissive: [0xff5ac0, 0x6a4aff, 0xffc83a, 0x2affc0][tips.length % 4],
          emissiveIntensity: 0.9,
          transparent: true,
        }),
        0,
        len + 0.05,
        0,
        0.09,
        0.05,
        0.09,
        g,
      );
      f.userData.petal = 1;
      f.material.userData.b = f.material.color.clone();
      petals.push(f.material);
      tips.push(f);
    }
    ant.push(g);
    return g;
  }
  [-1, 1].forEach((s, k) => {
    const base = new THREE.Group();
    base.position.set(s * 0.11, 0.3, -0.05);
    base.rotation.set(-0.35, 0, s * 0.5);
    head.add(base);
    branch(base, 0.62, 0.032, 3, k * 7 + 3);
  });
  // halo behind the antlers
  const aura = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xffe9a0,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      opacity: 0.55,
    }),
  );
  aura.scale.set(4.6, 4.6, 1);
  aura.position.set(0, 0.55, -0.05);
  head.add(aura);
  // legs
  const legs = [
    [0.3, 0.62, 0],
    [-0.3, 0.62, Math.PI],
    [0.3, -0.62, Math.PI],
    [-0.3, -0.62, 0],
  ].map(([x, z, ph], i) => {
    const hip = new THREE.Group();
    hip.position.set(x, 1.4, z);
    rig.add(hip);
    const up = mesh(CYL, i < 2 ? bodyM : darkM, 0, 0, 0, 0.17, 0.75, 0.17, hip);
    mesh(SPH, i < 2 ? bodyM : darkM, 0, 0, 0, 0.19, 0.19, 0.2, hip);
    const knee = new THREE.Group();
    knee.position.y = -0.75;
    hip.add(knee);
    mesh(SPH, darkM, 0, 0, 0, 0.1, 0.1, 0.1, knee);
    mesh(CYL, darkM, 0, 0, 0, 0.095, 0.78, 0.095, knee);
    const hoof = new THREE.Group();
    hoof.position.y = -0.78;
    knee.add(hoof);
    mesh(CONE, hoofM, 0, -0.08, 0, 0.085, 0.1, 0.1, hoof).rotation.x = Math.PI;
    return { hip, knee, ph };
  });
  const tail = new THREE.Group();
  tail.position.set(0, 0.2, -1.2);
  tail.rotation.x = -1.0;
  torso.add(tail);
  mesh(CONE, bodyM, 0, 0, 0, 0.13, 0.5, 0.13, tail);
  // star-filled night body (shown while it grows huge)
  const SN = 1100,
    sp = new Float32Array(SN * 3),
    sb = [];
  for (let i = 0; i < SN; i++) {
    let x = 0,
      y = 0,
      z = 0;
    for (let j = 0; j < 40; j++) {
      x = R(i * 41 + j, 940) * 2 - 1;
      y = R(i * 41 + j, 941) * 2 - 1;
      z = R(i * 41 + j, 942) * 2 - 1;
      if (x * x + y * y + z * z <= 1) break;
    }
    sb.push([x, y, z, R(i, 943) * 6.283]);
    sp[i * 3] = x * 0.7;
    sp[i * 3 + 1] = 1.7 + y * 0.8;
    sp[i * 3 + 2] = z * 1.5;
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(
    sg,
    new THREE.PointsMaterial({
      size: 0.22,
      map: new THREE.CanvasTexture(dotC),
      color: 0xdfe8ff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    }),
  );
  stars.frustumCulled = false;
  rig.add(stars);
  const bodyGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0x8a9aff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      opacity: 0,
    }),
  );
  bodyGlow.scale.set(6.5, 5, 1);
  bodyGlow.position.set(0, 1.7, 0);
  rig.add(bodyGlow);
  const ground = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: HALO,
      color: 0xfff0b0,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      opacity: 0.4,
    }),
  );
  ground.scale.set(7, 7, 1);
  ground.position.y = 0.3;
  GOD.add(ground);
  // flower trail
  const TN = 320,
    tStem = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.015, 0.03, 1, 4).translate(0, 0.5, 0),
      new THREE.MeshStandardMaterial({ color: 0x3a9a5a, roughness: 1 }),
      TN,
    ),
    tBloom = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.17, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      TN,
    );
  tStem.frustumCulled = tBloom.frustumCulled = false;
  tStem.count = tBloom.count = 0;
  scene.add(tStem, tBloom);
  const trail = [];
  let tn = 0;
  const FC = [0xff9ae0, 0x7affd8, 0xa58aff, 0xffe27a, 0xff7a9a];
  function plant(x, z, k) {
    const i = tn++ % TN;
    if (tn > TN) {
    }
    const age = 0;
    trail[i] = {
      x,
      z,
      y: gh(x, z),
      h: 0.35 + Math.random() * 0.55,
      t: 0,
      c: k > 0.55 ? 0x777782 : FC[i % 5],
      s: k > 0.55 ? 0.55 : 1,
    };
    tStem.count = tBloom.count = Math.min(tn, TN);
    tBloom.setColorAt(i, col.setHex(trail[i].c));
  }
  function trailTick(dt, dis) {
    for (let i = 0; i < Math.min(tn, TN); i++) {
      const f = trail[i];
      if (!f) continue;
      f.t = Math.min(1, f.t + dt * 0.8);
      const g = dis * f.s * smooth(0, 1, f.t),
        h = f.h * g,
        w = Math.min(1, g * 1.4);
      m4.compose(
        ps.set(f.x, f.y, f.z),
        q.identity(),
        sc.set(w, Math.max(0.001, h), w),
      );
      tStem.setMatrixAt(i, m4);
      m4.compose(
        ps.set(f.x, f.y + h, f.z),
        q.identity(),
        sc.set(w, w * (0.6 + 0.4 * Math.sin(f.t * 3)), w),
      );
      tBloom.setMatrixAt(i, m4);
    }
    tStem.instanceMatrix.needsUpdate = tBloom.instanceMatrix.needsUpdate = true;
    if (tBloom.instanceColor) tBloom.instanceColor.needsUpdate = true;
  }
  // ripples at the shore
  const ripples = [];
  for (let i = 0; i < 6; i++) {
    const r = new THREE.Mesh(
      new THREE.RingGeometry(0.8, 1, 32),
      new THREE.MeshBasicMaterial({
        color: 0xcfe8ff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
        fog: false,
      }),
    );
    r.rotation.x = -Math.PI / 2;
    r.visible = false;
    scene.add(r);
    ripples.push({ m: r, t: i / 6 });
  }
  // ---- state machine (everything is a pure function of game time, so it resumes correctly after a reload)
  const T = { rise: 5, walk: 31, pause: 41, morph: 51, giant: 80, end: 93 },
    E = () => ({ x: HEART.x, z: HEART.z });
  function startPoint() {
    const e = E(),
      d = Math.hypot(e.x, e.z) || 1,
      ux = e.x / d,
      uz = e.z / d;
    let r = 4;
    while (r < 80 && gh(e.x + ux * r, e.z + uz * r) > SEA - 0.02) r++;
    r += 7;
    return { x: e.x + ux * r, z: e.z + uz * r };
  }
  let item = null,
    active = false,
    evN = 0,
    walkAcc = 0,
    lastX = 0,
    lastZ = 0,
    stepT = 0,
    bow = 0,
    blink = 0,
    earT = 2,
    pose = 0,
    sndT = 0;
  const godItem = () => ({
    id: "forestGod",
    kind: "fgod",
    x: 0,
    z: 0,
    r: 0,
    reach: 6.5,
    root: GOD,
    hint: "🦌 The forest god… tap to greet",
  });
  function eventTime() {
    const N0 = dayNo(),
      into = X6.gt - (N0 - 1) * DAYLEN;
    const N = into < 15 ? N0 - 1 : N0,
      t = X6.gt - ((N - 1) * DAYLEN + 0.74 * DAYLEN);
    return { N, t, full: (N - 1) % 8 === 4 };
  }
  function setAlpha(a) {
    [bodyM, darkM, maskM, antM, hoofM, eyeM, tipM].forEach(
      (m) => (m.opacity = a),
    );
    aura.material.opacity = 0.55 * a;
    ground.material.opacity = 0.4 * a;
  }
  function activate() {
    if (active) return;
    active = true;
    item = godItem();
    addItem(item);
    GOD.visible = true;
    tStem.visible = tBloom.visible = true;
  }
  function deactivate() {
    if (!active) return;
    active = false;
    IG.remove(GOD);
    const i = items.indexOf(item);
    if (i >= 0) items.splice(i, 1);
    item = null;
    stars.material.opacity = 0;
    ripples.forEach((r) => (r.m.visible = false));
    tn = 0;
    trail.length = 0;
    tStem.count = tBloom.count = 0;
  }
  function gait(speed, t, dt) {
    const w = t * (2.2 + speed * 1.2);
    legs.forEach((l) => {
      const a = Math.sin(w + l.ph) * 0.55 * Math.min(1, speed),
        k = Math.max(0, Math.cos(w + l.ph)) * 0.9 * Math.min(1, speed);
      l.hip.rotation.x = L(l.hip.rotation.x, a, 0.25);
      l.knee.rotation.x = L(
        l.knee.rotation.x,
        -k * 0.0 +
          Math.max(0, -Math.sin(w + l.ph + 0.9)) * 1.0 * Math.min(1, speed),
        0.25,
      );
    });
    return Math.sin(w * 2) * 0.03 * Math.min(1, speed);
  }
  function godTick(dt, t) {
    const ev = eventTime(),
      on = ev.full && ev.t >= 0 && ev.t <= T.end;
    if (!on) {
      if (active) deactivate();
      return;
    }
    activate();
    const tt = ev.t,
      e = E(),
      S = startPoint(),
      k = HK;
    // where is it?
    let x,
      z,
      y,
      speed = 0,
      mo = 0,
      grow = 0,
      al = 1,
      face;
    const lerpP = (u) => ({ x: L(S.x, e.x, u), z: L(S.z, e.z, u) });
    if (tt < T.rise) {
      const u = tt / T.rise;
      x = S.x;
      z = S.z;
      y = L(SEA - 3.2, SEA - 0.05, smooth(0, 1, u));
      al = smooth(0, 0.5, u);
      face = Math.atan2(e.x - S.x, e.z - S.z);
    } else if (tt < T.walk) {
      const u = smooth(0, 1, (tt - T.rise) / (T.walk - T.rise)),
        p = lerpP(u);
      x = p.x + Math.sin(tt * 0.35) * 0.8;
      z = p.z + Math.cos(tt * 0.31) * 0.8;
      speed = 1;
      face = Math.atan2(e.x - S.x, e.z - S.z) + Math.sin(tt * 0.4) * 0.08;
    } else if (tt < T.morph) {
      x = e.x;
      z = e.z;
      speed = Math.max(0, 1 - (tt - T.walk) * 1.2);
      face = Math.atan2(S.x - e.x, S.z - e.z) + Math.PI;
      mo = tt > T.pause ? (tt - T.pause) / (T.morph - T.pause) : 0;
    } else if (tt < T.giant) {
      const a = (tt - T.morph) * 0.13 + 0.6,
        r = 9.5;
      x = e.x + Math.cos(a) * r;
      z = e.z + Math.sin(a) * r;
      speed = 0.8;
      face = Math.atan2(-Math.sin(a), Math.cos(a)) + Math.PI;
      mo = 1;
    } else {
      const a = (T.giant - T.morph) * 0.13 + 0.6,
        r = 9.5,
        u = (tt - T.giant) / (T.end - T.giant);
      x = e.x + Math.cos(a) * r;
      z = e.z + Math.sin(a) * r;
      speed = 0;
      face = Math.atan2(-Math.sin(a), Math.cos(a)) + Math.PI;
      mo = 1 - smooth(0, 0.35, u);
      al = 1 - smooth(0.35, 1, u);
    }
    const ground = Math.max(gh(x, z), SEA);
    if (y === undefined) y = ground;
    const gs = 1.35 + 3.9 * smooth(0, 1, mo);
    GOD.position.set(x, y, z);
    GOD.scale.setScalar(gs);
    GOD.rotation.y = L(GOD.rotation.y, face, Math.min(1, dt * 2.2));
    setAlpha(al);
    if (item) {
      item.x = x;
      item.z = z;
      item.reach = 6.5 + gs * 1.3;
    }
    // body language
    const bob = gait(speed, t, dt);
    torso.position.y = 1.65 + bob + Math.sin(t * 1.3) * 0.015;
    torso.scale.y = 1 + Math.sin(t * 1.3) * 0.012;
    const bowing =
      tt > T.walk && tt < T.pause - 1
        ? Math.sin(smooth(T.walk, T.walk + 3, tt) * Math.PI) * 0.0 +
          smooth(T.walk + 1, T.walk + 4, tt) *
            (1 - smooth(T.pause - 3, T.pause - 1, tt))
        : 0;
    bow = L(bow, bowing, 0.08);
    neck.rotation.x =
      0.85 +
      bow * 0.55 +
      Math.sin(t * 0.9) * 0.03 +
      (speed > 0 ? Math.sin(t * 2.2 * (1 + speed * 0.5)) * 0.04 : 0);
    head.rotation.x = -0.55 + bow * 0.45 + Math.sin(t * 0.7 + 1) * 0.025;
    head.rotation.y =
      Math.sin(t * 0.45) * 0.18 * (1 - bow) +
      (tt > T.pause && tt < T.morph ? Math.sin(t * 0.8) * 0.25 : 0);
    blink -= dt;
    const bl = blink < 0 && blink > -0.14 ? 0.12 : 1;
    if (blink < -0.14) blink = 2.5 + Math.random() * 4;
    eyes.forEach((ey) => {
      ey.g.scale.y = bl;
    });
    earT -= dt;
    if (earT < 0) {
      earT = 1.5 + Math.random() * 3;
      ears[Math.random() < 0.5 ? 0 : 1].userData.flick = 0.4;
    }
    ears.forEach((ea, i) => {
      const fl = ea.userData.flick || 0;
      ea.userData.flick = Math.max(0, fl - dt);
      ea.rotation.x = -0.2 + Math.sin((0.4 - fl) * 16) * 0.4 * (fl > 0 ? 1 : 0);
    });
    tail.rotation.z = Math.sin(t * 2.1) * 0.25;
    tail.rotation.x = -1.0 + Math.sin(t * 1.4) * 0.1;
    ant.forEach((g, i) => {
      g.rotation.z =
        (g.userData.rz || (g.userData.rz = g.rotation.z)) +
        Math.sin(t * 0.8 + i * 0.7) * 0.025;
    });
    tips.forEach((tp, i) => {
      const p = 0.75 + 0.25 * Math.sin(t * 2.4 + i);
      tp.scale.setScalar(
        (tp.userData.petal ? 0.09 : 0.07) * p * (1 + gs * 0.0),
      );
    });
    // the face and glow change with the state of the island
    eyeM.color.setRGB(L(1, 1, k), L(0.89, 0.18, k), L(0.48, 0.15, k));
    tipM.color.setRGB(L(0.48, 0.5, k), L(1, 0.12, k), L(0.85, 0.12, k));
    maskM.color.setRGB(L(0.95, 0.62, k), L(0.92, 0.64, k), L(0.85, 0.66, k));
    bodyM.color.setRGB(L(0.86, 0.5, k), L(0.79, 0.5, k), L(0.63, 0.52, k));
    petals.forEach((m) => {
      m.color.copy(m.userData.b).lerp(dead.fl, k * 0.85);
      m.emissiveIntensity = L(0.9, 0.05, k);
    });
    antM.emissiveIntensity = L(0.5, 0.04, k);
    aura.material.color.setRGB(L(1, 0.7, k), L(0.91, 0.12, k), L(0.63, 0.1, k));
    aura.material.opacity = al * L(0.55, 0.3, k);
    const night = smooth(0, 1, mo);
    bodyM.emissive.setRGB(
      L(0.23, 0.2, night),
      L(0.17, 0.2, night),
      L(0.06, 0.7, night),
    );
    bodyM.emissiveIntensity = L(0.35, 0.9, night);
    bodyM.opacity = al * L(1, 0.62, night);
    darkM.opacity = al * L(1, 0.55, night);
    stars.material.opacity = night * al * 0.95;
    bodyGlow.material.opacity = night * al * 0.55 * (1 - HK * 0.6);
    for (let i = 0; i < SN; i++) {
      const b = sb[i];
      sp[i * 3 + 1] = 1.7 + b[1] * 0.8 + Math.sin(t * 0.6 + b[3]) * 0.04;
    }
    sg.attributes.position.needsUpdate = true;
    // footsteps → flowers and sound
    const moved = Math.hypot(x - lastX, z - lastZ);
    lastX = x;
    lastZ = z;
    if (speed > 0 && tt > T.rise) {
      walkAcc += moved;
      stepT -= dt;
      if (walkAcc > (k > 0.55 ? 2.4 : 0.8) && ground > SEA + 0.02) {
        walkAcc = 0;
        const n = k > 0.55 ? 1 : 3;
        for (let j = 0; j < n; j++) {
          const a = Math.random() * 6.283,
            rr = 0.5 + Math.random() * 1.6 * gs * 0.5;
          plant(x + Math.cos(a) * rr, z + Math.sin(a) * rr, k);
        }
        if (k < 0.55) burst(x, 0.3, z, 0xffc8ff, 6, 1.2, 1.5);
      }
      if (stepT <= 0) {
        stepT = 0.62 / (1 + speed * 0.3) / (gs > 2 ? 0.55 : 1);
        tone(gs > 2 ? 45 : 70, 0.2, "sine", 0.05 + gs * 0.01);
      }
    }
    if (mo > 0 && mo < 1 && Math.random() < dt * 10)
      burst(
        x + (Math.random() - 0.5) * 3,
        gs * 0.7,
        z + (Math.random() - 0.5) * 3,
        0xdfe8ff,
        3,
        2,
        3,
      );
    if (tt > T.pause && tt < T.morph && k < 0.55) {
      if (Math.random() < dt * 14)
        plant(
          e.x + (Math.random() - 0.5) * 9,
          e.z + (Math.random() - 0.5) * 9,
          k,
        );
    }
    sndT -= dt;
    if (sndT <= 0) {
      sndT = 2.6;
      tone(k > 0.55 ? 98 : 130 + mo * 30, 2.6, "sine", 0.028 + mo * 0.02);
      tone(k > 0.55 ? 147 : 196, 2.2, "triangle", 0.012, 0.4);
    }
    if (tt > T.morph - 4 && tt < T.morph - 3.9) tone(220, 2, "sine", 0.05);
    // dissolve into light at dawn
    const dis =
      tt > T.giant
        ? 1 - smooth(0.45, 1, (tt - T.giant) / (T.end - T.giant))
        : 1;
    trailTick(dt, dis);
    if (tt > T.giant && Math.random() < dt * 22)
      burst(
        x + (Math.random() - 0.5) * 7,
        Math.random() * 6,
        z + (Math.random() - 0.5) * 7,
        [0xffc8ff, 0x9ff4ff, 0xffe27a][Math.floor(Math.random() * 3)],
        4,
        2,
        3,
      );
    if (tt > T.end - 0.5 && !ev.done && X6.god.end !== ev.N) {
      X6.god.end = ev.N;
      sv6();
      toast(
        k < 0.55
          ? "🌅 The forest god returns to the sea, leaving flowers behind"
          : "🌅 The forest god fades into the mist…",
      );
    }
    // ripples while it is in the water
    ripples.forEach((r, i) => {
      const inW = ground <= SEA + 0.05 && tt < T.walk + 3;
      r.m.visible = inW;
      if (!inW) return;
      r.t = (r.t + dt * 0.35) % 1;
      r.m.position.set(x, SEA + 0.04, z);
      r.m.scale.setScalar(0.6 + r.t * 5);
      r.m.material.opacity = (1 - r.t) * 0.55 * al;
    });
    // the first time the player is near: a greeting
    if (!X6.god.met && Math.hypot(me3.x - x, me3.z - z) < 22) {
      X6.god.met = 1;
      sv6();
      toast(
        "🌕 Full moon… something enormous and gentle is walking out of the sea 🦌",
      );
    }
  }
  // tapping the god
  const _e6 = exInt6;
  exInt6 = function (it) {
    if (it.kind === "fgod") {
      if (!active) return true;
      const k = HK,
        N = eventTime().N;
      if (k > 0.55) {
        toast(
          "🥀 The forest god regards you with sorrowful eyes. Clear the air and it will bless you.",
        );
        tone(98, 1.2, "sine", 0.06);
        return true;
      }
      if (X6.god.gift === N) {
        toast("🌸 The forest god already blessed you tonight. Walk with it.");
        return true;
      }
      X6.god.gift = N;
      sv6();
      bow = 1.2;
      tone(262, 1.4, "sine", 0.06);
      tone(392, 1.6, "sine", 0.05, 0.3);
      tone(523, 1.8, "sine", 0.04, 0.6);
      burst(me3.x, 1.6, me3.z, 0xffe27a, 40, 3, 4);
      addInv(
        { gem: 2, seed: 3, heart: 1 },
        "🌕 The forest god bows its antlers to you. +2 gems, +3 seeds, +1 heart",
      );
      return true;
    }
    return _e6(it);
  };
  // wire into the frame
  const _ht = hauntTick;
  hauntTick = function (dt, t) {
    _ht(dt, t);
    const inF =
        !inCave &&
        Math.abs(me3.x - HAUNT.x) < HAUNT.R + 8 &&
        Math.abs(me3.z - HAUNT.z) < HAUNT.hz + 8,
      dxn = Math.abs(me3.x - HAUNT.x) / HAUNT.R,
      dzn = Math.abs(me3.z - HAUNT.z) / HAUNT.hz,
      f2 = inCave ? 0 : 1 - smooth(0.75, 1.15, Math.max(dxn, dzn));
    hauntBlend(dt, t, inF, f2);
  };
  const _x = window.exTick;
  window.exTick = function (dt, t) {
    _x(dt, t);
    if (!ready) return;
    moonTick();
    godTick(dt, t);
  };
})();
const _xT = window.exTick;
window.exTick = function (dt, t) {
  _xT(dt, t);
  towerTick(dt, t);
};

(function halong() {
  const CX = 130,
    CZ = -95,
    pos = [],
    col = [],
    idx = [],
    C = [0x7f8b86, 0x9aa393, 0x5aa24c, 0x3d8f48, 0x7bc65a].map(
      (h) => new THREE.Color(h),
    ),
    c = new THREE.Color(),
    pts = [];
  function tower(x, z, r, h, sd) {
    const S = 14,
      N = 10,
      b = pos.length / 3;
    for (let i = 0; i <= N; i++) {
      const f = i / N;
      for (let k = 0; k < S; k++) {
        const a = (k / S) * 6.283,
          w =
            1 +
            (vn(Math.cos(a) * 1.7 + sd, Math.sin(a) * 1.7 + f * 2.5, 77) -
              0.5) *
              0.55,
          rr =
            i === N
              ? 0
              : r * w * (1 + 0.35 * Math.pow(1 - f, 3)) * (1 - 0.5 * f * f);
        pos.push(x + Math.cos(a) * rr, -1.2 + h * f, z + Math.sin(a) * rr);
        const n = vn(a * 3 + sd, f * 6, 78);
        if (f < 0.12) c.copy(C[0]);
        else if (f < 0.22) c.copy(C[1]).lerp(C[2], (f - 0.12) * 10);
        else
          c.copy(C[2])
            .lerp(C[3], n)
            .lerp(C[4], f * f * 0.7);
        col.push(c.r, c.g, c.b);
      }
    }
    for (let i = 0; i < N; i++)
      for (let k = 0; k < S; k++) {
        const k2 = (k + 1) % S,
          a = b + i * S + k,
          a2 = b + i * S + k2,
          d = b + (i + 1) * S + k,
          d2 = b + (i + 1) * S + k2;
        idx.push(a, d, a2, a2, d, d2);
      }
    COLL.push({ x, z, r: r * 0.85 });
  }
  for (let i = 0; i < 500 && pts.length < 40; i++) {
    const a = hs(i, 1, 9) * 6.283,
      d = 6 + Math.pow(hs(i, 2, 9), 0.8) * 62,
      x = CX + Math.cos(a) * d * 1.25,
      z = CZ + Math.sin(a) * d,
      r = 2.4 + hs(i, 3, 9) * 4.2,
      h = (0.35 + hs(i, 4, 9) * 0.65) * (46 - d * 0.28) + 8;
    if (pts.every((p) => Math.hypot(p[0] - x, p[1] - z) > p[2] + r + 1.5)) {
      pts.push([x, z, r]);
      tower(x, z, r, h, i);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  scene.add(
    new THREE.Mesh(
      g,
      M(0xffffff, {
        vertexColors: true,
        flatShading: true,
        roughness: 1,
        side: THREE.DoubleSide,
      }),
    ),
  );
  let seen = 0;
  setInterval(() => {
    if (ready && !seen && Math.hypot(me3.x - CX, me3.z - CZ) < 80) {
      seen = 1;
      toast("🌿 Ha Long Bay");
    }
  }, 2000);
})();
(function perf() {
  const FB = new THREE.Sphere(
      new THREE.Vector3(HAUNT.x, 3, HAUNT.z),
      Math.hypot(HAUNT.R, HAUNT.hz) + 14,
    ),
    inF = (x, z) =>
      Math.abs(x - HAUNT.x) < HAUNT.R + 8 &&
      Math.abs(z - HAUNT.z) < HAUNT.hz + 8;
  function cull() {
    const m = new THREE.Matrix4(),
      v = new THREE.Vector3();
    scene.traverse((o) => {
      if (!o.isMesh || o.frustumCulled !== false) return;
      if (o.isInstancedMesh && o.count > 0) {
        o.getMatrixAt(0, m);
        v.setFromMatrixPosition(m).applyMatrix4(o.matrixWorld);
        if (inF(v.x, v.z)) {
          o.geometry.boundingSphere = FB.clone();
          o.frustumCulled = true;
        }
      } else if (
        !o.isInstancedMesh &&
        o.geometry.attributes.position.count > 300
      ) {
        o.geometry.computeBoundingSphere();
        const s = o.geometry.boundingSphere;
        if (s && s.radius < 60 && inF(s.center.x, s.center.z))
          o.frustumCulled = true;
      }
    });
  }
  cull();
  setTimeout(cull, 4000);
  hfMist.forEach((s, i) => {
    if (i % 3) s.layers.set(1);
  });
  let pr = Math.min(devicePixelRatio || 1, 1.5),
    n = 0,
    t0 = performance.now(),
    good = 0,
    sf = 0;
  R.setPixelRatio(pr);
  R.setSize(innerWidth, innerHeight, false);
  R.shadowMap.autoUpdate = false;
  const rr = R.render.bind(R);
  R.render = function (a, b) {
    if ((sf++ & 1) === 0) R.shadowMap.needsUpdate = true;
    rr(a, b);
    n++;
    const t = performance.now();
    if (t - t0 > 2000) {
      const f = (n * 1000) / (t - t0);
      n = 0;
      t0 = t;
      let p = pr;
      if (f < 42 && pr > 0.75) {
        p = pr - 0.25;
        good = 0;
      } else if (f > 57 && pr < 1.5 && ++good >= 3) {
        p = pr + 0.25;
        good = 0;
      }
      if (p !== pr) {
        pr = p;
        R.setPixelRatio(pr);
        R.setSize(innerWidth, innerHeight, false);
      }
    }
  };
})();
(async function bridge() {
  const M0 = window.__MP;
  if (!M0) return;
  try {
    let net = M0.net;
    if (!net) {
      const room = await claude.use("room");
      if (!room) return;
      net = {
        send: (o) => room.presence(o),
        on: (f) => {
          room.onPeers((ch) => {
            const o = ch.peers.find(
              (p) =>
                !p.isMe &&
                p.kind === "viewer" &&
                p.presence &&
                p.presence.x !== undefined,
            );
            f(o ? o.presence : null);
          });
        },
      };
    }
    let had = 0,
      pb = null;
    net.on((pr) => {
      const o = !!(pr && pr.x !== undefined);
      window.__rp = o ? { x: pr.x, z: pr.z, y: pr.y, ry: pr.ry } : null;
      window.__pp = pr;
      if (o && !had) {
        had = 1;
        if (ready) toast("💕 " + nm(other()) + " is on the island");
      } else if (!o && had) {
        had = 0;
        toast("👋 " + nm(other()) + " left");
      }
    });
    setInterval(() => {
      if (!ready) return;
      const off = new Date().getTimezoneOffset() * 6e4;
      net.send({
        u: uid,
        x: me3.x,
        z: me3.z,
        y: me3.y,
        ry: me3.ry,
        sl: sailing ? 1 : 0,
        bh: BO.h,
        tl: now() + timeOff - off,
      });
      const pp = window.__pp;
      if (partner && partner.g) partner.g.visible = !!window.__rp;
      if (pp && pp.u && pp.u !== uid && window.__rp) {
        if (uid > pp.u && pp.tl && !window.__cmT) {
          const want = pp.tl + off - now();
          if (Math.abs(want - timeOff) > 3000) timeOff = want;
        }
        if (!pb && boatItem && boatItem.root) {
          pb = boatItem.root.clone(true);
          scene.add(pb);
        }
        if (pb) {
          pb.visible = !!pp.sl;
          if (pp.sl) {
            pb.position.set(pp.x, SEA - 0.12, pp.z);
            pb.rotation.set(0, pp.bh || 0, 0, "YXZ");
          }
        }
      } else if (pb) pb.visible = false;
    }, 90);
  } catch (e) {}
})();
// ---------- v5.6: creative mode: flying + 10 sandbox weapons (all creative-only)
const CRE = {
  on: false,
  fly: false,
  w: -1,
  up: false,
  dn: false,
  bpm: 2,
  combo: 0,
  comboT: 0,
  cd: 0,
  firing: false,
  last: -1,
};
window.slimeAt = function () {
  return false;
};
{
  const VV = THREE.Vector3,
    rnd = Math.random,
    GR = 18,
    BPMS = [60, 90, 120, 160, 200],
    CWN = [
      [
        "Gravity Anchor",
        "🌀",
        0x9a6bff,
        "Fire: tether things to a point · Alt: reverse polarity, launch outward",
      ],
      [
        "Paint-Splatter Portal Gun",
        "🎨",
        0x20e0ff,
        "Fire: cyan portal paint · Alt: magenta portal paint",
      ],
      [
        "Re-Ragger",
        "🧵",
        0xffb020,
        "Fire: tag two objects to weld them · Alt: cut all cables",
      ],
      [
        "Glitch Ray",
        "📡",
        0x40ff90,
        "Fire: 10s of inverted gravity, zero mass, violent vibration",
      ],
      [
        "Soundwave Boombox",
        "📻",
        0xff4aa0,
        "Fire: pulses on/off · Alt: change BPM ( [ ] too )",
      ],
      [
        "Micro-Black-Hole Grenade",
        "⚫",
        0x8a5aff,
        "Fire: throw a 4 second singularity",
      ],
      [
        "Mimic Morph-Dart",
        "🦆",
        0xffe040,
        "Fire: turn a target into a harmless thing · Alt: revert all",
      ],
      [
        "Slime-Trail SMG",
        "🟢",
        0x7aff3a,
        "Hold fire: slime that turns floors into ice",
      ],
      [
        "Decoy Hologram Projector",
        "👤",
        0x40d0ff,
        "Fire: deploy a taunting hologram clone",
      ],
      [
        "Phase-Shift Sledgehammer",
        "🔨",
        0xc8d0e0,
        "Fire: swing through a wall and smash the other side",
      ],
    ],
    CE = [],
    FXL = [],
    SLM = [],
    LNK = [],
    PORT = { a: null, b: null, cd: 0 },
    CRG = new THREE.Group(),
    RC = new THREE.Raycaster();
  CRG.userData.cre = 1;
  scene.add(CRG);
  const hl = (c, s, o) => {
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: HALO,
        color: c,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
        opacity: o || 0.8,
      }),
    );
    sp.scale.set(s, s, 1);
    sp.userData.cre = 1;
    return sp;
  };
  const bm = (c, o) =>
    new THREE.MeshBasicMaterial(Object.assign({ color: c }, o));
  const dist3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  // ---- entities: props, ragdoll dummies, cops, the dog (everything the weapons can push around)
  function pos(e) {
    if (e.t === "p") return [e.x, e.y, e.z];
    const o = e.o;
    return [o.x, hm(o.x, o.z) + (o.oy || 0) + (e.t === "g" ? 1 : 0.6), o.z];
  }
  function rad(e) {
    return e.t === "p" ? Math.max(e.r, e.hr) * 1.05 : e.t === "g" ? 1 : 0.7;
  }
  function vel(e) {
    const h = e.t === "p" ? e : e.o;
    return h.pv || (h.pv = { x: 0, y: 0, z: 0 });
  }
  function holder(e) {
    return e.t === "p" ? e : e.o;
  }
  function mass(e) {
    const h = holder(e);
    return h.glT > 0 ? 0.2 : e.t === "p" ? e.mass : e.t === "g" ? 1.2 : 0.7;
  }
  function kick(e, x, y, z) {
    const m = mass(e),
      v = vel(e);
    v.x += x / m;
    v.y += y / m;
    v.z += z / m;
  }
  function ents() {
    const a = CE.slice();
    GD.forEach((o) => {
      if (o.st === "down" && o.dead) return;
      a.push(o.ad || (o.ad = { t: "g", o }));
    });
    if (!DOG.dead) a.push(DOG.ad || (DOG.ad = { t: "d", o: DOG }));
    return a;
  }
  function alive(e) {
    return e.t === "p"
      ? CE.includes(e)
      : e.t === "g"
        ? !(e.o.st === "down" && e.o.dead)
        : !DOG.dead;
  }
  function mkProp(k, x, z, drop) {
    let vis = new THREE.Group(),
      r = 0.55,
      hr = 0.55,
      mass = 1,
      bounce = 0.3,
      fr = 2.5;
    const cast = (m) => {
      m.castShadow = true;
      vis.add(m);
      return m;
    };
    if (k === "crate") {
      cast(new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.1, 1.1), M(0x9a7a4a)));
      cast(
        new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.12, 1.14), M(0x5a3a1e)),
      );
      r = 0.65;
      hr = 0.55;
    } else if (k === "barrel") {
      cast(
        new THREE.Mesh(
          new THREE.CylinderGeometry(0.42, 0.42, 0.95, 12),
          M(0xc23a2a, { metalness: 0.3, roughness: 0.6 }),
        ),
      );
      [-0.28, 0.28].forEach((y) => {
        const t = new THREE.Mesh(
          new THREE.TorusGeometry(0.42, 0.03, 5, 14),
          M(0x222226),
        );
        t.rotation.x = Math.PI / 2;
        t.position.y = y;
        vis.add(t);
      });
      r = 0.45;
      hr = 0.48;
      mass = 1.4;
    } else if (k === "ball") {
      const c = [0xff5aa0, 0x5ac8ff, 0xffd04a, 0x7aff7a][Math.floor(rnd() * 4)];
      cast(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 16, 12),
          M(c, { roughness: 0.4 }),
        ),
      );
      r = hr = 0.55;
      mass = 0.6;
      bounce = 0.8;
      fr = 0.9;
    } else if (k === "pillar") {
      cast(
        new THREE.Mesh(
          new THREE.CylinderGeometry(0.6, 0.65, 3, 12),
          M(0x9a9890, { roughness: 1 }),
        ),
      );
      r = 0.75;
      hr = 1.5;
      mass = 6;
      bounce = 0.15;
    } else {
      const g = mkGuard3();
      g.userData.sec.visible = false;
      g.position.y = -1;
      vis.add(g);
      vis.userData.rag = g;
      r = 0.55;
      hr = 1;
      mass = 1.2;
      bounce = 0.2;
      fr = 3;
    }
    const m = new THREE.Group();
    m.add(vis);
    m.userData.cre = 1;
    CRG.add(m);
    const e = {
      t: "p",
      k,
      m,
      vis,
      x,
      y: hm(x, z) + hr + (drop || 0),
      z,
      pv: { x: 0, y: 0, z: 0 },
      r,
      hr,
      mass,
      bounce,
      fr,
      glT: 0,
      ang: rnd() * 6,
      tilt: 0,
      mm: null,
      morphT: 0,
      pcd: 0,
    };
    m.position.set(e.x, e.y, e.z);
    CE.push(e);
    return e;
  }
  function spawn(kinds, n) {
    const f = Math.atan2(Math.sin(me3.ry), Math.cos(me3.ry));
    for (let i = 0; i < n; i++) {
      const k = kinds[Math.floor(rnd() * kinds.length)],
        a = me3.ry + (rnd() - 0.5) * 1.6,
        d = 4 + rnd() * 5,
        x = me3.x + Math.sin(a) * d,
        z = me3.z + Math.cos(a) * d;
      if (hm(x, z) < 0.3) continue;
      mkProp(k, x, z, 2 + rnd() * 3);
    }
  }
  function propStep(e, dt, t) {
    const v = e.pv,
      gl = e.glT > 0,
      h = Math.max(hm(e.x, e.z), SEA - 0.2);
    v.y -= (gl ? -6 : GR) * dt;
    if (gl) {
      v.x += (rnd() - 0.5) * 50 * dt;
      v.z += (rnd() - 0.5) * 50 * dt;
      v.y += (rnd() - 0.5) * 34 * dt;
    }
    e.x += v.x * dt;
    e.y += v.y * dt;
    e.z += v.z * dt;
    const gy = Math.max(hm(e.x, e.z), SEA - 0.2) + e.hr;
    let ground = false;
    if (e.y < gy) {
      e.y = gy;
      ground = true;
      if (v.y < -1.6) v.y = -v.y * (gl ? 1.1 : e.bounce);
      else v.y = 0;
      const sl = slimeAt(e.x, e.z),
        f = Math.min(1, dt * (sl ? 0.12 : e.fr));
      v.x *= 1 - f;
      v.z *= 1 - f;
      const k = sl ? 3.2 : 1,
        sx = hm(e.x + 0.5, e.z) - hm(e.x - 0.5, e.z),
        sz = hm(e.x, e.z + 0.5) - hm(e.x, e.z - 0.5);
      v.x -= sx * 7 * dt * k;
      v.z -= sz * 7 * dt * k;
    } else {
      v.x *= 1 - dt * 0.05;
      v.z *= 1 - dt * 0.05;
    }
    if (e.y < hm(e.x, e.z) + 4)
      for (let i = 0; i < COLL.length; i++) {
        const c = COLL[i];
        if (c.r < 0.15) continue;
        const dx = e.x - c.x,
          dz = e.z - c.z,
          m = c.r + e.r * 0.8;
        if (dx * dx + dz * dz >= m * m) continue;
        const d = Math.hypot(dx, dz) || 1e-3,
          nx = dx / d,
          nz = dz / d;
        e.x = c.x + nx * m;
        e.z = c.z + nz * m;
        const dn = v.x * nx + v.z * nz;
        if (dn < 0) {
          v.x -= 1.5 * dn * nx;
          v.z -= 1.5 * dn * nz;
        }
      }
    if (ground && Math.hypot(v.x, v.z) < 0.06 && Math.abs(v.y) < 0.06 && !gl) {
      v.x = v.z = v.y = 0;
    }
    const sp = Math.hypot(v.x, v.z);
    e.m.position.set(e.x, e.y, e.z);
    if (gl) {
      e.m.position.x += (rnd() - 0.5) * 0.14;
      e.m.position.y += (rnd() - 0.5) * 0.14;
      e.m.position.z += (rnd() - 0.5) * 0.14;
    }
    if (e.k === "dummy") {
      const mv = sp > 2.2 || !ground;
      e.tilt += ((mv ? 1.3 : 0) - e.tilt) * Math.min(1, dt * 6);
      e.m.rotation.set(
        Math.sin(t * 9 + e.ang) * 0.5 * e.tilt,
        Math.atan2(v.x, v.z) || e.m.rotation.y,
        Math.cos(t * 7 + e.ang) * 0.8 * e.tilt,
      );
    } else if (
      e.k === "ball" ||
      e.k === "crate" ||
      e.k === "barrel" ||
      e.k === "pillar"
    ) {
      if (sp > 0.2 || !ground) {
        e.m.rotation.x += v.z * dt * (e.k === "ball" ? 1.8 : 0.7);
        e.m.rotation.z -= v.x * dt * (e.k === "ball" ? 1.8 : 0.7);
        e.m.rotation.y += (gl ? 8 : 0.3) * dt * (rnd() - 0.4);
      }
    }
    if (e.mm && e.k !== "dummy") e.mm.rotation.y += dt * 0.5;
  }
  function actStep(e, dt, t) {
    const o = e.o,
      v = o.pv;
    if (!v) return;
    const gl = o.glT > 0,
      dog = e.t === "d";
    o.oy = o.oy || 0;
    if (o.oy > 0.02 || v.y > 0.1 || gl) v.y -= (gl ? -5 : GR) * dt;
    o.x += v.x * dt;
    o.z += v.z * dt;
    const r = pushOut(o.x, o.z, 0.4);
    o.x = r[0];
    o.z = r[1];
    o.oy += v.y * dt;
    if (o.oy <= 0) {
      o.oy = 0;
      if (v.y < 0) v.y = 0;
      const sl = slimeAt(o.x, o.z),
        f = Math.min(1, dt * (sl ? 0.25 : 5));
      v.x *= 1 - f;
      v.z *= 1 - f;
    } else {
      v.x *= 1 - dt * 0.08;
      v.z *= 1 - dt * 0.08;
    }
    const sp = Math.hypot(v.x, v.z),
      air = o.oy > 0.05;
    if (o.st !== "down") {
      o.g.position.set(o.x, Math.max(hm(o.x, o.z), SEA) + o.oy, o.z);
      const k = Math.min(1, sp / 5 + (air ? 0.6 : 0));
      if (!o.morph) {
        o.g.rotation.z = Math.sin(t * 14 + o.home[0]) * 0.55 * k;
        if (!dog) o.g.rotation.x = Math.cos(t * 11) * 0.45 * k;
      }
    }
    if (!air && sp < 0.08 && Math.abs(v.y) < 0.05 && !gl) {
      o.pv = null;
      o.g.rotation.z = 0;
      if (!dog) o.g.rotation.x = 0;
    }
  }
  // ---- ray casting: entities, terrain, meshes
  let WML = [],
    WMT = -9;
  const ex = new Set();
  function isVis(o) {
    while (o) {
      if (!o.visible) return false;
      o = o.parent;
    }
    return true;
  }
  function worldMeshes() {
    if (performance.now() - WMT < 2500) return WML;
    WMT = performance.now();
    ex.clear();
    [me3.g, DOG.g, ...GD.map((o) => o.g)].forEach(
      (g) => g && g.traverse((o) => ex.add(o)),
    );
    WML = [];
    scene.traverse((o) => {
      if (!o.isMesh || o.userData.cre || ex.has(o) || !isVis(o)) return;
      let m = o.material;
      if (Array.isArray(m)) m = m[0];
      if (!m || m.transparent || m.wireframe || m.visible === false) return;
      if (
        o.geometry.type === "PlaneGeometry" &&
        o.geometry.attributes.position.count > 8000
      )
        return;
      if (
        o.geometry.type === "SphereGeometry" &&
        o.geometry.parameters.radius > 30
      )
        return;
      let p = o.parent,
        bad = false;
      while (p) {
        if (p.userData && p.userData.cre) {
          bad = true;
          break;
        }
        p = p.parent;
      }
      if (!bad) WML.push(o);
    });
    return WML;
  }
  function gnorm(x, z) {
    return new VV(
      -(hm(x + 0.5, z) - hm(x - 0.5, z)),
      1,
      -(hm(x, z + 0.5) - hm(x, z - 0.5)),
    ).normalize();
  }
  function rayAll(o, d, maxD, skipEnt) {
    const best = {
      t: maxD,
      p: o.clone().addScaledVector(d, maxD),
      n: new VV(0, 1, 0),
      e: null,
      hit: false,
    };
    if (!skipEnt)
      ents().forEach((e) => {
        const c = pos(e),
          R = rad(e),
          ox = o.x - c[0],
          oy = o.y - c[1],
          oz = o.z - c[2],
          b = ox * d.x + oy * d.y + oz * d.z,
          cc = ox * ox + oy * oy + oz * oz - R * R,
          ds = b * b - cc;
        if (ds < 0) return;
        const t = -b - Math.sqrt(ds);
        if (t > 0.4 && t < best.t) {
          best.t = t;
          best.e = e;
          best.hit = true;
          best.p = o.clone().addScaledVector(d, t);
          best.n = new VV(
            best.p.x - c[0],
            best.p.y - c[1],
            best.p.z - c[2],
          ).normalize();
        }
      });
    {
      let hitT = null;
      for (let t = 0.8; t < best.t; t += 0.7) {
        const x = o.x + d.x * t,
          y = o.y + d.y * t,
          z = o.z + d.z * t;
        if (y < Math.max(hm(x, z), SEA - 0.3)) {
          let a = t - 0.7,
            b2 = t;
          for (let k = 0; k < 8; k++) {
            const m = (a + b2) / 2;
            if (
              o.y + d.y * m <
              Math.max(hm(o.x + d.x * m, o.z + d.z * m), SEA - 0.3)
            )
              b2 = m;
            else a = m;
          }
          hitT = b2;
          break;
        }
      }
      if (hitT !== null && hitT < best.t) {
        best.t = hitT;
        best.e = null;
        best.hit = true;
        best.p = o.clone().addScaledVector(d, hitT);
        best.n = gnorm(best.p.x, best.p.z);
      }
    }
    RC.set(o, d);
    RC.near = 0.3;
    RC.far = best.t;
    RC.camera = cam;
    let hits = [];
    try {
      hits = RC.intersectObjects(worldMeshes(), false);
    } catch (er) {}
    if (hits.length && hits[0].distance < best.t) {
      const h = hits[0];
      best.t = h.distance;
      best.e = null;
      best.hit = true;
      best.p = h.point.clone();
      best.n = h.face
        ? h.face.normal.clone().transformDirection(h.object.matrixWorld)
        : new VV(0, 1, 0);
    }
    if (best.n.dot(d) > 0) best.n.negate();
    return best;
  }
  function aim(maxD) {
    cam.updateMatrixWorld();
    const d = new VV();
    cam.getWorldDirection(d);
    return rayAll(cam.position.clone(), d, maxD || 90);
  }
  const muz = () =>
    new VV(
      me3.x + Math.sin(me3.ry) * 0.5,
      me3.y + 1.25,
      me3.z + Math.cos(me3.ry) * 0.5,
    );
  // ---- effects
  function fx(f) {
    FXL.push(f);
  }
  function proj(a, b, col, speed, size, done) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(size || 0.14, 8, 6),
      bm(col),
    );
    m.userData.cre = 1;
    m.add(hl(col, (size || 0.14) * 9, 0.7));
    m.position.copy(a);
    CRG.add(m);
    const L = a.distanceTo(b),
      dur = Math.max(0.04, L / (speed || 55));
    let t = 0;
    fx((dt) => {
      t += dt;
      const k = Math.min(1, t / dur);
      m.position.lerpVectors(a, b, k);
      if (k >= 1) {
        CRG.remove(m);
        done && done();
        return true;
      }
    });
  }
  function ringFx(x, y, z, R, sp, col, flat) {
    const m = new THREE.Mesh(
      new THREE.RingGeometry(0.92, 1, 44),
      bm(col, {
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        depthWrite: false,
        fog: false,
      }),
    );
    m.userData.cre = 1;
    if (flat !== false) m.rotation.x = -Math.PI / 2;
    m.position.set(x, y, z);
    m.scale.setScalar(0.2);
    CRG.add(m);
    let r = 0.2;
    fx((dt) => {
      r += sp * dt;
      m.scale.setScalar(r);
      m.material.opacity = Math.max(0, 0.9 * (1 - r / R));
      if (r >= R) {
        CRG.remove(m);
        return true;
      }
    });
  }
  function cable(col, rd) {
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(rd || 0.045, rd || 0.045, 1, 5),
      bm(col),
    );
    m.userData.cre = 1;
    CRG.add(m);
    return m;
  }
  function setCable(m, a, b) {
    const dx = b[0] - a[0],
      dy = b[1] - a[1],
      dz = b[2] - a[2],
      L = Math.hypot(dx, dy, dz) || 0.01;
    m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    m.scale.set(1, L, 1);
    m.quaternion.setFromUnitVectors(
      new VV(0, 1, 0),
      new VV(dx / L, dy / L, dz / L),
    );
  }
  function sound(f, d, ty, v) {
    tone(f, d, ty || "sine", v || 0.1);
  }
  // ---- 1 Gravity Anchor
  let ANC = null;
  function killAnchor() {
    if (!ANC) return;
    CRG.remove(ANC.m);
    ANC.cab.forEach((c) => CRG.remove(c));
    ANC = null;
  }
  function fireAnchor(alt) {
    if (alt) {
      if (!ANC) {
        toast("🌀 Fire first to place an anchor");
        return;
      }
      const p = ANC.p;
      ANC.set.forEach((e) => {
        if (!alive(e)) return;
        const c = pos(e);
        let dx = c[0] - p.x,
          dy = c[1] - p.y,
          dz = c[2] - p.z;
        let d = Math.hypot(dx, dy, dz);
        if (d < 0.05) {
          dx = rnd() - 0.5;
          dy = rnd();
          dz = rnd() - 0.5;
          d = Math.hypot(dx, dy, dz);
        }
        const s = 17 + rnd() * 10;
        kick(e, (dx / d) * s, (dy / d) * s + 6, (dz / d) * s);
      });
      ringFx(p.x, p.y, p.z, 13, 22, 0xb890ff, false);
      ringFx(p.x, p.y, p.z, 11, 30, 0xffffff, true);
      burst(p.x, p.y, p.z, 0xb890ff, 40, 7, 5);
      sound(70, 0.5, "sawtooth", 0.25);
      sound(900, 0.3, "square", 0.08);
      toast("💥 Polarity reversed!");
      killAnchor();
      return;
    }
    const h = aim(70),
      p = h.p.clone().addScaledVector(h.n, h.hit ? 0.7 : 0);
    killAnchor();
    const set = new Set();
    ents().forEach((e) => {
      if (dist3(pos(e), [p.x, p.y, p.z]) < 8) set.add(e);
    });
    const m = new THREE.Group(),
      core = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 14, 10),
        bm(0xd8c0ff),
      );
    m.add(core);
    for (let i = 0; i < 2; i++) {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(0.9 + i * 0.4, 0.04, 6, 28),
        bm(0x9a6bff),
      );
      r.rotation.x = i ? 1.2 : 0.3;
      m.add(r);
    }
    m.add(hl(0x9a6bff, 4));
    m.position.copy(p);
    m.userData.cre = 1;
    CRG.add(m);
    ANC = { p, set, t: 0, m, cab: new Map() };
    proj(muz(), p, 0x9a6bff, 60, 0.18);
    ringFx(p.x, p.y, p.z, 8, 16, 0x9a6bff, false);
    sound(200, 0.3, "triangle", 0.15);
    toast("🌀 " + set.size + " tethered · Alt = reverse polarity");
  }
  function anchorTick(dt, t) {
    if (!ANC) return;
    const A = ANC;
    A.t += dt;
    A.m.children[1].rotation.z += dt * 3;
    A.m.children[2].rotation.y += dt * 4;
    const p = A.p;
    A.set.forEach((e) => {
      if (!alive(e)) {
        A.set.delete(e);
        const c = A.cab.get(e);
        if (c) {
          CRG.remove(c);
          A.cab.delete(e);
        }
        return;
      }
      const c = pos(e),
        v = vel(e),
        k = 1 / Math.max(0.7, Math.sqrt(mass(e)));
      v.x += ((p.x - c[0]) * 16 - v.x * 3.4) * dt * k;
      v.y +=
        ((p.y - c[1]) * 16 - v.y * 3.4) * dt * k +
        GR * dt * (e.t === "p" && e.y <= hm(e.x, e.z) + e.hr + 0.05 ? 0 : 0);
      v.z += ((p.z - c[2]) * 16 - v.z * 3.4) * dt * k;
      let cb = A.cab.get(e);
      if (!cb) {
        cb = cable(0xb890ff, 0.03);
        A.cab.set(e, cb);
      }
      setCable(cb, [p.x, p.y, p.z], c);
    });
    if (A.t > 16) killAnchor();
  }
  // ---- 2 Paint portals
  function mkPortal(col) {
    const g = new THREE.Group();
    g.userData.cre = 1;
    const d = new THREE.Mesh(
        new THREE.CircleGeometry(0.95, 28),
        bm(col, {
          transparent: true,
          opacity: 0.82,
          side: THREE.DoubleSide,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -4,
          polygonOffsetUnits: -4,
          fog: false,
        }),
      ),
      r = new THREE.Mesh(
        new THREE.RingGeometry(0.95, 1.18, 28),
        bm(0xffffff, {
          transparent: true,
          opacity: 0.95,
          side: THREE.DoubleSide,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -5,
          polygonOffsetUnits: -5,
          fog: false,
        }),
      );
    g.add(d, r, hl(col, 4.2, 0.6));
    g.userData.ring = r;
    return g;
  }
  function firePaint(alt) {
    const o = alt ? "b" : "a",
      col = alt ? 0xff2ad0 : 0x10e8ff,
      h = aim(80);
    if (!h.hit || h.e) {
      toast("🎨 Aim at a wall or the ground");
      return;
    }
    const p = h.p.clone();
    proj(muz(), p, col, 70, 0.2, () => {
      if (PORT[o]) CRG.remove(PORT[o].g);
      const g = mkPortal(col),
        n = h.n.clone(),
        c = p.clone().addScaledVector(n, 0.06);
      g.position.copy(c);
      g.lookAt(c.clone().add(n));
      CRG.add(g);
      PORT[o] = { p, n, g };
      burst(p.x, p.y + 0.2, p.z, col, 28, 4, 3);
      sound(alt ? 520 : 760, 0.2, "triangle", 0.14);
      if (PORT.a && PORT.b) toast("🌀 Portals linked!");
    });
  }
  function exitPos(P) {
    const n = P.n;
    if (Math.abs(n.y) > 0.65) {
      return {
        x: P.p.x,
        y: P.p.y + (n.y > 0 ? 0.2 : -2.4),
        z: P.p.z,
        vx: 0,
        vz: 0,
        vy: n.y > 0 ? 5 : -2,
      };
    }
    return {
      x: P.p.x + n.x * 1.3,
      y: Math.max(P.p.y - 0.9, hm(P.p.x + n.x * 1.3, P.p.z + n.z * 1.3)),
      z: P.p.z + n.z * 1.3,
      vx: n.x * 4,
      vz: n.z * 4,
      vy: 0,
    };
  }
  function portalTick(dt) {
    PORT.cd -= dt;
    if (!PORT.a || !PORT.b) return;
    [
      [PORT.a, PORT.b],
      [PORT.b, PORT.a],
    ].forEach(([s, d]) => {
      if (PORT.cd <= 0) {
        const cx = me3.x - s.p.x,
          cy = me3.y + 0.9 - s.p.y,
          cz = me3.z - s.p.z;
        if (cx * cx + cy * cy + cz * cz < 1.2) {
          const q = exitPos(d);
          me3.x = q.x;
          me3.y = q.y;
          me3.z = q.z;
          me3.vx = q.vx;
          me3.vz = q.vz;
          me3.vy = q.vy;
          PORT.cd = 1.1;
          try {
            snapCam();
          } catch (er) {}
          burst(
            q.x,
            q.y + 1,
            q.z,
            d === PORT.b ? 0xff2ad0 : 0x10e8ff,
            24,
            4,
            3,
          );
          sound(660, 0.15, "sine", 0.12);
          sound(990, 0.2, "sine", 0.1);
        }
      }
      ents().forEach((e) => {
        const h = holder(e);
        if ((h.pcd || 0) > 0) return;
        const c = pos(e);
        if (dist3(c, [s.p.x, s.p.y, s.p.z]) < 1.05 + rad(e) * 0.5) {
          const q = exitPos(d),
            v = vel(e),
            sp = Math.max(3, Math.hypot(v.x, v.y, v.z));
          if (e.t === "p") {
            e.x = q.x;
            e.y = q.y + e.hr;
            e.z = q.z;
          } else {
            h.x = q.x;
            h.z = q.z;
            h.oy = Math.max(0, q.y - hm(q.x, q.z));
          }
          const n = d.n;
          v.x = n.x * sp;
          v.y = n.y * sp + 1;
          v.z = n.z * sp;
          h.pcd = 1.2;
          burst(q.x, q.y + 1, q.z, 0xffffff, 12, 3, 2);
        }
      });
    });
  }
  // ---- 3 Re-Ragger
  let SEL = null,
    SELH = null;
  function clearSel() {
    SEL = null;
    if (SELH) {
      CRG.remove(SELH);
      SELH = null;
    }
  }
  function fireRag(alt) {
    if (alt) {
      LNK.forEach((l) => CRG.remove(l.c));
      const n = LNK.length;
      LNK.length = 0;
      clearSel();
      toast(n ? "✂️ Cut " + n + " cable(s)" : "✂️ No cables");
      sound(300, 0.1, "square", 0.1);
      return;
    }
    const h = aim(80);
    if (!h.e) {
      clearSel();
      toast("🧵 Aim at a prop, dummy or cop");
      return;
    }
    proj(muz(), h.p.clone(), 0xffb020, 70, 0.12, () => {
      const e = h.e;
      if (!SEL || !alive(SEL)) {
        SEL = e;
        if (SELH) CRG.remove(SELH);
        SELH = hl(0xffb020, 3.2, 0.9);
        CRG.add(SELH);
        sound(500, 0.1, "triangle", 0.12);
        toast("🧵 Tagged! Shoot a second object to stitch them");
        return;
      }
      if (e === SEL) {
        return;
      }
      if (
        LNK.some(
          (l) => (l.a === SEL && l.b === e) || (l.a === e && l.b === SEL),
        )
      ) {
        clearSel();
        return;
      }
      const len = Math.max(1.4, Math.min(7, dist3(pos(SEL), pos(e))));
      const c = cable(0xffd060, 0.05);
      LNK.push({ a: SEL, b: e, len, c });
      clearSel();
      burst(h.p.x, h.p.y, h.p.z, 0xffd060, 18, 3, 2);
      sound(700, 0.15, "square", 0.1);
      toast("🧵 Stitched!");
    });
  }
  function ragTick(dt) {
    if (SEL && SELH) {
      if (!alive(SEL)) clearSel();
      else {
        const c = pos(SEL);
        SELH.position.set(c[0], c[1] + 0.3, c[2]);
      }
    }
    for (let i = LNK.length; i--;) {
      const L = LNK[i];
      if (!alive(L.a) || !alive(L.b)) {
        CRG.remove(L.c);
        LNK.splice(i, 1);
        continue;
      }
      const a = pos(L.a),
        b = pos(L.b),
        dx = b[0] - a[0],
        dy = b[1] - a[1],
        dz = b[2] - a[2],
        d = Math.hypot(dx, dy, dz) || 0.01;
      setCable(L.c, a, b);
      if (d > L.len) {
        const nx = dx / d,
          ny = dy / d,
          nz = dz / d,
          va = vel(L.a),
          vb = vel(L.b),
          ma = mass(L.a),
          mb = mass(L.b),
          rv = (vb.x - va.x) * nx + (vb.y - va.y) * ny + (vb.z - va.z) * nz,
          f = ((d - L.len) * 30 + rv * 5) * dt;
        va.x += (nx * f) / ma;
        va.y += (ny * f) / ma;
        va.z += (nz * f) / ma;
        vb.x -= (nx * f) / mb;
        vb.y -= (ny * f) / mb;
        vb.z -= (nz * f) / mb;
      }
    }
  }
  // ---- 4 Glitch Ray
  function fireGlitch() {
    const h = aim(80);
    proj(muz(), h.p.clone(), 0x40ff90, 80, 0.12);
    if (!h.e) {
      toast("📡 Aim at a prop, dummy or cop");
      return;
    }
    const e = h.e,
      o = holder(e);
    o.glT = 10;
    vel(e).y += 3;
    sound(150, 0.4, "sawtooth", 0.18);
    sound(1400, 0.2, "square", 0.07);
    burst(h.p.x, h.p.y, h.p.z, 0x40ff90, 26, 4, 4);
    if (!o.gs) {
      o.gs = hl(0x40ff90, 3.4, 0.8);
      (e.t === "p" ? e.m : o.g).add(o.gs);
      o.gs.position.y = e.t === "p" ? 0 : 1;
    }
    toast("📡 Glitched for 10 seconds!");
  }
  function glitchTick(dt, t) {
    ents().forEach((e) => {
      const o = holder(e);
      if (o.glT > 0) {
        o.glT -= dt;
        if (o.gs)
          o.gs.material.color.setHex(Math.random() < 0.5 ? 0x40ff90 : 0xff40d0);
        if (rnd() < dt * 8)
          burst(pos(e)[0], pos(e)[1], pos(e)[2], 0x40ff90, 2, 2, 2);
        if (o.glT <= 0) {
          o.glT = 0;
          if (o.gs) {
            (e.t === "p" ? e.m : o.g).remove(o.gs);
            o.gs = null;
          }
        }
      }
    });
  }
  // ---- 5 Boombox
  const BB = { on: false, acc: 0, pulses: [] };
  function fireBox(alt) {
    if (alt) {
      CRE.bpm = (CRE.bpm + 1) % BPMS.length;
      toast("📻 " + BPMS[CRE.bpm] + " BPM");
      sound(400 + CRE.bpm * 120, 0.08, "square", 0.08);
      cwHud();
      return;
    }
    BB.on = !BB.on;
    BB.acc = 0;
    toast(
      BB.on ? "📻 Boombox ON · " + BPMS[CRE.bpm] + " BPM" : "📻 Boombox off",
    );
  }
  function pulse() {
    const bpm = BPMS[CRE.bpm],
      k = (bpm - 60) / 140,
      R = 16 - 10.5 * k,
      sp = 9 + k * 22,
      S = 16 - 8 * k;
    const x = me3.x,
      z = me3.z,
      y = hm(x, z) + 0.15;
    const P = { x, z, y, R, sp, S, r: 0, hit: new Set() };
    BB.pulses.push(P);
    ringFx(x, y, z, R, sp, k > 0.5 ? 0xff4aa0 : 0x4a8aff, true);
    sound(k > 0.5 ? 160 : 60, 0.2 + (1 - k) * 0.25, "sine", 0.28);
    if (k > 0.5) sound(2200, 0.03, "square", 0.025);
    if (k < 0.3) sound(45, 0.5, "sine", 0.3);
  }
  function boxTick(dt) {
    if (BB.on) {
      BB.acc += dt;
      const iv = 60 / BPMS[CRE.bpm];
      if (BB.acc >= iv) {
        BB.acc -= iv;
        pulse();
      }
    }
    for (let i = BB.pulses.length; i--;) {
      const P = BB.pulses[i];
      P.r += P.sp * dt;
      let hit = 0;
      ents().forEach((e) => {
        if (P.hit.has(e)) return;
        const c = pos(e),
          dx = c[0] - P.x,
          dz = c[2] - P.z,
          d = Math.hypot(dx, dz);
        if (d <= P.r && d < P.R) {
          P.hit.add(e);
          hit++;
          const s = P.S * (1 - (d / P.R) * 0.6),
            n = d || 1;
          kick(e, (dx / n) * s, s * 0.5, (dz / n) * s);
        }
      });
      if (hit) {
        CRE.combo += hit;
        CRE.comboT = 4;
        cwHud();
      }
      if (P.r >= P.R) BB.pulses.splice(i, 1);
    }
    if (CRE.comboT > 0) {
      CRE.comboT -= dt;
      if (CRE.comboT <= 0) {
        CRE.combo = 0;
        cwHud();
      }
    }
  }
  // ---- 6 Micro-black-hole
  const BHS = [];
  function throwBH() {
    const h = aim(60),
      a = muz(),
      d = h.p.clone().sub(a).normalize(),
      v = d.clone().multiplyScalar(19);
    v.y += 4;
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 10, 8),
      bm(0x080810),
    );
    m.add(hl(0x8a5aff, 1.6, 0.9));
    m.userData.cre = 1;
    m.position.copy(a);
    CRG.add(m);
    let t = 0;
    sound(300, 0.15, "triangle", 0.1);
    fx((dt) => {
      t += dt;
      v.y -= GR * dt;
      m.position.addScaledVector(v, dt);
      const g = Math.max(hm(m.position.x, m.position.z), SEA) + 0.25;
      if (m.position.y < g || t > 2.2) {
        CRG.remove(m);
        openBH(
          new VV(m.position.x, Math.max(m.position.y, g) + 0.9, m.position.z),
        );
        return true;
      }
    });
  }
  function openBH(p) {
    const g = new THREE.Group(),
      core = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 16, 12),
        bm(0x000000),
      ),
      ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.3, 0.12, 8, 32),
        bm(0xb090ff, { transparent: true, opacity: 0.9, fog: false }),
      ),
      ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(1.9, 0.05, 6, 32),
        bm(0xff70d0, { transparent: true, opacity: 0.7, fog: false }),
      );
    g.add(core, ring, ring2, hl(0x8a5aff, 6, 0.7));
    g.position.copy(p);
    g.userData.cre = 1;
    CRG.add(g);
    BHS.push({ p, t: 0, g, ring, ring2 });
    sound(80, 1, "sawtooth", 0.2);
  }
  function bhTick(dt, t) {
    for (let i = BHS.length; i--;) {
      const B = BHS[i];
      B.t += dt;
      B.ring.rotation.x = 1.2;
      B.ring.rotation.z += dt * 6;
      B.ring2.rotation.x = 1.4;
      B.ring2.rotation.z -= dt * 9;
      const sc = B.t > 3.6 ? 1 + (B.t - 3.6) * -2 : 1;
      B.g.scale.setScalar(Math.max(0.1, sc));
      ents().forEach((e) => {
        const c = pos(e),
          dx = B.p.x - c[0],
          dy = B.p.y - c[1],
          dz = B.p.z - c[2],
          d = Math.hypot(dx, dy, dz);
        if (d > 18 || d < 0.01) return;
        const f =
            ((30 * (1 - d / 18) + 7) * dt) / Math.sqrt(Math.max(0.4, mass(e))),
          v = vel(e);
        v.x += (dx / d) * f + (-dz / d) * 5 * dt;
        v.y += (dy / d) * f + GR * dt * 0.9;
        v.z += (dz / d) * f + (dx / d) * 5 * dt;
        const k = Math.max(0, 1 - dt * (d < 2.5 ? 6 : 0.5));
        v.x *= k;
        v.y *= k;
        v.z *= k;
        if (e.t === "p") e.pcd = Math.max(e.pcd || 0, 0.1);
      });
      if (B.t >= 4) {
        const p = B.p;
        ents().forEach((e) => {
          const c = pos(e),
            dx = c[0] - p.x,
            dy = c[1] - p.y,
            dz = c[2] - p.z,
            d = Math.hypot(dx, dy, dz);
          if (d > 18) return;
          const n = d || 1,
            s = 24 * (1 - d / 18) + 8;
          kick(e, (dx / n) * s, (dy / n) * s * 0.5 + s * 0.45, (dz / n) * s);
        });
        ringFx(p.x, p.y, p.z, 18, 36, 0xffffff, false);
        ringFx(p.x, hm(p.x, p.z) + 0.2, p.z, 16, 28, 0xb090ff, true);
        burst(p.x, p.y, p.z, 0xb090ff, 60, 9, 6);
        sound(55, 0.6, "sawtooth", 0.3);
        sound(1200, 0.15, "square", 0.1);
        CRG.remove(B.g);
        BHS.splice(i, 1);
      }
    }
  }
  // ---- 7 Morph dart
  const MN = [
    "🦆 Rubber duck!",
    "🚧 Traffic cone!",
    "🍉 Watermelon!",
    "🐔 Rubber chicken!",
    "🎃 Pumpkin!",
  ];
  function mkMorph(i, s) {
    const g = new THREE.Group(),
      A = (geo, mat, x, y, z, sx, sy, sz) => {
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x, y, z);
        if (sx) m.scale.set(sx, sy, sz);
        m.castShadow = true;
        g.add(m);
        return m;
      },
      S = THREE.SphereGeometry;
    if (i === 0) {
      const y = M(0xffd820, { roughness: 0.4 });
      A(new S(0.5, 14, 10), y, 0, 0.45, 0, 1, 0.85, 1.2);
      A(new S(0.3, 12, 8), y, 0, 1.0, 0.4);
      A(new THREE.BoxGeometry(0.28, 0.1, 0.3), M(0xff8a10), 0, 0.97, 0.72);
      A(new THREE.SphereGeometry(0.05, 6, 5), M(0x111111), 0.14, 1.08, 0.62);
      A(new THREE.SphereGeometry(0.05, 6, 5), M(0x111111), -0.14, 1.08, 0.62);
    } else if (i === 1) {
      A(new THREE.ConeGeometry(0.45, 1.3, 14), M(0xff6a10), 0, 0.75, 0);
      A(
        new THREE.CylinderGeometry(0.3, 0.34, 0.2, 14),
        M(0xf4f4f4),
        0,
        0.75,
        0,
      );
      A(new THREE.BoxGeometry(1, 0.1, 1), M(0x2a2a2e), 0, 0.05, 0);
    } else if (i === 2) {
      A(
        new S(0.6, 16, 12),
        M(0x2e8a3a, { roughness: 0.6 }),
        0,
        0.55,
        0,
        1.25,
        1,
        1,
      );
      for (let k = 0; k < 4; k++) {
        const r = A(
          new THREE.TorusGeometry(0.6, 0.03, 5, 20),
          M(0x14501e),
          0,
          0.55,
          0,
          1.25,
          1,
          1,
        );
        r.rotation.y = k * 0.78;
      }
    } else if (i === 3) {
      const w = M(0xf8f8f8, { roughness: 0.5 });
      A(new S(0.5, 14, 10), w, 0, 0.6, 0, 1, 1.1, 1.3);
      A(new S(0.3, 12, 8), w, 0, 1.3, 0.35);
      A(new THREE.BoxGeometry(0.1, 0.2, 0.2), M(0xe02020), 0, 1.65, 0.38);
      A(
        new THREE.ConeGeometry(0.09, 0.25, 6),
        M(0xff9a10),
        0,
        1.28,
        0.7,
      ).rotation.x = Math.PI / 2;
      [-0.2, 0.2].forEach((x) =>
        A(
          new THREE.CylinderGeometry(0.04, 0.04, 0.4, 5),
          M(0xff9a10),
          x,
          0.2,
          0,
        ),
      );
    } else {
      A(
        new S(0.6, 14, 10),
        M(0xff7a14, { roughness: 0.6 }),
        0,
        0.5,
        0,
        1.2,
        0.9,
        1.2,
      );
      A(
        new THREE.CylinderGeometry(0.06, 0.09, 0.3, 6),
        M(0x3a6a20),
        0,
        1.05,
        0,
      );
    }
    g.scale.setScalar(s);
    return g;
  }
  function morphEnt(e, i) {
    const o = holder(e);
    unmorph(e);
    const s = Math.max(0.8, rad(e) * 1.05),
      mm = mkMorph(i, s);
    mm.userData.cre = 1;
    if (e.t === "p") {
      e.vis.visible = false;
      mm.position.y = -e.hr;
      e.m.add(mm);
      e.mm = mm;
    } else {
      o.mmv = [];
      o.g.children.forEach((c) => {
        if (c !== o.g.userData.sec && !c.isSprite) {
          o.mmv.push(c);
          c.visible = false;
        }
      });
      o.g.add(mm);
      o.mm = mm;
      o.morph = 1;
    }
    o.morphT = 22;
    return mm;
  }
  function unmorph(e) {
    const o = holder(e);
    if (e.t === "p") {
      if (e.mm) {
        e.m.remove(e.mm);
        e.mm = null;
        e.vis.visible = true;
      }
    } else if (o.mm) {
      o.g.remove(o.mm);
      o.mm = null;
      (o.mmv || []).forEach((c) => (c.visible = true));
      o.mmv = null;
      o.morph = 0;
    }
    o.morphT = 0;
  }
  function fireMorph(alt) {
    if (alt) {
      let n = 0;
      ents().forEach((e) => {
        if (holder(e).morphT > 0) {
          unmorph(e);
          n++;
        }
      });
      toast(n ? "🦆 Reverted " + n : "Nothing is morphed");
      return;
    }
    const h = aim(80);
    proj(muz(), h.p.clone(), 0xffe040, 75, 0.1, () => {});
    if (!h.e) {
      toast("🦆 Aim at a prop, dummy or cop");
      return;
    }
    const i = Math.floor(rnd() * MN.length);
    morphEnt(h.e, i);
    burst(h.p.x, h.p.y, h.p.z, 0xffe040, 30, 4, 4);
    sound(900, 0.1, "square", 0.1);
    sound(1300, 0.2, "triangle", 0.1);
    toast(MN[i]);
  }
  function morphTick(dt, t) {
    ents().forEach((e) => {
      const o = holder(e);
      if (o.morphT > 0) {
        o.morphT -= dt;
        if (o.mm && e.t !== "p")
          o.mm.position.y = Math.abs(Math.sin(t * 6 + o.home[0])) * 0.12;
        if (e.t !== "p" && o.g.userData.sec) o.g.userData.sec.visible = false;
        if (o.morphT <= 0) unmorph(e);
      }
    });
  }
  // ---- 8 Slime SMG
  function slimeAtF(x, z) {
    for (let i = 0; i < SLM.length; i++) {
      const s = SLM[i];
      if ((x - s.x) * (x - s.x) + (z - s.z) * (z - s.z) < s.r * s.r)
        return true;
    }
    return false;
  }
  window.slimeAt = slimeAtF;
  const SLG = new THREE.CircleGeometry(1, 18);
  function addSlime(x, y, z, r) {
    const m = new THREE.Mesh(
      SLG,
      bm(0x66ff2a, {
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -3,
        polygonOffsetUnits: -3,
        fog: false,
      }),
    );
    m.userData.cre = 1;
    m.rotation.x = -Math.PI / 2;
    m.scale.setScalar(r);
    m.position.set(x, y + 0.05, z);
    CRG.add(m);
    SLM.push({ x, z, r: r * 0.95, m, t: 0 });
    if (SLM.length > 90) {
      const o = SLM.shift();
      CRG.remove(o.m);
    }
  }
  function fireSlime() {
    const o = cam.position.clone(),
      d = new VV();
    cam.getWorldDirection(d);
    d.x += (rnd() - 0.5) * 0.05;
    d.y += (rnd() - 0.5) * 0.04;
    d.z += (rnd() - 0.5) * 0.05;
    d.normalize();
    const h = rayAll(o, d, 60);
    const p = h.p.clone();
    proj(muz(), p, 0x7aff3a, 55, 0.12, () => {
      if (h.e) {
        holder(h.e).slimeT = 8;
        burst(p.x, p.y, p.z, 0x7aff3a, 8, 3, 2);
        return;
      }
      if (h.hit && h.n.y > 0.5) addSlime(p.x, p.y, p.z, 0.9 + rnd() * 0.5);
      else burst(p.x, p.y, p.z, 0x7aff3a, 6, 2, 1.5);
    });
    if (rnd() < 0.5) sound(260 + rnd() * 80, 0.05, "square", 0.04);
  }
  function slimeTick(dt, t) {
    for (let i = SLM.length; i--;) {
      const s = SLM[i];
      s.t += dt;
      if (s.t > 45) {
        s.m.material.opacity = Math.max(0, 0.62 * (1 - (s.t - 45) / 5));
        if (s.t > 50) {
          CRG.remove(s.m);
          SLM.splice(i, 1);
        }
      }
    }
    GD.forEach((o) => {
      if (o.st === "down") return;
      if (o.px === undefined) {
        o.px = o.x;
        o.pz = o.z;
      }
      const sl = slimeAtF(o.x, o.z) || o.slimeT > 0;
      if (o.slimeT > 0) o.slimeT -= dt;
      if (sl && dt > 0) {
        const sv = o.sv || (o.sv = { x: 0, z: 0 }),
          dx = (o.x - o.px) / dt,
          dz = (o.z - o.pz) / dt;
        sv.x += (dx - sv.x) * Math.min(1, dt * 1.2);
        sv.z += (dz - sv.z) * Math.min(1, dt * 1.2);
        const r = pushOut(o.px + sv.x * dt, o.pz + sv.z * dt, 0.4);
        o.x = r[0];
        o.z = r[1];
        o.ry += Math.sin(t * 5 + o.home[0]) * dt * 2.2;
        if (!o.morph) o.g.rotation.z = Math.sin(t * 10) * 0.18;
      } else if (o.sv) {
        o.sv.x *= 1 - dt * 3;
        o.sv.z *= 1 - dt * 3;
      }
      o.px = o.x;
      o.pz = o.z;
    });
    if (DOG.slimeT > 0) DOG.slimeT -= dt;
  }
  // ---- 9 Decoy hologram
  const DEC = [];
  function fireDecoy() {
    while (DEC.length >= 2) killDecoy(DEC[0], false);
    const c = makeChar(0x40d0ff, 0x2a6aa0);
    c.scale.setScalar(0.78);
    const hm0 = new THREE.MeshBasicMaterial({
      color: 0x40e0ff,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: false,
    });
    c.traverse((o) => {
      if (o.isMesh) o.material = hm0;
      if (o.isSprite) o.visible = false;
    });
    c.userData.cre = 1;
    const x = me3.x + Math.sin(me3.ry) * 2.5,
      z = me3.z + Math.cos(me3.ry) * 2.5;
    c.add(hl(0x40e0ff, 3.5, 0.5));
    c.children[c.children.length - 1].position.y = 1.2;
    c.position.set(x, hm(x, z), z);
    CRG.add(c);
    const D = {
      g: c,
      u: c.userData.u,
      x,
      z,
      ry: me3.ry,
      t: 0,
      hp: 3,
      ph: 0,
      life: 14,
    };
    DEC.push(D);
    ringFx(x, hm(x, z) + 0.1, z, 3, 6, 0x40e0ff, true);
    sound(500, 0.2, "triangle", 0.12);
    sound(800, 0.2, "triangle", 0.1);
    toast("👤 Decoy deployed!");
  }
  function killDecoy(D, boom) {
    const i = DEC.indexOf(D);
    if (i >= 0) DEC.splice(i, 1);
    CRG.remove(D.g);
    GD.forEach((o) => {
      if (o.dec === D) o.dec = null;
    });
    if (boom) {
      const y = hm(D.x, D.z) + 1.2;
      [0xff4a8a, 0x4ad8ff, 0xffe04a, 0x7aff6a, 0xb06aff].forEach((c) =>
        burst(D.x, y, D.z, c, 22, 6, 6),
      );
      sound(200, 0.3, "sawtooth", 0.18);
      sound(1500, 0.25, "triangle", 0.12);
      toast("🎉 The decoy exploded into confetti!");
    }
  }
  function decoyTick(dt, t) {
    for (let i = DEC.length; i--;) {
      const D = DEC[i];
      D.t += dt;
      D.life -= dt;
      let tg = null,
        bd = 26;
      GD.forEach((o) => {
        if (o.st === "down" || o.morph) return;
        const d = Math.hypot(o.x - D.x, o.z - D.z);
        if (d < bd) {
          bd = d;
          tg = o;
        }
      });
      let sx = Math.sin(D.ry),
        sz = Math.cos(D.ry),
        sp = 1.5;
      if (tg && bd > 2.6) {
        D.ry +=
          adif(Math.atan2(tg.x - D.x, tg.z - D.z), D.ry) * Math.min(1, dt * 3);
        sx = Math.sin(D.ry);
        sz = Math.cos(D.ry);
      } else if (tg) {
        D.ry +=
          adif(Math.atan2(tg.x - D.x, tg.z - D.z), D.ry) * Math.min(1, dt * 3);
        sp = 0;
      } else {
        D.ry += Math.sin(t * 0.8 + i) * dt * 0.8;
      }
      const r = pushOut(D.x + sx * sp * dt, D.z + sz * sp * dt, 0.4);
      D.x = r[0];
      D.z = r[1];
      D.g.position.set(D.x, Math.max(hm(D.x, D.z), SEA), D.z);
      D.g.rotation.y = D.ry;
      D.ph += sp * dt * 2.4;
      const s = Math.sin(D.ph) * 0.8,
        u = D.u;
      if (u) {
        u.lL.rotation.x = s;
        u.lR.rotation.x = -s;
        u.aL.rotation.x = -s * 0.9;
        u.aR.rotation.x = sp ? s * 0.9 : -1.2 + Math.sin(t * 8) * 0.5;
      }
      D.g.children.forEach((c) => {
        if (c.isSprite) c.material.opacity = 0.4 + Math.sin(t * 10) * 0.15;
      });
      if (D.life <= 0) {
        killDecoy(D, true);
        continue;
      }
      let punched = false;
      GD.forEach((o) => {
        if (o.st === "down" || o.st === "eat" || o.morph || o.dead) return;
        const d = Math.hypot(o.x - D.x, o.z - D.z);
        if (d < 17 && (d < 7 || losClear(o.x, o.z, D.x, D.z))) {
          if (o.st !== "invest" || o.dec === D) {
            o.st = "invest";
            o.ls = [D.x, D.z];
            o.tm = Math.max(o.tm || 0, 3);
            o.dec = D;
            o.sq = null;
          } else if (d < 7) {
            o.ls = [D.x, D.z];
          }
          if (d < 2.2) {
            D.hp -= dt / 0.7;
            punched = true;
            o.ry +=
              adif(Math.atan2(D.x - o.x, D.z - o.z), o.ry) *
              Math.min(1, dt * 8);
          }
        }
      });
      if (punched && rnd() < dt * 6)
        burst(D.x, hm(D.x, D.z) + 1.2, D.z, 0x40e0ff, 3, 2, 2);
      if (D.hp <= 0) killDecoy(D, true);
    }
  }
  // ---- 10 Phase-shift sledgehammer
  function fireHammer() {
    if (RT.on || CLIMB.on) return;
    const d = new VV();
    cam.getWorldDirection(d);
    let fx0 = d.x,
      fz0 = d.z;
    const l = Math.hypot(fx0, fz0) || 1;
    fx0 /= l;
    fz0 /= l;
    me3.ry = Math.atan2(fx0, fz0);
    me3.act = 0.5;
    sound(180, 0.15, "sawtooth", 0.15);
    const blocked = (x, z) => {
      for (const c of COLL) {
        if (c.r < 0.15) continue;
        if (Math.hypot(x - c.x, z - c.z) < c.r + 0.45) return true;
      }
      return false;
    };
    let dw = null;
    for (let s = 0.5; s < 6; s += 0.25) {
      if (blocked(me3.x + fx0 * s, me3.z + fz0 * s)) {
        dw = s;
        break;
      }
    }
    if (dw === null) {
      const x = me3.x + fx0 * 2.4,
        z = me3.z + fz0 * 2.4;
      setTimeout(() => smash(x, hm(x, z) + 0.2, z), 230);
      return;
    }
    let ex = null;
    for (let s = dw + 0.5; s < dw + 9; s += 0.25) {
      const x = me3.x + fx0 * s,
        z = me3.z + fz0 * s;
      let ok = hm(x, z) > 0.3;
      for (let k = 0; k < 5 && ok; k++) {
        if (blocked(x + fx0 * k * 0.25, z + fz0 * k * 0.25)) ok = false;
      }
      if (ok) {
        ex = [x, z];
        break;
      }
    }
    if (!ex) {
      toast("🔨 Too thick to phase through!");
      const x = me3.x + fx0 * (dw - 0.5),
        z = me3.z + fz0 * (dw - 0.5);
      setTimeout(() => smash(x, hm(x, z) + 0.2, z), 230);
      return;
    }
    const a = [me3.x, me3.y, me3.z],
      b = [ex[0], hm(ex[0], ex[1]) + 0.05, ex[1]];
    for (let k = 0; k < 7; k++) {
      const u = k / 6;
      const s = hl(0xc8e0ff, 2.2, 0.6);
      s.position.set(
        a[0] + (b[0] - a[0]) * u,
        a[1] + 1 + (b[1] - a[1]) * u,
        a[2] + (b[2] - a[2]) * u,
      );
      CRG.add(s);
      let t = 0;
      fx((dt) => {
        t += dt;
        s.material.opacity = Math.max(0, 0.6 - t * 1.3);
        if (t > 0.5) {
          CRG.remove(s);
          return true;
        }
      });
    }
    sound(900, 0.3, "sine", 0.12);
    startRoute([a, b], [0.5], () => smash(b[0], b[1], b[2]));
  }
  function smash(x, y, z) {
    ents().forEach((e) => {
      const c = pos(e),
        dx = c[0] - x,
        dz = c[2] - z,
        d = Math.hypot(dx, dz);
      if (d > 8 || Math.abs(c[1] - y) > 6) return;
      const n = d || 1,
        s = 20 * (1 - d / 8) + 6;
      kick(e, (dx / n) * s, s * 0.7, (dz / n) * s);
    });
    ringFx(x, y + 0.1, z, 8, 24, 0xc8e0ff, true);
    ringFx(x, y + 0.2, z, 5, 16, 0xffffff, true);
    burst(x, y + 0.5, z, 0xc8e0ff, 36, 6, 5);
    burst(x, y + 0.3, z, 0x9a9890, 18, 4, 3);
    sound(70, 0.4, "sawtooth", 0.3);
    sound(1000, 0.1, "square", 0.1);
  }
  // ---- firing + held models + HUD
  const FIRE = [
      fireAnchor,
      firePaint,
      fireRag,
      fireGlitch,
      fireBox,
      throwBH,
      fireMorph,
      fireSlime,
      fireDecoy,
      fireHammer,
    ],
    CD = [0.45, 0.25, 0.3, 0.4, 0.2, 0.9, 0.4, 0.075, 0.8, 0.9];
  const usable = () =>
    CRE.on &&
    CRE.w >= 0 &&
    !inCave &&
    !sailing &&
    !modalOpen &&
    !window.__scope &&
    ready;
  function fireW(alt) {
    if (!usable() || CRE.cd > 0) return;
    CRE.cd = alt && CRE.w !== 4 ? 0.25 : CD[CRE.w];
    try {
      FIRE[CRE.w](alt);
    } catch (er) {
      console.error("cw", er);
    }
  }
  CRE.held = function (i) {
    const g = new THREE.Group(),
      col = CWN[i][2],
      dk = M(0x2a2a32, { metalness: 0.6, roughness: 0.4 }),
      gl = bm(col),
      A = (geo, mat, x, y, z) => {
        const m = new THREE.Mesh(geo, mat);
        m.position.set(x, y, z);
        g.add(m);
        return m;
      };
    if (i === 4) {
      A(new THREE.BoxGeometry(0.5, 0.28, 0.2), dk, 0, 0, 0.1);
      [-0.14, 0.14].forEach(
        (x) =>
          (A(
            new THREE.CylinderGeometry(0.08, 0.08, 0.04, 12),
            gl,
            x,
            0,
            0.21,
          ).rotation.x = Math.PI / 2),
      );
    } else if (i === 5) {
      A(new THREE.SphereGeometry(0.14, 10, 8), M(0x050508), 0, 0, 0.15);
      const r = A(new THREE.TorusGeometry(0.2, 0.02, 5, 16), gl, 0, 0, 0.15);
      r.rotation.x = 1.2;
    } else if (i === 9) {
      A(
        new THREE.CylinderGeometry(0.035, 0.035, 0.9, 6),
        M(0x8a5a3a),
        0,
        0.2,
        0.1,
      );
      A(new THREE.BoxGeometry(0.4, 0.2, 0.2), dk, 0, 0.65, 0.1);
      A(new THREE.BoxGeometry(0.42, 0.04, 0.22), gl, 0, 0.65, 0.1);
    } else if (i === 2) {
      A(new THREE.BoxGeometry(0.12, 0.14, 0.45), dk, 0, 0, 0.2);
      A(
        new THREE.CylinderGeometry(0.04, 0.04, 0.2, 8),
        gl,
        0,
        0,
        0.5,
      ).rotation.x = Math.PI / 2;
    } else {
      A(new THREE.BoxGeometry(0.1, 0.16, i === 7 ? 0.5 : 0.6), dk, 0, 0, 0.25);
      A(
        new THREE.CylinderGeometry(0.05, 0.05, 0.25, 8),
        gl,
        0,
        0,
        i === 7 ? 0.55 : 0.65,
      ).rotation.x = Math.PI / 2;
      if (i === 7) A(new THREE.BoxGeometry(0.08, 0.2, 0.1), dk, 0, -0.15, 0.1);
    }
    return g;
  };
  const bar = document.createElement("div");
  bar.style.cssText =
    "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(env(safe-area-inset-bottom,0px) + 74px);z-index:5;display:none;flex-direction:column;align-items:center;gap:5px;pointer-events:none";
  document.body.appendChild(bar);
  const cross = document.createElement("div");
  cross.style.cssText =
    "position:fixed;left:50%;top:50%;width:22px;height:22px;margin:-11px;z-index:4;pointer-events:none;display:none;background:linear-gradient(#fff,#fff) center/2px 100% no-repeat,linear-gradient(#fff,#fff) center/100% 2px no-repeat;opacity:.75;border-radius:50%;border:1px solid rgba(255,255,255,.6)";
  document.body.appendChild(cross);
  function cwHud() {
    const on = CRE.on;
    bar.style.display = on ? "flex" : "none";
    if (!on) return;
    let s = `<div style="background:var(--glass);border-radius:14px;padding:4px 10px;font:800 12.5px system-ui;max-width:92vw;text-align:center;pointer-events:none">${CRE.w >= 0 ? CWN[CRE.w][1] + " <b>" + CWN[CRE.w][0] + "</b> · " + CWN[CRE.w][3] + (CRE.w === 4 ? ` · ${BPMS[CRE.bpm]} BPM${CRE.combo ? " · combo ×" + CRE.combo : ""}` : "") : "🛠️ Creative: press Y (or 1-9, 0) to take out a weapon · F fire · G alt · double-tap Space to fly"}</div><div style="display:flex;gap:4px;background:var(--glass);border-radius:14px;padding:4px;pointer-events:auto">`;
    CWN.forEach((w, i) => {
      s += `<div class="slot ${i === CRE.w ? "on" : ""}" data-w="${i}" style="width:34px;height:38px;font-size:18px" title="${w[0]}">${w[1]}<b>${(i + 1) % 10}</b></div>`;
    });
    s += "</div>";
    bar.innerHTML = s;
    bar.querySelectorAll("[data-w]").forEach(
      (e) =>
        (e.onclick = (ev) => {
          ev.stopPropagation();
          CRE.w = CRE.w === +e.dataset.w ? -1 : +e.dataset.w;
          cwHud();
        }),
    );
  }
  const btn = (t, css, dn, up) => {
    const b = document.createElement("button");
    b.className = "pill";
    b.textContent = t;
    b.style.cssText =
      "top:auto;left:12px;pointer-events:auto;width:56px;height:56px;border-radius:28px;font-size:22px;padding:0;display:none;z-index:6;" +
      css;
    b.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      dn && dn();
    });
    const u = (e) => {
      up && up();
    };
    b.addEventListener("pointerup", u);
    b.addEventListener("pointerleave", u);
    b.addEventListener("pointercancel", u);
    document.body.appendChild(b);
    return b;
  };
  const bF = btn(
      "🔫",
      "bottom:calc(env(safe-area-inset-bottom,0px) + 150px)",
      () => {
        CRE.firing = true;
        fireW(false);
      },
      () => {
        CRE.firing = false;
      },
    ),
    bA = btn("🔁", "bottom:calc(env(safe-area-inset-bottom,0px) + 214px)", () =>
      fireW(true),
    ),
    bFly = btn(
      "✈️",
      "bottom:calc(env(safe-area-inset-bottom,0px) + 278px)",
      () => CRE.setFly(!CRE.fly),
    ),
    bU = btn(
      "⬆️",
      "bottom:calc(env(safe-area-inset-bottom,0px) + 342px)",
      () => {
        CRE.up = true;
      },
      () => {
        CRE.up = false;
      },
    ),
    bD = btn(
      "⬇️",
      "bottom:calc(env(safe-area-inset-bottom,0px) + 406px)",
      () => {
        CRE.dn = true;
      },
      () => {
        CRE.dn = false;
      },
    );
  const tgl = document.createElement("button");
  tgl.className = "pill";
  tgl.textContent = "🛠️";
  tgl.title = "Creative panel (` or F9)";
  tgl.style.cssText =
    "top:calc(env(safe-area-inset-top,0px) + 96px);right:12px;pointer-events:auto;width:46px;height:40px;padding:0;font-size:20px;opacity:.75";
  tgl.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    dispatchEvent(new KeyboardEvent("keydown", { key: "`" }));
  });
  document.body.appendChild(tgl);
  CRE.setFly = function (v) {
    if (!CRE.on) return;
    CRE.fly = v;
    if (v) {
      me3.vy = 0;
      toast("✈️ Flying! Space = up, Shift = down (double-tap Space to land)");
    } else toast("🪂 Flight off");
  };
  CRE.set = function (v) {
    CRE.on = v;
    if (!v) {
      CRE.fly = false;
      CRE.w = -1;
      CRE.firing = false;
      BB.on = false;
      killAnchor();
      LNK.forEach((l) => CRG.remove(l.c));
      LNK.length = 0;
      clearSel();
    } else toast("🛠️ Creative mode: fly + 10 weapons. Press Y to arm.");
    cwHud();
  };
  CRE.panel = function (B) {
    return `<h4>✨ Creative powers</h4><label><input type="checkbox" data-t="cre"${CRE.on ? " checked" : ""}> Creative mode (flying + 10 weapons)</label>${B("cw:fly", "✈️ Fly on/off")}${B("cw:spawn", "📦 Spawn props")}${B("cw:dummies", "🧍 Spawn dummies")}${B("cw:clear", "🧹 Clear props")}<div>${CWN.map((w, i) => B("cw:w" + i, w[1] + " " + w[0])).join("")}</div>`;
  };
  CRE.cmd = function (c) {
    if (c === "fly") {
      if (!CRE.on) CRE.set(true);
      CRE.setFly(!CRE.fly);
    } else if (c === "spawn") {
      if (!CRE.on) CRE.set(true);
      spawn(["crate", "barrel", "ball", "ball", "pillar"], 10);
      toast("📦 Props dropped in front of you");
    } else if (c === "dummies") {
      if (!CRE.on) CRE.set(true);
      spawn(["dummy"], 5);
      toast("🧍 Dummies spawned");
    } else if (c === "clear") {
      CE.slice().forEach((e) => {
        unmorph(e);
        CRG.remove(e.m);
      });
      CE.length = 0;
      LNK.length = 0;
      toast("🧹 Props cleared");
    } else if (c[0] === "w") {
      if (!CRE.on) CRE.set(true);
      CRE.w = +c.slice(1);
      cwHud();
    }
  };
  // keyboard (capture: runs before the game's own handlers)
  let lastSp = 0;
  addEventListener(
    "keydown",
    (e) => {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (!CRE.on) return;
      const k = e.key.toLowerCase();
      if (k === " " && !e.repeat) {
        const n = performance.now();
        if (n - lastSp < 320) CRE.setFly(!CRE.fly);
        lastSp = n;
      }
      if (k === "y" && !e.repeat) {
        CRE.w = CRE.w >= 0 ? -1 : CRE.last >= 0 ? CRE.last : 0;
        cwHud();
        return;
      }
      if (CRE.w >= 0 && !inCave && k >= "0" && k <= "9" && !e.repeat) {
        const i = k === "0" ? 9 : +k - 1;
        CRE.w = i === CRE.w ? -1 : i;
        cwHud();
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (CRE.w >= 0 && usable()) {
        if (k === "f" && !e.repeat) {
          e.stopImmediatePropagation();
          CRE.firing = true;
          fireW(false);
        } else if (k === "g" && !e.repeat) {
          fireW(true);
        } else if ((k === "[" || k === "]") && CRE.w === 4) {
          CRE.bpm = (CRE.bpm + (k === "]" ? 1 : BPMS.length - 1)) % BPMS.length;
          toast("📻 " + BPMS[CRE.bpm] + " BPM");
          cwHud();
        }
      }
    },
    true,
  );
  addEventListener("keyup", (e) => {
    const k = e.key.toLowerCase();
    if (k === "f") CRE.firing = false;
  });
  // per frame
  let lastW = -2,
    lastF = null;
  const prevTick = window.exTick;
  window.exTick = function (dt, t) {
    prevTick(dt, t);
    if (!ready) return;
    dt = Math.min(dt, 0.05);
    CRE.cd = Math.max(0, CRE.cd - dt);
    if (CRE.w !== lastW) {
      lastW = CRE.w;
      if (CRE.w >= 0) CRE.last = CRE.w;
      cwHud();
    }
    const show = CRE.on && !inCave && !sailing,
      armed = show && CRE.w >= 0;
    bF.style.display = bA.style.display =
      armed && !window.__scope ? "block" : "none";
    bFly.style.display = show ? "block" : "none";
    bU.style.display = bD.style.display = show && CRE.fly ? "block" : "none";
    cross.style.display = armed && !window.__scope ? "block" : "none";
    bar.style.display = CRE.on && !inCave ? "flex" : "none";
    tgl.style.display = modalOpen ? "none" : "block";
    if (armed && CRE.firing && CRE.w === 7) fireW(false);
    for (let i = FXL.length; i--;) {
      if (FXL[i](dt, t)) FXL.splice(i, 1);
    }
    if (
      !CE.length &&
      !ANC &&
      !BB.on &&
      !BHS.length &&
      !LNK.length &&
      !DEC.length &&
      !PORT.a &&
      !PORT.b &&
      !SLM.length &&
      !BB.pulses.length &&
      !GD.some(
        (o) => o.pv || o.glT > 0 || o.morphT > 0 || o.slimeT > 0 || o.sv,
      ) &&
      !DOG.pv &&
      !DOG.glT
    )
      return;
    CE.forEach((e) => {
      if (e.pcd > 0) e.pcd -= dt;
      propStep(e, dt, t);
    });
    for (let i = 0; i < CE.length; i++)
      for (let j = i + 1; j < CE.length; j++) {
        const a = CE[i],
          b = CE[j],
          dx = b.x - a.x,
          dy = b.y - a.y,
          dz = b.z - a.z,
          d = Math.hypot(dx, dy, dz),
          m = (a.r + b.r) * 0.85;
        if (d < m && d > 1e-3) {
          const nx = dx / d,
            ny = dy / d,
            nz = dz / d,
            ov = (m - d) / 2,
            tm = a.mass + b.mass;
          a.x -= ((nx * ov * b.mass) / tm) * 2;
          a.y -= ((ny * ov * b.mass) / tm) * 2;
          a.z -= ((nz * ov * b.mass) / tm) * 2;
          b.x += ((nx * ov * a.mass) / tm) * 2;
          b.y += ((ny * ov * a.mass) / tm) * 2;
          b.z += ((nz * ov * a.mass) / tm) * 2;
          const rv =
            (b.pv.x - a.pv.x) * nx +
            (b.pv.y - a.pv.y) * ny +
            (b.pv.z - a.pv.z) * nz;
          if (rv < 0) {
            const j2 = (-1.5 * rv) / (1 / a.mass + 1 / b.mass);
            a.pv.x -= (j2 * nx) / a.mass;
            a.pv.y -= (j2 * ny) / a.mass;
            a.pv.z -= (j2 * nz) / a.mass;
            b.pv.x += (j2 * nx) / b.mass;
            b.pv.y += (j2 * ny) / b.mass;
            b.pv.z += (j2 * nz) / b.mass;
          }
        }
      }
    GD.forEach((o) => {
      if (o.pcd > 0) o.pcd -= dt;
      if (o.pv || o.glT > 0) actStep(o.ad || (o.ad = { t: "g", o }), dt, t);
    });
    if (DOG.pcd > 0) DOG.pcd -= dt;
    if (DOG.pv || DOG.glT > 0)
      actStep(DOG.ad || (DOG.ad = { t: "d", o: DOG }), dt, t);
    anchorTick(dt, t);
    portalTick(dt);
    ragTick(dt);
    glitchTick(dt, t);
    boxTick(dt);
    bhTick(dt, t);
    morphTick(dt, t);
    slimeTick(dt, t);
    decoyTick(dt, t);
  };
  CRE.flyStep = function (dt, gY) {
    const u = keys[" "] || CRE.up ? 1 : 0,
      d = keys.shift || keys.c || CRE.dn ? 1 : 0;
    me3.vy = (u - d) * 10;
    me3.y += me3.vy * dt;
    if (me3.y < gY) me3.y = gY;
    me3.onG = false;
    if (!CRE.on) CRE.fly = false;
  };
  CRE.T = {
    CE,
    ents,
    fireW,
    aim,
    PORT,
    SLM,
    DEC,
    BHS,
    LNK,
    pos,
    mkProp,
    vel,
    BB,
  };
}

(function creative() {
  let el = null,
    fpsEl = null,
    inf = 0,
    wl = 0,
    fz = null,
    spd = 1,
    hl = 0,
    fps = 0,
    fr = 0,
    ft = performance.now();
  const B = (id, t) => `<button data-c="${id}">${t}</button>`,
    hr = () => {
      const d = new Date(now() + timeOff);
      return d.getHours() + d.getMinutes() / 60;
    },
    q = (s) => el.querySelector(s);
  function build() {
    el = document.createElement("div");
    el.style.cssText =
      "position:fixed;right:10px;top:10px;bottom:10px;width:min(360px,94vw);z-index:60;background:var(--card);color:var(--ink);border-radius:18px;box-shadow:0 8px 30px rgba(0,0,0,.4);overflow:auto;padding:12px;font:14px system-ui;display:none";
    const blocks = BLK.map(
      ([t, ks]) =>
        `<b>${t}</b><div class="g">` +
        ks
          .map(
            (k) =>
              `<button data-b="${k}"><img src="${bIcon(k)}" width="40" height="40" style="image-rendering:pixelated"><br>${BNM[k]}</button>`,
          )
          .join("") +
        "</div>",
    ).join("");
    const tp =
      [
        ["Home", 0, 8],
        ["Forest", HAUNT.x, HAUNT.z],
        ["Ha Long Bay", 105, -95],
        ["Cave door", ENT[0], ENT[1]],
        ["Boat", BOAT0[0], BOAT0[1]],
      ]
        .map(([n, x, z]) => B("tp:" + x + ":" + z, n))
        .join("") + B("tpp", "To partner");
    el.innerHTML = `<style>#cm button{font:inherit;font-weight:700;border:2px solid var(--line);background:var(--card);color:var(--ink);border-radius:10px;padding:6px 8px;margin:2px;cursor:pointer}#cm .g{display:grid;grid-template-columns:repeat(4,1fr)}#cm h4{margin:12px 0 4px}#cm input[type=range]{width:100%}#cm label{display:block;margin:4px 0}</style>
<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:17px">🛠️ Creative / test mode</b>${B("x", "✕")}</div><div style="opacity:.6;font-size:12px">Press ${"`"} or F9 to open/close</div>
<h4>🧱 Blocks (click +16, shift-click +64)</h4>${blocks}${B("all", "Give 64 of every block")}<label><input type="checkbox" data-t="inf"> Infinite blocks</label>
<h4>🌦️ Weather</h4>${["clear", "cloudy", "rain", "storm"].map((w) => B("wx:" + w, w)).join("")}<label><input type="checkbox" data-t="wl"> Lock weather</label>
<h4>🕐 Time of day: <span id="th"></span></h4><input type="range" min="0" max="24" step=".25" id="ts"><label><input type="checkbox" data-t="fz"> Freeze time</label>Speed ${[1, 10, 60, 300].map((s) => B("sp:" + s, "×" + s)).join("")}
<h4>💚 Island health</h4>Air <span id="av"></span><input type="range" min="0" max="100" id="as">Land <span id="lv"></span><input type="range" min="0" max="100" id="ls"><label><input type="checkbox" data-t="hl"> Lock these values</label>
${CRE.panel(B)}<h4>🧭 Teleport</h4>${tp}<h4>📊 Testing</h4><label><input type="checkbox" data-t="fps"> FPS / network overlay</label>${B("chap", "Finish all story chapters")}
<h4>♻️ Reset (reloads the game)</h4>${B("rs", "Reset SOLO island")}${B("rd", "Reset DIRECT together-save")}${B("ro", "New ONLINE shared island")}`;
    el.id = "cm";
    document.body.appendChild(el);
    el.onclick = ck;
    el.oninput = (e) => {
      const t = e.target;
      if (t.id === "ts") {
        const c = hr(),
          h = +t.value;
        timeOff += (((h - c + 36) % 24) - 12) * 36e5;
        window.__cmT = 1;
        if (fz !== null) fz = h;
      }
      if (t.id === "as") {
        AIRV = t.value / 100;
        X6.rec.a = AIRV;
      }
      if (t.id === "ls") {
        LANDV = t.value / 100;
        X6.rec.l = LANDV;
      }
    };
    el.onchange = (e) => {
      const t = e.target.dataset.t;
      if (!t) return;
      const v = e.target.checked;
      if (t === "cre") CRE.set(v);
      if (t === "inf") inf = v;
      if (t === "wl") wl = v;
      if (t === "hl") hl = v;
      if (t === "fz") {
        fz = v ? hr() : null;
        window.__cmT = 1;
      }
      if (t === "fps") fpsEl.style.display = v ? "block" : "none";
    };
    fpsEl = document.createElement("div");
    fpsEl.style.cssText =
      "position:fixed;left:8px;bottom:8px;z-index:60;background:rgba(0,0,0,.65);color:#9f9;font:12px ui-monospace,monospace;padding:6px 8px;border-radius:8px;white-space:pre;display:none;pointer-events:none";
    document.body.appendChild(fpsEl);
  }
  function go(x, z) {
    me3.x = x;
    me3.z = z;
    try {
      snapCam();
    } catch (e) {}
    toast("🧭 Teleported");
  }
  async function ck(e) {
    const t = e.target.closest("button");
    if (!t) return;
    const d = t.dataset,
      i = inv();
    if (d.b) {
      saveMe({
        inv: Object.assign({}, i, {
          [d.b]: (i[d.b] || 0) + (e.shiftKey ? 64 : 16),
        }),
      });
      return;
    }
    const c = d.c || "";
    if (c === "x") return tog();
    if (c.startsWith("cw:")) {
      CRE.cmd(c.slice(3));
      return;
    }
    if (c === "all") {
      const n = Object.assign({}, i);
      BLK.forEach(([a, ks]) =>
        ks.forEach((k) => (n[k] = Math.max(n[k] || 0, 64))),
      );
      saveMe({ inv: n });
      toast("🧱 64 of every block");
    } else if (c.startsWith("wx:")) setWX(c.slice(3));
    else if (c.startsWith("sp:"))
      ((spd = +c.slice(3)), (window.__cmT = 1), toast("Time ×" + spd));
    else if (c.startsWith("tp:")) {
      const [, x, z] = c.split(":");
      go(+x, +z);
    } else if (c === "tpp") {
      window.__rp
        ? go(window.__rp.x + 1.5, window.__rp.z)
        : toast("Partner isn't connected");
    } else if (c === "chap") {
      vup({ chap: 8 });
      toast("⛵ Chapters finished");
    } else if (c === "rs") {
      if (window.__MP)
        return toast(
          "This is a together session. Use the main menu to reset solo.",
        );
      if (!confirm("Reset the SOLO island?")) return;
      ["island_v36", "island_x36", "island_photos36"].forEach((k) =>
        localStorage.removeItem(k),
      );
      fin();
    } else if (c === "rd") {
      if (!(window.__MP && window.__MP.direct))
        return toast("Only in a direct together session");
      if (
        !confirm(
          "Erase the direct together-save? Your partner must do the same or it syncs back.",
        )
      )
        return;
      Object.keys(localStorage)
        .filter((k) => /^(mpd_S|mpd_T|direct_)/.test(k))
        .forEach((k) => localStorage.removeItem(k));
      fin();
    } else if (c === "ro") {
      if (!window.__MP || window.__MP.direct)
        return toast("Only in an online together session");
      if (
        !confirm(
          "Start a brand new ONLINE island? Your partner switches to it when she reloads.",
        )
      )
        return;
      try {
        const dbr = await claude.use("db");
        await dbr
          .doc("meta/world")
          .set({ wid: "g" + Date.now().toString(36), by: uid, t: Date.now() });
        fin();
      } catch (x) {
        toast("Couldn't reset: " + (x.code || x.message));
      }
    }
  }
  function fin() {
    window.__noSave = 1;
    setTimeout(() => location.reload(), 300);
  }
  {
    const si = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) {
      if (window.__noSave) return;
      return si.call(this, k, v);
    };
  }
  function tog() {
    if (!el) build();
    el.style.display = el.style.display === "none" ? "block" : "none";
    if (el.style.display === "block") {
      q("#ts").value = hr();
      q("#as").value = Math.round(AIRV * 100);
      q("#ls").value = Math.round(LANDV * 100);
    }
  }
  addEventListener("keydown", (e) => {
    if (e.key === "`" || e.key === "F9" || e.key === "~") {
      if (!ready) return;
      e.preventDefault();
      tog();
    }
  });
  setInterval(() => {
    if (!ready) return;
    if (inf) {
      const i = inv(),
        n = Object.assign({}, i);
      let ch = 0;
      BLK.forEach(([a, ks]) =>
        ks.forEach((k) => {
          if ((n[k] || 0) < 50) {
            n[k] = 99;
            ch = 1;
          }
        }),
      );
      if (ch) saveMe({ inv: n });
    }
    if (wl) WT.next = 1e9;
    if (spd > 1) timeOff += 100 * (spd - 1);
    if (fz !== null && spd === 1) {
      const c = hr();
      timeOff += (((fz - c + 36) % 24) - 12) * 36e5;
    }
    if (hl) {
      AIRV = q("#as").value / 100;
      LANDV = q("#ls").value / 100;
    }
    if (el && el.style.display === "block") {
      q("#th").textContent = hr().toFixed(1) + "h";
      q("#av").textContent = Math.round(AIRV * 100) + "%";
      q("#lv").textContent = Math.round(LANDV * 100) + "%";
    }
  }, 100);
  (function loop() {
    fr++;
    const t = performance.now();
    if (t - ft > 1000) {
      fps = Math.round((fr * 1000) / (t - ft));
      fr = 0;
      ft = t;
      if (fpsEl && fpsEl.style.display === "block") {
        const pp = window.__pp,
          i = R.info.render;
        fpsEl.textContent =
          "FPS " +
          fps +
          "  px×" +
          R.getPixelRatio() +
          "\ncalls " +
          i.calls +
          "  tris " +
          i.triangles +
          "\nme " +
          me3.x.toFixed(0) +
          "," +
          me3.z.toFixed(0) +
          "\nmode " +
          (window.__MP ? (window.__MP.direct ? "direct" : "online") : "solo") +
          "\npartner " +
          (window.__rp ? "ONLINE" : "no") +
          (pp && pp.u ? "\nclock lead " + (uid < pp.u ? "me" : "her") : "");
      }
    }
    requestAnimationFrame(loop);
  })();
})();
