import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Restricted zoom range to stay at the table
    controls.minDistance = 2;
    controls.maxDistance = 6;

    // Restrict side-to-side rotation (Azimuth)
    // Limits the user from looking left or right too much past the image
    controls.minAzimuthAngle = -Math.PI / 6; // ~30 degrees left
    controls.maxAzimuthAngle = Math.PI / 6;  // ~30 degrees right

    // Restrict up-and-down rotation (Polar)
    controls.minPolarAngle = 1.0;            // Don't look too far down
    controls.maxPolarAngle = 1.5;            // Don't look past the horizon

    controls.target.set(0, 1.2, 0);
    return controls;
}
