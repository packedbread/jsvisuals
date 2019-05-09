import Vector from './Vector.js';
import RenderingFeatures from './RenderingFeatures.js'


export default class Sphere {
    constructor(position = new Vector(), radius = 1, rendering_features = new RenderingFeatures()) {
        this.type = 'Sphere';
        this.position = position;
        this.radius = radius;
        this.rendering_features = rendering_features;
    }

    ray_intersection(origin, direction) {
        // direction should be unit-length vector
        let center = this.position.subtract(origin);
        let proj_length = center.dot(direction);
        let distance_squared = center.norm_squared() - proj_length * proj_length;
        if (distance_squared > this.radius * this.radius) {
            return Infinity;
        }
        let proj_offset = Math.sqrt(this.radius * this.radius - distance_squared);
        return proj_length - proj_offset;  // proj_length + proj_offset --- is the other intersection point 
    }

    normal(point) {
        return point.subtract(this.position).normalize();
    }
}