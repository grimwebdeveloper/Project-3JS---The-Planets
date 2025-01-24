import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';

const aspectRatio = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const { width, height } = aspectRatio;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 100);
camera.position.set(0, 0, 10);

const canvas = document.querySelector('canvas#world');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

const radius = 1.2;
const segments = 32;
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
const spheres = new THREE.Group();

for (let i = 0; i < 4; i++) {
  const geometry = new THREE.SphereGeometry(radius, segments, segments);
  const material = new THREE.MeshBasicMaterial({
    color: colors[i],
    wireframe: false,
  });
  const sphere = new THREE.Mesh(geometry, material);
  const angle = (i / 4) * (Math.PI * 2);
  const orbitRadius = 3;
  sphere.position.x = orbitRadius * Math.cos(angle);
  sphere.position.z = orbitRadius * Math.sin(angle);
  spheres.add(sphere);
}
spheres.rotation.set(0.2, 0, 0);
spheres.position.set(0, -0.3, 0);
scene.add(spheres);

setInterval(() => {
  gsap.to(spheres.rotation, {
    y: `+=${Math.PI / 2}`,
    duration: 2,
  });
}, 2000);

const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();
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
