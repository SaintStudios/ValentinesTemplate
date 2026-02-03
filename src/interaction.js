import * as THREE from 'three';

/**
 * Interaction system for inspecting items on the table
 * Click on an item to bring it to center view (video game item inspect style)
 * Drag to rotate the item while inspecting
 */
export class ItemInteraction {
    constructor(camera, renderer, controls) {
        this.camera = camera;
        this.renderer = renderer;
        this.controls = controls;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Interactable items
        this.interactableItems = [];

        // Focus state
        this.focusedItem = null;
        this.originalState = null;
        this.isAnimating = false;
        this.isFocused = false;

        // Click vs drag detection
        this.mouseDownPos = { x: 0, y: 0 };
        this.isDragging = false;
        this.isMouseDown = false;
        this.DRAG_THRESHOLD = 5; // pixels

        // Drag rotation while inspecting
        this.inspectRotation = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };

        // Animation targets
        this.targetPosition = new THREE.Vector3();
        this.baseRotation = new THREE.Euler();

        // Bind event handlers
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        this.setupEventListeners();
    }

    setupEventListeners() {
        const canvas = this.renderer.domElement;
        canvas.addEventListener('mousedown', this.onMouseDown);
        canvas.addEventListener('mousemove', this.onMouseMove);
        canvas.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('keydown', this.onKeyDown);
    }

    addInteractableItem(item) {
        this.interactableItems.push(item);
    }

    onMouseDown(event) {
        this.mouseDownPos.x = event.clientX;
        this.mouseDownPos.y = event.clientY;
        this.lastMousePos.x = event.clientX;
        this.lastMousePos.y = event.clientY;
        this.isDragging = false;
        this.isMouseDown = true;
    }

    onMouseMove(event) {
        if (!this.isMouseDown) return;

        const dx = event.clientX - this.mouseDownPos.x;
        const dy = event.clientY - this.mouseDownPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.DRAG_THRESHOLD) {
            this.isDragging = true;
        }

        // Rotate the card while dragging when focused
        if (this.isFocused && this.isDragging && this.focusedItem) {
            const deltaX = event.clientX - this.lastMousePos.x;
            const deltaY = event.clientY - this.lastMousePos.y;

            this.inspectRotation.y += deltaX * 0.01;
            this.inspectRotation.x += deltaY * 0.01;

            // Clamp vertical rotation
            this.inspectRotation.x = Math.max(-0.5, Math.min(0.5, this.inspectRotation.x));
        }

        this.lastMousePos.x = event.clientX;
        this.lastMousePos.y = event.clientY;
    }

    onMouseUp(event) {
        // Only process as click if not dragging
        if (!this.isDragging) {
            this.handleClick(event);
        }
        this.isMouseDown = false;
    }

    onKeyDown(event) {
        if (event.key === 'Escape' && this.isFocused) {
            this.unfocusItem();
        }
    }

    handleClick(event) {
        // Calculate normalized mouse coordinates
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // If an item is focused, unfocus it
        if (this.isFocused) {
            this.unfocusItem();
            return;
        }

        // Raycast to find clicked items
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactableItems, true);

        if (intersects.length > 0) {
            // Find the root interactable item
            let clickedItem = intersects[0].object;

            // Walk up the parent chain to find the registered interactable
            while (clickedItem && !this.interactableItems.includes(clickedItem)) {
                clickedItem = clickedItem.parent;
            }

            if (clickedItem) {
                this.focusItem(clickedItem);
            }
        }
    }

    focusItem(item) {
        if (this.isAnimating) return;

        this.focusedItem = item;
        this.isAnimating = true;
        this.isFocused = true;

        // Reset inspect rotation
        this.inspectRotation.x = 0;
        this.inspectRotation.y = 0;

        // Store original state
        this.originalState = {
            position: item.position.clone(),
            rotation: item.rotation.clone(),
            scale: item.scale.clone()
        };

        // Calculate target position in front of camera (closer to face)
        const cameraDirection = new THREE.Vector3();
        this.camera.getWorldDirection(cameraDirection);

        this.targetPosition.copy(this.camera.position)
            .add(cameraDirection.multiplyScalar(1.2)); // Closer to camera

        // Base rotation: stand upright, facing camera (no Y rotation needed)
        this.baseRotation.set(0, 0, 0);

        // Scale up when focused
        this.targetScale = 1.5;

        // Disable orbit controls while inspecting
        this.controls.enabled = false;

        // Show overlay
        this.showOverlay();
    }

    unfocusItem() {
        if (!this.focusedItem || !this.originalState) return;

        this.isAnimating = true;
        this.isFocused = false;

        // Set target back to original position
        this.targetPosition.copy(this.originalState.position);
        this.baseRotation.copy(this.originalState.rotation);

        // Scale back to original
        this.targetScale = 1;

        // Reset inspect rotation
        this.inspectRotation.x = 0;
        this.inspectRotation.y = 0;

        // Will clear focusedItem when animation completes
        this._unfocusing = true;

        // Hide overlay
        this.hideOverlay();
    }

    showOverlay() {
        const overlay = document.getElementById('inspect-overlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }

    hideOverlay() {
        const overlay = document.getElementById('inspect-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // Call this in the animation loop
    update() {
        if (!this.focusedItem) return;

        if (this.isAnimating) {
            const lerpFactor = 0.1;

            // Lerp position
            this.focusedItem.position.lerp(this.targetPosition, lerpFactor);

            // Target rotation = base + inspect adjustments
            const targetRotX = this.baseRotation.x + this.inspectRotation.x;
            const targetRotY = this.baseRotation.y + this.inspectRotation.y;
            const targetRotZ = this.baseRotation.z;

            // Lerp rotation
            this.focusedItem.rotation.x += (targetRotX - this.focusedItem.rotation.x) * lerpFactor;
            this.focusedItem.rotation.y += (targetRotY - this.focusedItem.rotation.y) * lerpFactor;
            this.focusedItem.rotation.z += (targetRotZ - this.focusedItem.rotation.z) * lerpFactor;

            // Lerp scale
            const currentScale = this.focusedItem.scale.x;
            const newScale = currentScale + (this.targetScale - currentScale) * lerpFactor;
            this.focusedItem.scale.set(newScale, newScale, newScale);

            // Check if animation is complete
            const positionDelta = this.focusedItem.position.distanceTo(this.targetPosition);

            if (positionDelta < 0.01) {
                this.isAnimating = false;

                // If we were unfocusing, complete the unfocus
                if (this._unfocusing) {
                    this._unfocusing = false;
                    this.focusedItem.position.copy(this.originalState.position);
                    this.focusedItem.rotation.copy(this.originalState.rotation);
                    this.focusedItem.scale.copy(this.originalState.scale);
                    this.focusedItem = null;
                    this.originalState = null;
                    this.controls.enabled = true;
                }
            }
        } else if (this.isFocused) {
            // Apply inspect rotation smoothly while focused (not animating)
            const targetRotX = this.baseRotation.x + this.inspectRotation.x;
            const targetRotY = this.baseRotation.y + this.inspectRotation.y;

            this.focusedItem.rotation.x += (targetRotX - this.focusedItem.rotation.x) * 0.15;
            this.focusedItem.rotation.y += (targetRotY - this.focusedItem.rotation.y) * 0.15;
        }
    }

    dispose() {
        const canvas = this.renderer.domElement;
        canvas.removeEventListener('mousedown', this.onMouseDown);
        canvas.removeEventListener('mousemove', this.onMouseMove);
        canvas.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('keydown', this.onKeyDown);
    }
}
