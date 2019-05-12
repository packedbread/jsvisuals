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

    scale(value) {
        return new Vector(this.x * value, this.y * value, this.z * value);
    }

    negate() {
        return new Vector(-this.x, -this.y, -this.z);
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);;
    }

    subtract(vector) {
        return this.add(vector.negate());
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

    rotate(vector, angle) {
        let projection = vector.scale(this.dot(vector) / this.dot(this));
        let orthogonal = this.subtract(projection);
        let normal = vector.cross(orthogonal);
        if (normal.norm() === 0) {
            return this.copy();
        }
        return orthogonal.scale(Math.cos(angle)).add(
            normal.scale(Math.sin(angle) * orthogonal.norm() / normal.norm())
        );
    }

    to_array() {
        return [this.x, this.y, this.z];
    }
};