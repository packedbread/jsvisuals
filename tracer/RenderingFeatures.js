import Vector from "./Vector.js";

export default class RenderingFeatures {
    constructor(color = new Vector(), lighting = 0, reflective = 0, ambient = 0) {
        this.color = color;
        this.lighting = lighting;
        this.reflective = reflective;
        this.ambient = ambient;
    }
}