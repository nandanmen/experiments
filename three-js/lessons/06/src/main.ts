import * as THREE from "three";

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
  /* aspect ratio */ canvasSize.width / canvasSize.height,
  /**
   * The third and fourth parameters are 'near' and 'far'. Anything closer than
   * 'near' and farther away than 'far' relative to the camera will not be
   * rendered on the screen.
   */
  1,
  100
);

/**
 * An ortographic camera doesn't have any perspective. Instead of a field of
 * view, it takes in the bounds of the scene as parameters, as well as the
 * `near` and `far` properties from before.
 *
 * This will result in the cube looking stretched because our camera has square
 * bounds but the canvas is rectangular. To fix it, we need to change the
 * bounds to match the aspect ratio of the canvas.
 */
const cameraStretched = new THREE.OrthographicCamera(
  /* left */ -1,
  /* right */ 1,
  /* top */ 1,
  /* bottom */ -1,
  /* near */ 0.1,
  /* far */ 100
);

const aspectRatio = canvasSize.width / canvasSize.height;
const ortoCamera = new THREE.OrthographicCamera(
  /* left */ -1 * aspectRatio,
  /* right */ 1 * aspectRatio,
  /* top */ 1,
  /* bottom */ -1,
  /* near */ 0.1,
  /* far */ 100
);

camera.position.z = 3;
camera.lookAt(mesh.position);

scene.add(camera);

const canvas = document.getElementById("webgl") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvasSize.width, canvasSize.height);
renderer.render(scene, camera);

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (evt) => {
  cursor.x = evt.clientX / canvasSize.width - 0.5;
  cursor.y = -(evt.clientY / canvasSize.height - 0.5);
});

const tick = () => {
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  camera.position.y = cursor.y * 3;
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
