import { Vector } from "../math/index.js";

export default class Sphere {
    constructor(position = new Vector(), radius = 1.0) {
        this.position = position;
        this.radius = radius;
    }

    get_params_array() {
        return [this.radius, undefined, undefined, undefined];
    }
};