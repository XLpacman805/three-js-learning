# 01 Building A Simple Scene #

## Scene Essentials ##

### Scene Object ###

The very first thing you need is a scene. A scene is like a container for every other 3D object you plan to work with. It represents the 3D world.

```js
const scene = new THREE.Scene();
```

### Camera ###

Camera is like the eyes the 3d world is  being viewed from. A camera requires some options to initialize.

- Field of View

- Aspect Ratio

- Near clipping plane

- Far clipping plane

```js
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
```

### Renderer ###

```js
const renderer = new THREE.WebGL1Renderer();
```

ThreeJS has other renderers like canvas and svg renderers. WebGL is likely the best because it uses the user's GPU and not only CPU for rendering. WebGL also has more features like shaders.

To render a scene you must set the size, append the renderer dom element to the dom, and run the render method passing in the scene and camera objects as arguments.

```js
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('webgl').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## Populate The Scene ##

3D objects in ThreeJS are made up of two parts, that creates a "mesh".
- A geometry (defines shape)
- A material (defines surface quality, the appearance).

