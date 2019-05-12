import { Vector } from "../math/index.js";

export default class Mandelbulb {
    constructor(power = 8, border_value = 2.0) {
        this.position = new Vector();
        this.power = power;
        this.border_value = border_value;
    }

    get_params_array() {
        return [this.power, this.border_value, undefined, undefined];
    }
};