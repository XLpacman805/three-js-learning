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