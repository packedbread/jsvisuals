import Camera from './Camera.js';
import Vector from './Vector.js';
import utils from './utils.js';


export default class Scene {
    constructor(distance_estimator, camera = new Camera(), max_march_steps = 128, tolerance = 1e-7) {
        this.distance_estimator = distance_estimator;
        this.camera = camera;
        this.max_march_steps = max_march_steps;
        this.tolerance = tolerance;
    }

    render(width, height) {
        let data = new Uint8ClampedArray(4 * width * height);
        let half_width = Math.tan(this.camera.field_of_view);
        let half_height = half_width * height / width;
        let camera_width = half_width * 2;
        let camera_height = half_height * 2;
        let pixel_width = camera_width / (width - 1);
        let pixel_height = camera_height / (height - 1);


        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                let right = this.camera.right.scale(x * pixel_width - half_width);
                let up = this.camera.up.scale(y * pixel_height - half_height);

                let direction = this.camera.direction.add(right).add(up).normalize();

                let color = this.march(this.camera.position, direction);
                color.x = utils.constrain(color.x, 0, 255);
                color.y = utils.constrain(color.y, 0, 255);
                color.z = utils.constrain(color.z, 0, 255);

                data[4 * (x + y * width) + 0] = color.x;
                data[4 * (x + y * width) + 1] = color.y;
                data[4 * (x + y * width) + 2] = color.z;
                data[4 * (x + y * width) + 3] = 255;
            }
        }
        return data;
    }

    march(origin, direction) {
        let total_distance = 0;
        let steps = 0;
        for (; steps < this.max_march_steps; ++steps) {
            let point = origin.add(direction.scale(total_distance));
            let distance = this.distance_estimator.estimate(point);
            total_distance += distance;
            if (distance < this.tolerance) {
                break;
            }
        }
        let gray = 1 - steps / this.max_march_steps;
        let r = gray;
        let g = gray;
        let b = 0;
        r *= 255;
        g *= 255;
        b *= 255;
        return new Vector(r, g, b);
    }
}