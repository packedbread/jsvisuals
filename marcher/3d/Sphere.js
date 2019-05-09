import Vector from "./Vector.js";

export default class Sphere {
    constructor(center = new Vector, radius = 1.0) {
        this.center = center;
        this.radius = radius;
    }

    estimate(point) {
        return point.subtract(this.center).norm() - this.radius;
    }
}