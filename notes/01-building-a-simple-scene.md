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
- A material (defines surface quality, the appearance,).

### Geometry ###
```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

### Materials ###

Determines how the object reacts to the scene lighting. A *Mesh Basic Material* is unaffected by scene lighting and will show even when dark.

### Troubleshooting ###

ThreeJS editor can help visualize whats happening in the scene.

`https://threejs.org/editor/`

Remember:

- Items when created are always placed at XYZ(0, 0, 0);

- Including the camera, unless the camera or objects are move, the camera won't be able to see anything.


### Transformation Properties ###

1. position

2. rotation

3. scale

```js
camera.position.z = 5;
```

### Camera lookAt Method ###

`lookAt`, is a method on the `camera` that determines where the camera is looking at. 

```js
camera.lookAt(new THREE.Vector3(0, 0, 0));
```

## Create a Ground Plane ##

Plane Geometry requires a width and height parameter. For a 2D object, the mesh needs a side property.

```js
{size: THREE.DoubleSide}
```

### Rotation ###

Rotations are done in radians not degrees. Google "unit circle". My trigonometry was right, I should of memorized it instead of just looking it up when I need it. I was right too, because I can just google the unit circle at will, though googling is slower.

### Box Geometry Parameters ###

Box geometry parameters can give you the current height.

```js
box.geometry.parameters.height
```

