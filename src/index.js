import * as THREE from 'three/build/three';
import * as dat from 'dat.gui';
import { OrbitControls } from './OrbitControls';

const hexColors = new Map([
    ['green', 0x00FF00],
    ['white', 0xFFFFFF],
    ['red', 0xFF0000],
    ['gray', 'rgb(120, 120, 120)']
]);

const init = () => {
    const gui = new dat.GUI();
    const scene = new THREE.Scene();
    const boxGrid = createBoxGrid(10, 1.5);
    const plane = creatPlaneMesh(20);
    const enableFog = false;
    const pointLight = createPointLight(1);
    const sphere = createSphereMesh(0.05);

    plane.name = 'plane-1';


    plane.rotation.x = Math.PI / 2;
    pointLight.position.y = 2;
    pointLight.intensity = 2;
    gui.add(pointLight, 'intensity', 0, 10);
    gui.add(pointLight.position, 'x', -10, 10);
    gui.add(pointLight.position, 'y', 0, 10);
    gui.add(pointLight.position, 'z', -10, 10);

    scene.add(boxGrid);
    scene.add(plane);
    scene.add(pointLight);
    pointLight.add(sphere);

    if (enableFog) {
        scene.fog = new THREE.FogExp2(hexColors.get('white'), 0.2);
    }

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

    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(hexColors.get('gray'));
    document.getElementById('webgl').appendChild(renderer.domElement);

    const orbitControls = new OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, orbitControls);

    return scene;
}

const createBoxMesh = (w = 1, h = 1 ,d = 1) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({
        color: hexColors.get('gray')
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
}


const creatPlaneMesh = (size = 1) => {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshPhongMaterial({
        color: hexColors.get('gray'),
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;

    return mesh;
}

const createSphereMesh = (r = 1) => {
    const geometry = new THREE.SphereGeometry(r, 24, 24);
    const material = new THREE.MeshBasicMaterial({
        color: hexColors.get('white')
    });

    return new THREE.Mesh(geometry, material);
}

const createBoxGrid = (amount, seperationMultiplier) => {
    const group = new THREE.Group();

    for (let i = 0; i < amount; i++) {
        const obj = createBoxMesh(1, 1, 1);
        obj.position.x = i * seperationMultiplier;
        obj.position.y = obj.geometry.parameters.height / 2;
        group.add(obj);
        for (let j = 0; j < amount; j++) {
            const obj = createBoxMesh(1, 1, 1);
            obj.position.x = i * seperationMultiplier;
            obj.position.y = obj.geometry.parameters.height / 2;
            obj.position.z = j * seperationMultiplier;
            group.add(obj);
        }
    }

    group.position.x = -(seperationMultiplier * (amount - 1))/2 ;
    group.position.z = -(seperationMultiplier * (amount - 1))/2 ;
    return group;

}

const createPointLight = (intensity) => {
    const light = new THREE.PointLight(hexColors.get('white'), intensity);
    light.castShadow = true;
    return light;
}

const update = (renderer, scene, camera, controls) => {
    renderer.render(scene, camera);

    controls.update();

    // Like setInverval but gets called for every frame instead of time interval.
    requestAnimationFrame(() => {
        update(renderer, scene, camera, controls);
    });
}

window.scene = init();
