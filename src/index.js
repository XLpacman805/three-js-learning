import * as THREE from 'three/build/three';
const hexColors = new Map([
    ['green', 0x00FF00],
    ['white', 0xFFFFFF],
    ['red', 0xFF0000]
]);

const init = () => {
    const scene = new THREE.Scene();
    const box = createBoxMesh();
    scene.add(box);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 2;

    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}

const createBoxMesh = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: hexColors.get('green')
    });

    return new THREE.Mesh(geometry, material);
}

init();
