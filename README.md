# Virtual Date Night - Three.js Scene

A romantic 3D virtual date night scene built with Three.js featuring your custom table model.

## 📁 Project Structure

```
TestVT/
├── index.html          # Main HTML file
├── Table.glb           # Your 3D table model
└── src/
    ├── main.js         # Main application entry point
    ├── scene.js        # Scene setup (background, lighting, camera, controls)
    ├── table.js        # Table GLB model loader
    └── style.css       # Styling and UI
```

## 🎯 File Breakdown

### **main.js**
The main entry point that orchestrates everything:
- Imports and initializes the scene, camera, and renderer
- Loads the table model
- Runs the animation loop
- Handles window resizing

### **scene.js** (Background & Environment)
Contains all scene setup functions:
- `createScene()` - Creates the Three.js scene with background color and fog
- `createCamera()` - Sets up the perspective camera
- `createRenderer()` - Configures the WebGL renderer with shadows
- `createControls()` - Orbit controls for mouse interaction
- `setupLighting()` - Ambient, point, and directional lights with warm romantic tones
- `createFloor()` - Dark floor plane with shadows
- `createBackgroundParticles()` - Floating pink heart particles

### **table.js** (Table Model)
Handles loading your Table.glb model:
- Uses GLTFLoader to load the 3D model
- Enables shadows on all meshes
- Provides loading progress feedback
- Returns a promise for async handling

## 🚀 Running the Project

Your server is already running on port 8000!

Just visit: **http://localhost:8000**

## 🎨 Features

- ✨ Romantic atmospheric lighting with warm tones
- 🌫️ Fog effect for depth
- 💖 Floating heart particles in the background
- 🎮 Interactive camera controls (drag to rotate, scroll to zoom)
- 🌟 Realistic shadows
- 📱 Responsive design

## 🛠️ Customization

### Adding Items to the Table

Create a new file (e.g., `src/items.js`) and add your decorative items:

```javascript
import * as THREE from 'three';

export function addCandles(scene) {
    // Your candle code here
}

export function addGlasses(scene) {
    // Your glass code here
}
```

Then import and use in `main.js`:

```javascript
import { addCandles, addGlasses } from './items.js';

// After loading the table
loadTable(scene).then(() => {
    addCandles(scene);
    addGlasses(scene);
});
```

### Adjusting Lighting

Edit `scene.js` and modify the lighting setup in `setupLighting()`:
- Change colors (e.g., `0xffaa66` for warm orange)
- Adjust intensities (second parameter in light constructors)
- Add more lights as needed

### Changing Camera Position

In `scene.js`, modify the camera position:

```javascript
camera.position.set(x, y, z); // Default: (0, 3, 5)
```

## 📝 Notes

- The table model is loaded asynchronously - check console for loading progress
- All table meshes automatically receive and cast shadows
- The scene uses physically-based rendering (PBR) for realistic materials
