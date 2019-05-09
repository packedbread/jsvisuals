class Circle {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }

    draw() {
        stroke(255, 128);
        strokeWeight(1);
        noFill();
        ellipse(this.position.x, this.position.y, this.radius);
    }

    signedDistance(point) {
        let x = this.position.x - point.x;
        let y = this.position.y - point.y;
        return Math.sqrt(x * x + y * y) - this.radius;
    }
}