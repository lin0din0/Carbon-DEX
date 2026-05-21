import * as THREE from 'three';

const container = document.getElementById('hero-lattice');
const heroSection = document.getElementById('hero');
if (!container) throw new Error('hero-lattice container not found');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
camera.position.set(0, 0, 22);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);

const a1 = new THREE.Vector3(Math.sqrt(3), 0, 0);
const a2 = new THREE.Vector3(Math.sqrt(3) / 2, 1.5, 0);
const BOND = 1.42;
const basisA = new THREE.Vector3(0, 0, 0);
const basisB = new THREE.Vector3(Math.sqrt(3) / 2, 0.5, 0);
const RANGE = 4;
const nodes = [];
const bonds = [];
const posMap = new Map();

function key(v) {
  return `${Math.round(v.x * 100)},${Math.round(v.y * 100)},${Math.round(v.z * 100)}`;
}

for (let i = -RANGE; i <= RANGE; i++) {
  for (let j = -RANGE; j <= RANGE; j++) {
    const base = a1.clone().multiplyScalar(i).add(a2.clone().multiplyScalar(j));
    const posA = base.clone().add(basisA);
    const posB = base.clone().add(basisB);
    for (const p of [posA, posB]) {
      const k = key(p);
      if (!posMap.has(k)) posMap.set(k, p.clone());
    }
  }
}

const allPos = [...posMap.values()];
const greenSet = new Set();
allPos.forEach((p) => {
  const hash = Math.abs(Math.sin(p.x * 127.1 + p.y * 311.7) * 43758.5453);
  if ((hash % 1) < 0.13) greenSet.add(key(p));
});

allPos.forEach((p) => {
  nodes.push({ pos: p, isGreen: greenSet.has(key(p)) });
});

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const d = nodes[i].pos.distanceTo(nodes[j].pos);
    if (d < BOND * 1.05) {
      const bothGreen = nodes[i].isGreen && nodes[j].isGreen;
      bonds.push({ a: nodes[i].pos, b: nodes[j].pos, isGreen: bothGreen });
    }
  }
}

const matNodeGrey = new THREE.MeshStandardMaterial({
  color: 0x555555,
  roughness: 0.3,
  metalness: 0.6,
  emissive: 0x111111,
});
const matNodeGreen = new THREE.MeshStandardMaterial({
  color: 0x44dd66,
  roughness: 0.2,
  metalness: 0.1,
  emissive: 0x22aa44,
  emissiveIntensity: 0.5,
});
const matBondGrey = new THREE.MeshStandardMaterial({
  color: 0x444444,
  roughness: 0.5,
  metalness: 0.4,
});
const matBondGreen = new THREE.MeshStandardMaterial({
  color: 0x44dd66,
  roughness: 0.2,
  metalness: 0.1,
  emissive: 0x33cc55,
  emissiveIntensity: 0.7,
});

const latticeGroup = new THREE.Group();
scene.add(latticeGroup);

const sphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
const smallSphereGeo = new THREE.SphereGeometry(0.13, 12, 12);

nodes.forEach(({ pos, isGreen }) => {
  const geo = isGreen ? smallSphereGeo : sphereGeo;
  const mat = isGreen ? matNodeGreen : matNodeGrey;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(pos);
  latticeGroup.add(mesh);
});

bonds.forEach(({ a, b, isGreen }) => {
  const dir = b.clone().sub(a);
  const length = dir.length();
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const radius = isGreen ? 0.055 : 0.045;
  const geo = new THREE.CylinderGeometry(radius, radius, length, 8, 1);
  const mat = isGreen ? matBondGreen : matBondGrey;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(mid);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  latticeGroup.add(mesh);
});

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(10, 15, 10);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x88ffaa, 0.3);
fillLight.position.set(-10, -5, 5);
scene.add(fillLight);

const rimLight = new THREE.PointLight(0x44ee77, 0.8, 60);
rimLight.position.set(-8, 8, -10);
scene.add(rimLight);

const mouse = { x: 0, y: 0 };

function onPointerMove(e) {
  const target = heroSection || container;
  const rect = target.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
}

(heroSection || container).addEventListener('pointermove', onPointerMove);

function resize() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  if (!w || !h) return;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}

resize();
const ro = new ResizeObserver(resize);
ro.observe(container);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  if (!reducedMotion) {
    latticeGroup.rotation.z = t * 0.08;
    latticeGroup.rotation.x += (mouse.y * 0.4 - latticeGroup.rotation.x) * 0.03;
    latticeGroup.rotation.y += (mouse.x * 0.4 - latticeGroup.rotation.y) * 0.03;
    const pulse = 0.4 + 0.3 * Math.sin(t * 1.8);
    matNodeGreen.emissiveIntensity = pulse;
    matBondGreen.emissiveIntensity = pulse * 1.2;
  }

  renderer.render(scene, camera);
}

animate();
