import * as THREE from 'three';

import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
//import { contain } from 'three/src/extras/TextureUtils.js';

let camera, scene, renderer, effect;
let shape;

const start = Date.now();
const container = document.getElementById('three-container');

let isTalking = false;
let talkingStart = 0;   // Track start time


// FPS configuration
const desiredFPS = 15;
const frameInterval = 1000 / desiredFPS;
let lastFrameTime = 0;


init();

function init() {

  // Setup scene and camera
  camera = new THREE.OrthographicCamera(container.offsetWidth / - 2, container.offsetWidth / 2, container.offsetHeight / 2, container.offsetHeight / - 2, 1, 1000);
  camera.position.z = 500;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);

  const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
  pointLight1.position.set(500, 1000, 1000);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
  pointLight2.position.set(- 500, - 500, - 500);
  scene.add(pointLight2);

  //const plane = new THREE.PlaneGeometry(200, 200);
  //plane.position.set(10, 10, 10);
  //scene.add(plane);

  shape = new THREE.Mesh(new THREE.OctahedronGeometry(container.offsetWidth / 3), new THREE.MeshPhongMaterial({ flatShading: true }));
  shape.rotation.x = 0.1;
  shape.rotation.y = 0.2;
  scene.add(shape);

  // Setup renderer and effect
  renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setAnimationLoop(animate(0));

  //effect = new AsciiEffect(renderer, '█▇▆▅▄▃▂▁ _', { invert: false, scale: 1, resolution: 0.07, strResolution: 'low' });
  //effect = new AsciiEffect(renderer, '_ .:-+*=%@#', { invert: true , scale: 1, resolution: 0.07, strResolution: 'low'});
  //effect = new AsciiEffect(renderer, '. $@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~i!lI;:,\"^`. ', { invert: true, scale: 1, resolution: 0.04, strResolution: 'low' });
  effect = new AsciiEffect(renderer, '. ▖▂▗▘▚▜▝▞▟█', { invert: true, scale: 1, resolution: 0.05, strResolution: 'low' });
  effect.setSize(container.offsetWidth, container.offsetHeight);
  effect.domElement.style.color = 'none';
  effect.domElement.style.backgroundColor = 'black';

  container.appendChild(effect.domElement);

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  //camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  // console.log("Frame: " + container.offsetWidth + ", " + container.offsetHeight);

}

export function animate(currentTime) {
  requestAnimationFrame(animate);

  // Calculate the time elapsed since the last frame
  const elapsedTime = currentTime - lastFrameTime;


  if (elapsedTime >= frameInterval) {
    lastFrameTime = currentTime;

    // Perform animations or updates here

    // Standard rotation
    shape.rotation.x += 0.04;
    shape.rotation.y += 0.08;
    shape.rotation.z += 0.08;

    // Active/talking state
    if (isTalking) {
      shape.rotation.z += 0.2
      shape.rotation.y += 0.2
    } else {
    }

    // Render the scene
    effect.render(scene, camera);
  }
}

// Toggle active/talking state
export function talkingState(state) {
  isTalking = state;
}


// Changes the color
export function changeColor(input) {

  effect.domElement.style.color = input;

}