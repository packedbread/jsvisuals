import Vector from './Vector.js';
import Camera from './Camera.js';
import Sphere from './Sphere.js';
import RenderingFeatures from './RenderingFeatures.js';
import Scene from './Scene.js';
import Light from './Light.js'

const width = 800;
const height = 800;

let canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

let context = canvas.getContext('2d');

let position = new Vector(5, 0, -1);

let scene = new Scene(new Camera(position, new Vector(0, 0, -1).subtract(position).normalize(), new Vector(0, 0, -1)),
[
    new Sphere(
        new Vector(-1, 0, -2),
        0.3,
        new RenderingFeatures(
            new Vector(255, 0, 0),
            1.0,
            0.5,
            0.0
        )
    ), 
    new Sphere(
        new Vector(0, 0, -2),
        0.5,
        new RenderingFeatures(
            new Vector(0, 0, 255),
            1.0,
            0.9,
            0.3
            )
        )
], [
    new Light(new Vector(100, 0, 0)),
]);

let playing = true;
const fps = 60;
let prev = 0;

function draw(time) {
    let data = scene.render(width, height);
    context.putImageData(new ImageData(data, width, height), 0, 0);

    update((time - prev) * fps / 1000);
    prev = time;

    if (playing) {
        requestAnimationFrame(draw);
    }
}

function update(dt) {
    scene.objects[0].position = scene.objects[0].position.rotateZ(0.01 * dt);
}

requestAnimationFrame(draw);
