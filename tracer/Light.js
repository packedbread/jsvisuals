import Vector from "./Vector.js";

export default class Light {
    constructor(position = new Vector(), luminosity = 1) {
        this.position = position;
        this.luminosity = luminosity;
    }
}