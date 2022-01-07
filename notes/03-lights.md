# Lights #

## Lighting in three.js ##

Mesh basic materials aren't affected by lighting. Phone material is. Tehre are others as well.

## Light Types ##

### Point Light ###

A point light gets emmited from a single point in space, from all directions. Like a light bulb. You can add a spehere to the point light, so that you can visually see a "light bulb" otherwise you won't be able to see where it is on screen.

```js
const createPointLight = (intensity) => {
    const light = new THREE.PointLight(hexColors.get('white'), intensity);
    return light;
}
```

## dat.GUI ##

dat.GUI is a js library that allows you to create user interfaces that control js variables. That way you can mess with parameters in the browser instead of code.

```js
import * as dat from 'dat.gui';
const gui = new dat.GUI();
const pointLight = createPointLight(1);

pointLight.position.y = 2;
pointLight.intensity = 2;
gui.add(pointLight, 'intensity', 0, 10);
gui.add(pointLight.position, 'y', 0, 10);
```

## Orbit Controls ##

Orbit controls allow the camera to orbit around a target. It's awesome. https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/OrbitControls.js

```js
import { OrbitControls } from './OrbitControls';
const orbitControls = new OrbitControls(camera, renderer.domElement);
update(renderer, scene, camera, orbitControls);

const update = (renderer, scene, camera, controls) => {
    renderer.render(scene, camera);

    controls.update();

    // Like setInverval but gets called for every frame instead of time interval.
    requestAnimationFrame(() => {
        update(renderer, scene, camera, controls);
    });
}
```

## Shadows ##

First tell the renderer to render shadows. `renderer.shadowMap.enabled = true;` Then tell the light to cast shadows. `light.castShadow = true;` Your objects can cash shadows too. 

```js
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;

const mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.recieveShadow = true;
```

## SpotLight ##

Similar to a point light, but its shape is a cone. 

```js
const createSpotLight = (intensity) => {
    const light = new THREE.SpotLight(hexColors.get('white'), intensity);
    light.castShadow = true;
    return light;
}
```

### Shadow Maps ###

`spotLight.penumbra` takes a value between from 0 to 1, and that controls the lights "crispness" or "feathering". Three.js uses shadow maps and sometimes that can produce artifacts in the shadows. In the case of the cube grid, and the bottom it looked like there was underglow beneath the cube instead of shadows. That can be fixed with shadow bias. `light.shadow.bias = 0.001`

Shadows when they are far away from the light source start to look blurry. This is also due to shadow maps. Their default resolution is 1024, but its adjustable. Increasing this too much can negatively affect performance.

```js
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
```

## DirectionalLight ##

Directional lights emit parallel light rays. Great for simulating light sources that are very far away, like the sun. This makes the shadows cast by the directional lights, all parallel to each other. Directional lights don't have a penumbra parameter.

### Camera Helper ###

In Three.js you can think of shadows as being cast from a camera, that is sharing the same position as the lights. The camera helper is a geometry that shows us the field of view of a camera. `const helper = new THREE.CameraHelper(directionalLight.shadow.camera);`

Objects beyond the point of view of the camera, won't cast any shadows. Exending the field of view of the shadow camera will fix the problem.

```js
/** 
 * Default values for light shadow camera.
 * {object} light.shadow.camera
 * {property} light.shadow.camera.left = -5
 * {property} light.shadow.camera.right = 5
 * {property} light.shadow.camera.top = 5
 * {property} light.shadow.bottom = -5;
 **/

const createDirectionalLight = (intensity) => {
    const light = new THREE.DirectionalLight(hexColors.get('white'), intensity);
    light.castShadow = true;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    return light;
}
```

## Ambient Light ##

It illuminates all objects in the scene equally. It has no direction and casts no shadows. Not good for realism but good for a uniform brightness or coloring all shadows. Use it sparingly.