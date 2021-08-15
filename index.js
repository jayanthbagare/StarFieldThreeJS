import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import {
  OrbitControls
} from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, geometry, material, mesh, controls, far, near;
let width = window.innerWidth,
  height = window.innerHeight,
  pixelRatio = window.devicePixelRatio;
let vertices = [];

function main() {
  const canvas = document.querySelector('#canvas');
  const fov = 75;
  const aspect = width / height;
  near = 1;
  far = 1000;
  const texture = new THREE.TextureLoader().load('./textures/disc.png');

  renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;
  camera.position.x = 1;
  scene.add(camera);
  scene.fog = new THREE.FogExp2(0x000104, 0.0000675);


  controls = new OrbitControls(camera, canvas);

  for (var i = 0; i < 10000; i++) {
    var x = THREE.MathUtils.randFloatSpread(width);
    var y = THREE.MathUtils.randFloatSpread(height);
    var z = THREE.MathUtils.randFloatSpread(far);

    vertices.push(x, y, z);
  }

  geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  material = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 1.5,
    map: texture
  });
  mesh = new THREE.Points(geometry, material);
  scene.add(mesh);


  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  const positions = geometry.attributes.position;

  for (var i = 0; i < positions.count; i++) {
    let x = positions.getX(i);
    let y = positions.getY(i);
    let z = positions.getZ(i);

    x += 0.1;
    z += 0.1;

    if (x > 400 || x < -400 || y > 400 || y < -400) {
      x,
      y,
      z = 0;
      x = THREE.MathUtils.randFloatSpread(width);
      y = THREE.MathUtils.randFloatSpread(height);
      z = THREE.MathUtils.randFloatSpread(far);
    }

    positions.setXYZ(i, x, y, z);
    positions.needsUpdate = true;
  }


  renderer.render(scene, camera);


}

main();
