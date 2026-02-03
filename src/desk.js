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

                table.position.set(0, -0.75, 0); // Shift down so surface is at y=0
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
        loader.load(
            'Blank Picture Frame.glb',
            (gltf) => {
                const frame = gltf.scene;
                frame.scale.set(0.3, 0.3, 0.3);
                frame.position.set(0.5, 0, 0); // On the table top (y=0)

                // Rotate to face slightly inward
                frame.rotation.y = -Math.PI / 6;

                frame.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                scene.add(frame);
                console.log('Picture frame loaded');
                resolve(frame);
            },
            undefined,
            (error) => {
                console.error('Error loading picture frame:', error);
                reject(error);
            }
        );
    });
}
