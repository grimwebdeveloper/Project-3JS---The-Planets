import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const aspectRatio = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const { width, height } = aspectRatio;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 0, 5);

const canvas = document.querySelector('canvas#world');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

const radius = 1;
const segments = 32;
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
const spheres = new THREE.Group();

for (let i = 0; i < 4; i++) {
  const geometry = new THREE.SphereGeometry(radius, segments, segments);
  const material = new THREE.MeshBasicMaterial({ color: colors[i] });
  const sphere = new THREE.Mesh(geometry, material);
  spheres.add(sphere);
}

scene.add(spheres);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
animate();

function responsiveness() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', responsiveness);
