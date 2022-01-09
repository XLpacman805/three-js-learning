import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from  'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

const colorMap = new Map([
    ['green', 0x00FF00],
    ['white', 0xFFFFFF],
    ['red', 0xFF0000],
    ['gray', 'rgb(180, 180, 180)'],
    ['blue', 'rgb(0, 0, 255)']
]);


/**
 * Initialize the scene and start the render loop.
 * @returns {THREE.Scene}
 */
const init = () => {
    const scene = new THREE.Scene();
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('webgl').appendChild(renderer.domElement);
    const orbitControls = new OrbitControls(camera, renderer.domElement);

    RectAreaLightUniformsLib.init();

    // create pointLight, remove later
    const pointLight = createPointLight();
    pointLight.position.x = -5;
    pointLight.position.y = 10;

    // create a plane for use as the floor
    const plane = createPlaneMesh(20, colorMap.get('white'));
    plane.name = 'floor';
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;

    // create speere geometry and material for use as the light
    const sphereGeometry = new THREE.SphereGeometry(0.25, 24, 24);
    const sphereMaterial = new THREE.MeshBasicMaterial({color: colorMap.get('white')});
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pointLight.add(sphere);

    // Create spehere geometry and material for use as an orb.
    const sphere2 = createSphereMesh(0.5, colorMap.get('white'));
    sphere2.castShadow = true;
    sphere2.position.y = 0.5;
    sphere2.name = 'orb';

    // create rectangle red light
    const rectLightRed = new THREE.RectAreaLight(colorMap.get('red'), 5, 1, 6);
    rectLightRed.position.set(-2, 3, 0);
    rectLightRed.lookAt(3, 3, 0);
    const rectLightHelperRed = new RectAreaLightHelper(rectLightRed);
    rectLightRed.add(rectLightHelperRed);

    const rectLightBlue = new THREE.RectAreaLight(colorMap.get('blue'), 5, 1, 6);
    rectLightBlue.position.set(-2, 3, 1.125);
    rectLightBlue.lookAt(3, 3, 1.125);
    const rectLightHelperBlue = new RectAreaLightHelper(rectLightBlue);
    rectLightBlue.add(rectLightHelperBlue);

    const rectLightGreen = new THREE.RectAreaLight(colorMap.get('green'), 5, 1, 6);
    rectLightGreen.position.set(-2, 3, -1.125);
    rectLightGreen.lookAt(3, 3, -1.125);
    const rectLightHelperGreen = new RectAreaLightHelper(rectLightGreen);
    rectLightGreen.add(rectLightHelperGreen);

    scene.add(...[plane, sphere2, rectLightRed, rectLightBlue, rectLightGreen]);
    update(renderer, scene, camera, orbitControls);
    return scene;
}

/**
 * Recursive function to always render the scene per frame.
 * @param {THREE.WebGLRenderer} renderer 
 * @param {THREE.Scene} scene 
 * @param {THREE.PerspectiveCamera} camera 
 * @param {OrbitControls} controls 
 * @returns {void}
 */
const update = (renderer, scene, camera, controls) => {
    scene.getObjectByName('orb').rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(() => update(renderer, scene, camera, controls));
}

const createPointLight = (color = colorMap.get('white'), intesity = 2) => {
    const pointLight = new THREE.PointLight(color, intesity);
    pointLight.castShadow = true;
    return pointLight;
}

const createPlaneMesh = (size = 20, color = colorMap.get('white')) => {
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({color: colorMap.get('white')});
    return new THREE.Mesh(planeGeometry, planeMaterial);
}

const createSphereMesh = (size = 1, color = colorMap.get('white')) => {
    const sphereGeometry = new THREE.SphereGeometry(size, 24, 24);
    const sphereMaterial = new THREE.MeshStandardMaterial({color: color});
    return new THREE.Mesh(sphereGeometry, sphereMaterial);
}


window.scene = init();