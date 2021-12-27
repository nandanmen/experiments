/**
 * A scene is a container for everything else in THREE
 */
const scene = new THREE.Scene();

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

scene.add(camera);

const canvas = document.getElementById("webgl");

/**
 * A renderer takes a canvas element and renders the scene and camera
 * onto that canvas.
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvasSize.width, canvasSize.height);
renderer.render(scene, camera);
