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
