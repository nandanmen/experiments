import "./style.css";
import * as THREE from "three";

/**
 * A scene is a container for everything else in THREE
 */
const scene = new THREE.Scene();

/**
 * The AxesHelper class displays a visual of the x, y, and z axes. It takes in
 * the length of the axes as argument.
 */
const axes = new THREE.AxesHelper(/* size */ 2);
scene.add(axes);

/**
 * A BoxGeometry represents a cube shape. The constructor takes in the width,
 * height, and depth of the cube as parameters.
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  /**
   * Interesting - THREE.Color doesn't support decimal values in HSL, but
   * it works just fine in the browser.
   */
  color: new THREE.Color("hsl(193, 77%, 53%)"),
});

/**
 * A mesh is an object in THREE - it's a combination of a geometry (the shape
 * of the object) and a material (how it looks).
 */
const mesh = new THREE.Mesh(geometry, material);

/**
 * The position property is a 3D vector. All classes that inherit from the
 * Object3D class has access to this property, and a few others:
 *
 * - scale (to resize the object)
 * - rotation (to rotate the object)
 *   - Rotations are defined in radians instead of degrees
 * - quaternion (also to rotate the object) (is this a quantum physics thing?)
 */
mesh.position.x = 3;

// We register the mesh in the scene so that it's visible
scene.add(mesh);

const canvasSize = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(
  /* fov */ 75,
  /* aspect ratio */ canvasSize.width / canvasSize.height
);

/**
 * By default, THREE will place all objects in the coordinates (0, 0, 0). If we
 * don't position the camera, we won't see anything rendered in the canvas
 * because the camera is _inside_ our cube.
 *
 * The THREE.js axes work like this:
 *   - Positive y goes up (unlike the web where y goes _down_!)
 *   - Positive x goes right
 *   - Positive z goes _out from the screen_
 */
camera.position.z = 3;

/**
 * The `lookAt` method rotates the camera to point to the Vector3 given as a
 * parameter. Since other objects' `position` property is also a Vector3, you
 * can pass it to the `lookAt` method to make the camera look at that object.
 */
camera.lookAt(mesh.position);

scene.add(camera);

const canvas = document.getElementById("webgl") as HTMLCanvasElement;

/**
 * A renderer takes a canvas element and renders the scene and camera
 * onto that canvas.
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvasSize.width, canvasSize.height);

/**
 * If we want to animate, we have to call the `render` function again.
 */
renderer.render(scene, camera);

const slider = document.getElementById("x-slider") as HTMLInputElement;
slider.addEventListener("input", () => {
  const newXPosition = slider.valueAsNumber;
  mesh.position.x = newXPosition;
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
});
