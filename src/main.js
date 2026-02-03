import { createScene, createCamera, createRenderer, loadEnvironment } from './scene.js';
import { createControls } from './controls.js';
import { setupLighting } from './lighting.js';
import { loadTable, loadPictureFrame, loadCard } from './desk.js';
import { ItemInteraction } from './interaction.js';

// Initialize scene, camera, and renderer
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

// Add renderer to DOM
document.querySelector('#canvas-container').appendChild(renderer.domElement);

// Setup controls
const controls = createControls(camera, renderer);

// Setup item interaction system
const itemInteraction = new ItemInteraction(camera, renderer, controls);

// Setup lighting and get animated lights
const { candleLight1, candleLight2 } = setupLighting(scene);

// Floor removed - using background image only

// Load Environment
loadEnvironment(scene);

// Load the desk setup
async function loadSceneContent() {
    try {
        await loadTable(scene);

        // Load items on the table
        const [frames, card] = await Promise.all([
            loadPictureFrame(scene),
            loadCard(scene)
        ]);

        // Register the card as interactable
        itemInteraction.addInteractableItem(card);

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

    // Update item interaction animations
    itemInteraction.update();



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
