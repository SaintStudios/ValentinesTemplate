import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function loadTable(scene) {
    return new Promise((resolve, reject) => {
        loader.load(
            'Table.glb',
            (gltf) => {
                const table = gltf.scene;
                table.scale.set(0.3, 0.3, 0.3);

                table.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                table.position.set(0, -4, 0); // Lower table to bottom of 360 image
                scene.add(table);
                console.log('Table loaded');
                resolve(table);
            },
            undefined,
            (error) => {
                console.error('Error loading table:', error);
                reject(error);
            }
        );
    });
}


export function loadPictureFrame(scene) {
    return new Promise((resolve, reject) => {
        // Load large frame (right side)
        loader.load(
            'Blank Picture Frame.glb',
            (gltf) => {
                const frame = gltf.scene;
                frame.scale.set(1.5, 1.5, 1.5); // Bigger
                frame.position.set(0.85, -1.25, 0.2); // Further right
                frame.rotation.y = Math.PI - 0.25; // Face viewer, angled right

                frame.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(frame);
                console.log('Large picture frame loaded');

                // Load small frame separately (left side)
                loader.load(
                    'Blank Picture Frame.glb',
                    (gltf2) => {
                        const smallFrame = gltf2.scene;
                        smallFrame.scale.set(0.9, 0.9, 0.9); // Bigger
                        smallFrame.position.set(-0.8, -1.4, 0.25); // Further left
                        smallFrame.rotation.y = Math.PI + 0.25; // Face viewer, angled left

                        smallFrame.traverse((child) => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });

                        scene.add(smallFrame);
                        console.log('Small picture frame loaded');

                        resolve({ large: frame, small: smallFrame });
                    },
                    undefined,
                    (error) => {
                        console.error('Error loading small picture frame:', error);
                        reject(error);
                    }
                );
            },
            undefined,
            (error) => {
                console.error('Error loading picture frame:', error);
                reject(error);
            }
        );
    });
}

export function loadCard(scene) {
    return new Promise((resolve, reject) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            'Gemini_Generated_Image_9luihe9luihe9lui.png',
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;

                // Create a plane geometry for the card (aspect ratio roughly 4:3)
                const cardWidth = 0.7;
                const cardHeight = 0.56;
                const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
                const cardMaterial = new THREE.MeshStandardMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                });

                const card = new THREE.Mesh(cardGeometry, cardMaterial);
                card.position.set(-0.45, -1.65, 0.95); // Further forward
                card.rotation.set(-Math.PI / 2, 0, 0.3); // Flat, more right rotation
                card.castShadow = true;
                card.receiveShadow = true;

                scene.add(card);
                console.log('Valentine card loaded');
                resolve(card);
            },
            undefined,
            (error) => {
                console.error('Error loading card:', error);
                reject(error);
            }
        );
    });
}
