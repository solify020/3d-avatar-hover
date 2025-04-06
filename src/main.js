import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loader = new GLTFLoader();
loader.load(
    './model.glb', // Replace with the actual path to your .glb file
    (gltf) => {
        // Called when the resource is loaded
        console.log('Model loaded successfully:', gltf);
        const scene = gltf.scene;

        // Set up the Three.js scene, camera, and renderer
        const canvas = document.querySelector('canvas');
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const threeScene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 5);

        // Add the loaded model to the Three.js scene
        threeScene.add(scene);

        // Add a light source
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        threeScene.add(light);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(threeScene, camera);
        }
        animate();
        // Add the scene or manipulate it as needed
    },
    (xhr) => {
        // Called while loading is progressing
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        // Called when loading has errors
        console.error('An error occurred while loading the model:', error);
    }
);