const width = 800;
const height = 800;

let objects = []
let radius = 50;
let camera = null;
let march = []
let painted = [];
let max_painted_size = 10000;

function setup() {
    ellipseMode(RADIUS)

    createCanvas(width, height);

    camera = new Camera(createVector(width / 2, height / 2), 0, {
        x: 0,
        y: 0,
        width: width,
        height: height
    });

    for (let i = 0; i < 10; ++i) {
        objects.push(new Circle(createVector(random(width), random(height)), radius));
    }
}

function draw() {
    background(0);

    drawCamera();

    drawObjects();

    march = camera.march(objects);

    drawMarch();

    if (march[1] !== null) {
        painted.push(march[0][march[0].length - 1][0]);
        if (painted.length > max_painted_size) {
            painted = painted.shift();
        }
    }

    drawPainted();

    update();
}

function drawObjects() {
    for (let i = 0; i < objects.length; ++i) {
        objects[i].draw();
    }
}

function drawCamera() {
    noStroke();
    strokeWeight(1);
    fill(255);
    ellipse(camera.position.x, camera.position.y, 5);
}

function drawMarch() {
    noFill();
    stroke(255);
    strokeWeight(1);
    let prev = march[0][0];
    for (let step of march[0]) {
        ellipse(step[0].x, step[0].y, step[1]);
        line(prev.x, prev.y, step[0].x, step[0].y);

        prev = step[0];
    }
}

function drawPainted() {
    stroke(255, 0, 0, 128);
    strokeWeight(4);
    for (let p of painted) {
        point(p.x, p.y);
    }
}

function update() {
    // let x = camera.position.x - mouseX;
    // let y = camera.position.y - mouseY;
    // camera.angle = Math.atan2(-y, -x);
    camera.rotate(0.003);
}