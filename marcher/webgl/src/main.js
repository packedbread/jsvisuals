import { twgl } from './lib/index.js';

import {
    math,
    primitives,
    Camera,
    Scene,
    utils,
} from './marcher/index.js';


const ROTATION_STEP = 0.1;
const MOVE_STEP_MULTIPLIER = 100.0; // times scene.tolerance
const TOLERANCE_CHANGE_MULITPLIER = 1.1;

let gl = null;
let program_info = null;
let buffer_info = null;

let scene = null;


async function setup() {
    await init_webgl();
    build_scene();
    init_drawing();

    window.addEventListener('keydown', key_handler);
}

async function init_webgl() {
    gl = twgl.getContext(document.getElementById('canvas'));

    program_info = twgl.createProgramInfo(gl, [
        await utils.shader_source('src/shaders/vertex.glsl'),
        await utils.shader_source('src/shaders/fragment.glsl'),
    ]);
    gl.useProgram(program_info.program);

    buffer_info = twgl.createBufferInfoFromArrays(gl, {
        a_position: {
            numComponents: 2,
            data: [
                1.0, 1.0,
                -1.0, 1.0,
                1.0, -1.0,
                -1.0, -1.0
            ],
        },
        a_direction: {
            numComponents: 3,
            data: [],
        },
    });
}


let camera_look_at = new math.Vector(0, 0, 0);

function build_scene() {
    scene = new Scene(
        new Camera(new math.Vector(0, 0, 3)),
        [
            new primitives.Mandelbulb(),
            // new primitives.Sphere(new math.Vector(0, 0, 0), 0.5),
            // new primitives.Sphere(new math.Vector(1, 0, 0), 0.3),
        ],
    );
}

function init_drawing() {
    let prev = 0;

    let fps = 60;
    let iteration = 0;
    const gamma = 0.9;
    function fps_avg(dt) {
        fps = gamma * fps + (1 - gamma) * 1000 / dt;
    }

    function loop(time) {
        ++iteration;

        let dt = time - prev

        update(dt);
        fps_avg(dt);

        if (iteration % 100 === 0) {
            console.debug(fps);
        }

        draw();
        prev = time;
        requestAnimationFrame(loop);
    }
    
    requestAnimationFrame(loop);
}

function draw() {
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    twgl.setAttribInfoBufferFromArray(
        gl,
        buffer_info.attribs.a_direction,
        scene.camera.get_directions(gl.canvas.width, gl.canvas.height),
    );
    twgl.setBuffersAndAttributes(gl, program_info, buffer_info);
    twgl.setUniforms(program_info, scene.get_uniforms());
    twgl.drawBufferInfo(gl, buffer_info, gl.TRIANGLE_STRIP);
}

function update(dt) {
    // rotate cam
    /*
    const angle = 0.0001;
    let p = scene.camera.position.copy();
    let ynorm = Math.sqrt(p.x * p.x + p.z * p.z);
    let current_angle = Math.atan2(p.z, p.x);
    let next_angle = current_angle + dt * angle;
    p.x = Math.cos(next_angle) * ynorm;
    p.z = Math.sin(next_angle) * ynorm;
    
    scene.camera.position = p;
    scene.camera.direction = camera_look_at.subtract(scene.camera.position).normalize();
    scene.camera.right = scene.camera.direction.cross(scene.camera.up);
    */
    // scene.objects[0].border_value += 0.01;
}

function key_handler(e) {
    if (e.key === 'ArrowUp') {
        scene.camera.rotate(scene.camera.right, ROTATION_STEP);
    } else if (e.key === 'ArrowDown') {
        scene.camera.rotate(scene.camera.right, -ROTATION_STEP);
    } else if (e.key === 'ArrowLeft') {
        scene.camera.rotate(scene.camera.up, ROTATION_STEP);
    } else if (e.key === 'ArrowRight') {
        scene.camera.rotate(scene.camera.up, -ROTATION_STEP);
    } else if (e.key === 'w') {
        scene.camera.position = scene.camera.position.add(scene.camera.direction.scale(MOVE_STEP_MULTIPLIER * scene.tolerance));
    } else if (e.key === 'a') {
        scene.camera.position = scene.camera.position.add(scene.camera.right.negate().scale(MOVE_STEP_MULTIPLIER * scene.tolerance));
    } else if (e.key === 's') {
        scene.camera.position = scene.camera.position.add(scene.camera.direction.negate().scale(MOVE_STEP_MULTIPLIER * scene.tolerance));
    } else if (e.key === 'd') {
        scene.camera.position = scene.camera.position.add(scene.camera.right.scale(MOVE_STEP_MULTIPLIER * scene.tolerance));
    } else if (e.key === 'q') {
        scene.tolerance /= TOLERANCE_CHANGE_MULITPLIER
    } else if (e.key === 'e') {
        scene.tolerance *= TOLERANCE_CHANGE_MULITPLIER;
    }
}

window.onload = setup;