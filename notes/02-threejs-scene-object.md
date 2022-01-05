# 02 Three.js Scene Object #

## Three.js Objects ##

Most objects in Three.js are instances of the 3d base class. They share common properties with each other.

## requestAnimationFrame() function ## 

The scene needs to render continously in order to have real time 3d animation. Better than setInterval function. About 60 fps. https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

```js
const update = (renderer, scene, camera) => {
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
        update(renderer, scene, camera);
    });
}
```

### Other Object3D Properties ###

- Children

- Parent

You can `add` one object, to another in order to group them. 

- You can `name` objects and then use `scene.getObjectByName()` method to get it.


- The `traverse` method allows you to execute a callback function on every child of that object.

```js
const plane = scene.getObjectByName('plane-1');
plane.rotation.y += 0.001;
plane.rotation.z += 0.001;

scene.traverse(child => child.scale.x += 0.001);
```

## Adding fog to the scene ##

Scene has a fog property that allows the scene to fade to a given color. Css colors and rgb properties can work instead of hex values too.

```js
scene.fog = new THREE.FogExp2(hexColors.get('white'), 0.2);
renderer.setClearColor(hexColors.get('white'));
```


