import * as THREE from 'three';

export function setupLighting(scene) {
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Warm candle-like point lights
    const candleLight1 = new THREE.PointLight(0xffaa66, 2, 8);
    candleLight1.position.set(-0.8, -1.5, 0);
    candleLight1.castShadow = true;
    scene.add(candleLight1);

    const candleLight2 = new THREE.PointLight(0xffaa66, 2, 8);
    candleLight2.position.set(0.8, -1.5, 0);
    candleLight2.castShadow = true;
    scene.add(candleLight2);

    // Soft top light
    const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
    topLight.position.set(0, 10, 5);
    topLight.castShadow = true;
    topLight.shadow.mapSize.width = 2048;
    topLight.shadow.mapSize.height = 2048;
    scene.add(topLight);

    // Rim light for atmosphere
    const rimLight = new THREE.DirectionalLight(0xff6b9d, 0.3);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    // Return lights that need animation
    return { candleLight1, candleLight2 };
}
