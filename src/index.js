import * as THREE from 'three/build/three';
const hexColors = new Map([
    ['green', 0x00FF00],
    ['white', 0xFFFFFF],
    ['red', 0xFF0000]
]);

const init = () => {
    const scene = new THREE.Scene();
    const box = createBoxMesh();
    const plane = creatPlaneMesh(20);

    plane.name = 'plane-1';

    box.position.y = box.geometry.parameters.height / 2
    plane.rotation.x = Math.PI / 2;

    scene.add(box);
    scene.add(plane);

    scene.fog = new THREE.FogExp2(hexColors.get('white'), 0.2);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 2;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(hexColors.get('white'));
    document.getElementById('webgl').appendChild(renderer.domElement);
    update(renderer, scene, camera);

    return scene;
}

const createBoxMesh = (w = 1, h = 1 ,d = 1) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshBasicMaterial({
        color: hexColors.get('green')
    });

    return new THREE.Mesh(geometry, material);
}


const creatPlaneMesh = (size = 1) => {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({
        color: hexColors.get('red'),
        side: THREE.DoubleSide
    });

    return new THREE.Mesh(geometry, material);
}

const update = (renderer, scene, camera) => {
    renderer.render(scene, camera);

    // Like setInverval but gets called for every frame instead of time interval.
    requestAnimationFrame(() => {
        update(renderer, scene, camera);
    });
}

window.scene = init();
