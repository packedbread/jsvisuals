import Vector from "./Vector.js";

export default class Mandelbulb {
    constructor(power = 9) {
        this.power = power;
    }

    estimate(point, max_iterations = 256, border_value = 16) {
        let z = point.copy();
        let dr = 1;
        let r = 0;
        for (let i = 0; i < max_iterations; ++i) {
            r = z.norm();
            if (r > border_value) {
                break;
            }

            let theta = Math.acos(z.z / r);
            let phi = Math.atan2(z.y, z.x);
            dr = Math.pow(r, this.power - 1) * this.power * dr + 1.0;

            let zr = Math.pow(r, this.power);
            theta *= this.power;
            phi *= this.power;

            z = new Vector(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta));
            z = z.scale(zr).add(point);
        }

        return r * Math.log(r) / (dr * 2);
    }
}