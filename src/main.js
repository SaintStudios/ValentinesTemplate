import { createScene, createCamera, createRenderer, createFloor, loadEnvironment } from './scene.js';
import { createControls } from './controls.js';
import { setupLighting } from './lighting.js';
import { loadTable, loadPictureFrame } from './desk.js';

// Initialize scene, camera, and renderer
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

// Add renderer to DOM
document.querySelector('#canvas-container').appendChild(renderer.domElement);

// Setup controls
const controls = createControls(camera, renderer);

// Setup lighting and get animated lights
const { candleLight1, candleLight2 } = setupLighting(scene);

// Add floor
createFloor(scene);

// Load Environment
loadEnvironment(scene);

// Load the desk setup
async function loadSceneContent() {
    try {
        await loadTable(scene);

        // Load items on the table
        await Promise.all([
            loadPictureFrame(scene)
        ]);

        console.log('Scene content loaded!');
    } catch (error) {
        console.error('Failed to load scene content:', error);
    }
}

loadSceneContent();

// Animation loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Animate candle lights
    candleLight1.intensity = 2 + Math.sin(time * 5) * 0.3;
    candleLight2.intensity = 2 + Math.sin(time * 5 + 1) * 0.3;



    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
