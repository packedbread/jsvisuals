import Scene from './Scene.js';
import Mandelbulb from './Mandelbulb.js'
import Sphere from './Sphere.js'
import Camera from './Camera.js';
import Vector from './Vector.js';

const width = 800;
const height = 800;

let canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

let context = canvas.getContext('2d');
let prev = 0;

let cam_pos = new Vector(1, 0, 1.5);
let cam_look_at = new Vector(0, 0, 0);
let cam_direction = cam_look_at.subtract(cam_pos).normalize();
let cam_right = cam_direction.cross(new Vector(0, 1, 0)).normalize();

let scene = new Scene(new Mandelbulb(8), new Camera(cam_pos, cam_direction, cam_right));

let playing = false;


function loop(time) {
    let dt = time - prev;

    draw();
    update(dt);

    prev = time;
}

function draw() {
    let data = scene.render(width, height);
    context.putImageData(new ImageData(data, width, height), 0, 0)

    if (playing) {
        requestAnimationFrame(loop);
    }
}

function update(dt) {

}

requestAnimationFrame(loop);