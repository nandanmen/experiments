import * as THREE from "three";
import gsap from "gsap";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color("hsl(193, 77%, 53%)"),
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const canvasSize = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(
  /* fov */ 75,
  /* aspect ratio */ canvasSize.width / canvasSize.height
);
camera.position.z = 3;

scene.add(camera);

const canvas = document.getElementById("webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvasSize.width, canvasSize.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();

const rotateCamera = () => {
  /**
   * We're keeping track of time to "normalize" the rotation speed based on the
   * screen's refresh rate. In monitors with higher refresh rate, the cube will
   * rotate faster because `requestAnimationFrame` will be called more
   * frequently.
   */
  const elapsedTime = clock.getElapsedTime();

  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);

  /**
   * `requestAnimationFrame` tells the browser to call the given function
   * on the next frame. How often this happens depends on the frame rate
   * of the screen (typically 60hz or 60 times/second).
   */
  window.requestAnimationFrame(rotateCamera);
};

/**
 * Looks like gsap starts the animation right away, but we still need the
 * requestAnimationFrame to re-render the scene as gsap updates the `mesh.
 * position` value.
 *
 * - Could there be a race condition here?
 */
gsap.to(mesh.position, { duration: 1, x: 2 });

const tween = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tween);
};

tween();
