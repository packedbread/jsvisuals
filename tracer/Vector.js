export default class Vector {
    constructor(x = 0, y = 0, z = 0) {
        if (x instanceof Vector) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    translate(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    scale(value) {
        return new Vector(this.x * value, this.y * value, this.z * value);
    }

    argumentZ() {
        return Math.atan2(this.y, this.x);
    }

    normZ() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    rotateZ(radians) {
        return new Vector(
            Math.cos(radians + this.argumentZ()) * this.normZ(), 
            Math.sin(radians + this.argumentZ()) * this.normZ(),
            this.z
        )
    }

    negate() {
        return new Vector(-this.x, -this.y, -this.z);
    }

    add(vector) {
        return this.translate(vector);
    }

    subtract(vector) {
        return this.translate(vector.negate());
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector) {
        return new Vector(
            this.y * vector.z - vector.y * this.z,
            this.z * vector.x - vector.z * this.x,
            this.x * vector.y - vector.x * this.y
        )
    }

    norm_squared() {
        return this.dot(this);
    }

    norm() {
        return Math.sqrt(this.norm_squared());
    }

    normalize() {
        return this.scale(1 / this.norm());
    }

    copy() {
        return new Vector(this);
    }

    reflect(vector) {
        let ortho = this.subtract(vector.scale(this.dot(vector) / vector.dot(vector)));
        return this.subtract(ortho.scale(2));
    }
}