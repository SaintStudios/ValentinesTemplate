import * as THREE from 'three';


// Scene setup
export function createScene() {
    const scene = new THREE.Scene();

    // Add fog to smoothly fade objects into the background
    // Extended far distance to not affect background
    scene.fog = new THREE.Fog(0x0a0a0a, 5, 50);

    return scene;
}

// Environment backdrop setup
export function loadEnvironment(scene) {
    const loader = new THREE.TextureLoader();
    loader.load(
        'luca-bravo-_QdFx92MO2U-unsplash.jpg',
        (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.x = -1; // Flip if needed for panoramic orientation
            texture.offset.x = 1; // Align flipped texture correctly

            // Create a full cylinder background that surrounds the scene
            const bgGeometry = new THREE.CylinderGeometry(10, 10, 30, 64, 1, true);
            const bgMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.BackSide,
                transparent: true,
                fog: false
            });
            const backgroundPlane = new THREE.Mesh(bgGeometry, bgMaterial);

            // Position it lower so the image extends down to table level
            backgroundPlane.position.set(0, 0, 0);
            scene.add(backgroundPlane);

            // Don't set solid background color - let the cylinder be the background
            scene.environment = texture;
            console.log('Curved background backdrop loaded');
        },
        undefined,
        (err) => {
            console.error('An error occurred loading the background image', err);
        }
    );
}

// Camera setup
export function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        70, // Slightly narrower FOV for more intimate feel
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    // Positioned as if sitting at the lowered table
    camera.position.set(0, -1.5, 4);
    camera.lookAt(0, -1.5, 0);
    return camera;
}

// Renderer setup
export function createRenderer() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    return renderer;
}


// Floor
export function createFloor(scene) {
    const floorGeometry = new THREE.PlaneGeometry(5, 5); // Smaller floor, just under the table
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.76; // Just below the table bottom
    floor.receiveShadow = true;
    scene.add(floor);
}

// Background particles
export function createBackgroundParticles(scene) {
    const heartParticles = [];
    for (let i = 0; i < 20; i++) {
        const heartGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const heartMaterial = new THREE.MeshBasicMaterial({
            color: 0xff69b4,
            transparent: true,
            opacity: 0.3
        });
        const heart = new THREE.Mesh(heartGeometry, heartMaterial);
        heart.position.set(
            (Math.random() - 0.5) * 10,
            Math.random() * 5,
            (Math.random() - 0.5) * 10
        );
        heartParticles.push({
            mesh: heart,
            speed: 0.01 + Math.random() * 0.02
        });
        scene.add(heart);
    }
    return heartParticles;
}
